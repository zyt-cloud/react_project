
export const INCREMENT = 'increment';
export const DECREMENT = 'decrement';
export const RESET = 'rest';

export const USER_REQUEST = 'user_request';
export const USER_REQUEST_SUCC = 'user_request_succ';
export const USER_REQUEST_FAIL = 'user_request_fail';

export const TOGGLE_THEME = 'toggle_theme';

export const toggleTheme = () => {
	return {
		type: TOGGLE_THEME
	}
}

export const insrement = () => {
	return {
		type: INCREMENT
	}
}

export const decrement = () => {
	return {
		type: DECREMENT
	}
}

export const reset = () => {
	return {
		type: RESET
	}
}

const getRequest = () => {
	return {
		type: USER_REQUEST
	}
}
const getSuccess = (list) => {
	return {
		type: USER_REQUEST_SUCC,
		list: list
	}
}
const getFail = () => {
	return {
		type: USER_REQUEST_FAIL
	}
};

/*export const getUser = () => dispatch => {
	dispatch(getRequest())
	return axios.get('user.json')
		//.then(res => res.json())
		.then(data => {
			dispatch(getSuccess(data.data.list))
		})
		.catch(e => {
			dispatch(getFail())
		})
};*/


export const getUser = () => {
    return {
        types: [USER_REQUEST, USER_REQUEST_SUCC, USER_REQUEST_FAIL],
        promise: axios => axios.get(`user.json`)
    }
}