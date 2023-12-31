import React from 'react'
import { Route } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import NavBars from '../components/NavBars'
import { Footers } from '../components/Footers'
import { Home } from '../pages/Home'
import { Login } from '../pages/Login'
import { Register } from '../pages/Register'
import { PrivateRouter } from './PrivateRouter'
import { PostDetail } from '../pages/PostDetail'
import { NotFound } from '../pages/NotFound'
import { BrowserRouter } from 'react-router-dom'
import { About } from '../pages/About'
import { Profile } from '../pages/Profile'
import { Draft } from '../pages/Draft'
import { Contact } from '../pages/Contact'
import { MyPost } from '../pages/MyPost'

export const AppRouter = () => {
  return (

    <>
    <BrowserRouter>
    <NavBars/>
        <Routes>
            <Route index element={<Home/>}/>
            <Route path='login' element={<Login/>}/>
            <Route path='register' element={<Register/>}/>
            <Route path='about' element={<About/>}/>
            <Route path='contact' element={<Contact/>}/>
            <Route path='mypost' element={<MyPost/>}/>
            <Route element={<PrivateRouter/>}>
            <Route path='profile' element={<Profile/>}/>
            <Route path='draft' element={<Draft/>}/>
            <Route path='/:id' element={<PostDetail/>}/>
            </Route>
            <Route path='*' element={<NotFound/>}/>
        </Routes>
        </BrowserRouter>
        <Footers/>
    </>
  )
}
