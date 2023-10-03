//REACT
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"

// FUNCTIONS
import { getProduct, productStar, getRelated } from "../functions/product"

// COMPONENTS
import SingleProduct from "../components/cards/SingleProduct"
import ProductCard from "../components/cards/ProductCard"

// STYLE
import {
  Flex,
  Box,
  Text,
  Tabs,
  TabPanels,
  TabPanel,
  TabList,
  Tab,
  Heading,
} from "@chakra-ui/react"

const Product = () => {
  const params = useParams()
  const [product, setProduct] = useState({})
  const [related, setRelated] = useState([])
  const [star, setStar] = useState()
  const user = useSelector((state) => state.user.loggedInUser)

  const { slug } = params

  useEffect(() => {
    loadSingleProduct()
  }, [slug])

  // Set initial modal star value
  useEffect(() => {
    let existingRatingObject = product.ratings?.find(
      (ele) => ele.postedBy.toString() === user._id?.toString()
    )
    existingRatingObject && setStar(existingRatingObject.star) // current user's star
  }, [])

  const loadSingleProduct = () =>
    getProduct(slug).then((res) => {
      setProduct(res.data)
      getRelated(res.data._id).then((res) => setRelated(res.data))
    })

  const onStarClick = async (newRating, productId) => {
    setStar(newRating)
    await productStar(productId, newRating, user.token)
    loadSingleProduct()
  }

  return (
    <Box w="100%">
      <SingleProduct product={product} onStarClick={onStarClick} star={star} />

      <Tabs variant="enclosed" ml={2}>
        <TabList>
          <Tab fontWeight="medium">Description</Tab>
          <Tab fontWeight="medium">More</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Text>{product?.description}</Text>
          </TabPanel>
          <TabPanel>
            <Text>
              Call us on xxxx xxx xxx to learn more about this product.
            </Text>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Box mx={4}>
        <Heading textAlign="center" size="lg" my={4}>
          Related Products
        </Heading>
        <Flex py={2} flexWrap="wrap">
          {related?.length ? (
            related?.map((r) => (
              <Box key={r._id} my={2}>
                <ProductCard product={r} />
              </Box>
            ))
          ) : (
            <Text textAlign="center">No Products Found</Text>
          )}
        </Flex>
      </Box>
    </Box>
  )
}

export default Product
