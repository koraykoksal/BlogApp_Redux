import { Box, Button, CardMedia, Grid, Typography } from '@mui/material'
import React from 'react'
import notFound_img from '../assets/img/404.png'
import { useNavigate } from 'react-router-dom'


export const NotFound = () => {

  const navigate=useNavigate()

  return (

    <Grid  sx={{display:'flex',flexDirection:'column',justifyContent:'center',mt:10,textAlign:'center',alignItems:'center'}}>

      <Box>
        <img
        style={{height:'450px'}}
        src={notFound_img}
        />
      </Box>

      <Box sx={{display:'flex',flexDirection:'wrap',gap:2}}>



      <Button 
      variant='contained' 
      sx={{fontSize:'25px',mt:'50px',p:'0.5rem',borderRadius:'1rem',borderColor:'1px solid #000000',color:'#ffffff',width:'150px','&:hover':{cursor:'pointer',backgroundColor:'transparent',color:'#000000'}}}
      onClick={()=>navigate('/')}
      >
        Home
      </Button>

      <Button 
      variant='contained' 
      sx={{fontSize:'25px',mt:'50px',p:'0.5rem',backgroundColor:'#C23373',borderRadius:'1rem',borderColor:'1px solid #ffffff',color:'#ffffff',width:'150px','&:hover':{cursor:'pointer',backgroundColor:'transparent',color:'#000000'}}}
      onClick={()=>navigate(-1)}
      >
        Go Back
      </Button>

      

      </Box>
      
    </Grid>

  )
}
