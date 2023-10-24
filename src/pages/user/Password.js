// REACT
import { useState } from "react";
import { useToast } from "@chakra-ui/react";

// FIREBASE
import { auth } from "../../firebase";
import { updatePassword } from "firebase/auth";

// STYLE
import {
  Flex,
  Box,
  Heading,
  Input,
  Button,
  Card,
  CardBody,
} from "@chakra-ui/react";

const Password = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // FIREBASE
    try {
      await updatePassword(auth.currentUser, password);
      setLoading(false);
      setPassword("");
      toast({
        title: "Password updated!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast({
        title: "Failed to update password",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box overflowY="hidden">
      <Flex flexDirection="column" alignItems="center" mt={8}>
        <Card>
          <CardBody>
            <Heading size="lg" color="#3182ce" my={5}>
              Update Password
            </Heading>
            <Flex
              as="form"
              direction="column"
              w="100%"
              maxW="350px"
              minWidth="250px"
              onSubmit={handleSubmit}
            >
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your new password"
                mb={2}
              />

              <Button
                type="submit"
                isDisabled={!password || password.length < 6 || loading}
                isLoading={loading}
                colorScheme="blue"
                mb={2}
              >
                Submit
              </Button>
            </Flex>
          </CardBody>
        </Card>
      </Flex>
    </Box>
  );
};

export default Password;
