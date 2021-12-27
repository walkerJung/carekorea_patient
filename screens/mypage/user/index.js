import React from "react";
import DefulatLayout from "../../../components/layout/DefaultLayout";
import {
  Container,
  MypageHeader,
  MypageHeaderTit,
  MypageList,
  Tell,
} from "../../../components/mypage/mypageStyle";
import { useReactiveVar } from "@apollo/client";
import { memberVar } from "../../../apollo";
import { logUserOut } from "../../../apollo";
import { useQuery } from "@apollo/client";
import { USER_DETAIL_QUERY } from "../../query";

export default function MypageUser({ navigation }) {
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
        <DefulatLayout>
          <Container>
            <MypageHeader>
              <MypageHeaderTit>
                {data.viewProfile.userName}님,{"\n"}반갑습니다!
              </MypageHeaderTit>
            </MypageHeader>

            <>
              <MypageList
                title="내 정보 수정"
                onPress={() => navigation.navigate("PatientMypageProfileStack")}
              />
              <MypageList
                title="공지사항"
                onPress={() => navigation.navigate("MainNoticeStack")}
              />
              <MypageList title="로그아웃" onPress={() => logUserOut()} />
            </>

            {/* <Tell title="고객센터" number="1588-0000" /> */}
          </Container>
        </DefulatLayout>
      )}
    </>
  );
}
