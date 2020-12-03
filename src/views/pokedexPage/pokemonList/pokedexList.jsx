import React from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import { makeStyles } from '@material-ui/core/styles';
import { deletePokemonFromPokedex } from '../../../store/actions//pokedex_action';

import pokeimg from "../../../assets/pokemon.jpg";
import { useDispatch, useSelector } from 'react-redux';


const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 330,
    },
    descriptionCard: {
        backgroundImage: `url(${pokeimg})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
    }
}));

const MyPokedex = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const translations = useSelector(state => state.translation.translations)
    const pokemonTranslation = useSelector(state => state.pokemon.pokemonTranslation)
    const pokemons = useSelector(state => state.pokedex.pokedex)
    return (
        <Grid container justify="center" spacing={3} mt={6} >
            {pokemons.length > 0 ?
                pokemons.map((item) => (
                    <Grid item key={item.id} xs={12} sm={3}>
                        <Card className={classes.card}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={pokeimg}
                                    className={classes.descriptionCard}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {item.name[pokemonTranslation].replace(/^\w/, function (chr) {
                                            return chr.toUpperCase();
                                        })}
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        <strong>{translations.pokemon.type}: </strong>{item.type.map((e, i) => (e + (item.type.length - 1 === i ? "" : ",")))}
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        <strong>{translations.pokemon.attack}: </strong> {item.base.attack}
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        <strong>{translations.pokemon.defense}: </strong> {item.base.defense}
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        <strong>{translations.pokemon.hp}: </strong> {item.base.hp}
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        <strong>{translations.pokemon.spAttack}: </strong> {item.base.spAttack}
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        <strong>{translations.pokemon.spDefense}: </strong> {item.base.spDefense}
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        <strong>{translations.pokemon.speed}: </strong> {item.base.speed}
                                    </Typography>

                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button size="small" color="primary" onClick={() => { dispatch(deletePokemonFromPokedex(item.id)) }}>
                                    {translations.pokedex.remove}
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))
                : <Grid item xs={12} sm={3} >
                    {translations.pokedex.needToAddPokemons}
                </Grid>
            }
        </Grid>
    )
}

export default MyPokedex