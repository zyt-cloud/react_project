

import React from 'react';
import ReactDom from 'react-dom';

import RouterConfig from './router/router'
import { Provider } from 'react-redux';

import store from './redux/store';


import './assets/css/style.less';
import './assets/css/media.less';

if(process.env.NODE_ENV !== 'production'){
	require('../mock/mock');
}


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
