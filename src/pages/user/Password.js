// REACT
import { useState } from 'react'
import { useToast } from '@chakra-ui/react'

// FIREBASE
import { auth } from '../../firebase'
import { updatePassword } from 'firebase/auth'

// COMPONENTS
import UserNav from '../../components/nav/UserNav'

// STYLE
import { Flex, Box, Heading, Input, Button } from '@chakra-ui/react'

const Password = () => {
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // FIREBASE
    try {
      await updatePassword(auth.currentUser, password)
      setLoading(false)
      setPassword('')
      toast({
        title: 'Password updated!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
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

  const passwordUpdateForm = (
    <Flex
      as="form"
      direction="column"
      w="100%"
      maxW="350px"
      minWidth="250px"
      onSubmit={handleSubmit}
    >
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Your new password"
        mb={2}
      />

      <Button
        type="submit"
        isDisabled={!password || password.length < 6 || loading}
        isLoading={loading}
        colorScheme="blue"
        mb={2}
      >
        Submit
      </Button>
    </Flex>
  )
  return (
    <Box w="100%">
      <Flex>
        <UserNav />
        <Flex w="70%" direction="column" alignItems="center" my={5} mx={10}>
          <Heading mb={6}>Update Password</Heading>
          {passwordUpdateForm}
        </Flex>
      </Flex>
    </Box>
  )
}

export default Password
