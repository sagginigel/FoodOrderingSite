/**
    * @description      : 
    * @author           : 
    * @group            : 
    * @created          : 29/05/2021 - 21:47:04
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 29/05/2021
    * - Author          : 
    * - Modification    : 
**/
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './Components/Home';
import Filter from './Components/Filter';
import Header from './Components/Header';
import Details from './Components/Details';
import Transaction from './Components/Transaction';

const Router = () => {
    return (
        <BrowserRouter>
            <Header />
            <Route exact path="/" component={Home} />
            <Route path="/home" component={Home} />
            <Route path="/filter" component={Filter} />
            <Route path="/restaurant" component={Details} />
            <Route path="/transaction" component={Transaction}/> 
        </BrowserRouter>
    )
}

export default Router;