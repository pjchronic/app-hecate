"use client";

import Container from "@/Components/Container/Container";
import { theme } from "@/theme/Theme";

export default function Home() {
  return (
    <>
      <Container as="section" sx={`background-color: ${theme.colors.papyrusBase}`}> {/*A página de login deve ser aqui*/}
        Teste
      </Container>
    </>
  );
}
