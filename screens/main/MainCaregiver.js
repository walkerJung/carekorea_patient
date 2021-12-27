import React from "react";
import { StyleSheet, View, ScrollView, Alert, Image, Text } from "react-native";
import DefaultLayout from "../../components/layout/DefaultLayout";
import SectionLayout from "../../components/layout/SectionLayout";
import {
  MainHedaer,
  MainHedaerTxt,
  MainBanner,
  MainBannerHd,
  BannerBtnBox,
  MainBannerTxt,
  ImgBg,
  Btn,
  BtnTit,
  BtnTxt,
  NotiBox,
  MainTitle,
} from "../../components/main/MainStyle";
import MainButton from "../../components/main/MainButton";
import MainNotice from "./MainNotice";
import MainSwiper from "./MainSwiper";
import logo from "../../assets/img/main_logo.png";
import { useQuery } from "@apollo/client";
import { NOTICE_LIST_QUERY } from "../query";

export default function MainCaregiver({ navigation }) {
  const { data, loading } = useQuery(NOTICE_LIST_QUERY, {
    fetchPolicy: "network-only",
    variables: { take: 4, skip: 0 },
  });
  return (
    <>
      {!loading && (
        <DefaultLayout nestedScrollEnabled={true}>
          <MainHedaer>
            <Image style={{ width: 120 }} resizeMode="contain" source={logo} />
            <MainHedaerTxt>간병인 전용</MainHedaerTxt>
          </MainHedaer>
          <MainBanner>
            <ImgBg
              source={require("../../assets/img/main_banner.png")}
              resizeMode="contain"
            >
              <MainBannerTxt>
                간병 서비스를{"\n"}
                지원해보세요.
              </MainBannerTxt>
            </ImgBg>
            <BannerBtnBox style={styles.shadow}>
              <MainButton
                text="간병 서비스 지원"
                onPress={() => {
                  navigation.navigate("CaregiverApplyStack");
                }}
              />
            </BannerBtnBox>
            <MainBannerHd />
          </MainBanner>

          {/* <SectionLayout lastBox={false}>
            <View
              style={{
                ...styles.shadow,
                backgroundColor: "#fff",
                borderRadius: 8,
              }}
            >
              <Btn
                activeOpacity={0.8}
                onPress={() => Alert.alert("서비스 준비중입니다.")}
              >
                <BtnTit>간병 서비스 신청방법</BtnTit>
                <BtnTxt>앱 사용법을 알려드립니다!</BtnTxt>
              </Btn>
            </View>
          </SectionLayout> */}

          <NotiBox>
            <MainTitle>공지사항</MainTitle>
            <MainNotice data={data} navigation={navigation} />
          </NotiBox>

          <SectionLayout last={false}>
            <MainTitle>케어코리아 홍보영상</MainTitle>
            <MainSwiper />
          </SectionLayout>
        </DefaultLayout>
      )}
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
