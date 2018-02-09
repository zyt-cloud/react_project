import React, { Component } from 'react';

import { Icon, Divider, Button, Modal, Tabs, Carousel  } from 'antd'

import appCode from '../../assets/img/app_code.png'

import ScrollBar from 'PAGES/common/scroll_bar'

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
				<ScrollBar>
				<Modal
		          title="新手须知"
		          visible={this.state.visible}
		          width={800}
		          destroyOnClose={true}
		          footer={null}
		          onCancel={this.toggleModal}
		        >
		          <p className="color000" style={{fontSize: '20px',lineHeight: '30px',marginBottom: '10px'}}>订货宝针企业的不同职务人员，产品价值侧重点不同，一切源于您业务场景的需要</p>
		          <Tabs defaultActiveKey="1" onChange={this.callback} className="help-tab">
				    <TabPane tab="老板和业务高管" key="1">
						<Carousel autoplay>
						    <div><img src={require('../../assets/static/guide-01.jpg')} alt=""/></div>
						    <div><img src={require('../../assets/static/guide-02.jpg')} alt=""/></div>
						    <div><img src={require('../../assets/static/guide-03.jpg')} alt=""/></div>
						    <div><img src={require('../../assets/static/guide-04.jpg')} alt=""/></div>
							<div><img src={require('../../assets/static/guide-05.jpg')} alt=""/></div>
						    <div><img src={require('../../assets/static/guide-06.jpg')} alt=""/></div>
						</Carousel>
				    </TabPane>
				    <TabPane tab="业务员" key="2">
						<Carousel autoplay>
						    <div><img src={require('../../assets/static/guide-07.jpg')} alt=""/></div>
						    <div><img src={require('../../assets/static/guide-08.jpg')} alt=""/></div>
						    <div><img src={require('../../assets/static/guide-09.jpg')} alt=""/></div>
						    <div><img src={require('../../assets/static/guide-10.jpg')} alt=""/></div>
						</Carousel>
					</TabPane>
				    <TabPane tab="财务" key="3">
						<Carousel autoplay>
						    <div><img src={require('../../assets/static/guide-11.jpg')} alt=""/></div>
						    <div><img src={require('../../assets/static/guide-12.jpg')} alt=""/></div>
						</Carousel>
					</TabPane>
				    <TabPane tab="下游订货商" key="4">
						<Carousel autoplay>
						    <div><img src={require('../../assets/static/guide-13.jpg')} alt=""/></div>
						    <div><img src={require('../../assets/static/guide-14.jpg')} alt=""/></div>
						</Carousel>
					</TabPane>
				    <TabPane tab="技术与规格" key="5">
						<Carousel autoplay>
						    <div><img src={require('../../assets/static/guide-15.jpg')} alt=""/></div>
						    <div><img src={require('../../assets/static/guide-16.jpg')} alt=""/></div>
						</Carousel>
					</TabPane>
				  </Tabs>
		        </Modal>

				<p className="help-title"><Icon type="question-circle-o" />帮助中心</p>
				<div className="help-link" onClick={this.toggleModal}><span className="help-icon"></span>新手帮助</div>
				<div className="help-link help-video"><span className="help-icon help-icon-video"></span>视频学习</div>

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
				</ScrollBar>
			</div>
		);
	}
}

