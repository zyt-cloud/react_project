import React from 'React';
import {BrowserRouter/*HashRouter*/ as Router, Route, Switch } from 'react-router-dom'



import Login from 'bundle-loader?lazy&name=login!PAGES/login/login';

import App from '../app';

import { loadComponent, AuthRoute } from 'UTILS/utils'




export default class RouterConfig extends React.Component{
	componentDidMount() {
		// preload
		// User(() => {})
	}
	render() {
		return (
			<Router>
				<div>
					<Switch>
						<AuthRoute exact path="/" component={App} />
						<Route path="/login" component={loadComponent(Login)}/>
						<Route path="/index" component={App}/>
						<Route render={() => (<div>404 NOT FOUND</div>)}/>
					</Switch>
					
				</div>
			</Router>
		);
	}
}


