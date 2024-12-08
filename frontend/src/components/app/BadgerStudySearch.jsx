import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Form, Card, Col, Row, ListGroup, ListGroupItem, Spinner } from 'react-bootstrap';
import BadgerSearchResult from './BadgerSearchResult';
import { useLocationState } from '../contexts/MapContext';
import { Filter, ArrowDown, ArrowUp } from 'react-bootstrap-icons';
import { useLoginState } from '../contexts/LoginContext';

// dummy values for testing
// const testData = [
//       {name: 'Bascom Hall Lounge', distance: 0.7, description: 'Quiet spot with lots of chairs and tables. Outlets are everywhere. Rarely occupied', rating: 4.3, reviews: 5, longitude: -89.4013, latitude: 43.0767, tags: ['Outlets', 'Tables', 'Groups', 'Cabins']},
//       {name: 'lorem', distance: 0.6, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', rating: 3.6, reviews: 12, longitude: -89.4011, latitude: 43.0775, tags: ['Quiet', 'Sofas']},
//       {name: 'ipsum', distance: 0.8, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', rating: 2.2, reviews: 23, longitude: -89.4016, latitude: 43.0761, tags: ['Groups', 'Loud', 'Food']},
//       {name: 'dolor', distance: 0.9, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', rating: 1.1, reviews: 24, longitude: -89.4014, latitude: 43.0772, tags: ['Tables', 'Cabins', 'Quiet']},
//       {name: 'sit', distance: 1.2, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', rating: 4.8, reviews: 1, longitude: -89.4023, latitude: 43.0767, tags: ['Wiscard', 'Reservations', 'Loud']},
//       {name: 'amet', distance: 2.4, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', rating: 3.2, reviews: 4, longitude: -89.4013, latitude: 43.0757, tags: ['Lorem', 'Ipsum', 'Dolor']},
// ]


let tags = ['Loud', 'Quiet', 'Wiscard', 'Outlets', 'Group', 'Cabins', 'Reservations', 'Lorem', 'Ipsum', 'Dolor', 'Tables', 'Sofas'];

// TODO: Remove once we actually scrape API
// Convenience script to conver a simple placeholder list to appropriate form for react select
tags = tags.reduce((prev, curr) => {
      let acc = [...prev]
      let n = {};
      n['value'] = curr;
      n['label'] = curr;
      acc.push(n);
      return acc;
}, []);

// 0 descending, 1 ascending
const options = [
      { value: 0, label: "Closest First" },
      { value: 1, label: "Furthest First" },
      { value: 2, label: "Worst Rated" },
      { value: 3, label: "Best Rated" },
      { value: 4, label: "Least Reviews" },
      { value: 5, label: "Most Reviews" },
];

