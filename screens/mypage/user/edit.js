import React from "react";
import SectionLayout from "../../../components/layout/SectionLayout";
import { ListGo } from "../../../components/form/ListStyle";
import { useReactiveVar } from "@apollo/client";
import { memberVar } from "../../../apollo";
import { useQuery } from "@apollo/client";
import { USER_DETAIL_QUERY } from "../../query";

export default function EditUser({ navigation }) {
  const userInfo = JSON.parse(useReactiveVar(memberVar));
  const { data, loading } = useQuery(USER_DETAIL_QUERY, {
    fetchPolicy: "network-only",
    variables: {
      code: userInfo.code,
    },
  });
  return (
    <>
      {!loading && (
        <SectionLayout>
          <ListGo
            title="아이디"
            value={data.viewProfile.userId}
            disabled
            error="아이디(ID)는 변경할 수 없습니다."
          />
          <ListGo
            title="이름"
            value={data.viewProfile.userName}
            onPress={() => navigation.navigate("EditNameUser")}
            icon
          />
          <ListGo
            title="연락처"
            value={data.viewProfile.phone}
            onPress={() => navigation.navigate("EditPhoneUser")}
            icon
          />
          <ListGo
            title="비밀번호"
            placeholder="비밀번호 변경"
            value=""
            onPress={() => navigation.navigate("EditPasswordUser")}
            icon
            secureTextEntry
            password
          />
        </SectionLayout>
      )}
    </>
  );
}
