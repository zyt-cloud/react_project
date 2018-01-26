import React, {Component} from 'react';


// export default class Hello extends Component {
class Helloo extends Component {
	componentDidMount() {
	  console.log('did')
	}
	render(){
		return <div>hello react{this.props.children}</div>
	}
}

export const Hello = Helloo
