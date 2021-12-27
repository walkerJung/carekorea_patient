import React from "react";
import { StyleSheet } from "react-native";
import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { careTheme } from "../../contents";

const LoginButton = styled.TouchableOpacity`
  background-color: ${(props) =>
    props.line ? careTheme.COLORS.WHITE : careTheme.COLORS.PRIMARY};
  border: ${(props) => (props.line ? "1px solid #00CBFF" : "0")};
  border-width: 1px;
  border-color: ${(props) => (props.line ? careTheme.COLORS.PRIMARY : "0")};
  border-radius: 8px;
  width: 100%;
  height: 56px;
  font-size: 16px;
  margin-bottom: 10px;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;
const LoginButtonTxt = styled.Text`
  color: ${(props) =>
    props.line ? careTheme.COLORS.PRIMARY : careTheme.COLORS.WHITE};
  font-size: 18px;
`;

export default function LoginBtn({
  title,
  disabled,
  loading,
  onPress,
  style,
  line,
}) {
  return (
    <LoginButton
      disabled={disabled}
      onPress={onPress}
      line={line}
      activeOpacity={0.8}
    >
      <View style={[styles.loaderSection]}>
        {loading && <ActivityIndicator />}
        {title && (
          <LoginButtonTxt line={line}>
            {loading ? "로딩중" : title}
          </LoginButtonTxt>
        )}
      </View>
    </LoginButton>
  );
}

const styles = StyleSheet.create({
  loaderSection: {
    flexDirection: "row",
  },

  textInput: {
    flex: 1,
    width: "100%",
  },

  error: {
    paddingTop: 4,
    fontSize: 12,
  },
});
