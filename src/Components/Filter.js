import React from 'react';
import '../Styles/search.css';
import queryString from 'query-string';
import axios from 'axios';
import {withRouter} from 'react-router-dom'

class Filter extends React.Component {
    constructor() {
        super();
        this.state = {
            restaurantList: [],
            locationList: [],
            // pageCount: [],
            location: undefined,
            cuisine: [],
            mealtype: undefined,
            hcost: 99999999,
            lcost: 0,
            page: 1,
            sortBy: 1,
            pageCount: undefined,
            cities: [],
            citySelected: 0
        }
    }

    componentDidMount() {
        document.title = "Zomato Restaurant Filter"
        const { page, hcost, lcost, sortBy, pageCount, citySelected } = this.state;
        const qs = queryString.parse(this.props.location.search);
        const { mealtype } = qs;
        let cost = String(lcost) + '-' + String(hcost);

        const req = {
            "mealtype_id": mealtype,
            "page": page,
            costRange: cost,
            sortBy: sortBy,
            city: citySelected
        }
        console.log(req);
        axios({
            method: 'POST',
            url: 'http://localhost:3304/api/restaurantfilter',
            headers: { 'Content-Type': 'application/json' },
            data: req
        }).then(result => {
            this.setState({
                restaurantList: result.data.restaurants
                , mealtype: mealtype,
                pageCount: result.data.pageCount,
                selectedMeal: result.data.restaurants[0].type[0].name
            })
            // console.log(result.data.restaurants[0].type[0].name);
        }).catch(error => {
            console.log(error);
        })

        axios.get('http://localhost:3304/api/cityList').then(result => {
            // console.log(result);
            this.setState({
                cities: result.data.cities
            })
        }).catch(error => {
            console.log(error);
        })
    }

    handleCuisineChange(cuisineId) {
        const { location, mealtype, cuisine, hcost, lcost, sortBy, page, pageCount, citySelected } = this.state;
        if (cuisine.indexOf(cuisineId.toString()) == -1) {
            cuisine.push(cuisineId.toString());
        } else {
            var index = cuisine.indexOf(cuisineId.toString());
            cuisine.splice(index, 1);
        }
        
        let cost = String(lcost) + '-' + String(hcost);


        let filterObj = {
            cuisine_ids: cuisine,
            mealtype_id: mealtype,
            sortBy: sortBy,
            costRange: cost,
            page: 1,
            city: citySelected
        }

        this.setState({
            page: 1
        })
        console.log(filterObj);
        axios({
            method: 'POST',
            url: 'http://localhost:3304/api/restaurantfilter',
            headers: { 'Content-Type': 'application/json' },
            data: filterObj
        }).then(result => {
            this.setState({
                restaurantList: result.data.restaurants,
                pageCount: result.data.pageCount
            })
            // console.log(result.data.restaurants);
        }).catch(error => {
            console.log(error);
        })
    }

    handleCostChange = (minCost, maxCost) => {
        const { hcost, lcost, cuisine, mealtype, page, sortBy, pageCount, citySelected } = this.state;
        this.setState({
            hcost: maxCost,
            lcost: minCost
        });
        let cost = String(minCost) + '-' + String(maxCost);
        let filterObj = {
            cuisine_ids: cuisine,
            mealtype_id: mealtype,
            costRange: cost,
            page: 1,//page,
            sortBy: sortBy,
            city: citySelected
        }

        this.setState({
            page: 1
        })
        axios({
            method: 'POST',
            url: 'http://localhost:3304/api/restaurantfilter',
            headers: { 'Content-Type': 'application/json' },
            data: filterObj
        }).then(result => {
            this.setState({
                restaurantList: result.data.restaurants,
                pageCount: result.data.pageCount
            })
        }).catch(error => {
            console.log(error);
        })
    }

    handleSort = (sort) => {
        const { hcost, lcost, cuisine, mealtype, page, sortBy, pageCount, citySelected } = this.state;
        this.setState({
            sortBy: sort
        });
        let cost = String(lcost) + '-' + String(hcost);
        let filterObj = {
            cuisine_ids: cuisine,
            mealtype_id: mealtype,
            costRange: cost,
            page: page,
            sortBy: sort,
            city: citySelected
        }
        axios({
            method: 'POST',
            url: 'http://localhost:3304/api/restaurantfilter',
            headers: { 'Content-Type': 'application/json' },
            data: filterObj
        }).then(result => {
            this.setState({
                restaurantList: result.data.restaurants,
                pageCount: result.data.pageCount
            })
        }).catch(error => {
            console.log(error);
        })
    }

    locationSelector = (event) => {
        // console.log(event.target.value);
        const { hcost, lcost, cuisine, mealtype, page, sortBy, pageCount, citySelected } = this.state;
        this.setState({
            citySelected: event.target.value
        });
        let cost = String(lcost) + '-' + String(hcost);
        let filterObj = {
            cuisine_ids: cuisine,
            mealtype_id: mealtype,
            costRange: cost,
            page: 1,
            sortBy: sortBy,
            city: event.target.value
        }

        this.setState({
            page: 1
        })
        axios({
            method: 'POST',
            url: 'http://localhost:3304/api/restaurantfilter',
            headers: { 'Content-Type': 'application/json' },
            data: filterObj
        }).then(result => {
            this.setState({
                restaurantList: result.data.restaurants,
                pageCount: result.data.pageCount
            })
        }).catch(error => {
            console.log(error);
        })

    }

