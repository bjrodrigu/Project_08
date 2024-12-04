import React, { useContext, createContext, useState, useEffect, useCallback } from "react";
import { APIProvider } from "@vis.gl/react-google-maps";
import { useRef } from "react";

const MapContext = createContext();
const MapContextProvider = ({ children }) => {
      // TODO: remove dummy location data
      // const testLocations = [
      //       { name: 'Bascom Hall Lounge', distance: 0, description: 'Quiet spot with lots of chairs and tables. Outlets are everywhere. Rarely occupied', rating: 4.3, reviews: 5, building: 'Building A', tags: ['Outlets', 'Tables', 'Groups', 'Cabins'] },
      //       { name: 'lorem', distance: 0, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', rating: 3.6, reviews: 12, building: 'Building B', tags: ['Quiet', 'Sofas'] },
      //       { name: 'ipsum', distance: 0, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', rating: 2.2, reviews: 23, building: 'Building C', tags: ['Groups', 'Loud', 'Food'] },
      //       { name: 'dolor', distance: 0, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', rating: 1.1, reviews: 24, building: 'Building D', tags: ['Tables', 'Cabins', 'Quiet'] },
      //       { name: 'sit', distance: 0, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', rating: 4.8, reviews: 1, building: 'Building E', tags: ['Wiscard', 'Reservations', 'Loud'] },
      //       { name: 'amet', distance: 0, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', rating: 3.2, reviews: 4, building: 'Building F', tags: ['Lorem', 'Ipsum', 'Dolor'] },
      //       { name: 'asdf', distance: 0, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', rating: 3.2, reviews: 4, building: 'Building F', tags: ['Lorem', 'Ipsum', 'Dolor'] },
      // ]
      const [locationList, setLocationList] = useState([]);

      const testBuildings = [
            { name: 'Building A', longitude: -89.4013, latitude: 43.0767 },
            { name: 'Building B', longitude: -89.4085, latitude: 43.0775 },
            { name: 'Building C', longitude: -89.4016, latitude: 43.0730 },
            { name: 'Building D', longitude: -89.4110, latitude: 43.0755 },
            { name: 'Building E', longitude: -89.3985, latitude: 43.0723 },
            { name: 'Building F', longitude: -89.4070, latitude: 43.0753 },
            { name: 'Fake Building', longitude: -89.404, latitude: 43.076 },
      ]

      useEffect(() => {
            fetchLocations();
      }, []);

      // Fetch reviews only once after the component mounts or remounts
      const callCountRef = useRef(0);
      useEffect(() => {
            if (callCountRef.current === 0) {
                  fetchReviews();
                  callCountRef.current++;
            }
      }, [locationList]);

      const fetchLocations = async () => {
            try {
                  const response = await fetch('http://localhost:8080/location/getLocations');
                  if (response.ok) {
                        const locationsData = await response.json();
                        const formattedLocations = locationsData.map((loc) => ({
                              name: loc.name,
                              distance: loc.distance || 0,
                              description: loc.description,
                              rating: loc.rating || 0,
                              reviews: loc.reviews || 0,
                              building: loc.buildingName,
                              tags: loc.tags || []
                        }));

                        setLocationList(formattedLocations);
                  } else {
                        throw new Error('Failed to fetch locations');
                  }
            } catch (error) {
                  console.error(error);
            }
      };


      const fetchReviews = async () => {
            try {
                  const response = await fetch('http://localhost:8080/review/getAllReviews');
                  if (response.ok) {
                        const reviewData = await response.json()
                        const tempLocList = locationList;
                        // iterate through all locations
                        for (let i = 0; i < tempLocList.length; i++) {
                              let avg = 0;
                              let count = 0;
                              // iterate through all reviews
                              for (let j = 0; j < reviewData.length; j++) {
                                    // check if review is relevant
                                    if (reviewData[j].location.name == tempLocList[i].name) {
                                          avg += reviewData[j].rating;
                                          count += 1;
                                    }
                              }
                              // calculate total average
                              avg = avg / count;
                              // set avg
                              tempLocList[i].rating = avg;
                              // set rating
                              tempLocList[i].reviews = count;
                              console.log('tll', tempLocList);
                              setLocationList(tempLocList);
                        }
                        // const locationsData = await response.json();
                        // const formattedLocations = locationsData.map((loc) => ({
                        //       name: loc.name,
                        //       distance: loc.distance || 0,
                        //       description: loc.description,
                        //       rating: loc.rating || 0, 
                        //       reviews: loc.reviews || 0, 
                        //       building: loc.buildingName,
                        //       tags: loc.tags || [] 
                        //   }));
                  } else {
                        throw new Error('Failed to fetch reviews');
                  }
            } catch (error) {
                  console.error(error);
            }
      };

      /** 
            // create API call for buildings
            const fetchBuildings = async () => {
                  try {
                        const response = await fetch('http://localhost:8080/building/getBuildings');
                        if (response.ok) {
                              const buildingsData = await response.json();
                              console.log(buildingsData);
                              //setBuildings(buildingsData);
                        } else {
                              throw new Error('Failed to fetch buildings');
                        }
                  } catch (error) {
                        console.error(error);
                  }
            };
      */

      // initialize states
      const [userLocation, setUserLocation] = useState(null);
      const [buildings, setBuildings] = useState(testBuildings);
      const [distMatrix, setDistMatrix] = useState([]);
      const apiKey = 'AIzaSyCl9i1askwfTLHo-e1cERhPl58O8bEjuzU';

      // get user location
      if (navigator.geolocation) {
            // get location if available
            // TODO: implement context
            navigator.geolocation.getCurrentPosition((position) => {
                  // get coordinates
                  let lat = position.coords.latitude.toFixed(5);
                  let long = position.coords.longitude.toFixed(5);
                  let lobj = { lat: lat, lng: long };
                  // pass to map context
                  setUserLocation(lobj);
            });
      } else {
            // TODO: pop up for locations
      }

      // TODO: integrate location retrieval from backend API
      // TODO: fallback Haversine Formula

      // store user location
      return (
            <MapContext.Provider value={{ userLocation, setUserLocation, locationList, setLocationList, buildings, setBuildings }}>
                  {children}
            </MapContext.Provider>
      );

};
// custom hook to use the MapContext. Unpack returned object as below
// Example Unpacking: `const {userLocation, setUserLocation, locationList, setLocationList, buildings} = useLocationState();`
const useLocationState = () => {
      // retrieve context
      const context = useContext(MapContext);

      // throw error if retrieval fails
      if (context === undefined) {
            throw new Error('useLocationState was used outside its Provider');
      }

      return context;
};

export { MapContext, MapContextProvider, useLocationState }
