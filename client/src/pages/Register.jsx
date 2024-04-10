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
        <div>
            <form onSubmit={registerUser}> {/* sets it as function */}
                <label>Name</label>
                <input type='text' placeholder='enter name...' value={data.name} onChange={(e) => setData({...data, name: e.target.value})}/> 
                <label>Email</label>
                <input type='email' placeholder='enter email...' value={data.email} onChange={(e) => setData({...data, email: e.target.value})}/>
                <label>Password</label>
                <input type='password' placeholder='enter password...' value={data.password} onChange={(e) => setData({...data, password: e.target.value})}/>
                <button type='submit'>Sign Up</button>
            </form>
        </div>
    )
}
