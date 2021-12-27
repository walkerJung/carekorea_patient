import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ApplyForm from "../../screens/apply/user/ApplyForm";
import ApplyFormDetail from "../../screens/apply/user/ApplyFormDetail";
import ApplyComplete from "../../screens/apply/user/ApplyComplete";

const Stack = createStackNavigator();

export default function PatientApplyStack() {
  return (
    <Stack.Navigator
      initialRouteName="ApplyForm"
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
        name="ApplyForm"
        component={ApplyForm}
        options={{
          title: "간병서비스 신청",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="ApplyFormDetail"
        component={ApplyFormDetail}
        options={{
          title: "간병서비스 신청",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="ApplyComplete"
        component={ApplyComplete}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
