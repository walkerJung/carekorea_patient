import React, { useRef, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Clipboard,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import DefaultModal from "../../modal/DefaultModal";
import {
  Card,
  CardHead,
  CardHeadTit,
  GoViewBtn,
  List,
  ListTitBox,
  ListTit,
  ListTxt,
  ListTxtColor,
  Days,
  ClipboardBtn,
  FlexBoth,
  ClipSpan,
  Price,
  InfoBox,
  InfoTxt,
  Bold,
} from "../HistoryStyle";
import { ErrorsText } from "../../../components/join/JoinStyle";
import NumberFormat from "react-number-format";
import { FormInput, SubmitBtn } from "../../form/CareFormStyle";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { WRITE_HOPECOST_MUTATION } from "../../../screens/query";
import CurrencyInput from "react-native-currency-input";
import ConfirmModal from "../../../components/modal/ConfirmModal";
import { careTheme } from "../../../contents";

export default function Item({ onPress, item, copyToClipboard, navigation }) {
  const [number, setNumber] = useState();
  const caregiverInfo = item.announcementApplication?.find((element) => {
    return element.confirm == true;
  });
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  const applicationCaregiverCount = item.announcementApplication
    ? item.announcementApplication.length
    : 0;
  const ChoiceItemStyle = {
    1: {
      statusColor: { color: "#FFB400" },
      statusText: "예상 간병비 산출중",
    },
    2: {
      statusColor: { color: "#0077FF" },
      statusText: "예상간병비",
      modalBtn: true,
    },
    3: {
      statusColor: { color: "#20CF05" },
      statusText: `간병인 모집중 (${applicationCaregiverCount}명)`,
      careChoice: true,
    },
    4: {
      statusColor: { color: careTheme.COLORS.ERROR },
      statusText: "입금 대기중",
      deposit: true,
    },
    5: {
      statusColor: { color: "#5e66ff" },
      statusText: "입금 및 매칭 완료",
      deposit: true,
    },
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
      writeHopeCost: { ok },
    } = data;
    if (ok) {
      setShowModal(false);
      setTimeout(() => {
        setIsVisible(true);
      }, 500);
    }
  };

  const [writeHopeCostMutation] = useMutation(WRITE_HOPECOST_MUTATION, {
    onCompleted,
  });

  const onValid = async (data) => {
    try {
      await writeHopeCostMutation({
        variables: {
          code: data.code,
          hopeCost: parseInt(data.hopeCost),
        },
      });
    } catch (e) {
      console.log(e);
      var error = e.toString();
      error = error.replace("Error: ", "");
      Alert.alert(`${error}`);
    }
  };

  const handleHopeCost = (param) => {
    setNumber(param);
    setValue("hopeCost", param);
  };

  useEffect(() => {
    register("hopeCost", {
      required: "* 희망 간병비를 입력해주세요",
    });
  }, [register]);

  const nightsAndDays =
    (new Date(item.endDate).getTime() - new Date(item.startDate).getTime()) /
    (1000 * 60 * 60 * 24);

  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <Card
        style={{
          ...styles.shadow,
          backgroundColor: "#fff",
          borderRadius: 8,
        }}
      >
        <CardHead>
          <CardHeadTit style={ChoiceItemStyle[item.status].statusColor}>
            {ChoiceItemStyle[item.status].statusText}{" "}
            {item.status == 2 && (
              <NumberFormat
                value={item.expectedCost}
                displayType={"text"}
                thousandSeparator={true}
                suffix={"원"}
                renderText={(formattedValue) => (
                  <Text>{"(" + formattedValue + ")"}</Text>
                )}
              />
            )}
          </CardHeadTit>
          <GoViewBtn text="공고보기" onPress={onPress} />
        </CardHead>

        {ChoiceItemStyle[item.status].deposit && (
          <>
            <List>
              <ListTitBox>
                <ListTit>
                  <Icon name="person-outline" size={14} color="#979797" /> 담당
                  간병인
                </ListTit>
              </ListTitBox>
              <ListTxtColor>{caregiverInfo?.user?.userName}</ListTxtColor>
            </List>
            {item.status >= 5 && (
              <List>
                <ListTitBox>
                  <ListTit>
                    <Icon name="person-outline" size={14} color="#979797" />{" "}
                    담당 간병인 연락처
                  </ListTit>
                </ListTitBox>
                <ListTxtColor>{caregiverInfo?.user?.phone}</ListTxtColor>
              </List>
            )}

            <List>
              <ListTitBox>
                <ListTit>
                  <Icon name="person-outline" size={14} color="#979797" /> 입금
                  금액
                </ListTit>
              </ListTitBox>
              <ListTxtColor>
                <NumberFormat
                  value={Math.floor(
                    caregiverInfo.caregiverCost / 9 +
                      caregiverInfo.caregiverCost
                  )}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={"원"}
                  renderText={(formattedValue) => (
                    <Price>{formattedValue}</Price>
                  )}
                />
              </ListTxtColor>
              <ClipboardBtn
                activeOpacity={0.8}
                onPress={() => copyToClipboard("농협 123-12345678-12")}
              >
                <FlexBoth>
                  <Text style={{ fontSize: 15 }}>농협 123-12345678-12</Text>
                  <ClipSpan>
                    <Text style={{ fontSize: 13 }}>
                      <Icon
                        name="clipboard-outline"
                        size={13}
                        color="#979797"
                      />{" "}
                      복사
                    </Text>
                  </ClipSpan>
                </FlexBoth>
                <Text style={{ opacity: 0.4, marginTop: 3 }}>
                  입금이 확인되면 매칭이 완료됩니다.
                </Text>
              </ClipboardBtn>
            </List>
          </>
        )}

        <List>
          <ListTitBox>
            <ListTit>
              <Icon name="calendar-outline" size={14} color="#979797" /> 간병
              기간
            </ListTit>
            <Days>
              ({nightsAndDays - 1}박 {nightsAndDays}일)
            </Days>
          </ListTitBox>
          <ListTxt>
            {item.startDate} ~ {item.endDate}
          </ListTxt>
        </List>

        <List>
          <ListTitBox>
            <ListTit>
              <Icon name="person-outline" size={14} color="#979797" /> 환자 성함
            </ListTit>
          </ListTitBox>
          <ListTxt>{item.patientName}</ListTxt>
        </List>

        <List last={true}>
          <ListTitBox>
            <ListTit>
              <Icon name="location-outline" size={14} color="#979797" /> 간병
              주소
            </ListTit>
          </ListTitBox>
          <ListTxt>
            {item.address} {item.addressDetail}
          </ListTxt>
        </List>

        {ChoiceItemStyle[item.status].modalBtn && (
          <View style={{ marginTop: 10 }}>
            <SubmitBtn small text="희망간병비 입력" onPress={openModal} />
            <DefaultModal
              title="희망 간병비 입력"
              showModal={showModal}
              setShowModal={setShowModal}
            >
              <FlexBoth style={{ marginBottom: 10 }}>
                <Text style={{ fontSize: 16, color: "#333" }}>예상 간병비</Text>
                <NumberFormat
                  value={item.expectedCost}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={"원"}
                  renderText={(formattedValue) => (
                    <Price>{formattedValue}</Price>
                  )}
                />
              </FlexBoth>
              <CurrencyInput
                style={styles.test}
                value={number}
                onChangeValue={handleHopeCost}
                suffix="원"
                delimiter=","
                separator="."
                precision={0}
                keyboardType="number-pad"
                placeholder="희망간병비를 입력해 주세요."
                placeholderTextColor={"#979797"}
              />
              {setValue("code", item.code)}
              {errors.hopeCost && (
                <ErrorsText>{errors.hopeCost.message}</ErrorsText>
              )}
              <InfoBox style={{ marginBottom: 10 }}>
                <InfoTxt style={{ marginBottom: 10 }}>
                  <Bold>예상 간병비</Bold>는 작성하신 공고에 의해 책정된
                  금액입니다.
                </InfoTxt>
                <InfoTxt>
                  <Bold>희망 간병비</Bold>를 기준으로 간병인과 매칭이 됩니다.
                </InfoTxt>
              </InfoBox>
              <SubmitBtn text="확인" onPress={handleSubmit(onValid)} />
            </DefaultModal>
          </View>
        )}
        {ChoiceItemStyle[item.status].careChoice && (
          <View style={{ marginTop: 10 }}>
            <SubmitBtn
              small={true}
              text="간병인 선택"
              onPress={() =>
                navigation.navigate("ApplicantList", {
                  dataArray: item.announcementApplication,
                })
              }
            />
          </View>
        )}
      </Card>
      <ConfirmModal
        title="확인"
        isVisible={isVisible}
        text="희망간병비 입력이 완료 되었습니다."
        setIsVisible={setIsVisible}
        navigation={navigation}
        screen={"ProgressHistoryUser"}
      />
    </>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 6,
  },
  test: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderColor: "#ddd",
    borderWidth: 1,
    height: 48,
    fontSize: 16,
    marginBottom: 10,
    color: "#111",
  },
});
