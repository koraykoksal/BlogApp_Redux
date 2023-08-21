import * as React from 'react';
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



export default function PostModal({open,setOpen}) {
  
  let currentDate=new Date()
  const handleClose = () => setOpen(false);
  const {newPostData} = useBlogCall()
  
  const {categories}=useSelector((state)=>state.blog)

  console.log(categories)
  
  const handleSubmit=(info)=>{
    newPostData('blogs',info)
  }


  

  return (
    <div>
      <Modal
        open={open}
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
          initialValues={{title:"",content:"",image:"",category:null,status:"",slug:""}}
          // validationSchema={postInfoSchema}
          onSubmit={(values,action)=>{
            handleSubmit(values)
            action.resetForm()

          }}
          >
            {({handleChange, handleBlur, values, touched, errors })=>(
              <Form>
                <Box sx={{display: "flex", flexDirection: "column", gap: 2 }}>
                  <TextField
                  label="Title *"
                  name="title"
                  id='title'
                  type='text'
                  variant='outlined'
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.title && Boolean(touched.title)}
                  helperText={errors.title}
                  />
                  <TextField
                  label="Content *"
                  name="content"
                  id='content'
                  type='text'
                  variant='outlined'
                  value={values.content}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.content && Boolean(touched.content)}
                  helperText={errors.content}
                  />
                  <FormControl>
                    <InputLabel>Category</InputLabel>
                    <Select
                      id='category'
                      value={console.log(values.category)}
                      onChange={handleChange}
                      autoWidth
                      name='category'
                      label='Category'
                    >
                      {
                        categories.map((item)=>(
                          <MenuItem value={item.id}>{item.name}</MenuItem>
                        ))
                      }
                      
                    </Select>
                  </FormControl>

                  <TextField
                  label="Image Link"
                  name="image_link"
                  id='image_link'
                  type='text'
                  variant='outlined'
                  value={values.image_link}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  // error={touched.image_link && Boolean(touched.image_link)}
                  // helperText={errors.image_link}
                  />

                  <Button type='submit' variant='contained' sx={{backgroundColor:'#7A9D54','&:hover':{backgroundColor:'#557A46'}}}>Publish</Button>
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
  );
}