import React, { useRef } from "react";
import WriteLayout from "../../../components/layout/WriteLayout";
import {
  FormBox,
  FormLabelBox,
  FormLabel,
  FormInput,
} from "../../../components/join/JoinStyle";
import { SubmitBtn } from "../../../components/form/CareFormStyle";
import { Text } from "react-native";
import { FlexBoth } from "../../../components/form/ListStyle";
import SectionLayout from "../../../components/layout/SectionLayout";

export default function EditRRNnumberCaregiver() {
  return (
    <WriteLayout>
      <SectionLayout>
        <FormBox>
          <FormLabelBox>
            <FormLabel>주민등록번호 변경</FormLabel>
          </FormLabelBox>

          <FormBox style={{ marginBottom: 0 }}>
            <FlexBoth style={{ alignItems: "center" }}>
              <FormInput
                placeholder="앞 번호 6자리"
                placeholderTextColor={"#979797"}
                keyboardType="numeric"
                returnKeyType="next"
                maxLength={6}
                style={{ flex: 1, marginRight: 5 }}
              />
              <Text>-</Text>
              <FormInput
                placeholder="뒷 번호 7자리"
                placeholderTextColor={"#979797"}
                keyboardType="numeric"
                returnKeyType="next"
                secureTextEntry
                maxLength={7}
                style={{ flex: 1, marginLeft: 5 }}
              />
            </FlexBoth>
          </FormBox>
        </FormBox>

        <SubmitBtn text="수정하기" onPress={() => Alert.alert("수정하기")} />
      </SectionLayout>
    </WriteLayout>
  );
}
