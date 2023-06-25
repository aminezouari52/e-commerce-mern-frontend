// REACT
import { useState, useEffect } from 'react'
import { useToast } from '@chakra-ui/react'
import { useNavigate, NavLink } from 'react-router-dom'

// FIREBASE
import { auth, googleAuthProvider } from '../../firebase'
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'

// REDUX
import { useDispatch, useSelector } from 'react-redux'
import { setLoggedInUser } from '../../reducers/userReducer'

// FUNCTIONS
import { createOrUpdateUser } from '../../functions/auth'

// STYLE
import { Flex, Heading, Input, Button, Link, Text } from '@chakra-ui/react'

// ICONS
import { AiOutlineMail } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'

const Login = () => {
  // HOOKS
  const toast = useToast()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  // CHECK IF USER EXISTS
  const loggedInUser = useSelector((state) => state.user.loggedInUser)
  useEffect(() => {
    if (loggedInUser && loggedInUser.token) {
      if (loggedInUser.role === 'admin') {
        navigate('/admin/dashboard')
      } else {
        navigate('/user/history')
      }
    }
  }, [loggedInUser, navigate])

  // REDIRECT FUNCTION
  const roleBasedRedirect = (res) => {
    if (res.data.role === 'admin') {
      navigate('/admin/dashboard')
    } else {
      navigate('/user/history')
    }
  }
  // SUBMIT FUNCTION
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      const { user } = result
      const idTokenResult = await user.getIdTokenResult()

      // create user in database
      try {
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
        roleBasedRedirect(res)
      } catch (err) {
        console.log(err)
      }
    } catch (error) {
      console.log(error)
      toast({
        title: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      setLoading(false)
    }
  }

  // LOGIN WITH GOOGLE
  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider)
      const { user } = result
      const idTokenResult = await user.getIdTokenResult()

      // create user in database
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
      roleBasedRedirect(res)
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

  const loginForm = (
    <Flex
      as="form"
      direction="column"
      w="100%"
      maxW="350px"
      minWidth="250px"
      onSubmit={handleSubmit}
    >
      <Flex direction="column" alignItems="end" mb={2}>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          autoFocus
        />

        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Your password"
          my={2}
        />
        <Link
          as={NavLink}
          to="/forgot-password" // Replace with your actual forgot password route
          color="blue"
          _hover={{ textDecoration: 'underline' }}
          fontSize="sm"
        >
          Forgot password?
        </Link>
      </Flex>
      <Button
        type="submit"
        leftIcon={<AiOutlineMail />}
        isDisabled={!email || password.length < 6}
        isLoading={loading}
        colorScheme="blue"
        mb={2}
      >
        Login with Email/Password
      </Button>
      <Button onClick={googleLogin} leftIcon={<FcGoogle />} colorScheme="gray">
        Login with Google
      </Button>

      <Flex my={2}>
        <Text color="gray" mr={1}>
          Dont have an account?
        </Text>
        <Link
          as={NavLink}
          to="/register"
          color="blue"
          fontWeight="semibold"
          _hover={{ textDecoration: 'underline' }}
        >
          Register
        </Link>
      </Flex>
    </Flex>
  )
  return (
    <Flex justifyContent="center" alignItems="center" w="100%" h="90vh">
      <Flex direction="column" alignItems="center" w="30%">
        <Heading mb={6} color="blue">
          Login Account
        </Heading>
        {loginForm}
      </Flex>
    </Flex>
  )
}

export default Login
