
import React from 'react'
import axios from "axios";
import {toastSuccessNotify,toastErrorNotify} from '../helper/ToastNotify'
import {fetchStart,fetchFail,loginSuccess,logoutSuccess,registerSuccess} from '../features/authSlice'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const useAuthCall = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const login=async (userdata)=>{

        dispatch(fetchStart())

        try {

            const {data} = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/auth/login/`,userdata)

            dispatch(loginSuccess(data))
            toastSuccessNotify('Login Successful.')
            navigate('/')
            
        } catch (error) {
            dispatch(fetchFail())
            toastErrorNotify("'Something Went Wrong !'")
        }
    }


    const logout=async ()=>{
        dispatch(fetchStart())

        try {
            await axios.post(`${import.meta.env.VITE_BASE_URL}/users/auth/logout/`)
            dispatch(logoutSuccess(9))
            toastSuccessNotify('Logout Successful.')
            navigate('/')

        } catch (error) {
            dispatch(fetchFail())
            toastErrorNotify("'Something Went Wrong !'")
        }
    }



    const register= async (userdata)=>{

        dispatch(fetchStart())

        try {
            const {data} = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register/`,userdata)

            dispatch(registerSuccess(data))
            toastSuccessNotify('Register Successful.')
            navigate('/')
            
        } catch (error) {
            dispatch(fetchFail())
            toastErrorNotify('Something Went Wrong !')
        }

    }


    return {login,logout,register}
}


export default useAuthCall;