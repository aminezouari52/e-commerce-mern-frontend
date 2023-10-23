// FIREBASE
import { auth, googleAuthProvider } from "../../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

// HOOKS
import { useState, useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// FUNCTIONS
import { createOrUpdateUser } from "../../functions/auth";
import { setLoggedInUser } from "../../reducers/userReducer";

// COMPONENTS
import { NavLink } from "react-router-dom";

// STYLE
import {
  Card,
  CardBody,
  Flex,
  Heading,
  Input,
  Button,
  Link,
  Text,
} from "@chakra-ui/react";

// ICONS
import { AiOutlineMail } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  // HOOKS
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // REDIRECT USER
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  useEffect(() => {
    const intended = location.state;
    if (intended) {
      return;
    } else {
      if (loggedInUser && loggedInUser.token) {
        if (loggedInUser.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/user/history");
        }
      }
    }
  }, [loggedInUser, navigate, location]);

  // REDIRECT FUNCTION
  const roleBasedRedirect = (res) => {
    const intended = location.state;
    if (intended) {
      navigate(intended.from);
    } else {
      if (res.data.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/history");
      }
    }
  };
  // SUBMIT FUNCTION
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
      // create user in database
      try {
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
        roleBasedRedirect(res);
      } catch (err) {
        console.log(err);
      }
    } catch (error) {
      console.log(error);
      toast({
        title: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setLoading(false);
    }
  };

  // LOGIN WITH GOOGLE
  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

      // create user in database
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
      roleBasedRedirect(res);
    } catch (err) {
      console.log(err);
      toast({
        title: err.message,
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
                Login Account
              </Heading>
              <Flex as="form" direction="column" onSubmit={handleSubmit}>
                <Flex direction="column" alignItems="end" mb={2}>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    autoFocus
                    size={{ lg: "md", md: "md", sm: "sm", base: "sm" }}
                    mt={2}
                  />

                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Your password"
                    my={2}
                    size={{ lg: "md", md: "md", sm: "sm", base: "sm" }}
                  />
                  <Link
                    as={NavLink}
                    to="/forgot-password" // Replace with your actual forgot password route
                    color="#3182CE"
                    _hover={{ textDecoration: "underline" }}
                    fontSize="sm"
                    my={2}
                  >
                    Forgot password?
                  </Link>
                </Flex>
                <Button
                  type="submit"
                  leftIcon={<AiOutlineMail />}
                  isDisabled={!email || password.length < 6}
                  isLoading={loading}
                  colorScheme="blue"
                  my={2}
                  size={{ lg: "md", md: "md", sm: "sm", base: "xs" }}
                >
                  Login with Email/Password
                </Button>
                <Button
                  onClick={googleLogin}
                  leftIcon={<FcGoogle />}
                  colorScheme="gray"
                  size={{ lg: "md", md: "md", sm: "sm", base: "xs" }}
                  my={2}
                >
                  Login with Google
                </Button>

                <Flex
                  my={2}
                  fontSize={{ lg: "lg", md: "md", sm: "sm", base: "sm" }}
                >
                  <Text color="gray" mr={1}>
                    Dont have an account?
                  </Text>
                  <Link
                    as={NavLink}
                    to="/register"
                    color="#3182CE"
                    fontWeight="semibold"
                    _hover={{ textDecoration: "underline" }}
                  >
                    Register
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

export default Login;
