import { useNavigate } from 'react-router-dom'
import {
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  Divider,
  CardFooter,
  ButtonGroup,
  Button,
} from '@chakra-ui/react'
import { Icon } from '@chakra-ui/react'
import laptop from '../../images/laptop.jpg'

import { AiOutlineEye } from 'react-icons/ai'
import { BsCartFill } from 'react-icons/bs'

const ProductCard = ({ product }) => {
  const navigate = useNavigate()
  const { images, title, description, slug } = product

  return (
    <Card minWidth="300px" w="30%" m={2}>
      <CardBody>
        <Image
          src={images && images.length ? images[0].url : laptop}
          borderRadius="lg"
          h="150px"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">{title}</Heading>
          <Text>
            {description.length < 30
              ? description
              : `${description.substring(0, 30)}...`}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="1">
          <Button
            size="sm"
            variant="ghost"
            colorScheme="blue"
            leftIcon={<Icon as={AiOutlineEye} />}
            onClick={() => navigate(`/product/${slug}`)}
          >
            View Product
          </Button>
          <Button
            size="sm"
            variant="solid"
            colorScheme="blue"
            leftIcon={<Icon as={BsCartFill} />}
          >
            Add to cart
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  )
}
export default ProductCard
