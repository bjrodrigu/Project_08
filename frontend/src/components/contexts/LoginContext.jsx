import React, { useContext, createContext, useState, useEffect } from "react";

const LoginContext = createContext();
const LoginContextProvider = ({ children }) => {
      // Restore the session on page load if the stored token hasn't expired
      const restored = (() => {
            try {
                  const token = localStorage.getItem("token");
                  const expires = Number(localStorage.getItem("tokenExpiration"));
                  if (token && expires && Date.now() < expires) {
                        return JSON.parse(localStorage.getItem("isLoggedIn") || "null");
                  }
            } catch (e) { /* storage unavailable: start logged out */ }
            return null;
      })();
      const [user, setUser] = useState(restored);
      const [login, setLogin] = useState(!!restored);


      // TODO: fetch user & set login state via useEffect

      return (
            <LoginContext.Provider value={{ user, setUser, login, setLogin }}>
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

export { LoginContext, LoginContextProvider, useLoginState };