import { useEffect, useState } from 'react';
import { Card, Carousel, Row, Col, Button, ListGroup } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { run } from 'holderjs/holder'
import BadgerReview from '../app/BadgerReview';
import { ArrowLeft } from 'react-bootstrap-icons';
import { useLoginState } from '../contexts/LoginContext';
import ReactAddReviewButton from './ReactAddReviewButton';
// async function loadHolder() {
//       // if(typeof window !== undefined) {
//             const mod = await import('holderjs/holder');
//             return mod.run;
//       // }
// }


// Component to display details, images and reviews for a particular location
export default function BadgerStudySpot() {
      // retrieve the currently selected location via useLocation and save to a state object
      // retrieve and unpack user state
      const { user, setUser, login, setLogin } = useLoginState();
      const [color, setColor] = useState('light');
      // create a navigate object
      let navigate = useNavigate();
      // create routeChange function to redirect to home
      const routeChange = () => {
            let path = '../';
            navigate(path);
      }
      var { state } = useLocation();
      if (state != null) {
            localStorage.setItem("locState", JSON.stringify(state));
      } else {
            state = JSON.parse(localStorage.getItem("locState"));
            // if no local location is stored, redirect to home page
            if (state == null) {
                  navigate('../');
            }
            // console.log(state);
      }
      // on page load
      useEffect(() => {
            // const run = loadHolder;
            run('image-class-name');
      }, [])

      // renders the add review button if the user is logged in, and the user has not already reviewed the location otherwise returns edit review button
      const renderAddReviewButton = () => {
            if (login) {
                  const userReview = reviews.find((review) => review.poster === user);

                  return (
                        <div style={{ margin: '1rem', textAlign: 'right' }}>
                              <ReactAddReviewButton
                                    location={state}
                                    existingReview={userReview || null}
                                    buttonText={userReview ? "Edit Review" : "Add Review"}
                              />
                        </div>
                  );
            }
            return null;
      };



      // dummy data for reviews
      const reviews = [
            { name: 'lorem', rating: 1.4, review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim' },
            { name: 'ipsum', rating: 3.4, review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim' },
            { name: 'dolor', rating: 4.4, review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim' },
            { name: 'sit', rating: 3.8, review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim' },
            { name: 'amet', rating: 0.4, review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim' }
      ]

      return <>
            <Card key={'Primary'} style={{ height: '90vh', overflowY: 'hidden', borderRadius: '2rem', width: '35rem', position: "absolute", top: '9vh', left: '2vw' }}>
                  <Card.Header style={{ paddingLeft: '2rem', paddingTop: '2rem', paddingBottom: '1rem' }}>
                        <Row>
                              <Col sm="2">
                                    <Button variant='outline-info' onClick={routeChange} style={{ borderRadius: '50%', height: '3rem', width: '3rem' }}><ArrowLeft /></Button>
                              </Col>
                              <Col sm="4">
                                    <Card.Title style={{ fontSize: '2rem', marginLeft: '-1.5rem', paddingTop: '0.25rem', paddingBottom: '0.25rem', height: '2.rem' }}>{state.name}</Card.Title>
                              </Col>
                              <Col sm="3">
                                    <Card.Subtitle style={{ fontSize: '1.5rem', textAlign: 'right', paddingTop: '0.75rem' }}>{state.distance}mi</Card.Subtitle>
                              </Col>
                              <Col sm="3">
                                    <Button variant='primary' style={{ marginTop: '0.25rem', height: '2.5rem' }}> Navigate</Button>
                              </Col>
                        </Row>
                  </Card.Header>



                  <Card.Body style={{ overflowY: 'scroll', padding: '1rem' }}>
                        <ListGroup variant='flush'>
                              <ListGroup.Item>
                                    <Carousel data-bs-theme="dark" style={{ paddingBottom: '1rem' }}>
                                          <Carousel.Item>
                                                <Card.Img variant='bottom' src='holder.js/75px360' style={{ margin: 'auto', width: 'auto' }} />
                                          </Carousel.Item>
                                          <Carousel.Item>
                                                <Card.Img variant='bottom' src='holder.js/100px360' style={{ margin: 'auto', width: 'auto' }} />
                                          </Carousel.Item>
                                          <Carousel.Item>
                                                <Card.Img variant='bottom' src='holder.js/90px360' style={{ margin: 'auto', width: 'auto' }} />
                                          </Carousel.Item>
                                    </Carousel>
                              </ListGroup.Item>
                              <ListGroup.Item>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                          <h1>Reviews</h1>
                                          {renderAddReviewButton()}
                                    </div>
                              </ListGroup.Item>
                              {reviews.map((review) => {
                                    return <BadgerReview key={review.name} {...review} />
                              })}
                        </ListGroup>
                  </Card.Body>
            </Card>
            <script src='holder.js'></script>
      </>
}