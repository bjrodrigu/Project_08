import React from 'react';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import '../../App.css';

/**
 * Placeholder data for study spots, which are used to generate markers on the map. This data should be obtained using an API GET request of the locations database.
 */
const studySpots = [
    {
        id: '1',
        field_address: {
            postal_code: '53703',
            latitude: 43.0729,
            longitude: -89.4012, // Business School
        }
    },
    {
        id: '2',
        field_address: {
            postal_code: '53706',
            latitude: 43.0762,
            longitude: -89.4000, // Memorial Union
        }
    },
    {
        id: '3',
        field_address: {
            postal_code: '53706',
            latitude: 43.0757,
            longitude: -89.4040, // Bascom Hall Lounge
        }
    },
    {
        id: '4',
        field_address: {
            postal_code: '53706',
            latitude: 43.0767,
            longitude: -89.4013, // College Library
        }
    }
];

/**
 * Component that displays a map of study spots on the UW-Madison campus through Google Maps API.
 * 
 * @returns A map of study spots on the UW-Madison campus.
 */
const BadgerMap = () => {
    return (
        <div>
            <APIProvider apiKey={"AIzaSyDGD9XcxSP_o0ihFPWNnoiWPRYkYH0ZYvQ"}>
                <div className="map">
                    <Map
                        defaultZoom={16}
                        defaultCenter={{ lat: 43.076, lng: -89.4040 }}
                    >
                    </Map>
                    {studySpots.map((studySpot) => (
                        <Marker
                            key={studySpot.id}
                            position={{
                                lat: studySpot.field_address.latitude,
                                lng: studySpot.field_address.longitude,
                            }}
                            title={`${studySpot.field_address.locality}, ${studySpot.field_address.address_line1}`}
                        />
                    ))}
                </div>
            </APIProvider>
        </div>
    );
};

export default BadgerMap;