import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {Formik,Form} from 'formik'
import { Container, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

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
  // const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
          initialValues={{title:"",content:"",image:"",category:"",status:"",slug:""}}
          validationSchema={""}
          >
            {({handleChange, handleBlur, values, touched, errors })=>(
              <Form>
                <Box sx={{display: "flex", flexDirection: "column", gap: 2 }}>
                  <TextField
                  label="Title"
                  name="title"
                  id='title'
                  type='text'
                  variant='outlined'
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errors={touched.title && Boolean(touched.title)}
                  helperText={touched.title}
                  />
                  <TextField
                  label="Content"
                  name="content"
                  id='content'
                  type='text'
                  variant='outlined'
                  value={values.content}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errors={touched.content && Boolean(touched.content)}
                  helperText={touched.content}
                  />
                  <TextField
                  label="Image Link"
                  name="image_link"
                  id='image_link'
                  type='text'
                  variant='outlined'
                  value={values.image_link}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errors={touched.image_link && Boolean(touched.image_link)}
                  helperText={touched.image_link}
                  />
                  <TextField
                  label="Category"
                  name="category"
                  id='category'
                  type='text'
                  variant='outlined'
                  value={values.category}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errors={touched.category && Boolean(touched.category)}
                  helperText={touched.category}
                  />
                  <TextField
                  label="Status"
                  name="status"
                  id='status'
                  type='text'
                  variant='outlined'
                  value={values.status}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errors={touched.status && Boolean(touched.status)}
                  helperText={touched.status}
                  />
                  <TextField
                  label="Slug"
                  name="slug"
                  id='slug'
                  type='text'
                  variant='outlined'
                  value={values.slug}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errors={touched.slug && Boolean(touched.slug)}
                  helperText={touched.slug}
                  />
                  <Button variant='contained' sx={{backgroundColor:'#7A9D54','&:hover':{backgroundColor:'#557A46'}}}>Publish</Button>
                  <Button variant='outlined' onClick={handleClose}>Cancel</Button>
                </Box>
              </Form>
              
            )}
          </Formik>
          
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}