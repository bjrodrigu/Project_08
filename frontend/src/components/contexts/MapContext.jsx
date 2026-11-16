import React, { useContext, createContext, useState, useEffect, useCallback, useMemo } from "react";
import { APIProvider } from "@vis.gl/react-google-maps";
import { useRef } from "react";
import { API_BASE } from "../../api";
import { haversineMiles } from "../../distance";

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

      // initialize states
      // raw list from the API; distances are derived below
      const [rawLocationList, setLocationList] = useState([]);
      const [buildings, setBuildings] = useState([]);


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
            // Straight-line distances need the browser's location. If it is
            // unavailable or denied, userLocation stays null and cards hide distance.
            if (navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition(
                        (position) => {
                              setUserLocation({
                                    lat: position.coords.latitude,
                                    lng: position.coords.longitude,
                              });
                        },
                        (err) => console.warn('Location unavailable:', err && err.message),
                        { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 }
                  );
            }
            fetchLocations();
            fetchBuildings();
      }, []);

      // Fetch reviews only once after the component mounts or remounts
     /** const callCountRef = useRef(0);
      useEffect(() => {
            if (callCountRef.current === 0) {
                  fetchReviews();
                  callCountRef.current++;
            }
      }, [locationList]); */

      // true once the first locations + reviews load has finished (even if it failed),
      // so the list can show a spinner instead of empty ratings / "No Results".
      const [locationsLoaded, setLocationsLoaded] = useState(false);

      // Load spots and their reviews together, so ratings never flash as 0 stars.
      const fetchLocations = async () => {
            try {
                  const [response, reviewResponse] = await Promise.all([
                        fetch(`${API_BASE}/location/getLocations`),
                        fetch(`${API_BASE}/review/getAllReviews`),
                  ]);
                  if (!response.ok) throw new Error('Failed to fetch locations');
                  if (!reviewResponse.ok) throw new Error('Failed to fetch reviews');
                  const [locationsData, reviewData] = await Promise.all([response.json(), reviewResponse.json()]);

                  setLocationList(locationsData.map((loc) => {
                        const ratings = reviewData
                              .filter((review) => review.location && review.location.name === loc.name)
                              .map((review) => review.rating);
                        return {
                              name: loc.name,
                              description: loc.description,
                              rating: ratings.length ? ratings.reduce((sum, r) => sum + r, 0) / ratings.length : 0,
                              reviews: ratings.length,
                              building: loc.buildingName,
                              tags: loc.taskNames || []
                        };
                  }));
            } catch (error) {
                  console.error(error);
            } finally {
                  setLocationsLoaded(true);
            }
      };


      // create API call for buildings
      const fetchBuildings = async () => {
            try {
                  const response = await fetch(`${API_BASE}/building/getBuildings`);
                  if (response.ok) {
                        const buildingsData = await response.json();
                        const formattedBuildings = buildingsData.map((building) => ({
                              name: building.name,
                              longitude: building.longitude,
                              latitude: building.latitude
                        }));
                        setBuildings(formattedBuildings);
                  } else {
                        throw new Error('Failed to fetch buildings');
                  }
            } catch (error) {
                  console.error(error);
            }
      };


      const [userLocation, setUserLocation] = useState(null);

      // Links the map and the list: hovering a spot highlights its building's pin,
      // clicking a pin selects that building and the list scrolls to its spots.
      const [hoveredBuilding, setHoveredBuilding] = useState(null);
      const [selectedBuilding, setSelectedBuilding] = useState(null);

      // Attach a straight-line (haversine) distance in miles from the user to each
      // spot's building. distance is null when location or building coords are missing.
      const locationList = useMemo(() => rawLocationList.map((loc) => {
            const b = buildings.find((building) => building.name === loc.building);
            const distance = userLocation && b && b.latitude != null && b.longitude != null
                  ? Math.round(haversineMiles(userLocation.lat, userLocation.lng, b.latitude, b.longitude) * 100) / 100
                  : null;
            return { ...loc, distance };
      }), [rawLocationList, buildings, userLocation]);

      return (
            <MapContext.Provider value={{ userLocation, setUserLocation, locationList, setLocationList, buildings, setBuildings, fetchLocations, locationsLoaded, hoveredBuilding, setHoveredBuilding, selectedBuilding, setSelectedBuilding }}>
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
