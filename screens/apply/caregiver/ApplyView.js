import React, { useState, useEffect } from "react";
import { Text, Alert, StyleSheet } from "react-native";
import {
  Container,
  Card,
  Card2,
  List,
  ListTitBox,
  ListTit,
  ListTxt,
  ListTxtColor,
  ListSubTit,
  Days,
  EditBtn,
  EditTxt,
  GoViewBtn,
  FlexBoth,
  Price,
  InfoBox,
  InfoTxt,
  Bold,
} from "../../../components/history/HistoryStyle";
import { PageHeader, StatusTxt } from "../../../components/form/ListStyle";
import Icon from "react-native-vector-icons/Ionicons";
import Fontawesome from "react-native-vector-icons/FontAwesome5";
import DefulatLayout from "../../../components/layout/DefaultLayout";
import { FormInput, SubmitBtn } from "../../../components/form/CareFormStyle";
import DefaultModal from "../../../components/modal/DefaultModal";
import { useReactiveVar } from "@apollo/client";
import { memberVar } from "../../../apollo";
import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "@apollo/client";
import {
  ANNOUNCEMENT_DETAIL_QUERY,
  WRITE_CAREGIVERCOST_MUTATION,
} from "../../query";
import NumberFormat from "react-number-format";
import CurrencyInput from "react-native-currency-input";
import ConfirmModal from "../../../components/modal/ConfirmModal";
import { careTheme } from "../../../contents";

