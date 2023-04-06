import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { assets } from "../../../constants/assetPaths";

export const ActionSuccessModalScreen = ({ operationName, selectedRowKeys, closeModal }) => (
    <>
      <div className="modal-body">
        <div className="action-success-screen">
          <img
            src={assets.common.successTick}
            alt="success"
            className="success-logo"
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            { selectedRowKeys.length === 0 ? (
              <div className="title">
                1/1 Successful Action
              </div>
            ) : (
              <div className="title">
                {selectedRowKeys.length}/{selectedRowKeys.length} Successful
                Action
              </div>
            )}
            <div className="subtitle">
              Your action has been completed successfully
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <Button
            className="text-only-btn"
            type="text"
            onClick={() => {
              closeModal(false);
            }}
          >
            Ok
          </Button>
        </div>
      </div>
    </>
  );