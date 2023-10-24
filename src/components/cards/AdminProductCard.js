// REACT
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

// STYLE
import {
  Flex,
  Card,
  Image,
  Stack,
  Text,
  CardBody,
  Divider,
  CardFooter,
  Button,
  Icon,
  AlertDialogOverlay,
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import laptop from "../../images/laptop.jpg";

// ICONS
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

const AdminProductCard = ({
  product,
  handleRemove,
  onOpen,
  onClose,
  isOpen,
}) => {
  // destructure
  const { title, description, images, slug } = product;

  const navigate = useNavigate();
  const cancelRef = useRef();

  return (
    <>
      <Card minWidth="200px" w="20%" m={1}>
        <CardBody>
          <Flex justifyContent="center">
            <Image
              src={images && images.length ? images[0].url : laptop}
              alt="product image"
              borderRadius="md"
              h="100px"
            />
          </Flex>

          <Stack mt={2} spacing={2}>
            <Text fontSize="sm" fontWeight="bold">
              {title}
            </Text>
            <Text fontSize="sm">
              {description.length > 20
                ? `${description.substring(0, 20)}...`
                : description}
            </Text>
          </Stack>
        </CardBody>
        <Divider />

        <CardFooter border="0px">
          <Flex justifyContent="space-evenly" w="100%">
            <Button
              size="sm"
              variant="solid"
              colorScheme="yellow"
              onClick={() => {
                navigate(`/admin/product/${slug}`);
              }}
            >
              <Icon as={AiFillEdit} />
            </Button>

            <Button
              size="sm"
              variant="solid"
              colorScheme="red"
              onClick={onOpen}
            >
              <Icon as={AiFillDelete} />
            </Button>
          </Flex>
        </CardFooter>
      </Card>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay bgColor="rgba(0, 0, 0, 0.2)">
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Product
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
                onClick={() => handleRemove(slug)}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default AdminProductCard;
