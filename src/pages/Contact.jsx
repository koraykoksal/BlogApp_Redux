import { Typography } from '@mui/material'
import React from 'react'
import { ContactForm } from '../components/ContactForm'
import { useForm, ValidationError } from '@formspree/react';


export const Contact = () => {


  const [state, handleSubmit] = useForm("mknlrvpa");
  if (state.succeeded) {
      return <p>Thanks for joining!</p>;
  }


  return (
    
    <>
    <ContactForm/>

    </>
    

  )
}
