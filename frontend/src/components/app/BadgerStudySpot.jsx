import { useEffect, useState } from 'react';
import { Card, Carousel, Row, Col, Button, ListGroup, Spinner } from 'react-bootstrap';
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

      // styles for no reviews message
      const containerStyle = {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            border: '2px dashed #ccc',
            borderRadius: '10px',
            backgroundColor: '#f9f9f9',
            color: '#555',
            textAlign: 'center',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            margin: '2rem auto',
            width: '80%',
            maxWidth: '600px',
      };
      const headingStyle = {
            fontSize: '1.8rem',
            color: '#333',
            marginBottom: '0.5rem',
      };
      const paragraphStyle = {
            fontSize: '1rem',
            color: '#777',
      };


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
      const location = JSON.parse(localStorage.getItem("locState"));
      const locationName = location.name;
      // on page load
      useEffect(() => {
            // const run = loadHolder;
            run('image-class-name');
      }, [])

      useEffect(() => {
            fetchReviews();
      }, []);

      // function to fetch reviews from the API for a specific location
      const [reviews, setReviews] = useState([]);
      const [loading, setLoading] = useState(false);
      const fetchReviews = async () => {
            setLoading(true);
            try {
                  const response = await fetch(`http://localhost:8080/review/getReviewsForLocation?locationName=${locationName}`);
                  if (response.ok) {
                        setLoading(false);
                        const reviewsData = await response.json();
                        setReviews(reviewsData);
                  } else {
                        setLoading(false);
                        throw new Error('Failed to fetch reviews');
                  }
            } catch (error) {
                  console.error(error);
            }
      };


      // renders the add review button if the user is logged in, and the user has not already reviewed the location otherwise returns edit review button
      const renderAddReviewButton = () => {
            if (login) {
                  const userReview = reviews.find((review) => review.user.username === user);
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
                              {loading ? (
                                    <div
                                          style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                height: '100%',
                                                paddingTop: '50px'
                                          }}
                                    >
                                          <Spinner animation="border" role="status" />

                                    </div>
                              ) : (
                                    reviews.length > 0 ? (
                                          reviews.map((review) => (
                                                <BadgerReview
                                                      key={review.reviewId}
                                                      name={review.title}
                                                      review={review.comment}
                                                      rating={review.rating}
                                                />
                                          ))
                                    ) : (
                                          <div style={containerStyle}>
                                                <h2 style={headingStyle}>No Reviews Yet</h2>
                                                <p style={paragraphStyle}>Be the first to leave a review and share your experience!</p>
                                          </div>
                                    )
                              )}
                        </ListGroup>
                  </Card.Body>
            </Card>
            <script src='holder.js'></script>
      </>
}