import React from "react";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/Ionicons";

export default function NoneLayout(props) {
  const NoneContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
  `;
  const NoneTxt = styled.Text`
    color: #333;
    font-size: 16px;
    margin-top: 10px;
  `;
  return (
    <NoneContainer>
      <Icon name="shapes-outline" color={"#676767"} size={24} />
      <NoneTxt>{props.text}</NoneTxt>
    </NoneContainer>
  );
}
