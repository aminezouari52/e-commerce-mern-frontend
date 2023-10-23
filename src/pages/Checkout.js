// HOOKS
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  getUserCart,
  emptyUserCart,
  saveUserAddress,
  saveUserPhoneNumber,
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
  Card,
  CardBody,
  Input,
  ButtonGroup,
} from "@chakra-ui/react";
import { setCart } from "../reducers/cartReducer";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Checkout = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const phoneNumberRef = useRef();

  const toast = useToast();
  const [products, setProducts] = useState([]);
  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);
  const [total, setTotal] = useState(0);
  const [succeeded, setSucceeded] = useState(false);

  const user = useSelector((state) => state.user.loggedInUser);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      getUserCart(user?.token).then((res) => {
        setProducts(res.data.products);
        setTotal(res.data.cartTotal);
      });
    }
  }, [user]);

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

  const saveUserInformationToDb = async () => {
    try {
      if (address === "" || phoneNumberRef.current.value === "") {
        toast({
          title: "Invalid address or phone number!",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
      const addressRes = await saveUserAddress(user.token, address);
      const phoneRes = await saveUserPhoneNumber(
        user.token,
        phoneNumberRef.current.value
      );
      if (addressRes.data.ok && phoneRes.data.ok) {
        setAddressSaved(true);
        toast({
          title: "Address and phone number saved!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.log(err);
      toast({
        title: "Something went wrong!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
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
            <Box overflowY="hidden">
              <Heading size="lg" color="#3182ce" my={5}>
                Place order
              </Heading>
              <Card mb={4}>
                <CardBody>
                  <Flex direction="column">
                    <Flex
                      direction={{
                        lg: "row",
                        md: "row",
                        sm: "column",
                        base: "column",
                      }}
                      justifyContent="space-between"
                    >
                      <Box
                        w={{ lg: "70%", md: "50%", sm: "100%", base: "100%" }}
                      >
                        <Heading size="sm" mb={2}>
                          Delivery Address
                        </Heading>
                        <Box>
                          <ReactQuill
                            theme="snow"
                            value={address}
                            onChange={setAddress}
                          />
                        </Box>
                      </Box>
                      <Box>
                        <Heading size="sm" mb={2}>
                          Phone number
                        </Heading>
                        <Input size="sm" ref={phoneNumberRef} type="text" />
                      </Box>
                    </Flex>
                    <Flex justifyContent="flex-end">
                      <Button
                        size="sm"
                        variant="solid"
                        colorScheme="blue"
                        onClick={saveUserInformationToDb}
                        mt={4}
                      >
                        Save
                      </Button>
                    </Flex>
                  </Flex>
                </CardBody>
              </Card>
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

          <ButtonGroup display="flex" w="100%" isAttached>
            <Button
              size="sm"
              mt={2}
              variant="ghost"
              colorScheme="blue"
              onClick={emptyCart}
              disabled={!products?.length}
              w="100%"
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
              w="100%"
            >
              Place Order
            </Button>
          </ButtonGroup>
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
                  colorScheme="teal"
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
