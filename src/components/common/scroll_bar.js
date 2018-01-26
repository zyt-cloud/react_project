
import React, { Component } from 'react';

/**
 * 自定义滚动条
 * @Author zyt
 * @Date   2018-01-26
 * @return {[type]}   [description]
 */
export default class ScrollBar extends Component {

	/*state = {
		height: 0,
		top:0
	}*/


	/*componentWillReceiveProps() {
	  const { offsetHeight, scrollHeight} = this.scrollWrap;

	  if(scrollHeight - offsetHeight > 4){
			this.setState({
				height: Math.pow(offsetHeight, 2) / scrollHeight + 'px'
			})
		}
	}*/


	mouseScroll = (e) => {


		e.stopPropagation();

		const { currentTarget: target, deltaY} = e;

		const { scrollTop, offsetHeight, scrollHeight} = target;

		

		
		if(scrollHeight - offsetHeight < 4){
			return;
		}

		const step = scrollHeight - offsetHeight > 30 ? 30 : scrollHeight - offsetHeight;

		if(deltaY > 0){
			if(scrollTop + offsetHeight === scrollHeight){
				return;
			}
			target.scrollTop = scrollTop + step;
		}
		else{
			if(scrollTop === 0){
				return;
			}
			target.scrollTop = scrollTop - step;
		}
		//this.setTop(scrollTop + step, scrollHeight)
	}
	/*setTop(scrollTop, scrollHeight){
		const height = this.state.height;

		this.setState({
			top: height * scrollTop / scrollHeight + 'px'
		})
	}*/

	render() {
		return (
			<div onWheel={this.mouseScroll} className="scroll-wrap">
				{this.props.children}
			</div>
		);
	}
}

