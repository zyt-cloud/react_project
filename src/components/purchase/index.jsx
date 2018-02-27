import React, { Component } from 'react';

import { connect } from 'react-redux'

import { NavLink } from 'react-router-dom'

import { Popover } from "antd";

import DHBTable from '../common/table';

import { Breadcrumb, Icon, Button, Row, Col, Select, Input, Popconfirm } from 'antd';

const Option  = Select.Option

class EditableCell extends React.Component {
  state = {
    value: this.props.value,
    editable: false,
  }
  handleChange = (e) => {
    const value = e.target.value;
    this.setState({ value });
  }
  inputClick = (e) => {
  	e.stopPropagation();
  }
  check = () => {
  	console.log('check')
    this.setState({ editable: false });
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  }
  edit = () => {
  	console.log('edit')
    this.setState({ editable: true });
  }
  render() {
    const { value, editable } = this.state;
    return (
      <div className="editable-cell">
        {
          editable ?
            <div onClick={this.check} className="editable-cell-input-wrapper">
              <Input
                value={value} onClick={this.inputClick}
                onChange={this.handleChange}
                onPressEnter={this.check}
              />
              
            </div>
            :
            <div onClick={this.edit} className="editable-cell-text-wrapper">
              {value || ' '}
              
            </div>
        }
      </div>
    );
  }
}

class Purchase extends Component{
    constructor(props) {
	    super(props);
	    this.columns = [{
	      title: 'name',
	      dataIndex: 'name',
	      width: '30%',
	      render: (text, record) => (
	        <EditableCell
	          value={text}
	          onChange={this.onCellChange(record.key, 'name')}
	        />
	      ),
	    }, {
	      title: 'age',
	      dataIndex: 'age',
	    }, {
	      title: 'address',
	      dataIndex: 'address'
	    }, {
	      title: 'operation',
	      dataIndex: 'operation',
	      render: (text, record) => {
	        return (
	          this.state.dataSource.length > 1 ?
	          (
	            <Popconfirm title="Sure to delete?" onConfirm={() => this.onDelete(record.key)}>
	              <a href="#">Delete</a>
	            </Popconfirm>
	          ) : null
	        );
	      },
	    }];

	    this.state = {
	      dataSource: [{
	        key: '0',
	        name: 'Edward King 0',
	        age: '32',
	        address: 'London, Park Lane no. 0',
	      }, {
	        key: '1',
	        name: 'Edward King 1',
	        age: '32',
	        address: 'London, Park Lane no. 1',
	      }],
	      count: 2,
	    };
	  }
	  onCellChange = (key, dataIndex) => {
	    return (value) => {
	      const dataSource = [...this.state.dataSource];
	      const target = dataSource.find(item => item.key === key);
	      if (target) {
	        target[dataIndex] = value;
	        this.setState({ dataSource });
	      }
	    };
	  }
	  onDelete = (key) => {
	    const dataSource = [...this.state.dataSource];
	    this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
	  }
	  handleAdd = () => {
	    const { count, dataSource } = this.state;
	    const newData = {
	      key: count,
	      name: `Edward King ${count}`,
	      age: 32,
	      address: `London, Park Lane no. ${count}`,
	    };
	    this.setState({
	      dataSource: [...dataSource, newData],
	      count: count + 1,
	    });
	}
	componentDidMount() {
		console.log(this.props)
	}
	showMsg = () => {
		const hide = message.loading('Action in progress..', 3);
		// Dismiss manually and asynchronously
		//setTimeout(hide, 2500);
		let column = this.columns[1]
		if(column.colSpan === 0){
			delete column.colSpan;
			delete column.render;
		}else{
			column.colSpan = 0;
			column.render = (text) => {
				return {
					props: {
						colSpan: 0
					}
				}
			}
		}
		this.setState({columns: this.columns})
	}
    render() {
        const { dataSource } = this.state;
      	const columns = this.columns;
        return (
            <div>
                <div className="dhb-bread">
                    <Breadcrumb>
                        <div className="dhb-bread-title">采购订单</div>
                        <Popover placement="bottomLeft" content="测试内容">
                            <Icon type="question-circle-o" />
                        </Popover>
                        <Breadcrumb.Item><NavLink to="/Manager/home">首页</NavLink></Breadcrumb.Item>
                        <Breadcrumb.Item><a href="javascript:;">库存</a></Breadcrumb.Item>
                        <Button type="primary" icon="plus" className="pull-right">新增</Button>
                    </Breadcrumb>
                </div>
                <div className="padding-normal">
                    <div className="filter-wrap">
                        <Row gutter={16}>
                            <Col span={18}>
                                <Row gutter={16}>
                                    <Col span={8}>
                                        <Input
                                            placeholder="商品名称/首字母拼音/编号"
                                            prefix={<Icon type="search" style={{ color: '#000' }} />}
                                        />
                                    </Col>
                                    <Col span={4}>
                                        <Select placeholder="订单状态">
                                            <Option value="jack">Jack</Option>
                                            <Option value="lucy">Lucy</Option>
                                            <Option value="disabled" disabled>Disabled</Option>
                                            <Option value="Yiminghe">yiminghe</Option>
                                        </Select>
                                    </Col>
                                    <Col span={4}>
                                        <Select placeholder="付款状态">
                                            <Option value="jack">Jack</Option>
                                            <Option value="lucy">Lucy</Option>
                                            <Option value="disabled" disabled>Disabled</Option>
                                            <Option value="Yiminghe">yiminghe</Option>
                                        </Select>
                                    </Col>
                                    <Col span={4}>
                                        <Select placeholder="入库仓库">
                                            <Option value="jack">Jack</Option>
                                            <Option value="lucy">Lucy</Option>
                                            <Option value="disabled" disabled>Disabled</Option>
                                            <Option value="Yiminghe">yiminghe</Option>
                                        </Select>
                                    </Col>
                                    <Col span={4}>
                                        <Input 
                                            className="pointer"
                                            readOnly
                                            placeholder="选择供应商"
                                            suffix={<Icon type="contacts" />}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={6} className="filter-actions">
                                <Button type="primary">查询</Button>
                                <Button>重置</Button>
                                <a className="filter-expand" href="#">展开 <Icon type="down" /></a>
                            </Col>
                        </Row>
                    </div>
                    <div>
                        <DHBTable bordered dataSource={dataSource} size="middle" columns={columns} />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Purchase)
