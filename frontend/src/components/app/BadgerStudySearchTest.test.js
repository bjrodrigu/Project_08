import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import BadgerStudySearch from './BadgerStudySearch.jsx';
import userEvent from '@testing-library/user-event';

jest.mock('../contexts/LoginContext', () => ({
      useLoginState: () => ({ user: null, setUser: jest.fn(), login: false, setLogin: jest.fn() }),
}));
// Return the same objects every render (like the real memoized context),
// otherwise the component's filter effect would re-run forever.
jest.mock('../contexts/MapContext', () => {
      const state = {
            userLocation: null, setUserLocation: jest.fn(),
            locationList: [{ name: 'Bascom Lounge', distance: null, description: 'Quiet', rating: 4, reviews: 1, building: 'Bascom', tags: [] }],
            setLocationList: jest.fn(),
            buildings: [], setBuildings: jest.fn(), fetchLocations: jest.fn(),
      };
      return { useLocationState: () => state };
});

beforeEach(() => {
      global.fetch = jest.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve([]) }));
});

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
            const el = screen.getByPlaceholderText('Search for a Location');
            expect(el).toBeInTheDocument();
            await user.click(el);
            await user.keyboard('Bascom');
            await waitFor(() => expect(el).toHaveValue('Bascom'));
            // searching works even when distance is unknown (null), and no "mi" is shown
            expect(await screen.findByText('Bascom Lounge')).toBeInTheDocument();
            expect(screen.queryByText(/\dmi$/)).not.toBeInTheDocument();
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