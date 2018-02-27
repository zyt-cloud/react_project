import React from 'react';

import { Modal, Button } from 'antd';

export default class HomeDialog extends React.Component{
    state = {
        visible: false
    }
    toggleModal = () => {
        this.setState({
            visible: !this.state.visible
        })
    }
    // 过期
    already_expiry(){
        return (
            <div>
                <div>
                    <p>亲爱的订货宝客户：</p>
                    <p>您的系统使用期限已经到期</p>
                </div>
                <div className="text-center">
                
                    <p>亲，划重点啦！请按照规范上传实名认证资料哟</p>
                    <p>实名认证，上传您的营业执照，可获得30天的免费试用时间</p>
                    <p>官方咨询电话：<span className="theme-color">400-8066-081</span></p>
                    <Button type="primary" target="_blank" href="/Manager/System/credentials">实名认证</Button>
                    <p>请尽快续费购买，以免影响您的正常使用！</p>
                    <Button type="promary">去续费</Button>
                
                </div>
            </div>
        )
    }
    // 支付
    bank(){
        return (
            <div>
                <div>
                    <p><span></span></p>
                    <div>开通在线收款，您的客户可以通过支付宝、微信支付、</div>
                    <div>银行卡、聚合支付等多种方式向您付款！</div>
                    <div><a href="#" data-toggle="modal" data-target="#tariff_description">资费介绍>></a></div>
                </div>
                <div>
                    <div className="text-center">仅需一步，即可使用在线收款：</div>
                    <div>
                        <div>
                            <div>
                                <p>个人用户</p>
                                <p>绑卡便捷，自动、即时结算到卡</p>
                            </div>
                            <Button type="primary">管理账户</Button>
                        </div>
                        <div>
                            <div>
                                <p>企业用户</p>
                                <p>提现免手续费、便捷省心</p>
                            </div>
                            <Button type="primary">管理账户</Button>
                        </div>
                    </div>
                    <div className="text-center">
                        <label>
                            <input type="checkbox" id="quickpay-notice" value="T" name="" />不再提示
                        </label>
                    </div>
                </div>
            </div>
        )
    }
    // 剩余时间提醒
    free_version(dialog){
        return (
            <div>
                <div class="more-tip-1">
                    <p>亲爱的订货宝客户：</p>
                    <p>您的系统还可以'免费试用' : '使用'<span className="theme-color"></span>天</p>
                </div>

                <div class="text-center">
                    <p>也许您还没来得及购买，或刚刚度假归来。感谢您的关注和青睐、我们一直在等您~</p>
                    <p>官方咨询电话：<span className="theme-color">400-8066-081</span></p>
                    <Button type="primary">立即购买</Button>
                </div>

                <div class="text-center">
                    <p>实名认证，上传您的营业执照，可获得30天的免费试用时间</p>
                    <p>实名认证审核通过后，成为正式用户，开启全部功能权限</p>
                    <p>期待您对我们更深入的了解~</p>
                    <p>官方咨询电话：<span className="theme-color">400-8066-081</span></p>
                    <Button type="primary">实名认证</Button>
                </div>
     
            </div>
        )
    }
    // 通知
    notice(dialog){
        return (
            <div>
                <div>
                    <p>{dialog.notice.notice_type}</p>
                    <p>{dialog.notice.create_time}</p>
                </div>

                <div className="text-center">
                    <div>{dialog.notice.notice_summary}</div>
                    <Button type="primary" data-node="Manager/PlatformNotice/view">查看公告</Button>
                </div>
            </div>
        )
    }
    // 未确认的合同
    unsign_contract(){
        return (
            <div>
                <div>
                    <p>亲爱的订货宝客户：</p>
                    <p>您购买的服务已生成电子合同，请查阅、签字！</p>
                </div>
                <div className="text-center">
                    <p>电子合同与纸质合同具有一样的法律效应，请放心使用</p>
                    <p>登录平台、拖动盖章、填写验证码，即可完成合同签署</p>
                    <p>签署完成，即可开户。因合同是对您的保障，希望您能在7天内，完成合同的签署</p>
                    <p>官方咨询电话：<span className="theme-color">400-8066-081</span></p>
                    <Button type="primary" target="_blank" href="/Manager/EContract/index">签署合同</Button>
                </div>
            </div>
        )
    }
    getShowContent(){
        let { dialog, showDialog } = this.props;
        for (let key of Object.keys(dialog)) {
            if(dialog[key].status === 'T'){
                showDialog = key;
                break;
            }
        }

        if(!showDialog){
            return
        }
        this.toggleModal()
        return this[showDialog](dialog[showDialog])
    }
    render(){
        return (
            <Modal
                visible={this.state.visible}
                width={600}
                destroyOnClose={true}
                footer={null}
                onCancel={this.toggleModal}
            >
                {this.getShowContent()}
            </Modal>
        )
    }
}
