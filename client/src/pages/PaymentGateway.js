import React from 'react'
import { useAuth } from '../context/auth'
import Payment from './Payment';
import Login from './Auth/Login';

const PaymentGateway = () => {
    const [auth, setAuth] = useAuth()
  return (
    <div>
    {
        auth?.token ? (
            <Payment/>
        ) : (
            <Login/>
        )
    }
    </div>
  )
}

export default PaymentGateway
