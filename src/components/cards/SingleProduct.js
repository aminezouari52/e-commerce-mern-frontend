// REACT
import { useNavigate } from 'react-router-dom'

// REACT-RESPONSIVE-CAROUSEL
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'

// COMPONENTS
import ProductListItems from './ProductListItems'

// STYLE
import {
  Box,
  Card,
  CardBody,
  Stack,
  Heading,
  CardFooter,
  ButtonGroup,
  Button,
  Icon,
} from '@chakra-ui/react'

// ASSETS
import noImg from '../../images/no-image-available.jpg'
import { AiOutlineHeart } from 'react-icons/ai'
import { BsCartFill } from 'react-icons/bs'

const SingleProduct = ({ product }) => {
  const navigate = useNavigate()
  const { title, description, images, slug } = product

  return (
    <Card direction={{ lg: 'row', md: 'row', base: 'column' }} m={2}>
      {images?.length ? (
        <Carousel>
          {images?.map((image) => (
            <Box key={image.public_id}>
              <img src={image.url} className="slider-img" />
            </Box>
          ))}
        </Carousel>
      ) : (
        <img src={noImg} className="no-img" />
      )}
      <Stack w={{ lg: '80%', base: '100%' }}>
        <CardBody>
          <Heading
            size={{ lg: 'xl', md: 'xl', base: 'lg' }}
            py={4}
            px={2}
            background="blue.400"
          >
            {title}
          </Heading>
          <ProductListItems product={product} />
        </CardBody>
        <CardFooter>
          <ButtonGroup spacing="1" w="100%" justifyContent="end">
            <Button
              variant="ghost"
              colorScheme="blue"
              leftIcon={<Icon as={AiOutlineHeart} />}
              // onClick={() => navigate(`/product/${slug}`)}
            >
              Add to Wishlist
            </Button>
            <Button
              variant="solid"
              colorScheme="blue"
              leftIcon={<Icon as={BsCartFill} />}
            >
              Add to cart
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Stack>
    </Card>
  )
}

export default SingleProduct
