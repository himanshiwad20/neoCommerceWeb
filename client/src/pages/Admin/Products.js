import React, {useState, useEffect} from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

const Products = () => {
    const [product, setProduct] = useState([])

    const getAllProducts = async () => {
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/getProducts`)
            if(data?.success) {
                setProduct(data.products)
            } else {
                toast.error(data?.error)
            }
            
        } catch (error) {
            console.log(error) 
            toast.error('Error in getting all products list')
        }
    }

    useEffect(() => {
        getAllProducts()
    }, [])

  return (
    <Layout title={'neoCommerce - Products'}> 
      <div className='container-fluid m-3 p-3'>
        <div className='row'>
          <div className='col-md-3'>
              <AdminMenu/>
          </div>
          <div className='col-md-9'>
              <h1 className='text-center'>All Products List</h1>
              <div className='d-flex flex-wrap'>
              {product?.map(p => (
                <Link key={p._id} to={`${p.slug}`} className='product-link'>
                <div className="card m-2" style={{width: '18rem'}} key={p._id}>
                  <img src={`${process.env.REACT_APP_API}/api/v1/product/getPhoto/${p._id}`} className="card-img-top w-5 h-5 object-fit" alt={p.name} />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description.substring(0, 30)}...</p>
                  </div>
                </div>
                </Link>
              ))}
              </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Products
