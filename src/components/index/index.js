import React, { Component } from 'react';
import { connect } from 'react-redux';


import Header from 'PAGES/common/header';
import Navbar from 'PAGES/common/navbar';


import { closeTab  } from 'REDUX/actions/index';


const mapDispatchToProps = {
    closeTab 
};

const mapStateToProps = ({ app, ...props }) => ({
	globalData: app.globalData,
    tabs: app.tabs
});

export class Index extends Component {

    render() {
        const { globalData, closeTab, toggleAffix, menus, ...props } = this.props;

        return (
            <div>
            	<Header closeTab={closeTab} {...props} />
            	<Navbar toggleAffix={toggleAffix} menus={menus} mode={globalData.mode} theme={globalData.theme} {...props} />
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Index);
