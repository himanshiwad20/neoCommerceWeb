import {React, useState} from 'react'
import Layout from '../../components/Layout/Layout'
import {toast} from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import '../../styles/AuthStyle.css'

const Register = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [answer, setAnswer] = useState("")
    const navigate = useNavigate("")

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await axios.post(`${(process.env.REACT_APP_API || "")}/api/v1/auth/register`, {name, email, password, phone, address, answer})

            if(res.data.success) {
                // toast.error('Nah')
                toast.success(res.data.message)
                navigate('/login')
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error("Somthing went wrong")
        }
    }

  return (
    <Layout title="neoCommerce - Sign Up">
      <div className='form-container'>
        <h1>Register Page</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="form-control" 
              id="exampleInputName" 
              placeholder='Enter your Name'
              required/>
            </div>

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

            <div className="mb-3">
              <input type="text" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
              className="form-control" 
              id="exampleInputPhone" 
              placeholder='Enter Your Phone Number' 
              required />
            </div>

            <div className="mb-3">
              <input type="text" 
              value={address} 
              onChange={(e) => setAddress(e.target.value)} 
              className="form-control" 
              id="exampleInputAddress" 
              placeholder='Enter your Address' 
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
            
            <button type="submit" className="btn btn-primary" >Submit</button>
          </form>

      </div>
    </Layout>
  )
}

export default Register
