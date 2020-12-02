import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Routes from './routes';

export const RouterContext = React.createContext({});

function CustomBrowserRouter() {
	return (
		<BrowserRouter>
			<Route>
				{(routeProps) => (
					<RouterContext.Provider value={routeProps}>
						<Routes/>
					</RouterContext.Provider>
				)}
			</Route>
		</BrowserRouter>
	);
}



export default CustomBrowserRouter;