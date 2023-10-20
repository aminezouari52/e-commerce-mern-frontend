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
    if (user.token) {
      userCart(cart, user.token)
        .then((res) => {
          console.log("CART POST RES", res);
          if (res.data.ok) navigate("/checkout");
        })
        .catch((err) => console.log("cart save err", err));
    }
  };

  const loginToCheckout = () => {
    navigate("/login", { state: { from: "/cart" } });
  };

  return (
    <Flex
      p={0}
      direction={{ lg: "row", md: "row", sm: "column", base: "column" }}
      h={{
        lg: "calc(100vh - 40px)",
        md: "calc(100vh - 40px)",
        sm: "100%",
        base: "100%",
      }}
    >
      <Box w="100%" overflowX="hidden" bg="#e9ecef" h="100%">
        <Box px={5} h="100%">
          <Box overflowY="hidden" height="100%">
            <Heading size="lg" color="#3182ce" my={5}>
              Cart / {cart.length} Product
            </Heading>

            {!cart.length ? (
              <Box height="calc(38vh)">
                <Text mb={2}>
                  No products in cart.{" "}
                  <Link to="/shop">Continue Shopping.</Link>
                </Text>
              </Box>
            ) : (
              <TableContainer
                border="1px"
                borderRadius="4px"
                borderColor="gray.300"
                overflowX="auto"
                mr={2}
              >
                <Table m="0" variant="simple" bg="white">
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
        </Box>
      </Box>

      <Stack
        spacing={5}
        w={{ lg: "300px", md: "300px", sm: "100%", base: "100%" }}
        p={4}
      >
        <Heading size="md">Order Summary</Heading>
        <Divider colorScheme="black" size="lg" />
        <Heading size="sm">Products</Heading>
        <Divider size="lg" />
        {cart.map((c, i) => (
          <Flex alignItems="center" key={i} wrap="nowrap">
            x{c.count}{" "}
            <Badge
              colorScheme="purple"
              whiteSpace="normal"
              wordBreak="break-all"
              maxWidth="100px"
            >
              {c.title}
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
