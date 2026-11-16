import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BadgerSearchResult from './BadgerSearchResult.jsx';
import '@testing-library/jest-dom';

jest.mock('../contexts/LoginContext', () => ({
      useLoginState: () => ({ user: null, setUser: jest.fn(), login: false, setLogin: jest.fn() }),
}));


const testResult = {location: {name: 'Lorem', distance: 0.1, description: 'Ipsum', rating: 5.0, reviews: 1, tags: []}}

describe('My search result', () => {
      expect(document).toBeDefined(); // Check if document is available
      // test if Search Result Name renders
      test('should render location name', async () => {
            render(<BrowserRouter>
                  <BadgerSearchResult {...testResult}/>
            </BrowserRouter>);
            const el = screen.queryByText("Lorem");
            expect(el).toBeInTheDocument();
      })
      
      // test if Search Result Distance renders
      test('should render location distance', async () => {
            render(<BrowserRouter>
                  <BadgerSearchResult {...testResult}/>
            </BrowserRouter>);
            const el = screen.queryByText("0.1mi");
            expect(el).toBeInTheDocument();
      })
      
      // distance is hidden (not "0mi") when the user's location is unknown
      test('hides distance when it is unavailable', async () => {
            render(<BrowserRouter>
                  <BadgerSearchResult location={{ ...testResult.location, distance: null }}/>
            </BrowserRouter>);
            expect(screen.queryByText(/mi$/)).not.toBeInTheDocument();
      })

      // test if Search Result Description renders
      test('should render location description', async () => {
            render(<BrowserRouter>
                  <BadgerSearchResult {...testResult}/>
            </BrowserRouter>);
            const el = screen.queryByText("Ipsum");
            expect(el).toBeInTheDocument();
      })

})