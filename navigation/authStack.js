import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/login/login";
import IdFind from "../screens/auth/idFind";
import PasswordFind from "../screens/auth/passwordFind";
import CaregiverJoin from "../screens/join/caregiver/Register";
import PatientJoin from "../screens/join/user/Register";

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
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
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="IdFind"
        component={IdFind}
        options={{
          headerShown: true,
          title: "아이디 찾기",
        }}
      />
      <Stack.Screen
        name="PasswordFind"
        component={PasswordFind}
        options={{
          headerShown: true,
          title: "비밀번호 찾기",
        }}
      />
      <Stack.Screen
        name="PatientJoin"
        component={PatientJoin}
        options={{
          title: "환자회원 정보입력",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="CaregiverJoin"
        component={CaregiverJoin}
        options={{
          title: "간병인회원 정보입력",
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
}
