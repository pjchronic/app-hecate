import { theme } from "@/theme/theme";
import { Hr } from "@react-email/components";

const HrTemplateMail = () => {
  const hrStyle = {
    border: `1.3px solid ${theme.colors.greyBase}`,
    width: "100%",
    margin: "5px",
  };
  return (
    <>
      <Hr style={hrStyle} />
    </>
  );
};

export default HrTemplateMail;
