// REACT
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

// REDUX
import { useSelector } from "react-redux";

// FUNCTIONS
import { getCategories } from "../../../functions/category";
import { updateSub, getSub } from "../../../functions/sub";

// COMPONENTS
import CategoryForm from "../../../components/forms/CategoryForm";

// STYLE
import {
  Flex,
  Box,
  Heading,
  Text,
  Select,
  Card,
  CardBody,
} from "@chakra-ui/react";

const SubUpdate = () => {
  const params = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  // LOGGED IN USER
  const user = useSelector((state) => state.user.loggedInUser);

  // STATE
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [parent, setParent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await updateSub(params.slug, { name, parent }, user.token);
      setLoading(false);
      setName("");
      toast({
        title: `"${res.data.name}" is updated`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/admin/sub");
    } catch (err) {
      setLoading(false);
      toast({
        title: err.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    // LOAD STATES
    const loadCategories = () => {
      getCategories().then((c) => setCategories(c.data));
    };
    const loadSub = () => {
      getSub(params.slug).then((s) => {
        setName(s.data.name);
        setParent(s.data.parent);
      });
    };

    loadSub();
    loadCategories();
  }, [params.slug]);

  return (
    <Box overflowY="hidden">
      <Heading size="lg" color="#3182ce" my={5}>
        Update a sub category
      </Heading>
      <Card my={2}>
        <CardBody>
          <Flex direction="column" mb={4}>
            <Text fontSize="md" fontWeight="600">
              Parent category
            </Text>
            <Select
              variant="flushed"
              placeholder="Please select"
              onChange={(e) => setParent(e.target.value)}
              value={parent}
            >
              {categories.length > 0 &&
                categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
            </Select>
          </Flex>
          <CategoryForm
            label="sub category"
            name={name}
            setName={setName}
            handleSubmit={handleSubmit}
            loading={loading}
          />
        </CardBody>
      </Card>
    </Box>
  );
};

export default SubUpdate;
