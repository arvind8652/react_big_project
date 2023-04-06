import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import GenericCard from "../../components/GenericCard/GenericCard";
import { notes } from "./constant";
import { Row, Col, Avatar } from "antd";
import GenericBadge from "../../components/GenericBadge/GenericBadge";
import GenericButton from "../../components/GenericButton/GenericButton";
import { theme } from "../../theme";
import { AvatarSize } from "../../constants/AvatarSize";
import AvatarLogo from "../../components/Avatar/AvatarLogo";
import SmallUserDetail from "./SmallUserDetail";

const defaultNotesList = [
  {
    id: 0,
    title: "Jack Doe’s Retirement Plan",
    postBody:
      "Lorem ipsum dolor sit amet.Et asperiores nisi et omnis natus in sint ipsam 33 asperiores deleniti At perspiciatis odio. Qui aperiam architecto qui accusamus dolorum",
    userName: "Chris Ramos",
    category: "Prospect",
    tags: ["Wealth", "Accounts", "Roles", "Amount"],
    following: [
      {
        id: 0,
        image: "",
        name: "Chris",
      },
      {
        id: 1,
        image: "",
        name: "Chris",
      },
      {
        id: 2,
        image: "",
        name: "Chris",
      },
      {
        id: 3,
        image: "",
        name: "Chris",
      },
    ],
  },
  {
    id: 1,
    title: "Jack Doe’s Retirement Plan",
    postBody:
      "Lorem ipsum dolor sit amet.Et asperiores nisi et omnis natus in sint ipsam 33 asperiores deleniti At perspiciatis odio. Qui aperiam architecto qui accusamus dolorum",
    userName: "Chris Ramos",
    category: "Prospect",
    tags: ["Wealth", "Accounts", "Roles", "Amount"],
    following: [
      {
        id: 0,
        image: "",
        name: "Chris",
      },
      {
        id: 1,
        image: "",
        name: "Chris",
      },
      {
        id: 2,
        image: "",
        name: "Chris",
      },
      {
        id: 3,
        image: "",
        name: "Chris",
      },
    ],
  },
];



const NotesCard = ({ allNotesData, notesData }) => {
  const [notesList, setNotesList] = useState( defaultNotesList);
  useEffect(() => {
    const apiData = notesData?.map((item) => {
      return {
        id: item.id,
        title: item.title,
        postBody: item.description,
        userName: item.noteDetails[0].name,
        category: item.noteDetails[0].tagName,
        tags: item.noteLabel,
        following: [
          {
            id: 0,
            image: "",
            name: "Chris",
          },
          {
            id: 1,
            image: "",
            name: "Chris",
          },
          {
            id: 2,
            image: "",
            name: "Chris",
          },
          {
            id: 3,
            image: "",
            name: "Chris",
          },
        ],
      };
    });
  
    setNotesList(apiData);
  }, [notesData]);

  const styleSet = {
    rowStyle: {
      //  margin: "24px 5px",
      paddingBottom: "22px",
      borderBottom: "1px solid black",
    },
    userInfo: {
      margin: "31px 0px",
    },
    postBody: {
      maxHeight: "96px",
      height: "96px",
    },
  };


  return (
    <>
      <GenericCard
        header={notes}
        menuFlag={1}
        buttonTitle={" Add"}
        viewAll={true}
      >
        {notesList?.slice(0, 2).map((item) => (
          <>
            <div style={styleSet.rowStyle}>
              <Row>
                <Col span={24} style={theme.headerM}>
                  <span style={theme.primaryHeader}>{item.title}</span>
                </Col>
              </Row>
              <Row>
                <Col span={24} style={theme.secondaryBody}>
                  <div style={styleSet.postBody}>{item.postBody}</div>
                </Col>
              </Row>
              <div style={styleSet.userInfo}>
                <SmallUserDetail name={item.userName} role={item.category} />
              </div>
              <Row>
                <Col span={12} style={theme.dFlex}>
                  {item?.tags?.length > 0 && (
                    <>
                      <GenericBadge badgeBody={item.tags[0]}></GenericBadge>
                      <GenericBadge badgeBody={item.tags[1]}></GenericBadge>
                      <GenericBadge
                        badgeBody={`+${item?.tags?.length}`}
                      ></GenericBadge>
                    </>
                  )}
                </Col>
                <Col span={12} style={{ textAlign: "right" }}>
                  <AvatarLogo
                    imgsrc={""}
                    profileName={"image"}
                    avatarSize={AvatarSize.xs}
                  />
                  {/* <Avatar size={32}>image</Avatar> */}
                  <AvatarLogo
                    imgsrc={""}
                    profileName={"image"}
                    avatarSize={AvatarSize.xs}
                  />
                  {/* <Avatar size={32}>image</Avatar> */}
                  <AvatarLogo
                    imgsrc={""}
                    profileName={`+${item.tags.length}`}
                    avatarSize={AvatarSize.xs}
                  />
                  {/* <Avatar size={32}>{`+${item.tags.length}`}</Avatar> */}
                </Col>
              </Row>
            </div>
          </>
        ))}
      </GenericCard>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    notesData: state.crmHome.notes,
  };
};
export default connect(mapStateToProps)(NotesCard);
