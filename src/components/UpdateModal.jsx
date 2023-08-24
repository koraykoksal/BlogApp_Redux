import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {Formik,Form} from 'formik'
import { Container, TextField,Select,MenuItem } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { object, string } from "yup"
import {postInfoSchema} from '../helper/postTextSchema'
import useBlogCall from '../hooks/useBlogCall';
import { useEffect,useState } from 'react';
import { useSelector } from 'react-redux';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { useNavigate } from 'react-router-dom';



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};



export const UpdateModal = ({openUpdate,setOpenUpdate,item}) => {

    let currentDate=new Date()
    const {categories}=useSelector((state)=>state.blog)
    const handleClose = () => setOpenUpdate(false);

    const {updatePostData}=useBlogCall()


  return (
    <div>
        <Modal
        open={openUpdate}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <Typography id="modal-modal-title" variant="subtitle1" component="h2" sx={{p:1,color:'#367E18'}}>
            New Post
          </Typography>

          <CloseIcon sx={{color:'#C70039',mr:1,'&:hover':{cursor:'pointer',color:'#900C3F'}}} onClick={handleClose}/>
          
          </Box>

          <Formik
          initialValues={{title:item.title,content:item.content,image:item.image,category:item.category_name,status:"p",slug:"string"}}
          validationSchema={postInfoSchema}
          onSubmit={(values,actions)=>{
            updatePostData('blogs',item.id,values)
            actions.resetForm()
            actions.setSubmitting(false)
            handleClose()
          }}
          >
            {({handleChange, handleBlur, values, touched, errors })=>(
              <Form>
                <Box sx={{display: "flex", flexDirection: "column", gap: 2 }}>
                  <TextField
                  required
                  label="Title"
                  name="title"
                  id='title'
                  type='text'
                  variant='outlined'
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  //error={touched.title && Boolean(touched.title)}
                  //helperText={errors.title}
                  />
                  <TextField
                  required
                  label="Content"
                  name="content"
                  id='content'
                  type='text'
                  variant='outlined'
                  value={values.content}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  // error={touched.content && Boolean(touched.content)}
                  // helperText={errors.content}
                  />
                  <FormControl>
                    <InputLabel required>Category</InputLabel>
                    <Select
                    required
                      id='category'
                      value={values.category}
                      onChange={handleChange}
                      autoWidth
                      name='category'
                      label='Category'
                    >
                      {
                        categories.map((item)=>(
                          <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                        ))
                      }
                      
                    </Select>
                  </FormControl>

                  <TextField
                  label="Image Link"
                  name="image"
                  id='image'
                  type='text'
                  variant='outlined'
                  value={values.image}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  // error={touched.image_link && Boolean(touched.image_link)}
                  // helperText={errors.image_link}
                  />

                  <Button type='submit' variant='contained' sx={{backgroundColor:'#337CCF','&:hover':{backgroundColor:'#1450A3'}}}>Update</Button>
                  <Button variant='outlined' onClick={handleClose}>Cancel</Button>
                </Box>
              </Form>
              
            )}
          </Formik>
          
          <Typography id="modal-modal-description" sx={{ mt: 2 }} variant='subtitle2'>
            {currentDate.toLocaleDateString()}
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}
