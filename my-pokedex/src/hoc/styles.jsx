import React from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { indigo,red } from '@material-ui/core/colors';


const theme = createMuiTheme({
    palette: {
        primary: { main: indigo[500] },
        secondary: { main: red[900] },
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
