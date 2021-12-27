import styled from "styled-components/native";
import { careTheme } from "../../contents";

// 로그인 스타일
export const KeyboardAvoidingView = styled.KeyboardAvoidingView`
  background-color: #fff;
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 22px 5%;
`;

export const LoginTitle = styled.Text`
  font-size: 38px;
  font-weight: bold;
  margin-bottom: 22px;
  color: #333;
  text-align: center;
`;

export const TextInput = styled.TextInput`
  background-color: #fff;
  padding: 0 15px;
  border-radius: 8px;
  border: 1px solid #dddddd;
  width: 100%;
  line-height: 18px;
  height: 56px;
  font-size: 16px;
  margin-bottom: 10px;
`;

export const FullBtn = styled.TouchableOpacity`
  background-color: ${careTheme.COLORS.PRIMARY};
  border-radius: 8px;
  width: 100%;
  height: 56px;
  font-size: 16px;
  margin-bottom: 10px;
  justify-content: center;
  align-items: center;
`;

export const ErrorsText = styled.Text`
  color: ${careTheme.COLORS.ERROR};
  margin-top: -5px;
  margin-bottom: 15px;
  margin-left: 5px;
  font-size: 13px;
  letter-spacing: -0.5px;
`;

export const FindBox = styled.View`
  margin-top: 15px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const FindBtn = styled.TouchableOpacity`
  margin: 0 12px;
`;

export const FindBtnTxt = styled.Text`
  color: #333;
  font-size: 15px;
  text-decoration: underline;
`;
