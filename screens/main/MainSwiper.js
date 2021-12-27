import React, { useState, useCallback, useRef } from "react";
import {
  Button,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  Modal,
  Pressable,
} from "react-native";

import BitSwiper from "react-native-bit-swiper";
import Icon from "react-native-vector-icons/Ionicons";
import { careTheme } from "../../contents";
import Youtube from "./Youtube";

export default function AutoplayExample() {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("비디오 재생을 완료했습니다.");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  const Images = [
    require(`../../assets/img/video_cover.png`),
    // require(`../../assets/img/hq720.jpg`),
    // require(`../../assets/img/video_cover.png`),
  ];

  return (
    <>
      <BitSwiper
        items={["1"]}
        inactiveItemOffset={-10}
        paginateDotStyle={{
          backgroundColor: "rgba(0, 0, 0, .2)",
          width: 8,
          height: 8,
          borderRadius: 5,
          marginHorizontal: 3,
          display: "none",
        }}
        paginateActiveDotStyle={{
          backgroundColor: careTheme.COLORS.PRIMARY,
          width: 8,
          height: 8,
          borderRadius: 5,
          marginHorizontal: 3,
          display: "none",
        }}
        onItemRender={(item, index) => (
          <TouchableOpacity
            key={index}
            style={{ ...styles.videoBtn }}
            activeOpacity={1}
            onPress={() => toggleModal()}
          >
            <Image
              source={Images[index]}
              style={{
                ...styles.videoImg,
                aspectRatio: 0.5625,
                resizeMode: "cover",
              }}
            />
            <View style={{ ...styles.videoAfter }}></View>
            <View style={styles.videoCover}>
              <Icon name="play" size={28} color="#fff" />
            </View>
          </TouchableOpacity>
        )}
      />
      <Youtube modalVisible={modalVisible} toggleModal={toggleModal} />
    </>
  );
}

const styles = StyleSheet.create({
  videoBtn: { position: "relative", borderRadius: 8, overflow: "hidden" },
  videoAfter: {
    paddingTop: "56.25%",
  },
  videoImg: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  videoCover: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "red",
  },
  modalView: {
    margin: 20,
    backgroundColor: "red",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
