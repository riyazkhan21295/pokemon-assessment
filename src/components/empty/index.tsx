import React from "react";
import styled from "styled-components";

import { Flex } from "@/styles";

type IProps = {
  icon?: any;
  text: string;
};

export default function Empty({ icon, text }: IProps) {
  return (
    <Container direction="column" gap="16px" justify="center" align="center">
      <Text>{text}</Text>
    </Container>
  );
}

const Container = styled(Flex)`
  background-color: #fff;
  border-radius: 0.25rem;

  min-height: 200px;
  width: 100%;
`;

const Text = styled.span``;
