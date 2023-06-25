// REACT
import { useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import { useToast } from '@chakra-ui/react'

// REDUX
import { useDispatch } from 'react-redux'
import { setLoggedInUser } from '../../reducers/userReducer'

// FIREBASE
import { auth } from '../../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'

// FUNCTIONS
import { createOrUpdateUser } from '../../functions/auth'

// STYLE
import { Flex, Input, Button, Heading, Text, Link } from '@chakra-ui/react'

const Register = () => {
  let dispatch = useDispatch()
  const navigate = useNavigate()
  const toast = useToast()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    // validation
    if (!email || !password) {
      toast({
        title: 'Email and password is required',
        // description: "We've created your account for you.",
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return
    }
    if (password.length < 6) {
      toast({
        title: 'Password must be at least 6 characters long',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    // create user
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      // get user id token
      const user = userCredential.user
      const idTokenResult = await user.getIdTokenResult()

      // redux store
      console.log('user', user, 'idTokenResult', idTokenResult)
      const res = await createOrUpdateUser(idTokenResult.token)
      dispatch(
        setLoggedInUser({
          name: res.data.name,
          email: res.data.email,
          token: idTokenResult.token,
          role: res.data.role,
          _id: res.data._id,
        })
      )

      // redirect
      navigate('/')
      toast({
        title: 'Account created successfully!',
        // description: "We've created your account for you.",
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } catch (error) {
      console.log(error)
      toast({
        title: error.message,
        // description: "We've created your account for you.",
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  const registerForm = (
    <Flex
      as="form"
      onSubmit={handleSubmit}
      direction="column"
      w="100%"
      maxW="350px"
      minWidth="250px"
    >
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
        autoFocus
        mb={2}
      />

      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        mb={2}
      />

      <Button type="submit" colorScheme="blue">
        Register
      </Button>
      <Flex my={2}>
        <Text color="gray" mr={1}>
          Already have an account?
        </Text>
        <Link
          as={NavLink}
          to="/login"
          color="blue"
          fontWeight="semibold"
          _hover={{ textDecoration: 'underline' }}
        >
          Login
        </Link>
      </Flex>
    </Flex>
  )

  return (
    <Flex justifyContent="center" alignItems="center" w="100%" h="90vh">
      <Flex direction="column" alignItems="center" w="30%">
        <Heading mb={6} color="blue">
          Create Account
        </Heading>
        {registerForm}
      </Flex>
    </Flex>
  )
}

export default Register
