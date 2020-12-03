import React, { useEffect, useState } from 'react'
import { Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import PokemonList from "./ListPokemons/tablePokemons";
import { useDispatch, useSelector } from 'react-redux';
import SearchIcon from '@material-ui/icons/Search';
import FormField, { typesElements } from '../../components/formField';
import { addFilter } from "./../../store/actions/pokemon_action";


const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
    },
    search:{
        position:"relative"
    },
    searchIcon:{
        position:"absolute",
        top:22
    },
    types:{
        paddingLeft:40
    }
}));


function Pokemon() {
    const classes = useStyles();
    const trasnlations = useSelector(state => state.translation.translations)
    const types = useSelector(state => state.pokemon.types)
    const pokemons = useSelector(state => state.pokemon.pokemons)
    const loading = useSelector(state => state.pokemon.loading)

    const filter = useSelector(state => state.pokemon.filter)

    const typeInit = {
        element: typesElements.AUTOCOMtPLETE_MULTIPLE,
        value: filter.type ?? [],
        label: trasnlations.pokemon.searchlabel,
        config: {
            id: "translation", name: "translaion",
        },
        childElements: types.length > 0 ? types : [],
    }

    const [typeState, setTypeState] = useState(typeInit);
    const dispatch = useDispatch();


    useEffect(() => {
        const newFilter = {...filter};
        if(!loading)
            if(newFilter.type.length !== typeState.value.length || pokemons.length === 0){
                newFilter.type=  typeState.value.map(item=>item.name);
                dispatch(addFilter(newFilter))
            }
    }, [typeState.value])


	useEffect(() => {
		if (types && types.length > 0) {
            const newTypes = { ...typeState };            
            newTypes.childElements = types;		
            newTypes.label = trasnlations.pokemon.searchlabel;
            let auxArray = [];		
            for (const iterator of filter.type) {
                auxArray.push(types.filter(item=>item.name === iterator)[0])
            }   
            newTypes.value =  auxArray;        
            setTypeState(newTypes);
		}			
	}, [types,trasnlations])


    const updateForm = (e) => {
        const newFilter = { ...typeState };
        newFilter.value = e.value;
        setTypeState(newFilter);
    }

    return (
        <Paper className={classes.root}>
            <Grid container justify="center" m={7}>
                <Grid item xs={12} sm={12}  >
                    <Grid container justify="center" alignItems="center" m={7}>
                        <Grid item xs={12} sm={6}  >
                            <Typography variant="h3" className={classes.title}>
                                {trasnlations.pokemon.title}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <div className={classes.types}>
                                <FormField formdata={typeState}
                                    change={(element) => updateForm(element)}
                                />
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12}  >
                    <PokemonList />
                </Grid>
            </Grid>
        </Paper>
    );
}

export default Pokemon
