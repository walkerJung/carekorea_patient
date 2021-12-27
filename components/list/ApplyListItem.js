import React, { useState } from "react";
import { StyleSheet, Text, Clipboard } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import DefaultModal from "../modal/DefaultModal";
import {
  Card,
  CardHead,
  CardHeadTit,
  GoViewBtn,
  List,
  ListTitBox,
  ListTit,
  ListTxt,
  Days,
} from "../../components/history/HistoryStyle";
import NumberFormat from "react-number-format";
import { careTheme } from "../../contents";

export default function Item({ onPress, item, copyToClipboard }) {
  // 모달
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

  const nightsAndDays =
    (new Date(item.endDate).getTime() - new Date(item.startDate).getTime()) /
    (1000 * 60 * 60 * 24);
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
            <Text>{ChoiceItemStyle[item.status].statusText}</Text>
            {item.hopeCost && (
              <>
                {"\n"}
                <NumberFormat
                  value={Math.floor(item.hopeCost * 0.9)}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={"원"}
                  renderText={(formattedValue) => (
                    <Text>{"(희망 간병비: " + formattedValue + ")"}</Text>
                  )}
                />
              </>
            )}
          </CardHeadTit>
          <GoViewBtn text="공고보기" onPress={onPress} />
        </CardHead>

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
      </Card>
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
});
