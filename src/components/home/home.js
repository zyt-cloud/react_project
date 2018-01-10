import React, {Component} from 'react';

// import Table from 'element-react/dist/npm/es5/src/table';
import { Menu, Input, Divider, Popconfirm, Dropdown, Icon, message, Button } from 'antd';

import DHBTable from '../common/table';

// import 'element-theme-default'

// import 'element-theme-default/lib/table.css'
// import 'element-theme-default/lib/table-column.css'
/*export default class Home extends Component{
	render(){
		return <div>Home Component this is Home ssss</div>
	}
}*/

const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">1st menu item</a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">2nd menu item</a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">3rd menu item</a>
    </Menu.Item>
  </Menu>
);


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

export default class Home extends Component{

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
	  		<Button onClick={this.showMsg}>Display a loading indicator</Button>
	  		<Dropdown overlay={menu}>
		        <a className="ant-dropdown-link" href="#">
		         Hover me <Icon type="down" />
		        </a>
		    </Dropdown>
		    <div><Icon type="link" /></div>
		    <DHBTable bordered dataSource={dataSource} size="middle" columns={columns} />
	    </div>
	 )
	}
}