import React, {useState, useEffect} from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import toast from 'react-hot-toast'
import axios from 'axios'
import {Select} from 'antd'
import {useNavigate} from 'react-router-dom'
import {useAuth} from '../../context/auth'

const {Option} = Select

const CreateProduct = () => {
  const navigate = useNavigate()
  const [categories, setCategories] = useState([])
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [quantity, setQuantity] = useState("")
  const [shipping, setShipping] = useState("")
  const [category, setcategory] = useState("")
  const [photo, setPhoto] = useState("")
  const [auth] = useAuth()

  const getAllCategories = async () => {
    try {
      const {data} = await axios.get(`${(process.env.REACT_APP_API || "")}/api/v1/category/getCategory`)
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

  const handleCreate = async(e) => {
    e.preventDefault()
    try {
      const productData = new FormData()
      productData.append("name", name)
      productData.append("description", description)
      productData.append("price", price)
      productData.append("category", category)
      productData.append("quantity", quantity)
      productData.append('shipping', shipping)
      productData.append("photo", photo)

      const {data} = await axios.post(`${(process.env.REACT_APP_API || "")}/api/v1/product/createProduct`, productData)

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

  return (
    <Layout title={"neoCommerce - AdminDashboard - Create Product"}>
        <div className='container-fluid m-3 p-3'>
            <div className='row'>
                <div className='col-md-3'>
                  <AdminMenu/>
                </div>
                <div className='col-md-9'>
                    <h1>Create Product</h1>
                    <div className='m-1 w-75'>
                      <Select placeholder="Select a Category" size='large' showSearch className='form-select mb-3' onChange={(value) => {setcategory(value)}}>
                        {categories.map(c => (
                          <Option key={c._id} value={c._id}>{c.name}</Option>
                        ))}
                      </Select>
                      <div className='mb-3'>
                        <label className='btn btn-outline-secondary col-md-12'>
                          {photo? photo.name : "Upload Image" }
                          <input type='file' name='photo' accept='image/*' onChange={(e) => {setPhoto(e.target.files[0])}} hidden/>
                        </label>
                      </div>
                      <div className='mb-3'>
                        {photo && (
                          <div className='text-center'>
                            <img src={URL.createObjectURL(photo)} alt='product photo' height={'200px'} className='img img-responsive'/>
                          </div>
                        )}
                      </div>
                      <div className='mb-3'>
                        <input type='text' placeholder='Write a name' className='form-control' onChange={(e) => setName(e.target.value)}/>
                      </div>
                      <div className='mb-3'>
                        <textarea type='text' placeholder='Write a description' className='form-control' onChange={(e) => setDescription(e.target.value)}/>
                      </div>
                      <div className='mb-3'>
                        <input type='number' placeholder='Write a price' className='form-control' onChange={(e) => setPrice(e.target.value)}/>
                      </div>
                      <div className='mb-3'>
                        <input type='number' placeholder='Write a quantity' className='form-control' onChange={(e) => setQuantity(e.target.value)}/>
                      </div>
                      <Select placeholder="Select Shipping" size='large' showSearch className='form-select mb-3' onChange={(value) => {setShipping(value)}}>
                        <Option value='1'>Yes</Option>
                        <Option value='0'>No</Option>
                      </Select>
                      <div className='mb-3'>
                        <button className='btn btn-primary' onClick={handleCreate}>Create</button>
                      </div>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default CreateProduct
