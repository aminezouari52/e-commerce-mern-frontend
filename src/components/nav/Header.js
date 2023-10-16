// REACT
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Divider, useToast } from "@chakra-ui/react";

// FIREBASE
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../reducers/userReducer";

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
  Badge,
} from "@chakra-ui/react";

// ICONS
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineUserAdd,
  AiOutlineUser,
} from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import Search from "../forms/Search";
import { BsCart } from "react-icons/bs";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { BsClockHistory } from "react-icons/bs";

const Header = () => {
  const toast = useToast();
  const navigate = useNavigate();
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
    <Flex justifyContent="space-between" w="100%" borderBottom="solid 1px #ccc">
      <Flex>
        <NavLink
          height="100%"
          to="/"
          style={({ isActive }) => ({
            color: isActive ? "blue" : "#000",
            fill: isActive ? "#adb5bd" : "#000",
            borderBottom: isActive && "2px solid blue",
            transition: "border-color ease-in-out 0.3s",
          })}
        >
          <Button
            _hover={{ color: "blue" }}
            variant="transparent-with-icon"
            leftIcon={<Icon as={AiOutlineHome} />}
            size="lg"
          >
            <Text>Home</Text>
          </Button>
        </NavLink>
        <NavLink
          height="100%"
          to="/shop"
          style={({ isActive }) => ({
            color: isActive ? "blue" : "#000",
            fill: isActive ? "#adb5bd" : "#000",
            borderBottom: isActive && "2px solid blue",
            transition: "border-color ease-in-out 0.3s",
          })}
        >
          <Button
            _hover={{ color: "blue" }}
            variant="transparent-with-icon"
            leftIcon={<Icon as={AiOutlineShopping} />}
            size="lg"
          >
            <Text>Shop</Text>
          </Button>
        </NavLink>
        <NavLink
          height="100%"
          to="/cart"
          style={({ isActive }) => ({
            color: isActive ? "blue" : "#000",
            fill: isActive ? "#adb5bd" : "#000",
            borderBottom: isActive && "2px solid blue",
            transition: "border-color ease-in-out 0.3s",
          })}
        >
          <Button
            _hover={{ color: "blue" }}
            variant="transparent-with-icon"
            leftIcon={<Icon as={BsCart} />}
            size="lg"
          >
            <Flex alignItems="start">
              <Text>Cart</Text>
              <Badge borderRadius="50%" colorScheme="red" variant="solid">
                {cart?.length}
              </Badge>
            </Flex>
          </Button>
        </NavLink>
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
                colorScheme="blue"
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
            <NavLink
              to="/register"
              style={({ isActive }) => ({
                display: "flex",
                alignItems: "center",
                color: isActive ? "blue" : "#000",
                fill: isActive ? "#adb5bd" : "#000",
                borderBottom: isActive && "2px solid blue",
                transition: "border-color ease-in-out 0.3s",
              })}
            >
              <Button
                _hover={{ color: "blue" }}
                variant="transparent-with-icon"
                leftIcon={<Icon as={AiOutlineUserAdd} />}
              >
                <Text>Register</Text>
              </Button>
            </NavLink>
            <NavLink
              to="/login"
              style={({ isActive }) => ({
                display: "flex",
                alignItems: "center",
                color: isActive ? "blue" : "#000",
                fill: isActive ? "#adb5bd" : "#000",
                borderBottom: isActive && "2px solid blue",
                transition: "border-color ease-in-out 0.3s",
              })}
            >
              <Button
                _hover={{ color: "blue" }}
                variant="transparent-with-icon"
                leftIcon={<Icon as={AiOutlineUser} />}
              >
                <Text>Login</Text>
              </Button>
            </NavLink>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default Header;
