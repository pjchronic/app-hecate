import { theme } from "@/theme/Theme";
import Link from "next/link";
import styled from "styled-components";

interface TextLinksInterface {
  href: string;
  fontSize?: LinkStyleInterface["fontSize"];
  children: React.ReactNode;
  textAlign?: LinkStyleInterface["textAlign"];
}

interface LinkStyleInterface {
  fontSize?: string;
  children: React.ReactNode;
  textAlign?: "left" | "center" | "right";
}

const ignoredProps = ["fontSize", "textAlign"];

const LinkStyle = styled.span.withConfig({
  shouldForwardProp: (prop) => !ignoredProps.includes(prop),
})<LinkStyleInterface>`
  text-decoration: none;
  font-family: ${theme.fonts.contentInputAtribute.fontFamily};
  font-size: ${(props) => props.fontSize};
  color: ${theme.fonts.contentInputAtribute.color};
  width: 100%;
  text-align: ${(props) => props.textAlign ?? "center"};

  &:hover {
    text-decoration: underline;
  }
`;

const TextLinks: React.FC<TextLinksInterface> = ({
  href,
  fontSize,
  textAlign = "center",
  children,
}) => {
  return (
    <>
      <Link href={href}>
        <LinkStyle fontSize={fontSize} textAlign={textAlign}>
          {children}
        </LinkStyle>
      </Link>
    </>
  );
};

export default TextLinks;
