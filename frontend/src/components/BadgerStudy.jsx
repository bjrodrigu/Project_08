import { Outlet } from 'react-router-dom'
import BadgerStudySearch from "./app/BadgerStudySearch"
import ReactLoginButton from './app/ReactLoginButton'



export default function BadgerStudy() {
      return <>
            <ReactLoginButton />
            <div style={{margin:'5vh 5vw 5vh 5vw'}}>
                  <Outlet />
            </div>
      </>
}