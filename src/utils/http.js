import axios from 'axios';

import qs from 'qs'


const instance = axios.create({
	timeout: 10000,
	baseURL: DHB_API,

	headers: {'Content-Type': 'application/x-www-form-urlencoded'},

	transformRequest: [function (data, headers) {
		console.log(data)
    	return qs.stringify(data);
	}]
})

export default instance