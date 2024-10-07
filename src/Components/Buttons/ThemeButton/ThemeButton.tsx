"use client";
import { theme } from "@/theme/Theme";
import Brightness5OutlinedIcon from "@mui/icons-material/Brightness5Outlined";
import NightsStayOutlinedIcon from "@mui/icons-material/NightsStayOutlined";
import { useEffect, useState } from "react";
import styled from "styled-components";

const darkTheme = {
  iconColor: theme.colors.baseGrafite,
  iconColorHover: theme.colors.baseGrafite,
  background: theme.colors.baseWhite,
  icon: <Brightness5OutlinedIcon sx={{ fontSize: "2rem" }} />,
};

const ligthTheme = {
  iconColor: theme.colors.baseWhite,
  iconColorHover: theme.colors.baseGrafite,
  background: theme.colors.baseGrafite,
  icon: <NightsStayOutlinedIcon sx={{ fontSize: "2rem" }} />,
};

interface ContainerBtnInterface {
  color: string;
  backgroundColor: string;
  colorHv: string;
}

export interface ThemeButtonInterface {
  onClick: React.MouseEventHandler<HTMLDivElement>;
  themeBtn: "darkTheme" | "ligthTheme";
}

const ignoredProps = ["colorHv", "backgroundColor"];

const ContainerBtn = styled.div.withConfig({
  shouldForwardProp: (prop) => !ignoredProps.includes(prop),
})<ContainerBtnInterface>`
  position: absolute;
  border-radius: 4px;
  box-shadow: 0px 5px 6px 2px rgba(0, 0, 0, 0.2);
  width: 52px;
  height: 52px;
  bottom: 5%;
  right: 2%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.color};
  background-color: ${(props) => props.backgroundColor};
  transition: all 0.4s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: scale(1.2);
    color: ${(props) => props.colorHv};
    background-color: ${theme.colors.papyrusBase};
  }
`;
const ThemeButton: React.FC<ThemeButtonInterface> = ({ onClick, themeBtn }) => {
  const [ThemeBtn, setThemeBtn] = useState(darkTheme);

  useEffect(() => {
    switch (themeBtn) {
      case "darkTheme":
        setThemeBtn(darkTheme);
        break;

      case "ligthTheme":
        setThemeBtn(ligthTheme);
        break;
    }
  }, [themeBtn]);

  return (
    <ContainerBtn
      color={ThemeBtn.iconColor}
      backgroundColor={ThemeBtn.background}
      colorHv={ThemeBtn.iconColorHover}
      onClick={onClick}
    >
      {ThemeBtn.icon}
    </ContainerBtn>
  );
};

export default ThemeButton;
