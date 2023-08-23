import { Card, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import {Grid} from '@mui/material'
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { toastErrorNotify } from '../helper/ToastNotify';
import noImage from '../assets/img/noImage.jpeg'
import CommentIcon from '@mui/icons-material/Comment';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { Box, Button, TextField } from '@mui/material';
import useBlogCall from '../hooks/useBlogCall';
import { useState } from 'react';

export const MyPost = () => {

    const {currentUser,userInfo} = useSelector((state)=>state.auth)
    const{allPost} = useSelector((state)=>state.blog)

    console.log(allPost)
    console.log(userInfo)

  return (
    <Grid sx={{mt:10}}>

                {/* // <Card>
                //     <CardMedia
                //     component="img"
                //     height="194"
                //     image={data?.image ? data.image : noImage }
                //     alt=""
                //     sx={{height:'200px',objectFit:'contain'}}
                //     />
                //     <CardContent>

                //     <Typography variant="body2" color="text.secondary">
                //     Title : {data?.title}
                //     </Typography>

                //     <Typography variant="body2" color="text.secondary">
                //     Category : {data?.category_name}
                //     </Typography>

                //     </CardContent>

                //     <CardContent sx={{height:'150px',overflow:'auto'}}>
                //         <Typography variant="body2" color="text.secondary">
                //         {data?.content}
                //         </Typography>

                //     </CardContent>

                // </Card> */}


        {
            allPost.map((item)=>(

                item.author == userInfo.username ? (console.log(item)):("") 
            ))
                       

        }

        


    </Grid>
  )
}
