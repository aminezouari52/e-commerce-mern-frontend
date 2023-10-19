import { useState, useEffect } from "react";
import { getSubs } from "../../functions/sub";
import { Box, Button, Heading, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const SubList = () => {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getSubs().then((c) => {
      setSubs(c.data);
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
        Sub categories
      </Heading>
      <Flex justifyContent="space-evenly" flexWrap="wrap">
        {subs.map((s) => (
          <Button
            key={s._id}
            variant="outline"
            size="lg"
            m={2}
            colorScheme="blue"
            isLoading={loading}
            onClick={() => navigate(`/sub/${s.slug}`)}
          >
            {s.name}
          </Button>
        ))}
      </Flex>
    </Box>
  );
};

export default SubList;
