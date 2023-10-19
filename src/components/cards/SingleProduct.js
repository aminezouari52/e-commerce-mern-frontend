// PACKAGES
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import StarRating from "react-star-ratings";

// REACT
import { useNavigate } from "react-router-dom";

// FUNCTIONS
import { showAverage } from "../../functions/rating";

// COMPONENTS
import ProductListItems from "./ProductListItems";
import RatingModal from "../modal/RatingModal";

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
  useToast,
  Text,
} from "@chakra-ui/react";

// ASSETS
import noImg from "../../images/no-image-available.jpg";
import { AiOutlineHeart } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../../reducers/cartReducer";

const SingleProduct = ({ product, star, onStarClick }) => {
  const navigate = useNavigate();
  const { title, images, slug, _id } = product;
  const cart = useSelector((state) => state.cart.cart);
  const user = useSelector((state) => state.user.loggedInUser);
  const dispatch = useDispatch();
  const toast = useToast();
  const handleAddToCart = () => {
    // create cart array
    let cart = [];
    if (typeof window !== "undefined") {
      // if cart is in local storage GET it
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      // push new product to cart
      cart.push({
        ...product,
        count: 1,
      });
      // remove duplicates
      let unique = _.uniqWith(cart, _.isEqual);
      // save to local storage
      // console.log('unique', unique)
      localStorage.setItem("cart", JSON.stringify(unique));
      dispatch(setCart(unique));
      toast({
        title: "Product added.",
        status: "info",
        duration: 2000,
        isClosable: true,
      });
    }
  };

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
            background="blue"
          >
            {title}
          </Heading>
          {product && product.ratings && product.ratings.length > 0 ? (
            showAverage(product)
          ) : (
            <Text textAlign="center" fontWeight="bold" p="2">
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
              onClick={handleAddToCart}
              isDisabled={product?.quantity < 1}
            >
              {product?.quantity < 1 ? "Out of stock" : "Add to cart"}
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
  );
};

export default SingleProduct;
