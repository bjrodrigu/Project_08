import { Outlet } from 'react-router-dom'
import BadgerMap from './app/BadgerMap'
import { useContext } from 'react'
import BadgerLoginStatusContext from './contexts/BadgerLoginStatusContext'
import { useLocation } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import UserOverlay from './app/user/UserOverlay';
import { LoginContext, LoginContextProvider } from './contexts/LoginContext';

// Primary class for router. Hosts login Button, and hosts outlet for redirects.
export default function BadgerStudy() {
      const location = useLocation();

      return <>
            <LoginContextProvider>
                  location.pathname !== '/login' && <BadgerMap />
                  <UserOverlay />
                  <div style={{margin:'5vh 5vw 5vh 5vw'}}>
                        <Outlet />
                  </div>
            </LoginContextProvider>
      </>
}