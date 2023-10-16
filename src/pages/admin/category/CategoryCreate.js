// REACT
import { useState, useEffect, useRef } from "react";
import { useToast, useDisclosure } from "@chakra-ui/react";

// REDUX
import { useSelector } from "react-redux";

// FUNCTIONS
import {
  createCategory,
  getCategories,
  removeCategory,
} from "../../../functions/category";

// COMPONENTS
import AdminNav from "../../../components/nav/AdminNav";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";

// STYLE
import {
  Flex,
  Box,
  Button,
  Heading,
  Icon,
  Text,
  AlertDialogOverlay,
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

// ICONS
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

const CategoryCreate = () => {
  const user = useSelector((state) => state.user.loggedInUser);

  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const toast = useToast();

  // DELETE DIALOG
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  // SEARCH
  const [keyword, setKeyword] = useState("");
  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    getCategories().then((c) => setCategories(c.data));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // CREATE CATEGORY
    try {
      const res = await createCategory({ name }, user.token);
      setLoading(false);
      setName("");
      toast({
        title: `"${res.data.name}" is created!`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      loadCategories();
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
  const handleRemove = async (slug) => {
    setLoading(true);
    try {
      const res = await removeCategory(slug, user.token);
      setLoading(false);
      toast({
        title: `"${res.data.name}" deleted`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      loadCategories();
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast({
        title: err.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    onClose();
  };

  return (
    <Box mx={10}>
      <Heading my={5} color="blue">
        Create a category
      </Heading>
      <CategoryForm
        label="Category"
        name={name}
        setName={setName}
        handleSubmit={handleSubmit}
        loading={loading}
      />
      <LocalSearch keyword={keyword} setKeyword={setKeyword} />
      <Text fontSize="xl" fontWeight="600" my={2}>
        Categories
      </Text>
      <Flex direction="column">
        {categories.filter(searched(keyword)).map((c) => (
          <Flex
            justifyContent="space-between"
            key={c._id}
            bg="gray.100"
            mb={2}
            py={2}
            px={4}
          >
            <Text>{c.name}</Text>
            <Flex>
              <Button
                size="sm"
                colorScheme="yellow"
                mr={2}
                onClick={() => navigate(`/admin/category/${c.slug}`)}
              >
                <Icon as={AiFillEdit} />
              </Button>
              <Button size="sm" colorScheme="red" onClick={() => onOpen()}>
                <Icon as={AiFillDelete} />
              </Button>
              {/* DELETE DIALOG */}
              <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
              >
                <AlertDialogOverlay bgColor="rgba(0, 0, 0, 0.2)">
                  <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                      Delete Category
                    </AlertDialogHeader>

                    <AlertDialogBody>
                      Are you sure? You can't undo this action afterwards.
                    </AlertDialogBody>

                    <AlertDialogFooter>
                      <Button ref={cancelRef} onClick={onClose}>
                        Cancel
                      </Button>
                      <Button
                        colorScheme="red"
                        onClick={() => handleRemove(c.slug)}
                        ml={3}
                      >
                        Delete
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialogOverlay>
              </AlertDialog>
            </Flex>
          </Flex>
        ))}
      </Flex>
    </Box>
  );
};

export default CategoryCreate;
