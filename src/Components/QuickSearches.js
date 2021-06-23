import React, { Component } from 'react';
import '../Styles/Home.css';

import QuickSearchItem from './QuickSearchItem';

class QuickSearches extends React.Component{
	constructor(){
		super();
	}
    render(){
		const {mealtypes} = this.props;
		// console.log(mealtypes);
        return(
            <div>
		<div className="container">
			<div className="col-sm-12">  
				<p className="quickSearch">Quick Searches</p>
				<p className="quickSearchList">Discover restaurants by type of meal</p>
			</div>
		</div>

		<div className="container">

					<div className="row">
						{
							mealtypes.map((mealtypes, index) => {
								return <QuickSearchItem key={index} id={index + 1} mealtypes={mealtypes}/>
							})
						}
						
					</div>

	
            </div>
        </div>    
        )
    }
}

export default QuickSearches;