import { Card, Carousel, Row, Col, Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router';
import { useHolderjs } from 'use-holderjs';
import BadgerReview from '../app/BadgerReview';
import { ArrowLeft } from 'react-bootstrap-icons';
import ReactAddReviewButton from './ReactAddReviewButton';
import { useLoginState } from '../contexts/LoginContext';


// Component to display details, images and reviews for a particular location
export default function BadgerStudySpot() {
      // retrieve the currently selected location via useLocation and save to a state object
      const { state } = useLocation();
      console.log("state ", state);

      // create a navigate object
      let navigate = useNavigate();
      // create routeChange function to redirect to home
      const routeChange = () => {
            let path = '../';
            navigate(path);
      }
      // use login state to determine whether to show the add review button
      const {user, setUser, login, setLogin} = useLoginState();
      console.log("user ", user);


      // dummy data for reviews
      const reviews = [
            { name: 'lorem', rating: 1.4, review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim' },
            { name: 'ipsum', rating: 3.4, review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim' },
            { name: 'dolor', rating: 4.4, review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim' },
            { name: 'sit', rating: 3.8, review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim' },
            { name: 'amet', rating: 0.4, review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim' }
      ]

      return <>
            <Card key={'Primary'} style={{ height: '90vh', overflowY: 'auto', borderRadius: '2rem', width: '40rem', position: "absolute", top: '9vh', left: '2vw' }}>
                  <Card.Header style={{ paddingLeft: '2rem', paddingTop: '2rem', paddingBottom: '2rem' }}>
                        <Row>
                              <Col sm="2">
                                    <Button variant='outline-info' onClick={routeChange} style={{ borderRadius: '50%', height: '3rem', width: '3rem' }}><ArrowLeft /></Button>
                              </Col>
                              <Col sm="8">
                                    <Card.Title style={{ fontSize: '2rem', marginLeft: '-1.5rem', paddingBottom: '1rem' }}>{state.name}</Card.Title>
                              </Col>
                              <Col sm="2">
                                    <Card.Subtitle style={{ fontSize: '1.5rem', textAlign: 'right', paddingTop: '0.75rem' }}>{state.distance}mi</Card.Subtitle>
                              </Col>
                        </Row>
                        {useHolderjs()}
                        <Carousel data-bs-theme="dark">
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
                  </Card.Header>
                  { login &&
                  <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '1rem' }}>
                        <ReactAddReviewButton location={state} />
                  </div>
                  }
                  {/* show reviews */}
                  <Card.Body>
                        {reviews.map((review) => {
                              return <BadgerReview key={review.name} {...review} />
                        })}
                  </Card.Body>
            </Card>
            <script src='holder.js'></script>
      </>
}