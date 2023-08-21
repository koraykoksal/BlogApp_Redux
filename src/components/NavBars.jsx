import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {PiUserListDuotone} from 'react-icons/pi'
import useAuthCall from '../hooks/useAuthCall';
import { Navigate } from 'react-router-dom';
import { ListItem, ListItemText } from '@mui/material';
import logo from '../assets/img/KBLOG-LOGO.png'


function ResponsiveAppBar() {

  const {currentUser} = useSelector((state)=>state.auth)
  const {logout} = useAuthCall()
  const navi = useNavigate()
  const dispatch = useDispatch()

  const pages = [
    {
      title:'Home',
      url:'/'
    },
    {
      title:'About',
      url:'/about'
    }
  ];





  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const test=()=>{
    logout()
  }

  return (
    <AppBar position="fixed" sx={{backgroundColor:'#000000'}}>
      <Container maxWidth="xl">

        <Toolbar disableGutters>

          {/* <Typography
            variant="h6"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: '#C23373',
              textDecoration: 'none',
            }}
          >
            K-BLOG
          </Typography> */}

          <Box sx={{display:{xs:'none',md:'flex'}}}>
            <img src={logo} alt="" style={{height:'50px',marginRight:'1rem'}} />
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((item,index) => (
                <MenuItem key={index} onClick={()=>{
                  handleCloseNavMenu()
                  navi(item.url)
                }}>
                  <Typography textAlign="center">{item.title}</Typography>
                </MenuItem>
              ))}
            </Menu>

          </Box>



          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((item,index) => (
              <Button
                key={index}
                onClick={()=>navi(item.url)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {item.title}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>

              {
                currentUser ? (
                <Box sx={{display:'flex',gap:3}}>
                  <Button variant="outlined" sx={{color:'#ffffff',borderColor:'#C23373','&:hover':{backgroundColor:'#79155B',borderColor:'#79155B'}}}>+ Post</Button> 

                  <IconButton sx={{'&:hover':{scale:'1.1'}}}> 
                  <PiUserListDuotone onClick={handleOpenUserMenu} size={'35px'} color='#ffffff' style={{padding:3}}/> 
                  </IconButton>
                </Box>
                ):(
                <Box sx={{display:'flex',gap:3}}>
                  <Button onClick={()=>navi('/login')} sx={{color:'#ffffff','&:hover':{color:'#C23373'}}}>Login</Button>
                  <Button onClick={()=>navi('/register')} sx={{backgroundColor:'#79155B',color:'#ffffff','&:hover':{backgroundColor:'#C23373'}}}>Register</Button>
                </Box>
                  )
              }
              <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',gap:3}}>


              </Box>

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
                  <Button onClick={()=>navi('/profile')}>Profile</Button>
                  <Button onClick={()=>logout()}>Logout</Button>
                </Box>
            </Menu>

          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;