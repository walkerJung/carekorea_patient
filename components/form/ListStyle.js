import React from "react";
import { TouchableOpacity, Text } from "react-native";
import styled from "styled-components/native";
import { careTheme } from "../../contents";
import Icon from "react-native-vector-icons/Ionicons";

export const ScrollView = styled.ScrollView`
  flex: 1;
`;
export const Container = styled.View`
  flex: 1;
  padding: 25px 5%;
`;
export const Item = styled.View`
  padding: 15px 20px;
  background-color: #fff;
  border-radius: 8px;
  margin-bottom: 15px;
`;
export const FlexBoth = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
export const PageHeader = styled(FlexBoth)`
  padding: 5px 0 20px;
`;
export const StatusTxt = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;
export const Profile = styled.View`
  flex-direction: row;
  align-items: center;
`;
export const ProfileImg = styled.View`
  position: relative;
  border-radius: 999px;
  width: 50px;
  height: 50px;
  background-color: #f5f5f5;
  margin-right: 10px;
  justify-content: center;
  align-items: center;
`;
export const ProfileName = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;
export const ProfileDate = styled.Text`
  font-size: 14px;
  color: #979797;
  margin-top: 2px;
`;
export const PriceTxt = styled.Text`
  color: ${careTheme.COLORS.BLUE};
  font-size: 14px;
  font-weight: bold;
`;

const ErrorTxt = styled.Text`
  margin-top: 5px;
  font-size: 13px;
  color: ${careTheme.COLORS.ERROR};
`;
export const CancelBtn = ({ onPress, text, disabled }) => {
  const CancelTxt = styled.Text`
    font-size: 16px;
    color: #333;
    text-decoration: underline;
  `;
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <CancelTxt>{text}</CancelTxt>
    </TouchableOpacity>
  );
};

export const ListGo = ({
  title,
  onPress,
  disabled,
  secureTextEntry,
  password,
  placeholder,
  value,
  last,
  error,
  icon,
  multiline,
  numberOfLines,
}) => {
  const ListGoBox = styled.View`
    margin-bottom: ${(props) => (props.last ? "0" : "25")}px;
  `;
  const ListGoTitle = styled.Text`
    font-size: 14px;
    font-weight: bold;
    color: #333;
    margin-bottom: 8px;
  `;
  const ListGoBtn = styled.TouchableOpacity`
    flex-direction: row;
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #ddd;
    border-radius: 8px;
    align-items: center;
    background-color: ${(props) => (props.disabled ? "#E9E9E9" : "#fff")};
  `;
  const IconBox = styled.View`
    width: 24px;
    justify-content: center;
    align-items: center;
    height: 24px;
  `;
  const ListGoTextInput = styled.TextInput`
    font-size: 16px;
    flex: 1;
    color: ${(props) => (props.disabled ? "#979797" : "#333")};
  `;
  return (
    <ListGoBox last={last}>
      <ListGoTitle>{title}</ListGoTitle>
      <ListGoBtn onPress={onPress} disabled={disabled} activeOpacity={0.8}>
        <ListGoTextInput
          placeholder={placeholder}
          editable={false}
          secureTextEntry={secureTextEntry}
          password={password}
          value={value}
          disabled={disabled}
          multiline={multiline}
          numberOfLines={numberOfLines}
        />
        {icon && (
          <IconBox>
            <Icon name="chevron-forward-outline" color={"#979797"} size={20} />
          </IconBox>
        )}
      </ListGoBtn>
      {error && <ErrorTxt>{error}</ErrorTxt>}
    </ListGoBox>
  );
};

// 공지사항
export const MainNotiItem = styled.TouchableOpacity`
  background-color: #fff;
  padding: 12px 0px;
  border-bottom-width: 1px;
  border-color: #eee;
`;
export const MainNotiTitle = styled.Text`
  font-size: 15px;
  color: #333;
`;
export const NotiBox = styled.TouchableOpacity`
  padding: 15px 5%;
  border-bottom-width: 1px;
  border-color: #eee;
`;
export const NotiTitle = styled.Text`
  font-size: 15px;
  color: #212121;
  margin-bottom: 2px;
  font-weight: bold;
`;
export const NotiDate = styled.Text`
  font-size: 13px;
  color: #979797;
`;
export const NotiContainer = styled.ScrollView`
  padding: 20px 5% 20px;
  flex: 1;
`;
export const NotiViewHeader = styled.View`
  padding: 0px 0 20px;
  border-bottom-width: 1px;
  border-color: #eee;
`;
export const NotiViewHeaderTit = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: #333;
`;
export const NotiViewHeaderDate = styled.Text`
  margin-top: 5px;
  font-size: 14px;
  color: #979797;
`;
export const NotiViewBody = styled.View`
  padding: 20px 0;
`;
