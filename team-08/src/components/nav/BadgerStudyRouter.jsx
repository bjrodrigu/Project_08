import React from "react"
import {
      BrowserRouter as Router,
      Route,
      Routes
} from 'react-router-dom'
import BadgerStudy from "../BadgerStudy";
import BadgerNoMatch from '../app/BadgerNoMatch';
import BadgerStudySearch from "../app/BadgerStudySearch";
import BadgerStudySpot from '../app/BadgerStudySpot';
import BadgerLogin from "../auth/BadgerLogin";
import BadgerProfile from "../app/BadgerProfile";
import {useState, useEffect} from "react"
import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext";
// Router Component
export default function BadgerStudyRouter() {
      const [loginStatus, setLoginStatus] = useState(undefined)
      useEffect(() => {
            const data = sessionStorage.getItem('isLoggedIn');
            // there's something in session storage.
            if (data) {
                  const info = JSON.parse(data);
                  setLoginStatus(info.loginStatus);
            }
      }, []);
      return (
            <BadgerLoginStatusContext.Provider value={[loginStatus, setLoginStatus]}>
            <Router>
                  <Routes>
                        <Route path='/' element={<BadgerStudy />}>
                              <Route index element={<BadgerStudySearch />} />
                              <Route path='register' /> {/** sign up page */}
                              <Route path='login' element={<BadgerLogin />} /> {/** login page */}
                              <Route path='userProfile' element={<BadgerProfile />} /> {/** profile page */}
                              <Route path='location' element={<BadgerStudySpot />} /> {/**Location page */}
                              <Route path='review' /> {/** review page */}
                              <Route path='*' element={<BadgerNoMatch />} /> {/** 404 page */}
                        </Route>
                  </Routes>
            </Router>
            </BadgerLoginStatusContext.Provider>
      )
}