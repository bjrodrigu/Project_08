<<<<<<< HEAD
import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import UserOverlay from './app/user/UserOverlay';
import { LoginContext, LoginContextProvider } from './contexts/LoginContext';
=======
import { Outlet } from 'react-router-dom'
import BadgerStudySearch from "./app/BadgerStudySearch"
import ReactLoginButton from './app/ReactLoginButton'

>>>>>>> d970ad2 (added comments)

// Primary class for router. Hosts login Button, and hosts outlet for redirects.
export default function BadgerStudy() {

      return <>
            <LoginContextProvider>
                  <UserOverlay />
                  <div style={{margin:'5vh 5vw 5vh 5vw'}}>
                        <Outlet />
                  </div>
            </LoginContextProvider>
      </>
}