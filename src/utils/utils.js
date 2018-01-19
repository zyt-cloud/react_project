import React from 'React';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom'
import Bundle from '../router/bundle';

import { addTab } from 'REDUX/actions/index'

let refreshCallback = null;

export const setRefresh = (refresh) => {
  if(typeof refresh !== 'function'){
    throw new error('参数错误');
  }
  refreshCallback = refresh;
}

export const triggerRefresh = () => {
  if(typeof refreshCallback !== 'function'){
    return;
  }
  refreshCallback();
}

export const removeRefresh = () => {
  refreshCallback = null;
}

const Loading = () => (
	<div>loading....</div>
)

export const loadComponent = (component) => route => (
	<Bundle load={component}>
        {
            (Component) => Component ? <Component {...route} /> : <Loading/>
        }
    </Bundle>
)



class PrivateRoute extends React.Component {
  componentDidMount() {
    this.addTab(this.props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps.component.name === 'App'){
      return true
    }
    if(this.props.path === nextProps.path){
      return false
    }

    this.addTab(nextProps);
    return true
  }


  addTab(props){
    if(props.component.name !== 'App'){
      const content = document.getElementById('dhb-content');
      const scrollTop = content ? document.getElementById('dhb-content').scrollTop : '';// Math.max(document.body.scrollTop, document.documentElement.scrollTop);

      props.dispatch(addTab({
        // key: props.location.key,
        isActive: true,
        name: props.name,
        path: props.path === '/' ? '/Manager/home' : props.path,
        url: props.location.pathname
      }, scrollTop))
    }
  }


  render(){
    const {
      isAuthenticated = true,
      component: Component,
      dispatch,
      ...props
    } = this.props;


    return (
      <Route
        {...props}
        render={props =>
          isAuthenticated
            ? <Component {...props} />
            : (
            <Redirect to={{
              pathname: '/login',
              state: { from: props.location }
            }} />
          )
        }
      />
    )
  }
}

export const AuthRoute = connect(state => ({
  isAuthenticated: state.app.auth.isAuthenticated
}))(PrivateRoute)