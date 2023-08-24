import React from 'react'
import { useForm, ValidationError } from '@formspree/react';
import { Box, Container, Grid, TextField, Typography } from '@mui/material';
import Button from "@mui/material/Button"
import contactImg from '../assets/img/contactImg.jpeg'
import { Form } from 'react-router-dom';
import { useState } from 'react';


export const ContactForm = () => {

    const [state, handleSubmit] = useForm("mknlrvpa");
    if (state.succeeded) {
        return <p>Thanks for joining!</p>;
    }

    const [formInfo, setformInfo] = useState({})

    const handleChange=(e)=>{
        setformInfo({...formInfo,[e.target.name]:e.target.value})
    }


    console.log('state: ',state)
    console.log('forminfo: ',formInfo)

  return (

    <Container maxWidth='sm' sx={{mt:15}} >

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
                action='https://formspree.io/f/mknlrvpa' 
                method='post' 
                onSubmit={()=>handleSubmit(formInfo)}
                style={{display: "flex", flexDirection: "column", gap: 2}}
                >

            
                  <TextField
                  required
                    label="Name"
                    name="name"
                    id="name"
                    type="name"
                    variant="outlined"
                    onChange={handleChange}
                  />
                  <TextField
                  required
                    label="Email"
                    name="email"
                    id="email"
                    type="email"
                    variant="outlined"
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
                    onChange={handleChange}
                  />
                  <Button variant="contained" type="submit" value='Send' onClick={()=>handleSubmit(formInfo)}>
                    Send
                  </Button>

                  </form>

                </Box>

        </Grid>

        </Grid>

    </Container>
    

  )
}
