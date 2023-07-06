// REACT
import { useState, useEffect, useRef } from 'react'
import { useToast, useDisclosure } from '@chakra-ui/react'

// REDUX
import { useSelector } from 'react-redux'

// FUNCTIONS
import { getCategories } from '../../../functions/category'
import { getSubs, createSub, removeSub } from '../../../functions/sub'

// COMPONENTS
import AdminNav from '../../../components/nav/AdminNav'
import CategoryForm from '../../../components/forms/CategoryForm'
import LocalSearch from '../../../components/forms/LocalSearch'

// STYLE
import {
  Flex,
  Box,
  Button,
  Heading,
  Icon,
  Text,
  Select,
  AlertDialogOverlay,
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

// ICONS
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'

const SubCreate = () => {
  // LOGGED IN USER
  const user = useSelector((state) => state.user.loggedInUser)

  // STATES
  const [name, setName] = useState('')
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState('')
  const [subs, setSubs] = useState([])
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const toast = useToast()

  // DELETE DIALOG
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()

  // SEARCH
  const [keyword, setKeyword] = useState('')
  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword)

  // LOAD STATES
  const loadCategories = () => {
    getCategories().then((c) => setCategories(c.data))
  }
  const loadSubs = () => getSubs().then((s) => setSubs(s.data))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await createSub({ name, parent: category }, user.token)
      setLoading(false)
      setName('')
      toast({
        title: `"${res.data.name}" is created!`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      loadSubs()
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
  const handleRemove = async (slug) => {
    setLoading(true)
    try {
      const res = await removeSub(slug, user.token)
      setLoading(false)
      toast({
        title: `"${res.data.name}" deleted`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      loadSubs()
    } catch (err) {
      console.log(err)
      setLoading(false)
      toast({
        title: err.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
    onClose()
  }

  useEffect(() => {
    loadCategories()
    loadSubs()
  }, [])

  return (
    <Flex w="70%" direction="column" h="calc(100vh - 49px)" mx={10}>
      <Heading color="blue" my={5}>
        Create a sub category
      </Heading>
      <Flex direction="column" mb={4}>
        <Text color="gray" fontSize="md" fontWeight="600">
          Parent category
        </Text>
        <Select
          variant="flushed"
          placeholder="Please select"
          onChange={(e) => setCategory(e.target.value)}
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
        label="Sub category"
        name={name}
        setName={setName}
        handleSubmit={handleSubmit}
        loading={loading}
      />
      <LocalSearch keyword={keyword} setKeyword={setKeyword} />
      <Text color="gray" fontSize="xl" fontWeight="600" my={2}>
        All sub categories
      </Text>
      <Flex direction="column">
        {subs.filter(searched(keyword)).map((s) => (
          <Flex
            justifyContent="space-between"
            key={s._id}
            bg="gray.200"
            my={2}
            py={2}
            px={4}
          >
            <Text>{s.name}</Text>

            <Flex>
              <Button
                size="sm"
                colorScheme="yellow"
                mr={2}
                onClick={() => navigate(`/admin/sub/${s.slug}`)}
              >
                <Icon as={AiFillEdit} />
              </Button>
              <Button size="sm" colorScheme="red" onClick={() => onOpen()}>
                <Icon as={AiFillDelete} />
              </Button>
              <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
              >
                <AlertDialogOverlay bgColor="rgba(0, 0, 0, 0.2)">
                  <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                      Delete Sub Category
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
                        onClick={() => handleRemove(s.slug)}
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
    </Flex>
  )
}

export default SubCreate
