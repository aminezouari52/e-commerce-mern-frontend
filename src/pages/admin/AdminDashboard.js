// COMPONENTS
import AdminNav from '../../components/nav/AdminNav'

// STYLE
import { Flex, Box } from '@chakra-ui/react'

const AdminDashboard = () => (
  <Box w="100%">
    <Flex>
      <AdminNav />
      <Box my={5} mx={10}>
        Admin Dashboard
      </Box>
    </Flex>
  </Box>
)

export default AdminDashboard
