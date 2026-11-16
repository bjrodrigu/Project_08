import { Outlet } from 'react-router-dom'
import BadgerMap from './app/BadgerMap'
import { useLocation } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import BadgerHeader from './app/BadgerHeader';
import { LoginContext, LoginContextProvider } from './contexts/LoginContext';
import {MapContextProvider} from './contexts/MapContext';
import { ToastProvider } from './contexts/ToastContext';

// Primary class for router. Hosts login Button, and hosts outlet for redirects.
export default function BadgerStudy() {
      const location = useLocation();

      return <>
            <ToastProvider>
            <LoginContextProvider>
                  <MapContextProvider>
                  <BadgerHeader />
                  {/* main comes before the map in the DOM so Tab reaches search before the map controls */}
                  <main className="app-main">
                        <Outlet />
                  </main>
                  {location.pathname !== '/login' && location.pathname !== '/register' && location.pathname !== '/userProfile' && <BadgerMap />}
                  </MapContextProvider>
            </LoginContextProvider>
            </ToastProvider>
      </>
}