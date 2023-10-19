import React, { useState, useEffect } from "react";
import { getCategory } from "../../functions/category";
import ProductCard from "../../components/cards/ProductCard";
import { useParams } from "react-router-dom";
import { Center, Spinner, Heading, Box, Flex } from "@chakra-ui/react";

const CategoryHome = () => {
  const [category, setCategory] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const params = useParams();

  const { slug } = params;

  useEffect(() => {
    setLoading(true);
    getCategory(slug).then((c) => {
      setCategory(c.data.category);
      setProducts(c.data.products);
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
          <Spinner size="xl" color="#3182CE" />
        </Center>
      )}
      <Box>
        <Heading
          fontSize="3xl"
          backgroundColor="gray.200"
          my={4}
          py={6}
          textAlign="center"
          fontWeight="bold"
        >
          {products.length} Products in "{category.name}" category
        </Heading>

        <Flex flexWrap="wrap" justifyContent="space-evenly">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </Flex>
      </Box>
    </>
  );
};

export default CategoryHome;
