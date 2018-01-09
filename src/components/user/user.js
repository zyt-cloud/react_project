
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import { getUser } from 'REDUX/actions/index'

import { setRefresh, removeRefresh } from 'UTILS/utils';

const Item = (props) => (
	<li className="a">{props.item.goods_name}</li>
) 

const Test = (props) => {
	const div = document.createElement('div');
	document.body.appendChild(div);

	console.log(Date.now())

	return ReactDOM.render((
		<div>
			<p>title</p>
			<div>{props.children}</div>
		</div>
	), div);
}
class User extends Component{

	componentDidMount(){

		const { user, getUser } = this.props;

		setRefresh(() => {
			getUser();
		});

		if(user.list && user.list.length > 0){
			return;
		}
		getUser();
	}

	componentWillUnmount() {
		removeRefresh();
	}
	
	test = (e) => {
		console.log(this)
		console.log(e.target.getAttribute('data-name'))
		Test({children: React.createElement('h1', null, 'hhhhhaa')})
	}

	render(){
		
		const {isLoading, list, msg} = this.props.user;
		const {getUser} = this.props;
		return (
			<div>
				<p data-name="zhangsan" onClick={this.test}>users</p>
				
				<ul>
					{isLoading ? 
						<div>加载数据中...</div>
						:
						list.map(item => 
							<Item key={item.goods_id} item={item} />
						)
					}

					<div><button type="button" disabled={isLoading} onClick={getUser}>获取列表</button></div>
				</ul>
			</div>
		)
	}
}
const mapStateToProps = state => ({
	user: state.user
})
const mapDispatchToProps = {
	getUser
};

export default connect(mapStateToProps, mapDispatchToProps)(User);