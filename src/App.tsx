import React, { Suspense } from "react";
import {
  ChakraProvider,
  Box,
  Text,
  // Text,
  // Link,
  // VStack,
  // Code,
  Grid,
  theme,
  Flex,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
// import { Logo } from "./Logo";
import Home from "./pages/Home";
// import MainNavigation from "./components/MainNavigation";

const DataViews = React.lazy(() => import("./pages/DataViews"));
const Measurements = React.lazy(() => import("./pages/Measurements"));

export const App = () => (
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <div style={{ position: "sticky" }}>
        <Flex backgroundColor="blue.100" w="100%">
          <Text justifySelf="flex-start">Data View Profiler</Text>
          <ColorModeSwitcher justifySelf="flex-end" />
        </Flex>
      </div>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <Suspense fallback={<span>Loading...</span>}>
            <Switch>
              <Route path="/home" exact component={Home} />
              <Route path="/dataViews" exact component={DataViews} />
              <Route path="/measurements" exact component={Measurements} />
              <Route path="**" exact>
                <Redirect to="/home" />
              </Route>
              {/* component={Home} /> */}
            </Switch>
          </Suspense>
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
