//REACT
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

// FUNCTIONS
import { getProduct } from '../functions/product'

// COMPONENTS
import SingleProduct from '../components/cards/SingleProduct'

const Product = ({ match }) => {
  const params = useParams()
  const [product, setProduct] = useState({})

  const { slug } = params

  useEffect(() => {
    getProduct(slug).then((res) => {
      setProduct(res.data)
    })
  }, [slug])

  return (
    <div className="container-fluid">
      <div className="row pt-4">
        <SingleProduct product={product} />
      </div>

      <div className="row">
        <div>Related products</div>
      </div>
    </div>
  )
}

export default Product
