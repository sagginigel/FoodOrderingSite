import React from 'react';
import axios from 'axios';
import queryString from 'query-string';
import Modal from 'react-modal';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import '../Styles/Details.css';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'ghostwhite'
    }
};

class Details extends React.Component {
    constructor() {
        super();
        this.state = {
            restaurant: {},
            menu: [],
            isModalOpen: false,
            order: [], // ---> "{item_name : "..." , qty : "..."}"
            cartItems: []
        }
    }

    componentDidMount() {
        const queryParams = queryString.parse(this.props.location.search);
        // console.log(queryParams);
        const restaurantId = queryParams.id;
        axios({
            method: 'GET',
            url: `http://localhost:3304/api/getrestaurantbyid/${restaurantId}`,
            headers: { 'Content-Type': 'application/json' }
        }).then(result => {
            this.setState({
                restaurant: result.data.restaurant
            });
            // console.log(result.data.restaurant.name);
            document.title = `${result.data.restaurant.name} - Restaurant`;
        }).catch(error => {
            console.log(error);
        });

        axios({
            method: 'GET',
            url: `http://localhost:3304/api/getmenuforrestaurants/${restaurantId}`,
            headers: { 'Content-Type': 'application/json' }
        }).then(result => {
            this.setState({
                menu: result.data.menu
            });
            // console.log(result.data.restaurant);
        }).catch(error => {
            console.log(error);
        });
    }

    handlePlaceOrder = (event) => {
        this.setState({
            isModalOpen: true
        })

    }


