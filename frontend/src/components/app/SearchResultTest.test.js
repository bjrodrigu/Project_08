import {render, screen} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BadgerSearchResult from './BadgerSearchResult.jsx';
import userEvent from '@testing-library/user-event';
import 'holderjs/holder';
import '@testing-library/jest-dom';


// jest mock no-fn holder
jest.mock('holderjs/holder', () => {
      run: jest.fn();
})

describe('My search result', () => {
      expect(document).toBeDefined(); // Check if document is available
      test('should render', async () => {
            render(<BrowserRouter>
                  <BadgerSearchResult />
            </BrowserRouter>);
            expect(true).toBe(true);
      })
})