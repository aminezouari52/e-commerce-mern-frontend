import { useState, useEffect } from "react";
import { getCategories } from "../../functions/category";
import { Box, Button, Heading, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getCategories().then((c) => {
      setCategories(c.data);
      setLoading(false);
    });
  }, []);

  return (
    <Box my={2}>
      <Heading
        fontSize="3xl"
        backgroundColor="gray.200"
        color="#3182ce"
        my={4}
        py={6}
        textAlign="center"
        fontWeight="bold"
      >
        Categories
      </Heading>
      <Flex justifyContent="space-evenly" flexWrap="wrap">
        {categories.map((c) => (
          <Button
            key={c._id}
            variant="outline"
            size="lg"
            m={2}
            colorScheme="blue"
            isLoading={loading}
            onClick={() => navigate(`/category/${c.slug}`)}
          >
            {c.name}
          </Button>
        ))}
      </Flex>
    </Box>
  );
};

export default CategoryList;
