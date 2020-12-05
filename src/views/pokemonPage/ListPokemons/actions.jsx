import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CheckIcon from "@material-ui/icons/Check"
import Green from "@material-ui/core/colors/green"

import { Box, Button, CircularProgress, Grid, Typography } from '@material-ui/core'
import { addPokemonToPokedex, deletePokemonFromPokedex } from '../../../store/actions/pokedex_action';



function Actions({ row ,loadingRow}) {
    const dispatch = useDispatch();
    const translations = useSelector(state => state.translation.translations)
    const pokemonTranslation = useSelector(state => state.pokemon.pokemonTranslation)
    const pokedex = useSelector(state => state.pokedex.pokedex)
    const remaining = useSelector(state => state.pokedex.remainingPokemon)
    const [showMsj, setShowMsj] = useState(false)
    const [isInPokedex, setisInPokedex] = useState(false)
    const [loading, setloading] = useState(false)

    useEffect(() => {
        if (showMsj)
            setTimeout(() => {
                setShowMsj(false)
            }, 2000); //se muestra por dos segundos
    }, [showMsj])

    useEffect(() => {
        if(pokedex.length>0){
            let isInIt = pokedex.filter(item=>item.id === row.id);
            setisInPokedex(isInIt.length>0)         
        }else{
            setisInPokedex(false)
        }    
        setloading(false);   
    }, [pokedex,row.id])

    const handlePokemon = needToRemove => {
        if (needToRemove) {
            dispatch(deletePokemonFromPokedex(row.id))
        } else {
            if(remaining>=1)
                dispatch(addPokemonToPokedex(row.id))
        }
        setloading(true);
        setShowMsj(true);
    }
    return (
        <Grid key={row.id} container spacing={8} direction="row" justify="flex-end" alignItems="center">           
            {showMsj && !loading ?
                <Grid item>
                    <Box display="flex" flexDirection="row" p={1} m={1}>
                        <Box p={1} >
                            <Typography variant="h5">
                                {row.name[pokemonTranslation] + " " + (!isInPokedex ? translations.utils.removed :translations.utils.added)}
                            </Typography>
                        </Box>
                        <Box p={1} >
                            <CheckIcon fontSize="large" style={{ color: Green[500] }} />
                        </Box>
                    </Box>
                </Grid>
                : null}

            <Grid item>
                {isInPokedex ?
                    <Button variant="contained"
                        color="primary"
                        disabled={loading || showMsj}
                        onClick={() => handlePokemon(true)}>
                        {translations.utils.remove}
                    </Button>
                    : null
                }
                {
                    remaining > 0 && !isInPokedex ?
                        <Button variant="contained"
                            color="primary"
                            disabled={loading || showMsj}
                            onClick={() => handlePokemon(false)}>
                            {translations.utils.add}
                        </Button>
                        :
                        null
                }

            </Grid>
{/* 
            {loadingRow ? <Grid item p={2} m={2}>
                <CircularProgress color="inherit" size={20} />
            </Grid> :null} */}
        </Grid>
    )
}

export default Actions
