import React, { useState, useEffect, useRef } from "react";
import { Alert, TouchableOpacity, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import WriteLayout from "../../../components/layout/WriteLayout";
import SectionLayout from "../../../components/layout/SectionLayout";
import {
  StepTxtBox,
  StepNum,
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
import {
  FlexRow,
  LeftBtnBox,
  RightBtnBox,
  SearchBtn,
  SearchInput,
  SubmitBtn,
} from "../../../components/form/CareFormStyle";
import Check from "../../../components/join/CheckBox";
import { faCheck } from "@fortawesome/pro-light-svg-icons";
import { faCheckCircle } from "@fortawesome/pro-solid-svg-icons";
import { careTheme } from "../../../contents";
import RNPickerSelect from "react-native-picker-select";
import { FlexBoth } from "../../../components/form/ListStyle";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { CREATE_ACCOUNT_MUTATION } from "../../query";
import Postcode from "@actbase/react-daum-postcode";
import PrivacyModal from "../../../components/modal/PrivacyModal";
import ProvisionModal from "../../../components/modal/ProvisionModal";
import ConfirmModal from "../../../components/modal/ConfirmModal";

export default function CaregiverRegister({ navigation }) {
  const [allProvision, setAllProvision] = useState(false);
  const [personalInfo, setPersonalInfo] = useState(false);
  const [provision, setProvision] = useState(false);
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

  const [isModal, setModal] = useState(false);
  const [selectMealText, setSelectMealText] = useState("");
  const [selectUrineText, setSelectUrineText] = useState("");
  const [selectSuctionText, setSelectSuctionText] = useState("");
  const [selectMoveText, setSelectMoveText] = useState("");
  const [selectBedText, setSelectBedText] = useState("");
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
      createAccount: { ok },
    } = data;
    if (ok) {
      setIsVisible(true);
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
        if (!personalInfo || !provision) {
          Alert.alert("개인정보 취급방침 및 이용약관에 동의해주세요.");
          return false;
        }
        await createAccountMutation({
          variables: {
            userId: data.userId,
            userType: "간병인",
            userName: data.userName,
            password: data.password,
            sex: data.sex,
            phone: data.phone,
            residentNumber: data.resident_1 + data.resident_2,
            smoke: data.smoke,
            drink: data.drink,
            mealCare: data.mealCare,
            urineCare: data.urineCare,
            suctionCare: data.suctionCare,
            moveCare: data.moveCare,
            bedCare: data.bedCare,
            address: data.address,
            addressDetail: data.addressDetail,
            introduce: data.introduce,
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

  const handleAddress = (data) => {
    setValue("address", data.address);
    setModal(false);
  };

  const handleSelectBox = (set, value, setState) => {
    setValue(set, value), setState(value);
  };

  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const usernameRef = useRef();
  const phoneRef = useRef();
  const residentRef = useRef();

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
    register("address", {
      required: "* 주소를 선택해주세요.",
    });
    register("addressDetail", {
      required: "* 상세주소를 입력해주세요.",
    });
    register("resident_1", {
      required: "* 주민등록번호 앞자리를 입력해주세요.",
    });
    register("resident_2", {
      required: "* 주민등록번호 뒷자리를 입력해주세요.",
    });
    register("mealCare", {
      required: "* 가능한 식사케어를 선택해주세요.",
    });
    register("urineCare", {
      required: "* 가능한 대소변케어를 선택해주세요.",
    });
    register("suctionCare", {
      required: "* 가능한 석션케어를 선택해주세요.",
    });
    register("moveCare", {
      required: "* 가능한 이동케어를 선택해주세요.",
    });
    register("bedCare", {
      required: "* 가능한 침대케어를 선택해주세요.",
    });
    register("smoke", {
      required: "* 가능한 흡연 여부를 선택해주세요.",
    });
    register("drink", {
      required: "* 가능한 음주 여부를 선택해주세요.",
    });
    register("introduce", {
      required: "* 간단한 자기소개를 입력해주세요.",
    });
  }, [register]);

  return (
    <WriteLayout>
      <SectionLayout>
        <StepTxtBox>
          <StepNum>Step1</StepNum>
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
            returnKeyType="next"
            autoCapitalize="none"
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
            keyboardType="number-pad"
            autoCapitalize="none"
            returnKeyType="done"
            onChangeText={(text) => setValue("phone", text)}
            maxLength={11}
          />
          {errors.phone && <ErrorsText>{errors.phone.message}</ErrorsText>}
        </FormBox>

        <FormBox last>
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
      </SectionLayout>

      <SectionLayout>
        <StepTxtBox>
          <StepNum>Step2</StepNum>
          <StepTxt>간병인 등록 정보 입력</StepTxt>
        </StepTxtBox>

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
                  placeholder="주소를 입력해주세요."
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
            placeholder="상세주소"
            placeholderTextColor={"#979797"}
            keyboardType="default"
            onChangeText={(text) => setValue("addressDetail", text)}
          />
          {errors.addressDetail && (
            <ErrorsText>{errors.addressDetail.message}</ErrorsText>
          )}
        </FormBox>

        <FormBox>
          <FormLabelBox>
            <FormLabel>주민등록번호</FormLabel>
          </FormLabelBox>
          <FlexBoth style={{ alignItems: "center" }}>
            <FormInput
              placeholder="앞 번호 6자리"
              placeholderTextColor={"#979797"}
              keyboardType="number-pad"
              returnKeyType="next"
              onSubmitEditing={() => onNext(residentRef)}
              maxLength={6}
              style={{ flex: 1, marginRight: 5 }}
              onChangeText={(text) => setValue("resident_1", text)}
            />
            <Text>-</Text>
            <FormInput
              ref={residentRef}
              placeholder="뒷 번호 7자리"
              placeholderTextColor={"#979797"}
              keyboardType="number-pad"
              returnKeyType="done"
              secureTextEntry
              maxLength={7}
              style={{ flex: 1, marginLeft: 5 }}
              onChangeText={(text) => setValue("resident_2", text)}
            />
          </FlexBoth>
          {errors.resident_1 && (
            <ErrorsText>{errors.resident_1.message}</ErrorsText>
          )}
          {errors.resident_2 && (
            <ErrorsText>{errors.resident_2.message}</ErrorsText>
          )}
        </FormBox>
      </SectionLayout>

      <SectionLayout last>
        <StepTxtBox>
          <StepNum>Step3</StepNum>
          <StepTxt>간병인 사전질문</StepTxt>
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
            value={selectMealText}
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
          {errors.mealCare && (
            <ErrorsText>{errors.mealCare.message}</ErrorsText>
          )}
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
            value={selectUrineText}
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
          {errors.urineCare && (
            <ErrorsText>{errors.urineCare.message}</ErrorsText>
          )}
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
            value={selectSuctionText}
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
          {errors.suctionCare && (
            <ErrorsText>{errors.suctionCare.message}</ErrorsText>
          )}
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
            value={selectMoveText}
            onValueChange={(value) =>
              handleSelectBox("moveCare", value, setSelectMoveText)
            }
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
          {errors.moveCare && (
            <ErrorsText>{errors.moveCare.message}</ErrorsText>
          )}
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
            value={selectBedText}
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
          {errors.bedCare && <ErrorsText>{errors.bedCare.message}</ErrorsText>}
        </FormBox>

        <FormBox>
          <FormLabelBox>
            <FormLabel>흡연 여부</FormLabel>
          </FormLabelBox>

          <JoinRadio
            lineover={true}
            options={[
              { key: "흡연", text: "흡연" },
              { key: "비흡연", text: "비흡연" },
            ]}
            setValue={setValue}
            fieldName="smoke"
          />
          {errors.smoke && <ErrorsText>{errors.smoke.message}</ErrorsText>}
        </FormBox>

        <FormBox>
          <FormLabelBox>
            <FormLabel>음주 여부</FormLabel>
          </FormLabelBox>

          <JoinRadio
            lineover={true}
            options={[
              { key: "음주", text: "음주" },
              { key: "비음주", text: "비음주" },
            ]}
            setValue={setValue}
            fieldName="drink"
          />
          {errors.drink && <ErrorsText>{errors.drink.message}</ErrorsText>}
        </FormBox>

        <FormBox>
          <FormLabelBox>
            <FormLabel>자기소개</FormLabel>
          </FormLabelBox>
          <FormInput
            style={{ height: 100, textAlignVertical: "top", fontSize: 15 }}
            placeholder="자기소개글을 입력해주세요."
            numberOfLines={10}
            onChangeText={(text) => {
              setValue("introduce", text);
            }}
          />
          {errors.introduce && (
            <ErrorsText>{errors.introduce.message}</ErrorsText>
          )}
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

        <SubmitBtn text="회원가입" onPress={handleSubmit(onValid)} />
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

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    color: "#212121",
    paddingRight: 30,
    marginTop: 5,
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
    paddingRight: 30,
    marginTop: 5,
    height: 48,
  },
};
