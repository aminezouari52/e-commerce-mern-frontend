// REACT
import { useNavigate } from "react-router-dom";

// STYLE
import { Box, Button, Icon, Flex, Stack } from "@chakra-ui/react";

// ICONS
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { AiFillLock } from "react-icons/ai";
import { BsClockHistory } from "react-icons/bs";

const navElements = [
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

const UserNav = () => {
  const navigate = useNavigate();

  return (
    <Box w="200px" h="calc(100vh - 49px)" bg="gray.100" p={4}>
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
              bg: "blue.400",
            }}
            onClick={() => navigate(element.link)}
          >
            {element.icon}
            <Box>{element.title}</Box>
          </Button>
        ))}
      </Stack>
    </Box>
  );
};
export default UserNav;
