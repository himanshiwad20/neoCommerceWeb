import React from 'react'
import { NavLink } from 'react-router-dom'
import Layout from './Layout'

const AdminMenu = () => {
  return (
    <>
    <div className='text-center'>
        <div className="list-group">
            <h4>Admin Panel</h4>
          <NavLink to="/dashboard/admin/createCategory" className="list-group-item list-group-item-action">Create Category</NavLink>
          <NavLink to="/dashboard/admin/createProduct" className="list-group-item list-group-item-action">Create Product</NavLink>
          <NavLink to="/dashboard/admin/users" className="list-group-item list-group-item-action">Users</NavLink>
          <NavLink to="/dashboard/admin/products" className="list-group-item list-group-item-action">Products</NavLink>
        </div>
    </div>
    </>
  )
}

export default AdminMenu
