import { Grid, Paper, Typography } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import PokedexList from "./pokemonList/pokedexList";
import Loading from "../../components/loading";
import SearchPokemons from "./searchpokemons";



const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
    },
    search: {
        position: "relative"
    },
    searchIcon: {
        position: "absolute",
        top: 22
    },
    magintop:{
        marginTop:"50px"
    }
}));

function MyPokedex() {

    const classes = useStyles();
    const trasnlations = useSelector(state => state.translation.translations)
    const loading = useSelector(state => state.pokedex.loading)
    const remainingPokemon = useSelector(state => state.pokedex.remainingPokemon)


    return (
        <Paper className={classes.root}>
            <Grid container justify="center" >
                <Grid item xs={12} sm={12} mb={12} pb={6} >
                    <Grid container justify="center" alignItems="center" m={7}>
                        <Grid item xs={12} sm={6}  >
                            <Typography variant="h3">
                                {trasnlations.pokedex.title}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} className={classes.search}>
                            <SearchPokemons />
                        </Grid>
                    </Grid>
                    <Grid container m={8}>
                        <Grid item xs={12} >
                            <Typography variant="h4">
                                {trasnlations.pokedex.remaning}: {remainingPokemon}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container   className={classes.magintop}>               
                {loading ? <Loading /> : <PokedexList />}                
            </Grid>
        </Paper>
    )
}

export default MyPokedex
