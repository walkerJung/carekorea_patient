import React, { useState } from "react";
import WriteLayout from "../../../components/layout/WriteLayout";
import Icon from "react-native-vector-icons/Ionicons";
import {
  FormBox,
  FormLabelBox,
  FormLabel,
  FormInput,
  StepTxtBox,
  StepNum,
} from "../../../components/join/JoinStyle";
import { SubmitBtn } from "../../../components/form/CareFormStyle";
import { Alert } from "react-native";
import { FlexBoth } from "../../../components/form/ListStyle";
import RNPickerSelect from "react-native-picker-select";
import JoinRadio from "../../../components/join/JoinRadio";
import { useForm } from "react-hook-form";
import { EDIT_CAREGIVERINFO_MUTATION, USER_DETAIL_QUERY } from "../../query";
import { useMutation, useQuery } from "@apollo/client";
import { useReactiveVar } from "@apollo/client";
import { memberVar } from "../../../apollo";
import SectionLayout from "../../../components/layout/SectionLayout";
import ConfirmModal from "../../../components/modal/ConfirmModal";

export default function EditDetailCaregiver({ navigation }) {
  const userInfo = JSON.parse(useReactiveVar(memberVar));
  const { data, loading } = useQuery(USER_DETAIL_QUERY, {
    fetchPolicy: "network-only",
    variables: {
      code: userInfo.code,
    },
  });
  const [selectMealText, setSelectMealText] = useState();
  const [selectUrineText, setSelectUrineText] = useState();
  const [selectSuctionText, setSelectSuctionText] = useState();
  const [selectMoveText, setSelectMoveText] = useState();
  const [selectBedText, setSelectBedText] = useState();
  const [isVisible, setIsVisible] = useState(false);
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
      editCaregiverInfo: { ok },
    } = data;
    if (ok) {
      setIsVisible(true);
    }
  };

  const [editCaregiverInfoMutation] = useMutation(EDIT_CAREGIVERINFO_MUTATION, {
    onCompleted,
    refetchQueries: () => [
      {
        query: USER_DETAIL_QUERY,
        variables: {
          code: userInfo.code,
        },
      },
    ],
  });

  const onValid = async (data) => {
    try {
      await editCaregiverInfoMutation({
        variables: {
          userCode: userInfo.code,
          smoke: data.smoke,
          drink: data.drink,
          mealCare: data.mealCare,
          urineCare: data.urineCare,
          suctionCare: data.suctionCare,
          moveCare: data.moveCare,
          bedCare: data.bedCare,
          introduce: data.introduce,
        },
      });
    } catch (e) {
      console.log(e);
      var error = e.toString();
      error = error.replace("Error: ", "");
      Alert.alert(`${error}`);
    }
  };

  const handleSelectBox = (set, value, setState) => {
    setValue(set, value), setState(value);
  };

  return (
    <>
      {!loading && (
        <WriteLayout>
          <SectionLayout>
            <StepTxtBox>
              <StepNum>상세정보변경</StepNum>
            </StepTxtBox>
            <FormBox>
              <FormLabelBox>
                <FormLabel>가능한 식사케어는?</FormLabel>
              </FormLabelBox>
              <RNPickerSelect
                useNativeAndroidPickerStyle={false}
                fixAndroidTouchableBug={true}
                placeholder={{
                  label: "선택",
                  color: "#979797",
                }}
                value={
                  selectMealText
                    ? selectMealText
                    : data.viewProfile.caregiverInfo.mealCare
                }
                onValueChange={(value) =>
                  handleSelectBox("mealCare", value, setSelectMealText)
                }
                items={[
                  { label: "콧줄 식사케어 ", value: "콧줄 식사케어 " },
                  { label: "뱃줄 식사케어", value: "뱃줄 식사케어" },
                  { label: "전적으로 먹여줌", value: "전적으로 먹여줌" },
                ]}
                doneText="선택"
                Icon={() => {
                  return (
                    <Icon name="caret-down-outline" size={15} color="#676767" />
                  );
                }}
                style={{
                  ...pickerSelectStyles,
                  iconContainer: { top: 20, right: 10 },
                }}
              />
            </FormBox>

            <FormBox>
              <FormLabelBox>
                <FormLabel>가능한 대소변 케어는?</FormLabel>
              </FormLabelBox>
              <RNPickerSelect
                useNativeAndroidPickerStyle={false}
                fixAndroidTouchableBug={true}
                placeholder={{
                  label: "선택",
                  color: "#979797",
                }}
                value={
                  selectUrineText
                    ? selectUrineText
                    : data.viewProfile.caregiverInfo.urineCare
                }
                onValueChange={(value) =>
                  handleSelectBox("urineCare", value, setSelectUrineText)
                }
                items={[
                  { label: "소변주머니 케어", value: "소변주머니 케어" },
                  { label: "장루 케어", value: "장루 케어" },
                  { label: "기저귀 케어", value: "기저귀 케어" },
                  { label: "이동변기 케어", value: "이동변기 케어" },
                  { label: "소변통 케어", value: "소변통 케어" },
                  { label: "관장", value: "관장" },
                ]}
                doneText="선택"
                Icon={() => {
                  return (
                    <Icon name="caret-down-outline" size={15} color="#676767" />
                  );
                }}
                style={{
                  ...pickerSelectStyles,
                  iconContainer: { top: 20, right: 10 },
                }}
              />
            </FormBox>

            <FormBox>
              <FormLabelBox>
                <FormLabel>가능한 석션 케어는?</FormLabel>
              </FormLabelBox>
              <RNPickerSelect
                useNativeAndroidPickerStyle={false}
                fixAndroidTouchableBug={true}
                placeholder={{
                  label: "선택",
                  color: "#979797",
                }}
                value={
                  selectSuctionText
                    ? selectSuctionText
                    : data.viewProfile.caregiverInfo.suctionCare
                }
                onValueChange={(value) =>
                  handleSelectBox("suctionCare", value, setSelectSuctionText)
                }
                items={[
                  { label: "목 석션", value: "목 석션" },
                  { label: "코 석션", value: "코 석션" },
                  { label: "입 석션", value: "입 석션" },
                ]}
                doneText="선택"
                Icon={() => {
                  return (
                    <Icon name="caret-down-outline" size={15} color="#676767" />
                  );
                }}
                style={{
                  ...pickerSelectStyles,
                  iconContainer: { top: 20, right: 10 },
                }}
              />
            </FormBox>

            <FormBox>
              <FormLabelBox>
                <FormLabel>가능한 이동케어는?</FormLabel>
              </FormLabelBox>
              <RNPickerSelect
                useNativeAndroidPickerStyle={false}
                fixAndroidTouchableBug={true}
                placeholder={{
                  label: "선택",
                  color: "#979797",
                }}
                value={
                  selectMoveText
                    ? selectMoveText
                    : data.viewProfile.caregiverInfo.moveCare
                }
                onValueChange={(value) =>
                  handleSelectBox("moveCare", value, setSelectMoveText)
                }
                items={[
                  { label: "휠체어 이동케어", value: "휠체어 이동케어" },
                  {
                    label: "지팡이 보행 이동케어",
                    value: "지팡이 보행 이동케어",
                  },
                  { label: "워커보행 이동케어", value: "워커보행 이동케어" },
                ]}
                doneText="선택"
                Icon={() => {
                  return (
                    <Icon name="caret-down-outline" size={15} color="#676767" />
                  );
                }}
                style={{
                  ...pickerSelectStyles,
                  iconContainer: { top: 20, right: 10 },
                }}
              />
            </FormBox>

            <FormBox>
              <FormLabelBox>
                <FormLabel>가능한 침대케어는?</FormLabel>
              </FormLabelBox>
              <RNPickerSelect
                useNativeAndroidPickerStyle={false}
                fixAndroidTouchableBug={true}
                placeholder={{
                  label: "선택",
                  color: "#979797",
                }}
                value={
                  selectBedText
                    ? selectBedText
                    : data.viewProfile.caregiverInfo.bedCare
                }
                onValueChange={(value) =>
                  handleSelectBox("bedCare", value, setSelectBedText)
                }
                items={[
                  {
                    label: "침대에서 휠체어 이동케어",
                    value: "침대에서 휠체어 이동케어",
                  },
                  { label: "체위(자세)변경", value: "체위(자세)변경" },
                  { label: "욕창관리", value: "욕창관리" },
                ]}
                doneText="선택"
                Icon={() => {
                  return (
                    <Icon name="caret-down-outline" size={15} color="#676767" />
                  );
                }}
                style={{
                  ...pickerSelectStyles,
                  iconContainer: { top: 20, right: 10 },
                }}
              />
            </FormBox>

            <FormBox>
              <FormLabelBox>
                <FormLabel>담배</FormLabel>
              </FormLabelBox>

              <JoinRadio
                defaultValue={data.viewProfile.caregiverInfo.smoke}
                lineover={true}
                options={[
                  { key: "흡연", text: "흡연" },
                  { key: "비흡연", text: "비흡연" },
                ]}
                setValue={setValue}
                fieldName="smoke"
              />
            </FormBox>

            <FormBox>
              <FormLabelBox>
                <FormLabel>음주 여부</FormLabel>
              </FormLabelBox>

              <JoinRadio
                defaultValue={data.viewProfile.caregiverInfo.drink}
                lineover={true}
                options={[
                  { key: "음주", text: "음주" },
                  { key: "비음주", text: "비음주" },
                ]}
                setValue={setValue}
                fieldName="drink"
              />
            </FormBox>

            <FormBox>
              <FormLabelBox>
                <FormLabel>자기소개</FormLabel>
              </FormLabelBox>
              <FormInput
                style={{ height: 100, textAlignVertical: "top", fontSize: 15 }}
                defaultValue={data.viewProfile.caregiverInfo.introduce}
                onChangeText={(text) => {
                  setValue("introduce", text);
                }}
                placeholder="자기소개글을 입력해주세요."
                numberOfLines={10}
                multiline={true}
              />
            </FormBox>

            <SubmitBtn text="수정하기" onPress={handleSubmit(onValid)} />
          </SectionLayout>
          <ConfirmModal
            title="알림"
            isVisible={isVisible}
            text="상세정보 변경이 완료되었습니다."
            setIsVisible={setIsVisible}
            navigation={navigation}
            screen={"EditCaregiver"}
          />
        </WriteLayout>
      )}
    </>
  );
}

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    color: "#212121",
    paddingRight: 30, // to ensure the text is never behind the icon
    marginTop: 5,
    marginBottom: 8,
    height: 48,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 13,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    color: "#212121",
    paddingRight: 30, // to ensure the text is never behind the icon
    marginTop: 5,
    marginBottom: 8,
    height: 48,
  },
};
