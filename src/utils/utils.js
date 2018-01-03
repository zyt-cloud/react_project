import React from 'React';
import { Route } from 'react-router-dom'
import Bundle from '../router/bundle';

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

export const AuthRoute = (props) => {

	const {component: Component, path, ...rest} = props;
	return (
		
		<Route {...rest} render={(props) => (
			<Component {...props} />
		)} />
	)
	
}



/*class PrivateRouteContainer extends React.Component {
  render() {
    const {
      isAuthenticated,
      component: Component,
      ...props
    } = this.props

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

const PrivateRoute = connect(state => ({
  isAuthenticated: state.authReducer.isAuthenticated
}))(PrivateRouteContainer)*/