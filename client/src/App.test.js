import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

// Mock react-router-dom to prevent route issues
jest.mock("react-router-dom", () => ({
  BrowserRouter: ({ children }) => <div>{children}</div>,
  Routes: ({ children }) => <div>{children}</div>,
  Route: () => <div>Route</div>,
}));

test("renders App component without crashing", () => {
  render(<App />);
});
