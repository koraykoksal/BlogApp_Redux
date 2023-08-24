import React from 'react'
import { useForm, ValidationError } from '@formspree/react';
import { Box, Container, Grid, TextField, Typography } from '@mui/material';
import Button from "@mui/material/Button"
import contactImg from '../assets/img/contactImg.jpeg'
import { Form } from 'react-router-dom';
import { useState } from 'react';
import useBlogCall from '../hooks/useBlogCall';


export const ContactForm = () => {

    // const [state, handleSubmit] = useForm("mknlrvpa");
    // if (state.succeeded) {
    //     return <p>Thanks for joining!</p>;
    // }



    const {postContactData} = useBlogCall()
    const [formInfo, setformInfo] = useState({})

    const handleChange=(e)=>{
        setformInfo({...formInfo,[e.target.name]:e.target.value})
    }

    const handleSubmit=(e)=>{
      e.preventDefault()
      postContactData(formInfo)
      setformInfo({name:"",email:"",message:""})
    }


  return (

    <Container maxWidth='sm' sx={{mt:15,height:'100vh'}} >

        <Grid
        container
        justifyContent='center'
        direction='column'
       
        >

       

        <Grid item xs={12} sm={10} md={6} >
            <Container>
            <img src={contactImg} alt="" />
            </Container>
        </Grid>

        <Grid item xs={12} sm={10} md={6} >

                <Box>
                
                <form 
                // action='https://formspree.io/f/mknlrvpa' 
                //method='post' 
                // onSubmit={()=>handleSubmit(formInfo)}
                onSubmit={handleSubmit}

                style={{display: "flex", flexDirection: "column", gap: 2}}
                >

            
                  <TextField
                  required
                    label="Name"
                    name="name"
                    id="name"
                    type="name"
                    variant="outlined"
                    value={formInfo.name}
                    onChange={handleChange}
                  />
                  <TextField
                  required
                    label="Email"
                    name="email"
                    id="email"
                    type="email"
                    variant="outlined"
                    value={formInfo.email}
                    onChange={handleChange}
                  />
                  <TextField
                  required
                    label="Message"
                    name="message"
                    id="message"
                    type="text"
                    multiline
                    rows={4}
                    variant="outlined"
                    value={formInfo.message}
                    onChange={handleChange}
                  />
                  <Button variant="contained" type="submit" value='Send'>
                    Send
                  </Button>

                  </form>

                </Box>

        </Grid>

        </Grid>

    </Container>
    

  )
}
