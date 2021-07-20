import * as React from "react";
import { render } from "@testing-library/react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import performanceReducer from "reducers/view-performace.reducer";
import { Provider } from "react-redux";
import { createStore } from "redux";

const customRender = (
  ui: React.ReactElement,
  { store = createStore(performanceReducer), ...options } = {}
) => {
  const AllProviders = ({ children }: { children?: React.ReactNode }) => (
    <ChakraProvider theme={theme}>
      <Provider store={store}>{children}</Provider>
    </ChakraProvider>
  );

  return render(ui, { wrapper: AllProviders, ...options });
};

export { customRender as render };
// function createStore(performanceReducer: any): any {
//   throw new Error("Function not implemented.");
// }