// Primary Component of homepage. Has search, and shows results
// TODO: Implement advanced filtered components, and filtering on updating form state
export default function BadgerStudySearch() {
      const { userLocation, setUserLocation, locationList, setLocationList, buildings, setBuildings } = useLocationState();
      const [query, setQuery] = useState('');
      const [filterData, setFilterData] = useState([]);
      const params = ['name', 'distance', 'description', 'rating'];
      const [sort, setSort] = useState(0);
      const [chosenTags, setChosenTags] = useState([]);
      const [loading, setLoading] = useState(false);

      //jy
      const [favLocationList, setFavLocationList] = useState([]);
      const { user, setUser, login, setLogin } = useLoginState();

      const fetchFavLocations = async () => {
            const token = localStorage.getItem('token');
            try {
                  const response = await fetch('http://localhost:8080/favorite/getFavorites', {
                        method: 'GET',
                        headers: {
                              'Content-Type': 'application/json',
                              'Authorization': `Bearer ${token}`,
                        },
                  });

                  if (response.ok) {

                        const data = await response.json();
                        console.log("fav LOcation");
                        console.log(data);
                        setFavLocationList(data.map(loc => loc.name));
                  } else {
                        console.error('Failed to fetch favorite locations');
                  }
            } catch (error) {
                  console.error('Error fetching favorite locations:', error);
            }
      };

      //load
      useEffect(() => {
            console.log(login);
            if (login) {
                  fetchFavLocations();
            }
      }, [login]);

      const handleFavoriteChange = async (locationName, shouldFavorite) => {
            const API_BASE_URL = "http://localhost:8080/favorite";
            const token = localStorage.getItem("token");

            try {
                  if (shouldFavorite) {
                        // 添加收藏
                        await fetch(`${API_BASE_URL}/add`, {
                              method: "POST",
                              headers: {
                                    "Content-Type": "application/json",
                                    Authorization: `Bearer ${token}`,
                              },
                              body: JSON.stringify({ locationName }),
                        });
                  } else {
                        // 取消收藏
                        await fetch(`${API_BASE_URL}/remove`, {
                              method: "DELETE",
                              headers: {
                                    "Content-Type": "application/json",
                                    Authorization: `Bearer ${token}`,
                              },
                              body: JSON.stringify({ locationName }),
                        });
                  }
            } catch (error) {
                  console.error("Failed to update favorite status:", error);
            }
      };
      // tester
      // useEffect(() => {console.log(chosenTags)}, [chosenTags]);

      // update tag list
      const handleChange = (e) => {
            let temp = e.reduce((prev, curr) => {
                  let acc = [...prev];
                  acc.push(curr.value)
                  return acc;
            }, []);
            setChosenTags(temp);
      }

      // filter and sort data
      useEffect(() => {
            setLoading(true);
            let temp = [...locationList];
            // console.log(temp);

            // filter data first
            if (query == '') {
                  setFilterData(temp);
            } else {
                  temp = temp.filter((entry) => {
                        return params.some(param => {
                              // console.log(entry[param].toString().includes(query));
                              return entry[param].toString().toLowerCase().includes(query.toLowerCase());
                        })
                  })
            }
            // filter by tag
            temp = temp.filter((entry) => {
                  return chosenTags.every((tg) => {
                        // console.log(entry['tags'].includes(tg));
                        return entry['tags'].includes(tg);
                  })
            });
            // console.log(temp);
            // sort data
            switch (sort) {
                  // closest first
                  case 0:
                        temp.sort((a, b) => {
                              return a['distance'] - b['distance'];
                        });
                        break;
                  // farthest first
                  case 1:
                        temp.sort((a, b) => {
                              return b['distance'] - a['distance'];
                        })
                        break;
                  // worst rated
                  case 2:
                        temp.sort((a, b) => {
                              return a['rating'] - b['rating'];
                        })
                        break;
                  // best rated
                  case 3:
                        temp.sort((a, b) => {
                              return b['rating'] - a['rating'];
                        })
                        break;
                  // least reviews
                  case 4:
                        temp.sort((a, b) => {
                              return a['reviews'] - b['reviews'];
                        })
                        break;
                  // most reviews
                  case 5:
                        temp.sort((a, b) => {
                              return b['reviews'] - a['reviews'];
                        })
                        break;
            }
            setFilterData(temp);
            setLoading(false);
      }, [query, sort, chosenTags, locationList]);


      return <>
            <Card key={'Primary'} style={{ height: '85vh', overflowY: 'hidden', borderRadius: '2rem', width: '35rem', position: 'absolute', top: '9vh', left: '2vw' }}>
                  <Card.Header style={{ padding: '2rem', paddingBottom: '1rem' }}>
                        <Form>
                              <Form.Group className="search" controlId="exampleForm.ControlInput1">
                                    <Form.Control onInput={e => { setQuery(e.target.value) }} type="text" placeholder="Search for a Location" style={{ height: '3rem', width: 'fit' }} />
                              </Form.Group>
                              <br />
                              <Row>
                                    <Col>
                                          <Select
                                                placeholder={'Sort Study Spots'}
                                                onChange={e => { setSort(e.value) }}
                                                options={options}
                                          />
                                    </Col>
                                    <Col>
                                          <Select
                                                placeholder={'Tags: '}
                                                isMulti
                                                onChange={handleChange}
                                                options={tags}
                                          >
                                          </Select>
                                    </Col>
                              </Row>
                              {/* <Form.Select size='sm' style={{width: '5rem'}} onChange={e => setSort(e.target.value)} defaultValue={1}>
                                    <option disabled={true}><Filter style={{backgroundSize: '10px'}} />Sort</option>
                                    <option value={1}>Distance Ascending<ArrowUp /></option>
                                    <option value={2}>Distance Descending<ArrowDown /></option>
                              </Form.Select> */}
                        </Form>
                  </Card.Header>
                  <Card.Body style={{ overflowY: 'scroll', paddingLeft: '2rem', paddingRight: '2rem' }}>
                        {loading ? (
                              <div
                                    style={{
                                          display: 'flex',
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                          height: '100%',
                                    }}
                              >
                                    <Spinner animation="border" role="status" />

                              </div>
                        ) : filterData.length === 0 ? (
                              <Card key={'Primary'} bg={'light'} style={{ borderRadius: '1.5rem', position: "relative", width: 'auto', height: '60vh', margin: '2vh 1.5vw 2vh 1.5vw' }}>
                                    <div style={{
                                          display: 'flex',
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                          height: '100%'
                                    }}>
                                          No Results
                                    </div>
                              </Card>
                        ) : (
                              filterData.map((location) => {
                                    const isFavorite = favLocationList.includes(location.name);
                                    return <BadgerSearchResult key={location.name} {...location} isFavorite={isFavorite} onFavoriteChange={handleFavoriteChange}/>;
                              })
                        )
                        }
                  </Card.Body>
            </Card>
      </>;
}