import React, { createContext, useContext, useState } from "react";

// Context তৈরি
export const UserContext = createContext();

// Provider Component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook (recommended)
export const useUser = () => useContext(UserContext);
