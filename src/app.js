import React, { Component } from 'react';
import PropTypes from 'prop-types'

import axios from 'UTILS/http';

import Index from 'PAGES/index/index'

import { Route, Switch, NavLink } from 'react-router-dom'

import { Breadcrumb, Spin, Icon } from 'antd';

import { addTab } from 'REDUX/actions/index'



import Home from 'PAGES/home/home';

import About from 'PAGES/about/about';
import Counter from 'PAGES/counter/counter';
import PreVersion from 'PAGES/preversion/preversion';
// lazy load
import User from 'bundle-loader?lazy&name=user!PAGES/user/user';

import { loadComponent, AuthRoute } from 'UTILS/utils'


let windowWidth = window.innerWidth;

export default class App extends Component {

	
	constructor(props) {
	  super(props);
	
	  this.state = {
		isAffix: window.localStorage.getItem('_isAffix_') === 'T',
		showHelp: windowWidth >= 1600,
		// preUrl: this.context.store.getState().app.globalData.preVersionUrl,
		preUrl: PRE_URL,
		menus: [],
		menuRoute: [],
		localMenus: ['/Manager/about', '/Manager/home', '/Manager/counter/zhangsan', '/Manager/user']
	  }
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
	toggleAffix = (type) => {
		const flag = !this.state[type]
		
		this.setState({
			[type]: flag
		})
		if(type === 'isAffix'){
			window.localStorage.setItem('_' + type + '_', flag ? 'T' : 'F');
		}


		// highcharts 需要触发resize事件来动态更新chart reflow 重新适应容器大小
		setTimeout(() => {
			let e = document.createEvent('HTMLEvents');

			e.initEvent('resize', true, true);
			window.dispatchEvent(e);
		}, 400)
		
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

		const initEl = document.getElementById('init-sys')

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

		initEl.style.opacity = 0;

		setTimeout(() => {initEl.parentNode.removeChild(initEl)}, 150);

	}
	onRejected = (error) => {
		console.log(error)
	}
	componentDidMount() {
	  //?controller=OAuth2Menu&action=menu&company_id=311
	  axios.get('', {
	  	params: {
	  		controller: 'OAuth2Menu',
	  		action: 'menu',
	  		company_id: '311'
	  	}
	  })
	  /*axios.post('', {
  		controller: 'OAuth2Menu',
  		action: 'menu',
  		company_id: '311'
	  })
	  axios({
	  	url: '',
	  	method: 'post',
	  	data: {
	  		controller: 'OAuth2Menu',
	  		action: 'menu',
	  		company_id: '311'
	  	}
	  })*/
	  .then(this.onResolve,this.onRejected).catch(error => {
        this.onRejected(error)
      })
      window.addEventListener('message', this.receiveMsg)
	}
	componentWillUnmount() {
	  // window.localStorage.setItem('_isAffix_', this.state.isAffix ? 'T' : 'F');
	  window.removeEventListener('message', this.receiveMsg)
	}

    receiveMsg = (e) => {
      
      if(e.origin.includes('localhost')){
      	return;
      }
      const data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data;
      if(data.type === 'addTab'){
      	  const tab = {
	        // key: props.location.key, key
	        isActive: true,
	        name: data.name,
	        path: data.url,
	        url: data.url
	      }
	      this.addTab(tab)
	      
	      const history = this.props.history
	      history.push(data.url)
      }
      
    }
    addTab = (tab) => {
    	const { store } = this.context;
    	store.dispatch(addTab(tab, 0))
    }

    render() {
    	const { history } = this.props;
    	let {menus, menuRoute, localMenus, showHelp, preUrl,  _right = 0 } = this.state;
    	menuRoute = menuRoute.filter(item => localMenus.findIndex(localItem => localItem === item.path) === -1);

    	const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
    	const _windowWidth = window.innerWidth;
    	if(_windowWidth >= 1600 && showHelp){
    		_right = '194px';
    	}
    	

        return (
            <div>
            	<Index history={history} toggleAffix={this.toggleAffix} menus={menus} showHelp={showHelp} />

            	<div id="dhb-content" className="dhb-content" style={{left: this.state.isAffix ? '230px' : '110px', right: _right}}>
            		<div className="dhb-bread hide">
            		  <Breadcrumb>
					    <Breadcrumb.Item><NavLink to="/Manager/Home/index">首页</NavLink></Breadcrumb.Item>
					    <Breadcrumb.Item><a href="javascript:;">订单</a></Breadcrumb.Item>
					    <Breadcrumb.Item>订单管理</Breadcrumb.Item>
					  </Breadcrumb>
  					</div>
  					<div id="pre-version" style={{display: 'none'}}><iframe src={preUrl} frameBorder="0"></iframe></div>
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

			               {/* 次处为页面内部链接点击新增标签 */}

			                <Route render={props => {
			                	return <PreVersion addTab={this.addTab} {...props} />
			                }}/>
						</Switch>
					</div>
				</div>
            </div>
        );
    }
}

App.contextTypes = { store: PropTypes.object.isRequired }
