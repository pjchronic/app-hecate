"use client"
import { createGlobalStyle } from "styled-components";
import { theme } from "./Theme";

export const GlobalStyle = createGlobalStyle`
 * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }

  ol, ul {
    list-style: none;
  }

  html, body {
    height: 100%;
    line-height: 1.5;
  }

  body {
    font-family: ${theme.fonts.contentFont.fontFamily}, Arial, sans-serif;
    color: ${theme.fonts.contentFont.color};
    background-color: ${theme.colors.baseWhite};
    max-width: 100vw;
    overflow-x: hidden;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    text-decoration: none;
    color: inherit;
    cursor: pointer;
  }

   button {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
  }

  input, button, textarea, select {
    font: inherit;
  }
`;
