
import { combineReducers } from 'redux';

import * as types from '../actions/index';

const initGlobalStage = {
	mode: 'vertical',
    theme: 'light'
}
const initCountState = {
	count: 0
}

const initAuth = {
	isAuthenticated: true
}
const initTabs = [{isActive: true,name: "",path: "/Manager/home",url: "/",scrollTop: 0}];


const globalData = (state = initGlobalStage, action) => {
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
const closeTab = (tabs, tab, history) => {

	let _index = 0;

	if( tab === 'close_all' ){
		history.push('/Manager/home');
		return initTabs;
	}
	const _tabs = tabs.filter((item, index) => {
		if(item.path !== tab.path){
			return true
		}
		_index = index;
		return false;
	});
	if(tab.isActive){
		if(_index > 1){
			history.push(tabs[_index - 1].url)
		}
		else if(_index === 1 && _tabs.length > 1){
			history.push(tabs[_index + 1].url)
		}
		else{
			history.push('/Manager/home');
		}
	}
	
	return _tabs;
}

const tabs = (state = initTabs, action) => {
	switch(action.type){
		case types.ADD_TAB:
			let tabs = addTab(state, action.tab, action.scrollTop);

			window.localStorage.setItem('_tabs_', JSON.stringify(tabs))
			
			return tabs

		case types.CLOSE_TAB:

			return closeTab(state, action.tab, action.history)

		default:
			return state
	}
}

const auth = (state = initAuth, action) => {
	return state;
}


export default combineReducers({globalData, counter, auth, tabs});