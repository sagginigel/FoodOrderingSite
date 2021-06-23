import React from 'react';
import axios from 'axios';
import '../Styles/Home.css';

class Transaction extends React.Component {
    constructor() {
        super();
        this.state = {
            paymentStatus: ""
        }
    }
    componentDidMount() {
        // Capture the POST data from Paytm
        // Make an API call to '/api/callback'
    }

    render() {
        const { paymentStatus } = this.state;
        return (
            <React.Fragment>
                <h1>Transaction Status</h1>
                <h2>{paymentStatus}</h2>
            </React.Fragment>
        )
    }

}

export default Transaction;