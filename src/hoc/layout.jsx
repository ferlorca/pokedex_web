import React from 'react';
import Header from "../components/header/header";
import Container from '@material-ui/core/Container';
import Styles from "./styles";
import Notifications from './../components/notification';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({   
    container: {
      marginTop: '63px'
    },
  }));
  

function Layout(props) {
    const classes = useStyles();
    return (
        <Styles>
            <Header />
            <Notifications />
            <Container className={classes.container}>
                {props.children}
            </Container>
        </Styles>
    )
}

export default Layout
