interface FontAtribute {
  fontFamily: string;
  color: string;
}

export interface ThemeInterface {
  fonts: {
    labelAtribute: FontAtribute;
    contentInputAtribute: FontAtribute;
    contentFont: FontAtribute;
  };
  colors: {
    baseGrafite: string;
    baseWhite: string;
    papyrusBase: string;
    greyBase: string;
  };
  themeProvider?: "dark mode" | "light mode";
}

export const theme: ThemeInterface = {
  fonts: {
    labelAtribute: {
      fontFamily: "var(--label-atribute)",
      color: "#000",
    },
    contentInputAtribute: {
      fontFamily: "var(--content-input-atribute)",
      color: "#000",
    },
    contentFont: {
      fontFamily: "var(--content-font)",
      color: "#000",
    },
  },
  colors: {
    baseGrafite: "#444444",
    baseWhite: "#E3E3E3",
    papyrusBase: "#F6F3DE",
    greyBase: "#B8B8B6",
  },
};
