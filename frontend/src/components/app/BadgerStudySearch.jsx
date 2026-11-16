import React, { useState, useEffect, useRef } from 'react';
import Select from 'react-select';
import { Form, Card, Col, Row, ListGroup, ListGroupItem, Spinner } from 'react-bootstrap';
import BadgerSearchResult from './BadgerSearchResult';
import { useLocationState } from '../contexts/MapContext';
import { Filter, ArrowDown, ArrowUp } from 'react-bootstrap-icons';
import { useLoginState } from '../contexts/LoginContext';
import { API_BASE } from "../../api";

// dummy values for testing
// const testData = [
//       {name: 'Bascom Hall Lounge', distance: 0.7, description: 'Quiet spot with lots of chairs and tables. Outlets are everywhere. Rarely occupied', rating: 4.3, reviews: 5, longitude: -89.4013, latitude: 43.0767, tags: ['Outlets', 'Tables', 'Groups', 'Cabins']},
//       {name: 'lorem', distance: 0.6, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', rating: 3.6, reviews: 12, longitude: -89.4011, latitude: 43.0775, tags: ['Quiet', 'Sofas']},
//       {name: 'ipsum', distance: 0.8, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', rating: 2.2, reviews: 23, longitude: -89.4016, latitude: 43.0761, tags: ['Groups', 'Loud', 'Food']},
//       {name: 'dolor', distance: 0.9, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', rating: 1.1, reviews: 24, longitude: -89.4014, latitude: 43.0772, tags: ['Tables', 'Cabins', 'Quiet']},
//       {name: 'sit', distance: 1.2, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', rating: 4.8, reviews: 1, longitude: -89.4023, latitude: 43.0767, tags: ['Wiscard', 'Reservations', 'Loud']},
//       {name: 'amet', distance: 2.4, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', rating: 3.2, reviews: 4, longitude: -89.4013, latitude: 43.0757, tags: ['Lorem', 'Ipsum', 'Dolor']},
// ]


// let tags = ['Loud', 'Quiet', 'Wiscard', 'Outlets', 'Group', 'Cabins', 'Reservations', 'Lorem', 'Ipsum', 'Dolor', 'Tables', 'Sofas'];

// TODO: Remove once we actually scrape API
// Convenience script to conver a simple placeholder list to appropriate form for react select
// tags = tags.reduce((prev, curr) => {
//       let acc = [...prev]
//       let n = {};
//       n['value'] = curr;
//       n['label'] = curr;
//       acc.push(n);
//       return acc;
// }, []);

// 0 descending, 1 ascending
const options = [
      { value: 0, label: "Closest First" },
      { value: 1, label: "Furthest First" },
      { value: 2, label: "Worst Rated" },
      { value: 3, label: "Best Rated" },
      { value: 4, label: "Least Reviews" },
      { value: 5, label: "Most Reviews" },
];

// react-select styled to match the Bootstrap inputs and the brand colors
const selectStyles = {
      control: (base, state) => ({
            ...base,
            minHeight: '2.4rem',
            borderRadius: '0.6rem',
            borderColor: state.isFocused ? '#12324a' : '#dee2e6',
            boxShadow: state.isFocused ? '0 0 0 3px rgba(197, 5, 12, 0.2)' : 'none',
            '&:hover': { borderColor: '#12324a' },
      }),
      placeholder: (base) => ({ ...base, color: '#5e6e7c' }),
      multiValue: (base) => ({ ...base, borderRadius: '999px', background: '#eef1f4' }),
      option: (base, state) => ({
            ...base,
            background: state.isSelected ? '#12324a' : state.isFocused ? '#eef1f4' : '#fff',
            color: state.isSelected ? '#fff' : '#12324a',
      }),
      menu: (base) => ({ ...base, zIndex: 20 }),
};

