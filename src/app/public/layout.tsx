"use client";
import ThemeButton, {
  ThemeButtonInterface,
} from "@/Components/Buttons/ThemeButton/ThemeButton";
import Container from "@/Components/Container/Container";
import ParticlesBackground, {
  ParticlesProps,
} from "@/Components/ParticlesBackground/ParticlesBackground";
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

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
        {children}
        <ThemeButton onClick={handleTheme} themeBtn={modeTheme.btnTheme} />
      </Container>
    </>
  );
}
