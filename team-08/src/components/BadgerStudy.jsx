import { Outlet } from 'react-router-dom'
import BadgerStudySearch from "./app/BadgerStudySearch"
import BadgerMap from './app/BadgerMap'
import LoginButton from './app/LoginButton'
import { useContext } from 'react'
import BadgerLoginStatusContext from './contexts/BadgerLoginStatusContext'
import UserPageButton from './app/UserPageButton'
import { useLocation } from 'react-router-dom';

// Primary class for router. Hosts login Button, and hosts outlet for redirects.
export default function BadgerStudy() {
      const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext);
      const hiddenPaths = ['/login', '/userprofile', '/register'];
      const location = useLocation();
      return <>
            <BadgerMap />
            {!hiddenPaths.includes(location.pathname) && (
                  loginStatus ? <UserPageButton /> : <LoginButton />
            )}
            <div style={{ margin: '5vh 5vw 5vh 5vw' }}>
                  <Outlet />
            </div>
      </>
}