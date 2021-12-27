import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { careTheme } from "../../contents";

export const ScrollView = styled.ScrollView`
  flex: 1;
  background-color: #fff;
`;
export const Container = styled.View`
  flex: 1;
  padding: 25px 5%;
`;

// 진행내역
export const Card = styled.View`
  position: relative;
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 8px;
  background-color: #fff;
`;
export const Card2 = styled.View`
  position: relative;
  margin-bottom: 15px;
  padding: 10px 20px;
  border-radius: 8px;
  background-color: #fff;
`;
export const CardHead = styled.View`
  flex-direction: row;
  margin-bottom: 15px;
  justify-content: space-between;
  align-items: flex-start;
`;
export const CardHeadTit = styled.Text`
  font-size: 14px;
  font-weight: bold;
`;
export const GoViewBtn = ({ onPress, text }) => {
  const GoViewBtnTxt = styled.Text`
    font-size: 14px;
    font-weight: bold;
    color: #767676;
    text-decoration: underline;
  `;
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <GoViewBtnTxt>{text}</GoViewBtnTxt>
    </TouchableOpacity>
  );
};
export const List = styled.View`
  padding: ${(props) => (props.last ? "10px 0px 10px" : "10px 0")};
  border-bottom-width: ${(props) => (props.last ? "0" : "1")}px;
  border-color: #ddd;
`;
export const ListTitBox = styled(CardHead)`
  margin-bottom: 5px;
`;
export const ListTit = styled.Text`
  font-size: 14px;
  color: #676767;
`;
export const ListSubTit = styled.Text`
  font-size: 13px;
  color: #676767;
  margin-bottom: 3px;
`;
export const ListTxt = styled.Text`
  font-size: 16px;
  color: #212121;
  font-weight: bold;
`;
export const ListTxtActive = styled.Text`
  font-size: 17px;
  color: ${careTheme.COLORS.PRIMARY};
  font-weight: bold;
`;
export const ListTxtColor = styled(ListTxt)`
  color: ${careTheme.COLORS.PRIMARY};
`;
export const Days = styled.Text`
  font-size: 14px;
  color: ${careTheme.COLORS.PRIMARY};
  font-weight: bold;
`;
export const ClipboardBtn = styled.TouchableOpacity`
  margin-top: 5px;
  margin-bottom: 5px;
  background-color: #e3f4f8;
  border-radius: 4px;
  padding: 10px 12px;
  width: 100%;
`;
export const FlexBoth = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const ClipSpan = styled.View`
  padding: 2px 8px;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 99px;
`;
export const BankNumber = styled.Text`
  color: ${careTheme.COLORS.PRIMARY};
  font-size: 18px;
  font-weight: bold;
`;
export const Price = styled.Text`
  font-size: 20px;
  color: ${careTheme.COLORS.PRIMARY};
  font-weight: bold;
`;
export const InfoBox = styled.View`
  padding: 10px 15px;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
`;
export const InfoTxt = styled.Text`
  font-size: 14px;
  color: #414141;
`;
export const Bold = styled.Text`
  font-weight: bold;
`;
export const NameBox = styled.View`
  margin-bottom: 20px;
`;
export const Name = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;
export const BankBox = styled.View`
  padding: 20px 15px;
  background-color: #fff;
  width: 100%;
`;
export const EditBtn = styled.TouchableOpacity`
  padding: 2px 8px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 99px;
`;
export const EditTxt = styled.Text`
  font-size: 14px;
  color: #333;
  line-height: 20px;
`;
