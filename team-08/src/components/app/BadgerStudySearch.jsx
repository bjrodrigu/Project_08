import React, {useState, useEffect} from 'react';
import {Form, Card} from 'react-bootstrap';
import BadgerSearchResult from './BadgerSearchResult';

// dummy values for testing
const testData = [
      {name: 'Bascom Hall Lounge', distance: 0.7, description: 'Quiet spot with lots of chairs and tables. Outlets are everywhere. Rarely occupied', rating: 4.3},
      {name: 'lorem', distance: 0.6, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', rating: 3.6},
      {name: 'ipsum', distance: 0.8, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', rating: 2.2},
      {name: 'dolor', distance: 0.9, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', rating: 1.1},
      {name: 'sit', distance: 1.2, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', rating: 4.8},
      {name: 'amet', distance: 2.4, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', rating: 3.2},
]

// Primary Component of homepage. Has search, and shows results
// TODO: Implement advanced filtered components, and filtering on updating form state
export default function BadgerStudySearch() {
      const [query, setQuery] = useState('');

      useEffect(() => {
      }, [query]);

      return <>      
            <Card key={'Primary'} style={{height: '90vh', overflowY: 'auto', borderRadius: '2rem', width:'40rem'}}>
                  <Card.Header style={{padding: '2rem'}}>
                        <Form>
                              <Form.Group className="search" controlId="exampleForm.ControlInput1">
                                    <Form.Control onInput={e=> setQuery(e.target.value)} type="text" placeholder="Search for a Location" style={{height: '3rem', }}/>
                              </Form.Group>
                        </Form>
                  </Card.Header>
                  <Card.Body style={{paddingLeft: '2rem', paddingRight: '2rem'}}>
                        {query == '' && testData.map((location) => {
                                    return <BadgerSearchResult key={location.name} {...location}/>
                              })
                        }
                        {!query == '' && <Card key={'Primary'} bg={'light'} style={{ borderRadius: '1.5rem', position: "relative", width: 'auto', height: '72vh', margin: '2vh 1.5vw 2vh 1.5vw'}}>
                              <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: '100%'
                              }}>
                                    No Results
                              </div>
                        </Card>}
                  </Card.Body>
            </Card>
      </>;
}