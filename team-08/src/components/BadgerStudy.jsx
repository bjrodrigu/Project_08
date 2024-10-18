import { Outlet } from 'react-router-dom'
import BadgerStudySearch from "./app/BadgerStudySearch"
import ReactLoginButton from './app/ReactLoginButton'
import BadgerMap from './app/BadgerMap'


// Primary class for router. Hosts login Button, and hosts outlet for redirects.
export default function BadgerStudy() {
      return <>
            <BadgerMap />
            <ReactLoginButton />
            <div style={{ margin: '5vh 5vw 5vh 5vw' }}>
                  <Outlet />
            </div>

      </>
}