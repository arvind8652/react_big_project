import React from "react";

// custom imports
import UploadPhoto from "./UploadPhoto";
import Attachments from "../Forms/CustomerAttachmentsFormCard/CustomerAttachmentsFormCard";

const UploadByFormat = ({ uploadFormat = "image", ...rest }) => {
  if (uploadFormat === "image") return <UploadPhoto {...rest} />;
  else if (uploadFormat === "attachments") return <Attachments {...rest} />;
  else return null;
};

export default UploadByFormat;
