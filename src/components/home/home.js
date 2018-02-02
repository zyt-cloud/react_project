import React, {Component} from 'react';

import Chart from 'PAGES/common/chart'

import copy from 'copy-to-clipboard'

import { Icon, Button, Alert, Input, message } from 'antd'

import './home.css';

import appCode from '../../assets/img/app_code.png'

const chartConfig = {
	chart: {
		height: '352px',
        type: 'spline',
        inverted: true
    },
    credits: {
    	enabled: false
    },
    title: {
        text: '大气温度和海拔高度关系'
    },
    subtitle: {
        text: '根据标准大气模型绘制'
    },
    xAxis: {
        reversed: false,
        title: {
            enabled: true,
            text: '海拔高度'
        },
        labels: {
            formatter: function () {
                return this.value + 'km';
            }
        },
        maxPadding: 0.05,
        showLastLabel: true
    },
    yAxis: {
        title: {
            text: '温度'
        },
        labels: {
            formatter: function () {
                return this.value + '°';
            }
        },
        lineWidth: 2
    },
    legend: {
        enabled: false
    },
    tooltip: {
        headerFormat: '<b>{series.name}</b><br/>',
        pointFormat: '{point.x} km: {point.y}°C'
    },
    plotOptions: {
        spline: {
            marker: {
                enable: false
            }
        }
    },
    responsive: true,
    series: [{
        name: '温度',
        data: [[0, 15], [10, -50], [20, -56.5], [30, -46.5], [40, -22.1],
               [50, -2.5], [60, -27.7], [70, -55.7], [80, -76.5]]
    }]
}

