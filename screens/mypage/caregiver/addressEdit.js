import React, { useRef, useState, useEffect } from "react";
import WriteLayout from "../../../components/layout/WriteLayout";
import {
  FormBox,
  FormLabelBox,
  FormLabel,
  FormInput,
  ErrorsText,
} from "../../../components/join/JoinStyle";
import {
  FlexRow,
  LeftBtnBox,
  RightBtnBox,
  SearchBtn,
  SearchInput,
  SubmitBtn,
} from "../../../components/form/CareFormStyle";
import { TouchableOpacity, Text, Alert } from "react-native";
import { careTheme } from "../../../contents";
import Postcode from "@actbase/react-daum-postcode";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { USER_DETAIL_QUERY, EDIT_CAREGIVERINFO_MUTATION } from "../../query";
import SectionLayout from "../../../components/layout/SectionLayout";
import ConfirmModal from "../../../components/modal/ConfirmModal";

export default function EditAddressCaregiver({ route, navigation }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isModal, setModal] = useState();
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
      // Alert.alert("주소 변경이 완료되었습니다.");
      // navigation.navigate("EditCaregiver");
    }
  };

  const [editCaregiverInfoMutation, { loading }] = useMutation(
    EDIT_CAREGIVERINFO_MUTATION,
    {
      onCompleted,
      refetchQueries: () => [
        {
          query: USER_DETAIL_QUERY,
          variables: {
            code: route.params.userCode,
          },
        },
      ],
    }
  );

  const onValid = async (data) => {
    try {
      await editCaregiverInfoMutation({
        variables: {
          userCode: route.params.userCode,
          address: data.address,
          addressDetail: data.addressDetail,
        },
      });
    } catch (e) {
      console.log(e);
      var error = e.toString();
      error = error.replace("Error: ", "");
      Alert.alert(`${error}`);
    }
  };

  const handleAddress = (data) => {
    setValue("address", data.address);
    setModal(true);
  };

  useEffect(() => {
    register("address", {
      required: "* 주소를 선택해주세요.",
    });
    register("addressDetail", {
      required: "* 상세주소를 입력해주세요.",
    });
  }, [register]);

  return (
    <WriteLayout>
      <SectionLayout>
        <FormBox>
          <FormLabelBox>
            <FormLabel>실거주 주소</FormLabel>
          </FormLabelBox>
          <FlexRow>
            <LeftBtnBox>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setModal(true)}
              >
                <SearchInput
                  placeholder={route.params.address}
                  placeholderTextColor={"#676767"}
                  keyboardType="default"
                  value={getValues("address")}
                  editable={false}
                />
                {errors.address && (
                  <ErrorsText>{errors.address.message}</ErrorsText>
                )}
              </TouchableOpacity>
            </LeftBtnBox>
            <RightBtnBox>
              <SearchBtn activeOpacity={0.8} onPress={() => setModal(true)}>
                <Text
                  style={{
                    fontSize: 14,
                    color: careTheme.COLORS.PRIMARY,
                    fontWeight: "bold",
                  }}
                >
                  주소찾기
                </Text>
              </SearchBtn>
            </RightBtnBox>
          </FlexRow>
          {isModal && (
            <Postcode
              style={{ width: 320, height: 320 }}
              jsOptions={{ animation: true }}
              onSelected={(data) => handleAddress(data)}
            />
          )}
          <FormInput
            placeholder={route.params.addressDetail}
            placeholderTextColor={"#979797"}
            keyboardType="default"
            onChangeText={(text) => setValue("addressDetail", text)}
          />
          {errors.addressDetail && (
            <ErrorsText>{errors.addressDetail.message}</ErrorsText>
          )}
        </FormBox>

        <SubmitBtn text="수정하기" onPress={handleSubmit(onValid)} />
      </SectionLayout>
      <ConfirmModal
        title="알림"
        isVisible={isVisible}
        text="주소 변경이 완료되었습니다."
        setIsVisible={setIsVisible}
        navigation={navigation}
        screen={"EditCaregiver"}
      />
    </WriteLayout>
  );
}
