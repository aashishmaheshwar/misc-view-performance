import React from "react";
import {
  ChakraProvider,
  Box,
  // Text,
  // Link,
  // VStack,
  // Code,
  Grid,
  theme,
  Flex,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { BrowserRouter } from "react-router-dom";
// import { Logo } from "./Logo";

export const App = () => (
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <div style={{ position: "sticky" }}>
        <Flex backgroundColor="blue.100">
          <ColorModeSwitcher justifySelf="flex-end" />
        </Flex>
      </div>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          {/* <VStack spacing={8}>
          <Logo h="40vmin" pointerEvents="none" />
          <Text>
            Edit <Code fontSize="xl">src/App.tsx</Code> and save to reload.
          </Text>
          <Link
            color="teal.500"
            href="https://chakra-ui.com"
            fontSize="2xl"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn Chakra
          </Link>
        </VStack> */}
        </Grid>
      </Box>
    </BrowserRouter>
  </ChakraProvider>
);
