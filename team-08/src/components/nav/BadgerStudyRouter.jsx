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
import BadgerUser from "../app/BadgerUser";
import BadgerLoginStatusContext from '../contexts/BadgerLoginStatusContext';

import { useEffect, useState } from "react";
// Router Component
export default function BadgerStudyRouter() {
      // check if user has logged in before.
      const [loginStatus, setLoginStatus] = useState(false)
      useEffect(() => {
            const data = sessionStorage.getItem('isLoggedIn');
            // there's something in session storage.
            if (data) {
                  const info = JSON.parse(data);
                  setLoginStatus(info.loginStatus);
            }
      }, []);

      return (
            <div>
            <BadgerLoginStatusContext.Provider value={[loginStatus, setLoginStatus]}>
                  <Router>
                        <Routes>
                              <Route path='/' element={<BadgerStudy />}>
                                    <Route index element={<BadgerStudySearch />} />
                                    <Route path='location' element={<BadgerStudySpot />} />
                                    <Route path='register' />
                                    <Route path='login' element={<BadgerLogin />} />
                                    <Route path='userProfile' element={<BadgerUser />} />
                                    <Route path='*' element={<BadgerNoMatch />} />
                              </Route>
                        </Routes>
                  </Router>
            </BadgerLoginStatusContext.Provider>
            </div>
      )
}