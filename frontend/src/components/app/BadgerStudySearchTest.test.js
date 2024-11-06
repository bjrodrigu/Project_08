import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import BadgerStudySearch from './BadgerStudySearch.jsx';
import userEvent from '@testing-library/user-event';

const testData = [
      {name: 'A', distance: 3, description: 'C', rating: 2},
      {name: 'B', distance: 2, description: 'A', rating: 1},
      {name: 'C', distance: 1, description: 'B', rating: 3}
]

describe('Study Search should', () => {
      expect(document).toBeDefined(); // Check if document is available
      
      // checks if input value working
      test('test input value', async () => {
            // create user
            const user = userEvent.setup();
            // render component
            render(<BrowserRouter>
                  <BadgerStudySearch {...testData}/>
            </BrowserRouter>)
            // interact with component
            const el = screen.getByTestId('search');
            expect(el).toBeInTheDocument();
            await user.click(el);
            await user.keyboard('Bascom');
            await waitFor(() => expect(el).toHaveValue('Bascom'));
      })

      // TODO: push main and create tests for new dropdowns
      // checks if input value working
      // test('test input value', async () => {
      //       // create user
      //       const user = userEvent.setup();
      //       // render component
      //       render(<BrowserRouter>
      //             <BadgerStudySearch {...testData}/>
      //       </BrowserRouter>)
      //       // interact with component
      //       const el = screen.getByTestId('search');
      //       expect(el).toBeInTheDocument();
      //       await user.click(el);
      //       await user.keyboard('Bascom');
      //       await waitFor(() => expect(el).toHaveValue('Bascom'));
      // })
})