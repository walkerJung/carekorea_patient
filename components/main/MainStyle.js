import styled from "styled-components/native";
import { careTheme } from "../../contents";

export const MainHedaer = styled.View`
  height: 50px;
  border-bottom-width: 1px;
  border-color: #eee;
  align-items: center;
  flex-direction: row;
  background-color: #fff;
  padding: 0 5%;
  justify-content: space-between;
`;
export const MainHedaerTxt = styled.Text`
  font-size: 13px;
  color: #979797;
`;
export const MainBanner = styled.View`
  position: relative;
  width: 100%;
`;
export const MainBannerHd = styled.View`
  padding-top: 66%;
`;
export const MainBannerTxt = styled.Text`
  font-size: 21px;
  font-weight: bold;
  line-height: 31px;
  margin-top: -40px;
  text-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
`;
export const BannerBtnBox = styled.View`
  position: absolute;
  width: 90%;
  left: 5%;
  bottom: 15px;
  z-index: 999;
`;
export const ImgBg = styled.ImageBackground`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 15px 5%;
  justify-content: center;
`;
export const WelcomBox = styled.View`
  padding-top: 30px;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;
`;
export const Welcom = styled.Text`
  font-size: 22px;
  font-weight: 700;
`;

export const MainHeaerBox = styled.View`
  overflow: visible;
  margin-top: 12px;
  background-color: ${careTheme.COLORS.PRIMARY};
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
`;
export const MainHeaerTxt = styled.Text`
  font-size: 24px;
  color: #fff;
  font-weight: 700;
  line-height: 36px;
  text-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  margin-top: 30px;
  margin-bottom: 20px;
`;
export const Btn = styled.TouchableOpacity`
  height: 84px;
  width: 100%;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
`;
export const BtnTit = styled.Text`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  color: ${careTheme.COLORS.PRIMARY};
`;
export const BtnTxt = styled.Text`
  font-size: 16px;
  font-weight: 300;
  text-align: center;
  color: #111;
`;
export const Tit = styled.Text`
  font-weight: bold;
`;

export const NotiBox = styled.View`
  background-color: #fff;
  padding: 20px 5% 10px;
  margin-bottom: 10px;
`;

export const MainTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
`;
