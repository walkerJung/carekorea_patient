import React, { useState } from "react";
import { Modal, Alert } from "react-native";
import YoutubePlayer, { getYoutubeMeta } from "react-native-youtube-iframe";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/Ionicons";

const ModalBody = styled.View`
  flex: 1;
  justify-content: center;
  padding: 0 5%;
  background-color: rgba(0, 0, 0, 0.9);
`;
const VideoBox = styled.View`
  position: relative;
`;
const VideoCover = styled.View`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 99999;
`;
const VideoAfter = styled.View`
  padding-top: 56.25%;
`;
const ModalCloseBox = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  margin-bottom: 15px;
`;
const ModalCloseBtn = styled.TouchableOpacity`
  width: 32px;
  height: 32px;
  border-radius: 50px;
  background-color: #fff;
  justify-content: center;
  align-items: center;
`;

// 아래 설명은 여기 url (https://lonelycpp.github.io/react-native-youtube-iframe/module-methods)
// getYoutubeMeta("rDspejh_yo8").then((meta) => {
//   Alert.alert(meta.thumbnail_url);
// }); 썸네일 url 가져오기

export default function Youtube({ modalVisible, toggleModal }) {
  const [playing, setPlaying] = useState(false);

  return (
    <Modal
      animationType={"fade"}
      visible={modalVisible}
      transparent={true}
      style={{ backgroundColor: "red" }}
    >
      <ModalBody>
        <ModalCloseBox>
          <ModalCloseBtn onPress={toggleModal} activeOpacity={0.8}>
            <Icon name="close-outline" size={24} color="#111" />
          </ModalCloseBtn>
        </ModalCloseBox>
        <VideoBox>
          <VideoCover>
            <YoutubePlayer
              height={"100%"}
              play={playing}
              videoId={"ovdcWUT9544"}
              volume={100}
            />
          </VideoCover>
          <VideoAfter />
        </VideoBox>
      </ModalBody>
    </Modal>
  );
}
