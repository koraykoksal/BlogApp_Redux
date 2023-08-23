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

    const {comments}=useSelector((state)=>state.blog)
    const [comment, setComment] = useState("")
    const [commentData, setcommentData] = useState({})
    const [likeData, setlikeData] = useState({})
    const [viewData, setviewData] = useState({})
  
  
    const {commentPostData,getcommnetsData,likePostData,getViewedBlogData,getBlogData} = useBlogCall()
  
    const [expanded, setExpanded] = React.useState(false);
  
    const handleExpandClick = () => {
      setExpanded(!expanded);
    };
  
    const handleChangeComment=(e)=>{
      setComment(e.target.value)
    }



    const userPostControl=()=>{

      const data = allPost.filter(item=>item.author == currentUser)
      setuserPost(data)

    }


  
    useEffect(() => {
      userPostControl()
    }, [allPost])
    

    useEffect(() => {
      getBlogData('blogs')
     
    }, [])

    console.log(userPost)
    

  return (

    <Grid container justifyContent={"center"} spacing={2} mt={10} mb={10} gap={2}>

        {

          userPost.map((item,index)=>(

            <Grid item key={index}>
              <Card sx={{ maxWidth: 345,boxShadow:3}}>
              <CardHeader
                avatar={

                  
                  <Avatar  sx={{ bgcolor:'#C23373'}} aria-label="recipe">
                  {item?.author?.charAt(0)}
                  </Avatar>
                  
                }
                action={

                  
                  <IconButton onClick={()=>{

                    

                  }}
                    aria-label="settings" 
                    sx={{display:'flex',
                    flexDirection:'column'}}
                    >

                    {/* <VisibilityIcon/> */}
                    <MoreVertIcon/>

                  </IconButton>

                  
                  
                }
                title={item?.author}
                subheader={new Date(item.publish_date).toDateString()}
              />

              <CardMedia
                component="img"
                height="194"
                image={item?.image ? item.image : noImage }
                alt=""
                sx={{height:'200px',objectFit:'contain'}}
              />
              <CardContent>
              <Typography variant="body2" color="text.secondary">
                  Title : {item?.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Category : {item?.category_name}
                </Typography>
              </CardContent>
              <CardContent sx={{height:'150px',overflow:'auto'}}>
                <Typography variant="body2" color="text.secondary">
                  {item?.content}
                </Typography>
              </CardContent>

              <CardActions disableSpacing sx={{gap:2}}>

                {/* like button */}
                

                  
                    <Badge badgeContent={item?.likes} color="primary">
                      <FavoriteIcon sx={{'&:hover':{cursor:'pointer'}}} color='action' onClick={()=>{
                      likePostData('likes',item.id,{...likeData,post:item.id,user:userInfo.id})
                      }}/>
                    </Badge>
                
                

                {/* show button */}
                <Badge badgeContent={item?.post_views} color="primary">
                <VisibilityIcon sx={{'&:hover':{cursor:'pointer'}}} color='action'/>
                </Badge>

                {/* comment button */}
                <Badge badgeContent={item?.comment_count} color="primary">
                <CommentIcon
                sx={{'&:hover':{cursor:'pointer'}}}
                color='action'
                expand={expanded}
                onClick={()=>{
                  handleExpandClick()
                  getcommnetsData('comments',item.id)
                  console.log(item.id)
                }}
                />
                </Badge>

                <IconButton aria-label='bookmark'>
                  <BookmarkBorderIcon/>
                </IconButton>


              </CardActions>

              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography paragraph variant='overline'>Comments</Typography>
                  
                  <Box sx={{display:'flex',flexDirection:'column',gap:2,mb:3}}>
                    <TextField 
                    required
                    placeholder='Comment..'
                    type='text'
                    name='comment'
                    id='comment'
                    value={comment}
                    onChange={handleChangeComment}
                    />

                   
                        <Button 
                          type='submit' 
                          variant='contained'
                          onClick={()=>
                            {
                              commentPostData('comments',item.id,{...commentData,post:item.id,content:comment})
                              getBlogData('blogs') //burada blogs dataya tekrar istek atılır çünkü yorum count bilgisine ulaşmak için
                              setComment("")
                            }
                          }
                          >
                            Comment
                          </Button>
                    


                  </Box>

                  {

                    comments.map((com)=>(


                      <Card key={com.id} sx={{mb:1,boxShadow:3,border:'1px solid #A8DF8E'}}>

                        <CardContent sx={{display:'flex',flexDirection:'wrap',alignItems:'center',gap:1}}>
                          
                          <Avatar  sx={{ bgcolor:'#C23373'}} aria-label="recipe">
                          {com?.user?.charAt(0)} 
                          </Avatar>
                          <Typography sx={{fontSize:'14px'}} color={"text.secondary"}>
                            {com.user}
                          </Typography>
                          
                        </CardContent>

                        <CardContent>

                        <Typography sx={{fontSize:'14px'}}>
                            {com.content}
                        </Typography>

                        </CardContent>
                      </Card>

                    ))
                  }
                  
                  
                  
                </CardContent>
              </Collapse>
              </Card>
            </Grid>
          ))

        }

        


    </Grid>
  )
}
