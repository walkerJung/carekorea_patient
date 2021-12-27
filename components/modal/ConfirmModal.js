import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import styled from "styled-components/native";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/Ionicons";
import { SubmitBtn } from "../form/CareFormStyle";

const ModalBackground = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  justify-content: center;
  padding: 0 5%;
`;
const Container = styled.View`
  width: 100%;
  background-color: #fff;
  border-radius: 20px;
`;
const ModalHeader = styled.View`
  position: relative;
  padding: 15px 20px;
  background-color: #fff;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  border-bottom-width: 1px;
  border-color: #ddd;
`;
const ModalBody = styled.View`
  padding: 20px;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
`;
const ModalBodyTxt = styled.Text`
  font-size: 16px;
  color: #333;
  text-align: center;
`;
const Exit = styled.TouchableOpacity`
  position: absolute;
  right: 15px;
  top: 12px;
`;
export default function ConfirmModal({
  showModal,
  setShowModal,
  children,
  title,
  text,
  isVisible,
  setIsVisible,
  navigation,
  screen,
}) {
  return (
    <>
      <Modal
        style={styles.modal}
        animationType={"fade"}
        transparent={true}
        isVisible={isVisible}
        onRequestClose={() => {
          setShowModal(!showModal);
        }}
      >
        <ModalBackground>
          <Container>
            <ModalHeader>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  fontWeight: "bold",
                  paddingHorizontal: 20,
                }}
              >
                {title}
              </Text>
              <Exit
                activeOpacity={0.8}
                onPress={() => {
                  navigation.navigate(screen);
                  setIsVisible(false);
                }}
              >
                <Icon name="close" size={24} color="#333" />
              </Exit>
            </ModalHeader>
            <ModalBody>
              <ModalBodyTxt>{text}</ModalBodyTxt>
              <View style={{ marginBottom: 20 }}>{children}</View>
              <SubmitBtn
                small
                text="확인"
                onPress={() => {
                  navigation.navigate(screen);
                  setIsVisible(false);
                }}
              />
            </ModalBody>
          </Container>
        </ModalBackground>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
});
