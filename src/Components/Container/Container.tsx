"use client"
import React from "react";
import styled from "styled-components";

interface ContainerInterface {
  as?: keyof JSX.IntrinsicElements;
  sx?: string;
  width?: string;
  radius?: boolean;
  shadow?: boolean;
  widthMax?: string;
  height?: string;
  children?: React.ReactNode;
}

const ignoredProps = ["sx", "widthMax", "radius", "height", "shadow"];

const Container = styled.div.withConfig({
  shouldForwardProp: (prop) => !ignoredProps.includes(prop),
})<ContainerInterface>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => (props.widthMax ? "none" : props.width ?? "100%")};
  max-width: ${(props) => (props.widthMax ? props.widthMax : "none")};
  padding: 2rem;
  gap: 2rem;
  box-shadow: ${(props) =>
    props.shadow ? "0px 5px 6px 2px rgba(0, 0, 0, 0.2)" : "none"};
  border-radius: ${(props) => (props.radius ? "4px" : "none")};
  height: ${(props) => props.height ?? "auto"};
  ${(props) => props.sx}
`;

export default Container;

//#region ------- instuções de uso

// Props:
// as - define o container a ser utilizado (Ex: div, section, header, main);
// sx - estilização css livre (Ex: background-color: #fff);
// width - definie tamanho customizado se necessário valor padrão é 100% (Ex: 600px);
// maxWidth - caso definido desabilita o uso de width;
// radius - caso declarada, implementa bordas arredondadas;
// shadow - caso declarada, implementa shadow-box;
// height - define altura quando necessário;

//#endregion
