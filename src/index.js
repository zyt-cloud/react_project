

import React from 'react';
import ReactDom from 'react-dom';

import RouterConfig from './router/router'
import { Provider } from 'react-redux';

import store from './redux/store';


import './assets/css/style.less';

if(process.env.NODE_ENV !== 'production'){
	require('../mock/mock');
}

/*console.log(18, process.env.npm_lifecycle_event)
console.log(process.env.DHB_API)
console.log(process.env.NODE_ENV)*/

if(module.hot){
	module.hot.accept();
}

const render = () => {
	ReactDom.render(
		<Provider store={store}>
			<RouterConfig />
		</Provider>
		,
		document.getElementById('app')
	);

}
render();
