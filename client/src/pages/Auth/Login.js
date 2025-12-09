import {React, useState} from 'react'
import Layout from '../../components/Layout/Layout'
import {toast} from 'react-hot-toast'
import {useNavigate, useLocation} from 'react-router-dom'
import axios from 'axios'
import '../../styles/AuthStyle.css'
import { useAuth } from '../../context/auth'

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [auth, setAuth] = useAuth()

    const navigate = useNavigate("")
    const location = useLocation()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`, {email, password})

            if(res && res.data.success) {
                // toast.error('Nah')
                navigate(location.state || '/')
                toast.success(res.data.message)
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token
                })
                localStorage.setItem('auth', JSON.stringify(res.data))
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error("Somthing went wrong")
        }
    }

  return (
    <Layout title="neoCommerce - Login">
        <div className='form-container'>
        <h1>Login Page</h1>
          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <input type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="form-control" 
              id="exampleInputEmail" 
              placeholder='Enter your Email'
              required />
            </div>

            <div className="mb-3">
              <input type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="form-control" 
              id="exampleInputPassword" 
              placeholder='Enter your Password' 
              required />
            </div>
            
            <button type="submit" className="btn btn-primary" >Login</button>

            <div className='mt-3'>
              <button type="submit" className="btn btn-primary" onClick={() => {navigate('/forgotPassword')}}>Forgot Password</button>
            </div>
          </form>

      </div>
    </Layout>
  )
}

export default Login
