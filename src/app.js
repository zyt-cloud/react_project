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

import store from './redux/store';

export default class App extends Component {

	componentWillReceiveProps(nextProps, ...arg) {

	  this.preState = store.getState();
	}

	componentDidUpdate(prevProps, prevState) {
	  const tab = this.preState.app.tabs.find(item => item.isActive === true);

	  if(tab && tab.scrollTop){
	  	window.scrollTo(0, tab.scrollTop);
	  }
	}
    render() {
    	const { history } = this.props;
        return (
            <div>
            	<Index history={history} />

            	<div className="dhb-content">
					<Switch>
						<AuthRoute name="首页" exact path="/" component={Home} />
						
						<AuthRoute name="首页" path="/index/home" component={Home}/>
		                <AuthRoute name="关于" path="/index/about" component={About}/>
		                <AuthRoute name="计数" path="/index/counter/:name" component={Counter}/>
		                <AuthRoute name="用户" path="/index/user" component={User.mod || loadComponent(User)}/>
					</Switch>
				</div>
            </div>
        );
    }
}

