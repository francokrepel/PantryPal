import {useState} from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useNavigate } from "react-router-dom";
import { useContext} from 'react'
import { UserContext } from '../../context/userContext'
import './logreg.css';

export default function Login() {

    const [data, setData] = useState({
        email: '', password: '',
    }) 

    const { setUser } = useContext(UserContext);

    const navigate = useNavigate()

    const loginUser = async (e) => {
        e.preventDefault()
        const {email, password} = data
        try {
            const {data} = await axios.post('/login', {
                email, password
            })
            if (data.error) {
                toast.error(data.error)
            } else {
                setData({})
                toast.success('Login Succesful')
                setUser(data) // here we are changing the value of user, which will trigger useEffect to update user befor nav
                navigate('/dashboard')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
    <div class="wrapper">
        <form onSubmit={loginUser}>
            <h1>Login</h1>
            <div className="input-box">
                <input type='email' placeholder='Email' required value={data.email} onChange={(e) => setData({...data, email: e.target.value})}/>
            </div>
            <div className="input-box">
                <input type='password' placeholder='Password' required value={data.password} onChange={(e) => setData({...data, password: e.target.value})}/>
            </div>

            <button type='submit'>Login</button>

            <div class="register-link">
                <p>Don't have an account? <a href="register">Register</a></p>
            </div>
        </form>
    </div>
    )
}