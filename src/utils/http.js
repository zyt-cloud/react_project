import axios from 'axios';

import qs from 'qs'

const loginData = JSON.parse(window.localStorage.getItem('loginData') || '[]')
const access_token = loginData.access_token || ''

const instance = axios.create({
	timeout: 10000,
	baseURL: DHB_API,

	// withCredentials: true,
	data: {
		access_token: access_token
	},
	params: {
		access_token: access_token
	},

	headers: { 
		'Content-Type': 'application/x-www-form-urlencoded', 
		//'Authorization': access_token, // loginData.access_token.access_token
		// 'X-Requested-With': 'XMLHttpRequest'
	},

	transformRequest: [function (data, headers) {
	transformRequest: [function (data, headers) {
		console.log(headers)
    	return qs.stringify(data);
	}]
})

// instance.defaults.headers.common['Authorization'] = loginData.access_token;

/*instance.interceptors.request.use(config => {

	config.headers.Authorization = 'ilUqn1gpwxQt1D87ipSSLxly3R1grFpHcEe1xkj1';
	console.log('interceptors config=', config)

	return config
}, error => {
	return Promise.reject(error)
})*/

/*instance.interceptors.response.use(res => {

	console.log(res)
	return res
}, error => {
	return Promise.reject(error)
})*/

export default instance