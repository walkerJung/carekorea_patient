import React, { useState } from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { careTheme } from "../../contents";

const slides = [
  {
    key: "1",
    title: "나만의 전문 간병인, ",
    bold: "매칭",
    text: "질병별로 맞춤화된\n전문 간병인을 찾아보세요!",
    image: require("../../assets/img/intro.png"),
  },
  {
    key: "2",
    title: "손쉽게 찾아주는 간병, ",
    bold: "서비스",
    text: "개인 간병 또는 공동 간병\n간병이 필요한 환자와 매칭!",
    image: require("../../assets/img/intro.png"),
  },
];

function Intro({ navigation }) {
  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={item.image}
          style={{
            marginBottom: 30,
            resizeMode: "contain",
            height: 237,
            width: 237,
          }}
        />
        <Text style={styles.title}>
          {item.title}
          <Text style={styles.bold}>{item.bold}</Text>
        </Text>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };
  const onDone = () => {
    navigation.navigate("LoginScreen");
  };

  const NextButton = () => {
    return (
      <View style={[styles.nextBtn]} activeOpacity={0.7}>
        <Text style={[styles.nextBtnTxt]}>다음</Text>
      </View>
    );
  };

  const DoneButton = () => {
    return (
      <View style={[styles.doneBtn]} activeOpacity={0.7}>
        <Text style={[styles.doneBtnTxt]}>시작하기</Text>
      </View>
    );
  };
  return (
    <AppIntroSlider
      activeDotStyle={{
        width: 58,
        height: 6,
        borderRadius: 0,
        backgroundColor: careTheme.COLORS.PRIMARY,
        marginLeft: -5,
      }}
      dotStyle={{
        width: 58,
        height: 6,
        backgroundColor: "#E8E8E8",
        borderRadius: 0,
        marginLeft: -5,
      }}
      renderItem={renderItem}
      data={slides}
      renderNextButton={NextButton}
      renderDoneButton={DoneButton}
      onDone={onDone}
      bottomButton={true}
    />
  );
}

export default Intro;

const styles = StyleSheet.create({
  title: {
    color: "#333",
    fontSize: 22,
    textAlign: "center",
  },
  bold: {
    fontWeight: "bold",
    marginLeft: 5,
  },
  text: {
    marginTop: 15,
    color: "#8D8D8D",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "200",
    marginBottom: 50,
  },
  nextBtn: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 56,
    borderRadius: 8,
    backgroundColor: "#DEDEDE",
    marginTop: 5,
  },
  nextBtnTxt: {
    color: "#767676",
    fontSize: 18,
  },
  doneBtn: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 56,
    borderRadius: 8,
    backgroundColor: careTheme.COLORS.PRIMARY,
    marginTop: 5,
  },
  doneBtnTxt: {
    color: "#fff",
    fontSize: 18,
  },
});
