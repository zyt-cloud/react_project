import axios from 'axios';

const instance = axios.create({
	timeout: 10000,
	baseURL: DHB_API,

	transformRequest: [function (data, headers) {
		console.log(data)
    	return data;
	}]
})

export default instance