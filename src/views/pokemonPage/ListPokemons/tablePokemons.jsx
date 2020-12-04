import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Row from "./pokemonRow";
import { useSelector } from 'react-redux';
import { CircularProgress, Grid } from '@material-ui/core';

export default function PokemonList() {
  const trasnlations = useSelector(state => state.translation.translations)
  const pokemons = useSelector(state => state.pokemon.pokemons)
  const loading = useSelector(state => state.pokemon.loading)
  return (
    <TableContainer component={Paper} style={{width:"98%"}}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>{trasnlations.pokemon.name}</TableCell>
            <TableCell>{trasnlations.pokemon.type}</TableCell>
            <TableCell align="right">{trasnlations.pokemon.actions}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>          
             {pokemons.length> 0 ?  pokemons.map((row) => (
                <Row key={row.id} row={row} />
              )) : null}

        {/* {loading ? 
              <Grid container
              direction="row"
              justify="center"
              alignItems="center"
              style={{width:"100%"}}
              >     
                <Grid item xs={12} p={10}>
                  <CircularProgress color="inherit" size={40} />
                </Grid>
              </Grid>        
            : null} */}
        </TableBody>
      </Table>
    </TableContainer>
  );
}