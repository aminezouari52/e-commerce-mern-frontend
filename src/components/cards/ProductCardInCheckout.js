import {
  Tr,
  Td,
  Image,
  useToast,
  Input,
  Button,
  Text,
  Icon,
  Flex,
  Box,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import laptop from "../../images/laptop.jpg";
import { useDispatch } from "react-redux";
import { setCart } from "../../reducers/cartReducer";
import { AiFillCloseCircle, AiFillDelete } from "react-icons/ai";

const ProductCardInCheckout = ({ p }) => {
  const dispatch = useDispatch();
  const toast = useToast();

  const handleQuantityChange = (e) => {
    // console.log("available quantity", p.quantity);
    let count = e.target.value < 1 ? 1 : e.target.value;

    if (count > p.quantity) {
      toast({
        title: `Max available quantity: ${p.quantity}`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.map((product, i) => {
        if (product._id == p._id) {
          cart[i].count = count;
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch(setCart(cart));
    }
  };

  const handleRemove = () => {
    // console.log(p._id, "to remove");
    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      // [1,2,3,4,5]
      cart.map((product, i) => {
        if (product._id === p._id) {
          cart.splice(i, 1);
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch(setCart(cart));
    }
  };

  return (
    <Tr>
      <Td>
        <Image
          src={p.images && p.images.length ? p.images[0].url : laptop}
          h="auto"
          w="100px"
          maxWidth="180px"
        />
      </Td>
      <Td style={{ whiteSpace: "normal", wordWrap: "break-word" }}>
        {p.title}
      </Td>
      <Td>${p.price}</Td>
      <Td>{p.brand}</Td>
      <Td>{p.color}</Td>
      <Td maxWidth="100px">
        <Input
          type="number"
          minWidth="70px"
          maxWidth="100px"
          value={p.count}
          onChange={handleQuantityChange}
        />
      </Td>
      <Td>
        <Flex justifyContent="center" alignItems="center">
          {p.shipping === "Yes" ? (
            <CheckCircleIcon color="green" />
          ) : (
            <Icon
              height="30px"
              width="30%"
              as={AiFillCloseCircle}
              color="red"
            />
          )}
        </Flex>
      </Td>
      <Td>
        <Flex justifyContent="center" alignItems="center">
          <Button
            size="xs"
            variant="ghost"
            colorScheme="red"
            onClick={handleRemove}
          >
            <Icon as={AiFillDelete} h="20px" w="20px" />
          </Button>
        </Flex>
      </Td>
    </Tr>
  );
};

export default ProductCardInCheckout;
