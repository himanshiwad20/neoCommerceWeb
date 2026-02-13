import React, {useState, useEffect} from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import {Checkbox, Radio} from 'antd'
import {Prices} from '../components/Prices'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/cart'
import "../styles/HomePage.css";


const HomePage = () => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [checked, setChecked] = useState([])
  const [radio, setRadio] = useState(null)
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(1)
  const [cart, setCart] = useCart()
  const navigate = useNavigate()

  const getAllCategories = async () => {
    try {
      const {data} = await axios.get(`${(process.env.REACT_APP_API || "")}/api/v1/category/getCategory`)
      if(data?.success) {
        setCategories(data?.category)
      }
    } catch (error) {
      console.log(error)
    }
  };
  
  useEffect(() => {
      getAllCategories()
      getTotal()
  }, []);

  const getAllProducts = async () => {
    try {
      setLoading(true)
      const {data} = await axios.get(`${(process.env.REACT_APP_API || "")}/api/v1/product/perPageProducts/${page}`)
      setLoading(false)
      setProducts(data.products)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  const getTotal = async () => {
    try {
      const {data} = await axios.get(`${(process.env.REACT_APP_API || "")}/api/v1/product/countProducts`)
      setTotal(data?.count)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if(checked.length==0 && !radio) {
      getAllProducts()
    }
  }, [checked, radio])

  const handleFilter = (value, id) => {
    let all = [...checked]
    if(value) {
      all.push(id)
    } else {
      all = all.filter((c) => c!==id)
    }
    setChecked(all)
  }

  useEffect(() => {
    if(checked.length>0 || radio) {
      getFilteredProducts()
    }
  }, [checked.length, radio])


  const getFilteredProducts = async () => {
    try {
      const {data} = await axios.post(`${(process.env.REACT_APP_API || "")}/api/v1/product/filterProducts`, {checked, radio})
      setProducts(data.products)
    } catch(error) {
      console.log(error)
      toast.error('somthing went wrong in getting filtered products')
    }
  }

  useEffect(()=> {
    if(page === 1) return;
    loadMoreProducts()
  }, [page])

  const loadMoreProducts = async () => {
    try {
      setLoading(true)
      const {data} = await axios.get(`${(process.env.REACT_APP_API || "")}/api/v1/product/perPageProducts/${page}`)
      setLoading(false)
      setProducts([...products, ...data?.products]) 
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  return (
    <Layout title={'neoCommerce - Home - All Products'}>
      <img
      src="/images/neoCommerce.png"
      className="banner-img"
      alt="bannerimmage"
      width={"100%"} />
      <div className='container-fluid row mt-3 home-page'>
        <div className='col-md-3 filters'>
          <h4 className='text-center'>Filter By Category</h4>
          <div className='d-flex flex-column'>
            {categories.map((c) => (
              <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>
                {c.name}
              </Checkbox>
            ))}
          </div>

          <h4 className='text-center mt-4'>Filter By Price</h4>
          <div className='d-flex flex-column'>
            <Radio.Group value={radio} onChange={(e) => setRadio(e.target.value)} >
              {Prices.map((p) => (
                <div key={p._id}>
                  <Radio value={p.range} className='ant-radio-wrapper'>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className='d-flex flex-column'>
              <button className="btn btn-danger mt-4" onClick={() => window.location.reload()}>RESET FILTERS</button>
          </div>
        </div>
        <div className='col-md-9'> 
          <h1 className='text-center'>All Products</h1>
          <div className='d-flex flex-wrap'>
            {products?.map(p => (
                <div className="card m-2" style={{width: '18rem'}} key={p._id}>
                  <img src={`${(process.env.REACT_APP_API || "")}/api/v1/product/getPhoto/${p._id}`} className="card-img-top w-5 h-5 object-fit" alt={p.name} />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <h5 className="card-title card-price">
                      {
                        p.price.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })
                      }
                    </h5>
                    <p className="card-text">{p.description.substring(0, 60)}{(p.description.length>30)?"...":" "}</p>
                    <div className="card-name-price">
                    <button className="btn btn-primary ms-1" onClick={(e) => navigate(`/product/${p.slug}`)}>More Details</button>
                    <button className="btn btn-secondary ms-1"
                    onClick={() => {
                      setCart([...cart, p])
                      localStorage.setItem('cart', JSON.stringify([...cart, p]))
                      toast.success("Product added to cart")
                    }}>Add to Cart</button>
                  </div>
                </div>
                </div>
              ))}
          </div>
          <div className='m-2 p-3'>
            {products && products.length<total && (
              <button className='btn btn-warning' onClick={(e) => {
                e.preventDefault()
                setPage(page+1)
              }}>
                {loading ? 
                  ("Loding...") 
                  : 
                  (
                    <>
                    {" "}
                    LoadMode...
                    </>
                  )
                }
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default HomePage
