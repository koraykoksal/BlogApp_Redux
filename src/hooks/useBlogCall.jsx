import React from 'react'
import {toastSuccessNotify,toastErrorNotify} from '../helper/ToastNotify'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFail, fetchStart, fetchSuccessPost,fetchSuccessCategory, fetchSuccessComments, fetchViewSuccessPost, fetchSuccessUserBlog } from '../features/blogSlice'
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

            //yapılan yorum bilgisini sayfa render olmadan görüntülemek için istek atılır
            getcommnetsData(url,id)
            getBlogData('blogs')
            getViewedBlogData('blogs',id) 

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

            //like işlemi yapıldıktan sonra like count değerini görmek için tekrar get isteği atılır
            getBlogData('blogs') 
            //detail sayfasında like isteği atılırsa ilgili postun datasını render etmek için kullanılır
            getViewedBlogData('blogs',id) 
            
            toastSuccessNotify('Liked ❤️')

        } catch (error) {
            distpatch(fetchFail())
            toastErrorNotify('Something Went Wrong !')
        }
        
    }


    const getViewedBlogData=async (url,id)=>{
        

        distpatch(fetchStart())

        try {

            const {data} = await axios(`${import.meta.env.VITE_BASE_URL}/api/${url}/${id}/`,
            {
                headers: { Authorization: `Token ${token}` },
            })

            distpatch(fetchViewSuccessPost(data))
            
        } catch (error) {
            distpatch(fetchFail())
            toastErrorNotify('Something Went Wrong !')
        }
    }
  

    const getUserPostData=async (id)=>{

        distpatch(fetchStart())

        try {
            
            const {data} = await axios(`${import.meta.env.VITE_BASE_URL}/api/blogs/?author=${id}`,
            {
                headers: { Authorization: `Token ${token}` },
            })

            // getBlogData('blogs')
            distpatch(fetchSuccessUserBlog(data))
            
        } catch (error) {
            distpatch(fetchFail())
            toastErrorNotify('Something Went Wrong !')
        }
    }


    const deletePostData=async(url,id)=>{
        distpatch(fetchStart())

        try {

            await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/${url}/${id}/`,
            {
                headers: { Authorization: `Token ${token}` },
            })

            getBlogData('blogs')
            toastSuccessNotify('The Post Deleted ✅')
            
        } catch (error) {
            distpatch(fetchFail())
            toastErrorNotify('Something Went Wrong !')
        }
    }


    const updatePostData=async (url,id,info)=>{

        distpatch(fetchStart())

        try {

            await axios.put(`${import.meta.env.VITE_BASE_URL}/api/${url}/${id}/`,info,
            {
                headers:{Authorization:`Token ${token}`}
            })

            
            getBlogData('blogs')
            navi('/')
            
            
        } catch (error) {
            distpatch(fetchFail())
            toastErrorNotify('Something Went Wrong !')
        }
    }


    const postContactData=async(info)=>{

        console.log("buradaasın")

        try {

        const {data} = await axios.post(`${import.meta.env.VITE_CONTACT_URL}`,info)

        if(data.ok){
            toastSuccessNotify('Your Message Send. Thanks ❤️')
        }

        } catch (error) {
            console.log(error)
            toastErrorNotify('Can not be send data !')
        }
    }



    return {
        getBlogData,
        newPostData,
        getCategoryData,
        commentPostData,
        getcommnetsData,
        likePostData,
        getViewedBlogData,
        getUserPostData,
        deletePostData,
        updatePostData,
        postContactData,
        
    }
}



export default useBlogCall