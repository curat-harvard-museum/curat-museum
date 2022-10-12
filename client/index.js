import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import store from "./store";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";

const root = ReactDOM.createRoot(document.getElementById("app"));

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <Router>
            <Routes>
              <Route path="*" element={<App />} />
            </Routes>
          </Router>
        </Provider>
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>
);
