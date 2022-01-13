import React from "react";
import { Text, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/Ionicons";

const ModalHeader = styled.View`
  background-color: #333;
  justify-content: space-between;
  align-items: center;
  padding-left: 15px;
  flex-direction: row;
  height: 56px;
`;
const ModalClose = styled.TouchableOpacity`
  height: 56px;
  width: 56px;
  justify-content: center;
  align-items: center;
`;
const ModalBody = styled.View``;
export default function AddressModal({ isVisible, children, onPress }) {
  return (
    <Modal isVisible={isVisible}>
      <SafeAreaView style={{ flex: 1 }}>
        <ModalHeader>
          <Text style={{ color: "#fff", fontSize: 21 }}>주소찾기</Text>
          <ModalClose onPress={onPress}>
            <Icon
              name="close"
              size={28}
              style={{
                color: "#fff",
              }}
            />
          </ModalClose>
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
      </SafeAreaView>
    </Modal>
  );
}
