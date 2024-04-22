import  { useState } from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useNavigate } from "react-router-dom";

export default function Register() {

    /* state is a plain JavaScript object that stores data that is specific to a component. 
    It can be used to keep track of information such as the current input value of a form field 
    useState is a hook that allows you to have state variables in functional components
    setData is a function that allows you to update the state. React's state updates are immutable operations. 
    This means that you don't directly change the state but instead use a function like setData to provide a new value for the state. 
    */
    const [data, setData] = useState({  
        name: '', email: '', password: '',
    })
    // Hooks in React, indicated use prefix, meant to be used inside React components or other hooks to tap into React features
    const navigate = useNavigate()

    const registerUser = async (e) => { // takes in an event property 
        e.preventDefault() // stops page from automatically loading
        const {name, email, password} = data // destructing data
        try {
            const {data} = await axios.post('/register', {
                name, email, password // this is the info that is sent to the backend, thru axios caling the backend API
            })
            if (data.error) { // we want to showcase the error catching done in the backend api registerUser
                toast.error(data.error)
            } else {
                setData({})
                toast.success('Registered Succesfully')
                navigate('/login')
            }
        } catch (error) { 
            console.log(error)
        }
    }
    return (
        <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Register a new account
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={registerUser} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                    Name
                    </label>
                    <div className="mt-2">
                    <input
                        type="text"
                        placeholder='type in your name...'
                        autoComplete="name"
                        required value={data.name}
                        onChange={(e) => setData({...data, name: e.target.value})}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    </div>
                </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    type="email"
                    placeholder='type in your email...'
                    autoComplete="email"
                    required value={data.email}
                    onChange={(e) => setData({...data, email: e.target.value})}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    type="password"
                    placeholder="type in your password..."
                    autoComplete="current-password"
                    required value={data.password}
                    onChange={(e) => setData({...data, password: e.target.value})}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-[#1A4D2E] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#4F6F52] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Sign Up
                </button>
              </div>
            </form>
  
            <p className="mt-10 text-center text-sm text-gray-500">
              Already a member?{' '}
              <a href="login" className="font-semibold leading-6 text-[#1A4D2E] hover:text-[#4F6F52]">
                Login
              </a>
            </p>
          </div>
        </div>
      </>
    )
}


// <div>
// <form onSubmit={registerUser}> {/* sets it as function */}
//     <label>Name</label>
//     <input type='text' placeholder='enter name...' value={data.name} onChange={(e) => setData({...data, name: e.target.value})}/> 
//     <label>Email</label>
//     <input type='email' placeholder='enter email...' value={data.email} onChange={(e) => setData({...data, email: e.target.value})}/>
//     <label>Password</label>
//     <input type='password' placeholder='enter password...' value={data.password} onChange={(e) => setData({...data, password: e.target.value})}/>
//     <button type='submit'>Sign Up</button>
// </form>
// </div>