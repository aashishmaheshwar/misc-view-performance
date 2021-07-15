import React, { Suspense } from "react";
import { ChakraProvider, Box, Grid, theme } from "@chakra-ui/react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Navigation from "./Navigation";

const DataViews = React.lazy(() => import("./pages/DataViews"));
const Measurements = React.lazy(() => import("./pages/Measurements"));

export const App = () => (
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <Navigation />
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
            </Switch>
          </Suspense>
        </Grid>
      </Box>
    </BrowserRouter>
  </ChakraProvider>
);
