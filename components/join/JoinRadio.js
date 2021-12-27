import React, { useState } from "react";
import styled from "styled-components/native";
import { careTheme } from "../../contents";

const RadioBox = styled.View`
  flex-direction: row;
  margin: 0 -5px;
`;
const RadioButton = styled.View`
  width: ${(props) => (props.lineover ? "50%" : "33.333%")};
  padding: 0 5px;
`;

const RadioButtonView = styled.TouchableOpacity`
  background-color: ${(props) => (props.selected ? "#fff" : "#F5F5F5")};
  border-color: ${(props) =>
    props.selected ? careTheme.COLORS.PRIMARY : careTheme.COLORS.BORDER_COLOR};
  border-width: 1px;
  height: 56px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
`;

const RadioButtonTxt = styled.Text`
  text-align: center;
  font-size: 15px;
  color: ${(props) =>
    props.selected ? careTheme.COLORS.PRIMARY : careTheme.COLORS.DISABLED_TXT};
`;

const JoinRadio = ({
  options,
  lineover,
  setValue,
  defaultValue,
  fieldName,
}) => {
  const [selected, setSelected] = useState(
    defaultValue !== undefined ? defaultValue : 1
  );

  const onChangeHandle = (key) => {
    setSelected(key);
    setValue(fieldName, key, true);
  };

  return (
    <>
      <RadioBox>
        {options.map((item) => (
          <RadioButton key={item.key} lineover={lineover}>
            <RadioButtonView
              activeOpacity={0.7}
              selected={selected === item.key}
              key={item.key}
              onPress={() => onChangeHandle(item.key)}
            >
              <RadioButtonTxt selected={selected === item.key}>
                {item.text}
              </RadioButtonTxt>
            </RadioButtonView>
          </RadioButton>
        ))}
      </RadioBox>
    </>
  );
};

export default JoinRadio;
