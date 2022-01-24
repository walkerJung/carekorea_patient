import React from "react";
import { View, Platform, Text } from "react-native";
import { WebView } from "react-native-webview";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/Ionicons";
import { careTheme } from "../../contents";
import { SubmitBtn } from "../../components/form/CareFormStyle";

const Container = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  padding-left: 15px;
  padding-right: 15px;
`;
const NoneView = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 1px;
  height: 1px;
  opacity: 0;
`;
export default function PdfView({ navigation }) {
  return (
    <>
      <View style={{ flex: 1 }}>
        {Platform.OS === "ios" ? (
          <WebView
            source={{
              uri: "http://api.care-korea.kr/files/template/carekorea_patient.pdf",
            }}
          />
        ) : (
          <Container>
            <NoneView>
              <WebView
                source={{
                  uri: "http://api.care-korea.kr/files/template/carekorea_patient.pdf",
                }}
              />
            </NoneView>
            <Icon
              name="download-outline"
              size={78}
              color={careTheme.COLORS.PRIMARY}
            />
            <Text
              style={{
                fontSize: 20,
                textAlign: "center",
                lineHeight: 28,
                color: "#333",
                marginTop: 20,
                marginBottom: 20,
              }}
            >
              케어코리아 환자메뉴얼{"\n"}파일이{" "}
              <Text style={{ fontWeight: "bold" }}>다운로드</Text> 되었습니다.
            </Text>
            <SubmitBtn
              text="홈으로"
              onPress={() => navigation.navigate("PatientMainScreen")}
            />
          </Container>
        )}
      </View>
    </>
  );
}
