// COMPONENTS
import UserNav from '../../components/nav/UserNav'

// STYLE
import { Flex, Box } from '@chakra-ui/react'

const History = () => (
  <Box w="100%">
    <Flex>
      <UserNav />
      <Box my={5} mx={10}>
        User History Page
      </Box>
    </Flex>
  </Box>
)

export default History
