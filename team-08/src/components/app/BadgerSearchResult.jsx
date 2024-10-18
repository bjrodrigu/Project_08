import { Card, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import StarRatings from 'react-star-ratings';
import { useEffect, useState } from 'react';

// Component for individual locations in the search result page
export default function BadgerSearchResult(location) {
      // navigate to a particular location, saves location data which is served in the `state` variable
      let navigate = useNavigate();
      const routeChange = () => {
            let path ='../location';
            navigate(path, {state: location});
      }
      
      let [color, setColor] = useState('Light');
      
      return <Card border={color.toLowerCase()} onMouseEnter={() => {setColor('Info');}} onMouseLeave={() => {setColor('Light');}} onClick={routeChange} style={{height: 'auto', borderRadius: '1.5rem', cursor: 'pointer', marginTop: '2rem'}}>
                  <Card.Header  style={{paddingLeft:'1rem', paddingTop: '1rem'}}>
                        <Card.Title >{location.name}</Card.Title>
                  </Card.Header>
                  <Card.Body as={Row}>
                        <Col>
                              <StarRatings rating={location.rating} numberOfStars={5} starRatedColor='black' starDimension='1.5rem'/>
                        </Col>
                        <Col>
                              <Card.Text style={{textAlign: 'right'}}>{location.distance}mi</Card.Text>
                        </Col>
                        <br />
                        <br />
                        <Card.Text >{location.description}</Card.Text>
                  </Card.Body>
            </Card>
}