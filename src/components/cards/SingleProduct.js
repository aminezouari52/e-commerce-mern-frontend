// REACT
import { useNavigate } from 'react-router-dom'

// REACT-RESPONSIVE-CAROUSEL
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'

// STYLE
import {
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  Divider,
  CardFooter,
  ButtonGroup,
  Button,
  Icon,
} from '@chakra-ui/react'

// IMAGE
import laptop from '../../images/laptop.jpg'

// ICONS
import { AiOutlineHeart } from 'react-icons/ai'
import { BsCartFill } from 'react-icons/bs'

const SingleProduct = ({ product }) => {
  const navigate = useNavigate()
  const { title, description, images, slug } = product

  console.log(title, description, images, slug)

  return (
    <>
      <div className="col-md-7">
        {/* <Carousel>
          {images &&
            images?.map((image) => (
              <img src={image.url} key={image.public_id} />
            ))} */}
        {/* <div>
            <img src="assets/1.jpeg" />
            <p className="legend">Legend 1</p>
          </div>
          <div>
            <img src="assets/2.jpeg" />
            <p className="legend">Legend 2</p>
          </div>
          <div>
            <img src="assets/3.jpeg" />
            <p className="legend">Legend 3</p>
          </div> */}
        {/* </Carousel> */}
      </div>

      <div className="col-md-5">
        <Card minWidth="300px" w="30%" m={2}>
          {/* <CardBody>
            <Image
              src={images && images.length ? images[0].url : laptop}
              borderRadius="lg"
              h="150px"
            />
            <Stack mt="6" spacing="3">
              <Heading size="md">{title}</Heading>
              <Text>
                {description.length < 30
                  ? description
                  : `${description.substring(0, 30)}...`}
              </Text>
            </Stack>
            <Text>
              price/category/subs/shipping/color/brand/quantity available/sold
            </Text>
          </CardBody> */}
          <Divider />
          <CardFooter>
            <ButtonGroup spacing="1">
              <Button
                size="sm"
                variant="ghost"
                colorScheme="blue"
                leftIcon={<Icon as={AiOutlineHeart} />}
                // onClick={() => navigate(`/product/${slug}`)}
              >
                Add to Wishlist
              </Button>
              <Button
                size="sm"
                variant="solid"
                colorScheme="blue"
                leftIcon={<Icon as={BsCartFill} />}
              >
                Add to cart
              </Button>
            </ButtonGroup>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}

export default SingleProduct
