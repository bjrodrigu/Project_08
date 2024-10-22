import React, { useContext, createContext, useState, useEffect} from "react";

const LoginContext = createContext();
const LoginContextProvider = ({children}) => {
      const [user, setUser] = useState(null);
      const [login, setLogin] = useState(false);

      // TODO: fetch user & set login state via useEffect

      return(
            <LoginContext.Provider value={{user, setUser, login, setLogin}}>
                  {children}
            </LoginContext.Provider>
      );

};

// custom hook to use the LoginContext. Unpack returned object as below
// Example Unpacking: `const {user, setUser, login, setLogin} = useLoginState();`
const useLoginState = () => {
      // retrieve context
      const context = useContext(LoginContext);
      
      // throw error if retrieval fails
      if (context === undefined) {
            throw new Error('useLoginState was used outside its Provider');
      }

      return context;
};

export {LoginContext, LoginContextProvider, useLoginState};