import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Heading,
  Flex,
  Text,
  Divider,
  Button,
  Stack,
  Badge,
  Th,
  Tr,
  TableContainer,
  Table,
  Thead,
  Tbody,
} from "@chakra-ui/react";
import ProductCardInCheckout from "../components/cards/ProductCardInCheckout";
import { userCart } from "../functions/user";

const Cart = () => {
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart.cart.cartItems);
  const user = useSelector((state) => state.user.loggedInUser);

  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const saveOrderToDb = () => {
    userCart(cart, user.token)
      .then((res) => {
        console.log("CART POST RES", res);
        if (res.data.ok) navigate("/user/checkout");
      })
      .catch((err) => console.log("cart save err", err));
  };

  const loginToCheckout = () => {
    navigate("/login", { state: { from: "/cart" } });
  };

  return (
    <Flex
      direction={{ lg: "row", md: "row", sm: "column", base: "column" }}
      p={4}
      justifyContent={{
        lg: "space-around",
        md: "space-around",
        sm: "start",
        base: "start",
      }}
      alignItems={{ lg: "start", md: "start", sm: "center", base: "center" }}
    >
      <Box maxWidth={{ lg: "70%", md: "60%", sm: "100%", base: "100%" }}>
        <Heading size="md">Cart / {cart.length} Product</Heading>
        {!cart.length ? (
          <Text>
            No products in cart. <Link to="/shop">Continue Shopping.</Link>
          </Text>
        ) : (
          <TableContainer
            mt={4}
            border="1px"
            borderRadius="4px"
            borderColor="gray.300"
            overflowX="auto"
            mr={2}
          >
            <Table m="0" variant="simple">
              <Thead bg="teal.50">
                <Tr>
                  <Th>Image</Th>
                  <Th>Title</Th>
                  <Th>Price</Th>
                  <Th>Brand</Th>
                  <Th>Color</Th>
                  <Th>Count</Th>
                  <Th>Shipping</Th>
                  <Th>Remove</Th>
                </Tr>
              </Thead>
              <Tbody>
                {cart.map((p) => (
                  <ProductCardInCheckout key={p._id} p={p} />
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </Box>
      <Stack
        w={{ lg: "30%", md: "30%", sm: "100%", base: "100%" }}
        spacing="4"
        mt={{ lg: 0, md: 0, sm: 0, base: 4 }}
        ml={{ lg: 4, md: 4, sm: 4, base: 0 }}
      >
        <Heading size="md">Order Summary</Heading>
        <Divider colorScheme="black" size="lg" />
        <Heading size="sm">Products</Heading>
        <Divider size="lg" />
        {cart.map((c, i) => (
          <Flex alignItems="center" key={i} w="100%">
            <Badge colorScheme="purple">
              {c.title} x {c.count}
            </Badge>
            <Text> = ${(c.price * c.count).toFixed(2)}</Text>
          </Flex>
        ))}
        <Divider size="lg" />
        <Text>
          Total: <b>${getTotal().toFixed(2)}</b>
        </Text>
        <Divider size="lg" />
        <Flex justifyContent="flex-end">
          {user ? (
            <Button
              size="sm"
              mt={2}
              variant="solid"
              colorScheme="blue"
              isDisabled={!cart.length}
              onClick={saveOrderToDb}
            >
              Proceed to Checkout
            </Button>
          ) : (
            <Button
              size="sm"
              mt={2}
              variant="solid"
              colorScheme="blue"
              onClick={loginToCheckout}
            >
              Login to Checkout
            </Button>
          )}
        </Flex>
      </Stack>
    </Flex>
  );
};

export default Cart;
