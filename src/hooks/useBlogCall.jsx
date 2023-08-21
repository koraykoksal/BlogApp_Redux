import React from 'react'
import {toastSuccessNotify,toastErrorNotify} from '../helper/ToastNotify'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFail, fetchStart, fetchSuccessPost } from '../features/blogSlice'
import axios from 'axios'


const useBlogCall = () => {
  
    const distpatch=useDispatch()
    const {token} = useSelector((state)=>state.auth)
  
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

            distpatch(fetchSuccessPost(data))
            
        } catch (error) {
            distpatch(fetchFail())
            toastErrorNotify('Something Went Wrong !')
        }
    }

    const newPostData=async (url,info)=>{
        
        distpatch(fetchStart())

        try {
            const {res} = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/${url}/`,info)

            console.log("res : ",res)

        } catch (error) {
            distpatch(fetchFail())
            toastErrorNotify("Something Went Wrong !")
        }
    }
  
  
    return {getBlogData,newPostData,getCategoryData}
}



export default useBlogCall