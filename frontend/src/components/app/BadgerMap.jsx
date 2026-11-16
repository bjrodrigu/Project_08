import React, { useEffect, useState } from 'react';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import { useLocationState } from '../contexts/MapContext';
import { Spinner } from 'react-bootstrap';

// Set REACT_APP_GOOGLE_MAPS_API_KEY in frontend/.env.local (see .env.example).
const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;


/**
 * Component that displays a map of study spots on the UW-Madison campus through Google Maps API.
 * 
 * @returns A map of study spots on the UW-Madison campus.
*/
export default function BadgerMap() {
    // Distances are computed in MapContext (haversine from navigator.geolocation),
    // so the map only needs the user's position and the buildings.
    const { userLocation, locationList, buildings } = useLocationState();
    const [uniqueList, setUniqueList] = useState([]);
    const [loading, setLoading] = useState(true);

    // filter locations to get only unique coordinates
    // also reduces markers to indicate number of spots at a location/building
    useEffect(() => {
        setUniqueList(locationList.reduce((acc, loc) => {
            // get first instance
            var first = locationList.find(location => { return location.building == loc.building });
            var building = buildings.find(building => { return building.name == loc.building });
            // get number of instances
            if (building) {
                var instances = locationList.filter(location => { return location.building == loc.building }).length;
                // check if this is the first instance
                if (first == loc) {
                    acc.push({ name: loc.building, instances: instances.toString(), latitude: building.latitude, longitude: building.longitude });
                }
            }
            return acc;
        }, []));
        setLoading(false);
    }, [locationList, buildings]);

    return (
        <div>
            {loading ? (
                <div className="loading-screen">
                    <Spinner animation="border" variant="primary" role="status" />
                </div>
            ) : (
                <APIProvider apiKey={apiKey}>
                    <div className="map">
                        <Map
                            defaultZoom={16}
                            defaultCenter={{ lat: 43.076, lng: -89.404 }}
                            reuseMaps={true}
                        >
                        </Map>
                        {userLocation && <Marker
                            optimized={true}
                            label={'You'}
                            position={{
                                lat: parseFloat(userLocation.lat),
                                lng: parseFloat(userLocation.lng),
                            }}
                            title={'Your Location'}
                        />}
                        {uniqueList.map((a) => {
                            return <Marker
                                key={a.name}
                                optimized={true}
                                label={a.instances}
                                position={{
                                    lat: a.latitude,
                                    lng: a.longitude,
                                }}
                                title={a.name}
                            />
                        })}
                    </div>
                </APIProvider>
            )}
        </div>
    );
};