import React, { useCallback, useRef } from "react";
import { Clipboard } from "react-native";
import {
  ScrollView,
  Container,
} from "../../../components/history/HistoryStyle";
import Item from "../../../components/history/user/ProgressHistoryItem";
import Toast from "react-native-easy-toast";
import NoneLayout from "../../../components/layout/NoneLayout";
import { useReactiveVar } from "@apollo/client";
import { memberVar } from "../../../apollo";
import { useQuery } from "@apollo/client";
import { ANNOUNCEMENT_LIST_QUERY } from "../../query";

export default function ProgressHistoryUser({ navigation, route }) {
  const toastRef = useRef();
  const showCopyToast = useCallback(() => {
    toastRef.current.show("계좌번호가 복사되었습니다.");
  }, []);
  const copyToClipboard = (text) => {
    Clipboard.setString(text);
    showCopyToast();
  };
  const userInfo = JSON.parse(useReactiveVar(memberVar));
  const { data, loading } = useQuery(ANNOUNCEMENT_LIST_QUERY, {
    fetchPolicy: "network-only",
    variables: {
      userCode: userInfo.code,
    },
    pollInterval: 500,
  });

  return (
    <>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Container>
          {!loading && data?.listAnnouncement?.announcements.length > 0 ? (
            data?.listAnnouncement?.announcements?.map((item, index) => {
              return (
                <Item
                  key={index}
                  item={item}
                  onPress={() =>
                    navigation.navigate("RecruitHome", {
                      code: item.code,
                    })
                  }
                  navigation={navigation}
                  copyToClipboard={copyToClipboard}
                />
              );
            })
          ) : (
            <NoneLayout text="등록된 내용이 없습니다." />
          )}
        </Container>
      </ScrollView>
      <Toast
        ref={toastRef}
        textStyle={{ color: "white" }}
        positionValue={150}
        fadeInDuration={200}
        fadeOutDuration={1000}
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          borderRadius: 99,
          paddingHorizontal: 10,
        }}
      />
    </>
  );
}
