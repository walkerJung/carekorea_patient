import React from "react";
import {
  Complete,
  CompleteTit,
  CompleteTxt,
  SubmitBtn,
} from "../../../components/form/CareFormStyle";
import { Image } from "react-native";
import logo from "../../../assets/img/main_logo.png";

export default function ApplyCompleteUser({ navigation }) {
  return (
    <Complete>
      <Image
        style={{ width: 180, height: 70, marginBottom: 10 }}
        resizeMode="contain"
        source={logo}
      />
      <CompleteTit>간병비 산출 신청이{"\n"}완료되었습니다.</CompleteTit>
      <CompleteTxt>
        관리자가 신청하신 간병서비스를 확인 후{"\n"}예상되는 간병비를
        알려드리겠습니다.
      </CompleteTxt>

      <SubmitBtn
        text="확인"
        onPress={() => navigation.navigate("PatientMainScreen")}
      />
    </Complete>
  );
}
