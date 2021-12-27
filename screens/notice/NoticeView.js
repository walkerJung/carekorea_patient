import React from "react";
import { Text, View } from "react-native";
import {
  NotiContainer,
  NotiViewHeader,
  NotiViewHeaderTit,
  NotiViewHeaderDate,
  NotiViewBody,
} from "../../components/form/ListStyle";
import NotiLayout from "../../components/layout/NotiLayout";
import { useQuery } from "@apollo/client";
import { NOTICE_DETAIL_QUERY } from "../query";
import moment from "moment";

export default function NoticeView({ route }) {
  const { code } = route.params;
  const { data, loading } = useQuery(NOTICE_DETAIL_QUERY, {
    variables: {
      code,
    },
    fetchPolicy: "network-only",
  });

  return (
    <>
      {!loading && (
        <NotiLayout>
          <NotiContainer>
            <NotiViewHeader>
              <NotiViewHeaderTit>{data?.viewNotice?.title}</NotiViewHeaderTit>
              <NotiViewHeaderDate>
                {moment(parseInt(data?.viewNotice?.createdAt)).format(
                  "YYYY-MM-DD"
                )}
              </NotiViewHeaderDate>
            </NotiViewHeader>
            <NotiViewBody>
              <Text>{data?.viewNotice?.content}</Text>
            </NotiViewBody>
          </NotiContainer>
        </NotiLayout>
      )}
    </>
  );
}
