
import React, {Component} from 'react';

import './about.css';
import './about.less';
import image from './cus_big.png';

export default class About extends Component{

	render(){
		return (
			<div className="about">
				<div>about component test this is about  ss</div>
				<img src={image} alt="" />
			</div>
		)
	}
}