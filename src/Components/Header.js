import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { withRouter } from 'react-router-dom';


import '../Styles/Header.css';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'ghostwhite',
        border: 'solid 2px tomato'
    }
}

class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            isModalOpen: false,
            passwd: '',
            email: '',
            firstName: '',
            lastName: '',
            isLoggedIn: false,
            signUp: 'true'
        }
    }

    componentWillMount() {
        Modal.setAppElement('body');
    }

    componentDidMount(){
        sessionStorage.setItem('isLoggedIn', false);
    }

    handleChange = (event, stateVariable) => {
        this.setState({
            [stateVariable]: event.target.value
        });
    }

    singUpHandler = (event) => {
        const { email, passwd, firstName, lastName } = this.state;

        const signUpRequesstObj = {
            email: email,
            passwd: passwd,
            firstName: firstName,
            lastName: lastName
        }

        axios({
            method: 'POST',
            url: 'http://localhost:3304/api/signUp',
            Headers: { 'Content-Type': 'application/json' },
            data: signUpRequesstObj
        }).then(
            response => {
                if (response.data.message == 'User Signed up succesfully') {
                    this.setState({
                        isModalOpen: false,
                        isSignInModalOpen: false,
                        passwd: '',
                        email: '',
                        firstName: '',
                        lastName: ''
                    });
                    alert(response.data.message);
                }
            }
        ).catch(
            error => {
                console.log(error);
                alert(error);
            }
        );
    }

    cancelHandler = (event) => {
        this.setState({
            isModalOpen: false
        });
    }

    signUpOpenHandler = (event) => {
        this.setState({
            isModalOpen: true
        });
    }

    logInOpenHandler = (event) => {
        this.setState({
            isSignInModalOpen: true
        })
    }

    logInHandler = (event) => {
        const { email, passwd } = this.state;

        const signInRequesstObj = {
            email: email,
            passwd: passwd
        }

        axios({
            method: 'POST',
            url: 'http://localhost:3304/api/login',
            Headers: { 'Content-Type': 'application/json' },
            data: signInRequesstObj
        }).then(
            response => {
                if (response.data.user.length >= 1) {
                    this.setState({
                        isModalOpen: false,
                        isSignInModalOpen: false,
                        passwd: '',
                        email: '',
                        isLoggedIn: response.data.isAuthenticated,
                        firstName: response.data.user[0].firstName
                    });
                    sessionStorage.setItem('isLoggedIn', response.data.isAuthenticated);
                }
            }
        ).catch(
            error => {
                console.log(error);
                alert(error);
            }
        );
    }

    cancelLogInHandler = (event) => {
        this.setState({
            isSignInModalOpen: false
        });
    }

    logoutHandler = (event) => {
        this.setState({
            isLoggedIn: false,
            firstName: ''
        });
        sessionStorage.setItem('isLoggedIn', false);
    }

    homeClick() {
        this.props.history.push(`/`);
    }

    render() {
        const { isModalOpen, isSignInModalOpen, passwd, email, firstName, lastName, isLoggedIn } = this.state;
        return (
            <React.Fragment>
                <div className="header">
                    <i className="bi bi-house-fill" style={{ fontSize: "35px", marginLeft: "5px",cursor: "pointer" }} onClick={() => this.homeClick()}></i>
                    <div className="btn-group login-block">
                        {
                            isLoggedIn ?
                                <div><span>{firstName}</span>
                                    <button className="btn btn-sm btn-danger" style={{ marginRight: '10px', marginLeft: '10px' }} onClick={this.logoutHandler}>Logout</button>
                                </div> : <div>
                                    <button className="btn btn-sm text-white" style={{ marginRight: '10px' }} onClick={this.logInOpenHandler}>Login</button>
                                    <button className="btn btn-sm border border-white btn-primary" style={{ marginRight: '10px', backgroundColor: "red" }} onClick={this.signUpOpenHandler}>Sign Up</button>
                                </div>
                        }
                    </div>
                    <Modal isOpen={isModalOpen} style={customStyles}>
                        <table>
                            <thead>
                                <tr><th></th><th>Create a new User Account</th></tr>
                            </thead>
                            <tbody>
                                <tr><td>Email :</td><td><input type="text" value={email} onChange={(event) => this.handleChange(event, 'email')} /></td></tr>
                                <tr><td>Password :</td><td><input type="password" value={passwd} onChange={(event) => this.handleChange(event, 'passwd')} /></td></tr>
                                <tr><td>First Name :</td><td><input type="text" value={firstName} onChange={(event) => this.handleChange(event, 'firstName')} /></td></tr>
                                <tr><td>Last Name :</td><td><input type="text" value={lastName} onChange={(event) => this.handleChange(event, 'lastName')} /></td></tr>
                                <tr><td></td>
                                    <td>
                                        <button onClick={this.singUpHandler} className="btn btn-sm btn-primary" style={{ marginRight: "15px" }}>Sign Up</button>
                                        <button onClick={this.cancelHandler} className="btn btn-sm btn-primary">Canel</button>
                                    </td></tr>
                            </tbody>
                        </table>

                    </Modal>
                    <Modal isOpen={isSignInModalOpen} style={customStyles}>
                        <table>
                            <thead>
                                <tr><th>Login User</th></tr>
                            </thead>
                            <tbody>
                                <tr><td>Email :</td><td><input type="text" value={email} onChange={(event) => this.handleChange(event, 'email')} /></td></tr>
                                <tr><td>Password : </td><td><input type="password" value={passwd} onChange={(event) => this.handleChange(event, 'passwd')} /></td></tr>
                                <tr><td></td>
                                    <td><button onClick={this.logInHandler} className="btn btn-sm btn-primary" style={{ marginRight: "15px" }}>Login</button>
                                        <button onClick={this.cancelLogInHandler} className="btn btn-sm btn-primary">Canel</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </Modal>
                </div>
            </React.Fragment>
        );
    }
}

export default withRouter(Header);