import {
  Tr,
  Td,
  Image,
  useToast,
  Input,
  Button,
  Icon,
  Flex,
} from "@chakra-ui/react";
import { CloseIcon, CheckCircleIcon, SmallCloseIcon } from "@chakra-ui/icons";
import laptop from "../../images/laptop.jpg";
import { useDispatch } from "react-redux";
import { setCart } from "../../reducers/cartReducer";
import { AiFillCloseCircle } from "react-icons/ai";

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
      <Td wordBreak="break-all">{p.title}</Td>
      <Td>${p.price}</Td>
      <Td>{p.brand}</Td>
      <Td>{p.color}</Td>
      <Td>
        <Input
          type="number"
          minWidth="70px"
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
          <CloseIcon cursor="pointer" color="red" onClick={handleRemove} />
        </Flex>
      </Td>
    </Tr>
  );
};

export default ProductCardInCheckout;