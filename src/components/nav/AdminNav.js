// REACT
import { useNavigate } from "react-router-dom";

// STYLE
import { Box, Button, Icon, Flex, Stack } from "@chakra-ui/react";

// ICONS
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { BiCube } from "react-icons/bi";
import { GrCubes } from "react-icons/gr";
import { FaListUl } from "react-icons/fa";
import { MdSubject } from "react-icons/md";

const navElements = [
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
];

const AdminNav = () => {
  const navigate = useNavigate();

  return (
    <Stack spacing={4} direction="column" p={4} w="200px">
      {navElements.map((element) => (
        <Button
          key={element.title}
          color="#000"
          colorScheme="transparent"
          justifyContent="start"
          _hover={{
            bg: "blue.400",
          }}
          onClick={() => navigate(element.link)}
        >
          {element.icon}
          <Box>{element.title}</Box>
        </Button>
      ))}
    </Stack>
  );
};
export default AdminNav;
