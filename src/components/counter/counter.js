
import React, {Component} from 'react'
// import store from '../../redux/store';
import {connect} from 'react-redux';

import PropTypes from 'prop-types'

import {insrement, decrement, reset} from '../../redux/actions/index'

import {Hello} from 'PAGES/hello/hello'

class Test extends Component{

	
	render(){
		let { children: childs, index } = this.props;
		// childs = React.Children.toArray(childs)
		let result; 


		let child = void 0;
		React.Children.forEach(childs, (item, i) => {

			if(index === i){
				child = item;
			}
		})
		result = child ? React.cloneElement(child) : null;
		console.log(result)
		console.log(childs[index])


		/*result = React.Children.map(childs, (item, i) => {
			return index === i ? React.cloneElement(item) : ''
		})
		console.log(result[index] === childs[index])*/
		
		return result
	}
}


class Counter extends Component{
	constructor(){
		super();
		this.state = {
			show: 0
		}
		
	}
	componentDidMount(){
		/*store.subscribe(() => {
			this.setState({
				counter: store.getState().counter
			})
		})*/
	}
	setChild = (e) => {
		const index = Number.parseInt(e.target.innerHTML);
		this.setState({
			show: index
		})
	}

	render(){
		console.log(this)

		let {counter, insrement, decrement, reset } = this.props;

		return (
			<div style={{height: '900px'}}>
                <div>当前计数为({counter.count})</div>
                <button onClick={() => {
                    insrement()
                }}>自增
                </button>
                <button onClick={decrement}>自减
                </button>
                <button onClick={reset}>重置
                </button>
                <div>
					<button onClick={this.setChild}>0</button>
					<button onClick={this.setChild}>1</button>
					<button onClick={this.setChild}>2</button>
				</div>
                <Test index={this.state.show}>
                	<Hello>1</Hello>
                	<Hello>2</Hello>
                	<Hello>3</Hello>
                </Test>
            </div>
		)
	}
}
Counter.contextTypes = {
	name: PropTypes.string
}
const mapStateToProps = (state, ...arg) => {
	return {
		counter: state.app.counter
	}
};

/*const mapDispatchToProps = dispatch => {
	return {
		insrement: () => {
			dispatch(insrement())
		},
		decrement: () => {
			dispatch(decrement())
		},
		reset: () => {
			dispatch(reset())
		}
	}
}*/
const mapDispatchToProps = {
	insrement,
	decrement,
	reset
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter)