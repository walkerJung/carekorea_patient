import React, { useState, useEffect } from "react";
import { FlatList, Alert } from "react-native";
import { NotiBox, NotiDate, NotiTitle } from "../../components/form/ListStyle";
import NotiLayout from "../../components/layout/NotiLayout";
import { useQuery } from "@apollo/client";
import { NOTICE_LIST_QUERY } from "../query";
import moment from "moment";

export default function NoticeList({ navigation }) {
  const { data, loading } = useQuery(NOTICE_LIST_QUERY, {
    fetchPolicy: "network-only",
  });
  const renderNoti = ({ item, index }) => {
    const createdAt = moment(parseInt(item.createdAt)).format("YYYY-MM-DD");
    if (index === 0) {
      return (
        <NotiBox
          style={{ borderTopWidth: 1 }}
          activeOpacity={0.7}
          onPress={() =>
            navigation.navigate("NoticeView", {
              code: item.code,
            })
          }
          key={index}
        >
          <NotiTitle numberOfLines={1} ellipsizeMode="tail">
            {item.title}
          </NotiTitle>
          <NotiDate>{createdAt}</NotiDate>
        </NotiBox>
      );
    } else {
      return (
        <NotiBox
          activeOpacity={0.7}
          onPress={() =>
            navigation.navigate("NoticeView", {
              code: item.code,
            })
          }
          key={index}
        >
          <NotiTitle numberOfLines={1} ellipsizeMode="tail">
            {item.title}
          </NotiTitle>
          <NotiDate>{createdAt}</NotiDate>
        </NotiBox>
      );
    }
  };

  return (
    <>
      {!loading && (
        <NotiLayout>
          <FlatList
            data={data?.listNotice?.notices}
            renderItem={renderNoti}
            keyExtractor={(item) => item.id}
          />
        </NotiLayout>
      )}
    </>
  );
}
