import React, { useEffect, useState } from "react";
import { Button } from "antd";
import "./warningModal.scss";
import { assets } from "../../constants/assetPaths";

const WarningModal = ({ message }) => (
  <div className="modal-body">
    <div>
      <img
        src={assets.common.triangleExclamation}
        alt="warning"
        className="warning-logo"
      />
    </div>
    <div className="warning-title">{message}</div>
  </div>
);
export default WarningModal;
