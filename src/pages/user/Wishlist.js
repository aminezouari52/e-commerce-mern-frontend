// COMPONENTS
import UserNav from '../../components/nav/UserNav'

// STYLE
import { Flex, Box } from '@chakra-ui/react'

const Wishlist = () => (
  <Box w="100%">
    <Flex>
      <UserNav />
      <Box my={5} mx={10}>
        user Wishlist page
      </Box>
    </Flex>
  </Box>
)

export default Wishlist
