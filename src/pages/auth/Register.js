// REACT
import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

// REDUX
import { useDispatch } from "react-redux";
import { setLoggedInUser } from "../../reducers/userReducer";

// FIREBASE
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

// FUNCTIONS
import { createOrUpdateUser } from "../../functions/auth";

// STYLE
import {
  Flex,
  Card,
  CardBody,
  Input,
  Button,
  Heading,
  Text,
  Link,
} from "@chakra-ui/react";

const Register = () => {
  let dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validation
    if (!email || !password) {
      toast({
        title: "Email and password is required",
        // description: "We've created your account for you.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if (password.length < 6) {
      toast({
        title: "Password must be at least 6 characters long",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // create user
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // get user id token
      const user = userCredential.user;
      const idTokenResult = await user.getIdTokenResult();

      // redux store
      const res = await createOrUpdateUser(idTokenResult.token);
      dispatch(
        setLoggedInUser({
          name: res.data.name,
          email: res.data.email,
          token: idTokenResult.token,
          role: res.data.role,
          _id: res.data._id,
        })
      );

      // redirect
      navigate("/");
      toast({
        title: "Account created successfully!",
        // description: "We've created your account for you.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: error.message,
        // description: "We've created your account for you.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      h="calc(100vh - 40px)"
      mx={4}
    >
      <Flex direction="column" alignItems="center">
        <Card>
          <CardBody>
            <Flex direction="column" alignItems="center" px={8}>
              <Heading
                mb={6}
                color="#3182CE"
                size={{ lg: "lg", md: "lg", sm: "md", base: "sm" }}
              >
                Create an Account
              </Heading>
              <Flex as="form" direction="column" onSubmit={handleSubmit}>
                <Flex direction="column" alignItems="end" mb={2}>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email"
                    autoFocus
                    size={{ lg: "md", md: "md", sm: "sm", base: "sm" }}
                    mt={2}
                  />

                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    my={2}
                    size={{ lg: "md", md: "md", sm: "sm", base: "sm" }}
                  />
                </Flex>

                <Button
                  type="submit"
                  colorScheme="blue"
                  size={{ lg: "md", md: "md", sm: "sm", base: "xs" }}
                  my={2}
                >
                  Register
                </Button>
                <Flex my={2}>
                  <Text color="gray" mr={1}>
                    Already have an account?
                  </Text>
                  <Link
                    as={NavLink}
                    to="/login"
                    color="#3182CE"
                    fontWeight="semibold"
                    _hover={{ textDecoration: "underline" }}
                  >
                    Login
                  </Link>
                </Flex>
              </Flex>
            </Flex>
          </CardBody>
        </Card>
      </Flex>
    </Flex>
  );
};

export default Register;
