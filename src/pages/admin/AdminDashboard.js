import { Flex, Box, Heading, useToast } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { getOrders, changeStatus } from "../../functions/admin";
import { useSelector } from "react-redux";
import Orders from "../../components/Orders";

const AdminDashboard = () => {
  const toast = useToast();

  const [orders, setOrders] = useState([]);
  const user = useSelector((state) => state.user.loggedInUser);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () =>
    getOrders(user.token).then((res) => {
      setOrders(res.data);
    });

  const handleStatusChange = (orderId, orderStatus) => {
    changeStatus(orderId, orderStatus, user.token).then((res) => {
      toast({
        title: "Status updated.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      loadOrders();
    });
  };
  return (
    <Box overflowY="hidden" h="100%">
      <Heading mb={6} color="blue" mt={5}>
        Admin dashboard
      </Heading>
      <Orders orders={orders} handleStatusChange={handleStatusChange} />
    </Box>
  );
};
export default AdminDashboard;
