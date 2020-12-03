import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

function Loading() {
  return (
    <Grid container     
    justify="center"
    alignItems="center">
      <Grid item>
        <CircularProgress color="secondary" size={100}/>
      </Grid>
    </Grid>

  );
}

export default Loading;