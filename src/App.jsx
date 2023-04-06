import React, { useEffect } from 'react';
import 'antd/dist/antd.css';
import './App.scss';
import MainRouter from './navigation/Router';
import { BrowserRouter as Router } from 'react-router-dom';
import { executeClearReduxStore, executeGetGlobalConfig } from './redux/actions/commonActions';
import inactivityTime from './utils/sessionTimeout';
import { connect } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

function App(props) {
	const { globalConfig, executeGetGlobalConfig } = props;

	window.onload = () => {
		globalConfig &&
		globalConfig.filter((item) => item.name === 'SessionTimeout') &&
		globalConfig.filter((item) => item.name === 'SessionTimeout')[0]
			? inactivityTime(globalConfig.filter((item) => item.name === 'SessionTimeout')[0].value1)
			: inactivityTime(30);
	};

	useEffect(() => {
		executeGetGlobalConfig();
	}, []);

	return (
		<div className='App'>
			<Router>
				<MainRouter />
			</Router>
		</div>
	);
}
const mapStateToProps = (state, ownProps) => {
	return {
		globalConfig: state && state.common && state.common.config
	};
};
const mapDispatchToProps = {
	executeGetGlobalConfig,
	executeClearReduxStore
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
