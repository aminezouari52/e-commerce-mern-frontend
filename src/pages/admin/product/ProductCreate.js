// REACT
import { useState } from 'react'
import { useToast } from '@chakra-ui/react'
import { useSelector } from 'react-redux'

// FUNCTIONS
import { createProduct } from '../../../functions/product'

// COMPONENTS
import AdminNav from '../../../components/nav/AdminNav'

// STYLE
import {
  Flex,
  Box,
  Button,
  Heading,
  FormLabel,
  Input,
  Text,
  Select,
} from '@chakra-ui/react'

const initialState = {
  title: '',
  description: '',
  price: '',
  categories: [],
  category: '',
  subs: [],
  shipping: '',
  quantity: '',
  images: [],
  colors: ['Black', 'Brown', 'Silver', 'White', 'Blue'],
  brands: ['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'ASUS'],
  color: '',
  brand: '',
}
const ProductCreate = () => {
  const toast = useToast()
  const [values, setValues] = useState(initialState)

  // LOGGED IN USER
  const user = useSelector((state) => state.user.loggedInUser)

  const {
    title,
    description,
    price,
    categories,
    category,
    subs,
    shipping,
    quantity,
    images,
    colors,
    brands,
    color,
    brand,
  } = values

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await createProduct(values, user.token)
      toast({
        title: 'Product created!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } catch (err) {
      console.log(err)
      toast({
        title: err.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  return (
    <Box h="90vh" w="100%">
      <Flex>
        <AdminNav />
        <Flex w="70%" direction="column" my={5} mx={10}>
          <Heading color="blue">Create a product</Heading>
          <Flex as="form" direction="column" onSubmit={handleSubmit}>
            <Flex
              direction={{ lg: 'row', base: 'column' }}
              justifyContent="space-between"
              my={4}
            >
              <Box w={{ lg: '45%', base: '90%' }}>
                <FormLabel mt={2} color="gray">
                  Title
                </FormLabel>
                <Input
                  name="title"
                  value={title}
                  onChange={handleChange}
                  placeholder="title"
                />
                <FormLabel mt={2} color="gray">
                  Description
                </FormLabel>
                <Input
                  name="description"
                  value={description}
                  onChange={handleChange}
                  placeholder="description"
                />
                <FormLabel color="gray" mt={2}>
                  Price
                </FormLabel>
                <Input
                  type="number"
                  name="price"
                  value={price}
                  onChange={handleChange}
                  placeholder="price"
                />
                <Text color="gray" fontSize="md" fontWeight="600" mt={2}>
                  Shipping
                </Text>
                <Select
                  name="shipping"
                  variant="flushed"
                  placeholder="Please select"
                  onChange={handleChange}
                >
                  <option value="Yes">YES</option>
                  <option value="No">NO</option>
                </Select>
              </Box>

              <Box w={{ lg: '45%', base: '90%' }}>
                <FormLabel color="gray" mt={2}>
                  Quantity
                </FormLabel>
                <Input
                  type="number"
                  name="quantity"
                  value={quantity}
                  onChange={handleChange}
                  placeholder="quantity"
                />
                <Text color="gray" fontSize="md" fontWeight="600" mt={2}>
                  Color
                </Text>
                <Select
                  name="color"
                  variant="flushed"
                  placeholder="Please select"
                  onChange={handleChange}
                >
                  {colors.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </Select>

                <Flex direction="column">
                  <Text color="gray" fontSize="md" fontWeight="600" mt={2}>
                    Brand
                  </Text>
                  <Select
                    name="brand"
                    variant="flushed"
                    placeholder="Please select"
                    onChange={handleChange}
                  >
                    {brands.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </Select>
                </Flex>
              </Box>
            </Flex>
            <Button
              type="submit"
              w="30%"
              // isDisabled={!name}
              // isLoading={loading}
              variant="outline"
              colorScheme="blue"
            >
              Save
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  )
}

export default ProductCreate
