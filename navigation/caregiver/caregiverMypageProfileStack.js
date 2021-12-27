import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import EditCaregiver from "../../screens/mypage/caregiver/edit";
import EditNameCaregiver from "../../screens/mypage/caregiver/nameEdit";
import EditPhoneCaregiver from "../../screens/mypage/caregiver/phoneEdit";
import EditPasswordCaregiver from "../../screens/mypage/caregiver/passwordEdit";
import EditAddressCaregiver from "../../screens/mypage/caregiver/addressEdit";
import EditIdCardCaregiver from "../../screens/mypage/caregiver/idCardEdit";
import EditBankInfoCaregiver from "../../screens/mypage/caregiver/bankInfoEdit";
import EditDetailCaregiver from "../../screens/mypage/caregiver/editDetail";

const Stack = createStackNavigator();

export default function CaregiverMypageProfileStack() {
  return (
    <Stack.Navigator
      initialRouteName="EditCaregiver"
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
        name="EditCaregiver"
        component={EditCaregiver}
        options={{
          title: "내 정보 수정",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="EditNameCaregiver"
        component={EditNameCaregiver}
        options={{
          title: "이름 변경",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="EditPhoneCaregiver"
        component={EditPhoneCaregiver}
        options={{
          title: "연락처 변경",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="EditPasswordCaregiver"
        component={EditPasswordCaregiver}
        options={{
          title: "비밀번호 변경",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="EditAddressCaregiver"
        component={EditAddressCaregiver}
        options={{
          title: "주소 변경",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="EditDetailCaregiver"
        component={EditDetailCaregiver}
        options={{
          title: "간병인 상세정보 변경",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="EditIdCardCaregiver"
        component={EditIdCardCaregiver}
        options={{
          title: "신분증 사진 변경",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="EditBankInfoCaregiver"
        component={EditBankInfoCaregiver}
        options={{
          title: "통장사본 사진 변경",
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
}
