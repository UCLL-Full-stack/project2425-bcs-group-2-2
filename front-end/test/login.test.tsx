import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginWindow from "../components/login";
import UserService from "../service/userService";
import React from "react";
window.React = React;

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

const user = {
  username: "test",
  password: "test",
};

test("given: empty input, when: submitting form, then: validation errors are displayed", () => {
  render(<LoginWindow />);

  const submitButton = screen.getByText("Login");
  fireEvent.click(submitButton);

  expect(screen.getByText("Name is required"));
  expect(screen.getByText("Password is required"));
});

//   test("given: valid input, when: login is successful, then: success message is displayed", async () => {
//     UserService.loginUser.mockResolvedValue({
//       status: 200,
//       json: async () => ({ token: "dummyToken", username: "testuser" }),
//     });

//     render(<LoginWindow />);

//     fireEvent.change(screen.getByPlaceholderText("johndoe"), {
//       target: { value: "testuser" },
//     });
//     fireEvent.change(screen.getByPlaceholderText("Password"), {
//       target: { value: "password123" },
//     });

//     fireEvent.click(screen.getByText("Login"));

//     await waitFor(() => {
//       expect(
//         screen.getByText("Login succesful. Redirecting to homepage...")
//       ).toBeInTheDocument();
//     });

//     expect(UserService.loginUser).toHaveBeenCalledWith({
//       username: "testuser",
//       password: "password123",
//     });
//   });

//   test("given: valid input, when: login fails, then: error message is displayed", async () => {
//     UserService.loginUser.mockResolvedValue({ status: 401 });

//     render(<LoginWindow />);

//     fireEvent.change(screen.getByPlaceholderText("johndoe"), {
//       target: { value: "testuser" },
//     });
//     fireEvent.change(screen.getByPlaceholderText("Password"), {
//       target: { value: "wrongpassword" },
//     });

//     fireEvent.click(screen.getByText("Login"));

//     await waitFor(() => {
//       expect(
//         screen.getByText("Login didn't succeed. Please try again")
//       ).toBeInTheDocument();
//     });
//   });

//   test("given: validation error, when: input is corrected, then: error messages are cleared", () => {
//     render(<LoginWindow />);

//     const submitButton = screen.getByText("Login");
//     fireEvent.click(submitButton);

//     expect(screen.getByText("Name is required")).toBeInTheDocument();
//     expect(screen.getByText("Password is required")).toBeInTheDocument();

//     fireEvent.change(screen.getByPlaceholderText("johndoe"), {
//       target: { value: "testuser" },
//     });
//     fireEvent.change(screen.getByPlaceholderText("Password"), {
//       target: { value: "password123" },
//     });

//     expect(screen.queryByText("Name is required")).not.toBeInTheDocument();
//     expect(screen.queryByText("Password is required")).not.toBeInTheDocument();
//   });
// });
