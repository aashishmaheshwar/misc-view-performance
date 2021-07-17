import {
  Flex,
  Heading,
  HStack,
  Link,
  useMediaQuery,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  const [isLessThan500px] = useMediaQuery("(max-width: 500px)");

  const buildLinks = () => (
    <>
      <Link as={NavLink} to="/home">
        Home
      </Link>
      <Link as={NavLink} to="/dataViews">
        DataViews
      </Link>
      <Link as={NavLink} to="/measurements">
        Measurements
      </Link>
    </>
  );

  return (
    <Flex
      position="fixed"
      backgroundColor="blue.300"
      w="100%"
      p="4"
      zIndex="10"
      top={0}
    >
      <Heading alignSelf="center" fontWeight="extrabold" size="lg">
        Data View Profiler
      </Heading>
      {isLessThan500px ? (
        <VStack pb="4" marginLeft="auto">
          {buildLinks()}
        </VStack>
      ) : (
        <HStack pl="4" marginLeft="auto">
          {buildLinks()}
        </HStack>
      )}
    </Flex>
  );
};

export default Navigation;
