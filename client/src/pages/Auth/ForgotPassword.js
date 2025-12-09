import {React, useState} from 'react'
import Layout from '../../components/Layout/Layout'
import {toast} from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import '../../styles/AuthStyle.css'


const ForgotPassword = () => {
    const [email, setEmail] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [answer, setAnswer] = useState("")

    const navigate = useNavigate("")

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forgotPassword`, {email, answer, newPassword})

            if(res && res.data.success) {
                // toast.error('Nah')
                navigate('/login')
                toast.success(res.data.message)
                
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error("Somthing went wrong")
        }
    }
  return (
    <Layout>
        <div className='form-container'>
        <h1>Reset Password </h1>
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
              <input type="text" 
              value={answer} 
              onChange={(e) => setAnswer(e.target.value)} 
              className="form-control" 
              id="exampleInputAnswer" 
              placeholder="What is your best friend's pet name"
              required />
            </div>

            <div className="mb-3">
              <input type="password" 
              value={newPassword} 
              onChange={(e) => setNewPassword(e.target.value)} 
              className="form-control" 
              id="exampleInputPassword" 
              placeholder='Enter your New Password' 
              required />
            </div>
            
            <button type="submit" className="btn btn-primary" >Reset</button>
          </form>

      </div>
    </Layout>
  )
}

export default ForgotPassword
