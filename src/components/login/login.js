import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';


const mapDispatchToProps = (dispatch) => {
    return {
        action: () => {
            dispatch(actionAction());
        },
    };
};

const mapStateToProps = ({ state }) => ({
   ...state
});

class Login extends Component {
    render() {
        

        return (
            <div>login</div>
        );
    }
}

export default connect( mapStateToProps, mapDispatchToProps )(Login);
