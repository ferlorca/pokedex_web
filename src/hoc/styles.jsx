import React from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { indigo,red } from '@material-ui/core/colors';
import Pokemontff from "./../assets/PokemonSolid.ttf";
const pokeTypo = {
    fontFamily: 'pokeTypo',
    src: `
      local('pokeTypo'),
      url(${Pokemontff}) format('tff')
    `,   
  };

const theme = createMuiTheme({
    palette: {
        primary: { main: indigo[500] },
        secondary: { main: red[900] },
    },
    overrides: {
        MuiCssBaseline: {
            '@global': {
                '@font-face': [pokeTypo],
            },
        },
    },
    
});

function Style(props) {
    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <React.Fragment>
                    {props.children}
            </React.Fragment>
        </MuiThemeProvider>
    )
}

export default Style
