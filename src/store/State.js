import React, { useState, useContext, useEffect, createContext } from "react";

export const AuthContext = createContext();

export const useAuthProvider = () => useContext(AuthContext);

export const unknownMember = {
  isAuth: false,
  id: "",
  token: "",
};

export const AuthProvider = ({ children }) => {
  const [member, setMember] = useState(unknownMember);

  const checkToken = async () => {
    try {
      const res = await fetch(process.env.REACT_APP_API + "/api/auth", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      if (res.statusText === "Unauthorized") {
        setMember(unknownMember);
      }
      setTimeout(() => {
        checkToken();
      }, 900 * 1000 - 500);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <AuthContext.Provider value={[member, setMember]}>
      {children}
    </AuthContext.Provider>
  );
};
