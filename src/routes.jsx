import React from 'react';
import { Switch, Route } from 'react-router-dom';

//views
import Home from "./views/home/home";
import Login from "./views/auth/login";
import MyPokedex from "./views/pokedex/myPokedex";
import Logout from "./views/auth/logout";
import NoFoundComponent from "./views/errorsAndWarnings/noFoundComponent";
//hocs
import Layout from "./hoc/layout";
import Initializer from "./hoc/initializer";
import Styles from "./hoc/styles";
import Notifications from './components/notification';


export const actionRoutes = {
	home: "home",
	myPokedex: "myPokedex",	
	logout: "logout",
	login:"login",
	noFoundPage:"noFoundPage"
}


function Routes() {
	return (
		<React.Fragment>
			<Initializer>
				<Switch>
					<Route path={"/"} exact component={()=>(<Layout><Home/></Layout>)} />
					<Route path={"/"+actionRoutes.logout} component={() => (<Logout />)} />							
					<Route path={"/"+actionRoutes.home} exact component={() => (<Layout><Home /></Layout>)} />							
					<Route path={"/"+actionRoutes.myPokedex} exact component={()=>(<Layout><MyPokedex/></Layout>)} />					
					<Route path={"/"+actionRoutes.login}  component={()=> (<Styles><Notifications /><Login /></Styles>)} />
					<Route to={"/"+actionRoutes.noFoundPage} component={() => (<Styles><NoFoundComponent /></Styles>)} />					
				</Switch>
			</Initializer>
		</React.Fragment>
	)
}

export default Routes;