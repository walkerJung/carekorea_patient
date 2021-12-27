import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { careTheme } from "..";

const TabButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  height: 40px;
  margin: 0px 16px;
`;

const TabText = styled.Text`
  font-weight: 400;
  font-size: 16px;
  color: ${(props) => (props.isFocused ? careTheme.COLORS.PRIMARY : "#979797")};
`;

export default function TabAni({
  isFocused,
  label,
  onPress,
  setToValue,
  setWidth,
}) {
  const [layout, setLayout] = useState(null);
  useEffect(() => {
    if (isFocused && layout) {
      setToValue(layout.x);
      setWidth(layout.width);
    }
  }, [isFocused, layout, setToValue, setWidth]);

  const onLayout = (e) => {
    const { x, width } = e.nativeEvent.layout;
    setLayout({ x, width });
  };

  return (
    <TabButton
      isFocused={isFocused}
      onPress={onPress}
      onLayout={onLayout}
      activeOpacity={0.8}
    >
      <TabText isFocused={isFocused}>{label}</TabText>
    </TabButton>
  );
}
