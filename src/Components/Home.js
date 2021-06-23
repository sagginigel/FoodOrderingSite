import React, { Component } from 'react';
import axios from 'axios';
import '../Styles/Home.css';



import Wallpaper from './Wallpaper';
import QuickSearches from './QuickSearches';

class Home extends React.Component{
	constructor(){
		super();
		this.state = {
			cities : [],
			mealtypes : [] 
		};
	}

	componentDidMount(){
		document.title="Zomato Home";
		axios.get('http://localhost:3304/api/cityList').then(result => {
		// console.log(result);
		this.setState({
				cities : result.data.cities
			})
		}).catch(error => {
			console.log(error);
		})

		axios.get('http://localhost:3304/api/mealType').then(result => {
		// console.log(result.data.mealtype);
		this.setState({
				mealtypes : result.data.mealtype
			})
		}).catch(error => {
			console.log(error);
		})
	}

    render(){
		const { cities, mealtypes} = this.state;
		// console.log(mealtypes)
        return(
        <React.Fragment>
			<Wallpaper cities={cities}/>
			<QuickSearches mealtypes={mealtypes}/>
        </React.Fragment>    
        )
    }
}

export default Home;