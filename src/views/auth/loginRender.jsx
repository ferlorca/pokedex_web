import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import grey from '@material-ui/core/colors/grey';
import FormField from "../../components/formField";
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';


const useStyles = makeStyles(theme => ({
	'@global': {
		body: {
			backgroundColor: grey[400],
		},
	},
	loading: {
		margin: 'auto',
		display: 'block',
	},
	main: {
		width: 'auto',
		display: 'block', // Fix IE 11 issue.
		marginLeft: theme.spacing(3),
		marginRight: theme.spacing(3),
		[theme.breakpoints.up('md')]: {
			width: 400,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(2),
	},
	buttonsGrid: {		
		marginTop: theme.spacing(1),
	},
	submit: {
		marginTop: theme.spacing(3),
	},
}));


function LoginRender({formData,loading,submitForm,updateForm,error}) {
	const classes = useStyles();
	const translation = useSelector(state => state.translation.translations)


	const showError = () => {
		if (error){
			return <div>{error.message} </div>
		}
		else return null
	}

	return (
		<main className={classes.main}>		
			<CssBaseline />
			<Paper className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Pokedex APP
				</Typography>
				<form className={classes.form}>
					<FormField formdata={formData.email}
						change={(element) => updateForm(element)} />

					<FormField formdata={formData.password}
						change={(element) => updateForm(element)} />
					
					{formData.isSignUp.value ? 
						<FormField formdata={formData.repassword}
						change={(element) => updateForm(element)} />
					:
						null
					}
					<FormField formdata={formData.isSignUp}
						change={(element) => updateForm(element)} />

					{loading === true ?  <CircularProgress className={classes.loading}/> : null}

					<Grid container className={classes.buttonsGrid} spacing={8} direction="row" justify="center" alignItems="center">
						
						<Grid item xs={6} >
							<Button
								type="submit"
								fullWidth
								variant="contained"
								color="primary"
								onClick={(event) => submitForm(event)}
							>
								{formData.isSignUp.value ? 
									translation.login.signup
								:
									translation.login.signin
								}
							</Button>
						</Grid>						
					</Grid>
				</form>			

				{showError()}
			</Paper>
		</main>
	);
}

export default LoginRender;