import React from "react";
import { TouchableOpacity, Text } from "react-native";
import styled from "styled-components/native";
import { careTheme } from "../../contents";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faFolderUpload } from "@fortawesome/pro-regular-svg-icons";
import { text } from "@fortawesome/fontawesome-svg-core";

export const ListUpload = ({
  title,
  text,
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
  const ListUploadBox = styled.View`
    margin-bottom: ${(props) => (props.last ? "0" : "25")}px;
  `;
  const ListUploadTitle = styled.Text`
    font-size: 14px;
    font-weight: bold;
    color: #333;
    margin-bottom: 8px;
  `;
  const ListUploadCont = styled.View`
    display: flex;
    flex-direction: row;
    padding: 8px 10px;
    border: 1px solid #ddd;
    border-radius: 8px;
    align-items: center;
  `;
  const UploadText = styled.Text`
    display: flex;
    flex: 1 0 auto;
    color: #999;
  `;
  const ListUploadBtn = styled.TouchableOpacity`
    width: 35px;
    height: 35px;
    justify-content: flex-end;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    background-color: #2faf38;
  `;
  const IconBox = styled.View`
    width: 24px;
    justify-content: center;
    align-items: center;
    height: 24px;
  `;
  return (
    <ListUploadBox last={last}>
      <ListUploadTitle>{title}</ListUploadTitle>
      <ListUploadCont>
        <UploadText>{text}</UploadText>
        <ListUploadBtn
          onPress={onPress}
          disabled={disabled}
          activeOpacity={0.8}
        >
          {icon && <FontAwesomeIcon icon={faFolderUpload} color={"#fff"} />}
        </ListUploadBtn>
      </ListUploadCont>
      {error && <ErrorTxt>{error}</ErrorTxt>}
    </ListUploadBox>
  );
};
