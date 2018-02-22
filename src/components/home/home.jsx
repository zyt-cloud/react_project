import React, {Component} from 'react';

import { Link } from 'react-router-dom'

import { connect } from "react-redux";

import Chart from 'PAGES/common/chart'

import copy from 'copy-to-clipboard'

import { Icon, Button, Alert, Input, message, Avatar } from 'antd'

import './home.css';

import axios from 'UTILS/http';

const chartConfig = {
	chart: {
        type: 'spline',
        height: '352px'
    },
    credits: {
    	enabled: false
    },
    title: {
        text: null
    },
    legend: {
        align: 'center',
		itemStyle: {
			color: 'rgba(0,0,0,.8)'
		},
        verticalAlign: 'top'
    },
    xAxis: {
    	tickmarkPlacement: 'on'
    },
    yAxis: [{
        title: {
            text: null
		},
        labels: {
            format: '{value} 个',
        }
    },{
		title: {
            text: null
        },
		opposite: true,
		labels: {
			formatter: function () {
                return '￥ ' + this.value;
            }
			
		}
	}],
    tooltip: {
        useHTML: true,
        backgroundColor: 'rgba(0,0,0,0.80)',
        // padding: '13',
        style: {
        	color: '#fff',
        	lineHeight: '24px',
        	fontSize: '13px'
        },
        borderWidth: 0,
        borderRadius: 4,
        shared: true
    },
    plotOptions: {
        spline: {
            marker: {
            	enabled: false,
                radius: 4,
                lineWidth: 0,
                symbol: 'circle'
            }
        }
    },
    series: [{
        name: '订单量',
		color: '#FF7557'
    }, {
        name: '订单金额',
		yAxis: 1,
		color: '#5D7FDD'
    }]
}

let orderData2 = null

class Home extends Component{

	state = {
		homeData: null
	}

	setChart(orderData){
		const { series } = chartConfig;

		if(!orderData.orders_report.list_count) return

		chartConfig.xAxis.categories = [];
		series[0].data = [];
		series[1].data = [];

		orderData.orders_report.list_count.forEach(item => {
			series[0].data.push(item.orders);
			series[1].data.push(item.amounts)
			chartConfig.xAxis.categories.push(item.name)
		})

		console.log(chartConfig)
	}

	componentDidMount(){
		this.getHomeData();
		this.getOrdersReport()
	}
	getHomeData(){
		axios.get('Api/v1/Home/home')
		.then((res) => {
			console.log('homedata', res)
			if(res.status === 'T'){
				this.setState({homeData: res.data})
			}
			else{

			}
		})
		.catch(error => {
			console.log(error)
		})
	}
	getOrdersReport(){
		axios.get('Api/v1/Home/ordersReport')
		.then((res) => {
			console.log(res)
			if (res.status === 'T') {
				this.setState({ orderData: (orderData2 = res.data) })
			}
			else {

			}
		})
		.catch(error => {
			console.log(error)
		})
	}

