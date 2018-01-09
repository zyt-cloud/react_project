
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

export default createStore(combineReducers({...reducers}), initState, applyMiddleware(promiseMiddleware));