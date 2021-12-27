import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WriteLayout({ children }) {
  return (
    <>
      <SafeAreaView edges={["left", "right"]} style={{ flex: 1 }}>
        <KeyboardAvoidingView
          style={{ flex: 1, backgroundColor: "#f9f9f9" }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          enabled
          keyboardVerticalOffset={Platform.OS === "ios" ? 65 : 0}
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            scrollIndicatorInsets={{ right: 1 }}
          >
            {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss()}> */}

            {children}

            {/* </TouchableWithoutFeedback> */}
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}
