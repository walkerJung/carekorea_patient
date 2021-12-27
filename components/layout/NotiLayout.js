import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function NotiLayout({ children }) {
  return (
    <>
      <SafeAreaView edges={["left", "right"]} style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            backgroundColor: "#fff",
          }}
        >
          {children}
        </View>
      </SafeAreaView>
    </>
  );
}
