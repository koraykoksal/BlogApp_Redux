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
import { useState,useEffect } from 'react';
import Badge from '@mui/material/Badge';
import { UserPost } from '../components/UserPost';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));


export const MyPost = () => {

    const {currentUser,userInfo} = useSelector((state)=>state.auth)
    const{allPost} = useSelector((state)=>state.blog)
    const [userPost, setuserPost] = useState([])


    const {userBlogs} = useSelector((state)=>state.blog)

    // const {comments}=useSelector((state)=>state.blog)
    // const [comment, setComment] = useState("")
    // const [commentData, setcommentData] = useState({})
    // const [likeData, setlikeData] = useState({})
    // const [viewData, setviewData] = useState({})
  
    const {id,username}=userInfo
  
    const {commentPostData,getcommnetsData,likePostData,getViewedBlogData,getBlogData,getUserPostData,getUserDraftData} = useBlogCall()
  


    // const userPostControl=()=>{

    //   const data = allPost.filter(item=>item.author == currentUser)
    //   setuserPost(data)

    // }

    // useEffect(() => {
    //   userPostControl()
    // }, [allPost])
    

    useEffect(() => {
      getBlogData('blogs')
      getUserPostData(userInfo.id)
    }, [])



  return (


    <>

    <Grid container justifyContent={"center"} spacing={2} mt={10} mb={10} gap={2}>

        {

          userBlogs.map((item,index)=>(

            <Grid item key={index}>
            <UserPost item={item} />
            </Grid>

          ))

        }

        


    </Grid>

    </>

  )
}
