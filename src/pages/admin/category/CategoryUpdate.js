// REACT
import { useState, useEffect } from 'react'
import { useToast } from '@chakra-ui/react'

// REDUX
import { useSelector } from 'react-redux'

// FUNCTIONS
import { getCategory, updateCategory } from '../../../functions/category'

// COMPONENTS
import AdminNav from '../../../components/nav/AdminNav'

// STYLE
import { Flex, Box, Heading } from '@chakra-ui/react'
import { useNavigate, useParams } from 'react-router-dom'
import CategoryForm from '../../../components/forms/CategoryForm'

const CategoryUpdate = () => {
  const params = useParams()
  const navigate = useNavigate()
  const toast = useToast()

  // LOGGED IN USER
  const user = useSelector((state) => state.user.loggedInUser)

  // STATE
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getCategory(params.slug).then((c) => setName(c.data.name))
  }, [params.slug])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await updateCategory(params.slug, { name }, user.token)
      setLoading(false)
      setName('')
      toast({
        title: `"${res.data.name}" is updated`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      navigate('/admin/category')
    } catch (err) {
      setLoading(false)
      toast({
        title: err.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  return (
    <Box w="100%" h="90vh">
      <Flex>
        <AdminNav />
        <Flex w="70%" direction="column" my={5} mx={10}>
          <Heading mb={6} color="blue">
            Update a Category
          </Heading>
          <CategoryForm
            label="category"
            name={name}
            setName={setName}
            handleSubmit={handleSubmit}
            loading={loading}
          />
        </Flex>
      </Flex>
    </Box>
  )
}

export default CategoryUpdate
