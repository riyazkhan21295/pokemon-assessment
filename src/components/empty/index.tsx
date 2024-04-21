import React from "react";
import styled from "styled-components";

import { Flex } from "@/styles";

type TProps = {
  icon?: any;
  text: string;
};

export default function Empty({ icon, text }: TProps) {
  return (
    <Container direction="column" gap="16px" justify="center" align="center">
      <span>{text}</span>
    </Container>
  );
}

const Container = styled(Flex)`
  background-color: #fff;
  border-radius: 4px;

  min-height: 200px;
  width: 100%;
`;
