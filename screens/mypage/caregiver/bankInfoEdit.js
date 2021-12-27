import React, { useRef, useState, useEffect } from "react";
import WriteLayout from "../../../components/layout/WriteLayout";
import {
  FormBox,
  FormLabelBox,
  FormLabel,
  ErrorsText,
  PhotoBox,
} from "../../../components/join/JoinStyle";
import { SubmitBtn } from "../../../components/form/CareFormStyle";
import { useForm } from "react-hook-form";
import { EDIT_CAREGIVERINFO_MUTATION, USER_DETAIL_QUERY } from "../../query";
import { useMutation, useQuery } from "@apollo/client";
import { useReactiveVar } from "@apollo/client";
import { memberVar } from "../../../apollo";
import { Alert, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { ReactNativeFile } from "apollo-upload-client";
import Icon from "react-native-vector-icons/Ionicons";
import SectionLayout from "../../../components/layout/SectionLayout";
import ConfirmModal from "../../../components/modal/ConfirmModal";

export default function EditBankInfoCaregiver({ navigation }) {
  const [isVisible, setIsVisible] = useState(false);
  const userInfo = JSON.parse(useReactiveVar(memberVar));
  const [bankInfo, setBankInfo] = useState();
  const {
    handleSubmit,
    setValue,
    register,
    formState: { errors },
  } = useForm();

  const nameRef = useRef();

  const { data, loading } = useQuery(USER_DETAIL_QUERY, {
    fetchPolicy: "network-only",
    variables: {
      code: userInfo.code,
    },
  });

  const onCompleted = (data) => {
    const {
      editCaregiverInfo: { ok },
    } = data;
    if (ok) {
      setIsVisible(true);
      // Alert.alert("통장사본 사진 변경이 완료되었습니다.");
      // navigation.navigate("EditCaregiver");
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
    const paths = data.bankInfo.split("/");
    const filename = paths[paths.length - 1];

    try {
      const bankInfo = new ReactNativeFile({
        uri: data.bankInfo,
        name: filename,
        type: "image/jpeg",
      });

      await editCaregiverInfoMutation({
        variables: {
          userCode: userInfo.code,
          bankInfo: bankInfo,
        },
      });
    } catch (e) {
      console.log(e);
      var error = e.toString();
      error = error.replace("Error: ", "");
      Alert.alert(`${error}`);
    }
  };

  const pickImage = async (set, value) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      set(result.uri), setValue(value, result.uri);
    }
  };

  useEffect(() => {
    register("bankInfo", {
      required: "* 통장사본 사진을 선택해주세요.",
    });
  }, [register]);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  return (
    <>
      {!loading && (
        <WriteLayout>
          <SectionLayout>
            <FormBox>
              <FormLabelBox>
                <FormLabel>통장사본 사진 변경</FormLabel>
              </FormLabelBox>
              <PhotoBox
                onPress={() => {
                  pickImage(setBankInfo, "bankInfo");
                }}
              >
                {data.viewProfile.caregiverInfo.bankInfo == "bankInfo" ? (
                  <>
                    {bankInfo ? (
                      <Image
                        style={{ width: "100%", height: "100%" }}
                        source={{
                          uri: bankInfo,
                        }}
                        resizeMode={"contain"}
                      />
                    ) : (
                      <Icon
                        name="add-outline"
                        size={23}
                        style={{ color: "#979797" }}
                      />
                    )}
                  </>
                ) : (
                  <>
                    {bankInfo ? (
                      <Image
                        style={{ width: "100%", height: "100%" }}
                        source={{
                          uri: bankInfo,
                        }}
                        resizeMode={"contain"}
                      />
                    ) : (
                      <Image
                        style={{ width: "100%", height: "100%" }}
                        source={{
                          uri: `http://3.36.22.165:4000${data.viewProfile.caregiverInfo.bankInfo}`,
                        }}
                        resizeMode={"contain"}
                      />
                    )}
                  </>
                )}
              </PhotoBox>
              {errors.bankInfo && (
                <ErrorsText>{errors.bankInfo.message}</ErrorsText>
              )}
            </FormBox>
            <SubmitBtn text="수정하기" onPress={handleSubmit(onValid)} />
          </SectionLayout>
          <ConfirmModal
            title="알림"
            isVisible={isVisible}
            text="통장 사진 변경이 완료되었습니다."
            setIsVisible={setIsVisible}
            navigation={navigation}
            screen={"EditCaregiver"}
          />
        </WriteLayout>
      )}
    </>
  );
}
