import Layout from '../components/Layout/Layout'
import React from 'react'
import { useSearch } from '../context/search'

const Search = () => {
    const [values, setValues] = useSearch()
  return (
    <Layout title={'Search Results'}>
      <div className='container'>
        <div className='text-center'>
            <h1>Search Results</h1>
            <h6>{values?.products.length<1? "Sorry, No Products Found" : `Found ${values?.products.length} product` }</h6>
            <div className='d-flex flex-wrap mt-4'>
            {values?.products.map(p => (
                <div className="card m-2" style={{width: '18rem'}} key={p._id}>
                  <img src={`${process.env.REACT_APP_API}/api/v1/product/getPhoto/${p._id}`} className="card-img-top w-5 h-5 object-fit" alt={p.name} />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description.substring(0, 30)}{(p.description.length>30)?"...":" "}</p>
                    <p className="card-text"> $ {p.price}</p>
                    <button className="btn btn-primary ms-1">More Details</button>
                    <button className="btn btn-secondary ms-1">Add to Cart</button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Search
