import { useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { main_routes } from './routes/routes_main';

const MainRouter = () => {
	// // handle browser back action
	// useEffect(() => {
	//   return history.listen((location) => {
	//     if (history.action === "PUSH") {
	//       setLocationKeys([location.key]);
	//     }

	//     if (history.action === "POP") {
	//       if (locationKeys[1] === location.key) {
	//         setLocationKeys(([_, ...keys]) => keys);

	//         // Handle forward event
	//       } else {
	//         setLocationKeys((keys) => [location.key, ...keys]);

	//         // Handle back event
	//         history.goBack();
	//       }
	//     }
	//   });
	// }, [locationKeys]);

	return (
		<Switch>
			{main_routes.map((route, idx) => (
				<Route
					key={idx}
					exact={route.exact}
					path={route.path}
					render={() => <route.component {...route.props} />}
				/>
			))}
		</Switch>
	);
};

export default MainRouter;
