import React from "react";
import { Route, Switch } from "react-router";
import { Home, SignUp, SignIn, PasswordReset, ProductEdit } from "./templates";
import Auth from "./Auth";

const Router = () => {
	return (
		<Switch>
			<Route exact path={"/signUp"} component={SignUp} />
			<Route exact path={"/signIn"} component={SignIn} />
			<Route exact path={"/PasswordReset"} component={PasswordReset}></Route>
			<Auth>
				<Route exact path={"(/)?"} component={Home} />
				<Route exact path={"/product/edit"} component={ProductEdit} />
			</Auth>
		</Switch>
	);
};

export default Router;
