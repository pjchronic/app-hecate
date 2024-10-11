import { theme } from "@/theme/Theme";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
    to {
    transform: rotate(1turn);
  }
`;

const LoadingComponentStyled = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 20px solid ${theme.colors.baseGrafite};
  border-top-color: ${theme.colors.papyrusBase};
  animation: ${spin} 1s infinite;
`;

const BackgroundLoading = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoadingComponent = () => {
  return (
    <>
      <BackgroundLoading>
        <LoadingComponentStyled />
      </BackgroundLoading>
    </>
  );
};

export default LoadingComponent;
