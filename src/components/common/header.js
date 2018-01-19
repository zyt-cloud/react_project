import React, { Component } from 'react';

import { Tag, Icon, Button, Dropdown, Menu } from 'antd';

import { triggerRefresh } from 'UTILS/utils';

export default class Header extends Component {

	/*changeMode = (value) => {
        this.setState({
            mode: value ? 'vertical' : 'inline',
        });
    }*/
    constructor(props) {
      super(props);
    
      this.state = {
        showTabsCount: this.calShowTabsCount()
      };
    }
    calShowTabsCount(){
        const pageWidth = window.innerWidth;
        const tabWrapWidth = pageWidth - 400;
        console.log(Math.floor(tabWrapWidth / 110))

        return Math.floor(tabWrapWidth / 110);
    }
    refreshTab = () => {
       triggerRefresh();
    }
    closeTab(tab, e)  {
        e && e.stopPropagation();

        const { closeTab, history } = this.props;

        closeTab(tab, history)
    }
    changeLocation(tab, e){
        if(tab.isActive || e.target.tagName.toLowerCase() === 'i'){
            return;
        }
        const { history } = this.props;
        history.push(tab.url)
    }

    componentDidMount() {

      window.addEventListener('resize', this.resizeWindow)
    }
    // 动态计算tab标签数量
    resizeWindow = (e) => {
        const showTabsCount = this.calShowTabsCount();
        if(showTabsCount !== this.state.showTabsCount){
            if(this.tabTimer){
                clearTimeout(this.tabTimer);
            }
            this.tabTimer = setTimeout(() => {
                this.setState({showTabsCount});
                this.tabTimer = null;
            }, 100)
        }
    }
    componentWillUnmount() {
      window.removeEventListener('resize', this.resizeWindow)
    }

    getMoreMenu(){
        const tabs = this.props.tabs.filter((tab, index) => index > 0)
        const { showTabsCount } = this.state;
        const moreTabs = tabs.filter((item, index) => index >= showTabsCount - 1);

        const isActiveMore = moreTabs.find(item => item.isActive === true);
        let preActive = isActiveMore;

        if(isActiveMore){
            window.localStorage.setItem('_preActive_',JSON.stringify(isActiveMore))
        }
        else{
            preActive = JSON.parse(window.localStorage.getItem('_preActive_'));
            preActive.isActive = false;
        }
        

        let moreMenu;

        if(moreTabs.length > 1){
            moreMenu = (
                <Menu style={{width: '200px'}}>
                    {moreTabs.map((tab, index) => (
                        <Menu.Item key={index}>
                          <div onClick={this.changeLocation.bind(this, tab)} className={`more-tab-item ${tab.isActive?'active':''}`}><Icon onClick={this.closeTab.bind(this, tab)} className="pull-right" type="close"/>{tab.name}</div>
                        </Menu.Item>
                    ))}

                </Menu>
            )
        }

        return moreTabs.length === 1 ? (
            <Tag key={moreTabs[0].path} className={`tab-item ${moreTabs[0].isActive?'active':''}`} onClick={this.changeLocation.bind(this, moreTabs[0])} afterClose={this.closeTab.bind(this, moreTabs[0])} closable={true}>
                {moreTabs[0].name}
            </Tag>
        ) : (
            <Dropdown overlay={moreMenu}>
                <Tag onClick={this.changeLocation.bind(this, preActive)} className={`tab-item ${preActive.isActive?'active':''}`} closable={false}>
                    {preActive.name}<Icon style={{marginTop: '16px'}} className="pull-right" type="down" />
                </Tag>
            </Dropdown>
        )
    }

    render() {
        const { toggleTheme, closeTab } = this.props;
        const tabs = this.props.tabs.filter((tab, index) => index > 0)
        console.log(this.state.showTabsCount, tabs)

        return (
            <div className="dhb-header">
                <div className="dhb-logo"><Icon type="copyright" />订货宝</div>
                <div className="tab-wrap" ref={(tabWrap) => {this.tabWrap = tabWrap}}>
                    <div>
                        {tabs.filter((item, index) => index < this.state.showTabsCount - 1).map((tab, index) => (
                            <Tag key={index} className={`tab-item ${tab.isActive?'active':''}`} onClick={this.changeLocation.bind(this, tab)} afterClose={this.closeTab.bind(this, tab)} closable={true}>
                                {tab.name}
                            </Tag>
                        ))}
                        {tabs.length > this.state.showTabsCount - 1 ? this.getMoreMenu() : ''}
                        
                    </div>
                </div>
                <div><Button shape="circle" onClick={this.refreshTab} icon="reload" /></div>
            </div>
        );
    }
}

