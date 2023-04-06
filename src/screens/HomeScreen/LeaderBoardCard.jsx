import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import GenericCard from "../../components/GenericCard/GenericCard";
import GenericBadge from "../../components/GenericBadge/GenericBadge";

import { Row, Col } from "antd";
import { leaderBoard } from "./constant";
import { palette, fontSet, theme } from "../../theme";
import AvatarLogo from "../../components/Avatar/AvatarLogo";
import { AvatarSize } from "../../constants/AvatarSize";
import RupeeOrNonRupee from "../../components/RupeeOrNonRupee/RupeeOrNonRupee";

const LeaderBoardCard = ({
  allUserInfoData,
  selectedType = "Monthly",
  leaderBoardCSObj,
}) => {
  const defaultData = [
    {
      id: 0,
      type: "AUM",
      rank: 5,
      totalAmount: "950,000",
      name: "Chris Ramdos",
      role: "Relationship Manager",
      address: "New York City Area",
      color: palette.primary.heavy,
      currency: "$",
    },
    {
      id: 1,
      type: "Revenue",
      rank: 2,
      totalAmount: "950,000",
      name: "Chris Ramdos",
      role: "Relationship Manager",
      address: "New York City Area",
      color: palette.primary.main,
      currency: "$",
    },
    {
      id: 2,
      type: "Convertion",
      rank: 2,
      totalAmount: "950,000",
      name: "Chris Ramdos",
      role: "Relationship Manager",
      address: "New York City Area",
      color: palette.primary.light,
      currency: "$",
    },
  ];

  const menuList = leaderBoardCSObj?.dropDownValue.map((item, index) => {
    return {
      id: index,
      menuName: item.dataValue,
    };
  });

  const [cardData, setCardData] = useState(defaultData);
  const [periodWiseData, setPeriodWiseData] = useState();

  const groupBy = (items, key) => {
    return items.reduce(
      (result, item) => ({
        ...result,
        [item[key]]: [...(result[item[key]] || []), item],
      }),
      {}
    );
  };

  useEffect(() => {
    setPeriodWiseData(
      allUserInfoData?.leaderBoard &&
        groupBy(allUserInfoData?.leaderBoard, "period")
    );
  }, [allUserInfoData?.leaderBoard]);

  useEffect(() => {
    let currentType = {};

    switch (selectedType) {
      case "Monthly":
        currentType = periodWiseData?.Month?.map((item, index) => {
          return {
            id: index,
            type: item.businessType,
            rank: item.rank,
            totalAmount: item.userTotalValue,
            name: item.userName,
            role: item.user_Group,
            address: item.address,
            color: palette.primary.light,
            currency: item.currencySymbol,
          };
        });
        break;
      case "Quarterly":
        currentType = periodWiseData?.Quarter?.map((item, index) => {
          return {
            id: index,
            type: item.businessType,
            rank: item.rank,
            totalAmount: item.userTotalValue ? item.userTotalValue : "900",
            name: item.userName,
            role: item.user_Group,
            address: item.address,
            color: palette.primary.light,
            currency: item.currencySymbol,
          };
        });
        break;
      case "Yearly":
        currentType = periodWiseData?.Year?.map((item, index) => {
          return {
            id: index,
            type: item.businessType,
            rank: item.rank,
            totalAmount: item.userTotalValue ? item.userTotalValue : "900",
            name: item.userName,
            role: item.user_Group,
            address: item.address,
            color: palette.primary.light,
            currency: item.currencySymbol,
          };
        });
        break;
      default:
        break;
    }
    setCardData(currentType);
  }, [selectedType, periodWiseData]);

  // useEffect(() => {
  // }, [apiData]);

  const styleSet = {
    amountBlock: {
      fontSize: fontSet.heading.large,
    },
    rowStyle: {
      margin: "36px 0px",
    },
    avatarBody: {
      lineHeight: "12px",
      margin: "30px 10px",
    },
    rowAlign: {
      margin: "9px 0px",
    },
  };

  const getNumberWithOrdinal = (n) => {
    var s = ["th", "st", "nd", "rd"],
      v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };

  const CardRow = () => {
    return (
      <>
        {cardData?.map((item) => (
          <Row style={styleSet.rowStyle}>
            <Col span={16}>
              <Row>
                <Col span={8}>
                  <AvatarLogo
                    imgsrc={""}
                    profileName={
                      <div style={styleSet.avatarBody}>
                        <span style={theme.xSmallBody}>Top</span>
                        <br />
                        <span style={theme.xSmallHeading}>{item.type}</span>
                      </div>
                    }
                    avatarSize={AvatarSize.medium}
                    style={{ backgroundColor: item.color }}
                  />
                </Col>
                <Col span={16}>
                  <div style={styleSet.rowAlign}>
                    <div style={theme.secondaryHeader}>{item.name}</div>
                    <div style={theme.tertiaryBody}>{item.role}</div>
                    <div style={theme.smallBody}>{item.address}</div>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col span={8}>
              <Row style={styleSet.rowAlign}>
                <Col span={24}>
                  <Row style={styleSet.amountBlock}>
                    <Col>
                      {item.currency} <RupeeOrNonRupee amount={item.totalAmount} />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <GenericBadge
                        badgeBody={`${getNumberWithOrdinal(item.rank)} in ${
                          item.type
                        }`}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        ))}
      </>
    );
  };
  return (
    <>
      <div>
        <GenericCard
          header={leaderBoard}
          menuFlag={2}
          menuList={menuList}
          dropdownKey={"leaderBoardType"}
        >
          <CardRow />
        </GenericCard>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    allUserInfoData: state.crmHome.userInfo?.userInfo,
    selectedType: state.common.dropdownKeys?.leaderBoardType,
    leaderBoardCSObj:
      state.crmHome.controlStructure?.csList[0]?.controlStructureField[1],
  };
};
export default connect(mapStateToProps)(LeaderBoardCard);
