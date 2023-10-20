// REACT
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// STLYE
import { Flex, Heading } from "@chakra-ui/react";

const LoadingToRedirect = () => {
  const [count, setCount] = useState(5);
  let navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => --prevCount);
    }, 1000);
    // redirect once count is equal to 0
    count === 0 && navigate("/");
    // cleanup
    return () => clearInterval(interval);
  }, [count, navigate]);

  return (
    <Flex justifyContent="center" h="calc(100vh - 40px)">
      <Heading sx={{ fontSize: "16px", margin: 4 }}>
        Redirecting you in {count} seconds
      </Heading>
    </Flex>
  );
};

export default LoadingToRedirect;
