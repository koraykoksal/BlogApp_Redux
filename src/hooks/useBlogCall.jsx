import React from 'react'
import {toastSuccessNotify,toastErrorNotify} from '../helper/ToastNotify'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFail, fetchStart, fetchSuccessPost,fetchSuccessCategory, fetchSuccessComments } from '../features/blogSlice'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const useBlogCall = () => {
  
    const distpatch=useDispatch()
    const {token} = useSelector((state)=>state.auth)
    const navi=useNavigate()

    const getBlogData=async (url)=>{

        distpatch(fetchStart())

        try {
            
            const {data} = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/${url}/`)

            distpatch(fetchSuccessPost(data))


        } catch (error) {
            distpatch(fetchFail())
            toastErrorNotify("Something Went Wrong !")
        }


    }

    const getCategoryData=async(url)=>{

        distpatch(fetchStart())

        try {

            const {data} = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/${url}/`)

            distpatch(fetchSuccessCategory(data))
            
        } catch (error) {
            distpatch(fetchFail())
            toastErrorNotify('Something Went Wrong !')
        }
    }

    const newPostData=async (url,info)=>{
        
        distpatch(fetchStart())

        try {
            await axios.post(`${import.meta.env.VITE_BASE_URL}/api/${url}/`,info,
            {
                headers: { Authorization: `Token ${token}` },
            })

            // distpatch(fetchSuccessPost(res))
            toastSuccessNotify('Published')
            getBlogData(url)
            navi('/')

        } catch (error) {
            distpatch(fetchFail())
            toastErrorNotify("Something Went Wrong !")
        }
    }
  
    const commentPostData=async(url,id,info)=>{


        distpatch(fetchStart())

        try {
            
            await axios.post(`${import.meta.env.VITE_BASE_URL}/api/${url}/${id}/`,info,
            {
                headers: { Authorization: `Token ${token}` },
            })

            getcommnetsData(url,id)
            toastSuccessNotify('Your Comment Published')
            

        } catch (error) {
            distpatch(fetchFail())
            toastErrorNotify('Something Went Wrong !')
        }
    }


    const getcommnetsData=async (url,id)=>{
        distpatch(fetchStart())

        try {

            const {data}= await axios.get(`${import.meta.env.VITE_BASE_URL}/api/${url}/${id}/`)

            distpatch(fetchSuccessComments(data))
            
        } catch (error) {
            distpatch(fetchFail())
            toastErrorNotify('Comments not loaded !')
        }
    }


    const likePostData=async(url,id,info)=>{

        distpatch(fetchStart())

        try {
            
            await axios.post(`${import.meta.env.VITE_BASE_URL}/api/${url}/${id}/`,info,
            {
                headers: { Authorization: `Token ${token}` },
            })

            getLikesData(url,id)
            toastSuccessNotify('Liked ❤️')

        } catch (error) {
            distpatch(fetchFail())
            toastErrorNotify('Something Went Wrong !')
        }
        
    }


    const getLikesData=async(url,id)=>{
        distpatch(fetchStart())

        try {

            const {data} = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/${url}/${id}/`)

            console.log(data)
            
        } catch (error) {
            distpatch(fetchFail())
            toastErrorNotify('Something Went Wrong !')
        }
    }

    const getViewBlogData=async (url,id,info)=>{
        
        console.log(info)

        distpatch(fetchStart())

        try {

            await axios(`${import.meta.env.VITE_BASE_URL}/api/${url}/${id}/`,
            {
                headers: { Authorization: `Token ${token}` },
            })
            
        } catch (error) {
            distpatch(fetchFail())
            toastErrorNotify('Something Went Wrong !')
        }
    }
  
    return {
        getBlogData,
        newPostData,
        getCategoryData,
        commentPostData,
        getcommnetsData,
        likePostData,getViewBlogData}
}



export default useBlogCall