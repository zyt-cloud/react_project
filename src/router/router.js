import React from 'React';
import {/*BrowserRouter*/HashRouter as Router, Route, Switch } from 'react-router-dom'


// lazy load
import Login from 'bundle-loader?lazy&name=login!PAGES/login/login';

import App from '../app';

import { loadComponent, AuthRoute } from 'UTILS/utils'

import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';


export default class RouterConfig extends React.Component{

	render() {
		return (
			<Router>
				<LocaleProvider locale={zhCN}>
					<div>
						<Switch>
							<AuthRoute exact path="/" component={App} />
							<Route path="/login" component={loadComponent(Login)}/>
							<AuthRoute path="/Manager" component={App}/>
							<AuthRoute path="/App" component={App}/>
							<Route render={() => (<div>404 NOT FOUND</div>)}/>
						</Switch>
					</div>
				</LocaleProvider>
			</Router>
		);
	}
}


