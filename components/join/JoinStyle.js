import React from "react";
import styled from "styled-components/native";
import { careTheme } from "../../contents";

// 회원가입
export const KeyboardAvoidingView = styled.KeyboardAvoidingView`
  flex: 1;
`;
export const Container = styled.View`
  padding: 22px 5%;
  background-color: white;
  margin-bottom: ${(props) => (props.last ? "0" : "10")}px;
`;
export const FullContainer = styled.View`
  flex: 1;
  padding: 22px 5%;
  background-color: white;
`;

export const StepTxtBox = styled.View`
  margin-bottom: 20px;
  flex-direction: row;
`;

export const StepNum = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${careTheme.COLORS.PRIMARY_TYPE2};
  margin-right: 5px;
`;

export const StepTxt = styled.Text`
  font-size: 16px;
  font-weight: normal;
  color: #333;
`;

export const FormBox = styled.View`
  width: 100%;
  margin-bottom: ${(props) => (props.last ? "0" : "25")}px;
`;

export const FormLabelBox = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`;

export const FormLabel = styled.Text`
  font-size: 15px;
  font-weight: bold;
  color: #333;
`;

export const SubLabel = styled.Text`
  font-size: 11px;
  font-weight: normal;
  color: ${(props) => (props.required ? careTheme.COLORS.ERROR : "#979797")};
  margin-left: 5px;
`;

export const FormInput = styled.TextInput`
  font-size: 16px;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

export const PhotoBox = ({ children, onPress }) => {
  const PhotoContainer = styled.TouchableOpacity`
    position: relative;
    background-color: #f5f5f5;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
  `;
  const PhotoInner = styled.View`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    overflow: hidden;
  `;
  const PhotoHeight = styled.View`
    padding-top: 56.25%;
  `;
  return (
    <PhotoContainer onPress={onPress} activeOpacity={0.8}>
      <PhotoInner>{children}</PhotoInner>
      <PhotoHeight />
    </PhotoContainer>
  );
};

export const Btn = styled.TouchableOpacity`
  height: 56px;
  text-align: center;
  align-items: center;
  justify-content: center;
  background-color: ${careTheme.COLORS.PRIMARY};
  border-radius: 10px;
`;

export const BtnTxt = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
`;

export const MemberTitleBox = styled.View`
  padding: 30px 0;
  align-items: center;
`;

export const MemberTitle = styled.Text`
  font-size: 21px;
  color: #333;
  text-align: center;
`;

export const MemberIcon = styled.View`
  border-radius: 999px;
  justify-content: center;
  align-items: center;
  width: 34px;
  height: 34px;
  background-color: ${careTheme.COLORS.PRIMARY};
  margin-bottom: 8px;
`;

export const MemberBtn = styled.TouchableOpacity`
  width: 100%;
  height: 110px;
  align-items: center;
  justify-content: center;
  border: 1px solid ${careTheme.COLORS.PRIMARY};
  border-radius: 10px;
  margin-bottom: 20px;
`;
export const MemberBtnTxt = styled.Text`
  color: ${careTheme.COLORS.PRIMARY};
  font-size: 20px;
  font-weight: bold;
`;
export const Textarea = ({
  placeholder,
  numberOfLines,
  onChangeText,
  defaultValue,
  refInput,
}) => {
  const TextAreaContainer = styled.View`
    border-width: 1px;
    border-color: #ddd;
    padding: 10px 12px;
    border-radius: 8px;
  `;
  const TextArea = styled.TextInput`
    height: 100px;
    justify-content: flex-start;
    text-align-vertical: top;
  `;
  return (
    <TextAreaContainer>
      <TextArea
        ref={refInput}
        defaultValue={defaultValue}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={"#979797"}
        multiline={true}
        numberOfLines={numberOfLines}
        autoCapitalize="none"
      />
    </TextAreaContainer>
  );
};

export const ErrorsText = styled.Text`
  color: red;
  margin-top: 7px;
  margin-left: 5px;
  font-size: 13px;
  letter-spacing: -0.5px;
`;

export const JoinCheckWrap = styled.View`
  padding: 0px 0px 20px;
`;
export const CheckBoxAllBox = styled.View`
  align-items: center;
  flex-direction: row;
  padding: 20px 0;
  border-top-width: 1px;
  border-bottom-width: 1px;
  border-color: #f4f4f4;
  justify-content: space-between;
  align-items: center;
`;
export const BoxRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const CheckBoxContainer = styled.View`
  padding: 10px 0;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`;
export const CheckBoxInner = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const MoreText = styled.Text`
  font-size: 13px;
  text-decoration: underline;
  color: #9b9b9b;
`;
