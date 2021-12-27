import React from "react";
import { StyleSheet } from "react-native";
import styled from "styled-components/native";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";

const Container = styled.View`
  width: 100%;
  background-color: #fff;
  padding: 20px 0px;
`;
const ModalHeader = styled.View`
  position: relative;
  height: 50px;
  align-items: center;
  justify-content: center;
`;
const ModalHeaderTxt = styled.Text`
  color: #212121;
  font-weight: bold;
  font-size: 16px;
`;
const ModalBody = styled.View``;

const Exit = styled.TouchableOpacity`
  position: absolute;
  right: 0;
  top: 15px;
`;
const ScrollBox = styled.ScrollView`
  height: 95%;
  padding: 20px 5%;
`;
const InnerTxt = styled.Text`
  font-size: 14px;
  color: #333;
  line-height: 22px;
  padding-bottom: 20%;
`;

export default function PrivacyModal({ showModal, setShowModal }) {
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
          <SafeAreaView>
            <Container>
              <ModalHeader>
                <ModalHeaderTxt numberOfLines={1} ellipsizeMode="tail">
                  개인정보 취급방침
                </ModalHeaderTxt>
                <Exit
                  activeOpacity={0.8}
                  onPress={() => {
                    setShowModal();
                  }}
                >
                  <Icon name="close" size={24} color="#333" />
                </Exit>
              </ModalHeader>
              <ModalBody>
                <ScrollBox>
                  <InnerTxt>
                    수집하는 개인정보의 항목{"\n"}
                    {"\n"}
                    케어코리아는 회원가입, 원활한 고객상담, 각종 서비스 등
                    기본적인 서비스 제공을 위한 필수정보와 고객 맞춤 서비스
                    제공을 위한 선택정보로 구분하여 아래와 같은 개인정보를
                    수집하고 있습니다.{"\n"}
                    1) 개인 회원{"\n"}
                    필수항목 : 아이디, 비밀번호, 이름, 연락처, 성별{"\n"}
                    2) 간병인 회원{"\n"}
                    필수항목 : 아이디, 비밀번호, 이름, 연락처, 성별{"\n"}
                    실거주 주소, 주민등록번호, 간병서비스에 필요한 사전 질문 등
                    {"\n"}
                    3) 서비스 이용 과정에서 아래와 같은 정보들이 자동으로
                    생성되어 수집될 수 있습니다.{"\n"}
                    IP Address, 쿠키, 방문 일시, 서비스 이용 기록, 불량 이용
                    기록, 기기정보{"\n"}
                    선택정보를 입력하지 않은 경우에도 서비스 이용 제한은 없으며
                    이용자의 기본적 인권 침해의 우려가 있는 민감한 개인
                    정보(인종, 사상 및 신조, 정치적 성향 이나 범죄기록, 의료정보
                    등)는 기본적으로 수집하지 않습니다. 다만 불가피하게 수집이
                    필요한 경우 반드시 사전에 동의 절차를 거치도록 하겠습니다.
                    개인정보의 수집 • 이용목적{"\n"}
                    {"\n"}
                    케어코리아는 이용자의 소중한 개인정보를 다음과 같은
                    목적으로만 이용하며, 목적이 변경될 경우에는 사전에 이용자의
                    동의를 구하도록 하겠습니다.{"\n"}
                    회원으로 가입한 이용자를 식별하고 가입의사 및 나이 확인,
                    불량회원의 부정한 이용을 방지하기 위하여 사용합니다. 다만
                    만14세 미만 아동의 개인정보는 법령에 따라 법정대리인의 동의
                    여부도 확인하기 위해도 사용됩니다.{"\n"}
                    2. 이용자에게 대안금융의 다양한 서비스를 제공하고 서비스
                    이용 과정에서 이용자의 문의사항이나 불만을 처리하고 공지사항
                    등을 전달하기 위해 사용합니다.{"\n"}
                    3. 이용자와 약속한 서비스를 제공하고 유료 서비스 구매 및
                    이용이 이루어지는 경우 이에 따른 요금 정산을 위해
                    사용됩니다.{"\n"}
                    4. 신규 서비스가 개발되거나 이벤트 행사 시 참여기회를 알리기
                    위한 정보 전달 및 마케팅 및 광고 등에도 사용됩니다.
                    {"\n"}
                    5. 이용자의 서비스 이용 기록과 접속 빈도 분석 및 서비스
                    이용에 대한 통계, 이를 통한 맞춤형 서비스 제공과 서비스
                    개선에도 사용됩니다.{"\n"}
                    {"\n"}
                    개인정보의 보유 • 이용기간{"\n"}
                    {"\n"}
                    우리랑 사회적협동조합는 이용자의 개인정보를 회원가입을 하는
                    시점부터 서비스를 제공하는 기간 동안에만 제한적으로 이용하고
                    있습니다. 이용자가 회원탈퇴를 요청하거나 제공한 개인정보의
                    수집 및 이용에 대한 동의를 철회하는 경우, 또는 수집 및
                    이용목적이 달성되거나 보유 및 이용기간이 종료한 경우 해당
                    이용자의 개인정보는 지체 없이 파기 됩니다.{"\n"}
                    그리고 관계법령의 규정에 따라 아래와 같이 관계 법령에서 정한
                    일정한 기간 동안 회원정보를 보관합니다.{"\n"}
                    1. 서비스 이용 관련 개인정보 (로그인기록)보존 근거 :
                    통신비밀보호법 보존 기간 : 3개월{"\n"}
                    2. 표시/광고에 관한 기록 보존 근거 : 전자상거래 등에서의
                    소비자보호에 관한 법률 보존 기간 : 6개월{"\n"}
                    3. 계약 또는 청약철회 등에 관한 기록 보존 근거 : 전자상거래
                    등에서의 소비자보호에 관한 법률 보존 기간 : 5년
                    {"\n"}
                    4. 대금결제 및 재화 등의 공급에 관한 기록 보존 근거 :
                    전자상거래 등에서의 소비자보호에 관한 법률 보존 기간 : 5년
                    {"\n"}
                    5. 소비 자의 불만 또는 분쟁처리에 관한 기록 보존 근거 :
                    전자상거래 등에서의 소비자보호에 관한 법률 보존 기간 : 3년
                    {"\n"}
                    6. 개인위치정보에 관한 기록 보존 근거 : 위치정보의 보호 및
                    이용 등에 관한 법률 보존 기간 : 6개월{"\n"}
                    7. 전자금융 거래에 관한 기록 보존 근거 : 전자금융거래법 보존
                    기간 : 5년{"\n"}
                  </InnerTxt>
                </ScrollBox>
              </ModalBody>
            </Container>
          </SafeAreaView>
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
