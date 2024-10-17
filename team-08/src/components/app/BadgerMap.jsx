import React from 'react';
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import '../../App.css';

const BadgerMap = () => {
    return (
        <div>
            <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
                <div className="map">
                    <Map
                        defaultZoom={16}
                        defaultCenter={{ lat: 43.076, lng: -89.399 }}
                    >
                    </Map>
                </div>
            </APIProvider>
        </div>
    );
};

export default BadgerMap;