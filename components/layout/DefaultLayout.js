import React from "react";
import { View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function DefulatLayout({
  children,
  nestedScrollEnabled,
  refreshControl,
}) {
  return (
    <>
      <SafeAreaView
        edges={["left", "right"]}
        style={{ flex: 1, backgroundColor: "#f9f9f9" }}
      >
        <ScrollView
          nestedScrollEnabled={nestedScrollEnabled}
          contentContainerStyle={{ flexGrow: 1 }}
          scrollIndicatorInsets={{ right: 1 }}
          refreshControl={refreshControl}
        >
          {children}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
