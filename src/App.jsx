import { useState } from 'react'
import './App.css'
import { AppRouter } from './router/AppRouter'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { ToastContainer } from 'react-toastify'


function App() {

  return (
    <>
    <AppRouter/>
    <ToastContainer/>
    </>
  )
}

export default App
