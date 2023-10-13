import { useNavigate } from "react-router-dom";
import {
  Flex,
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
} from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import laptop from "../../images/laptop.jpg";

import { AiOutlineEye } from "react-icons/ai";
import { BsCartFill } from "react-icons/bs";
import { showAverage } from "../../functions/rating";
import _ from "lodash";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setCart } from "../../reducers/cartReducer";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { images, title, description, slug, price } = product;
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

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
    }
  };

  return (
    <Card minWidth="300px" w="30%" m={2}>
      {product && product.ratings && product.ratings.length > 0 ? (
        showAverage(product)
      ) : (
        <Text textAlign="center" fontWeight="bold" p="2">
          No rating yet
        </Text>
      )}
      <CardBody>
        <Flex justifyContent="center">
          <Image
            src={images && images.length ? images[0].url : laptop}
            borderRadius="lg"
            h="150px"
          />
        </Flex>
        <Stack mt="6" spacing="3">
          <Heading size="md">{`${title} - $${price}`}</Heading>
          <Text>
            {description.length < 30
              ? description
              : `${description.substring(0, 30)}...`}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="1">
          <Button
            size="sm"
            variant="ghost"
            colorScheme="blue"
            leftIcon={<Icon as={AiOutlineEye} />}
            onClick={() => navigate(`/product/${slug}`)}
          >
            View Product
          </Button>
          <Button
            size="sm"
            variant="solid"
            colorScheme="blue"
            leftIcon={<Icon as={BsCartFill} />}
            onClick={handleAddToCart}
          >
            Add to cart
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};
export default ProductCard;
