// PACKAGES
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import StarRating from "react-star-ratings";

// FUNCTIONS
import { showAverage } from "../../functions/rating";
import { addToWishlist } from "../../functions/user";

// COMPONENTS
import ProductListItems from "./ProductListItems";
import RatingModal from "../modal/RatingModal";

// STYLE
import {
  Box,
  Flex,
  Stack,
  Heading,
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
  const { title, images, _id } = product;
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
        title: "Product added to cart.",
        status: "info",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    addToWishlist(product?._id, user.token).then((res) => {
      console.log("ADDED TO WISHLIST", res.data);
      toast({
        title: "Product added to wishlist.",
        status: "info",
        colorScheme: "green",
        duration: 2000,
        isClosable: true,
      });
    });
  };

  return (
    <Flex direction={{ lg: "row", md: "row", sm: "column", base: "column" }}>
      <Flex
        alignItems="center"
        justifyContent="center"
        w={{ lg: "50%", md: "50%", sm: "100%", base: "100%" }}
        p={4}
      >
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
      </Flex>

      <Stack w={{ lg: "50%", md: "50%", sm: "100%", base: "100%" }} bg="#fff">
        <Heading size="md" py={4} px={2} background="#3182CE" color="#fff">
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
        <Box p={4}>
          <ButtonGroup
            display="flex"
            w="100%"
            flexDirection={{ lg: "row", md: "row", sm: "row", base: "column" }}
            isAttached={{ lg: "true", md: "true", sm: "true", base: "false" }}
          >
            <Button
              variant="ghost"
              colorScheme="green"
              leftIcon={<Icon as={AiOutlineHeart} />}
              onClick={handleAddToWishlist}
              isDisabled={product?.quantity < 1}
              w="100%"
            >
              Add to wishlist
            </Button>
            <Button
              variant="ghost"
              colorScheme="blue"
              leftIcon={<Icon as={AiOutlineShoppingCart} />}
              onClick={handleAddToCart}
              isDisabled={product?.quantity < 1}
              w="100%"
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
        </Box>
      </Stack>
    </Flex>
  );
};

export default SingleProduct;
