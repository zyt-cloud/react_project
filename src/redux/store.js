
import {createStore, applyMiddleware, combineReducers} from 'redux';
// import thunk from 'redux-thunk'

import promiseMiddleware from './promiseMiddleware';
import reducers from './reducers';

// const middlewares = [ promiseMiddleware ];

const initState = {
	app: {
		auth: {
			isAuthenticated: true
		}
	}
}
const _tabs_ = window.localStorage.getItem('_tabs_')
if(_tabs_){
	initState.app.tabs = JSON.parse(_tabs_);
}

export default createStore(combineReducers({...reducers}), initState, applyMiddleware(promiseMiddleware));