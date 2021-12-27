import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import NoticeList from "../screens/notice/NoticeList";
import NoticeView from "../screens/notice/NoticeView";

const Stack = createStackNavigator();

export default function MainNoticeStack() {
  return (
    <Stack.Navigator
      initialRouteName="NoticeList"
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
        name="NoticeList"
        component={NoticeList}
        options={{
          title: "공지사항",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="NoticeView"
        component={NoticeView}
        options={{
          title: "공지사항",
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
}
