import React, { useEffect, useRef, useState } from "react";
import { Alert, TouchableOpacity } from "react-native";
import WriteLayout from "../../../components/layout/WriteLayout";
import SectionLayout from "../../../components/layout/SectionLayout";
import {
  StepTxtBox,
  StepTxt,
  FormBox,
  FormLabelBox,
  FormLabel,
  FormInput,
  ErrorsText,
  JoinCheckWrap,
  CheckBoxAllBox,
  BoxRow,
  CheckBoxInner,
  CheckBoxContainer,
  MoreText,
} from "../../../components/join/JoinStyle";
import JoinRadio from "../../../components/join/JoinRadio";
import { SubmitBtn } from "../../../components/form/CareFormStyle";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { CREATE_ACCOUNT_MUTATION } from "../../query";
import Check from "../../../components/join/CheckBox";
import { faCheck } from "@fortawesome/pro-light-svg-icons";
import { faCheckCircle } from "@fortawesome/pro-solid-svg-icons";
import PrivacyModal from "../../../components/modal/PrivacyModal";
import ProvisionModal from "../../../components/modal/ProvisionModal";
import ConfirmModal from "../../../components/modal/ConfirmModal";

export default function UserRegister({ navigation }) {
  const [category, setCategory] = useState(null);
  const [allProvision, setAllProvision] = useState(false);
  const [personalInfo, setPersonalInfo] = useState(false);
  const [provision, setProvision] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const allAgree = () => {
    if (allProvision === true) {
      setPersonalInfo(false);
      setProvision(false);
      setAllProvision(false);
    } else {
      setPersonalInfo(true);
      setProvision(true);
      setAllProvision(true);
    }
  };
  useEffect(() => {
    if (personalInfo === true && provision === true) {
      setAllProvision(true);
    }
  }, [personalInfo, provision]);

  const [privacyModal, setPrivacyModal] = useState(false);
  const openPrivacyModal = () => {
    setPrivacyModal((prev) => !prev);
  };
  const [provisionModal, setProvisionModal] = useState(false);
  const openProvisionModal = () => {
    setProvisionModal((prev) => !prev);
  };

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    watch,
  } = useForm();

  const onCompleted = (data) => {
    const {
      createAccount: { ok },
    } = data;
    if (ok) {
      setIsVisible(true);
      // Alert.alert("회원가입이 완료되었습니다. 감사합니다.");
      // navigation.navigate("Login");
    }
  };

  const [createAccountMutation, { loading }] = useMutation(
    CREATE_ACCOUNT_MUTATION,
    {
      onCompleted,
    }
  );

  const onValid = async (data) => {
    if (!loading) {
      try {
        await createAccountMutation({
          variables: {
            userId: data.userId,
            userType: "환자",
            userName: data.userName,
            password: data.password,
            sex: data.sex,
            phone: data.phone,
          },
        });
      } catch (e) {
        console.log(e);
        var error = e.toString();
        error = error.replace("Error: ", "");
        Alert.alert(`${error}`);
      }
    }
  };

  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const usernameRef = useRef();
  const phoneRef = useRef();

  const onNext = (nextOne) => {
    nextOne?.current?.focus();
  };

  useEffect(() => {
    register("userId", {
      required: "* 아이디를 입력해주세요.",
    });
    register("password", {
      required: "* 비밀번호를 입력해주세요.",
    });
    register("passwordConfirm", {
      required: "* 비밀번호를 한번 더 입력해주세요.",
      validate: (value) => {
        return value !== watch("password")
          ? "* 비밀번호가 일치하지 않습니다. 다시 입력해주세요."
          : undefined;
      },
    });
    register("userName", {
      required: "* 이름을 입력해주세요.",
    });
    register("phone", {
      required: "* 연락처를 입력해주세요.",
    });
    register("sex", {
      required: "* 성별을 선택해주세요.",
    });
  }, [register]);
  return (
    <WriteLayout>
      <SectionLayout last>
        <StepTxtBox>
          <StepTxt>기본 정보 입력</StepTxt>
        </StepTxtBox>

        <FormBox>
          <FormLabelBox>
            <FormLabel>아이디</FormLabel>
          </FormLabelBox>

          <FormInput
            placeholder="아이디를 입력해주세요."
            placeholderTextColor={"#979797"}
            autoCapitalize="none"
            returnKeyType="next"
            onSubmitEditing={() => onNext(passwordRef)}
            onChangeText={(text) => setValue("userId", text)}
          />
          {errors.userId && <ErrorsText>{errors.userId.message}</ErrorsText>}
        </FormBox>

        <FormBox>
          <FormLabelBox>
            <FormLabel>비밀번호</FormLabel>
          </FormLabelBox>
          <FormInput
            ref={passwordRef}
            placeholder="비밀번호를 입력해주세요."
            placeholderTextColor={"#979797"}
            secureTextEntry
            returnKeyType="next"
            onSubmitEditing={() => onNext(passwordConfirmRef)}
            onChangeText={(text) => setValue("password", text)}
          />
          {errors.password && (
            <ErrorsText>{errors.password.message}</ErrorsText>
          )}
        </FormBox>

        <FormBox>
          <FormLabelBox>
            <FormLabel>비밀번호 확인</FormLabel>
          </FormLabelBox>
          <FormInput
            ref={passwordConfirmRef}
            placeholder="비밀번호 확인"
            placeholderTextColor={"#979797"}
            secureTextEntry
            returnKeyType="next"
            onSubmitEditing={() => onNext(usernameRef)}
            onChangeText={(text) => setValue("passwordConfirm", text)}
          />
          {errors.passwordConfirm && (
            <ErrorsText>{errors.passwordConfirm.message}</ErrorsText>
          )}
        </FormBox>

        <FormBox>
          <FormLabelBox>
            <FormLabel>이름</FormLabel>
          </FormLabelBox>
          <FormInput
            ref={usernameRef}
            placeholder="이름을 입력해주세요."
            placeholderTextColor={"#979797"}
            autoCapitalize="none"
            returnKeyType="next"
            onSubmitEditing={() => onNext(phoneRef)}
            onChangeText={(text) => setValue("userName", text)}
          />
          {errors.userName && (
            <ErrorsText>{errors.userName.message}</ErrorsText>
          )}
        </FormBox>

        <FormBox>
          <FormLabelBox>
            <FormLabel>연락처</FormLabel>
          </FormLabelBox>
          <FormInput
            ref={phoneRef}
            placeholder="- 빼고 입력해주세요."
            placeholderTextColor={"#979797"}
            autoCapitalize="none"
            keyboardType="number-pad"
            returnKeyType="done"
            onChangeText={(text) => setValue("phone", text)}
            maxLength={11}
          />
          {errors.phone && <ErrorsText>{errors.phone.message}</ErrorsText>}
        </FormBox>

        <FormBox>
          <FormLabelBox>
            <FormLabel>성별</FormLabel>
          </FormLabelBox>
          <JoinRadio
            lineover={true}
            options={[
              { key: "남성", text: "남성" },
              { key: "여성", text: "여성" },
            ]}
            setValue={setValue}
            fieldName="sex"
          />
          {errors.sex && <ErrorsText>{errors.sex.message}</ErrorsText>}
        </FormBox>

        <JoinCheckWrap>
          <CheckBoxAllBox>
            <BoxRow>
              <Check
                icon={faCheckCircle}
                status={personalInfo && provision ? "checked" : "unchecked"}
                onPress={() => {
                  allAgree();
                }}
                title={"모두 동의합니다."}
              />
            </BoxRow>
          </CheckBoxAllBox>
          <CheckBoxContainer>
            <CheckBoxInner>
              <Check
                icon={faCheck}
                status={personalInfo ? "checked" : "unchecked"}
                onPress={() => {
                  setPersonalInfo(!personalInfo);
                }}
                subtit={"(필수) 개인정보 취급방침"}
              />
            </CheckBoxInner>
            <TouchableOpacity onPress={openPrivacyModal}>
              <MoreText>보기</MoreText>
            </TouchableOpacity>
            <PrivacyModal
              showModal={privacyModal}
              setShowModal={setPrivacyModal}
            />
          </CheckBoxContainer>

          <CheckBoxContainer>
            <CheckBoxInner>
              <Check
                icon={faCheck}
                status={provision ? "checked" : "unchecked"}
                onPress={() => {
                  setProvision(!provision);
                }}
                subtit={"(필수) 이용약관"}
              />
            </CheckBoxInner>

            <TouchableOpacity onPress={openProvisionModal}>
              <MoreText>보기</MoreText>
            </TouchableOpacity>
            <ProvisionModal
              showModal={provisionModal}
              setShowModal={setProvisionModal}
            />
          </CheckBoxContainer>
        </JoinCheckWrap>

        <SubmitBtn
          text="회원가입"
          onPress={handleSubmit(onValid)}
          // disabled={
          //   category != null && personalInfo && provision ? false : true
          // }
        />
      </SectionLayout>
      <ConfirmModal
        title="알림"
        isVisible={isVisible}
        text="회원가입이 완료되었습니다."
        setIsVisible={setIsVisible}
        navigation={navigation}
        screen={"Login"}
      />
    </WriteLayout>
  );
}