    getData = (data) => {
        return fetch(`http://localhost:3304/api/payment`, {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(response => {
            return response.json();
        }).catch(error => {
            console.log(error);
        });;
    }

    obj = (val) => {
        return typeof val === 'object';
    }


    isDate = (val) => {
        return Object.prototype.toString.call(val) === '[object Date]';
    }
    stringifyMyParam = (paramValue) => {
        // check if the paramValue is an object or date, if yes
        // stringify, else return the value
        if (this.obj(paramValue) && !this.isDate(paramValue)) {
            return JSON.stringify(paramValue);
        } else {
            return paramValue;
        }
    }

    buildForm = (details) => {
        const { action, params } = details;
        //create a form
        //attach an action to the form
        //create fields on the form

        const form = document.createElement('form');
        form.setAttribute('method', 'post');
        form.setAttribute('action', action);

        Object.keys(params).forEach(key => {
            const input = document.createElement('input');
            input.setAttribute('type', 'hidden');
            input.setAttribute('name', key);
            input.setAttribute('value', this.stringifyMyParam(params[key]));
            form.appendChild(input);
        })

        return form;

    }

    takeMeToPaymentGateway = (details) => {
        //take user to payment gateway
        /**
         * For the procedure of taking the user from our application to payment gateways website in a secure manner
        * we dont create the HTML elements before hand
        * The HTML form which takes us to paytm gateway is created on the fly
        * After that we immediately destory that form        
        */
        const form = this.buildForm(details);
        document.body.appendChild(form);
        form.submit();
        form.remove();

    }

    makePayment = () => {
        /*
    (1) We will have to fetch some coded information from BE server (NodeJS)
    (2) take the coded information / checksum and redirect to paytm gateway page
    (3) From here onwards, everything is taken care by payment gateway
    */
        this.getData({
            amount: 7000,
            email: 'nigel_coutinho@outlook.com',
            mobileNo: '9049603996'
        }).then(response => {
            var information = {
                // action : "https://securegw-stage.paytm.in",
                action: "https://securegw-stage.paytm.in/order/process",
                params: response.checksumResponse
            };
            this.takeMeToPaymentGateway(information);
        }).catch(error => {
            console.log(error);
        })
    }

    cancelMenu = (event) => {
        const { isModalOpen } = this.state;
        this.setState({
            isModalOpen: false
        })
    }

    addItem = (event) => {
        const { cartItems } = this.state;
        let newItem = {
            itemName: event.item,
            itemPrice: event.cost
        }
        const exists = cartItems.find(eachItem => eachItem.itemName === newItem.itemName);
        if (exists) {
            this.setState(prevState => ({
                cartItems: prevState.cartItems.map(eachItem =>
                    eachItem.itemName === event.item ?
                        { ...eachItem, itemQuantity: eachItem.itemQuantity + 1, itemTotalPrice: eachItem.itemTotalPrice + eachItem.itemPrice }
                        : eachItem)
            }))
        } else {
            let itemQuantityPrice = { itemQuantity: 1, itemTotalPrice: newItem.itemPrice }
            newItem = { ...newItem, ...itemQuantityPrice }
            this.setState(prevState => ({
                cartItems: [...prevState.cartItems, newItem]
            }));
        }
    }

    removeItem = (event) => {
        const { cartItems } = this.state;
        const exists = cartItems.find(eachItem => eachItem.itemName === event.item);
        // console.log(exists);

        if (exists && exists.itemQuantity != 0) {
            let removeItem = {
                itemName: exists.itemName,
                itemQuantity: exists.itemQuantity
            }
            console.log(removeItem);

            if (removeItem.itemQuantity === 1) {
                console.log("Only 1 item")
                this.setState(prevState => ({
                    cartItems: prevState.cartItems.filter(cartItems => cartItems.itemName !== removeItem.itemName)
                }))


            } else {
                console.log("More than 1 item");
                this.setState(prevState => ({
                    cartItems: prevState.cartItems.map(eachItem =>
                        eachItem.itemName === event.item ?
                            { ...eachItem, itemQuantity: eachItem.itemQuantity - 1, itemTotalPrice: eachItem.itemTotalPrice - eachItem.itemPrice }
                            : eachItem)

                }))
            }
        }
    }

    render() {
        const { restaurant, isModalOpen, menu } = this.state;
        const { cartItems } = this.state;
        const totalAmount = cartItems.reduce((accumulator, currValue) => (accumulator + currValue.itemTotalPrice), 0)
        console.log(sessionStorage.getItem('isLoggedIn'));
        return (
            <>
                <div className="container">
                    <img src={restaurant.thumb} alt="restaurant_image" style={{ width: '100%', height: '500px' }} className="mt-5" />
                    <h3 className="mt-3">{restaurant.name}</h3>


                        <div><button className="btn btn-danger order-button" onClick={this.handlePlaceOrder} style={{ backgroundColor: "tomato", float: "right" }}>Place Online Order</button></div>
                    
                    <div className="mt-3">
                        <Tabs>
                            <TabList>
                                <Tab>Overview</Tab>
                                <Tab>Contact</Tab>
                                <Tab>Location</Tab>
                            </TabList>

                            <TabPanel>
                                <h3>About this place</h3>
                                <h4>Cuisine</h4>
                                <div>
                                    {
                                        restaurant.Cuisine && restaurant.Cuisine.length > 0
                                            ?
                                            restaurant.Cuisine.map(item => {
                                                return <span key={item.name}>{item.name}, </span>
                                            })
                                            :
                                            null
                                    }
                                </div>
                                <h4>Average Cost</h4>
                                <div>{restaurant.cost}</div>
                            </TabPanel>
                            <TabPanel>
                                <h4>Phone Number</h4>
                                <div>
                                    (+91) 99999 88888
                                </div>
                                <h4>Address</h4>
                                <div>{restaurant.name}</div>
                                <div>{restaurant.address}, {restaurant.city_name}</div>
                            </TabPanel>
                            <TabPanel>
                                <iframe title={restaurant.name} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.1538646262534!2d77.19598511552459!3d28.595160582432563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce29e8cfa84b5%3A0x923a697eca1c1a80!2sDiggin%20Cafe!5e0!3m2!1sen!2sin!4v1624033353949!5m2!1sen!2sin" width="600" height="450" style={{ border: "0" }} allowFullScreen="" loading="lazy"></iframe>
                            </TabPanel>
                        </Tabs>
                    </div>
                </div>

                <Modal isOpen={isModalOpen} style={customStyles}>
                    <h3>Menu {restaurant.name}</h3>

                    <table className="menu">
                        <thead>
                            <tr>
                                <td>Item Name</td><td>Price/Item</td><td>+/-</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                menu.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.item}</td>
                                            <td>{item.cost}</td>
                                            <td><button className="btn btn-secondary" style={{ marginRight: "5px" }} onClick={() => this.addItem(item)}>+</button>
                                                <button className="btn btn-secondary" onClick={() => this.removeItem(item)}>-</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>

                    <table className="menu">
                        <thead>
                            <tr>
                                <td>Item Name</td><td>Price/Item</td><td>Order Qty</td><td>Total per Item</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cartItems.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.itemName}</td>
                                            <td>{item.itemPrice}</td>
                                            <td>{item.itemQuantity}
                                            </td>
                                            <td>{item.itemTotalPrice}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>


                    <div className="row d-flex justify-content-center">
                        Total Amount : {totalAmount}
                        <button className="btn btn-secondary" onClick={this.makePayment} style={{ marginBottom: "5px" }}>Pay Now</button>
                        <button className="btn btn-secondary" onClick={this.cancelMenu}>Cancel</button>
                    </div>
                </Modal>
            </>
        )
    }
}

export default Details;