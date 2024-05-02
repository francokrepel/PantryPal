import {useState} from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useNavigate } from "react-router-dom";
import { useContext} from 'react'
import { UserContext } from '../../context/userContext'

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
              //ONLY CHANGE IS THIS
                localStorage.setItem('token', data.token);  // Store the token in local storage
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
        <>
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign in to your account
              </h2>
            </div>
    
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form onSubmit={loginUser} className="space-y-6">
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
                    Sign in
                  </button>
                </div>
              </form>
    
              <p className="mt-10 text-center text-sm text-gray-500">
                Not a member?{' '}
                <a href="register" className="font-semibold leading-6 text-[#1A4D2E] hover:text-[#4F6F52]">
                  Register Now
                </a>
              </p>
            </div>
          </div>
        </>
      )
}