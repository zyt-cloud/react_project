
import {combineReducers} from 'redux';

import * as types from '../actions/index';

const initThemeStage = {
	mode: 'vertical',
    theme: 'light'
}
const initCountState = {
	count: 0
}

const initAuth = {
	isAuthenticated: true
}
const initTabs = [];


const theme = (state = initThemeStage, action) => {
	switch(action.type){
		case types.TOGGLE_THEME:

			return {
				...state,
				theme: state.theme === 'light' ? 'dark' : 'light'
			}

		default:
			return state
	}
}
const counter = (state = initCountState, action) => {
	switch(action.type){
		case types.INCREMENT:

			return {
				count: state.count + 1
			}

		case types.DECREMENT:

			return {
				count: state.count - 1
			}

		case types.RESET:

			return {
				count: 0
			}

		default:
			return state
	}
}
/**
 * @Author zyt
 * @Date   2018-01-08
 * @param  {[type]}   tabs [description]
 * @param  {[type]}   tab  [description]
 * @return {[type]}        [description]
 */
const addTab = (tabs, tab, scrollTop) => {
	let index = tabs.findIndex(item => item.path === tab.path);

	tabs.find(item => {
		if(item.isActive){
			item.isActive = false;
			item.scrollTop = scrollTop;
			return true;
		}
	});

	if(index > -1){
		tabs[index].isActive = true;
		return [...tabs];
	}

	return [...tabs, tab];
}
/**
 * @Author zyt
 * @Date   2018-01-08
 * @param  {[type]}   tabs [description]
 * @param  {[type]}   key  [description]
 * @return {[type]}        [description]
 */
const closeTab = (tabs, path) => {
	return tabs.filter((item) => item.path !== path);
}

const tabs = (state = initTabs, action) => {
	switch(action.type){
		case types.ADD_TAB:

			return addTab(state, action.tab, action.scrollTop)

		case types.CLOSE_TAB:

			return closeTab(state, action.path)

		default:
			return state
	}
}

const auth = (state = initAuth, action) => {
	return state;
}


export default combineReducers({theme, counter, auth, tabs});