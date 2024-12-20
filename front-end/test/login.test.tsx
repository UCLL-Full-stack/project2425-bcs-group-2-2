import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginWindow from "../components/login";
import React from "react";
import "@testing-library/jest-dom";

window.React = React;

global.fetch = jest.fn(() =>
  Promise.resolve({
    status: 200,
    json: () =>
      Promise.resolve({
        username: "testuser",
        token: "sample-token",
      }),
  })
) as jest.Mock;

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

test("given: empty input, when: submitting form, then: validation errors are displayed", () => {
  render(<LoginWindow />);

  // Find the form's submit button
  const submitButton = screen.getByRole("button", { name: "Login" });

  // Click the submit button
  fireEvent.click(submitButton);

  // Assert that the validation errors are displayed
  expect(screen.getByText("Name is required")).toBeInTheDocument();
  expect(screen.getByText("Password is required")).toBeInTheDocument();
});

test("given: correct input, when: submitting form, then: token generated", async () => {
  render(<LoginWindow />);
  const nameInput = screen.getByPlaceholderText("Username");
  const passwordInput = screen.getByPlaceholderText("Password");
  const submitButton = screen.getByRole("button", { name: "Login" });
  fireEvent.change(nameInput, { target: { value: "test" } });
  fireEvent.change(passwordInput, { target: { value: "test" } });
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(
      screen.getByText("Login succesful. Redirecting to homepage...")
    ).toBeInTheDocument();
  });
});
