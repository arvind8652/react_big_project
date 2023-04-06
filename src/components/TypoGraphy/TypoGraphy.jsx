import { fontSet, palette, theme } from "../../theme";
const TypoGraphy = ({
  children,
  childrenColor,
  label,
  clabel,
  labelWhite,
  labelSize = "medium",
  slabel,
}) => {
  let title = theme.primaryHeader;
  switch (labelSize) {
    case "small":
      title = theme.xSmallHeading; //12px
      break;
    case "medium":
      title = theme.secondaryHeader; //18px
      break;
    case "large":
      title = theme.subPrimaryHeader; //20px
      break;
    case "xlarge":
      title = theme.primaryHeader;
      break;

    default:
      break;
  }
  const styleSet = {
    childrenBlock: {
      ...title,
      color: childrenColor ? childrenColor : "#2C2D33",
    },
    label: {
      fontSize: fontSet.body.large,
      color: palette.text.main,
    },
    clabel: {
      fontSize: fontSet.body.large,
      color: palette.text.success,
    },
    labelWhite: {
      fontSize: fontSet.body.large,
      color: palette.text.banner,
    },
  };
  return (
    <>
      {children && <div style={styleSet.childrenBlock}>{children}</div>}
      {label && <div style={styleSet.label}>{label}</div>}
      {clabel && <div style={styleSet.clabel}>{clabel}</div>}
      {slabel && <div style={theme.profileTag}>{slabel}</div>}
      {labelWhite && <div style={styleSet.labelWhite}>{labelWhite}</div>}
    </>
  );
};
export default TypoGraphy;
