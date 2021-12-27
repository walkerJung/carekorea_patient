import React from "react";
import { MainNotiItem, MainNotiTitle } from "../../components/form/ListStyle";

const MainNotice = (props) => {
  return (
    <>
      {props?.data?.listNotice?.notices?.map((item, index) => {
        return (
          <MainNotiItem
            activeOpacity={0.8}
            onPress={() => {
              props?.navigation.navigate("MainNoticeStack");
            }}
            key={index}
          >
            <MainNotiTitle numberOfLines={1} ellipsizeMode="tail">
              {item.title}
            </MainNotiTitle>
          </MainNotiItem>
        );
      })}
    </>
  );
};

export default MainNotice;
