import { Flex, Heading, Button } from "@chakra-ui/react";
import axios from "axios";

const Payment = () => {
  const placeOrder = async () => {
    console.log("order placed!");
  };

  return (
    <Flex justifyContent="center">
      <Button onClick={placeOrder}>Place order</Button>
    </Flex>
  );
};

export default Payment;
