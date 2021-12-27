import React from "react";
import { Text, View, StyleSheet, ImageBackground } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { careTheme } from "../../contents";

const slides = [
  {
    key: "1",
    title: "나만의 전문 간병인, ",
    bold: "매칭",
    text: "질병별로 맞춤화된\n전문 간병인을 찾아보세요!",
    image: require("../../assets/img/intro01.png"),
  },
  {
    key: "2",
    title: "손쉽게 찾아주는 간병, ",
    bold: "서비스",
    text: "개인 간병 또는 공동 간병\n간병이 필요한 환자와 매칭!",
    image: require("../../assets/img/intro02.png"),
  },
];

function Intro({ navigation }) {
  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <ImageBackground
          source={item.image}
          resizeMode="cover"
          style={styles.image}
        >
          <View style={styles.textBox}>
            <Text style={styles.title}>
              {item.title}
              <Text style={styles.bold}>{item.bold}</Text>
            </Text>
            <Text style={styles.text}>{item.text}</Text>
          </View>
        </ImageBackground>
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
  image: {
    flex: 1,
    paddingHorizontal: "5%",
    justifyContent: "flex-end",
  },
  textBox: {
    paddingTop: "20%",
    paddingBottom: "25%",
  },
  title: {
    color: "#fff",
    fontSize: 22,
    // textAlign: "center",
  },
  bold: {
    fontWeight: "bold",
    marginLeft: 5,
    fontSize: 28,
  },
  text: {
    marginTop: 15,
    color: "#fff",
    lineHeight: 24,
    // textAlign: "center",
    fontSize: 16,
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
