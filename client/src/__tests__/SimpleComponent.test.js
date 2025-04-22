import { render, screen, fireEvent } from "@testing-library/react";


const SimpleComponent = () => {
  return <div data-testid="simple-text">Hello from Simple Component</div>;
};

test("renders simple component text", () => {
  render(<SimpleComponent />);
  expect(screen.getByTestId("simple-text")).toHaveTextContent("Hello from Simple Component");
});


const GreetingComponent = ({ name }) => {
  return <h2>Hello, {name || "Guest"}!</h2>;
};

test("renders greeting with name", () => {
  render(<GreetingComponent name="Pushpa" />);
  expect(screen.getByText("Hello, Pushpa!")).toBeInTheDocument();
});

test("renders default greeting", () => {
  render(<GreetingComponent />);
  expect(screen.getByText("Hello, Guest!")).toBeInTheDocument();
});


import React, { useState } from "react";

const CounterComponent = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p data-testid="count-text">Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

test("increments counter on click", () => {
  render(<CounterComponent />);
  fireEvent.click(screen.getByText(/increment/i));
  expect(screen.getByTestId("count-text")).toHaveTextContent("Count: 1");
});
