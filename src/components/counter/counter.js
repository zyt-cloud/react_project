
import React, {Component} from 'react'
// import store from '../../redux/store';
import {connect} from 'react-redux';

import {insrement, decrement, reset} from '../../redux/actions/index'

class Counter extends Component{
	/*constructor(){
		super();
		this.state = {
			counter: store.getState().counter
		}
		
	}*/
	componentDidMount(){
		console.log('counter', this);
		/*store.subscribe(() => {
			this.setState({
				counter: store.getState().counter
			})
		})*/
	}
	shouldComponentUpdate(pre, next){
		console.log(pre, next);
		return true;
	}
	render(){

		let {counter, insrement, decrement, reset } = this.props;

		return (
			<div>
                <div>当前计数为({counter.count})</div>
                <button onClick={() => {
                    insrement()
                }}>自增
                </button>
                <button onClick={decrement}>自减
                </button>
                <button onClick={() => {
                    reset()
                }}>重置
                </button>
            </div>
		)
	}
}
const mapStateToProps = (state, ...arg) => {
	console.log(50,state)
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