export default class Home extends Component{

	
	render() {
	  return (
	  	<div className="dhb-home">
	  		<div className="home-header">
	  			<div>
	  				<div className="hearder-account">
		  				<div>成都阿商</div>
		  				<div className="color999">有效时间：2017-02-06 至 2018-02-07</div>
	  				</div>
	  			</div>
	  			<div>
	  				<div>当前版本：专业版v3.1 <Button size="small">特性</Button><Button size="small" value="default">升级</Button></div>
	  				<div>剩余短信：4 条<span><Icon type="exclamation-circle" />短信余额不足</span><Button size="small" type="primary">充值</Button></div>
	  			</div>
	  		</div>
	  		<div className="home-main clearfix">

	  			<div className="home-right">
	  				<div>
	  					<div className="home-preview">
	  						<div className="home-preview-icon"></div>
							<div>
								<span className="home-nav-title">预览电脑端</span>
								<span>在电脑上订货</span>
							</div>
	  					</div>
	  					<div className="home-preview">
	  						<div className="home-preview-icon"></div>
							<div>
								<span className="home-nav-title">预览手机端</span>
								<span>订货加管理</span>
								<img className="home-code" src={appCode} alt="" />
							</div>
	  					</div>
	  				</div>
	  				<div>
	  					<div className="home-block-title">官方通知<a className="dhb-link">查看更多</a></div>
	  					<div className="dhb-notice">
							<ul>
								<li className="dhb-notice-item">
									<div className="color999">2018-12-12</div>
									<div className="ellipsis">【升级】升级通知</div>
								</li>
								<li className="dhb-notice-item">
									<div className="color999">2018-12-12</div>
									<div className="ellipsis">【升级】升级通知</div>
								</li>
								<li className="dhb-notice-item">
									<div className="color999">2018-12-12</div>
									<div className="ellipsis">【升级】升级通知</div>
								</li>
								<li className="dhb-notice-item">
									<div className="color999">2018-12-12</div>
									<div className="ellipsis">【升级】升级通知</div>
								</li>
								<li className="dhb-notice-item">
									<div className="color999">2018-12-12</div>
									<div className="ellipsis">【升级】升级通知</div>
								</li>
							</ul>
	  					</div>
	  				</div>
	  				<div>
						<div className="home-block-title">下载</div>
						<div className="home-download">
							<div>
								<div className="download-icon"><Icon type="apple" /></div>
								<div>iOS版</div>
								<div><img className="home-code" src={appCode} alt="" /></div>
							</div>
							<div>
								<div className="download-icon"><Icon style={{color:'#8FB614'}} type="android" /></div>
								<div>Android版</div>
								<div><img className="home-code" src={appCode} alt="" /></div>
							</div>
							<div>
								<div className="download-icon"><Icon style={{color:'#3EC64C'}} type="wechat" /></div>
								<div>微信版</div>
								<div><img className="home-code" src={appCode} alt="" /></div>
							</div>
						</div>
	  				</div>
	  				<div>
						<div className="home-block-title">邀请客户注册</div>
						<div className="home-register">
							<div>电脑访问<Input readyonly="true" size="small" defaultValue="https://ant.design/components/input-cn/" />
								<Button size="small" onClick={() => {copy('https://ant.design/components/input-cn');message.success('复制成功');}}>复制</Button>
							</div>
							<div>手机访问<Input readyonly="true" size="small" defaultValue="https://ant.design/components/input-cn/" />
								<Button size="small" onClick={() => {copy('https://ant.design/components/input-cn');message.success('复制成功');}}>复制</Button>
							</div>
							<div><a className="dhb-link">下载店铺二维码，发给客户</a></div>
						</div>
	  				</div>
	  			</div>

				<div className="home-left">
					<div>
						<div className="home-nav-item clearfix">
							<div className="home-nav-icon"></div>
							<div>
								<span className="home-nav-title">订单红包</span>
								<span>营销提升下单率</span>
							</div>
						</div>
						<div className="home-nav-item clearfix">
							<div className="home-nav-icon"></div>
							<div>
								<span className="home-nav-title">客户使用分析</span>
								<span>辨识高价值客户</span>
							</div>
						</div>
						<div className="home-nav-item clearfix">
							<div className="home-nav-icon"></div>
							<div>
								<span className="home-nav-title">搜索指数</span>
								<span>大家都在找哪些商品</span>
							</div>
						</div>
						<div className="home-nav-item clearfix">
							<div className="home-nav-icon"></div>
							<div>
								<span className="home-nav-title">招商加盟</span>
								<span>一键邀请开通系统</span>
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
		  								<div>45</div>
	  								</a>
	  							</li>
	  							<li className="home-pending">
	  								<a>
		  								<div>待出库</div>
		  								<div>45</div>
	  								</a>
	  							</li>
	  							<li className="home-pending">
	  								<a>
		  								<div>待发货</div>
		  								<div>45</div>
		  							</a>
	  							</li>
	  							<li className="home-pending">
	  								<a>
		  								<div>待确认收货</div>
		  								<div>45</div>
		  							</a>
	  							</li>
	  							<li className="home-pending">
	  								<a>
		  								<div>待退货审核</div>
		  								<div>45</div>
		  							</a>
	  							</li>
	  							<li className="home-pending">
	  								<a>
		  								<div>待确认退货</div>
		  								<div>45</div>
		  							</a>
	  							</li>
	  						</ul>
	  					</div>
	  				</div>

	  				<div>
	  					<div className="home-block-title">业绩环比</div>
	  					<div>
	  						<div className="home-achievement">
	  							<span>今日22单</span>
	  							<span>￥45646.23</span>
	  							<span>日环比订单量<Icon type="caret-up" style={{color: '#EE6158'}} />25%</span>
	  						</div>
	  						<div className="home-achievement">
	  							<span>昨日22单</span>
	  							<span>￥45646.23</span>
	  							<span>订单金额<Icon type="caret-up" style={{color: '#EE6158'}} />25%</span>
	  						</div>
	  						<div className="home-achievement">
	  							<span>本月522单</span>
	  							<span>￥45646.23</span>
	  							<span>月环比订单量<Icon type="caret-up" style={{color: '#EE6158'}} />25%</span>
	  						</div>
	  						<div className="home-achievement">
	  							<span>上月622单</span>
	  							<span>￥45646.23</span>
	  							<span>日环比订单量<Icon type="caret-down" style={{color: '#51D35E'}} />25%</span>
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