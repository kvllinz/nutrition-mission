import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import useLocation from "react-router";
import Login from "/home/llin16/nutrition-mission/src/Components/Login/Login.jsx";
import imageUrl from "/home/llin16/nutrition-mission/src/GoogleLogin.jsx";
import Home from '/home/llin16/nutrition-mission/src/Components/Home/Home.jsx';
import routeData from 'react-router';

test('display login buttom', () => {
  render(<Login />);
  const LoginButton = screen.getByText("Sign in with Google");
  expect(LoginButton).toBeInTheDocument();
});

test('display App Features', () => {
  render(<Login />);
  const title = screen.getByText("Features");
  expect(title).toBeInTheDocument();
});


test('display info when button is clicked ', () => {
  render(<Home />);
  const height = screen.getByTestId("test_height");
  const weight = screen.getByTestId("test_weight");
  const age = screen.getByTestId("test_age");
  const gender = screen.getByTestId("test_gender");
  const button = screen.getByText("Update");
  const mockLocation = {
    pathname: '/Home',
    hash: '',
    search: '',
    state: ''
  }
  beforeEach(() => {
    jest.spyOn(routeData, 'useLocation').mockReturnValue(mockLocation)
  });

  fireEvent.change(height, { target: { value: "72" } },
    weight, { target: { value: "187" } }, age, { target: { value: "22" } },
    gender, { target: { value: "M" } });

  fireEvent.click(button);

  const newHeight = screen.getByText("72")
  const newWeight = screen.getByText("187")
  const newAge = screen.getByText("22")
  const newGender = screen.getByText("W")

  expect(newHeight, newWeight, newAge, newGender), toBeInTheDocument();
});


// test('displays profile picture', async () => {
//   render(<Home />);
//   const profile_picture = screen.getAllByAltText('img');
//   expect(profile_picture.src).toContain({ imageUrl });
//   expect(profile_picture).toHaveAttribute('src', { imageUrl });
// });
