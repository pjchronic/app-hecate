import React from "react";
import styled from "styled-components";

interface ContainerInterface {
  as?: keyof JSX.IntrinsicElements;
  sx?: string;
  width?: string;
  radius?: boolean;
  children?: React.ReactNode;
}

const Container = styled.div.withConfig({ //width pode ser definido apenas pela prop
  shouldForwardProp: (prop) => prop !== "sx",
})<ContainerInterface>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.width ?? "100%"} !important; 
  padding: 2rem;
  gap: 2rem;
  border-radius: ${(props) => props.radius ? "4px" : "none"};
  ${(props) => props.sx}
`;

export default Container;
