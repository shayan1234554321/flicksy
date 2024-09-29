import React, { createContext, useContext, useEffect, useState } from "react";
import API from "../utility/api";
import { getFromLocalStorage } from "../hooks/localStorage";
import axios from "axios";
import NetInfo from "@react-native-community/netinfo";
import NoInternetBar from "../components/NoInternetBar";
import Toast from "react-native-toast-message";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [internetAccess, setInternetAccess] = useState(true);

  useEffect(() => {
    let tempInternetAccess = true;
    NetInfo.addEventListener((state) => {
      if (state.isConnected === false) {
        setInternetAccess(false);
        tempInternetAccess = false;
        Toast.show({
          type: "error",
          text1: "No Internet",
          text2: "Please check your internet connection",
        });
      } else if (state.isConnected === true) {
        if (internetAccess === false) {
          getUser();
        }
        setInternetAccess(true);
        tempInternetAccess = true;
      }
    });
    async function getUser() {
      try {
        const userToken = await getFromLocalStorage("userToken");
        if (userToken) {
          const response = await axios.get(API.user.getUserByToken, {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          });
          if (response.status === 200) {
            setUser(response.data);
          }
        }
      } catch (error) {
        console.log("Context Error: ", error);
      } finally {
        setLoading(false);
      }
    }
    getUser();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        user,
        loading,
        setUser,
        internetAccess
      }}
    >
      {!internetAccess && <NoInternetBar />}
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
