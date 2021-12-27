import React, { useRef, useCallback, useState } from "react";
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
import { FormInput, SubmitBtn } from "../../form/CareFormStyle";
import Fontawesome from "react-native-vector-icons/FontAwesome5";
import NumberFormat from "react-number-format";
import { careTheme } from "../../../contents";
import { useReactiveVar } from "@apollo/client";
import { memberVar } from "../../../apollo";

export default function Item({ item, copyToClipboard, navigation }) {
  const applicationCaregiverCount = item.announcement.announcementApplication
    ? item.announcement.announcementApplication.length
    : 0;
  const ChoiceItemStyle = {
    3: {
      statusColor: { color: "#20CF05" },
      statusText: `간병인 모집중 (${applicationCaregiverCount}명)`,
      careChoice: true,
    },
    4: {
      statusColor: { color: careTheme.COLORS.ERROR },
      statusText: "입금 대기중",
      complete: true,
    },
    5: {
      statusColor: { color: "#5e66ff" },
      statusText: "입금 및 매칭 완료",
      complete: true,
    },
  };
  const userInfo = JSON.parse(useReactiveVar(memberVar));

  const nightsAndDays =
    (new Date(item.announcement.endDate).getTime() -
      new Date(item.announcement.startDate).getTime()) /
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
        {!item.announcement.confirmCaregiverCode && (
          <CardHead>
            <CardHeadTit
              style={ChoiceItemStyle[item.announcement.status].statusColor}
            >
              {ChoiceItemStyle[item.announcement.status].statusText}
            </CardHeadTit>
          </CardHead>
        )}

        {item.announcement.confirmCaregiverCode &&
          userInfo.code == item.announcement.confirmCaregiverCode &&
          item.announcement.status === 4 && (
            <CardHead>
              <CardHeadTit style={ChoiceItemStyle[4].statusColor}>
                {ChoiceItemStyle[4].statusText}
              </CardHeadTit>
            </CardHead>
          )}

        {item.announcement.confirmCaregiverCode &&
          userInfo.code == item.announcement.confirmCaregiverCode &&
          item.announcement.status === 5 && (
            <CardHead>
              <CardHeadTit style={ChoiceItemStyle[5].statusColor}>
                {ChoiceItemStyle[5].statusText}
              </CardHeadTit>
            </CardHead>
          )}

        <List>
          <ListTitBox>
            <ListTit>
              <Fontawesome name="coins" size={14} color="#979797" /> 간병비
            </ListTit>
          </ListTitBox>
          <ListTxtColor>
            <NumberFormat
              value={Math.floor(item.announcement.hopeCost * 0.9)}
              displayType={"text"}
              thousandSeparator={true}
              suffix={"원"}
              renderText={(formattedValue) => <Price>{formattedValue}</Price>}
            />
          </ListTxtColor>
        </List>

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
            {item.announcement.startDate} ~ {item.announcement.endDate}
          </ListTxt>
        </List>

        <List>
          <ListTitBox>
            <ListTit>
              <Icon name="person-outline" size={14} color="#979797" /> 환자 성함
            </ListTit>
          </ListTitBox>
          <ListTxt>{item.announcement.patientName}</ListTxt>
        </List>

        <List last>
          <ListTitBox>
            <ListTit>
              <Icon name="location-outline" size={14} color="#979797" /> 간병
              주소
            </ListTit>
          </ListTitBox>
          <ListTxt>
            {item.announcement.address} {item.announcement.addressDetail}
          </ListTxt>
        </List>
        {item.announcement.confirmCaregiverCode &&
          userInfo.code == item.announcement.confirmCaregiverCode && (
            <SubmitBtn
              small
              text="공고보기"
              onPress={() => {
                navigation.navigate("AnnouncementView", {
                  code: item.announcement.code,
                });
              }}
            />
          )}
        {!item.announcement.confirmCaregiverCode && (
          <SubmitBtn
            small
            text="공고보기"
            onPress={() => {
              navigation.navigate("AnnouncementView", {
                code: item.announcement.code,
              });
            }}
          />
        )}
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
