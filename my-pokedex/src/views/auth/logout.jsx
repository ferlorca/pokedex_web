import React, { useEffect } from 'react';
// import Firebase from '../../config/firebase';
// import {actionRoutes} from "../../routes";
// import { Redirect } from 'react-router-dom';
import {logout} from "../../store/actions/auth_action.js";
import { useDispatch } from "react-redux";

function Logout() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(logout());
	}, [dispatch]);

	return (
	<div>
		Saliendo...
	</div>
		// <Redirect to={`/${actionRoutes.login}`} />
	)
}

export default Logout;
