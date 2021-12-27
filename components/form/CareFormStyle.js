import React from "react";
import { ActivityIndicator, Text } from "react-native";
import styled from "styled-components/native";
import { careTheme } from "../../contents";

export const KeyboardAvoidingView = styled.KeyboardAvoidingView`
  flex: 1;
`;
export const FormTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${careTheme.COLORS.PRIMARY};
  margin-bottom: 15px;
`;

export const FormBox = styled.View`
  flex-direction: column;
  margin-bottom: ${(props) => (props.last ? "0" : "30")}px;
`;
export const FormLabel = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
`;
export const FormSubLabel = styled.Text`
  font-size: 14px;
  font-weight: normal;
  margin-bottom: 5px;
  color: #565656;
`;

export const FlexRow = styled.View`
  flex-direction: row;
`;
export const LeftBtnBox = styled.View`
  position: relative;
  flex: 1;
  margin-right: 10px;
`;
export const RightBtnBox = styled.View`
  width: 90px;
`;
export const SearchBtn = styled.TouchableOpacity`
  position: relative;
  justify-content: center;
  color: ${careTheme.COLORS.PRIMARY};
  border: 1px solid ${careTheme.COLORS.PRIMARY};
  height: 48px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
`;
export const SearchInput = styled.TextInput`
  background-color: #e9e9e9;
  padding: 0 12px;
  border-radius: 8px;
  border: 1px solid #dddddd;
  width: 100%;
  line-height: 18px;
  height: 48px;
  font-size: 15px;
  margin-bottom: 10px;
  color: #111;
`;

export const InfoBox = styled.View`
  flex-direction: row;
  padding: 12px 10px;
  background-color: #f5f5f5;
  border-radius: 4px;
  margin-bottom: 30px;
  flex-wrap: wrap;
  align-items: center;
`;
export const InfoTxt = styled.Text`
  font-size: 15px;
  color: #333;
  flex: 1;
  margin-left: 8px;
`;

export const ErrorsText = styled.Text`
  margin-top: -5px;
  color: ${careTheme.COLORS.WARNING};
`;

export const FormInput = ({
  placeholder,
  returnKeyType,
  keyboardType,
  maxLength,
  onSubmitEditing,
  onChangeText,
  text,
  error,
  editable,
  value,
  suffix,
  inputRef,
}) => {
  const InputBox = styled.View`
    flex: 1;
  `;
  const Input = styled.TextInput`
    background-color: #fff;
    padding: 0 12px;
    border-radius: 8px;
    border: ${(props) => (props.error ? careTheme.COLORS.ERROR : "#ddd")};
    width: 100%;
    line-height: 18px;
    height: 48px;
    font-size: 16px;
    margin-bottom: 10px;
    color: #111;
  `;
  const RightBox = styled.View`
    width: 30px;
    height: 48px;
    align-items: flex-end;
    justify-content: center;
    margin-left: 10px;
  `;
  const InputTxt = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: ${careTheme.COLORS.PRIMARY};
    margin-left: 5px;
  `;
  const ErrorTxt = styled.Text`
    margin-top: -5px;
    font-size: 13px;
    color: ${careTheme.COLORS.ERROR};
    margin-bottom: 10px;
  `;
  return (
    <>
      <FlexRow>
        <InputBox>
          <Input
            ref={inputRef}
            placeholder={placeholder}
            placeholderTextColor={error ? careTheme.COLORS.ERROR : "#979797"}
            returnKeyType={returnKeyType}
            keyboardType={keyboardType}
            maxLength={maxLength}
            onChangeText={onChangeText}
            onSubmitEditing={onSubmitEditing}
            error={error}
            editable={editable}
            value={value}
            suffix={suffix}
          />
        </InputBox>
        {text && (
          <RightBox>
            <InputTxt>{text}</InputTxt>
          </RightBox>
        )}
      </FlexRow>
      {error && <ErrorTxt>{error}</ErrorTxt>}
    </>
  );
};

export const ErrorInput = ({ label, error, ...textInputProps }) => {
  const ErrorT = styled.Text`
    margin-top: -5px;
    color: ${careTheme.COLORS.ERROR};
  `;
  const isError = Boolean(error);

  return (
    <FormBox>
      {Boolean(label) && <FormLabel>{label}</FormLabel>}
      <FormInput isError={isError} {...textInputProps} />
      {isError && <ErrorT>{error}</ErrorT>}
    </FormBox>
  );
};

export const SubmitBtn = ({ onPress, disabled, text, loading, small }) => {
  const Submit = styled.TouchableOpacity`
    width: 100%;
    height: ${(props) => (props.small ? "48" : "56")}px;
    justify-content: center;
    align-items: center;
    background-color: ${(props) =>
      props.disabled ? careTheme.COLORS.DISABLED : careTheme.COLORS.PRIMARY};
    border-radius: 8px;
  `;

  const SubmitTxt = styled.Text`
    color: ${(props) =>
      props.disabled ? careTheme.COLORS.DISABLED_TXT : "#fff"};
    font-weight: bold;
    text-align: center;
    font-size: ${(props) => (props.small ? "16" : "18")}px;
  `;
  return (
    <Submit
      disabled={disabled}
      onPress={onPress}
      activeOpacity={0.8}
      small={small}
    >
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <SubmitTxt disabled={disabled} small={small}>
          {text}
        </SubmitTxt>
      )}
    </Submit>
  );
};

// 간병인 신청 완료
export const Complete = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  padding: 0 15px;
  background-color: #f5f5f5;
`;
export const CompleteLogo = styled.Text`
  text-align: center;
  font-size: 38px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #212121;
`;
export const CompleteTit = styled.Text`
  text-align: center;
  font-size: 23px;
  font-weight: bold;
  line-height: 32px;
  color: #333;
  margin-bottom: 15px;
`;
export const CompleteTxt = styled.Text`
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  color: #676767;
  line-height: 21px;
  margin-bottom: 20px;
`;
