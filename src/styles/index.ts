import styled from "styled-components";

import { TFlexProps } from "@/types/styles";

export const Flex = styled.div<TFlexProps>`
  display: flex;
  flex-direction: ${(props) => props.direction || "row"};
  justify-content: ${(props) => props.justify || "flex-start"};
  align-items: ${(props) => props.align || "stretch"};
  flex-wrap: ${(props) => props.wrap || "nowrap"};
  gap: ${(props) => props.gap || "0px"};
`;

export const CardContainer = styled.div`
  padding: 16px;
  border-radius: 4px;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
`;
