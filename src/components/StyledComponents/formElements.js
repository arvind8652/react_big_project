import { DatePicker, Input, InputNumber, Radio, Select } from "antd";
import styled, { css } from "styled-components";

export const ScDatePicker = styled(DatePicker)`
  width: 100%;
  height: 42px;
  background: #f6f7fb;
  border: 1px solid #cbd6ff;
  box-sizing: border-box;
  border-radius: 4px;
`;

export const ScRangePicker = styled(DatePicker.RangePicker)`
  width: 100%;
  height: 42px;
  background: #f6f7fb;
  border: 1px solid #cbd6ff;
  box-sizing: border-box;
  border-radius: 4px;
`;

export const ScInput = styled(Input)`
  width: 100%;
  height: 42px;
  background: #f6f7fb;
  border: 1px solid #cbd6ff;
  box-sizing: border-box;
  border-radius: 4px;
  input {
    height: 42px;
    background: #f6f7fb;
    border: 1px solid #cbd6ff;
  }
  input::-webkit-inner-spin-button,
  input::-webkit-outer-spin-button {
    // background-color: #f6f7fb;
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const ScInputNumber = styled(InputNumber)`
  width: 100%;
  height: 42px;
  display: flex;
  align-items: center;
  background: #f6f7fb;
  border: 1px solid #cbd6ff;
  box-sizing: border-box;
  border-radius: 4px;
`;

export const ScRadioGroup = styled(Radio.Group)`
  width: 100%;
  height: 42px !important;
`;
export const ScRadioButton = styled(Radio.Button)`
  width: 50%;
  height: 42px !important;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1.25vw !important;
  color: #354081 !important;
  border-radius: 4px !important;
  background: #f6f7fb !important;

  ${(props) =>
    props.active &&
    css`
      background: #354081 !important;
      box-shadow: -2px 0px 6px rgba(53, 64, 129, 0.25);
      color: #ffffff !important;
    `}
`;

export const ScSelect = styled(Select)`
  .ant-select-selector {
    display: flex;
    align-items: center;
    min-width: 72px;
    height: 42px !important;
    background: #f6f7fb !important;
    border: 1px solid #cbd6ff !important;
    box-sizing: border-box !important;
    border-radius: 4px !important;
  }
`;

export const ScTextArea = styled(Input.TextArea)`
  background: #f6f7fb;
  border: 1px solid #cbd6ff;
  box-sizing: border-box;
  border-radius: 4px;
`;
