// REACT
import { useEffect, useState } from 'react'

// FUNCTIONS
import { getProducts } from '../../functions/product'

// COMPONENTS
import Products from './Products'
import Pagination from './Pagination'

// STYLE
import { Heading, Flex, Box } from '@chakra-ui/react'

const NewArrivals = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadAllProducts()
  }, [])

  const loadAllProducts = () => {
    setLoading(true)
    // sort, order, limit
    getProducts('createdAt', 'desc', 10).then((res) => {
      setProducts(res.data)
      setLoading(false)
    })
  }

  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage] = useState(3)

  // Get current products
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  )

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)
  return (
    <Box>
      <Heading
        fontSize="3xl"
        backgroundColor="gray.200"
        color="#007BFF"
        my={4}
        py={6}
        textAlign="center"
        fontWeight="bold"
      >
        New Arrivals
      </Heading>
      <Flex flexDirection="column" alignItems="center">
        <Products products={currentProducts} loading={loading} />
        <Pagination
          productsPerPage={productsPerPage}
          totalProducts={products.length}
          paginate={paginate}
        />
      </Flex>
    </Box>
  )
}

export default NewArrivals
