import * as React from "react";
import { render as rtlRender } from "@testing-library/react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import performanceReducer from "reducers/view-performace.reducer";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { ReactElement } from "react";

const customRender = (
  ui: React.ReactElement,
  { store = createStore(performanceReducer), ...options } = {}
) => {
  const AllProviders = ({ children }: { children?: React.ReactNode }) => (
    <ChakraProvider theme={theme}>
      <Provider store={store}>{children}</Provider>
    </ChakraProvider>
  );

  return rtlRender(ui, { wrapper: AllProviders, ...options });
};

function getRender(initialState: any) {
  return function render(
    ui: ReactElement,
    {
      store = createStore(performanceReducer, initialState),
      ...renderOptions
    } = {}
  ) {
    function Wrapper({ children }: any) {
      return <Provider store={store}>{children}</Provider>;
    }
    return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
  };
}

const mockLocalStorage = () => {
  const setItemMock = jest.fn();
  const getItemMock = jest.fn();
  const removeItemMock = jest.fn();

  beforeEach(() => {
    Storage.prototype.setItem = setItemMock;
    Storage.prototype.getItem = getItemMock;
    Storage.prototype.removeItem = removeItemMock;
  });

  afterEach(() => {
    setItemMock.mockRestore();
    getItemMock.mockRestore();
    removeItemMock.mockRestore();
  });

  return { setItemMock, getItemMock, removeItemMock };
};

export { customRender as render, getRender, mockLocalStorage };
