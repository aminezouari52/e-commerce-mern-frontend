// REACT
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

// STYLE
import {
  Card,
  Image,
  Stack,
  Heading,
  Text,
  CardBody,
  Divider,
  CardFooter,
  Button,
  Flex,
  Icon,
  AlertDialogOverlay,
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from '@chakra-ui/react'
import laptop from '../../images/laptop.jpg'

// ICONS
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'

const AdminProductCard = ({
  product,
  handleRemove,
  onOpen,
  onClose,
  isOpen,
}) => {
  // destructure
  const { title, description, images, slug } = product

  const navigate = useNavigate()
  const cancelRef = useRef()

  return (
    <Card w="31%" minW="200px" mb={4}>
      <CardBody>
        <Image
          src={images && images.length ? images[0].url : laptop}
          alt="product image"
          borderRadius="lg"
          h="240px"
          w="100%"
          position=""
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">{title}</Heading>
          <Text>
            {description.length > 20
              ? `${description.substring(0, 20)}...`
              : description}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter p={4}>
        <Flex justifyContent="space-around" w="100%">
          <Button
            variant="ghost"
            colorScheme="yellow"
            size="lg"
            onClick={() => {
              navigate(`/admin/product/${slug}`)
            }}
          >
            <Icon as={AiFillEdit} h="30px" w="30px" />
          </Button>
          <Divider orientation="vertical" />
          <Button variant="ghost" colorScheme="red" size="lg" onClick={onOpen}>
            <Icon as={AiFillDelete} h="30px" w="30px" />
          </Button>
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
        </Flex>
      </CardFooter>
    </Card>
  )
}

export default AdminProductCard
