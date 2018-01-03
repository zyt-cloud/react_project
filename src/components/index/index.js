import React, { Component } from 'react';
import { connect } from 'react-redux';


import Header from 'PAGES/common/header';
import Navbar from 'PAGES/common/navbar';


import { toggleTheme } from 'REDUX/actions/index'


const mapDispatchToProps = {
    toggleTheme
};

const mapStateToProps = ({ app, ...props }) => ({
	theme: app.theme
});

export class Index extends Component {

    render() {
        const { toggleTheme, theme } = this.props;

        return (
            <div>
            	<Header toggleTheme={toggleTheme} />
            	<Navbar mode={theme.mode} theme={theme.theme} />
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Index);
