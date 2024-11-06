import React, { useContext, createContext, useState, useEffect } from "react";

const MapContext = createContext();
const MapContextProvider = ({ children }) => {
      // TODO: Remove test user
      const [user, setUser] = useState(null);
      const [login, setLogin] = useState(false);


      // TODO: fetch user & set login state via useEffect

      return (
            <MapContext.Provider value={{ distance, address,  }}>
                  {children}
            </MapContext.Provider>
      );

};
