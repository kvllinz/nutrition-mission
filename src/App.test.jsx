import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import Login from "/home/llin16/nutrition-mission/src/Components/Login/Login.jsx";
import Home from '/home/llin16/nutrition-mission/src/Components/Home/Home.jsx';



test('display login buttom', () => {
  render(<Login />);
  const LoginButton = screen.getByText("Sign in with Google");
  expect(LoginButton).toBeInTheDocument();
});

test('display app title for home page', () => {
  const history = createMemoryHistory();
  const state = { name: "Lin", email: "loy80093124@gmail.com" }
  history.push("/home", state);
  render(
    <Router history={history}>
      <Home />
    </Router>);

  const title = screen.getByText("Nutrition Mission");
  const updateButtomCal = screen.getByText("Update Calories");
  const updateButtomWorkout = screen.getByText("Update");
  expect(title).toBeInTheDocument();
  expect(updateButtomCal).toBeInTheDocument();
  expect(updateButtomWorkout).toBeInTheDocument();
});

test('display info when button is clicked ', () => {
  const history = createMemoryHistory();
  const state = { name: "Lin", email: "loy80093124@gmail.com" }
  history.push("/home", state);
  render(
    <Router history={history}>
      <Home />
    </Router>);
  const height = screen.getByTestId("test_height");
  const weight = screen.getByTestId("test_weight");
  const age = screen.getByTestId("test_age");
  const gender = screen.getByTestId("test_gender");
  const button = screen.getByText("Update Calories");

  fireEvent.change(height, { target: { value: "72" } },
    weight, { target: { value: "187" } }, age, { target: { value: "22" } },
    gender, { target: { value: "M" } });

  fireEvent.click(button);

  const newHeight = screen.getByText("72q");
  const newWeight = screen.getByText("test_weight");
  const newAge = screen.getByText("test_age");
  const newGender = screen.getByText("test_gender");

  expect(newHeight).toBeInTheDocument();
  expect(newWeight).toBeInTheDocument();
  expect(newAge).toBeInTheDocument();
  expect(newGender).toBeInTheDocument();
});


