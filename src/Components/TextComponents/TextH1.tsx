"use client"
import { theme } from "@/theme/Theme";
import React from "react";
import styled from "styled-components";


interface TextH1Interface {
    children: React.ReactNode;
    fontSize: string;

}

const TextH1 = styled.h1<TextH1Interface>`
    font-family: ${theme.fonts.labelAtribute.fontFamily};
    font-size: ${(props) => props.fontSize};
    color: ${theme.fonts.labelAtribute.color};
`

export default TextH1;
