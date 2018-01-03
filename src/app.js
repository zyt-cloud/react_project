import React, { Component } from 'react';

import Index from 'PAGES/index/index'

import {Route, Switch, Link} from 'react-router-dom'



import Home from 'PAGES/home/home';
// lazy load
import Login from 'bundle-loader?lazy&name=login!PAGES/login/login';
import About from 'PAGES/about/about';
import Counter from 'PAGES/counter/counter';

import User from 'bundle-loader?lazy&name=user!PAGES/user/user';

import { loadComponent, AuthRoute } from 'UTILS/utils'

export default class App extends Component {


    render() {
        return (
            <div>
            	<Index />

            	<div className="dhb-content">
					<Switch>
						<AuthRoute exact path="/" component={Home} />
						
						<Route path="/index/home" component={Home}/>
		                <Route path="/index/about" component={About}/>
		                <Route path="/index/counter/:name" component={Counter}/>
		                <Route path="/index/user" component={loadComponent(User)}/>
					</Switch>
				</div>
            </div>
        );
    }
}

