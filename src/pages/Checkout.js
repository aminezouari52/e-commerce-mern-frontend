import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserCart,
  emptyUserCart,
  saveUserAddress,
  createOrder,
} from "../functions/user";
import {
  Box,
  Heading,
  Flex,
  Text,
  Divider,
  Button,
  Stack,
  Badge,
  useToast,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Modal,
  ModalOverlay,
  useDisclosure,
  ModalContent,
  ModalHeader,
} from "@chakra-ui/react";
import { setCart } from "../reducers/cartReducer";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();
  const [products, setProducts] = useState([]);
  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);
  const [total, setTotal] = useState(0);
  const [succeeded, setSucceeded] = useState(false);

  const user = useSelector((state) => state.user.loggedInUser);

  const dispatch = useDispatch();

  useEffect(() => {
    getUserCart(user.token).then((res) => {
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });
  }, []);

  const emptyCart = async () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }
    dispatch(setCart([]));
    await emptyUserCart(user.token);
    setProducts([]);
    setTotal(0);
    toast({
      title: "Cart is empty. Continue shopping.",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  const saveAddressToDb = () => {
    // console.log(address);
    saveUserAddress(user.token, address).then((res) => {
      if (res.data.ok) {
        setAddressSaved(true);
        toast({
          title: "Address saved.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    });
  };

  const placeOrder = async () => {
    try {
      await createOrder(total, user.token);
      if (typeof window !== "undefined") localStorage.removeItem("cart");
      dispatch(setCart([]));
      emptyUserCart(user.token);
      setSucceeded(true);
      setProducts([]);
      setTotal(0);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Flex
        direction={{ lg: "row", md: "row", sm: "row", base: "column" }}
        p={4}
        justifyContent="space-around"
      >
        <Box>
          <Heading size="md">Delivery Address</Heading>
          <Box
            w={{ lg: "80%", md: "70%", sm: "70%", base: "100%" }}
            my={2}
            py={2}
          >
            <ReactQuill theme="snow" value={address} onChange={setAddress} />
          </Box>
          <Button
            size="sm"
            variant="solid"
            colorScheme="blue"
            onClick={saveAddressToDb}
          >
            Save
          </Button>
        </Box>

        <Stack
          w={{ lg: "30%", md: "30%", sm: "30%", base: "100%" }}
          spacing="4"
          mt={{ lg: 0, md: 0, sm: 0, base: 4 }}
          ml={{ lg: 4, md: 4, sm: 4, base: 0 }}
        >
          <Heading size="md">Order Summary</Heading>
          <Divider colorScheme="black" size="lg" />
          <Heading size="sm">Products {products?.length}</Heading>
          <Divider size="lg" />

          {products?.map((c, i) => (
            <Flex alignItems="center" key={i}>
              <Badge colorScheme="purple">
                {c.title} x {c.count}
              </Badge>
              <Text> = ${(c.price * c.count).toFixed(2)}</Text>
            </Flex>
          ))}
          <Divider size="lg" />
          <Text>
            Total: <b>{total.toFixed(2)}$</b>
          </Text>
          <Divider size="lg" />

          <Flex
            direction={{ lg: "row", md: "row", sm: "column", base: "row" }}
            justifyContent="space-around"
          >
            <Button
              size="sm"
              mt={2}
              variant="outline"
              colorScheme="blue"
              onClick={emptyCart}
              disabled={!products?.length}
            >
              Empty Cart
            </Button>
            <Button
              size="sm"
              mt={2}
              variant="solid"
              colorScheme="blue"
              isDisabled={!addressSaved || !products.length}
              onClick={() => onOpen()}
            >
              Place Order
            </Button>
          </Flex>
        </Stack>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {succeeded ? "Order submitted successfully!" : "Place order"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {succeeded ? (
              <>
                <Text>
                  Your order was submitted successfully! we will email you the
                  delivery date soon.
                </Text>

                <Button
                  variant="link"
                  colorScheme="blue"
                  onClick={() => navigate("/user/history")}
                >
                  See it in your purchase history.
                </Button>
              </>
            ) : (
              <>
                <Text>Are you sure you want to confirm your order?</Text>
                <Text>
                  Total: <b>{total.toFixed(2)}$</b>
                </Text>
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              variant={succeeded ? "solid" : "ghost"}
              colorScheme="red"
              onClick={onClose}
            >
              {succeeded ? "Close" : "Cancel"}
            </Button>
            {!succeeded && (
              <Button colorScheme="yellow" mr={3} onClick={placeOrder}>
                Confirm order
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Checkout;
