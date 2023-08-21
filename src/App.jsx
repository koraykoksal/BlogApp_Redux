import { useState } from 'react'
import './App.css'
import { AppRouter } from './router/AppRouter'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { ToastContainer } from 'react-toastify'
import { Provider } from 'react-redux'
import store, { persistor } from './app/store'
import { PersistGate } from 'redux-persist/integration/react'


function App() {

  return (
    <>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <AppRouter/>
    </PersistGate>
    <ToastContainer/>
    </Provider>

    </>
  )
}

export default App
