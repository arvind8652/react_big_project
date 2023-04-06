import { Row, Radio } from "antd";
import { useEffect, useState } from "react";

import "./PlottingAttributeSelector.scss";

const PlottingMultiAttributeSelector = ({
  controlStructure = [],
  callBack = () => {
  },
}) => {
  const [tabValue, setTabValue] = useState("");

  useEffect(() => {
    if (controlStructure && controlStructure.length)
      setTabValue(controlStructure[0].dataValue);
  }, [controlStructure]);
  const changeTabPosition = (e) => {
    setTabValue(e.target.value);
  };

  useEffect(() => {
    if (tabValue && tabValue.length) callBack(tabValue);
  }, [tabValue]);

  const filterArray = [
    {
      dataValue: "Individual",
      displayValue: "Individual",
    },
    {
      dataValue: "Institution",
      displayValue: "Institution",
    },
    {
      dataValue: "Alternate",
      displayValue: "Alternate",
    },
    {
      dataValue: "Cash",
      displayValue: "Cash",
    },
  ];
  return (
    <Row style={{ width: "100%" }}>
      <Radio.Group
        value={tabValue}
        buttonStyle="solid"
        onChange={changeTabPosition}
      >
        {controlStructure.map((ele) => {
          return (
            <Radio.Button style={{ marginRight: "5px" }} value={ele.dataValue}>
              {ele.displayValue}
            </Radio.Button>
          );
        })}
        <Radio.Button style={{ marginRight: "5px" }} value="Cash">
          Cash
        </Radio.Button>
      </Radio.Group>
    </Row>
  );
};

export default PlottingMultiAttributeSelector;
