import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import { Menu, Icon } from 'antd';
const { SubMenu } = Menu;




export default class Navbar extends Component {

    render() {
        const { theme, mode } = this.props;

        return (
            <div className="dhb-navbar">
                <Menu
                  style={{ height: '100%' }}
                  defaultSelectedKeys={['1']}
                  mode={mode}
                  theme={theme}
                  subMenuOpenDelay={0.1}
                >
                  <Menu.Item key="1">
                    <Icon type="mail" />
                    Navigation One
                  </Menu.Item>

                  <Menu.Item key="2">
                    <Icon type="calendar" />
                    Navigation Two
                  </Menu.Item>

                  <SubMenu key="sub1" title={<span><Icon type="appstore" /><span>Navigation Three</span></span>}>
                    <Menu.Item key="3"><Link to="/index/home">首页</Link></Menu.Item>
                    <Menu.Item key="4"><Link to="/login">login in</Link></Menu.Item>
                    <SubMenu key="sub1-2" title="Submenu">
                      <Menu.Item key="5">Option 5</Menu.Item>
                      <Menu.Item key="6">Option 6</Menu.Item>
                    </SubMenu>
                  </SubMenu>

                  <SubMenu key="sub2" title={<span><Icon type="setting" /><span>Navigation Four</span></span>}>
                    <Menu.Item key="7"><Link to="/index/about">关于</Link></Menu.Item>
                    <Menu.Item key="8"><Link to="/index/counter/zhangsan">计数</Link></Menu.Item>
                    <Menu.Item key="9"><Link to="/index/user">用户</Link></Menu.Item>
                    <Menu.Item key="10">Option 10</Menu.Item>
                  </SubMenu>

                </Menu>
            </div>
        );
    }
}

