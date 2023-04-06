import { Route, Switch } from 'react-router-dom';
import { routes_dashboard } from './routes/routes_dashboard';
import { useRouteMatch } from 'react-router-dom';

const DashboardRouter = () => {
	const { path } = useRouteMatch();
	window.scrollTo({
		top: 0
	});

	return (
		<>
			<Switch>
				{routes_dashboard.map((route) => (
					<Route
						exact={route.exact}
						path={path + route.path}
						render={() => {
							return <route.component {...route.props} />;
						}}
						key={route.path}
					/>
				))}
			</Switch>
		</>
	);
};

export default DashboardRouter;
