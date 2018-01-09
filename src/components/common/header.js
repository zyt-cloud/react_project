import React, { Component } from 'react';

import { Switch, Tag, Button } from 'antd';

import { triggerRefresh } from 'UTILS/utils';

export default class Header extends Component {

	/*changeMode = (value) => {
        this.setState({
            mode: value ? 'vertical' : 'inline',
        });
    }*/
    refreshTab = () => {
       triggerRefresh();
    }
    closeTab(path, e)  {
        const { closeTab } = this.props;
        closeTab(path)
    }
    changeLocation(tab, e){
        if(tab.isActive || e.target.tagName.toLowerCase() === 'i'){
            return;
        }
        const { history } = this.props;
        history.push(tab.url)
    }

    render() {
        console.log(22, this.props)
        const { toggleTheme, tabs, closeTab } = this.props;

        return (
            <div className="dhb-header">
                <Button type="primary" onClick={this.refreshTab}>refreshTab</Button>

                <span className="ant-divider" style={{ margin: '0 1em' }} />
                <Switch onChange={toggleTheme} /> Change Theme
                {tabs.map(tab => {
                    return <Tag key={tab.path} color={tab.isActive?'#108ee9':'blue'} onClick={this.changeLocation.bind(this, tab)} afterClose={this.closeTab.bind(this, tab.path)} closable={true}>{tab.name}</Tag>
                })}
            </div>
        );
    }
}

