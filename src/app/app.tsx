import { Route, Switch } from "react-router-dom";
import { Routes } from "../configs/routes";

function App() {
	return (
		<Switch>
			{Routes.map((routeProps) => (
				<Route key={routeProps.path} {...routeProps} />
			))}
		</Switch>
	);
}

export default App;
