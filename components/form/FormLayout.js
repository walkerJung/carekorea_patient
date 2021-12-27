import React from "react";
import {
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

export default function FormLayout({ children }) {
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
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
            <View style={{ flex: 1 }}>{children}</View>
            {/* </TouchableWithoutFeedback> */}
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}