export default function ApplyViewCaregiver({ route, navigation }) {
  const { code } = route.params;
  const [isVisible, setIsVisible] = useState(false);
  const [number, setNumber] = useState();
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal((prev) => !prev);
  };
  const { data, loading } = useQuery(ANNOUNCEMENT_DETAIL_QUERY, {
    variables: {
      code,
    },
    fetchPolicy: "network-only",
  });
  const userInfo = JSON.parse(useReactiveVar(memberVar));

  const Supported = data?.viewAnnouncement?.announcementApplication.find(
    (element) => {
      return element.user.userId == userInfo.userId;
    }
  );

  const applicationCaregiverCount = data?.viewAnnouncement
    ?.announcementApplication
    ? data?.viewAnnouncement?.announcementApplication?.length
    : 0;

  const ChoiceItemStyle = {
    3: {
      statusColor: { color: "#20CF05" },
      statusText: `간병인 모집중 (${applicationCaregiverCount}명)`,
    },
    4: {
      statusColor: { color: careTheme.COLORS.ERROR },
      statusText: "입금 대기중",
    },
    5: {
      statusColor: { color: "#5e66ff" },
      statusText: "입금 및 매칭 완료",
    },
    6: {
      statusColor: { color: "#20CF05" },
      statusText: "환불 완료",
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
    if (data.writeCaregiverCost.ok) {
      // Alert.alert("본인간병비 입력이 완료되었습니다.");
      // navigation.navigate("AnnouncementList");
      setShowModal(false);
      setIsVisible(true);
    } else {
      Alert.alert("본인간병비 입력에 실패하였습니다. 관리자에게 문의해주세요.");
      navigation.navigate("AnnouncementList");
    }
  };

  const [writeCaregiverCostMutation] = useMutation(
    WRITE_CAREGIVERCOST_MUTATION,
    {
      onCompleted,
    }
  );

  const onValid = async (data) => {
    try {
      await writeCaregiverCostMutation({
        variables: {
          announcementCode: data.code,
          caregiverCost: parseInt(data.caregiverCost),
        },
      });
    } catch (e) {
      console.log(e);
      var error = e.toString();
      error = error.replace("Error: ", "");
      Alert.alert(`${error}`);
    }
  };

  const handleCaregiverCost = (param) => {
    setNumber(param);
    setValue("caregiverCost", param);
  };

  useEffect(() => {
    register("caregiverCost", {
      required: "* 본인 간병비를 입력해주세요",
    });
  }, [register]);

  const nightsAndDays =
    (new Date(data?.viewAnnouncement?.endDate).getTime() -
      new Date(data?.viewAnnouncement?.startDate).getTime()) /
    (1000 * 60 * 60 * 24);
  return (
    <>
      {!loading && (
        <DefulatLayout>
          <Container>
            <PageHeader>
              <StatusTxt
                style={{
                  color:
                    ChoiceItemStyle[data?.viewAnnouncement?.status].statusColor
                      .color,
                }}
              >
                {ChoiceItemStyle[data?.viewAnnouncement?.status].statusText}
              </StatusTxt>
            </PageHeader>

            <Card2
              style={{ ...styles.shadow, paddingTop: 12, paddingBottom: 12 }}
            >
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                {data?.viewAnnouncement?.title}
              </Text>
            </Card2>

            <Card2 style={styles.shadow}>
              <List>
                <ListTitBox>
                  <ListTit>
                    <Fontawesome name="coins" size={14} color="#979797" /> 희망
                    간병비
                  </ListTit>
                </ListTitBox>
                <ListTxtColor>
                  <NumberFormat
                    value={Math.floor(data?.viewAnnouncement?.hopeCost * 0.9)}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={"원"}
                    renderText={(formattedValue) => (
                      <Text>{formattedValue}</Text>
                    )}
                  />
                </ListTxtColor>
              </List>
              <List>
                <ListTitBox>
                  <ListTit>
                    <Icon name="calendar-outline" size={14} color="#979797" />{" "}
                    간병 기간
                  </ListTit>
                  <Days>
                    ({nightsAndDays - 1}박 {nightsAndDays}일)
                  </Days>
                </ListTitBox>
                <ListTxt>
                  {data.viewAnnouncement.startDate}
                  {" ~ "}
                  {data.viewAnnouncement.endDate}
                </ListTxt>
              </List>
              <List last={true}>
                <ListTitBox>
                  <ListTit>
                    <Icon name="location-outline" size={14} color="#979797" />{" "}
                    간병 주소
                  </ListTit>
                </ListTitBox>
                <ListTxt>
                  {data.viewAnnouncement.address}{" "}
                  {data.viewAnnouncement.addressDetail}
                </ListTxt>
              </List>
            </Card2>

            <Card2 style={styles.shadow}>
              <List last>
                <ListTitBox>
                  <ListTit>
                    <Icon name="person-outline" size={14} color="#979797" />{" "}
                    보호자
                  </ListTit>
                </ListTitBox>
                <ListTxt>{data.viewAnnouncement.protectorName}</ListTxt>
              </List>
              {/* {data.viewAnnouncement.status == 5 && (
                <List last={true}>
                  <ListTitBox>
                    <ListTit>
                      <Icon name="person-outline" size={14} color="#979797" />{" "}
                      보호자 연락처
                    </ListTit>
                  </ListTitBox>
                  <ListTxt>{data.viewAnnouncement.protectorPhone}</ListTxt>
                </List>
              )} */}
            </Card2>

            <Card2 style={styles.shadow}>
              <List>
                <ListTitBox style={{ marginBottom: 15 }}>
                  <ListTit>
                    <Icon name="person-outline" size={14} color="#979797" />{" "}
                    환자 정보
                  </ListTit>
                </ListTitBox>
                <ListSubTit>환자 성함</ListSubTit>
                <ListTxt>{data.viewAnnouncement.patientName}</ListTxt>
              </List>

              {data.viewAnnouncement.status == 5 && (
                <List>
                  <ListSubTit>환자 연락처</ListSubTit>
                  <ListTxt>{data.viewAnnouncement.user.phone}</ListTxt>
                </List>
              )}

              <List>
                <ListSubTit>환자 나이</ListSubTit>
                <ListTxt>{data.viewAnnouncement.patientAge}세</ListTxt>
              </List>

              <List>
                <ListSubTit>환자 몸무게</ListSubTit>
                <ListTxt>{data.viewAnnouncement.patientWeight}kg</ListTxt>
              </List>

              <List last={true}>
                <ListSubTit>장기요양 등급</ListSubTit>
                <ListTxt>{data.viewAnnouncement.nursingGrade}</ListTxt>
              </List>
            </Card2>

            <Card2 style={styles.shadow}>
              <List>
                <ListTitBox style={{ marginBottom: 15 }}>
                  <ListTit>
                    <Icon name="person-outline" size={14} color="#979797" />{" "}
                    환자 정보
                  </ListTit>
                </ListTitBox>
                <ListSubTit>식사보조가 필요하신가요?</ListSubTit>
                <ListTxt>{data.viewAnnouncement.needMealCare}</ListTxt>
              </List>

              <List>
                <ListSubTit>대소변 케어가 필요하신가요?</ListSubTit>
                <ListTxt>{data.viewAnnouncement.needUrineCare}</ListTxt>
              </List>

              <List>
                <ListSubTit>석션 케어가 필요한가요?</ListSubTit>
                <ListTxt>{data.viewAnnouncement.needSuctionCare}</ListTxt>
              </List>

              <List>
                <ListSubTit>이동시 필요한 케어가 필요하신가요?</ListSubTit>
                <ListTxt>{data.viewAnnouncement.needMoveCare}</ListTxt>
              </List>

              <List>
                <ListSubTit>침대에서 필요한 케어가 필요하신가요?</ListSubTit>
                <ListTxt>{data.viewAnnouncement.needBedCare}</ListTxt>
              </List>

              <List last={true}>
                <ListSubTit>위생 관련 케어가 필요하신가요?</ListSubTit>
                <ListTxt>{data.viewAnnouncement.needHygieneCare}</ListTxt>
              </List>
            </Card2>

            {!Supported ? (
              <>
                <SubmitBtn text="지원하기" onPress={openModal} />
                <DefaultModal
                  title="지원하기"
                  showModal={showModal}
                  setShowModal={setShowModal}
                >
                  <FlexBoth style={{ marginBottom: 10 }}>
                    <Text style={{ fontSize: 16, color: "#333" }}>
                      희망 간병비
                    </Text>
                    <NumberFormat
                      value={Math.floor(data.viewAnnouncement.hopeCost * 0.9)}
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
                    onChangeValue={handleCaregiverCost}
                    suffix="원"
                    delimiter=","
                    separator="."
                    precision={0}
                    keyboardType="number-pad"
                    placeholder="본인간병비를 입력해 주세요."
                    placeholderTextColor={"#979797"}
                  />
                  {setValue("code", data.viewAnnouncement.code)}

                  <SubmitBtn text="확인" onPress={handleSubmit(onValid)} />
                </DefaultModal>
              </>
            ) : (
              <SubmitBtn text="이미 지원한 공고입니다." disabled={true} />
            )}
          </Container>
        </DefulatLayout>
      )}
      <ConfirmModal
        title="알림"
        isVisible={isVisible}
        text="본인간병비 입력이 완료되었습니다."
        setIsVisible={setIsVisible}
        navigation={navigation}
        screen={"AnnouncementList"}
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
