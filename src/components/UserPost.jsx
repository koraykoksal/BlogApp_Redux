import React from 'react'
import { styled } from '@mui/material/styles';
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
import noImage from '../assets/img/noImage.jpeg'
import Badge from '@mui/material/Badge';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CommentIcon from '@mui/icons-material/Comment';
import { Box ,TextField,Button} from '@mui/material';
import { useSelector,useDispatch } from 'react-redux';
import { useState } from 'react';
import useBlogCall from '../hooks/useBlogCall';
import { ImageOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { AlertModal } from './AlertModal';

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

export const UserPost = ({item,userBlogs,userPost}) => {

    const {currentUser,userInfo}=useSelector((state)=>state.auth)
    const distpatch=useDispatch()
    const navi=useNavigate()

    const [expanded, setExpanded] = React.useState(false);

    const {comments}=useSelector((state)=>state.blog)
    const [comment, setComment] = useState("")
    const [commentData, setcommentData] = useState({})
    const [likeData, setlikeData] = useState({})
    const [viewData, setviewData] = useState({})

    const [open, setOpen] = React.useState(false);

    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const {commentPostData,getcommnetsData,likePostData,getViewedBlogData,getBlogData} = useBlogCall()

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    const handleChangeComment=(e)=>{
        setComment(e.target.value)
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    

    const handleClickOpen = () => {
      setOpen(true);
    };
  return (

    
    <Card sx={{ maxWidth: 345 ,boxShadow:3}}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {item?.author?.charAt(0)}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon onClick={handleOpenUserMenu} />
          </IconButton>
        }
        title={item?.author}
        subheader={new Date(item?.publish_date).toDateString()}
      />
      <CardMedia
        component="img"
        height="194"
        image={item?.image ? item.image : noImage }
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

            <Badge badgeContent={item?.likes} color="primary">
              <FavoriteIcon sx={{'&:hover':{cursor:'pointer'}}} color='action' onClick={()=>{
              likePostData('likes',item.id,{...likeData,post:item.id,user:userInfo.id})
              }}/>
            </Badge>

            <Badge badgeContent={item?.post_views} color="primary">
            <VisibilityIcon sx={{'&:hover':{cursor:'pointer'}}} color='action'/>
            </Badge>

            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >

              <Box onClick={handleCloseUserMenu} sx={{display:'flex',flexDirection:'column'}}>
                  <Button 
                  sx={{color:'#FFC436','&:hover':{backgroundColor:'#F0F0F0'}}}>Edit</Button>
                  <Button 
                  onClick={handleClickOpen}
                  sx={{color:'#C70039','&:hover':{backgroundColor:'#F0F0F0'}}}>Delete</Button>
              </Box>
            </Menu>


            <Badge badgeContent={item?.comment_count} color="primary">
            <CommentIcon
            sx={{'&:hover':{cursor:'pointer'}}}
            color='action'
            expand={expanded}
            onClick={()=>{
            handleExpandClick()
            getcommnetsData('comments',item.id)
            }}
            />
            </Badge>


        {/* <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
        <ExpandMoreIcon />
        
        </ExpandMore> */}


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
                        <Box>
                        <Typography sx={{fontSize:'14px'}} color={"text.secondary"}>
                            {com.user}
                        </Typography>
                        <Typography sx={{fontSize:'14px'}} color={"text.secondary"}>
                            {new Date(com.time_stamp).toLocaleString()}
                        </Typography>
                        </Box>
                        
                        
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
      <AlertModal open={open} setOpen={setOpen} item={item}/>
    </Card>

  )
}
