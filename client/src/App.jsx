import "./App.css"
import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import axios from 'axios'
import { Toaster } from 'react-hot-toast' // for notifications

import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import Dashboard from "./pages/Dashboard"
import Recipes from "./pages/Recipes"
import Navbar from './components/Navbar'
import PrivateRoutes from "./components/PrivateRoutes"

import { UserContextProvider } from "../context/userContext"


axios.defaults.baseURL = 'http://localhost:8000' // backend URL
axios.defaults.withCredentials = true // make sure we can actually connect to localhost, giving us creds to work w it

// we dont put static elements like Navbar, footer in routes, but we need parent element

function App() {
  return (
    <BrowserRouter>
      <UserContextProvider>
      <Navbar />
        <Toaster position='bottom-right' toastOptions={{duration: 2000}} />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/recipes' element={<Recipes/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route element={<PrivateRoutes />}> // https://medium.com/@chiragmehta900/creating-protected-routes-in-react-js-with-react-router-v6-28f3a3ac53d
            <Route path='/dashboard' element={<Dashboard/>}/>
          </Route>
        </Routes>
      </UserContextProvider>
    </BrowserRouter>
  );
}

export default App