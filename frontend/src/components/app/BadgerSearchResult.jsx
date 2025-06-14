import { Card, Row, Col, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import StarRatings from 'react-star-ratings';
import { useEffect, useState } from 'react';
import { useLoginState } from '../contexts/LoginContext';
// Component for individual locations in the search result page
export default function BadgerSearchResult({ location, isFavorite, favoriteId, onFavoriteChange }) {
      // navigate to a particular location, saves location data which is served in the `state` variable
      let navigate = useNavigate();
      const routeChange = () => {
            let path = '../location';
            navigate(path, { state: location });
      }

      // variations for tags.
      const variations = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark']

      // hook to re-render on hover
      let [color, setColor] = useState('Light');

      // jy
      const { user, setUser, login, setLogin } = useLoginState();

      const handleStarClick = () => {
            console.log("location is 123");
            console.log(location);
            if (isFavorite) {
                  onFavoriteChange(location.name, false, favoriteId);
            } else {
                  onFavoriteChange(location.name, true);
            }
      };

      return <Card border={color.toLowerCase()} onMouseEnter={() => { setColor('Info'); }} onMouseLeave={() => { setColor('Light'); }} onClick={routeChange} style={{ height: 'auto', borderRadius: '1.5rem', cursor: 'pointer', marginTop: '2rem' }}>
            <Card.Header style={{ paddingLeft: '1rem', paddingTop: '1rem', display: "flex", justifyContent: "space-between" }}>
                  <Card.Title >{location.name}</Card.Title>
                 
                  {login && (
                        <div
                              style={{ display: "inline-block" }}
                              onClick={(e) => e.stopPropagation()} 
                        >
                              <StarRatings
                                    rating={isFavorite ? 1 : 0}
                                    starRatedColor="gold"
                                    starHoverColor="gold"
                                    numberOfStars={1}
                                    changeRating={handleStarClick}
                                    starDimension="30px"
                                    starSpacing="5px"
                                    name="favorite"
                              />
                        </div>
                  )}
            </Card.Header>
            <Card.Body>
                  <Row>
                        <Col>
                              <StarRatings rating={location.rating} numberOfStars={5} starRatedColor='black' starDimension='1.5rem' />
                              <p style={{ display: 'inline-block', height: '1.5rem', textAlign: 'center', justifyContent: 'center', lineHeight: '1.5rem' }}>({location.reviews})</p>
                        </Col>
                        <Col>
                              <Card.Text style={{ textAlign: 'right' }}>{location.distance}mi</Card.Text>
                        </Col>
                  </Row>
                  {location.tags.map((tag, index) => {
                        return <Badge pill key={tag} bg={variations[index % variations.length]} style={{ marginRight: '10px' }}>{tag}</Badge>
                  })}
                  <br />
                  <br />
                  <Card.Text >{location.description}</Card.Text>
            </Card.Body>
      </Card>
}