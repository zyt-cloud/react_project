import React, { Component } from 'react';

import { Icon, Divider, Button, Modal, Tabs, Carousel  } from 'antd'

import appCode from '../../assets/img/app_code.png'

const TabPane = Tabs.TabPane;

/**
 * 帮助中心
 */
export default class Help extends Component {
	state = {
		visible: false
	}
	toggleModal = (e) => {
		console.log(e)
		this.setState({
			visible: !this.state.visible
		})
	}
	showModal = () => {
	    this.setState({
	      visible: true,
	    });
	}
	callback = (key) => {
		console.log(key)
	}

	render() {
		return (
			<div style={this.props.style} className="dhb-help">

				<Modal
		          title="新手须知"
		          visible={this.state.visible}
		          width={800}
		          destroyOnClose={true}
		          footer={null}
		          onCancel={this.toggleModal}
		        >
		          <p className="color000" style={{fontSize: '30px',lineHeight: '40px'}}>订货宝针企业的不同职务人员，产品价值侧重点不同，一切源于您业务场景的需要</p>
		          <Tabs defaultActiveKey="1" onChange={this.callback} className="help-tab">
				    <TabPane tab="老板和业务高管" key="1">
						<Carousel autoplay>
						    <div style={{height: '200px'}}><h3>1</h3></div>
						    <div><h3>2</h3></div>
						    <div><h3>3</h3></div>
						    <div><h3>4</h3></div>
						</Carousel>
				    </TabPane>
				    <TabPane tab="业务员" key="2">Content of Tab Pane 2</TabPane>
				    <TabPane tab="财务" key="3">Content of Tab Pane 3</TabPane>
				    <TabPane tab="下游订货商" key="4">Content of Tab Pane 4</TabPane>
				    <TabPane tab="技术与规格" key="5">Content of Tab Pane 5</TabPane>
				  </Tabs>
		        </Modal>

				<p className="help-title"><Icon type="question-circle-o" />帮助中心</p>
				<div className="help-link" onClick={this.toggleModal}>新手帮助</div>
				<div className="help-link help-video">视频学习</div>

				<div><Button className="help-button">帮助中心</Button></div>
				<div className="help-divider"><Divider /></div>

				<div className="help-title"><Icon type="customer-service" />在线客服</div>
				<div>服务经理</div>
				<Divider><Icon type="qq" style={{fontSize: '18px'}}/></Divider>
				<div><Button className="help-button">QQ咨询</Button></div>

				<Divider><Icon type="wechat" style={{color: '#3EC64C',fontSize: '18px'}} /></Divider>

				<div className="text-center"><img src={appCode} alt="" width="130" /></div>
				<Divider><Icon type="phone" /></Divider>

				<div className="help-hot-line text-center">400-6311-887</div>

				<div className="help-divider"><Divider /></div>

				<div className="help-title"><Icon type="file-unknown" />意见反馈</div>
				<div><Button className="help-button">立即反馈</Button></div>

				<div className="help-divider"><Divider /></div>

				<div className="help-title"><Icon type="global" />订货宝官网</div>
				<div><Button className="help-button" href="https://www.dhb168.com" target="_blank">立即访问</Button></div>
				
			</div>
		);
	}
}

