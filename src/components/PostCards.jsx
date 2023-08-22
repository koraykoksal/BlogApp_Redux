import React from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { toastErrorNotify } from '../helper/ToastNotify';
import noImage from '../assets/img/noImage.jpeg'
import CommentIcon from '@mui/icons-material/Comment';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { Box, Button, TextField } from '@mui/material';
import useBlogCall from '../hooks/useBlogCall';
import { useState } from 'react';


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


export const PostCards = ({item}) => {

  const {currentUser,userInfo}=useSelector((state)=>state.auth)
  const distpatch=useDispatch()
  const navi=useNavigate()
  const dateEvent = new Date(item?.publish_date)

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const {comments}=useSelector((state)=>state.blog)
  const [comment, setComment] = useState("")
  const [commentData, setcommentData] = useState({})
  const [likeData, setlikeData] = useState({})
  const [viewData, setviewData] = useState({})


  const {commentPostData,getcommnetsData,likePostData,getViewedBlogData} = useBlogCall()

  const handleChangeComment=(e)=>{
    setComment(e.target.value)
  }

  const handleLike=(data)=>{
    likePostData('likes',data)
  }

  return (
    
    <Card sx={{ maxWidth: 345,boxShadow:3}}>
      <CardHeader
        avatar={

          currentUser ? 
          (
          <Avatar  sx={{ bgcolor:'#C23373'}} aria-label="recipe">
          {item?.author?.charAt(0)}
          </Avatar>
          ):(
          <Avatar sx={{ bgcolor:'#C23373' }} aria-label="recipe">
              {item?.author?.charAt(0)}
            </Avatar>
          )
          
        }
        action={

          
          currentUser ? 
          (
          <IconButton onClick={()=>{

            getViewedBlogData('blogs',item.id)

            navi(`${item.id}`) 

          }}
            aria-label="settings" 
            sx={{display:'flex',
            flexDirection:'column'}}
            >

            <VisibilityIcon/>
            <Typography variant='subtitle2'>Read More</Typography>

          </IconButton>
          ):(
          <IconButton onClick={()=>toastErrorNotify('Please Login !')} aria-label="settings" sx={{display:'flex',flexDirection:'column'}}>
            <VisibilityIcon/>
            <Typography variant='subtitle2'>Read More</Typography>
          </IconButton>
          )

          
          
        }
        title={item?.author}
        subheader={dateEvent.toDateString()}
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

      <CardActions disableSpacing>

        {/* like button */}
        <IconButton aria-label="add to favorites" onClick={()=>likePostData('likes',item.id,{...likeData,post:item.id,user:userInfo.id})}>
          <FavoriteIcon /> <Typography>{item?.likes}</Typography>
        </IconButton>

        {/* show button */}
        <IconButton aria-label="show">
          <VisibilityIcon/> <Typography>{item?.post_views}</Typography>
        </IconButton>

        {/* comment button */}
        <IconButton aria-label="comment">
          <ExpandMore
            expand={expanded}
            onClick={()=>{
              handleExpandClick()
              getcommnetsData('comments',item.id)
            }}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <CommentIcon/> <Typography>{item?.comment_count}</Typography>
          </ExpandMore>
        </IconButton>
        <IconButton aria-label='bookmark'>
          <BookmarkBorderIcon/>
        </IconButton>

        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          {/* <ExpandMoreIcon /> */}
        </ExpandMore>

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
                setComment("")
              }
            }>Comment</Button>
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

  )
}
