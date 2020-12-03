import { Box, Button, CircularProgress, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React , { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Notification,{ SEVERITY_NOTIFICACION } from '../../models/Notification';
import { addNotification } from '../../store/actions/notification_action';
import { getPokemonFilter , addPokemonToPokedex} from '../../store/actions/pokedex_action';

function SearchPokemons() {

    const trasnlations = useSelector(state => state.translation.translations)
    const pokemonTranslation = useSelector(state => state.pokemon.pokemonTranslation)
    const dispatch = useDispatch();
    const pokemons = useSelector(state => state.pokedex.pokemons)
    const filter = useSelector(state => state.pokedex.filter)
    const loadingPokemons = useSelector(state => state.pokedex.loadingPokemons)
    const remainingPokemon = useSelector(state => state.pokedex.remainingPokemon)
    const [open, setOpen] = useState(false);
    const [options, setOptions] = React.useState([]);

    const [selectedPokemon, setselectedPokemon] = useState(null)
    
    useEffect(() => {
        if(pokemons && pokemons.length> 0 ) {
            setOptions(
                pokemons.map(item=>({id:item.id,name:item.name[pokemonTranslation]}))
            );
        }
    }, [pokemons,pokemonTranslation])

    useEffect(() => {        
        if (open) {
            if(options.length === 0){
                dispatch(getPokemonFilter(filter))
            }
        }
    }, [open,dispatch,filter]);

    const handleChange = (e,v)=>{    
        if(v)    
            setselectedPokemon(v.id)
    }

    const handleAddPokemon = ()=>{
        if(remainingPokemon>=1)
            dispatch(addPokemonToPokedex(selectedPokemon))

        else{
            let notification = Notification.fromObject({
                Description: trasnlations.pokedex.errorRemaning,
                Severity:SEVERITY_NOTIFICACION.WARNING,
                Timeout:5000
            });
            dispatch(addNotification(notification))
        }
    }

    return (
        <Box display="flex" flexDirection="row" p={1} m={1} bgcolor="background.paper">
            <Box p={1}>
                <Autocomplete
                    id="asynchronous"
                    style={{ width: 300 }}
                    open={open}
                    onOpen={() => {
                        setOpen(true);
                    }}
                    onClose={() => {
                        setOpen(false);
                    }}
                    onChange={(event, value) => handleChange(event, value)}
                    getOptionSelected={(option, value) => option.id === value.id}
                    getOptionLabel={(option) => option.name}
                    options={options}
                    loading={loadingPokemons}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label={trasnlations.pokedex.add}
                            variant="outlined"
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <React.Fragment>
                                        {loadingPokemons ? <CircularProgress color="inherit" size={20} /> : null}
                                        {params.InputProps.endAdornment}
                                    </React.Fragment>
                                ),
                            }}
                        />
                    )}
                />
            </Box>
            <Box p={1}>
                <Button variant="contained" color="primary" disabled={selectedPokemon === null || remainingPokemon === 0 }  onClick={handleAddPokemon}>
                    Add
                </Button>
            </Box>           
        </Box>
        
         
    )
}


export default SearchPokemons
