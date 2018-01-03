
import {createStore, applyMiddleware, combineReducers} from 'redux';
// import thunk from 'redux-thunk'

import promiseMiddleware from './promiseMiddleware';
import reducers from './reducers';

// const middlewares = [ promiseMiddleware ];

export default createStore(combineReducers({...reducers}), applyMiddleware(promiseMiddleware));