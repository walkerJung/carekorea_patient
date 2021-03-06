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
      // Alert.alert("??????????????? ?????????????????????. ???????????????.");
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
            userType: "??????",
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
      required: "* ???????????? ??????????????????.",
    });
    register("password", {
      required: "* ??????????????? ??????????????????.",
    });
    register("passwordConfirm", {
      required: "* ??????????????? ?????? ??? ??????????????????.",
      validate: (value) => {
        return value !== watch("password")
          ? "* ??????????????? ???????????? ????????????. ?????? ??????????????????."
          : undefined;
      },
    });
    register("userName", {
      required: "* ????????? ??????????????????.",
    });
    register("phone", {
      required: "* ???????????? ??????????????????.",
    });
    register("sex", {
      required: "* ????????? ??????????????????.",
    });
  }, [register]);
  return (
    <WriteLayout>
      <SectionLayout last>
        <StepTxtBox>
          <StepTxt>?????? ?????? ??????</StepTxt>
        </StepTxtBox>

        <FormBox>
          <FormLabelBox>
            <FormLabel>?????????</FormLabel>
          </FormLabelBox>

          <FormInput
            placeholder="???????????? ??????????????????."
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
            <FormLabel>????????????</FormLabel>
          </FormLabelBox>
          <FormInput
            ref={passwordRef}
            placeholder="??????????????? ??????????????????."
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
            <FormLabel>???????????? ??????</FormLabel>
          </FormLabelBox>
          <FormInput
            ref={passwordConfirmRef}
            placeholder="???????????? ??????"
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
            <FormLabel>??????</FormLabel>
          </FormLabelBox>
          <FormInput
            ref={usernameRef}
            placeholder="????????? ??????????????????."
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
            <FormLabel>?????????</FormLabel>
          </FormLabelBox>
          <FormInput
            ref={phoneRef}
            placeholder="- ?????? ??????????????????."
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
            <FormLabel>??????</FormLabel>
          </FormLabelBox>
          <JoinRadio
            lineover={true}
            options={[
              { key: "??????", text: "??????" },
              { key: "??????", text: "??????" },
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
                title={"?????? ???????????????."}
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
                subtit={"(??????) ???????????? ????????????"}
              />
            </CheckBoxInner>
            <TouchableOpacity onPress={openPrivacyModal}>
              <MoreText>??????</MoreText>
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
                subtit={"(??????) ????????????"}
              />
            </CheckBoxInner>

            <TouchableOpacity onPress={openProvisionModal}>
              <MoreText>??????</MoreText>
            </TouchableOpacity>
            <ProvisionModal
              showModal={provisionModal}
              setShowModal={setProvisionModal}
            />
          </CheckBoxContainer>
        </JoinCheckWrap>

        <SubmitBtn
          text="????????????"
          onPress={handleSubmit(onValid)}
          // disabled={
          //   category != null && personalInfo && provision ? false : true
          // }
        />
      </SectionLayout>
      <ConfirmModal
        title="??????"
        isVisible={isVisible}
        text="??????????????? ?????????????????????."
        setIsVisible={setIsVisible}
        navigation={navigation}
        screen={"Login"}
      />
    </WriteLayout>
  );
}
