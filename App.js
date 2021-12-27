import AppLoading from "expo-app-loading";
import React, { useState, useEffect } from "react";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import client, {
  isLoggedInVar,
  tokenVar,
  memberVar,
  checkFirstLaunch,
  logUserOut,
} from "./apollo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NavController from "./navigation/navController";

export default function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const userInfo = useReactiveVar(memberVar);
  const [loaded, setLoaded] = useState(false);

  const [ModalVisible, setModalVisible] = useState(false);
  const ModalVisibleToggleModal = () => {
    setModalVisible(!ModalVisible);
  };

  const preLoad = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const member = await AsyncStorage.getItem("member");
      if (token) {
        isLoggedInVar(true);
        tokenVar(token);
        memberVar(member);
      }

      const isFirstLaunch = await checkFirstLaunch();
      if (isFirstLaunch) {
        ModalVisibleToggleModal();
      }

      setLoaded(true);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    preLoad();
    logUserOut();
  }, []);

  return loaded ? (
    <ApolloProvider client={client}>
      <NavController isLoggedIn={isLoggedIn} userInfo={userInfo} />
    </ApolloProvider>
  ) : (
    <AppLoading />
  );
}
