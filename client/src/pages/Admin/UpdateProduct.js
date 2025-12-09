import React, {useState, useEffect} from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import toast from 'react-hot-toast'
import axios from 'axios'
import {Select} from 'antd'
import {useNavigate, useParams} from 'react-router-dom'
import {useAuth} from '../../context/auth'

const {Option} = Select

const UpdateProduct = () => {
  const navigate = useNavigate()
  const params = useParams()
  const [categories, setCategories] = useState([])
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [quantity, setQuantity] = useState("")
  const [shipping, setShipping] = useState("")
  const [category, setCategory] = useState("")
  const [photo, setPhoto] = useState("")
  const [id, setId] = useState("")
  const [auth] = useAuth()

  const getSingleProduct = async () => {
    try {
        const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/getSingleProduct/${params.slug}`)
        setName(data.product.name)
        setId(data.product._id)
        setPrice(data.product.price)
        setDescription(data.product.description)
        setQuantity(data.product.quantity)
        setCategory(data.product.category._id)
        setShipping(data.product.shipping)
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(() => {
    getSingleProduct()
  }, [])

  const getAllCategories = async () => {
    try {
      const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/getCategory`)
      if(data?.success) {
        setCategories(data?.category)
      }
    } catch (error) {
      console.log(error)
      toast.error("Error in getting all categories")
    }
  };
  
  useEffect(() => {
      getAllCategories()
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      const productData = new FormData()
      productData.append("name", name)
      productData.append("description", description)
      productData.append("price", price)
      productData.append("category", category)
      productData.append("quantity", quantity)
      photo && productData.append("photo", photo)

      const {data} = await axios.put(`${process.env.REACT_APP_API}/api/v1/product/updateProduct/${id}`, productData)

      if(data?.success) {
        toast.success(data?.message)
        navigate(`/dashboard/admin/products`)
      } else {
        toast.error(data?.message)
      }
      
    } catch (error) {
      console.log(error)
      toast.error("Somthing went wrong - hehe")
    }
  };

  const handleDelete = async () => {
    try {
      let ans = window.prompt("Are you sure you want to delete this product?")
      if(!ans) return
      const {data} = await axios.delete(`${process.env.REACT_APP_API}/api/v1/product/deleteProduct/${id}`)
      toast.success("Product deleted Sucessfully")
      navigate(`/dashboard/admin/products`)
    } catch (error) {
      console.log(error)
      toast.error("Somthing went wrong")
    }
  }

  return (
    <Layout title={"neoCommerce - AdminDashboard - Create Product"}>
        <div className='container-fluid m-3 p-3'>
            <div className='row'>
                <div className='col-md-3'>
                  <AdminMenu/>
                </div>
                <div className='col-md-9'>
                    <h1>Update Product</h1>
                    <div className='m-1 w-75'>
                      <Select placeholder="Select a Category" size='large' showSearch className='form-select mb-3' onChange={(value) => {setCategory(value)}} value={category}>
                        {categories.map(c => (
                          <Option key={c._id} value={c._id}>{c.name}</Option>
                        ))}
                      </Select>
                      <div className='mb-3'>
                        <label className='btn btn-outline-secondary col-md-12'>
                          {photo? photo.name : "Update Image" }
                          <input type='file' name='photo' accept='image/*' onChange={(e) => {setPhoto(e.target.files[0])}} hidden/>
                        </label>
                      </div>
                      <div className='mb-3'>
                        {photo ? (
                          <div className='text-center'>
                            <img src={URL.createObjectURL(photo)} alt='product photo' height={'200px'} className='img img-responsive'/>
                          </div>
                        ) : (
                          <div className='text-center'>
                          {id && (<img src={`${process.env.REACT_APP_API}/api/v1/product/getPhoto/${id}`} alt='product photo' height={'200px'} className='img img-responsive'/>)}
                          </div>
                        )}
                      </div>
                      <div className='mb-3'>
                        <input type='text' placeholder='Write a name' className='form-control' onChange={(e) => setName(e.target.value)} value={name}/>
                      </div>
                      <div className='mb-3'>
                        <textarea type='text' placeholder='Write a description' className='form-control' onChange={(e) => setDescription(e.target.value)} value={description}/>
                      </div>
                      <div className='mb-3'>
                        <input type='number' placeholder='Write a price' className='form-control' onChange={(e) => setPrice(e.target.value)} value={price}/>
                      </div>
                      <div className='mb-3'>
                        <input type='number' placeholder='Write a quantity' className='form-control' onChange={(e) => setQuantity(e.target.value)} value={quantity}/>
                      </div>
                      <Select placeholder="Select Shipping" size='large' showSearch className='form-select mb-3' onChange={(value) => {setShipping(value)}} value={shipping? "Yes":"No"}>
                        <Option value='1'>Yes</Option>
                        <Option value='0'>No</Option>
                      </Select>
                      <div className='mb-3'>
                        <button className='btn btn-primary' onClick={handleUpdate}>Update</button>
                      </div>
                      <div className='mb-3'>
                        <button className='btn btn-danger' onClick={handleDelete}>Delete</button>
                      </div>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default UpdateProduct
