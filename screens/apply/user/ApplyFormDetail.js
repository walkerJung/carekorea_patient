import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import FormLayout from "../../../components/form/FormLayout";
import RNPickerSelect from "react-native-picker-select";
import Icon from "react-native-vector-icons/Ionicons";
import SectionLayout from "../../../components/layout/SectionLayout";
import {
  FormBox,
  FormLabel,
  ErrorsText,
  SubmitBtn,
  InfoBox,
  InfoTxt,
} from "../../../components/form/CareFormStyle";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@apollo/client";
import {
  WRITE_ANNOUNCEMENT_MUTATION,
  ANNOUNCEMENT_LIST_QUERY,
} from "../../query";
import { useReactiveVar } from "@apollo/client";
import { memberVar } from "../../../apollo";

export default function ApplyFormDetail({ route, navigation }) {
  const userInfo = JSON.parse(useReactiveVar(memberVar));
  const {
    address,
    addressDetail,
    disease,
    endDate,
    endTime,
    infectiousDisease,
    isolation,
    nursingGrade,
    patientAge,
    patientName,
    patientWeight,
    protectorName,
    protectorPhone,
    startDate,
    startTime,
    title,
  } = route.params.data;
  const [SelectText, setSelectText] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const onCompleted = (data) => {
    const {
      writeAnnouncement: { ok },
    } = data;
    if (ok) {
      navigation.navigate("ApplyComplete");
    }
  };

  const [writeAnnouncementMutation, { loading }] = useMutation(
    WRITE_ANNOUNCEMENT_MUTATION,
    {
      onCompleted,
      refetchQueries: () => [
        {
          query: ANNOUNCEMENT_LIST_QUERY,
          variables: {
            userCode: userInfo.code,
          },
        },
      ],
    }
  );

  const onValid = async (data) => {
    if (!loading) {
      try {
        await writeAnnouncementMutation({
          variables: {
            userCode: userInfo.code,
            needMealCare: data.needMealCare,
            needUrineCare: data.needUrineCare,
            needSuctionCare: data.needSuctionCare,
            needMoveCare: data.needMoveCare,
            needBedCare: data.needBedCare,
            needHygieneCare: data.needHygieneCare,
            caregiverMeal: data.caregiverMeal,
            infectiousDisease,
            title,
            startDate,
            endDate,
            startTime,
            endTime,
            protectorName,
            protectorPhone,
            patientName,
            patientAge: parseInt(patientAge),
            patientWeight: parseInt(patientWeight),
            address,
            addressDetail,
            nursingGrade,
            disease,
            isolation,
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

  const handleSelectBox = (set, value) => {
    setValue(set, value);
  };

  useEffect(() => {
    register("needMealCare", {
      required: "* 식사보조를 선택해주세요.",
    });
    register("needUrineCare", {
      required: "* 대소변 케어를 선택해주세요.",
    });
    register("needSuctionCare", {
      required: "* 석션 케어를 선택해주세요.",
    });
    register("needMoveCare", {
      required: "* 이동 케어를 선택해주세요.",
    });
    register("needBedCare", {
      required: "* 침대 케어를 선택해주세요.",
    });
    register("needHygieneCare", {
      required: "* 위생 케어를 선택해주세요.",
    });
    register("caregiverMeal", {
      required: "* 간병인 식사 제공을 선택해주세요.",
    });
  }, [register]);

  return (
    <FormLayout>
      <SectionLayout last={true}>
        <InfoBox>
          <Icon name={"checkmark-circle-sharp"} color={"#FFCD43"} size={21} />
          <InfoTxt>
            각 항목을 얼마나 할 수 있는지 솔직하게 입력해 주세요.
          </InfoTxt>
        </InfoBox>
        <FormBox>
          <FormLabel>1. 어떠한 식사보조가 필요하신가요?</FormLabel>
          <RNPickerSelect
            useNativeAndroidPickerStyle={false}
            fixAndroidTouchableBug={true}
            placeholder={{
              label: "선택",
              color: "#979797",
            }}
            value={getValues("needMealCare")}
            onValueChange={(value) => handleSelectBox("needMealCare", value)}
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
          {errors.needMealCare && (
            <ErrorsText>{errors.needMealCare.message}</ErrorsText>
          )}
        </FormBox>

        <FormBox>
          <FormLabel>2. 어떠한 대소변 케어가 필요하신가요?</FormLabel>
          <RNPickerSelect
            useNativeAndroidPickerStyle={false}
            fixAndroidTouchableBug={true}
            placeholder={{
              label: "선택",
              color: "#979797",
            }}
            value={getValues("needUrineCare")}
            onValueChange={(value) => handleSelectBox("needUrineCare", value)}
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
          {errors.needUrineCare && (
            <ErrorsText>{errors.needUrineCare.message}</ErrorsText>
          )}
        </FormBox>

        <FormBox>
          <FormLabel>3. 어떠한 석션 케어가 필요한가요?</FormLabel>
          <RNPickerSelect
            useNativeAndroidPickerStyle={false}
            fixAndroidTouchableBug={true}
            placeholder={{
              label: "선택",
              color: "#979797",
            }}
            value={getValues("needSuctionCare")}
            onValueChange={(value) => handleSelectBox("needSuctionCare", value)}
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
          {errors.needSuctionCare && (
            <ErrorsText>{errors.needSuctionCare.message}</ErrorsText>
          )}
        </FormBox>

        <FormBox>
          <FormLabel>4. 어떠한 이동 케어가 필요하신가요?</FormLabel>
          <RNPickerSelect
            useNativeAndroidPickerStyle={false}
            fixAndroidTouchableBug={true}
            placeholder={{
              label: "선택",
              color: "#979797",
            }}
            value={getValues("needMoveCare")}
            onValueChange={(value) => handleSelectBox("needMoveCare", value)}
            items={[
              { label: "휠체어 이동케어", value: "휠체어 이동케어" },
              { label: "지팡이 보행 이동케어", value: "지팡이 보행 이동케어" },
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
          {errors.needMoveCare && (
            <ErrorsText>{errors.needMoveCare.message}</ErrorsText>
          )}
        </FormBox>

        <FormBox>
          <FormLabel>5. 어떠한 침대 케어가 필요하신가요?</FormLabel>
          <RNPickerSelect
            useNativeAndroidPickerStyle={false}
            fixAndroidTouchableBug={true}
            placeholder={{
              label: "선택",
              color: "#979797",
            }}
            value={getValues("needBedCare")}
            onValueChange={(value) => handleSelectBox("needBedCare", value)}
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
          {errors.needBedCare && (
            <ErrorsText>{errors.needBedCare.message}</ErrorsText>
          )}
        </FormBox>

        <FormBox>
          <FormLabel>6. 어떠한 위생 케어가 필요하신가요?</FormLabel>
          <RNPickerSelect
            useNativeAndroidPickerStyle={false}
            fixAndroidTouchableBug={true}
            placeholder={{
              label: "선택",
              color: "#979797",
            }}
            value={getValues("needHygieneCare")}
            onValueChange={(value) => handleSelectBox("needHygieneCare", value)}
            items={[
              { label: "전적으로 도와줌", value: "전적으로 도와줌" },
              { label: "화장실에서 도와줌", value: "화장실에서 도와줌" },
              { label: "침상에서 도와줌", value: "침상에서 도와줌" },
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
          {errors.needHygieneCare && (
            <ErrorsText>{errors.needHygieneCare.message}</ErrorsText>
          )}
        </FormBox>

        <FormBox>
          <FormLabel>7. 간병인 식사는 어떻게 제공하나요?</FormLabel>
          <RNPickerSelect
            useNativeAndroidPickerStyle={false}
            fixAndroidTouchableBug={true}
            placeholder={{
              label: "선택",
              color: "#979797",
            }}
            value={getValues("caregiverMeal")}
            onValueChange={(value) => handleSelectBox("caregiverMeal", value)}
            items={[
              { label: "제공함", value: "제공함" },
              { label: "제공하지않음", value: "제공하지않음" },
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
          {errors.caregiverMeal && (
            <ErrorsText>{errors.caregiverMeal.message}</ErrorsText>
          )}
        </FormBox>

        <SubmitBtn text="간병비 산출 신청" onPress={handleSubmit(onValid)} />
      </SectionLayout>
    </FormLayout>
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
