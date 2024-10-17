import { Outlet } from 'react-router-dom'
import BadgerStudySearch from "./app/BadgerStudySearch"
import ReactLoginButton from './app/ReactLoginButton'


// Primary class for router. Hosts login Button, and hosts outlet for redirects.
export default function BadgerStudy() {
      return <>
            <ReactLoginButton />
            <div style={{margin:'5vh 5vw 5vh 5vw'}}>
                  <Outlet />
            </div>
      </>
}