// import React, { useState } from "react";
import { Text } from "react-native";
import styled from 'styled-components';

export default function AboutScreen({ navigation }) {

  return (
    <>
      <FirstView>
        <Logo source={require("../../assets/images/adaptive-icon.png")} />
        <Text>Welcome to the about screen !</Text>
      </FirstView>
    </>
  );
}

const FirstView = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  padding-top: 150px;
  `;

const Logo = styled.Image`
  margin-bottom: 20px;
  width: 200px;
  height: 200px;
`;