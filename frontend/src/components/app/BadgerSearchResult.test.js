import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BadgerSearchResult from './BadgerSearchResult.jsx';
import '@testing-library/jest-dom';


const testResult = {name: 'Lorem', distance: 0.1, description: 'Ipsum', rating: 5.0}

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
      
      // test if Search Result Description renders
      test('should render location description', async () => {
            render(<BrowserRouter>
                  <BadgerSearchResult {...testResult}/>
            </BrowserRouter>);
            const el = screen.queryByText("Ipsum");
            expect(el).toBeInTheDocument();
      })

})