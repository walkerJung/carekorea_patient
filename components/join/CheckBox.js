import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import styled from "styled-components/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { careTheme } from "../../contents";

const CheckBtn = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 17px;
  font-weight: bold;
`;
const Subtit = styled.Text`
  font-size: 15px;
`;

export default function checkbox({
  onToggle,
  status,
  onPress,
  icon,
  title,
  subtit,
}) {
  const [toggle, setToggle] = useState();
  const toggleFunction = () => {
    setToggle(!toggle);
  };

  return (
    <>
      <CheckBtn status={status} onPress={onPress} activeOpacity={0.8}>
        <FontAwesomeIcon
          icon={icon}
          size={24}
          style={[
            styles.checkboxBase,
            status === "checked" && styles.checkboxChecked,
          ]}
        />
        <Title
          style={[styles.title, status === "checked" && styles.checktitle]}
        >
          {title}
        </Title>
        <Subtit
          style={[styles.subtit, status === "checked" && styles.checksubtit]}
        >
          {subtit}
        </Subtit>
      </CheckBtn>
    </>
  );
}
const styles = StyleSheet.create({
  OFF: {},
  ON: {},
  checkboxBase: {
    color: "#B1B1B1",
    marginRight: 10,
  },
  checkboxChecked: {
    color: careTheme.COLORS.PRIMARY,
  },
  title: {
    color: "#4E4E4E",
  },
  checktitle: {
    color: "#212121",
  },
  subtit: {
    color: "#818181",
  },
  checksubtit: {
    color: "#626262",
  },
});
