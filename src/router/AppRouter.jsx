import React from 'react'
import { Route } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import { Router } from 'react-router-dom'
import { NavBars } from '../components/NavBars'
import { Footers } from '../components/Footers'
import { Home } from '../pages/Home'
import { Login } from '../pages/Login'
import { Register } from '../pages/Register'
import { PrivateRouter } from './PrivateRouter'
import { PostDetail } from '../pages/PostDetail'

export const AppRouter = () => {
  return (

    <>
    <NavBars/>
    

        <Routes>
            
            <Route path='login' element={<Login/>}/>
            <Route path='register' element={<Register/>}/>

            <Route element={<PrivateRouter/>}>
            <Route path='/' element={<Home/>}/>
            <Route path='/detail/:id' element={<PostDetail/>}/>
            </Route>
        </Routes>

    <Footers/>
    </>
  )
}
