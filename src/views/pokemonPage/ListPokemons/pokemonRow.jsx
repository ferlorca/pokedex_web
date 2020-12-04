import React, { useState } from "react";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import { useDispatch, useSelector } from "react-redux";
import { getBase } from "../../../store/actions/pokemon_action";
import Loading from "../../../components/loading";
import Actions from "./actions";
import { Grid } from "@material-ui/core";


const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

const Row = (props) => {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const classes = useRowStyles();
  const dispatch = useDispatch();
  const trasnlations = useSelector(state => state.translation.translations)
  const pokemonTranslation = useSelector(state => state.pokemon.pokemonTranslation)
  const baseLoading = useSelector(state => state.pokemon.baseLoading)


  const handleOpen = (row) => {
    if (!open && !row.base)
      dispatch(getBase(row.id));
    setOpen(!open)
  }

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => handleOpen(row)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name[pokemonTranslation]}
        </TableCell>
        <TableCell>{row.type.map(item => (item + ","))}</TableCell>
        <TableCell align="right">
            <Actions row={row} loadingRow={baseLoading[row.id]}/>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                {trasnlations.pokemon.base}
              </Typography>

              {/* if !loading */}
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="right">{trasnlations.pokemon.attack}</TableCell>
                    <TableCell align="right">{trasnlations.pokemon.defense} </TableCell>
                    <TableCell align="right">{trasnlations.pokemon.hp} </TableCell>
                    <TableCell align="right">{trasnlations.pokemon.spAttack} </TableCell>
                    <TableCell align="right">{trasnlations.pokemon.spDefense} </TableCell>
                    <TableCell align="right">{trasnlations.pokemon.speed} </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {baseLoading[row.id] || !row.base ? 
                      null   
                    :
                    <TableRow>
                      <TableCell align="right">{row.base.attack}</TableCell>
                      <TableCell align="right">{row.base.defense} </TableCell>
                      <TableCell align="right">{row.base.hp} </TableCell>
                      <TableCell align="right">{row.base.spAttack} </TableCell>
                      <TableCell align="right">{row.base.spDefense} </TableCell>
                      <TableCell align="right">{row.base.speed} </TableCell>
                    </TableRow>
                  }
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.object.isRequired,
    type: PropTypes.array.isRequired,   
  }).isRequired,
};

export default Row;