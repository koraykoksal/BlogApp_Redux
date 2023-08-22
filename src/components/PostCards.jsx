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

  const {currentUser}=useSelector((state)=>state.auth)
  const distpatch=useDispatch()
  const navi=useNavigate()
  const dateEvent = new Date(item?.publish_date)

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
          <IconButton onClick={()=>navi('/postdetail/'+item.id)} aria-label="settings" sx={{display:'flex',flexDirection:'column'}}>
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

        <IconButton aria-label="add to favorites">
          <FavoriteIcon /> <Typography>{item?.likes}</Typography>
        </IconButton>
        <IconButton aria-label="show">
          <VisibilityIcon/> <Typography>{item?.post_views}</Typography>
        </IconButton>
        <IconButton aria-label="comment">
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
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
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
            aside for 10 minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
            medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
            occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
            large plate and set aside, leaving chicken and chorizo in the pan. Add
            pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
            stirring often until thickened and fragrant, about 10 minutes. Add
            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is absorbed,
            15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
            mussels, tucking them down into the rice, and cook again without
            stirring, until mussels have opened and rice is just tender, 5 to 7
            minutes more. (Discard any mussels that don&apos;t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>

  )
}
