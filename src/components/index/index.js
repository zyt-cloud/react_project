import React, { Component } from 'react';
import { connect } from 'react-redux';


import Header from 'PAGES/common/header';
import Navbar from 'PAGES/common/navbar';


import { toggleTheme, closeTab  } from 'REDUX/actions/index';


const mapDispatchToProps = {
    toggleTheme,
    closeTab 
};

const mapStateToProps = ({ app, ...props }) => ({
	theme: app.theme,
    tabs: app.tabs
});

export class Index extends Component {

    render() {
        const { toggleTheme, theme, tabs, ...props } = this.props;

        return (
            <div>
            	<Header toggleTheme={toggleTheme} tabs={tabs} {...props} />
            	<Navbar mode={theme.mode} theme={theme.theme} />
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Index);
