import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

import ProgressHistoryCaregiver from "../../screens/careService/caregiver/ProgressHistory";
import AnnouncementView from "../../screens/apply/caregiver/ApplyView";

export default function CaregiverCaregiveServiceStack() {
  return (
    <Stack.Navigator
      initialRouteName="ProgressHistoryCaregiver"
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
    >
      <Stack.Screen
        name="ProgressHistoryCaregiver"
        component={ProgressHistoryCaregiver}
        options={{ title: "간병인 신청 내역" }}
      />
      <Stack.Screen
        name="AnnouncementView"
        component={AnnouncementView}
        options={{ title: "간병서비스 상세보기" }}
      />
    </Stack.Navigator>
  );
}
