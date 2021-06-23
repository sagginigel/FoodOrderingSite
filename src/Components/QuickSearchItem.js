import React from 'react';
import {withRouter} from 'react-router-dom';

class QuickSearchItem extends React.Component {
    constructor() {
        super();
    }

    handleClick(id,name){
        sessionStorage.setItem('mealtype',name);
        this.props.history.push(`/filter/?mealtype=${id}`);
    }

    render() {
        const { id, mealtypes } = this.props;
        const { name, content, image } = mealtypes;
        // console.log('../' + image);
        return (
            <React.Fragment>
                <div className="col-sm-4 col-md-4 col-lg-4 SmallSceen" onClick={() => this.handleClick(id,name)}>
                    <div className="itemTitle">
                        <div className="itemTitle1">
                            <img src={require('../' + image).default} style={{ width: '140px', height: '150px' }} />
                        </div>
                        <div className="itemTitle2">
                            <div className="compHeading">
                                {name}
                            </div>
                            <div className="compSubHeading">
                                {content}
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default withRouter(QuickSearchItem);