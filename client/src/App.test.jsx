import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

afterEach(cleanup);

it('For initial testing setup', () => {
  expect(true).toBeTruthy();
});
