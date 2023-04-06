import React from "react";

export const NoDataFound = ({ name = "" }) => {
  return (
    <div
      style={{
        width: "100%",
        marginTop: "10px",
        marginBottom: "10px",
        textAlign: "center",
      }}
    >
      No {name} Data
    </div>
  );
};
