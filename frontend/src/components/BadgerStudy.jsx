import { Outlet } from 'react-router-dom'
import BadgerMap from './app/BadgerMap'
import { useLocation } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import UserOverlay from './app/user/UserOverlay';
import { LoginContext, LoginContextProvider } from './contexts/LoginContext';
import {MapContextProvider} from './contexts/MapContext';

// Primary class for router. Hosts login Button, and hosts outlet for redirects.
export default function BadgerStudy() {
      const location = useLocation();

      return <>
            <LoginContextProvider>
                  <MapContextProvider>
                  {location.pathname !== '/login' && location.pathname !== '/register' && location.pathname !== '/userProfile' && <BadgerMap />}
                  <UserOverlay />
                  <div>
                        <Outlet />
                  </div>
                  </MapContextProvider>
            </LoginContextProvider>
      </>
}