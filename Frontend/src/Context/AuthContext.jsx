import React, { createContext, useContext, useState } from "react";

// Create the context with a default value
export const AuthContext = createContext();

// Define the provider component
export const AuthContextProvider = (props) => {
  const [isLogged, setIsLoggedIn] = useState(false);
  const [isAdmin,setisAdmin] = useState(false)

  // Function to toggle login status
  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);

  // Context value
  const contextValue = {
    isLogged,
    login,
    setIsLoggedIn,
    isAdmin,
    setisAdmin
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

// Custom hook for using the auth context
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthContextProvider");
//   }
//   return context;
// };

export default AuthContextProvider;
