import { render, screen } from '@testing-library/react';
import App from './App';
import Home from './Home';
import imageUrl from 'from "../../GoogleLogin";'

test('display user weight high and age', () => {
  render(<App />);
  const tap = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('displays profile picture', () => {
  render(<Home />);
  const profile_picture = screen.getAllByAltText('img');
  expect(profile_picture.src).toContain({ imageUrl });
  expect(profile_picture).toHaveAttribute();
});
