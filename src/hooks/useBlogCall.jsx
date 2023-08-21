import React from 'react'
import {toastSuccessNotify,toastErrorNotify} from '../helper/ToastNotify'
import { useDispatch } from 'react-redux'
import { fetchFail, fetchStart, fetchSuccessPost } from '../features/blogSlice'
import axios from 'axios'


const useBlogCall = () => {
  
    const distpatch=useDispatch()
  
    const getPostData=async (url)=>{

        distpatch(fetchStart())

        try {
            
            const {data} = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/${url}/`)

            distpatch(fetchSuccessPost(data))


        } catch (error) {
            console.log(error)
            distpatch(fetchFail())
        }


    }
  
  
    return {getPostData}
}



export default useBlogCall