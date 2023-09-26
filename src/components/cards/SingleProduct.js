// PACKAGES
import "react-responsive-carousel/lib/styles/carousel.min.css" // requires a loader
import { Carousel } from "react-responsive-carousel"
import StarRating from "react-star-ratings"

// REACT
import { useNavigate } from "react-router-dom"

// FUNCTIONS
import { showAverage } from "../../functions/rating"

// COMPONENTS
import ProductListItems from "./ProductListItems"
import RatingModal from "../modal/RatingModal"

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
  Text,
} from "@chakra-ui/react"

// ASSETS
import noImg from "../../images/no-image-available.jpg"
import { AiOutlineHeart } from "react-icons/ai"
import { AiOutlineShoppingCart } from "react-icons/ai"

const SingleProduct = ({ product, star, onStarClick }) => {
  const navigate = useNavigate()
  const { title, images, slug, _id } = product

  return (
    <Card direction={{ lg: "row", md: "row", base: "column" }} m={2}>
      {images?.length ? (
        <Carousel showArrows={true} autoPlay infiniteLoop>
          {images?.map((image) => (
            <Box key={image.public_id}>
              <img src={image.url} alt="slider img" className="slider-img" />
            </Box>
          ))}
        </Carousel>
      ) : (
        <img src={noImg} alt="no-img" className="no-img" />
      )}
      <Stack w={{ lg: "100%", base: "100%" }}>
        <CardBody>
          <Heading
            size={{ lg: "xl", md: "xl", base: "lg" }}
            py={4}
            px={2}
            background="blue.400"
          >
            {title}
          </Heading>
          {product && product.ratings && product.ratings.length > 0 ? (
            showAverage(product)
          ) : (
            <Text textAlign="center" p="2">
              No rating yet
            </Text>
          )}
          <ProductListItems product={product} />
        </CardBody>
        <CardFooter>
          <ButtonGroup spacing="1" w="100%" justifyContent="end">
            <Button
              variant="ghost"
              colorScheme="green"
              leftIcon={<Icon as={AiOutlineShoppingCart} />}
            >
              Add to cart
            </Button>
            <Button
              variant="ghost"
              colorScheme="blue"
              leftIcon={<Icon as={AiOutlineHeart} />}
              // onClick={() => navigate(`/product/${slug}`)}
            >
              Add to Wishlist
            </Button>
            <RatingModal>
              <StarRating
                name={_id}
                numberOfStars={5}
                rating={star}
                changeRating={onStarClick}
                isSelectable={true}
                starRatedColor="red"
              />
            </RatingModal>
          </ButtonGroup>
        </CardFooter>
      </Stack>
    </Card>
  )
}

export default SingleProduct
