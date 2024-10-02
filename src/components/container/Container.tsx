import React from "react";
import styled, { css } from "styled-components";

interface ContainerInterface {
  tag?: keyof JSX.IntrinsicElements;
  styles?: ReturnType<typeof css>;
  width?: string;
  children?: React.ReactNode;
}

const Container = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "styles",
})<ContainerInterface>`
  display: flex;
  align-itens: center;
  justify-content: center;
  width: ${(props) => props.width || "100%"};
  padding: 2rem;
  gap: 2rem;
  border-radius: 4px;
  ${(props) => props.styles}
`;

export default Container;
