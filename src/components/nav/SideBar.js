// HOOKS
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

// STYLE
import { Box, Button, Icon, Stack } from "@chakra-ui/react";

// ICONS
import { AiFillLock } from "react-icons/ai";
import { BsClockHistory } from "react-icons/bs";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { BiCube } from "react-icons/bi";
import { GrCubes } from "react-icons/gr";
import { FaListUl } from "react-icons/fa";
import { MdSubject } from "react-icons/md";
const SideBar = () => {
  const location = useLocation();
  const user = useSelector((state) => state.user.loggedInUser);

  const sideBarElements =
    user && user?.role === "admin"
      ? [
          {
            title: "Dashboard",
            icon: <Icon as={MdOutlineSpaceDashboard} mr={2} />,
            link: "/admin/dashboard",
          },
          {
            title: "Product",
            icon: <Icon as={BiCube} mr={2} />,
            link: "/admin/product",
          },
          {
            title: "Products",
            icon: <Icon as={GrCubes} mr={2} />,
            link: "/admin/products",
          },
          {
            title: "Category",
            icon: <Icon as={FaListUl} mr={2} />,
            link: "/admin/category",
          },
          {
            title: "Sub category",
            icon: <Icon as={MdSubject} mr={2} />,
            link: "/admin/sub",
          },
        ]
      : [
          {
            title: "History",
            icon: <Icon as={BsClockHistory} mr={2} />,
            link: "/user/history",
          },
          {
            title: "Password",
            icon: <Icon as={AiFillLock} mr={2} />,
            link: "/user/password",
          },
        ];

  const navigate = useNavigate();

  return (
    <Stack spacing={4} direction="column" p={4} w="200px">
      {sideBarElements.map((element) => (
        <Button
          key={element.title}
          color="#000"
          colorScheme="transparent"
          justifyContent="start"
          _hover={{
            bg: "blue.400",
          }}
          bg={location.pathname === element.link && "blue.400"}
          onClick={() => navigate(element.link)}
          size={{ lg: "md", md: "md", sm: "md", base: "xs" }}
        >
          {element.icon}
          <Box>{element.title}</Box>
        </Button>
      ))}
    </Stack>
  );
};
export default SideBar;
