import React, { useEffect, useRef, useState } from "react";
import WriteLayout from "../../../components/layout/WriteLayout";
import {
  FormBox,
  FormLabelBox,
  FormLabel,
  FormInput,
  ErrorsText,
} from "../../../components/join/JoinStyle";
import { SubmitBtn } from "../../../components/form/CareFormStyle";
import { useForm } from "react-hook-form";
import { EDIT_USER_MUTATION, USER_DETAIL_QUERY } from "../../query";
import { useMutation } from "@apollo/client";
import { useReactiveVar } from "@apollo/client";
import { memberVar } from "../../../apollo";
import { Alert } from "react-native";
import SectionLayout from "../../../components/layout/SectionLayout";
import ConfirmModal from "../../../components/modal/ConfirmModal";

export default function EditPasswordUser({ navigation }) {
  const [isVisible, setIsVisible] = useState(false);
  const userInfo = JSON.parse(useReactiveVar(memberVar));
  const {
    watch,
    setValue,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onCompleted = async (data) => {
    if (data.editAccount.ok) {
      // Alert.alert("비밀번호 변경이 완료되었습니다.");
      // navigation.navigate("EditUser");
      setIsVisible(true);
    } else {
      Alert.alert("회원정보 변경에 실패하였습니다.");
    }
  };

  const [editUserMutation, { mutationLoading }] = useMutation(
    EDIT_USER_MUTATION,
    {
      onCompleted,
      refetchQueries: () => [
        {
          query: USER_DETAIL_QUERY,
          variables: {
            code: userInfo.code,
          },
        },
      ],
    }
  );

  const onValid = (data) => {
    if (!mutationLoading) {
      editUserMutation({
        variables: {
          userCode: userInfo.code,
          password: data.newPassword,
        },
      });
    }
  };

  const passwordRef = useRef({});
  const confirmPasswordRef = useRef();

  const onNext = (nextOne) => {
    nextOne?.current?.focus();
  };

  useEffect(() => {
    register("newPassword", {
      required: "* 비밀번호를 입력해주세요.",
    });
    register("newPasswordConfirm", {
      required: "* 비밀번호를 한번 더 입력해주세요.",
      validate: (value) => {
        return value !== watch("newPassword")
          ? "* 비밀번호가 일치하지 않습니다. 다시 입력해주세요."
          : undefined;
      },
    });
  }, [register]);

  return (
    <WriteLayout>
      <SectionLayout>
        <FormBox>
          <FormLabelBox>
            <FormLabel>변경할 비밀번호</FormLabel>
          </FormLabelBox>
          <FormInput
            ref={passwordRef}
            placeholder="비밀번호"
            secureTextEntry={true}
            password={true}
            returnKeyType="next"
            blurOnSubmit={false}
            onChangeText={(text) => setValue("newPassword", text)}
            onSubmitEditing={() => onNext(confirmPasswordRef)}
          />
          {errors.newPassword && (
            <ErrorsText>{errors.newPassword.message}</ErrorsText>
          )}
        </FormBox>
        <FormBox>
          <FormLabelBox>
            <FormLabel>변경할 비밀번호 확인</FormLabel>
          </FormLabelBox>
          <FormInput
            ref={confirmPasswordRef}
            placeholder="비밀번호 확인"
            secureTextEntry={true}
            password={true}
            returnKeyType="done"
            blurOnSubmit={true}
            onChangeText={(text) => setValue("newPasswordConfirm", text)}
          />
          {errors.newPasswordConfirm && (
            <ErrorsText>{errors.newPasswordConfirm.message}</ErrorsText>
          )}
        </FormBox>

        <SubmitBtn text="수정하기" onPress={handleSubmit(onValid)} />
      </SectionLayout>
      <ConfirmModal
        title="알림"
        isVisible={isVisible}
        text="비밀번호 변경이 완료되었습니다."
        setIsVisible={setIsVisible}
        navigation={navigation}
        screen={"EditUser"}
      />
    </WriteLayout>
  );
}
