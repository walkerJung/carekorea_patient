import React, { useState, useCallback, useRef } from "react";
import {
  View,
  Text,
  RefreshControl,
  Alert,
  Clipboard,
  TouchableHighlight,
} from "react-native";
import {
  ScrollView,
  Container,
} from "../../../components/history/HistoryStyle";
import Item from "../../../components/list/ApplyListItem";
import Toast from "react-native-easy-toast";
import NoneLayout from "../../../components/layout/NoneLayout";
import DefulatLayout from "../../../components/layout/DefaultLayout";
import { useQuery } from "@apollo/client";
import { ANNOUNCEMENT_LIST_QUERY } from "../../query";

export default function ApplyListCaregiver({ navigation }) {
  const wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };
  const toastRef = useRef();
  const showCopyToast = useCallback(() => {
    toastRef.current.show("계좌번호가 복사되었습니다.");
  }, []);
  const copyToClipboard = (text) => {
    Clipboard.setString(text);
    showCopyToast();
  };
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);

  const { data, loading } = useQuery(ANNOUNCEMENT_LIST_QUERY, {
    fetchPolicy: "network-only",
    variables: {
      status: 3,
    },
    pollInterval: 500,
  });
  return (
    <>
      <DefulatLayout
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Container>
          <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 20 }}>
            간병인에{"\n"}지원해주세요!
          </Text>
          {!loading && data?.listAnnouncement?.announcements.length > 0 ? (
            data?.listAnnouncement?.announcements?.map((item, index) => {
              return (
                <Item
                  key={index}
                  item={item}
                  onPress={() =>
                    navigation.navigate("AnnouncementView", {
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
      </DefulatLayout>
    </>
  );
}
