import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useBlogCall from '../hooks/useBlogCall';
import { useEffect } from 'react';

export const AlertModal = ({openAlert,setOpenAlert,item,userPost}) => {


    const {deletePostData,getBlogData}=useBlogCall()
  
    const handleClose = () => {
      setOpenAlert(false);
    };

    

  return (

        <div>
        
        <Dialog
        open={openAlert}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title" variant='subtitle2'>
            ID:{item.id} - Title:{item.title} - Category : {item.category_name}
        </DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
             Do you want to delete this post ?
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button 
            sx={{color:'#000000','&:hover':{backgroundColor:'#232931',color:'#ffffff'}}}
            onClick={handleClose}
            >No</Button>

            <Button 
            sx={{color:'#D71313','&:hover':{backgroundColor:'#D71313',color:'#ffffff'}}}
            onClick={()=>{
                deletePostData('blogs',item.id)
                
                handleClose()
            }} 
            autoFocus>
            Yes
            </Button>
        </DialogActions>
        </Dialog>
    </div>
  )
}
