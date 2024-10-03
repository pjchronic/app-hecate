import { theme } from "@/theme/theme";
import { Html, Body, Container } from "@react-email/components";
import React from "react";

interface BaseTemplateProps {
  children: React.ReactNode;
}

const BaseTemplate: React.FC<BaseTemplateProps> = ({ children }) => {
  const baseBackgroundStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.greyBase,
  };

  const bodyMailStyle = {
    maxWidth: "600px",
    backgroundColor: theme.colors.papyrusBase,
    borderRadius: "4px",
    padding: "2rem",
    margin: "2rem auto",
    overflow: "hidden",
  };

  return (
    <Html lang="pt-br">
      <Body style={baseBackgroundStyle}>
        <Container style={bodyMailStyle}>{children}</Container>
      </Body>
    </Html>
  );
};

export default BaseTemplate;
