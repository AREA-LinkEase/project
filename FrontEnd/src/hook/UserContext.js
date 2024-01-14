import React, {createContext, useEffect, useState} from "react";
import {User} from "../models/Users";

export const UserContext = createContext();

export const UserProvider = ({children}) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoaded, setLoaded] = useState(false);

  const login = async (token) => {
    let newUser = new User(token);

    let result = await newUser.get();

    if (typeof result === "number") return false;
    setToken(token)
    setUser(newUser)
    localStorage.setItem('token', token)
    return true;
  }

  const logout = () => {
    setToken(null)
    localStorage.removeItem("token")
  }

  useEffect(() => {
    (async () => {
      try {
        const jwt = localStorage.getItem("token")

        if (!jwt) return setLoaded(true);
        let newUser = new User(jwt)

        let result = await newUser.get();

        if (typeof result === "number") {
          setLoaded(true)
          return localStorage.removeItem("token")
        }
        setToken(jwt)
        setUser(newUser)
      } catch (e) {
        console.log(e)
      }
      setLoaded(true)
    })()
  }, []);

  return (
    <UserContext.Provider value={{login, logout, user, token, isLoaded}}>
      {children}
    </UserContext.Provider>
  )
}
