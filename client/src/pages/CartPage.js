import React from 'react'
import Layout from '../components/Layout/Layout'
import { useCart } from '../context/cart'
import { useAuth } from '../context/auth'
import { useNavigate } from 'react-router-dom'
import "../styles/CartStyle.css";

const CartPage = () => {
    const [cart, setCart] = useCart()
    const [auth, setAuth] = useAuth()
    const navigate = useNavigate()

    const totalPrice = () => {
      try {
        let total=0

        cart?.map((item) => total+=item.price)
        return total.toLocaleString('en-US', {
          style: "currency",
          currency: "USD",
        })
      } catch (error) {
        console.log(error)
      }
    }

    const removeCartItem = (pid) => {
      try {
        let cartItems = [...cart]
        let index = cartItems.findIndex(item => item._id === pid)
        cartItems.splice(index, 1)
        setCart(cartItems)
        localStorage.setItem('cart', JSON.stringify(cartItems))
      } catch (error) {
        console.log(error)
      }
    }

  return (
    <Layout title={'neoCommerce - Cart'}>
      <div className='cart-page'>
        <div className='row'>
            <div className='col-md-12'>
                <h1 className='text-center bg-light p-2 mb-1'>
                    {!auth?.user
                ? "Hello Guest"
                : `Hello  ${auth?.token && auth?.user?.name}`}
              <p className="text-center">
                {cart?.length
                  ? `You Have ${cart.length} items in your cart ${
                      auth?.token ? "" : "please login to checkout !"
                    }`
                  : " Your Cart Is Empty"}
              </p>
            </h1>
          </div>
        </div>
        <div className="container">
        <div className='row'>
          <div className='col-md-7 p-0 m-0'>
            {
              cart?.map(p => (
                <div className='row card flex-row' key={p._id}>
                  <div className='col-md-4'>
                    <img src={`${process.env.REACT_APP_API}/api/v1/product/getPhoto/${p._id}`} className="card-img-top w-5 h-5 object-fit" alt={p.name} width="100%"
                      height={"130px"} />
                  </div>
                  <div className='col-md-4'>
                    <h4>{p.name}</h4>
                    <p>{p.description.substring(0, 30)}</p>
                    <h5>Price: {p.price}</h5>
                  </div>
                  <div className='col-md-4 cart-remove-btn'>
                    <button className='btn btn-danger' onClick={() => removeCartItem(p._id)}>REMOVE</button>
                  </div>
                </div>
              ))
            }
          </div>
          <div className='col-md-5 cart-summary '>
            <h2>Cart Summary</h2>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h4>Total: {totalPrice()}</h4>
            {auth?.user?.address ? (
              <>
              <div className='mb-3'>
                <h4>Current Address</h4>
                <h5>{auth?.user?.address}</h5>
                <button className='btn btn-outline-warning'
                onClick={() => navigate('/dashboard/user/profile')}
                >Update Address</button>
              </div>
              </>
            ) : (
              <div className='mb-3'>
                {auth?.token ? (
                  <button className='btn btn-outline-warning' onClick={() => navigate('/dashboard/user/profile')}>Update Address</button>
                ) : (
                  <button className='btn btn-outline-warning' onClick={() => navigate('/login', {state: '/cart'})}>Please login to checkout</button>
                )}
              </div>
            )}
            <div className='mt-2'>
              <button className='btn btn-primary' onClick={() => navigate('/payment', {state: '/cart'})}>Make Payment</button>
            </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CartPage
