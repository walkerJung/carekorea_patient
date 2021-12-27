import React, { useState } from "react";
import {
  FormBox,
  FormLabelBox,
  FormLabel,
  FormInput,
} from "../../components/join/JoinStyle";
import { Alert } from "react-native";
import { SubmitBtn } from "../../components/form/CareFormStyle";
import WriteLayout from "../../components/layout/WriteLayout";
import { useQuery } from "@apollo/client";
import { FIND_ID_QUERY } from "../query";
import SectionLayout from "../../components/layout/SectionLayout";

export default function IdFind() {
  const [phone, setPhone] = useState();
  const { data, loading } = useQuery(FIND_ID_QUERY, {
    fetchPolicy: "network-only",
    variables: {
      phone,
    },
  });
  return (
    <WriteLayout>
      <SectionLayout>
        <FormBox>
          <FormLabelBox>
            <FormLabel>핸드폰 번호</FormLabel>
          </FormLabelBox>
          <FormInput
            value={phone}
            placeholder="핸드폰 번호를 입력해주세요."
            onChangeText={(text) => {
              setPhone(text);
            }}
          />
        </FormBox>

        <SubmitBtn
          text="아이디 찾기"
          onPress={() => {
            !loading && data
              ? Alert.alert(
                  "회원님의 아이디는 " + data.findUserId.userId + " 입니다."
                )
              : Alert.alert(
                  "입력하신 번호와 일치하는 회원정보가 없습니다. 핸드폰 번호를 확인해주세요."
                );
          }}
        />
      </SectionLayout>
    </WriteLayout>
  );
}
