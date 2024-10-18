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

// Router Component
export default function BadgerStudyRouter() {
      return (
            <Router>
                  <Routes>
                        <Route path='/' element={<BadgerStudy />}>
                              <Route index element={<BadgerStudySearch />} />
                              <Route path='location' element={<BadgerStudySpot />}/> {/**Location page */}
                              <Route path='register' /> {/** sign up page */}
                              <Route path='login' /> {/** login page */}
                              <Route path='review' /> {/** review page */}
                              <Route path='*'  element={<BadgerNoMatch />}/> {/** 404 page */}
                        </Route>
                  </Routes>
            </Router>
      )
}