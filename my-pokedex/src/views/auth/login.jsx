import React, { useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { auth } from "../../store/actions/auth_action";
import { typesElements } from "../../components/formField";
import LoginRender from "./loginRender";


function Login() {
	const loading = useSelector(state => state.auth.loading);
	const error = useSelector(state => state.auth.error);
	const translation = useSelector(state => state.translation.translations)
	// const route = useRouter();
	// const authRedirectPath = useSelector(state => state.auth.authRedirectPath);
	// const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
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
		}
	}
	const [formData, setFormData] = useState(formDataInit);

	// useEffect(()=>{
	// 	if(isAuthenticated && route)
	// 		route.history.push(`${authRedirectPath}`)
	// },[isAuthenticated,route,authRedirectPath])

	useEffect(()=>{
		setRegisterError(error);
	},[error])

	const updateForm = (element) => {
		const newFormData = {
			...formData
		}
		const newElement = {
			...newFormData[element.id]
		}
		newElement.value = element.event.target.value;
		if (element.blur) {
			let validData = validate(newElement);
			newElement.valid = validData[0];
			newElement.validationMessage = validData[1];
		}
		newElement.touched = element.blur;
		newFormData[element.id] = newElement;

		setFormData(newFormData);
	}

	const validate = (element) => {
		let err = [true, ''];

		if (element.validation.email) {
			const valid = /\w+@\S+\.\S+/.test(element.value);
			const message = `${!valid ? 'Tiene que ser un email valido' : ''}`;
			err = !valid ? [valid, message] : err
		}

		if (element.validation.password) {
			const valid = element.value.length >= 6;
			const message = `${!valid ? 'Tiene que tener mas de 5 caracteres' : ''}`;
			err = !valid ? [valid, message] : err
		}

		if (element.validation.required) {
			const valid = element.value.trim() !== '';
			const message = `${!valid ? 'Este campo es requerido' : ''}`;
			err = !valid ? [valid, message] : err
		}

		return err;
	}


	const submitForm = (event, type) => {
		event.preventDefault();
		
		if (type !== null) {
			let dataToSubmit = {};
			let formIsValid = true;

			for (let key in formData) {
				dataToSubmit[key] = formData[key].value;
				formIsValid = formData[key].valid && formIsValid;
			}

			if (formIsValid) {
				setRegisterError('');
				dispatch(auth(dataToSubmit.email, dataToSubmit.password, type));				
			}
		}
	}
	
	return (
		<React.Fragment>		
			<LoginRender 
				formData={formData} 
				loading = {loading}
				submitForm = {submitForm}
				updateForm = {updateForm}
				error = {registerError}
			/>
		</React.Fragment>
	);
}

export default Login;