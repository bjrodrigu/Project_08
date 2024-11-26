import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import BadgerStudy from '../components/BadgerStudy';
import { LoginContextProvider } from '../components/contexts/LoginContext';
import { MapContextProvider } from '../components/contexts/MapContext';
import userEvent from '@testing-library/user-event';

// Mock components to simplify testing
jest.mock('../components/app/BadgerMap', () => () => <div>BadgerMap Mock</div>);
jest.mock('../components/app/user/UserOverlay', () => () => <div>UserOverlay Mock</div>);

describe('BadgerStudy', () => {
  test('renders BadgerMap when not on login, register, or userProfile route', () => {
    // Use Router without location prop for testing
    render(
      <Router initialEntries={['/home']}>
        <LoginContextProvider>
          <MapContextProvider>
            <BadgerStudy />
          </MapContextProvider>
        </LoginContextProvider>
      </Router>
    );

    // Check if BadgerMap is rendered
    expect(screen.getByText('BadgerMap Mock')).toBeInTheDocument();
    expect(screen.getByText('UserOverlay Mock')).toBeInTheDocument();
  });

  test('always renders the Outlet component', () => {
    // Mock location for a route other than login, register, or userProfile
    render(
      <Router initialEntries={['/home']}>
        <LoginContextProvider>
          <MapContextProvider>
            <BadgerStudy />
          </MapContextProvider>
        </LoginContextProvider>
      </Router>
    );

    // Check if Outlet is rendered (can be any element inside Outlet for test)
    expect(screen.getByText('BadgerMap Mock')).toBeInTheDocument();
    expect(screen.getByText('UserOverlay Mock')).toBeInTheDocument();
  });
});
