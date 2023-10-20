// REACT
import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { useToast } from "@chakra-ui/react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../reducers/userReducer";

// FUNCTIONS
import { currentAdmin } from "../../functions/auth";

// COMPONENTS
import LoadingToRedirect from "./LoadingToRedirect";
import SideBar from "../nav/SideBar";

// STYLE
import { Box, Flex } from "@chakra-ui/react";

const AdminRoute = () => {
  const user = useSelector((state) => state.user.loggedInUser);
  const [ok, setOk] = useState(false);
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const toast = useToast();

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

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, async (user) => {
  //     if (!user) {
  //       await signOut(auth);
  //       dispatch(logout(null));
  //       navigate("/login");
  //       toast({
  //         title: "Session expired! login again.",
  //         status: "error",
  //         duration: 3000,
  //         isClosable: true,
  //       });
  //     }
  //   });
  //   return () => unsubscribe();
  // }, []);

  return ok ? (
    <Flex h="calc(100vh - 40px)">
      <Box
        w="200px"
        display={{ lg: "block", md: "block", sm: "block", base: "none" }}
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

export default AdminRoute;
