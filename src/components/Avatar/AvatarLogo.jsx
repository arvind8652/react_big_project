import React from "react";
import { Avatar } from "antd";

const AvatarLogo = ({
  imgsrc,
  profileName,
  avatarSize = "80",
  avatarOption,
}) => {

  const styleset = {
    avatar: {
      color:
        avatarOption && avatarOption.color ? avatarOption.color : "#f56a00",
      backgroundColor:
        avatarOption && avatarOption.backgroundColor
          ? avatarOption.backgroundColor
          : "#fde3cf",
    },
  };

  return (
    <>
      {imgsrc ? (
        <Avatar
          size={
            avatarOption && avatarOption.size ? avatarOption.size : avatarSize
          }
          style={styleset.avatar}
          icon={<img src={`data:image/jpeg;base64,${imgsrc}`} alt="" />}
        />
      ) : (
        <Avatar size={avatarSize} style={{ color: "#f56a00", backgroundColor: "#E5EBFF" }}>{profileName}</Avatar>
      )}
    </>
  );
};

export default AvatarLogo;
