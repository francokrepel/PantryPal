import "./App.css"
import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import axios from 'axios'
import { Toaster } from 'react-hot-toast' // for notifications

import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import Navbar from './components/Navbar'

import { UserContextProvider } from "../context/userContext"

axios.defaults.baseURL = 'http://localhost:8000' // backend URL
axios.defaults.withCredentials = true // make sure we can actually connect to localhost, giving us creds to work w it

// we dont put static elements like Navbar, footer in routes, but we need parent element
function App() {

  return (
        <BrowserRouter>
         <UserContextProvider>
      <Navbar />
      <Toaster  position='bottom-right' toastOptions={{duration: 2000}} />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
      </UserContextProvider>
      </BrowserRouter>
  )
}

export default App