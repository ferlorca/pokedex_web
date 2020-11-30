import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'



function RenderAutocomplete({ id, name }) {
    return <Grid key={id} container wrap="nowrap" spacing={2}>        
        <Grid item xs zeroMinWidth>
            <Typography noWrap>{name}</Typography>
        </Grid>
    </Grid>
}

export default RenderAutocomplete
