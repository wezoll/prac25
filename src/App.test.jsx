import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

test("отображает заголовок", () => {
  render(<App />);
  expect(screen.getByText("wezoll + React")).toBeInTheDocument();
});

test("увеличивает счетчик при клике", () => {
  render(<App />);
  const button = screen.getByText("count is 0");
  fireEvent.click(button);
  expect(screen.getByText("count is 1")).toBeInTheDocument();
});

test("ссылки на Vite и React присутствуют", () => {
  render(<App />);
  expect(screen.getByRole("link", { name: /Vite logo/i })).toHaveAttribute(
    "href",
    "https://vite.dev"
  );
  expect(screen.getByRole("link", { name: /React logo/i })).toHaveAttribute(
    "href",
    "https://react.dev"
  );
});
