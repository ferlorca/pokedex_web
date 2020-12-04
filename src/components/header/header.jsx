import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useRouter from "../../hook/useRouter";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { actionRoutes } from "../../routes";
import FormField, { typesElements } from "../formField";


import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import TranslateIcon from '@material-ui/icons/Translate';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { logout } from '../../store/actions/auth_action';
import { useDispatch, useSelector } from 'react-redux';
import { changeTranslations } from '../../store/actions/translation_action';
import { updateFormData } from '../../config/utilities';


const useStyles = makeStyles(theme => {
	return {
		title: {
			flexGrow: 1,
		},
		appbar: {
			backgroundColor: theme.palette.secondary.main,
			zIndex: theme.zIndex.drawer + 1
		},
		button: {
			backgroundColor: theme.palette.secondary.main,
		},
		search: {
			position: 'relative',
			borderRadius: theme.shape.borderRadius,
			marginRight: theme.spacing(2),
			marginLeft: 20,
			width: 'auto',
			[theme.breakpoints.up('sm')]: {
				marginLeft: theme.spacing(3),
				width: '15%',
			},
		},
		searchIcon: {
			height: '100%',
			pointerEvents: 'none',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
		},
	}
});


function Header() {

	const [loading, setloading] = useState(false)
	const dispatch = useDispatch();
	const trasnlations = useSelector(state => state.translation.translations)
	const routes = useRouter();
	const classes = useStyles();
	const languages = useSelector(state => state.translation.languageCodes)
	const formDataInit = {
		translation: {
			element: typesElements.AUTOCOMPLETE,
			value: null,
			label:trasnlations.header.translate,	
			config: {
				name: "translation",
				disabled: loading
			},
			childElements: languages.length > 0 ? languages : [],
			valid: true,
			touched: false,
			validationMessage: ''
		},
	}
	const [formData, setFormData] = useState(formDataInit);

	const [value, setValue] = useState(actionRoutes.scheduler);

	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};


	useEffect(() => {
		const newFormData = {
			...formData
		}
		newFormData["translation"].config.disabled = loading;
		setFormData(newFormData);
	}, [loading])

	useEffect(() => {
		if (languages && languages.length > 0) {
			const newFormData = {
				...formData
			}
			const newElement = {
				...newFormData["translation"]
			}
			newElement.childElements = languages;
			//newElement.value = languages.filter(item => item.id === language)[0];

			newFormData["translation"] = newElement;
			setFormData(newFormData);
		}

	}, [languages])

	useEffect(() => {
		if (routes) {
			let action = routes.location.pathname.replace("/", "");
			setValue(action === "" ? "pokemon" : action);
		}
	}, [routes])


	useEffect(() => {
		setloading(false);
	}, [trasnlations])

	const logoutHandler = () => {
		dispatch(logout());
	}


	const changeRoute = (e, value) => {
		setValue(value);
		routes.history.push(`/${value}`)
	}

	const updateForm = (element) => {
		if (element.value !== null) {
			setloading(true)
			setFormData(updateFormData(element, formData, trasnlations.login))
			dispatch(changeTranslations(element.value.id));
		}
	}


	return (

		<AppBar position="fixed" className={classes.appbar}>
			<Toolbar>
				<Typography variant="h6" className={classes.title}>
					PokedexApp
                </Typography>
				<div className={classes.searchIcon}>
					<TranslateIcon />
				</div>
				<div className={classes.search}>
					<FormField formdata={formData.translation}
						change={(element) => updateForm(element)}
					/>
				</div>


				<BottomNavigation
					value={value}
					onChange={(event, newValue) => { changeRoute(event, newValue) }}
					showLabels
					className={classes.button}
				>
					<BottomNavigationAction key={actionRoutes.pokemon} value={actionRoutes.pokemon} label={trasnlations.header.pokemon} icon={<RestoreIcon />} />
					<BottomNavigationAction key={actionRoutes.myPokedex} value={actionRoutes.myPokedex} label={trasnlations.header.myPokedex} icon={<FavoriteIcon />} />,

				</BottomNavigation>
				<IconButton
					aria-label={trasnlations.header.more}
					aria-controls="long-menu"
					aria-haspopup="true"
					onClick={handleClick}
				>
					<MoreVertIcon />
				</IconButton>
				<Menu
					id="long-menu"
					anchorEl={anchorEl}
					keepMounted
					open={open}
					onClose={handleClose}
				>
					<MenuItem onClick={logoutHandler}>{trasnlations.header.logout}</MenuItem>
				</Menu>
			</Toolbar>
		</AppBar>

	)
}

export default Header
