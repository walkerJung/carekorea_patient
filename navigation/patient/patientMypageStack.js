import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MypageUser from "../../screens/mypage/user";
import PatientMypageProfileStack from "./patientMypageProfileStack";
import MainNoticeStack from "../mainNoticeStack";

const Stack = createStackNavigator();

export default function PatientMypageStack() {
  return (
    <Stack.Navigator
      initialRouteName="MypageUser"
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        cardStyle: { backgroundColor: "#fff" },
        headerBackTitleVisible: false,
        headerTitleStyle: { color: "black" },
        headerTintColor: "#414141",
        headerHideShadow: true,
        headerStyle: {
          borderBottomWidth: 1,
          borderBottomColor: "#F0F0F0",
          elevation: 0, //for android
          shadowOpacity: 0, // for ios
        },
      }}
      cardStyle={{ backgroundColor: "transparent" }}
    >
      <Stack.Screen
        name="MypageUser"
        component={MypageUser}
        options={{
          title: "마이페이지",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="PatientMypageProfileStack"
        component={PatientMypageProfileStack}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MainNoticeStack"
        component={MainNoticeStack}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
