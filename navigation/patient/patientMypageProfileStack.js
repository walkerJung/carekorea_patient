import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import EditUser from "../../screens/mypage/user/edit";
import EditPasswordUser from "../../screens/mypage/user/passwordEdit";
import EditNameUser from "../../screens/mypage/user/nameEdit";
import EditPhoneUser from "../../screens/mypage/user/phoneEdit";

const Stack = createStackNavigator();

export default function PatientMypageProfileStack() {
  return (
    <Stack.Navigator
      initialRouteName="EditUser"
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
        name="EditUser"
        component={EditUser}
        options={{
          title: "내 정보 수정",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="EditNameUser"
        component={EditNameUser}
        options={{
          title: "이름 변경",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="EditPhoneUser"
        component={EditPhoneUser}
        options={{
          title: "연락처 변경",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="EditPasswordUser"
        component={EditPasswordUser}
        options={{
          title: "비밀번호 변경",
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
}
