import React, { useState } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import styled from "styled-components/native";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/Ionicons";
const ModalBackground = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  justify-content: center;
  padding: 0 5%;
`;
const Container = styled.View`
  width: 100%;
  background-color: #fff;
  padding: 20px 15px;
  border-radius: 20px;
`;
const ModalHeader = styled.View`
  position: relative;
  height: 50px;
`;
const ModalBody = styled.View``;

const Exit = styled.TouchableOpacity`
  position: absolute;
  right: 0;
  top: 0;
`;

export default function DefaultModal({
  showModal,
  setShowModal,
  children,
  title,
}) {
  return (
    <>
      {showModal ? (
        <Modal
          style={styles.modal}
          animationType={"fade"}
          transparent={true}
          visible={showModal}
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
                    paddingHorizontal: 30,
                  }}
                >
                  {title}
                </Text>
                <Exit
                  activeOpacity={0.8}
                  onPress={() => {
                    setShowModal();
                  }}
                >
                  <Icon name="close" size={24} color="#333" />
                </Exit>
              </ModalHeader>
              <ModalBody>{children}</ModalBody>
            </Container>
          </ModalBackground>
        </Modal>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
});
