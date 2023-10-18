// REACT
import { Outlet } from "react-router-dom";

// REDUX
import { useSelector } from "react-redux";

// COMPONENTS
import LoadingToRedirect from "./LoadingToRedirect";
import SideBar from "../nav/SideBar";
import { Flex, Box } from "@chakra-ui/react";

const UserRoute = () => {
  const user = useSelector((state) => state.user.loggedInUser);

  return user && user.token ? (
    <Flex h="calc(100vh - 40px)">
      <Box
        w="200px"
        // display={{ lg: "block", md: "block", sm: "block", base: "none" }}
      >
        <SideBar />
      </Box>
      <Box w="100%" overflowX="hidden" bg="#e9ecef">
        <Box px={5} h="100%">
          <Outlet />
        </Box>
      </Box>
    </Flex>
  ) : (
    <LoadingToRedirect />
  );
};

export default UserRoute;
