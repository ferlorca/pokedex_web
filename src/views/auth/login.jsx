import React, { useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { auth } from "../../store/actions/auth_action";
import { typesElements } from "../../components/formField";
import LoginRender from "./loginRender";
import {updateFormData} from "./../../config/utilities";


function Login() {
	
	const loading = useSelector(state => state.auth.loading);
	const error = useSelector(state => state.auth.error);
	const translation = useSelector(state => state.translation.translations)
	const [registerError, setRegisterError] = useState('');
	const dispatch = useDispatch();
	const formDataInit = {
		email: {
			element: typesElements.INPUT,
			value: '',
			label:translation.login.email,
			validation: {
				required: true,
				email: true
			},
			config: {
				id: "email", name: "email", autoComplete: "email",
			},
			valid: false,
			touched: false,
			validationMessage: ''
		},
		password: {
			element: typesElements.INPUT,
			value: '',
			label:translation.login.password,
			validation: {
				required: true,
				password: true
			},
			config: {
				id: "password", name: "password", autoComplete: "password",
				type: "password"
			},
			valid: false,
			touched: false,
			validationMessage: ''
		},
		repassword: {
			element: typesElements.INPUT,
			value: '',
			label: translation.login.repassword,
			validation: {
			  required: true,
			  password: true,
			  isEqualTo: "password"
			},
			config: {
			  id: "repassword", name: "repassword", autoComplete: "password",
			  type: "password"
			},
			valid: false,
			touched: false,
			validationMessage: ''
		},
		isSignUp: {
			element: typesElements.SWITCH,
			value: false,
			label: translation.login.signupswitch,		
			config: {
			  id: "isSignUp", name: "isSignUp"
			},
		}
	}
	const [formData, setFormData] = useState(formDataInit);


	useEffect(()=>{
		setRegisterError(error);
	},[error])

	
	const updateForm = (element) => {
		setFormData(updateFormData(element, formData,translation.login))
	}
	

	const submitForm = (event) => {
		event.preventDefault();
		let type = formData.isSignUp.value;	
		let dataToSubmit = {};
		let formIsValid = true;
		var newFormData = { ...formData };
		for (let key in formData) {
			if(key === "isSignUp")
				break;
			newFormData = updateFormData({ value: formData[key].value, id: key, blur: true }, newFormData,translation.login);
			dataToSubmit[key] = formData[key].value;
			if(!type && key === "repassword")
				break;
			formIsValid = formData[key].valid && formIsValid;
		}
		setFormData(newFormData);
		if (formIsValid) {
			setRegisterError('');
			dispatch(auth(dataToSubmit.email, dataToSubmit.password, type));				
		}	
	}
	
	// false == singin
	return (
		<React.Fragment>		
			<LoginRender 
				formData={formData} 
				loading = {loading}
				submitForm = {submitForm}
				updateForm={updateForm}				
				error = {registerError}
			/>
		</React.Fragment>
	);
}

export default Login;