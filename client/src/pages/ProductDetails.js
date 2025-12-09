import Layout from '../components/Layout/Layout'
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import "../styles/ProductDetailStyle.css";

const ProductDetails = () => {
    const params = useParams()
    const [product, setProduct] = useState({})
    const [similarProducts, setSimilarProducts] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        if(params?.slug) {
            getProduct()
        }
    }, [params?.slug])

    const getProduct = async () => {
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/getSingleProduct/${params.slug}`)
            setProduct(data?.product)
            getSimilarProducts(data?.product._id, data?.product.category._id)
        } catch (error) {
            console.log(error)
        }
    }

    const getSimilarProducts = async (pid, cid) => {
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/similarProducts/${pid}/${cid}`)
            setSimilarProducts(data?.products)
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <Layout>
      <div className='row container product-details'>
        <div className='col-md-6'>
            <img src={`${process.env.REACT_APP_API}/api/v1/product/getPhoto/${product._id}`} className="card-img-top" alt={product.name} height={350} weight={'350px'} />
        </div>
        <div className='col-md-6 product-details-info'>
            <h1 className='text-center'>Product Details</h1>
            <hr />
            <h6>Name: {product.name}</h6>
            <h6>Description: {product.description}</h6>
            <h6>Price: 
              {product?.price?.toLocaleString("en-US", {
                style: 'currency',
                currency: "USD"
              })}
            </h6>
            <h6>Category: {product.category?.name}</h6>
            <button className="btn btn-secondary m-1">Add to Cart</button>
        </div>
      </div>
      <hr/>
      <div className='row container similar-products'>
        <h4>Similar Products</h4>
        {similarProducts?.length<1 && <p className='text-center'>No similar products found</p>}
        <div className='d-flex flex-wrap'>
            {similarProducts?.map(p => (
                <div className="card m-2" key={p._id}>
                  <img src={`${process.env.REACT_APP_API}/api/v1/product/getPhoto/${p._id}`} className="card-img-top w-5 h-5 object-fit" alt={p.name} />
                  <div className="card-body">
                    <div className="card-name-price">
                      <h5 className="card-title">{p.name}</h5>
                      <h5 className="card-title card-price">
                        {p.price.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </h5>
                    </div>
                    <p className="card-text">{p.description.substring(0, 30)}{(p.description.length>30)?"...":" "}</p>
                    <div className="card-name-price">
                      <button className="btn btn-primary ms-1" onClick={(e) => navigate(`/product/${p.slug}`)}>More Details</button>
                    {/* <button className="btn btn-secondary ms-1">Add to Cart</button> */}
                  </div>
                  </div>
                </div>
              ))}
          </div>
      </div>
    </Layout>
  )
}

export default ProductDetails

// w-5 h-5 object-fit   div-> div-> img
//<div className="card m-2" style={{width: '18rem'}} key={p._id}>
//<img src={`${process.env.REACT_APP_API}/api/v1/product/getPhoto/${p._id}`} className="card-img-top w-5 h-5 object-fit" alt={p.name} />