// Primary Component of homepage. Has search, and shows results
// TODO: Implement advanced filtered components, and filtering on updating form state
export default function BadgerStudySearch() {
      const { userLocation, setUserLocation, locationList, setLocationList, buildings, setBuildings, locationsLoaded = true, selectedBuilding } = useLocationState();
      const listRef = useRef(null);
      const [query, setQuery] = useState('');
      const [filterData, setFilterData] = useState([]);
      const params = ['name', 'distance', 'description', 'rating'];
      const [sort, setSort] = useState(0);
      const [chosenTags, setChosenTags] = useState([]);
      const [loading, setLoading] = useState(false);
      const [tags, setTags] = useState([]);

      //jy
      const [favLocationList, setFavLocationList] = useState([]);
      const { user, setUser, login, setLogin } = useLoginState();

      const fetchTags = async () => {
            const response = await fetch(`${API_BASE}/task/getTasks`);
            if (response.ok) {
                  const data = await response.json();
                  console.log('tags', data);
                  setTags(data.map(tag => {
                        return {
                              value : tag.name,
                              label : tag.name
                        }
                  }));
            }
            else{
                  console.error('Failed to fetch tags');
            }
      }

      useEffect(() => {
            fetchTags();
      }, []);

      const fetchFavLocations = async () => {
            const token = localStorage.getItem('token');
            try {
                  const response = await fetch(`${API_BASE}/favorite/getFavorites`, {
                        method: 'GET',
                        headers: {
                              'Content-Type': 'application/json',
                              'Authorization': `Bearer ${token}`,
                        },
                  });

                  if (response.ok) {

                        const data = await response.json();
                        setFavLocationList(data.map(loc => ({
                              favoriteId: loc.favorites[0].favoriteId,
                              locationId: loc.locationId,
                              name: loc.name,
                        })));



                  } else {
                        console.error('Failed to fetch favorite locations');
                  }
            } catch (error) {
                  console.error('Error fetching favorite locations:', error);
            }
      };

      //load
      useEffect(() => {

            if (login) {
                  fetchFavLocations();
            }
      }, [login]);



      const handleFavoriteChange = async (locationName, shouldFavorite, favoriteId = null) => {
            const API_BASE_URL = `${API_BASE}/favorite`; 
            const token = localStorage.getItem("token");

            try {
                  if (shouldFavorite) {
                        
                        const response = await fetch(`${API_BASE_URL}/addFavorite?locationName=${encodeURIComponent(locationName)}`, {
                              method: "POST",
                              headers: {
                                    "Content-Type": "application/json",
                                    Authorization: `Bearer ${token}`, 
                              },
                        });

                        if (response.ok) {
                              const newFavorite = await response.json();
                              console.log(`${locationName} added to favorites.`, newFavorite);
                              await fetchFavLocations();
                              
                        } else {
                              console.error("Failed to add favorite.");
                        }
                  } else {
                        
                        const response = await fetch(`${API_BASE_URL}/deleteFavorite?favorite_id=${favoriteId}`, {
                              method: "POST", 
                              headers: {
                                    "Content-Type": "application/json",
                                    Authorization: `Bearer ${token}`,
                              },
                        });

                        if (response.ok) {
                              console.log(`Favorite with ID ${favoriteId} removed.`);
                              await fetchFavLocations();
                             
                        } else {
                              console.error("Failed to remove favorite.");
                        }
                  }
            } catch (error) {
                  console.error("Error updating favorite:", error);
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
                              return String(entry[param] ?? '').toLowerCase().includes(query.toLowerCase());
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


      // When a building's pin is clicked, bring its first spot into view.
      useEffect(() => {
            if (!selectedBuilding || !listRef.current) return;
            const row = [...listRef.current.querySelectorAll('[data-building]')]
                  .find((el) => el.dataset.building === selectedBuilding);
            if (row) row.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, [selectedBuilding, filterData]);

      return <>
            <Card key={'Primary'} className="side-panel">
                  <div className="panel-search">
                        <h1 className="visually-hidden">Study spots at UW–Madison</h1>
                        <Form onSubmit={(e) => e.preventDefault()} role="search">
                              <Form.Group className="search mb-2" controlId="spot-search">
                                    <Form.Label visuallyHidden>Search study spots</Form.Label>
                                    <Form.Control onInput={e => { setQuery(e.target.value) }} type="search" placeholder="Search for a Location" />
                              </Form.Group>
                              <Row className="g-2">
                                    <Col>
                                          <Select
                                                aria-label="Sort study spots"
                                                placeholder={'Sort by'}
                                                onChange={e => { setSort(e.value) }}
                                                options={options}
                                                styles={selectStyles}
                                          />
                                    </Col>
                                    <Col>
                                          <Select
                                                aria-label="Filter by tags"
                                                placeholder={'Tags'}
                                                isMulti
                                                onChange={handleChange}
                                                options={tags}
                                                styles={selectStyles}
                                          />
                                    </Col>
                              </Row>
                        </Form>
                  </div>
                  <Card.Body ref={listRef} style={{ padding: 0 }}>
                        {loading || !locationsLoaded ? (
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: '12rem' }}>
                                    <Spinner animation="border" role="status" />
                              </div>
                        ) : filterData.length === 0 ? (
                              <p className="spot-empty">
                                    {query || chosenTags.length
                                          ? 'No spots match. Try a different name or fewer tags.'
                                          : 'No study spots yet.'}
                              </p>
                        ) : (
                              <ul className="spot-list" aria-label="Study spots">
                                    {filterData.map((location) => {
                                          const fav = favLocationList.find(f => f.name === location.name);
                                          return <BadgerSearchResult key={location.name}
                                                location={location}
                                                isFavorite={!!fav}
                                                favoriteId={fav && fav.favoriteId}
                                                onFavoriteChange={(name, shouldFavorite) => handleFavoriteChange(name, shouldFavorite, fav && fav.favoriteId)} />;
                                    })}
                              </ul>
                        )}
                  </Card.Body>
            </Card>
      </>;
}