import React, { useEffect, useState } from 'react';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import { useLocationState } from '../contexts/MapContext';
import { Loader } from "@googlemaps/js-api-loader";
// WARNING: DO NOT CHANGE till deployment
const apiKey = 'AIzaSyCl9i1askwfTLHo-e1cERhPl58O8bEjuzU';


/**
 * Component that displays a map of study spots on the UW-Madison campus through Google Maps API.
 * 
 * @returns A map of study spots on the UW-Madison campus.
*/
export default function BadgerMap() {
    // const [request, setRequest] = useState('https://maps.googleapis.com/maps/api/distancematrix/json?destinations=');
    const {userLocation, setUserLocation, locationList, setLocationList, buildings, setBuildings} = useLocationState();
    const [userPlaceId, setUserPlaceId] = useState('');
    const [uniqueList, setUniqueList] = useState([]);
    const [r, setR] = useState(true);
    const [distMatrix, setDistMatrix] = useState(null);
    const [google, setGoogle] = useState(null);
    const [destinations, setDestinations] = useState([]);
    const loader = new Loader({
        apiKey: apiKey,
        version: "weekly",
    });
    
    // get distances
    useEffect(() => {
        // wait till map is loaded
        if(!userLocation || !r) return; 
        // load distance matrix component
        loader.load().then((google) => {
            const dm = new google.maps.DistanceMatrixService();
            setDistMatrix(dm);
            setGoogle(google);
        });
    }, [userLocation]);

    function geocodeCallback(response, status) {
        if(status == 'OK') {
            setDestinations(destinations => [...destinations, response[0].place_id]);
            // console.log(geocodedLocations);
        }
    }

    function userLocationCallback(response, status) {
        if (status == 'OK') {
            setUserPlaceId(userPlaceId => response[0].place_id);
        }
    }

    useEffect(() => {
        if (!google || !r) return;
        // create array of destinations
        var Geocoder = new google.maps.Geocoder();
        Geocoder.geocode({
            location: new google.maps.LatLng(userLocation.lat, userLocation.lng)
        }, userLocationCallback);
        for(var location of locationList) {
            var lat = buildings.find((building) => {return building.name == location.building}).latitude;
            var lng = buildings.find((building) => {return building.name == location.building}).longitude;
            Geocoder.geocode({
                location: new google.maps.LatLng(lat, lng)
            }, geocodeCallback)
            // var destination = new google.maps.LatLng(lat, lng);
        }
        setR(false);
    }, [google])

    function matrixCallback(response, status) {
        console.log('matrix status', status);
        if(status == 'OK') {
            console.log('response', response);
        }
    }

    // once distMatrix is loaded
    useEffect(() => {
        if (!distMatrix || !userLocation || destinations.length == 0 || !userPlaceId) return;
        console.log('dest', destinations);
        console.log('userlocation', userPlaceId);
        distMatrix.getDistanceMatrix(
            {
                origins: [new google.maps.LatLng(userLocation.lat, userLocation.lng)],
                destinations: destinations,
                travelMode: 'WALKING',
                unitSystem: google.maps.UnitSystem.IMPERIAL,
            }, matrixCallback);
    }, [distMatrix, destinations, userPlaceId]);


    // filter locations to get only unique coordinates
    // also reduces markers to indicate number of spots at a location/building
    useEffect(() => {
        setUniqueList(locationList.reduce((acc, loc) => {
            // get first instance
            var first = locationList.find(location => {return location.building == loc.building});
            var building = buildings.find(building => {return building.name == loc.building});
            // get number of instances
            var instances = locationList.filter(location => {return location.building == loc.building}).length;
            // check if this is the first instance
            if (first == loc) {
                acc.push({name: loc.building, instances: instances.toString(), latitude: building.latitude, longitude: building.longitude});
            }
            return acc;
        }, []))
    }, [locationList]);

    return (
        <div>
            <APIProvider apiKey={"AIzaSyDGD9XcxSP_o0ihFPWNnoiWPRYkYH0ZYvQ"}>
                <div className="map">
                    <Map
                        defaultZoom={16}
                        defaultCenter={{ lat: 43.076, lng: -89.404 }}
                        reuseMaps={true}
                    >
                    </Map>
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
        </div>
    );
};