import React from "react";
import styled from "styled-components/native";

const Section = styled.View`
  background-color: #fff;
  padding: ${(props) => (props.last ? "30px 5% 10px" : "30px 5%")};
  border-bottom-color: #ddd;
  margin-bottom: ${(props) => (props.last ? "0" : "10px")};
`;

export default function SectionLayout({ children, last }) {
  return <Section last={last}>{children}</Section>;
}
