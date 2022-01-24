import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PatientMainScreen from "../../screens/main/Main";
import PatientApplyStack from "../patient/patientApplyStack";
import MainNoticeStack from "../mainNoticeStack";
import PdfView from "../../screens/main/pdfView";

const Stack = createStackNavigator();

export default function PatientMainStack() {
  return (
    <Stack.Navigator
      initialRouteName="PatientMainScreen"
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
        name="PatientMainScreen"
        component={PatientMainScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="UserApplyStack"
        component={PatientApplyStack}
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
      <Stack.Screen
        name="PdfView"
        component={PdfView}
        options={{
          title: "간병 신청 방법",
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
}
