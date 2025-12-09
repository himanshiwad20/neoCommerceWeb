import React, {useState, useEffect} from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import toast from 'react-hot-toast'
import axios from 'axios'
import CategoryForm from '../../components/Form/CategoryForm'
import {Modal} from 'antd'

const CreateCategory = () => {
    const [categories, setCategories] = useState([])
    const [name, setName] = useState("")
    const [visible, setVisible]  = useState(false)
    const [selected, setSelected] = useState(null)
    const [updatedName, setUpdatedName] = useState("")

    const handleSumbit = async (e) => {
        e.preventDefault()
        try {
            const {data} = await axios.post(`${process.env.REACT_APP_API}/api/v1/category/createCategory`, {name})
            if(data?.success) {
                toast.success(`${data.category.name} is created`)
                setName("")
                getAllCategories()
            } else {
                toast.error(data.message)
            } 
        } catch (error) {
            console.log(error)
            toast.error("Somthing went wrong in category form")
        }
    }

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
    }

    useEffect(() => {
        getAllCategories()
    }, [])

    const handleUpdate = async(e) => {
        e.preventDefault()
        try {
            const {data} = await axios.put(`${process.env.REACT_APP_API}/api/v1/category/updateCategory/${selected._id}`, {name: updatedName})
            if(data) {
                toast.success(`${selected.name} is updated`)
            } else {
                toast.error(data.message)
                setSelected(null)
                setUpdatedName("")
                setVisible(false)
                getAllCategories()
            }
        } catch(error) {
            toast.error("Somthing went wrong")
        }
    }

    const handleDelete = async(c) => {
        try {
            const {data} = await axios.delete(`${process.env.REACT_APP_API}/api/v1/category/deleteCategory/${c._id}`)

            if(data.success) {
                toast.success(`${c.name} is deleted`)
                getAllCategories()
            } else {
                toast.error(data.message)
            }
        } catch(error) {
            console.log(error)
            toast.error("Somthing went wrong")
        }
    }

  return (
    <Layout title={"neoCommerce - AdminDashboard - Create Category"}>
        <div className='container-fluid m-3 p-3'>
            <div className='row'>
                <div className='col-md-3'>
                    <AdminMenu/>
                </div>
                <div className='col-md-9'>
                    <h1>Manage Category</h1>
                    <div className='p-3 w-75'>
                        <CategoryForm handleSubmit={handleSumbit} value={name} setValue={setName}/>
                    </div>
                    <div className='w-75'>
                        <table className="table">
                          <thead>
                            <tr>
                              <th scope="col">Name</th>
                              <th scope="col">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {categories.map((c) => (
                                <tr>
                                    <>
                                        <td key={c._id}>{c.name}</td>
                                    </>
                                  <td><button className='btn btn-primary ms-2' onClick={()=> {setVisible(true); setUpdatedName(c.name); setSelected(c)}}>EDIT</button></td>
                                <td><button className='btn btn-danger ms-2' onClick={()=> {handleDelete(c)}}>DELETE</button></td>
                                </tr>
                            ))}
                          </tbody>
                        </table>
                    </div>
                </div>
                <Modal onCancel={()=> setVisible(false)} footer={null} visible={visible}>
                    <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate}/>
                </Modal>
            </div>
        </div>
    </Layout>
  )
}

export default CreateCategory
