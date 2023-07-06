// REACT
import { useState, useEffect } from 'react'
import { useToast, useDisclosure } from '@chakra-ui/react'

// REDUX
import { useSelector } from 'react-redux'

// FUNCTIONS
import { getProductsByCount, removeProduct } from '../../../functions/product'

// COMPONENTS
import AdminProductCard from '../../../components/cards/AdminProductCard'

// STYLE
import { Flex, Box, Heading, Center, Spinner } from '@chakra-ui/react'

const AllProducts = () => {
  const toast = useToast()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  const user = useSelector((state) => state.user.loggedInUser)

  // DELETE DIALOG
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    loadAllProducts()
  }, [])

  const loadAllProducts = async () => {
    try {
      setLoading(true)
      const res = await getProductsByCount(100)
      setProducts(res.data)
      setLoading(false)
    } catch (err) {
      setLoading(false)
      console.log(err)
    }
  }

  const handleRemove = async (slug) => {
    setLoading(true)
    try {
      await removeProduct(slug, user.token)
      setLoading(false)
      toast({
        title: 'Product deleted',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      loadAllProducts()
    } catch (err) {
      console.log(err)
      setLoading(false)
      toast({
        title: err.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
    onClose()
  }

  return (
    <>
      {loading && (
        <Center
          position="fixed"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg="rgba(0, 0, 0, 0.2)"
        >
          <Spinner size="xl" color="blue" />
        </Center>
      )}
      <Box
        w="100%"
        my={5}
        mx={10}
        h={products.length > 3 ? 'calc(100% - 49px)' : 'calc(100vh - 49px)'}
      >
        <Heading mb={6} color="blue">
          All products
        </Heading>
        <Flex wrap="wrap" justifyContent="space-between">
          {products.map((product) => {
            return (
              <AdminProductCard
                product={product}
                key={product._id}
                handleRemove={handleRemove}
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
              />
            )
          })}
        </Flex>
      </Box>
    </>
  )
}
export default AllProducts