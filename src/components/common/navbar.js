import React from 'react';

import { NavLink } from 'react-router-dom';

import { Menu, Icon } from 'antd';
const { SubMenu } = Menu;


/*const menus = 
  [{
    name: '订单',
    iconType: 'exception',
    subs: [{
      name: '订单管理',
      isTitle: true,
      path: ''
    },{
      name: '关于',
      path: '/Manager/about'
    },{
      name: '订单明细',
      isTitle: true,
      path: ''
    },{
      name: '测试',
      isTitle: false,
      path: '/Manager/test'
    },{
      name: '关于',
      isTitle: true,
      path: '/Manager/home'
    }]
  },{
    name: '运营',
    iconType: 'trophy',
    subs: [{
      name: 'login',
      path: '/login'
    },{
      name: '计数',
      path: '/Manager/counter/zhangsan'
    }]
  },{
    name: '商品',
    iconType: 'appstore-o',
    subs: [{
      name: 'login',
      path: '/login'
    },{
      name: '用户',
      path: '/Manager/user'
    }]
  },{
    name: '库存',
    iconType: 'database',
    subs: []
  },{
    name: '客户',
    iconType: 'user',
    subs: []
  },{
    name: '资金',
    iconType: 'pay-circle-o',
    subs: []
  },{
    name: '营销',
    iconType: 'fork',
    subs: []
  },{
    name: '报表',
    iconType: 'pie-chart',
    subs: []
  }];*/


export default class Navbar extends React.Component {

    constructor(props) {
      super(props);

      const { tabs, menus } = this.props;
      const menuIndex = this.findMenuIndex(tabs, menus);
      const isAffix = window.localStorage.getItem('_isAffix_') === 'T';

      this.state = {
        showSub: isAffix,
        isAffix: isAffix,
        subs: menuIndex > -1 ? menus[menuIndex].subs : [],
        menuIndex
      };
    }

    findMenuIndex(tabs, menus){
      const tab = tabs.find( item => item.isActive === true );


      if(!tab){
        return -1;
      }

      return menus.findIndex( (item, index) => item.subs.find( subItem => subItem.path === tab.url ) );

    }
    componentWillReceiveProps(nextProps) {
      const { tabs, menus } = nextProps;
      const menuIndex = this.findMenuIndex(tabs, menus);

      if(menuIndex < 0) return

      this.setState({
        subs: menus[menuIndex].subs,
        menuIndex
      })
    }

    shouldComponentUpdate(nextProps, nextState) {
      return this.props.tabs !== nextProps.menus || this.props.tabs !== nextProps.tabs || nextState !== this.state;
    }

    resetActive(obj){
      const { tabs, menus } = this.props;
      const index = this.findMenuIndex(tabs, menus);

      if(index > -1 && index !== this.state.menuIndex){
        obj.menuIndex = index;
        obj.subs = menus[index].subs;
      }

      this.setState(obj)
    }

    toggleSubMenu = (e) => {

      const { type } = e;

      if(type === 'mouseenter'){

        // 清除关闭定时器
        this.closeMenuTimer()

        if(this.state.showSub){
          return;
        }
        this.setState({
          showSub: true
        })
      }
      else{
        this.setMenuTimer();
      }

      
    }
    enterSubMenu = (e) => {
      const { type } = e;

      if(type === 'mouseenter'){
        this.closeMenuTimer()
      }
      else{
        this.setMenuTimer();
      }
    }
    // 设置定时器
    setMenuTimer(){
      this.toggleMenuTimer = setTimeout(() => {
        const obj = {}

        if(!this.state.isAffix){
          obj.showSub = false
        }

        this.resetActive(obj);
      }, 200)
    }

    // 关闭定时器
    closeMenuTimer(){
      if(this.toggleMenuTimer){
        clearTimeout(this.toggleMenuTimer)
      }
    }

    switchSubMenu(index, e) {
      const { type } = e;

      if(type === 'mouseenter'){
        this.switchTimer = setTimeout(() => {

          const { menus } = this.props;

          this.setState({
            subs: menus[index].subs,
            menuIndex: index
          })

          this.switchTimer = null;
        }, 200)
      }
      else{
        if(this.switchTimer){
          clearTimeout(this.switchTimer)
        }
      }
      
    }

    toggleAffix = () => {
      const { toggleAffix } = this.props; 
      toggleAffix();
      this.setState({
        isAffix: !this.state.isAffix
      })
    }


    render() {
        const { menus } = this.props;

        return (
          <div>
            <div className="dhb-navbar">
              <div onMouseEnter={this.toggleSubMenu} onMouseLeave={this.toggleSubMenu}>
                <ul className="dhb-menu">
                  {menus.map((item, index) => (
                    <li 
                      onMouseEnter={this.switchSubMenu.bind(this, index)} 
                      onMouseLeave={this.switchSubMenu.bind(this, index)} 
                      key={index} 
                      className={`menu-item ${index === this.state.menuIndex ? 'active' : ''}`}>
                        <Icon className="dhbicon" type={item.iconType} />{item.name}
                    </li>
                  ))}
                  
                </ul>
              </div>
            </div>
            <div onMouseEnter={this.enterSubMenu} onMouseLeave={this.enterSubMenu} className={`dhb-sub-menu ${this.state.showSub || this.state.isAffix ? '' : 'hide-submenu'}`}>
              <div className="dhb-affix" onClick={this.toggleAffix}>
                <div><Icon type={this.state.isAffix ? 'swap-left' : 'swap-right'} /></div>
                {this.state.isAffix ? '收起' : '固定'}
              </div>
              <ul>
                {this.state.subs.map((item, index) => (
                    item.isTitle 
                    ?
                    <li key={index} className="sub-menu-title">{item.name}</li>
                    :
                    <li key={index}><NavLink exact={true} className="sub-item" to={item.path}>{item.name}</NavLink></li>
                  )
                )}  
              </ul>
            </div>
            
          </div>
        );
    }
}
