"use client";
import ThemeButton, {
  ThemeButtonInterface,
} from "@/Components/Buttons/ThemeButton/ThemeButton";
import Container from "@/Components/Container/Container";
import ParticlesBackground, {
  ParticlesProps,
} from "@/Components/ParticlesBackground/ParticlesBackground";
import { useTheme } from "@/utils/Context/themeContext";
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
  const { toggleTheme } = useTheme();
  const [modeTheme, setModeTheme] = useState<ModeThemeInterface>(dark); //aplicar isso no contexto

  const handleTheme = () => {
    setModeTheme((prev) => (prev === dark ? ligth : dark));
    toggleTheme();
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
