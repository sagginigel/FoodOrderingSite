import axios from 'axios';
import React, { Component } from 'react';
import homeimage from '../assets/homepageimg.png';
import { withRouter } from 'react-router-dom';


const customStyle = {
    backgroundColor: "white",
    height: "45px",
    width: "300px",
    listStyle: "none",
    border: "1px solid darkblue",
    color: "darkblue",
    fontSize: "20px",
    textAlign: "left",
    paddingLeft: "5px",
    cursor: "pointer"
}

class Wallpaper extends React.Component {
    constructor() {
        super();
        this.state = {
            suggestions: [],
            text: '',
            restaurants: []
        }
    }

    componentDidMount() {

    }


    handleChange = (event) => {
        const cityId = event.target.selectedOptions[0].value;
        console.log(cityId);
        sessionStorage.setItem("city", cityId);
        axios({
            method: 'GET',
            url: `http://localhost:3304/api/getrestaurantbycity/${cityId}`,
            headers: { 'Content-Type': 'application/json' }
        }).then(result => {
            this.setState({
                restaurants: result.data.restaurant
            })
        }).catch(error => {
            console.log(error);
        });

    }

    onTextChanged = (event) => {
        const searchInput = event.target.value;
        const { restaurants } = this.state;

        let suggestions = [];

        if (searchInput.length > 0) {
            suggestions = restaurants.filter(
                item => item.name.toLowerCase().includes(searchInput.toLowerCase())
            )
            // console.log(suggestions);
        }
        //  console.log(searchInput);
        this.setState({
            suggestions,
            text: searchInput
        })
    }

    renderSuggestions = () => {
        const { suggestions } = this.state;
        if (suggestions.length == 0) {
            return null;
        }
        return (
            <ul className="searchDropdown" style={{ paddingLeft: "0px" }}>
                {
                    suggestions.map((item, index) => {
                        return (
                            <li key={index} onClick={() => this.selectedRestaurant(item)} style={customStyle}><img src={item.thumb}
                                style={{ background: `url(${item.thumb})`, left: 'top', width: '20px', height: '20px' }} />
                                {`${item.name}, ${item.city_name}`}
                            </li>
                        )
                    })
                }
            </ul>
        )
    }

    selectedRestaurant = (item) => {
        this.props.history.push(`/restaurant/?id=${item._id}`)
    }

    render() {
        const { cities, text, suggestions } = this.props;
        // console.log(cities);
        return (
            <React.Fragment>
                <section className="row no-gutters align-items-center">
                    <div className="col-12 text-center d-flex">
                        <img src={homeimage} id="home" alt="Home__Image" className="mx-auto d-block" />
                        <div className="w-100 position-absolute text-danger mt-4 mr-5 pr-5">
                            <div>
                                <span className="logo">
                                    n!
                                </span>
                            </div>
                            <div className="titleBar">
                                Find the best restaurants, cafés, and bars
                            </div>
                            <div className="searchoptions">
                                <div className="row">
                                    <div className="col col-md-12 col-sm-12 col-lg-6 d-flex justify-content-lg-end justify-content-md-center justify-content-sm-center">
                                        <select className="dropmenu" defaultValue={'Select'} onChange={this.handleChange}>
                                            <option value="Select" disabled>Select</option>
                                            {
                                                cities.map((city, index) => {
                                                    // console.log(cities);
                                                    return <option key={index} value={city.city_id}>{city.name}, {city.country_name}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="col col-md-12 col-sm-12 col-lg-6 d-flex justify-content-lg-start justify-content-md-center justify-content-sm-center">
                                        <input className="seachmenu" type="text" value={text} placeholder="Please search restaurant" onChange={this.onTextChanged} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col col-sm-0 col-md-0 col-lg-6"></div>
                                <div className="col col-sm-12 col-md-12 col-lg-6 d-flex justify-content-sm-center justify-content-md-center justify-content-lg-start">
                                    {
                                        this.renderSuggestions()
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </React.Fragment>
        )
    }
}

export default withRouter(Wallpaper);