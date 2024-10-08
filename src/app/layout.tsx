import { GlobalStyle } from "@/theme/GlobalStyle";
import { ThemeProvider } from "@/utils/Context/themeContext";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { ServerStyleSheet } from "styled-components";

//#region ----- fonts
const labelAtribute = localFont({
  src: "./fonts/Jaini-Regular.ttf",
  variable: "--label-atribute",
});

const contentInputAtribute = localFont({
  src: "./fonts/Amita-Regular.ttf",
  variable: "--content-input-atribute",
});

const contentFont = localFont({
  src: "./fonts/Jaldi-Regular.ttf",
  variable: "--content-font",
});
//#endregion

export const metadata: Metadata = {
  title: "Hecate App",
  description: "Seu app de gerenciamento de fichas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${labelAtribute.variable} ${contentInputAtribute.variable} ${contentFont.variable}`}
      >
        <ThemeProvider>
          <GlobalStyle />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
