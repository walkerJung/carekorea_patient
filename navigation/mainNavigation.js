import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faBallot,
  faHeart,
  faHome,
  faUser,
} from "@fortawesome/pro-light-svg-icons";
import Intro from "../screens/intro";
import AuthStack from "./authStack";
import PatientMypageStack from "./patient/patientMypageStack";
import PatientMainStack from "./patient/patientMainStack";
import PatientCaregiveServiceStack from "./patient/patientCaregiveServiceStack";
import CaregiverMainStack from "./caregiver/caregiverMainStack";
import CaregiverCaregiveServiceStack from "./caregiver/caregiverCaregiveServiceStack";
import careglverMypageStack from "./caregiver/careglverMypageStack";
import { careTheme } from "../contents";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function MainNavigation({ isLoggedIn, userInfo }) {
  return (
    <NavigationContainer>
      {isLoggedIn && userInfo ? (
        <Tab.Navigator
          screenOptions={{
            tabBarItemStyle: {
              padding: 2,
            },
            headerShown: false,
            tabBarLabelStyle: {
              fontSize: 11,
              fontWeight: "600",
              marginTop: -2,
            },
            tabBarBadgeStyle: {
              fontSize: 11,
            },
            tabBarActiveTintColor: careTheme.COLORS.PRIMARY,
            tabBarInactiveTintColor: "#212121",
          }}
        >
          {JSON.parse(userInfo).userType === "환자" ? (
            <>
              <Tab.Screen
                name="메인"
                component={PatientMainStack}
                options={{
                  headerShown: false,
                  tabBarIcon: ({ color, size }) => (
                    <View>
                      <FontAwesomeIcon icon={faHome} color={color} size={23} />
                    </View>
                  ),
                }}
              />
              <Tab.Screen
                name="간병 서비스"
                component={PatientCaregiveServiceStack}
                options={{
                  headerShown: false,
                  tabBarIcon: ({ color, size, focused }) => (
                    <View>
                      <FontAwesomeIcon icon={faHeart} color={color} size={20} />
                    </View>
                  ),
                }}
              />
              <Tab.Screen
                name="마이페이지"
                component={PatientMypageStack}
                options={{
                  headerShown: false,
                  tabBarIcon: ({ color, size, focus }) => (
                    <View>
                      <FontAwesomeIcon
                        icon={faUser}
                        color={color}
                        focus={"#333"}
                        size={20}
                      />
                    </View>
                  ),
                }}
              />
            </>
          ) : (
            <>
              <Tab.Screen
                name="메인"
                component={CaregiverMainStack}
                options={{
                  headerShown: false,
                  tabBarIcon: ({ color, size }) => (
                    <View>
                      <FontAwesomeIcon icon={faHome} color={color} size={23} />
                    </View>
                  ),
                }}
              />
              <Tab.Screen
                name="신청 내역"
                component={CaregiverCaregiveServiceStack}
                options={{
                  headerShown: false,
                  tabBarIcon: ({ color, size }) => (
                    <View>
                      <FontAwesomeIcon
                        icon={faBallot}
                        color={color}
                        size={20}
                      />
                    </View>
                  ),
                }}
              />
              <Tab.Screen
                name="마이페이지"
                component={careglverMypageStack}
                options={{
                  headerShown: false,
                  tabBarIcon: ({ color, size }) => (
                    <View>
                      <FontAwesomeIcon icon={faUser} color={color} size={20} />
                    </View>
                  ),
                }}
              />
            </>
          )}
        </Tab.Navigator>
      ) : (
        <>
          <Stack.Navigator
            initialRouteName="IntroScreen"
            screenOptions={{
              headerShown: false,
              gestureEnabled: false,
              headerTintColor: "white",
              headerBackTitleVisible: false,
              headerStyle: {
                borderBottomWidth: 1,
                borderBottomColor: "#F0F0F0",
                elevation: 0, //for android
                shadowOpacity: 0, // for ios
              },
            }}
            cardStyle={{ backgroundColor: "transparent" }}
          >
            <Stack.Screen name="IntroScreen" component={Intro} />
            <Stack.Screen name="LoginScreen" component={AuthStack} />
          </Stack.Navigator>
        </>
      )}
    </NavigationContainer>
  );
}
