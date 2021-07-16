import { Box, Flex, Heading, HStack, Link } from "@chakra-ui/react";
import React from "react";
import { NavLink } from "react-router-dom";
import { ColorModeSwitcher } from "./ColorModeSwitcher";

const Navigation = () => {
  return (
    <Box position="sticky">
      <Flex backgroundColor="blue.300" w="100%">
        <Heading alignSelf="center" fontWeight="extrabold" size="lg">
          Data View Profiler
        </Heading>
        <HStack pl="4" marginLeft="auto">
          <Link as={NavLink} to="/home">
            Home
          </Link>
          <Link as={NavLink} to="/dataViews">
            DataViews
          </Link>
          <Link as={NavLink} to="/measurements">
            Measurements
          </Link>
        </HStack>
        <ColorModeSwitcher alignSelf="center" />
      </Flex>
    </Box>
  );
};

export default Navigation;
