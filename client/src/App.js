import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import Login from './components/auth/Login';
import Header from './components/layout/Header';
import Orders from './components/orders/Orders';
import CurrentHandler from './components/handlers/CurrentHandler';
import Handlers from './components/handlers/Handlers';
import Handler from './components/handlers/Handler';
import NewHandler from './components/handlers/NewHandler';
import UpdateHandler from './components/handlers/UpdateHandler';
import NotFound from './components/NotFound';
import Alert from './components/layout/Alert';
import PrivateRoute from './components/routing/PrivateRoute';

if (localStorage.token) {
	setAuthToken(localStorage.token);
}

const App = () => {
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);

	return (
		<Provider store={store}>
			<Router>
				<Route path='/home' component={Header} />
				<Alert />
				<Switch>
					<Route exact path='/' component={Login} />
					<PrivateRoute path='/home/orders' component={Orders} />
					<PrivateRoute path='/home/handlers' component={Handlers} />
					<PrivateRoute path='/home/handler/:id' component={Handler} />
					<PrivateRoute path='/home/handler' component={CurrentHandler} />
					<PrivateRoute path='/home/newhandler' component={NewHandler} />
					<PrivateRoute path='/home/edithandler' component={UpdateHandler} />
					<Route path='/' component={NotFound} />
				</Switch>
			</Router>
		</Provider>
	);
};

export default App;
