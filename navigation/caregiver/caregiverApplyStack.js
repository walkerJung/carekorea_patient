import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AnnouncementList from "../../screens/apply/caregiver/ApplyList";
import AnnouncementView from "../../screens/apply/caregiver/ApplyView";

const Stack = createStackNavigator();

export default function CaregiverApplyStack() {
  return (
    <Stack.Navigator
      initialRouteName="AnnouncementList"
      screenOptions={{
        headerShown: true,
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
        name="AnnouncementList"
        component={AnnouncementList}
        options={{
          title: "간병서비스 리스트",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="AnnouncementView"
        component={AnnouncementView}
        options={{
          title: "간병서비스 상세보기",
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
}
