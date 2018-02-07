import React, {Component} from 'react';


// export default class Hello extends Component {
class Helloo extends Component {
	componentDidMount() {
	  console.log('did')
	}
	render(){
		return <div>{this.props.children}</div>
	}
}

export const Hello = Helloo


const test = '测试 vscode git'