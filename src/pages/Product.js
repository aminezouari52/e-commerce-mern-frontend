//REACT
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

// FUNCTIONS
import { getProduct } from '../functions/product'

// COMPONENTS
import SingleProduct from '../components/cards/SingleProduct'

// STYLE
import { Box, Text } from '@chakra-ui/react'

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
    <Box w="100%">
      <SingleProduct product={product} />
      <Text>Related products</Text>
      <Text>Related products</Text>
      <Text>Related products</Text>
      <Text>Related products</Text>
      <Text>Related products</Text>
      <Text>Related products</Text>
    </Box>
  )
}

export default Product
