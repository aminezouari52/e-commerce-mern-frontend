// REACT
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

// REDUX
import { useSelector } from "react-redux";

// FUNCTIONS
import { currentAdmin } from "../../functions/auth";

// COMPONENTS
import LoadingToRedirect from "./LoadingToRedirect";
import AdminNav from "../nav/AdminNav";

// STYLE
import { Box, Flex } from "@chakra-ui/react";

const AdminRoute = () => {
  const user = useSelector((state) => state.user.loggedInUser);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (user && user.token) {
      currentAdmin(user.token)
        .then((res) => {
          setOk(true);
        })
        .catch((err) => {
          setOk(false);
        });
    }
  }, [user]);

  return ok ? (
    <Flex>
      <Box w="200px">
        <AdminNav />
      </Box>
      <Box w="100%" overflowX="hidden">
        <Box px={2} bg="white">
          <Outlet />
        </Box>
      </Box>
    </Flex>
  ) : (
    <LoadingToRedirect />
  );
};

export default AdminRoute;
