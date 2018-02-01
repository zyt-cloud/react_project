import React, { Component } from 'react';
import { connect } from 'react-redux';


import Header from 'PAGES/common/header';
import Navbar from 'PAGES/common/navbar';
import Help from 'PAGES/common/help';


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
        const { globalData, closeTab, showHelp, menus, ...props } = this.props;

        return (
            <div>
            	<Header closeTab={closeTab} {...props} />
            	<Navbar menus={menus} mode={globalData.mode} theme={globalData.theme} {...props} />
                <Help style={{right: showHelp ? 0 : '-194px'}} />
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Index);
