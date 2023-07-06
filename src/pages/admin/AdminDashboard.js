// COMPONENTS
import AdminNav from '../../components/nav/AdminNav'

// STYLE
import { Flex, Box, Heading } from '@chakra-ui/react'

const AdminDashboard = () => {
  return (
    <Box h="calc(100vh - 49px)" mx={10}>
      <Heading mb={6} color="blue" mt={5}>
        Admin dashboard
      </Heading>
    </Box>
  )
}
export default AdminDashboard
