import { Box, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";

const Navigation = () => {
  return (
    <Box position="sticky">
      <Flex backgroundColor="blue.100" w="100%">
        <Heading alignSelf="center" fontWeight="extrabold" size="lg">
          Data View Profiler
        </Heading>
        <ColorModeSwitcher marginLeft="auto" />
      </Flex>
    </Box>
  );
};

export default Navigation;
