import React from 'react'
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Typography } from '@mui/material';

export const Footers = () => {

  const [value, setValue] = React.useState(0);


  return (
    
    <Box sx={{ width: '100%',position:'fixed',bottom:0,height:'45px' }}>
    <BottomNavigation
    sx={{backgroundColor:'black'}}
      showLabels
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
    >
      {/* <BottomNavigationAction label="Recents" icon={<RestoreIcon/>} />
      <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
      <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} /> */}

      <Box sx={{display:'flex',flexDirection:'wrap',justifyContent:'space-between',gap:2,alignItems:'center'}}>
        
        <GitHubIcon 
        onClick={()=>window.open('https://github.com/koraykoksal')}
        sx={{color:'#ffffff','&:hover':{cursor:'pointer'}}} 
        fontSize='medium'/>

        <LinkedInIcon 
        onClick={()=>window.open('https://www.linkedin.com/in/koraykoksall/')}
        sx={{color:'#ffffff','&:hover':{cursor:'pointer'}}} 
        fontSize='medium'/>

      </Box>

    </BottomNavigation>
  </Box>

  )
}
