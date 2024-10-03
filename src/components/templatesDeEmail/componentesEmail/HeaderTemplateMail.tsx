import { Column, Img, Link, Row, Text } from "@react-email/components";
import React, { ReactElement } from "react";

interface HeaderTemplateMailInterface {
  iconLink?: string;
  imgIconLink: string;
  titleHeader: string;
}

const HeaderTemplateMail = ({
  iconLink,
  imgIconLink,
  titleHeader,
}: HeaderTemplateMailInterface): ReactElement => {
  const titleHeaderStyle = {
    fontFamily: "Times New Roman",
    fontWeight: "600px",
    fontSize: "48px",
    color: "#000",
    maxWidth: "450px",
    textDecoration: "underline",
    lineHeight: "48px",
  };
  return (
    <>
      <Row cellPadding={"1rem"}>
        <Column align="center">
          {iconLink ? (
            <Link href={iconLink}>
              <Img src={imgIconLink} width="64px" height="64px" />
            </Link>
          ) : (
            <Img src={imgIconLink} width="64px" height="64px" />
          )}
        </Column>
        <Column align="center">
          <Text style={titleHeaderStyle}>{titleHeader}</Text>
        </Column>
      </Row>


    </>
  );
};

export default HeaderTemplateMail;
