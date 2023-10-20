import React, { useState, useEffect } from "react";
import { getSub } from "../../functions/sub";
import ProductCard from "../../components/cards/ProductCard";
import { useParams } from "react-router-dom";
import { Center, Spinner, Heading, Box, Flex } from "@chakra-ui/react";

const SubHome = () => {
  const [sub, setSub] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const params = useParams();

  const { slug } = params;

  useEffect(() => {
    setLoading(true);
    getSub(slug).then((s) => {
      setSub(s.data.sub);
      setProducts(s.data.products);
      setLoading(false);
    });
  }, []);

  return (
    <>
      {loading && (
        <Center
          position="fixed"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg="rgba(0, 0, 0, 0.2)"
        >
          <Spinner size="xl" color="blue" />
        </Center>
      )}
      <Flex
        p={0}
        direction={{ lg: "row", md: "row", sm: "column", base: "column" }}
        h="calc(100vh - 40px)"
      >
        <Box w="100%" overflowX="hidden" h="100%">
          <Box>
            <Heading
              fontSize="3xl"
              backgroundColor="gray.200"
              my={4}
              py={6}
              textAlign="center"
              fontWeight="bold"
              color="#3182CE"
            >
              {products.length} Products in "{sub.name}" sub category
            </Heading>
            <Flex h="100%" py={2} flexWrap="wrap" justifyContent="space-around">
              {products.map((p) => (
                <Box key={p._id} my={2}>
                  <ProductCard product={p} />
                </Box>
              ))}
            </Flex>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default SubHome;
