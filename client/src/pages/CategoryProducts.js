import React, {useState, useEffect} from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import "../styles/AllCategory.css";

const CategoryProducts = () => {
    const [products, setProducts] = useState([])
    const [category, setCategory] = useState([])
    const params = useParams()
    const navigate = useNavigate()

    const getCatWiseProducts = async () => {
        try {
            const {data} = await axios.get(`${(process.env.REACT_APP_API || "")}/api/v1/product/categoryWiseProducts/${params.slug}`)
            setProducts(data?.products)
            setCategory(data?.category)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
      if(params.slug) getCatWiseProducts()
    }, [params.slug])

  return (
    <Layout title={'neocommerce - Category Products'}>
      <div className='container mt-3 category'>
        <h4 className='text-center'>Category - {category?.name}</h4>
        <h6 className='text-center'>{products?.length} results found</h6>
        <div className='row'>
          <div className="col-md-9 offset-1">
          <div className='d-flex flex-wrap'>
            {products?.map(p => (
                <div className="card m-2" key={p._id}>
                  <img src={`${(process.env.REACT_APP_API || "")}/api/v1/product/getPhoto/${p._id}`} className="card-img-top w-5 h-5 object-fit" alt={p.name} />
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
                    </div>
                  </div>
                </div>
              ))}
          </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CategoryProducts

//                <div className="card m-2" style={{width: '18rem'}} key={p._id}>

