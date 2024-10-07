"use client"

import Container from "@/Components/Container/Container";
import { theme } from "@/theme/Theme";


export default function Login() {

    return(
        <>
        <Container
          as="section"
          widthMax="425px"
          radius
          shadow
          sx={`background-color: rgba(227, 227, 227, 0.2); backdrop-filter: blur(5px); border: 1px solid ${theme.colors.baseWhite}`}
        ></Container>
        </>

    );
}
