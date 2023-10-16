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
      <AdminNav />
      <Box w="100%" overflowX="hidden" overflowY="hidden">
        <Outlet />
      </Box>
    </Flex>
  ) : (
    <LoadingToRedirect />
  );
};

export default AdminRoute;
