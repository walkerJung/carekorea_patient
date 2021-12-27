import React, { useRef, useEffect } from "react";
import { Platform, Alert, Image } from "react-native";
import { useForm } from "react-hook-form";
import { LOGIN_MUTATION } from "../query";
import { useMutation } from "@apollo/client";
import { logUserIn } from "../../apollo";
import {
  KeyboardAvoidingView,
  LoginTitle,
  TextInput,
  ErrorsText,
  FindBox,
  FindBtn,
  FindBtnTxt,
} from "../../components/login/loginStyle";

import LoginBtn from "../../components/login/LoginBtn";
import { FormBox } from "../../components/join/JoinStyle";

export default function Login({ navigation }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const passwordRef = useRef();

  const onNext = (nextOne) => {
    nextOne?.current?.focus();
  };

  const onCompleted = async (data) => {
    const {
      login: { ok, token, user },
    } = data;
    if (ok) {
      await logUserIn(token, user);
    } else {
      Alert.alert("로그인 할수 없습니다.\n아이디와 비밀번호를 확인해주세요.");
    }
  };

  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  });

  const onValid = (data) => {
    if (!loading) {
      login({
        variables: {
          userId: data.userId,
          password: data.password,
        },
      });
    }
  };

  useEffect(() => {
    register("userId", {
      required: "* 아이디를 입력해주세요.",
    });
    register("password", {
      required: "* 비밀번호를 입력해주세요.",
    });
  }, [register]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#fff" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      enabled
      keyboardVerticalOffset={Platform.OS === "ios" ? 65 : 0}
    >
      <Image
        source={require("../../assets/img/main_logo.png")}
        style={{ width: 230, height: 56, marginBottom: 30 }}
        resizeMode={"contain"}
      />

      <FormBox last>
        <TextInput
          value={watch("userId")}
          placeholder="아이디"
          placeholderTextColor={"#979797"}
          returnKeyType="next"
          autoCapitalize="none"
          onSubmitEditing={() => onNext(passwordRef)}
          onChangeText={(text) => setValue("userId", text)}
          blurOnSubmit={false}
        />
        {errors.userId && <ErrorsText>{errors.userId.message}</ErrorsText>}
      </FormBox>
      <FormBox last>
        <TextInput
          value={watch("password")}
          placeholder="비밀번호"
          ref={passwordRef}
          placeholderTextColor={"#979797"}
          returnKeyType="done"
          secureTextEntry
          onSubmitEditing={handleSubmit(onValid)}
          onChangeText={(text) => setValue("password", text)}
        />
        {errors.password && <ErrorsText>{errors.password.message}</ErrorsText>}
      </FormBox>

      <LoginBtn title="로그인" line={false} onPress={handleSubmit(onValid)} />

      {/* 환자 회원 */}
      {/* <LoginBtn
        title="회원가입"
        line={true}
        onPress={() => {
          navigation.navigate("PatientJoin");
        }}
      /> */}
      {/* 간병인 회원 */}
      <LoginBtn
        title="회원가입"
        line={true}
        onPress={() => {
          navigation.navigate("CaregiverJoin");
        }}
      />

      <FindBox>
        <FindBtn
          activeOpacity={1}
          onPress={() => {
            navigation.navigate("IdFind");
          }}
        >
          <FindBtnTxt>아이디 찾기</FindBtnTxt>
        </FindBtn>
        <FindBtn
          activeOpacity={1}
          onPress={() => {
            navigation.navigate("PasswordFind");
          }}
        >
          <FindBtnTxt>비밀번호 찾기</FindBtnTxt>
        </FindBtn>
      </FindBox>
    </KeyboardAvoidingView>
  );
}
