import { useTheme } from "@/utils/Context/themeContext";
import styled from "styled-components";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useEffect, useState } from "react";
import { theme, ThemeInterface } from "@/theme/Theme";


//#region ---- Interfaces

export interface GenericAlertInterface {
  msg: string;
  open: boolean;
}

interface AlertContainerInterface {
  appear: boolean;
  background: string;
  children: React.ReactNode;
}

interface ContainerBtnInterface {
  themeBack: ThemeInterface["themeProvider"];
}

//#region ------ Styled Components

const ignoredProps = { inputContainer: ["appear", "background", "themeBack"] };

const AlertContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !ignoredProps.inputContainer.includes(prop),
})<AlertContainerInterface>`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  max-width: 600px;
  gap: 1.5rem;
  transition: all 0.3s ease-in-out;
  background-color: ${(props) => props.background};
  transform: ${(props) =>
    props.appear ? "translateX(-50%) scale(1)" : "translateX(-50%) scale(0)"};
  transform-origin: center;

  top: 3%;
  left: 50%;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;

const ContainerBtn = styled.div.withConfig({
  shouldForwardProp: (prop) => !ignoredProps.inputContainer.includes(prop),
})<ContainerBtnInterface>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: ${(props) =>
    props.themeBack === "dark mode"
      ? theme.colors.baseGrafite
      : theme.colors.baseWhite};
  cursor: pointer;

  &:hover {
    background-color: ${(props) =>
      props.themeBack === "dark mode"
        ? theme.colors.baseWhite
        : theme.colors.baseGrafite};
  }
`;

const GenericAlert: React.FC<GenericAlertInterface> = ({ msg, open }) => {
  const { themeProvider } = useTheme();
  const [hiddenOrExposed, setHiddenOrExposed] = useState<boolean>(false);
  const [renderAlert, setRenderAlert] = useState<boolean>(false);

  const setThemeBackground = (): string => {
    let color: string = "";

    switch (themeProvider) {
      case "dark mode":
        color = "rgba(227, 227, 227, 0.5)";
        break;

      case "light mode":
        color = "rgba(184, 184, 182, 0.9)";
        break;
    }

    return color;
  };

  const handleCloseAlert = () => {
    setHiddenOrExposed(false);
    setRenderAlert(false);
  };

  const handleOpenAlert = () => {
    setRenderAlert(true);
    setTimeout(() => {
      setHiddenOrExposed(true);
    }, 500);
  };

  useEffect(() => {
    const handleAppear = () => {
      handleOpenAlert();

      setTimeout(() => {
        handleCloseAlert();
      }, 7000);
    };

    if (msg) {
      handleAppear();
    }
  }, [open]);

  return (
    <>
      {renderAlert ? (
        <AlertContainer
          background={setThemeBackground()}
          appear={hiddenOrExposed}
        >
          <span
            style={{
              fontFamily: theme.fonts.contentFont.fontFamily,
              fontSize: "1.3rem",
            }}
          >
            {msg}
          </span>
          <ContainerBtn themeBack={themeProvider} onClick={handleCloseAlert}>
            <CloseRoundedIcon />
          </ContainerBtn>
        </AlertContainer>
      ) : (
        ""
      )}
    </>
  );
};

export default GenericAlert;


//#region ------- instuções de uso

    // Ao importar componente, é necessário um use state:
    // EX: 
            /*
            const [customAlert, setCustomAlert] = useState<GenericAlertInterface>({
                msg: "",
                open: false,
            }); 
            */

    // E também uma função para administrar os estados:
    // EX: 

/*     const handleAlert = (msg: string, open: boolean) => {
        setCustomAlert({
          msg,
          open,
        });
    
        setTimeout(() => {
          setCustomAlert({ ...customAlert, open: false });
        }, 10000);
      }; */
