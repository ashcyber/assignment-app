import React from 'react'; 
import {BrowserRouter as Router, Route, Switch, NavLink} from 'react-router-dom';

/* Components */ 
import Navigation from '../components/Navigation'; 
import Dashboard from '../components/Dashboard'; 
import Reports from '../components/Reports';  
import { Container } from 'react-bootstrap';
import Report from '../components/Report'; 

const AppRouter = () => (
    <Router>
        <Container fluid={true}>
            <Navigation/> 
            <Switch>
                <Route exact={true} path="/" component={Dashboard}/>
                <Route exact={true} path='/reports' component={Reports}/> 
                <Route exact={true} path='/report/:id' component={Report}/>
            </Switch>
        </Container>
    </Router>
); 

export default AppRouter; 
