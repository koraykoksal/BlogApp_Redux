import { useState } from 'react'
import './App.css'
import { AppRouter } from './router/AppRouter'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { ToastContainer } from 'react-toastify'
import { Provider } from 'react-redux'
import store from './app/store'

function App() {

  return (
    <>
    <Provider store={store}>
    <AppRouter/>
    <ToastContainer/>
    </Provider>

    </>
  )
}

export default App
