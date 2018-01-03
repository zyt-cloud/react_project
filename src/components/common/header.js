import React, { Component } from 'react';

import { Switch } from 'antd';


export default class Header extends Component {

	changeMode = (value) => {
        this.setState({
            mode: value ? 'vertical' : 'inline',
        });
    }

    render() {
        
        const { toggleTheme } = this.props;

        return (
            <div className="dhb-header">
            	<Switch onChange={this.changeMode} /> Change Mode
                <span className="ant-divider" style={{ margin: '0 1em' }} />
                <Switch onChange={toggleTheme} /> Change Theme
            </div>
        );
    }
}

