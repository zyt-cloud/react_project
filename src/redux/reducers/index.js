
import {combineReducers} from 'redux';

import {INCREMENT, DECREMENT, RESET, TOGGLE_THEME} from '../actions/index';

const initThemeStage = {
	mode: 'vertical',
    theme: 'light'
}
const initCountState = {
	count: 0
}

const theme = (state = initThemeStage, action) => {
	switch(action.type){
		case TOGGLE_THEME:

			return {
				...state,
				theme: state.theme === 'light' ? 'dark' : 'light'
			}

		case DECREMENT:

			return {
				count: state.count - 1
			}

		case RESET:

			return {
				count: 0
			}

		default:
			return state
	}
}
const counter = (state = initCountState, action) => {
	switch(action.type){
		case INCREMENT:

			return {
				count: state.count + 1
			}

		case DECREMENT:

			return {
				count: state.count - 1
			}

		case RESET:

			return {
				count: 0
			}

		default:
			return state
	}
}

export default combineReducers({theme, counter});