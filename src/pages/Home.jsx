import React from 'react'
import useBlogCall from '../hooks/useBlogCall'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Typography from '@mui/material/Typography';
import { Box, Grid } from '@mui/material';
import { PostCards } from '../components/PostCards';


export const Home = () => {


  const {allPost} = useSelector((state)=>state.blog)
  const {getBlogData,getCategoryData}=useBlogCall()


  useEffect(() => {

    getBlogData('blogs')
    getCategoryData('categories')

  }, [])
  

  return (
  
    <>
    
      <Grid container justifyContent={"center"} spacing={2} mt={10} mb={10}>
      {
        allPost.map((item,index)=>(
          
          <Grid item key={index}>
          <PostCards item={item}/>
          </Grid>
          

        ))
      }
      </Grid>
    
    </>
      

  )
}
