"use client";

import ThemeButton, {
  ThemeButtonInterface,
} from "@/Components/Buttons/ThemeButton/ThemeButton";
import Container from "@/Components/Container/Container";
import ParticlesBackground, {
  ParticlesProps,
} from "@/Components/ParticlesBackground/ParticlesBackground";
import { theme } from "@/theme/Theme";
import { useState } from "react";

interface ModeThemeInterface {
  btnTheme: ThemeButtonInterface["themeBtn"];
  backgroundTheme: ParticlesProps["backgroundTheme"];
}

const dark: ModeThemeInterface = {
  btnTheme: "darkTheme",
  backgroundTheme: "dark mode",
};

const ligth: ModeThemeInterface = {
  btnTheme: "ligthTheme",
  backgroundTheme: "light mode",
};

export default function Home() {
  const [modeTheme, setModeTheme] = useState<ModeThemeInterface>(dark);

  const handleTheme = () => {
    setModeTheme((prev) => (prev === dark ? ligth : dark));
  };
  return (
    <>
      <ParticlesBackground
        id="particles"
        backgroundTheme={modeTheme.backgroundTheme}
      />

      <Container as="main" height="100%">
        <Container
          as="section"
          widthMax="425px"
          radius
          shadow
          sx={`background-color: rgba(227, 227, 227, 0.2); backdrop-filter: blur(5px); border: 1px solid ${theme.colors.baseWhite}`}
        ></Container>

        <ThemeButton onClick={handleTheme} themeBtn={modeTheme.btnTheme} />
      </Container>
    </>
  );
}
