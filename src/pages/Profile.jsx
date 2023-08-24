import { Grid, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const Profile = () => {

  const {userInfo} = useSelector((state)=>state.auth)
  const navi=useNavigate()

  console.log(userInfo)

  return (
    <Grid container justifyContent={"center"} spacing={2}>
      <Card sx={{ maxWidth: 350,mt:15,justifyContent:'center',boxShadow:3}}>
        <CardActionArea>
          <CardMedia
            component="img"
            height={150}
            sx={{objectFit:'cover'}}
            image={userInfo.image ? (userInfo.image):('https://i.pinimg.com/564x/a3/24/93/a3249326272a72e00288712a1cf8b299.jpg')}
            alt={userInfo?.username}
          />
          <CardContent color="text.secondary">
            <Typography variant='subtitle2'>
              {userInfo?.username}
            </Typography>
            <Typography variant='subtitle2'>
              {userInfo?.email}
            </Typography>
            {/* <Typography variant='subtitle1'>
            Name Surname : {userInfo?.first_name} {userInfo?.last_name}
            </Typography> */}
          </CardContent>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {userInfo?.bio}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="info" onClick={()=>navi(-1)}>
            Back
          </Button>
        </CardActions>
      </Card>
    </Grid>
  )
}
