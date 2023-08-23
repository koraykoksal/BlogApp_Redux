import React from 'react'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Card, CardHeader, Grid,Box,TextField,Button } from '@mui/material';
import { styled } from '@mui/material/styles';
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
import noImage from '../assets/img/noImage.jpeg'
import useBlogCall from '../hooks/useBlogCall';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CommentIcon from '@mui/icons-material/Comment';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

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


export const PostDetail = () => {

  const {currentUser,userInfo}=useSelector((state)=>state.auth)

  const {state} = useLocation();
  const {id} = useParams()

  const {viewedPost}=useSelector((state)=>state.blog)

  const dateEvent = new Date(state?.publish_date)

  const {comments}=useSelector((state)=>state.blog)
  const [comment, setComment] = useState("")
  const [commentData, setcommentData] = useState({})
  const [likeData, setlikeData] = useState({})
  const [viewData, setviewData] = useState({})


  const {commentPostData,getcommnetsData,likePostData,getViewedBlogData,getBlogData} = useBlogCall()

  console.log("id: ",id)
  console.log("state: ",state)


  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleChangeComment=(e)=>{
    setComment(e.target.value)
  }
  
  return (

    <Grid container justifyContent={"center"} spacing={2} mt={5} mb={10}>

    
    <Card sx={{ maxWidth: 450,mt:10 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {state?.author?.charAt(0)}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={viewedPost.author}
        subheader={dateEvent.toDateString()}
      />
      <CardMedia
        component="img"
        height="194"
        image={viewedPost?.image ? viewedPost.image : noImage }
        sx={{height:'300px',objectFit:'contain'}}
      />
      <CardContent>
      <Typography variant="body2" color="text.secondary">
          Title : {viewedPost?.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Category : {viewedPost?.category_name}
        </Typography>
      </CardContent>
      <CardContent sx={{height:'150px',overflow:'auto'}}>
        <Typography variant="body2" color="text.secondary">
          {viewedPost?.content}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>

        {/* like button */}
        <IconButton 
        aria-label="add to favorites" 
        >
        <FavoriteIcon onClick={()=>{
          likePostData('likes',state.id,{...likeData,post:viewedPost.id,user:userInfo.id})
          getViewedBlogData('blogs',id)
        }}/> 
        <Typography>{viewedPost?.likes}</Typography>
        </IconButton>

        {/* show button */}
        <IconButton aria-label="show">
          <VisibilityIcon/> <Typography>{viewedPost?.post_views}</Typography>
        </IconButton>

        {/* comment button */}
        <IconButton aria-label="comment">
          <ExpandMore
            expand={expanded}
            onClick={()=>{
              handleExpandClick()
              getcommnetsData('comments',id)
            }}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <CommentIcon/> <Typography>{viewedPost?.comment_count}</Typography>
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
                commentPostData('comments',id,{...commentData,post:viewedPost.id,content:comment})
                getViewedBlogData('blogs',id)
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


    </Grid>
  )

}
