import React from "react";
import { Linking } from "react-native";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/Ionicons";
export const Container = styled.View`
  padding: 0 5%;
`;
export const MypageHeader = styled.View`
  padding-top: 40px;
  padding-bottom: 30px;
`;
export const MypageHeaderTit = styled.Text`
  font-size: 23px;
  line-height: 34px;
`;

export const MypageList = ({ onPress, title }) => {
  const Li = styled.TouchableOpacity`
    width: 100%;
    border-bottom-width: 1px;
    border-color: #333;
  `;
  const LiRow = styled.View`
    flex-direction: row;
    height: 60px;
    justify-content: space-between;
    align-items: center;
  `;
  const LiTxt = styled.Text`
    color: #333;
    font-size: 20px;
    font-weight: bold;
  `;
  return (
    <>
      <Li onPress={onPress} activeOpacity={0.7}>
        <LiRow>
          <LiTxt>{title}</LiTxt>
          <Icon name="chevron-forward-outline" color="#333" size={20} />
        </LiRow>
      </Li>
    </>
  );
};
export const Tell = ({ title, number }) => {
  const TellBox = styled.TouchableOpacity`
    padding: 15px 20px;
    background-color: #c4efcd;
    border-radius: 8px;
    margin-top: 30px;
    border-width: 1px;
    border-color: #c4efcd;
  `;
  const TellTxt = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: #054a13;
    text-align: center;
  `;
  const TellNum = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: #054a13;
    text-align: center;
  `;

  return (
    <TellBox
      onPress={() => {
        Linking.openURL(`tel:${number}`);
      }}
      activeOpacity={0.8}
    >
      <TellTxt>{title}</TellTxt>
      <TellNum>{number}</TellNum>
    </TellBox>
  );
};
