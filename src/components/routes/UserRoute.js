// REACT
import { Outlet } from "react-router-dom";

// REDUX
import { useSelector } from "react-redux";

// COMPONENTS
import LoadingToRedirect from "./LoadingToRedirect";
import UserNav from "../nav/UserNav";
import { Flex, Box } from "@chakra-ui/react";

const UserRoute = () => {
  const user = useSelector((state) => state.user.loggedInUser);

  return user && user.token ? (
    <>
      <Flex>
        <UserNav />
        <Box w="100%" overflowX="hidden" overflowY="hidden">
          <Outlet />
        </Box>
      </Flex>
    </>
  ) : (
    <LoadingToRedirect />
  );
};

export default UserRoute;
