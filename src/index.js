// document.getElementById('app').innerHTML = 'it workds';

/*var test = str => {
	document.getElementById('app').innerHTML = str;
}
test('使用babel');*/

import React from 'react';
import ReactDom from 'react-dom';

// import {Hello} from './components/hello/hello'
import RouterConfig from './router/router'
import {Provider} from 'react-redux';

import store from './redux/store';

import './assets/css/style.less';

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