	render() {

	  const { homeData, orderData } = this.state
	  if(!homeData || !orderData){
		  return '';
	  }
	  this.setChart(orderData);
	  return (
	  	<div className="dhb-home">
	  		<div className="home-header">
				<div><Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>D</Avatar></div>
	  			<div>
	  				<div className="hearder-account">
		  				<div>{homeData.company_info.company_name}</div>
		  				<div className="color999">有效时间：{homeData.company_info.begin_date} 至 {homeData.company_info.end_date}</div>
	  				</div>
	  			</div>
	  			<div>
	  				<div>当前版本：{homeData.company_info.version_name} <Button size="small">特性</Button><Button size="small" value="default">升级</Button></div>
	  				<div>剩余短信：{homeData.company_info.sms_number} 条<span><Icon type="exclamation-circle" />短信余额不足</span><Button size="small" type="primary">充值</Button></div>
	  			</div>
	  		</div>
	  		<div className="home-main clearfix">

	  			<div className="home-right">
	  				<div>
	  					<a href={homeData.preview_orders.pc} className="home-preview">
	  						<div className="home-preview-icon"></div>
							<div>
								<span className="home-nav-title">预览电脑端</span>
								<span>在电脑上订货</span>
							</div>
	  					</a>
	  					<div className="home-preview">
	  						<div className="home-preview-icon"></div>
							<div>
								<span className="home-nav-title">预览手机端</span>
								<span>订货加管理</span>
								<img className="home-code" src={homeData.preview_orders.mobile} alt="" />
							</div>
	  					</div>
	  				</div>
	  				<div>
	  					<div className="home-block-title">官方通知<a className="dhb-link">查看更多</a></div>
	  					<div className="dhb-notice">
							<ul>
								{
								homeData.notice.map(item => (
								  <li key={item.notice_id} className="dhb-notice-item">
									  <div className="color999">{item.create_time}</div>
									  <div className="ellipsis">【{item.notice_type.substring(0, 2)}】{item.notice_title}</div>
								  </li>
								))
								}
							</ul>
	  					</div>
	  				</div>
	  				<div>
						<div className="home-block-title">下载</div>
						<div className="home-download">
							<div>
								<div className="download-icon"><Icon type="apple" /></div>
								<div>iOS版</div>
								<div><img className="home-code" src={homeData.download.ios} alt="" /></div>
							</div>
							<div>
								<div className="download-icon"><Icon style={{color:'#8FB614'}} type="android" /></div>
								<div>Android版</div>
								<div><img className="home-code" src={homeData.download.android} alt="" /></div>
							</div>
							<div>
								<div className="download-icon"><Icon style={{color:'#3EC64C'}} type="wechat" /></div>
								<div>微信版</div>
								<div><img className="home-code" src={homeData.download.wechat} alt="" /></div>
							</div>
						</div>
	  				</div>
	  				<div>
						<div className="home-block-title">邀请客户注册</div>
						<div className="home-register">
							<div>电脑访问<Input readyonly="true" size="small" defaultValue={homeData.inviting_customers_register.pc} />
								<Button size="small" onClick={() => {copy(homeData.inviting_customers_register.pc);message.success('复制成功');}}>复制</Button>
							</div>
							<div>手机访问<Input readyonly="true" size="small" defaultValue={homeData.inviting_customers_register.mobile} />
								<Button size="small" onClick={() => {copy(homeData.inviting_customers_register.mobile);message.success('复制成功');}}>复制</Button>
							</div>
							<div><a className="dhb-link">下载店铺二维码，发给客户</a></div>
						</div>
	  				</div>
	  			</div>

				<div className="home-left">
					<div>
						<Link to="/Manager/RedPacket/top" className="home-nav-item clearfix">
							<div className="home-nav-icon"></div>
							<div>
								<span className="home-nav-title">订单红包</span>
								<span className="hidden-xs">营销提升下单率</span>
							</div>
						</Link>
						<Link to="/Manager/Client/usage" className="home-nav-item clearfix">
							<div className="home-nav-icon"></div>
							<div>
								<span className="home-nav-title">客户使用分析</span>
								<span className="hidden-xs">辨识高价值客户</span>
							</div>
						</Link>
						<Link to="/Manager/BiGoodsSearch/index" className="home-nav-item clearfix">
							<div className="home-nav-icon"></div>
							<div>
								<span className="home-nav-title">搜索指数</span>
								<span className="hidden-xs">大家都在找哪些商品</span>
							</div>
						</Link>
						<div className="home-nav-item clearfix">
							<div className="home-nav-icon"></div>
							<div>
								<span className="home-nav-title">招商加盟</span>
								<span className="hidden-xs">一键邀请开通系统</span>
							</div>
						</div>
					</div>

					<div>
	  					<div className="home-block-title">待处理</div>
	  					<div>
	  						<ul>
	  							<li className="home-pending">
	  								<a>
		  								<div>待审核</div>
		  								<div>{orderData.report.total_count_orders.pending}</div>
	  								</a>
	  							</li>
	  							<li className="home-pending">
	  								<a>
		  								<div>待出库</div>
		  								<div>{orderData.report.total_count_orders.shipped}</div>
	  								</a>
	  							</li>
	  							<li className="home-pending">
	  								<a>
		  								<div>待发货</div>
		  								<div>{orderData.report.total_count_orders.stock_up}</div>
		  							</a>
	  							</li>
	  							<li className="home-pending">
	  								<a>
		  								<div>待确认收货</div>
		  								<div>{orderData.report.total_finance.total}</div>
		  							</a>
	  							</li>
	  							<li className="home-pending">
	  								<a>
		  								<div>待退货审核</div>
		  								<div>{orderData.report.total_returns.refunded}</div>
		  							</a>
	  							</li>
	  							<li className="home-pending">
	  								<a>
		  								<div>待确认退货</div>
		  								<div>{orderData.report.total_returns.return_aud}</div>
		  							</a>
	  							</li>
	  						</ul>
	  					</div>
	  				</div>

	  				<div>
	  					<div className="home-block-title">业绩环比</div>
	  					<div>
	  						<div className="home-achievement">
	  							<span>今日{orderData.report.detail_amounts.day.total}单</span>
	  							<span>￥{orderData.report.detail_amounts.day.total_amounts}</span>
	  							<span>日环比订单量<Icon type="caret-up" style={{color: '#EE6158'}} />{orderData.report.detail_amounts.day.percentage}%</span>
	  						</div>
	  						<div className="home-achievement">
	  							<span>昨日{orderData.report.detail_amounts.yesterday.total}单</span>
	  							<span>￥{orderData.report.detail_amounts.yesterday.total_amounts}</span>
	  							<span>订单金额<Icon type="caret-up" style={{color: '#EE6158'}} />{orderData.report.detail_amounts.yesterday.percentage}%</span>
	  						</div>
	  						<div className="home-achievement">
	  							<span>本月{orderData.report.detail_amounts.month.total}单</span>
	  							<span>￥{orderData.report.detail_amounts.month.total_amounts}</span>
	  							<span>月环比订单量<Icon type="caret-up" style={{color: '#EE6158'}} />{orderData.report.detail_amounts.month.percentage}%</span>
	  						</div>
	  						<div className="home-achievement">
	  							<span>上月{orderData.report.detail_amounts.last_month.total}单</span>
	  							<span>￥{orderData.report.detail_amounts.last_month.total_amounts}</span>
	  							<span>日环比订单量<Icon type="caret-down" style={{color: '#51D35E'}} />{orderData.report.detail_amounts.last_month.percentage}%</span>
	  						</div>
	  					</div>
	  				</div>

	  				<div>
	  					<div className="home-block-title">订单<a className="dhb-link">查看更多</a></div>
	  					<div className="home-chart">
	  						<Chart options={chartConfig} />
	  					</div>
	  				</div>
				</div>
				
	  		</div>
	    </div>
	  )
	}
}

export default connect((state) => ({

}), {})(Home)