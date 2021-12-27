import React from "react";
import styled from "styled-components/native";
import { careTheme } from "../../contents";

const MButton = styled.TouchableOpacity`
  background-color: ${careTheme.COLORS.PRIMARY};
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  height: 56px;
  width: 100%;
`;
const ButtonText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
`;

export default function MainButton({ onPress, disabled, text }) {
  return (
    <MButton disabled={disabled} onPress={onPress} activeOpacity={0.9}>
      <ButtonText>{text}</ButtonText>
    </MButton>
  );
}
