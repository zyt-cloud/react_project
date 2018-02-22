import React, { Component } from 'react';

import { Link } from 'react-router-dom'

import { Tag, Icon, Button, Dropdown, Menu, Avatar, Badge } from 'antd';

import { triggerRefresh } from 'UTILS/utils';

import dhbLogo from '../../assets/img/logo.png';

const refreshMenu = (context) => (
    <Menu onClick={context.refreshClick} style={{width: '140px'}}>
        <Menu.Item key="reload">
          <div className="action-item"><Icon type="reload" />刷新当前</div>
        </Menu.Item>
        <Menu.Item key="close_curr">
          <div className="action-item"><Icon type="close" />关闭当前</div>
        </Menu.Item>
        <Menu.Item key="close_all">
          <div className="action-item"><Icon type="poweroff" />关闭全部</div>
        </Menu.Item>
    </Menu>
)
const myMenu = (context) => (
    <Menu onClick={context.refreshClick} style={{width: '140px'}}>
        <Menu.Item key="4">
          <div className="action-item user-account">dhb168</div>
        </Menu.Item>
        <Menu.Item key="1">
          <div className="action-item"><Icon type="user" />我的账号</div>
        </Menu.Item>
        <Menu.Item key="2">
          <div className="action-item"><Icon type="lock" />修改密码</div>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3">
          <div className="action-item"><Icon type="logout" />退出登录</div>
        </Menu.Item>
    </Menu>
)

const message = (context) => (
    <Menu style={{width: '280px'}}>
        <Menu.Item key="1">
          <div className="action-item">
            <i className="header-msg-icon"></i>
            <div>
                <div>你收到一条站内消息</div>
                <div className="header-time">5天前</div>
            </div>
          </div>
        </Menu.Item>
        <Menu.Item key="2">
          <div className="action-item order-msg">
            <i className="header-msg-icon"></i>
            <div>
                <div>你收到一条订单消息</div>
                <div className="header-time">5天前</div>
            </div>
          </div>
        </Menu.Item>
        <Menu.Item key="3">
          <div className="action-item words-msg">
            <i className="header-msg-icon"></i>
            <div>
                <div>你收到一条留言咨询</div>
                <div className="header-time">5天前</div>
            </div>
          </div>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="4">
          <div className="action-item"><Link to="/Manager/RedPacket/top" className="go-msg-center">进入消息中心</Link></div>
        </Menu.Item>
    </Menu>
)

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
        let pageWidth = window.innerWidth;
        pageWidth = pageWidth < 1280 ? 1280 : pageWidth;
        const tabWrapWidth = pageWidth - 400;

        return Math.floor(tabWrapWidth / 110);
    }
    refreshTab = () => {
       triggerRefresh();
    }
    toHome = () => {
        const { history } = this.props;

        history.push('/Manager/home')
    }
    refreshClick = (e) => {
        const { key } = e;
        switch(key){
            case 'reload':
                this.refreshTab();
                break;

            case 'close_curr':
                const { tabs } = this.props;
                const index = tabs.findIndex(item => item.isActive === true);

                if(index > 0){
                    this.closeTab(tabs[index]);
                }
                
                break;

            case 'close_all':
                this.closeTab(key);
                break;
        }
    }
    closeTab(tab, e) {

        e && e.stopPropagation();
    
        const { closeTab, history } = this.props;

        closeTab(tab, history)
    }
    changeLocation(tab, e){
        if(tab.isActive || e.target.tagName.toLowerCase() === 'i'){
            return;
        }
        const { history } = this.props;
        const to = {
            pathname: tab.url,
            state: {
                path: tab.path,
                name: tab.name
            }
        }
        history.push(to)
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
            }, 170)
        }
    }
    componentWillUnmount() {
      window.removeEventListener('resize', this.resizeWindow)
    }
    toggleHelp = () => {
      const { toggleAffix } = this.props; 
      toggleAffix('showHelp');
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
                        <Menu.Item key={tab.path}>
                          <div onClick={this.changeLocation.bind(this, tab)} className={`more-tab-item ${tab.isActive?'active':''}`}><Icon onClick={this.closeTab.bind(this, tab)} className="pull-right" type="close"/>{tab.name}</div>
                        </Menu.Item>
                    ))}

                </Menu>
            )
        }

        return moreTabs.length === 1 ? (
            <Tag key={moreTabs[0].path} style={{left: (showTabsCount - 1) * -10 + 'px'}} className={`tab-item ${moreTabs[0].isActive?'active':''}`} onClick={this.changeLocation.bind(this, moreTabs[0])} afterClose={this.closeTab.bind(this, moreTabs[0])} closable={true}>
                {moreTabs[0].name}
            </Tag>
        ) : (
            <Dropdown overlay={moreMenu}>
                <div onClick={this.changeLocation.bind(this, preActive)} style={{left: (showTabsCount - 1) * -10 + 'px', display: 'inline-block', cursor: 'pointer'}} className={`tab-item ${preActive.isActive?'active':''}`}>
                    <span style={{display: 'inline-block', width: '70px'}}>{preActive.name}</span><Icon type="down" />
                </div>
            </Dropdown>
        )
    }

    render() {
        const { toggleTheme, closeTab } = this.props;
        const tabs = this.props.tabs.filter((tab, index) => index > 0)

        return (
            <div className="dhb-header">
                <div className="dhb-logo" onClick={this.toHome}>
                    <span className=""><img src={dhbLogo} alt="" /></span>
                    <span className="dhb-version-type">专业版</span>
                    <span><Icon type="rollback" />首页</span>
                </div>
                <div className="tab-wrap" ref={(tabWrap) => {this.tabWrap = tabWrap}}>
                    <div>
                        {tabs.filter((item, index) => index < (this.state.showTabsCount - 1)).map((tab, index) => (
                            <Tag key={tab.path} style={{zIndex: 200 - index, left: index * -10 + 'px'}} className={`tab-item ${tab.isActive?'active':''}`} onClick={this.changeLocation.bind(this, tab)} afterClose={this.closeTab.bind(this, tab)} closable={true}>
                                {tab.name}
                            </Tag>
                        ))}

                        {tabs.length > this.state.showTabsCount - 1 ? this.getMoreMenu() : ''}
                        
                    </div>
                </div>
                <div>
                    <Dropdown overlay={refreshMenu(this)}>
                        <span className="header-action" onClick={this.refreshTab}><Icon type="reload" /></span>
                    </Dropdown>
                    <Dropdown overlay={message(this)} placement="bottomCenter">
                        <span className="header-action"><Badge dot><Icon type="bell" /></Badge></span>
                    </Dropdown>
                    <span onClick={this.toggleHelp} className="header-action"><Icon type="question-circle-o" /></span>
                    <Dropdown overlay={myMenu(this)} placement="bottomRight">
                        <span className="header-action"><Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>D</Avatar></span>
                    </Dropdown>
                </div>
            </div>
        );
    }
}

