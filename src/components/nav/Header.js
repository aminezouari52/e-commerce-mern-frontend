// REACT
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Divider, useToast } from '@chakra-ui/react'

// FIREBASE
import { auth } from '../../firebase'
import { signOut } from 'firebase/auth'

// REDUX
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../reducers/userReducer'

// STYLE
import {
  Flex,
  Text,
  Button,
  Icon,
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'

// ICONS
import { ChevronDownIcon } from '@chakra-ui/icons'
import { CiSettings } from 'react-icons/ci'
import {
  AiOutlineAppstore,
  AiOutlineUserAdd,
  AiOutlineUser,
} from 'react-icons/ai'
import { FiLogOut } from 'react-icons/fi'

const Header = () => {
  const toast = useToast()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.loggedInUser)

  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const handleMenuOpen = () => {
    setIsOpen(true)
  }
  const handleMenuClose = () => {
    setIsOpen(false)
  }

  const logoutHandler = async () => {
    try {
      await signOut(auth)
      dispatch(logout(null))
      navigate('/login')
    } catch (err) {
      toast({
        title: 'Logout failed!',
        description: err.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  return (
    <Flex justifyContent="space-between" w="100%" borderBottom="solid 1px #ccc">
      <NavLink
        height="100%"
        to="/"
        style={({ isActive }) => ({
          color: isActive ? 'blue' : '#000',
          fill: isActive ? '#adb5bd' : '#000',
          borderBottom: isActive && '2px solid blue',
          transition: 'border-color ease-in-out 0.3s',
        })}
      >
        <Button
          _hover={{ color: 'blue' }}
          fontSize={{ lg: '16px', base: '12px' }}
          variant="transparent-with-icon"
          leftIcon={<Icon as={AiOutlineAppstore} />}
        >
          <Text>Home</Text>
        </Button>
      </NavLink>
      {user && (
        <Menu isOpen={isOpen} onClose={handleMenuClose}>
          <MenuButton
            as={Button}
            leftIcon={<Icon as={CiSettings} />}
            rightIcon={<ChevronDownIcon />}
            onMouseEnter={handleMenuOpen}
            _hover={{ color: 'blue' }} // Remove hover styles
            _active={{ color: 'blue' }} // Remove active styles
            _focus={{}} // Remove focus styles
            backgroundColor="transparent" // Remove background color
          >
            {user.email && user.email.split('@')[0]}
          </MenuButton>
          <MenuList onMouseLeave={handleMenuClose}>
            {user.role === 'admin' && (
              <MenuItem
                as={NavLink}
                to="/admin/dashboard"
                _hover={{ bg: 'none' }}
                style={({ isActive }) => ({
                  color: isActive ? 'blue' : '#000',
                })}
              >
                <Button
                  _hover={{ color: 'blue', bg: 'none' }}
                  fontSize={{ lg: '16px', base: '12px' }}
                  variant="transparent"
                >
                  <Text>Dashboard</Text>
                </Button>
              </MenuItem>
            )}

            {user.role === 'subscriber' && (
              <MenuItem
                as={NavLink}
                to="/user/history"
                _hover={{ bg: 'none' }}
                style={({ isActive }) => ({
                  color: isActive ? 'blue' : '#000',
                })}
              >
                <Button
                  _hover={{ color: 'blue', bg: 'none' }}
                  fontSize={{ lg: '16px', base: '12px' }}
                  variant="transparent"
                >
                  <Text>Dashboard</Text>
                </Button>
              </MenuItem>
            )}
            <Divider />
            <MenuItem
              as={Button}
              icon={<Icon h="15px" w="15px" as={FiLogOut} />}
              _hover={{ color: 'blue', bg: 'none' }}
              fontSize={{ lg: '16px', base: '12px' }}
              onClick={logoutHandler}
            >
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      )}
      {!user && (
        <Flex>
          <NavLink
            to="/register"
            style={({ isActive }) => ({
              color: isActive ? 'blue' : '#000',
              fill: isActive ? '#adb5bd' : '#000',
              borderBottom: isActive && '2px solid blue',
              transition: 'border-color ease-in-out 0.3s',
            })}
          >
            <Button
              _hover={{ color: 'blue' }}
              fontSize={{ lg: '16px', base: '12px' }}
              variant="transparent-with-icon"
              leftIcon={<Icon as={AiOutlineUserAdd} />}
            >
              <Text>Register</Text>
            </Button>
          </NavLink>
          <NavLink
            to="/login"
            style={({ isActive }) => ({
              color: isActive ? 'blue' : '#000',
              fill: isActive ? '#adb5bd' : '#000',
              borderBottom: isActive && '2px solid blue',
              transition: 'border-color ease-in-out 0.3s',
            })}
          >
            <Button
              _hover={{ color: 'blue' }}
              fontSize={{ lg: '16px', base: '12px' }}
              variant="transparent-with-icon"
              leftIcon={<Icon as={AiOutlineUser} />}
            >
              <Text>Login</Text>
            </Button>
          </NavLink>
        </Flex>
      )}
    </Flex>
  )
}

export default Header
