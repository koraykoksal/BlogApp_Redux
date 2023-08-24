import { Box, Card, CardContent, Container, Grid, Typography } from '@mui/material'
import React from 'react'

export const About = () => {


  return (


    <Container>

      <Grid container textAlign='center' direction='column' mt={10}>

      <Typography sx={{mt:10,display:'inline'}} variant='h6'>
        Welcome to my page. I hope you enjoy.
      </Typography>

      <Typography 
      width={250}
      sx={{
        color:'#ffffff',
        margin:'auto',
        mt:10,background: 'rgb(131,58,180)',
        background:'linear-gradient(45deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)'
        }} 
        variant='subtitle2'>
          Designed By Koray Köksal.
      </Typography>

      </Grid>
    
    </Container>
    


  )
}
