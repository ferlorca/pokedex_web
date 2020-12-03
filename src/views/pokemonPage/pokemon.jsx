import React, { useEffect, useState } from 'react'
import { Button, Grid, makeStyles, Paper, TextField, Typography } from '@material-ui/core';
import PokemonList from "./ListPokemons/tablePokemons";
import { useDispatch, useSelector } from 'react-redux';
import SearchIcon from '@material-ui/icons/Search';
import FormField, { typesElements } from '../../components/formField';
import { addFilter ,nextPage} from "./../../store/actions/pokemon_action";


const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
    },
    search: {
        position: "relative"
    },
    searchIcon: {
        position: "absolute",
        top: 30
    },
    types: {
        paddingLeft: 40
    }
}));


function Pokemon() {
    const classes = useStyles();
    const trasnlations = useSelector(state => state.translation.translations)
    const types = useSelector(state => state.pokemon.types)
    const loading = useSelector(state => state.pokemon.loading)
    const pokemons = useSelector(state => state.pokemon.pokemons)
    const pokemonTranslation = useSelector(state => state.pokemon.pokemonTranslation)
    const filter = useSelector(state => state.pokemon.filter)

    const [textToFilter, setTextToFilter] = useState("")

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
        const newFilter = { ...filter };
        if (!loading)
            if (newFilter.type.length !== typeState.value.length || pokemons.length === 0) {
                newFilter.type = typeState.value.map(item => item.name);
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
                auxArray.push(types.filter(item => item.name === iterator)[0])
            }
            newTypes.value = auxArray;
            setTypeState(newTypes);
        }
    }, [types, trasnlations])

    const updateForm = (e) => {
        const newTypes = { ...typeState };
        newTypes.value = e.value;
        setTypeState(newTypes);
    }

    const handleChangeText = e=>{
        if(e.target.value.length > 3){
            let value = e.target.value.toLowerCase();
            value = value[0].toUpperCase() + value.substring(1);      
            const newFilter = { ...filter };            
            newFilter.name = {language : pokemonTranslation ,text : value}
            dispatch(addFilter(newFilter));   
        }
        setTextToFilter(e.target.value);
    }

    const handleNext = e =>{
        const newFilter = { ...filter }; 
        newFilter.page = newFilter.page+1;
        dispatch(nextPage(newFilter));       
    }

    return (
            <Paper className={classes.root}>
                <Grid container m={7}>
                    <Grid item xs={12} sm={12}  >
                        <Grid container justify="center" alignItems="center">
                            <Grid item xs={12} sm={4}  >
                                <Typography variant="h3" className={classes.title} >
                                    {trasnlations.pokemon.title}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextField variant="outlined" 
                                 value={textToFilter}
                                 label={trasnlations.pokemon.searchByName}
                                 onChange={handleChangeText}
                                />
                            </Grid>
                            <Grid item xs={12} sm={5} className={classes.search}>
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
                    <Grid item xs={12} sm={12}  >
                        <Grid container
                            direction="row"
                            justify="flex-end"
                            alignItems="center"
                            >                        
                            <Button variant="contained" color="primary" onClick={handleNext}>
                                More Pokemons 
                            </Button>
                        </Grid>                       
                    </Grid>    
                </Grid>
            </Paper>
    );
}

export default Pokemon
