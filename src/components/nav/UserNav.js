// REACT
import { useNavigate } from 'react-router-dom'

// STYLE
import { Box, Button, Icon, Flex, Stack } from '@chakra-ui/react'

// ICONS
import { MdOutlineSpaceDashboard } from 'react-icons/md'

const navElements = [
  {
    title: 'History',
    icon: <Icon as={MdOutlineSpaceDashboard} mr={2} />,
    link: '/user/history',
  },
  {
    title: 'Password',
    icon: (
      <Box mr={4} fill="tertiary.500">
        {/* <UsersIcon height="20px" width="20px" /> */}
      </Box>
    ),
    link: '/user/password',
  },
  {
    title: 'Wishlist',
    icon: (
      <Box mr={4}>
        {/* <CalendarIcon color="primary.500" h="20px" w="20px" /> */}
      </Box>
    ),
    link: '/user/wishlist',
  },
]

const UserNav = () => {
  const navigate = useNavigate()

  return (
    // <Box>
    //   <VStack align="start" spacing={2}>
    //     <Button variant="link" colorScheme="blue">
    //       <Link as={RouterLink} to="/user/history">
    //         History
    //       </Link>
    //     </Button>

    //     <Button variant="link" colorScheme="blue">
    //       <Link as={RouterLink} to="/user/password">
    //         Password
    //       </Link>
    //     </Button>

    //     <Button variant="link" colorScheme="blue">
    //       <Link as={RouterLink} to="/user/wishlist">
    //         Wishlist
    //       </Link>
    //     </Button>
    //   </VStack>
    // </Box>
    <Box w="200px" h="100vh" bg="gray.100" p={4}>
      <Flex
        direction="column"
        justifyContent="center"
        alignItems="start"
        mb="4"
      ></Flex>
      <Stack spacing={4} direction="column">
        {navElements.map((element) => (
          <Button
            key={element.title}
            color="#000"
            colorScheme="transparent"
            justifyContent="start"
            _hover={{
              bg: 'blue.400',
            }}
            onClick={() => navigate(element.link)}
          >
            {element.icon}
            <Box>{element.title}</Box>
          </Button>
        ))}
      </Stack>
    </Box>
  )
}
export default UserNav
