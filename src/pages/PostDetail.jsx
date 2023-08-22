import React from 'react'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';

export const PostDetail = () => {

  const {state} = useLocation();
  const {id} = useParams()
  const{viewPostData} = useSelector((state)=>state.blog)

  console.log("viewed: ",viewPostData)
  console.log(id)
  
  
  return (

    <Typography sx={{mt:10}}>
      Detail
    </Typography>
  )

}
