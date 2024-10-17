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

export default function BadgerStudyRouter() {
      return (
            <Router>
                  <Routes>
                        <Route path='/' element={<BadgerStudy />}>
                              <Route index element={<BadgerStudySearch />} />
                              <Route path='home' element={<BadgerStudySearch />} />
                              <Route path='location' element={<BadgerStudySpot />}/>
                              <Route path='register' />
                              <Route path='login' element={<BadgerLogin />}/>
                              <Route path='userProfile' element={<BadgerUser />} /> 
                              <Route path='*'  element={<BadgerNoMatch />}/>
                        </Route>
                  </Routes>
            </Router>
      )
}