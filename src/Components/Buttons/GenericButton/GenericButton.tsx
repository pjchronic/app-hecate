"use client";
import { theme, ThemeInterface } from "@/theme/Theme";
import styled from "styled-components";

interface GenericButtonInterface {
  children: React.ReactNode;
  themeMode: ThemeInterface["themeProvider"];
  width?: string;
}

const ignoredProps = ["themeMode", "width"];

const GenericButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !ignoredProps.includes(prop),
})<GenericButtonInterface>`
  border-radius: 4px;
  box-shadow: 0px 5px 6px 2px rgba(0, 0, 0, 0.2);
  background-color: ${(props) =>
    props.themeMode === "dark mode"
      ? theme.colors.baseWhite
      : theme.colors.baseGrafite};
  height: 37px;
  font-size: 1.2rem;
  font-family: ${theme.fonts.contentFont.fontFamily};
  color: ${(props) =>
    props.themeMode === "dark mode"
      ? theme.colors.baseGrafite
      : theme.colors.baseWhite};
  transition: all 0.3s ease-in-out;
  width: ${(props) => props.width ?? "100%"};
  padding: 5px;

  &:hover {
    font-weight: 600;
    background-color: ${theme.colors.papyrusBase};
    transform: scale(1.1);
    color: ${theme.colors.baseGrafite};
  }
`;

export default GenericButton;
