// HOOKS
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// FUNCTIONS
import { getWishlist, removeWishlist } from "../../functions/user";

// ICONS
import { AiFillDelete } from "react-icons/ai";

// STYLE
import {
  Text,
  Box,
  Heading,
  Flex,
  Button,
  Card,
  CardBody,
  Icon,
} from "@chakra-ui/react";

const Wishlist = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.loggedInUser);

  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = () =>
    getWishlist(user.token).then((res) => {
      setWishlist(res.data.wishlist);
    });

  const handleRemove = (productId) =>
    removeWishlist(productId, user.token).then((res) => {
      loadWishlist();
    });
  return (
    <Box overflowY="hidden">
      <Heading size="lg" color="#3182ce" my={5}>
        Wishlist
      </Heading>
      {wishlist?.length ? (
        <>
          {wishlist.map((p, i) => (
            <Card mb={2} key={i}>
              <CardBody>
                <Flex justifyContent="space-between">
                  <Button
                    variant="link"
                    colorScheme="teal"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    {p.title}
                  </Button>
                  <Button
                    size="sm"
                    variant="solid"
                    colorScheme="red"
                    onClick={() => handleRemove(p._id)}
                  >
                    <Icon as={AiFillDelete} h="15px" w="15px" />
                  </Button>
                </Flex>
              </CardBody>
            </Card>
          ))}
        </>
      ) : (
        <Text>Wish list is empty.</Text>
      )}
    </Box>
  );
};

export default Wishlist;
