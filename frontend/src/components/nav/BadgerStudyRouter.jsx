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
import BadgerAddReviewPage from "../app/BadgerAddReviewPage";

import { useState, useEffect } from "react"
import { LoginContext } from "../contexts/LoginContext";
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
            <LoginContext.Provider value={[loginStatus, setLoginStatus]}>
                  <Router>
                        <Routes>
                              <Route path='/' element={<BadgerStudy />}>
                                    <Route index element={<BadgerStudySearch />} />
                                    <Route path='register' /> {/** sign up page */}
                                    <Route path='login' element={<BadgerLogin />} /> {/** login page */}
                                    <Route path='userProfile' element={<BadgerUser />} /> {/** profile page */}
                                    <Route path='location' element={<BadgerStudySpot />} /> {/**Location page */}
                                    <Route path='review' /> {/** review page */}
                                    <Route path='addReview' element={<BadgerAddReviewPage />} /> {/** add review page */}
                                    <Route path='*' element={<BadgerNoMatch />} /> {/** 404 page */}
                              </Route>
                        </Routes>
                  </Router>
            </LoginContext.Provider>
      )
}