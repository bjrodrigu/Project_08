import { Outlet } from 'react-router-dom'
import BadgerStudySearch from "./app/BadgerStudySearch"
import ReactLoginButton from './app/ReactLoginButton'
import BadgerUserButton from './app/BadgerUserButton';
import { useContext } from 'react';
import BadgerLoginStatusContext from './contexts/BadgerLoginStatusContext';



// Primary class for router. Hosts login Button, and hosts outlet for redirects.
export default function BadgerStudy() {
      const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext);

      return <>
            
            {loginStatus ? <BadgerUserButton/> : <ReactLoginButton />}
            <div style={{margin:'5vh 5vw 5vh 5vw'}}>
                  <Outlet />
            </div>
            
      </>
}