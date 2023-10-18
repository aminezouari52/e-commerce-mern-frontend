// REACT
import { useNavigate, useLocation } from "react-router-dom";
import { useToast, useDisclosure } from "@chakra-ui/react";

// FIREBASE
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../reducers/userReducer";

// COMPONENTS
import Search from "../forms/Search";

// STYLE
import {
  Box,
  Flex,
  Text,
  Button,
  Icon,
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
  Badge,
  Divider,
} from "@chakra-ui/react";

// ICONS
import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineUserAdd,
  AiOutlineUser,
} from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { BsCart, BsClockHistory } from "react-icons/bs";
import { MdOutlineSpaceDashboard } from "react-icons/md";

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.loggedInUser);
  const cart = useSelector((state) => state.cart.cart.cartItems);

  const logoutHandler = async () => {
    try {
      await signOut(auth);
      dispatch(logout(null));
      navigate("/login");
    } catch (err) {
      toast({
        title: "Logout failed!",
        description: err.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex
      justifyContent="space-between"
      w="100%"
      borderBottom="solid 1px #ccc"
      height="40px"
    >
      <Flex alignItems="center">
        <Box display={{ lg: "none", md: "none", sm: "none", base: "block" }}>
          <Menu>
            <MenuButton
              as={Button}
              colorScheme="black"
              variant="ghost"
              size="lg"
            >
              <HamburgerIcon colorScheme="black" variant="ghost" />
            </MenuButton>
            <MenuList>
              <MenuItem>
                <Button
                  variant="transparent-with-icon"
                  leftIcon={<Icon as={AiOutlineHome} />}
                  _hover={{ color: "blue" }}
                  style={{
                    color: location.pathname === "/" ? "blue" : "#000",
                    fill: location.pathname === "/" ? "#adb5bd" : "#000",
                    transition: "border-color ease-in-out 0.3s",
                    borderRadius: "0px",
                  }}
                  onClick={() => navigate("/")}
                >
                  <Text>Home</Text>
                </Button>
              </MenuItem>
              <MenuItem>
                <Button
                  variant="transparent-with-icon"
                  leftIcon={<Icon as={AiOutlineShopping} />}
                  _hover={{ color: "blue" }}
                  style={{
                    color: location.pathname === "/shop" ? "blue" : "#000",
                    fill: location.pathname === "/shop" ? "#adb5bd" : "#000",
                    transition: "border-color ease-in-out 0.3s",
                    borderRadius: "0px",
                  }}
                  onClick={() => navigate("/shop")}
                >
                  <Text>Shop</Text>
                </Button>
              </MenuItem>
              <MenuItem>
                <Button
                  variant="transparent-with-icon"
                  leftIcon={<Icon as={BsCart} />}
                  _hover={{ color: "blue" }}
                  style={{
                    color: location.pathname === "/cart" ? "blue" : "#000",
                    fill: location.pathname === "/cart" ? "#adb5bd" : "#000",
                    transition: "border-color ease-in-out 0.3s",
                    borderRadius: "0px",
                  }}
                  onClick={() => navigate("/cart")}
                >
                  <Flex alignItems="start">
                    <Text>Cart</Text>
                    <Badge borderRadius="50%" colorScheme="red" variant="solid">
                      {cart?.length}
                    </Badge>
                  </Flex>
                </Button>
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>

        <Button
          display={{ lg: "flex", md: "flex", sm: "flex", base: "none" }}
          height="100%"
          variant="transparent-with-icon"
          leftIcon={<Icon as={AiOutlineHome} />}
          size="sm"
          _hover={{ color: "blue" }}
          style={{
            color: location.pathname === "/" ? "blue" : "#000",
            fill: location.pathname === "/" ? "#adb5bd" : "#000",
            borderBottom: location.pathname === "/" && "2px solid blue",
            transition: "border-color ease-in-out 0.3s",
            borderRadius: "0px",
          }}
          onClick={() => navigate("/")}
        >
          <Text>Home</Text>
        </Button>

        <Button
          display={{ lg: "flex", md: "flex", sm: "flex", base: "none" }}
          height="100%"
          variant="transparent-with-icon"
          size="sm"
          leftIcon={<Icon as={AiOutlineShopping} />}
          _hover={{ color: "blue" }}
          style={{
            color: location.pathname === "/shop" ? "blue" : "#000",
            fill: location.pathname === "/shop" ? "#adb5bd" : "#000",
            borderBottom: location.pathname === "/shop" && "2px solid blue",
            transition: "border-color ease-in-out 0.3s",
            borderRadius: "0px",
          }}
          onClick={() => navigate("/shop")}
        >
          <Text>Shop</Text>
        </Button>

        <Button
          display={{ lg: "flex", md: "flex", sm: "flex", base: "none" }}
          height="100%"
          size="sm"
          variant="transparent-with-icon"
          leftIcon={<Icon as={BsCart} />}
          _hover={{ color: "blue" }}
          style={{
            color: location.pathname === "/cart" ? "blue" : "#000",
            fill: location.pathname === "/cart" ? "#adb5bd" : "#000",
            borderBottom: location.pathname === "/cart" && "2px solid blue",
            transition: "border-color ease-in-out 0.3s",
            borderRadius: "0px",
          }}
          onClick={() => navigate("/cart")}
        >
          <Flex alignItems="start">
            <Text>Cart</Text>
            <Badge borderRadius="50%" colorScheme="red" variant="solid">
              {cart?.length}
            </Badge>
          </Flex>
        </Button>
      </Flex>

      <Flex>
        <Flex alignItems="center">
          <Search />
        </Flex>
        {user ? (
          <Flex alignItems="center" mx={2}>
            <Menu>
              <MenuButton
                as={Button}
                colorScheme="black"
                variant="ghost"
                size="sm"
                fontWeight="bold"
                rightIcon={<ChevronDownIcon />}
              >
                {user.email && user.email.split("@")[0]}
              </MenuButton>
              <MenuList>
                <MenuItem
                  variant="transparent"
                  onClick={() =>
                    navigate(
                      user.role === "admin"
                        ? "/admin/dashboard"
                        : "/user/history"
                    )
                  }
                  icon={
                    <Icon
                      h="15px"
                      w="15px"
                      as={
                        user.role === "admin"
                          ? MdOutlineSpaceDashboard
                          : BsClockHistory
                      }
                    />
                  }
                >
                  {user.role === "admin" ? "Dashboard" : "History"}
                </MenuItem>
                <Divider />
                <MenuItem
                  icon={<Icon h="15px" w="15px" as={FiLogOut} />}
                  onClick={logoutHandler}
                >
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        ) : (
          <Flex>
            <Button
              height="100%"
              variant="transparent-with-icon"
              leftIcon={<Icon as={AiOutlineUserAdd} />}
              size="sm"
              _hover={{ color: "blue" }}
              style={{
                color: location.pathname === "/register" ? "blue" : "#000",
                fill: location.pathname === "/register" ? "#adb5bd" : "#000",
                borderBottom:
                  location.pathname === "/register" && "2px solid blue",
                transition: "border-color ease-in-out 0.3s",
                borderRadius: "0px",
              }}
              onClick={() => navigate("/register")}
            >
              <Text>Register</Text>
            </Button>
            <Button
              _hover={{ color: "blue" }}
              variant="transparent-with-icon"
              leftIcon={<Icon as={AiOutlineUser} />}
              size="sm"
              style={{
                color: location.pathname === "/login" ? "blue" : "#000",
                fill: location.pathname === "/login" ? "#adb5bd" : "#000",
                borderBottom:
                  location.pathname === "/login" && "2px solid blue",
                transition: "border-color ease-in-out 0.3s",
                borderRadius: "0px",
              }}
              onClick={() => navigate("/login")}
            >
              <Text>Login</Text>
            </Button>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default Header;
