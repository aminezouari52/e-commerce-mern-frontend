import { useState, useEffect } from "react";
import { getUserOrders } from "../../functions/user";
import { useSelector } from "react-redux";
import {
  Box,
  Heading,
  Flex,
  Badge,
  Th,
  Tr,
  Td,
  TableContainer,
  Table,
  Thead,
  Icon,
  Tbody,
  Stack,
  Card,
  CardBody,
} from "@chakra-ui/react";
import { AiFillCloseCircle } from "react-icons/ai";
import { CheckCircleIcon } from "@chakra-ui/icons";
import moment from "moment";

const History = () => {
  const [orders, setOrders] = useState([]);
  const user = useSelector((state) => state.user.loggedInUser);

  useEffect(() => {
    loadUserOrders();
  }, []);

  const loadUserOrders = () =>
    getUserOrders(user.token).then((res) => {
      setOrders(res.data);
    });

  return (
    <Box overflowY="hidden">
      <Heading size="lg" color="#3182ce" my={5}>
        {orders.length > 0 ? "User purchase orders" : "No purchase orders"}
      </Heading>
      {orders.map((order, i) => (
        <Card mb={2} key={i}>
          <CardBody>
            <Stack direction="row">
              <Badge colorScheme="purple">
                Amount: {order.amount.toFixed(2)}dt
              </Badge>
              <Badge colorScheme="green">
                Created at:{" "}
                {moment(order.createdAt).format("MMMM Do, YYYY, HH:MM")}
              </Badge>
              <Badge colorScheme="red">Status: {order.orderStatus}</Badge>
            </Stack>
            <TableContainer
              key={i}
              mt={4}
              border="1px"
              borderRadius="4px"
              borderColor="gray.300"
              overflowX="auto"
              mr={2}
            >
              <Table m="0" variant="simple">
                <Thead bg="teal.50">
                  <Tr>
                    <Th>Title</Th>
                    <Th>Price</Th>
                    <Th>Brand</Th>
                    <Th>Color</Th>
                    <Th>Count</Th>
                    <Th>Shipping</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {order?.products?.map((p, i) => (
                    <Tr key={i}>
                      <Td wordBreak="break-all">
                        <strong>{p.product.title}</strong>
                      </Td>
                      <Td>${p.product.price}</Td>
                      <Td>{p.product.brand}</Td>
                      <Td>{p.color}</Td>
                      <Td>{p.count}</Td>
                      <Td>
                        <Flex alignItems="center">
                          {p.product.shipping === "Yes" ? (
                            <CheckCircleIcon color="green" />
                          ) : (
                            <Icon as={AiFillCloseCircle} color="red" />
                          )}
                        </Flex>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </CardBody>
        </Card>
      ))}
    </Box>
  );
};

export default History;