    handlePagination = (element) => {
        console.log(element);
        const { hcost, lcost, cuisine, mealtype, page, sortBy, pageCount, citySelected } = this.state;
        this.setState({
            page: element
        });
        let cost = String(lcost) + '-' + String(hcost);
        let filterObj = {
            cuisine_ids: cuisine,
            mealtype_id: mealtype,
            costRange: cost,
            page: element,
            sortBy: sortBy,
            city: citySelected
        }
        axios({
            method: 'POST',
            url: 'http://localhost:3304/api/restaurantfilter',
            headers: { 'Content-Type': 'application/json' },
            data: filterObj
        }).then(result => {
            this.setState({
                restaurantList: result.data.restaurants,
                pageCount: result.data.pageCount
            })
        }).catch(error => {
            console.log(error);
        })
    }

    handleClickItem = (item) =>{
        this.props.history.push(`/restaurant/?id=${item._id}`);
    } 

    render() {
        const { restaurantList, locationList, pageCount, sortBy, cities } = this.state;
        let displayCity = '';
        let pages = Array.from(Array(pageCount).keys()).map(i => i + 1);
        // console.log(`pages = ${pages}`);
        return (
            <React.Fragment>
                <div className="container">
                    <div className="heading"> {sessionStorage.getItem('mealtype')} Places</div>
                    <div className="row">
                        <div className="col-sm-12 col-md-4 col-lg-4 filter-options">
                            <div className="filter-heading">Filters</div>
                            <div className="filter-subheading">Select Location</div>

                            {<select className="filter-dropdown" name="location-select" defaultValue={'Select Location'} onChange={this.locationSelector}>
                                <option disabled>Select Location</option>
                                <option key={0} value={0}>0 - All Locations</option>
                                {
                                    cities.map((city) => {
                                        return <option key={city.city_id} value={city.city_id}>{city.city_id} - {city.name}</option>
                                    })
                                }
                            </select>}


                            <div className="filter-heading">Cusine</div>
                            <div className="filter-checkbox">
                                <input type="checkbox" value="1" name="NorthIndian" onChange={() => this.handleCuisineChange(1)} /> <label htmlFor="NorthIndia">North Indian</label><br />
                                <input type="checkbox" value="2" name="SouthIndian" onChange={() => this.handleCuisineChange(2)} /> <label htmlFor="SouthIndian">South Indian</label><br />
                                <input type="checkbox" value="3" name="Chinese" onChange={() => this.handleCuisineChange(3)} /> <label htmlFor="Chinese">Chinese</label><br />
                                <input type="checkbox" value="4" name="FastFood" onChange={() => this.handleCuisineChange(4)} /> <label htmlFor="FastFood">Fast Food</label><br />
                                <input type="checkbox" value="5" name="StreetFood" onChange={() => this.handleCuisineChange(5)} /> <label htmlFor="StreetFood">Street Food</label><br />
                            </div>
                            <div className="filter-heading">Cost for two</div>
                            <div className="filter-checkbox">
                                <input type="radio" name="Costfortwo" onChange={() => this.handleCostChange(0, 500)} /> <label htmlFor="Lessthan50">Less than &#8377; 500</label><br />
                                <input type="radio" name="Costfortwo" onChange={() => this.handleCostChange(510, 1000)} /> <label htmlFor="500to1000">&#8377; 501 to &#8377; 1000</label><br />
                                <input type="radio" name="Costfortwo" onChange={() => this.handleCostChange(1001, 1500)} /> <label htmlFor="1001to1500">&#8377; 1001 to &#8377; 1500</label><br />
                                <input type="radio" name="Costfortwo" onChange={() => this.handleCostChange(1501, 2000)} /> <label htmlFor="1501to2000">&#8377; 1501 to &#8377; 2000</label><br />
                                <input type="radio" name="Costfortwo" onChange={() => this.handleCostChange(2001, 9999999)} /> <label htmlFor="2000+">&#8377; 2000 +</label><br />
                            </div>
                            <div className="filter-heading">Sort</div>
                            <div className="filter-checkbox">
                                <input type="radio" name="PriceSort" checked={sortBy === 1} onChange={() => this.handleSort(1)} /> <label htmlFor="Lowtohigh">Price Low to High</label><br />
                                <input type="radio" name="PriceSort" checked={sortBy === -1} onChange={() => this.handleSort(-1)} /> <label htmlFor="Hightolow">Price High to Low</label><br />
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8 filter-items">
                            {
                                restaurantList.length > 0 ? restaurantList.map(item => {
                                    // console.log(item);
                                    return <div className="itemblock" onClick={() =>this.handleClickItem(item)}>
                                        <div className="row" style={{ height: "150px" }}>
                                            <div className="col col-sm-3 col-md-3 col-lg-4">
                                                <img src={item.thumb} alt="" style={{ borderRadius: '25%', width: '100px', height: '100px' }} />
                                            </div>
                                            <div className="col col-sm-9 col-md-9 col-lg-8">
                                                <div className="itempartheading">{item.name}</div>
                                                <div className="itempartheading1">{item.city_name}</div>
                                                <div className="itempartsubheading">{item.address}</div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <hr />
                                            <div className="item-details">CUISINES : {item.Cuisine.map(itm => itm.name + ', ')}</div>
                                            <div className="item-details">COST FOR TWO : ₹ {item.cost}</div>
                                        </div>
                                    </div>
                                }) : <div key={'key'} style={{ color: 'grey' }}> No Data Found </div>
                            }
                        </div>
                    </div>
                    <div className="pagination d-flex justify-content-center">
                        {
                            pages.map(element => <div onClick={() => this.handlePagination(element)}>{element}</div>)
                        }
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default withRouter(Filter);