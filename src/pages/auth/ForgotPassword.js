// REACT
import { useState } from "react";
import { useToast } from "@chakra-ui/react";

// FIREBASE
import { auth } from "../../firebase";
import { sendPasswordResetEmail } from "firebase/auth";

// REDUX
import { useNavigate } from "react-router-dom";

// STYLE
import { Flex, Card, CardBody, Heading, Input, Button } from "@chakra-ui/react";

const ForgotPassword = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const config = {
        url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
        handleCodeInApp: true,
      };
      await sendPasswordResetEmail(auth, email, config);
      setEmail("");
      setLoading(false);
      toast({
        title: "Check your email for password reset link",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/");
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast({
        title: "Failed to send password reset email",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex justifyContent="center" alignItems="center" w="100%" h="90vh">
      <Flex direction="column" alignItems="center" w="30%">
        <Card>
          <CardBody>
            <Flex direction="column" alignItems="center" px={8}>
              <Heading size="lg" mb={6} color="#3182CE">
                Forgot Password
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
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Type your email"
                  autoFocus
                  mb={2}
                />
                <Button
                  type="submit"
                  isDisabled={!email}
                  isLoading={loading}
                  colorScheme="blue"
                  mb={2}
                >
                  Submit
                </Button>
              </Flex>
            </Flex>
          </CardBody>
        </Card>
      </Flex>
    </Flex>
  );
};

export default ForgotPassword;
