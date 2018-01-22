import React, { Component } from 'react';
import PropTypes from 'prop-types'

import axios from 'axios';

import Index from 'PAGES/index/index'

import { Route, Switch, NavLink } from 'react-router-dom'

import { Breadcrumb } from 'antd';



import Home from 'PAGES/home/home';

import About from 'PAGES/about/about';
import Counter from 'PAGES/counter/counter';
import PreVersion from 'PAGES/preversion/preversion';
// lazy load
import User from 'bundle-loader?lazy&name=user!PAGES/user/user';

import { loadComponent, AuthRoute } from 'UTILS/utils'


export default class App extends Component {

	state = {
		isAffix: window.localStorage.getItem('_isAffix_') === 'T',
		preUrl: this.context.store.getState().app.globalData.preVersionUrl,
		menus: [],
		menuRoute: [],
		localMenus: ['/Manager/about', '/Manager/home', '/Manager/counter/zhangsan', '/Manager/user']
	}

	componentWillReceiveProps(nextProps) {
	  this.preState = this.context.store.getState();
	}

	componentDidUpdate(prevProps, prevState) {
		if(!this.preState){
			return;
		}
	    const tab = this.preState.app.tabs.find(item => item.isActive === true);

	    if(tab && !Number.isNaN(tab.scrollTop)){
	  	  // window.scrollTo(0, tab.scrollTop);
	  	  document.getElementById('dhb-content').scrollTop = tab.scrollTop;
	    }
	}
	toggleAffix = () => {
		const flag = !this.state.isAffix
		
		this.setState({
			isAffix: flag
		})

		window.localStorage.setItem('_isAffix_', flag ? 'T' : 'F');
	}
	initMenus(menus){
		const menuRoute = []
		menus.forEach(item => {
			let subs = [];
			item.subs.forEach((subItem, index) => {
				subItem.path = '/' + subItem.url;
				subs.push(subItem);

				if( subItem.isTitle ){
					subItem.subs.forEach(sub => {sub.path = '/' + sub.url})
					subs.push(...subItem.subs)
					menuRoute.push(...subItem.subs)
				}else{
					menuRoute.push(subItem)
				}
			})

			item.subs = subs;

		})
		return menuRoute;
	}
	onResolve = (res) => {

		const menuRoute = this.initMenus(res.data.data);

		res.data.data[0].subs.push({
			name: '关于',
			path: '/Manager/about',
			url: '/Manager/about'
		})
		res.data.data[1].subs.push({
			name: '计数',
			path: '/Manager/counter/zhangsan',
			url: '/Manager/counter/zhangsan'
		})
		res.data.data[2].subs.push({
			name: '用户',
			path: '/Manager/user',
			url: '/Manager/user'
		})
		this.setState({
			menus: res.data.data,
			menuRoute
		})
	}
	onRejected = (error) => {
		console.log(error)
	}
	componentDidMount() {
	  axios.get(`http://api.newdhb.com/api.php?controller=OAuth2Menu&action=menu&company_id=311`).then(this.onResolve,this.onRejected).catch(error => {
        onRejected(error)
      })
	}
	/*componentWillUnmount() {
	  window.localStorage.setItem('_isAffix_', this.state.isAffix ? 'T' : 'F');
	}*/
	menuRouter(menus){

	}

    render() {
    	const { history } = this.props;
    	let {menus, menuRoute, localMenus } = this.state;
    	menuRoute = menuRoute.filter(item => localMenus.findIndex(localItem => localItem === item.path) === -1);


        return (
            <div>
            	<Index history={history} toggleAffix={this.toggleAffix} menus={this.state.menus} />

            	<div id="dhb-content" className="dhb-content" style={{left: this.state.isAffix ? '230px' : '110px'}}>
            		<div className="dhb-bread">
            		  <Breadcrumb>
					    <Breadcrumb.Item><NavLink to="/Manager/Home/index">首页</NavLink></Breadcrumb.Item>
					    <Breadcrumb.Item><a href="javascript:;">订单</a></Breadcrumb.Item>
					    <Breadcrumb.Item>订单管理</Breadcrumb.Item>
					  </Breadcrumb>
  					</div>
  					<div id="pre-version" style={{display: 'none'}}><iframe src={this.state.preUrl} frameBorder="0"></iframe></div>
  					<div className="dhb-wrap">
						<Switch>
							<AuthRoute name="首页" exact path="/" component={Home} />
							<AuthRoute name="首页" exact path="/Manager/home" component={Home}/>
							<AuthRoute name="首页" path="/Manager/Home/index" component={PreVersion}/>
			                <AuthRoute name="关于" path="/Manager/about" component={About}/>
			                <AuthRoute name="计数" path="/Manager/counter/:name" component={Counter}/>
			                <AuthRoute name="用户" path="/Manager/user" component={User.mod || loadComponent(User)}/>
			                {
			                	menuRoute.map((item, index) => (
			                		<AuthRoute key={item.path} name={item.name} path={item.path} component={PreVersion}/>
			                	))
			                }
						</Switch>
					</div>
				</div>
            </div>
        );
    }
}

App.contextTypes = { store: PropTypes.object.isRequired }
