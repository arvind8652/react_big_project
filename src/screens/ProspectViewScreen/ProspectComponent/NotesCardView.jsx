import { Card, Col, Row, Layout, Space, Typography } from "antd";

// import { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlus } from "@fortawesome/pro-light-svg-icons";
import "./CardView.scss";

const { Content } = Layout;
const { Text, Title } = Typography;

const Note = (props) => {
  const note = props.note;
  return (
    <Card>
      <Space direction="vertical" size="middle">
        <Title level={4}>{note.title && note.title}</Title>
        <Text>{note.description && note.description}</Text>
        <Row>
          <Col span={12}>
            {note.prospects.length !== 0 && (
              <Space size={4}>
                {note.prospects[0].profileImage === null ? (
                  <div
                    style={{
                      width: "35px",
                      height: "35px",
                      background: "#F0F2FB",
                      padding: "10px",
                      borderRadius: "50%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {note.prospects[0].profileInitials}
                  </div>
                ) : (
                  <img
                    src={note.prospects[0].profileImage}
                    className="card-img"
                    style={{ width: "35px" }}
                    alt="user-img"
                  />
                )}{" "}
                {
                  <Space direction="vertical" size={0}>
                    <Text style={{ fontWeight: "600" }}>
                      {note.prospects[0].name}
                    </Text>
                    <Text>{note.prospects[0].category}</Text>
                  </Space>
                }{" "}
                {note.prospects.length > 1 && (
                  <div
                    style={{
                      width: "35px",
                      height: "35px",
                      background: "#F0F2FB",
                      padding: "10px",
                      borderRadius: "50%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    +{note.prospects.length - 1}
                  </div>
                )}
              </Space>
            )}
          </Col>
        </Row>
        <Row>
          <Col span={16} style={{ display: "flex" }}>
            {note.tags.slice(0, 2).map((item, index) => {
              return (
                <Text
                  key={index}
                  className="header-badge"
                  style={{
                    backgroundColor: "#F0F2FB",
                    color: "#354081",
                    padding: "2px 6px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: "2px",
                  }}
                >
                  {item}
                </Text>
              );
            })}
            {note.tags.length > 2 ? (
              <span
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  backgroundColor: "#F0F2FB",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontSize: "12px" }}>
                  +{note.tags.length - 2}
                </Text>
              </span>
            ) : (
              ""
            )}
          </Col>
          <Col span={8}>
            <Space size={2}>
              {note.users.length !== 0 &&
                note.users.slice(0, 2).map((item, index) => {
                  return item.profileImage === null ? (
                    <div
                      title={item.name}
                      key={index}
                      style={{
                        width: "30px",
                        height: "30px",
                        background: "#F0F2FB",
                        padding: "10px",
                        borderRadius: "50%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {item.profileInitials}
                    </div>
                  ) : (
                    <img
                      title={item.name}
                      key={index}
                      src={item.profileImage}
                      alt={item.name}
                      title={item.name}
                      style={{
                        borderRadius: "50%",
                        height: "30px",
                        width: "30px",
                        marginRight: "5px",
                      }}
                    />
                  );
                })}

              {note.users.length > 2 ? (
                <span
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    backgroundColor: "#F0F2FB",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ fontSize: "18px" }}>
                    +{note.users.length - 2}
                  </Text>
                </span>
              ) : (
                ""
              )}
            </Space>
          </Col>
        </Row>
      </Space>
    </Card>
  );
};

const formatNotes = (data) => {
  return data.map((item, index) => {
    return {
      title: item.noteTitle && item.noteTitle,
      description: item.noteDescription && item.noteDescription,
      tags:
        item.noteLabel.length !== 0
          ? item.noteLabel.map((tag) => tag.noteLabel)
          : [],
      users:
        item.notesDetails !== []
          ? item.notesDetails.filter((item) => {
              return item.refType === "USERS";
            })
          : [],
      prospects:
        item.notesDetails !== []
          ? item.notesDetails.map((item) => {
              return {
                name: item.name,
                profileImage: item.profileImage,
                profileInitials: item.profileInitials,
                category: item.category,
              };
            })
          : [],
    };
  });
};

const NotesCardView = (props) => {
  const notes = props.data;
  const formattedNotes = formatNotes(notes);

  // const [attachModalVisible, setAttachModalVisible] = useState(false);

  if (!formattedNotes) {
    return null;
  }

  return (
    <>
      <Card
        bordered={false}
        title="Notes"
        // extra={
        //   <Button
        //     type="text"
        //     style={{ color: "#354081", fontSize: "16px" }}
        //     onClick={() => setAttachModalVisible(true)}
        //   >
        //     Add <FontAwesomeIcon icon={faPlus} style={{ marginLeft: "5px" }} />
        //   </Button>
        // }
        style={{ width: "100%", marginTop: "15px", marginBottom: "15px" }}
        className="prospectCardDetail"
      >
        <Content>
          <Row
            className="notes-row-scroll"
            style={{
              overflowX: "auto",
              width: "100%",
              flexWrap: "nowrap",
            }}
          >
            {formattedNotes.length === 0 ? (
              <Col
                type="flex"
                align="middle"
                span={24}
                className="prospectDescriptionText"
              >
                No Records Found
              </Col>
            ) : (
              formattedNotes.map((note, index) => {
                return (
                  <Col span={8} xxl={6} key={index} style={{ padding: "15px" }}>
                    <Note note={note} />
                  </Col>
                );
              })
            )}
          </Row>
        </Content>
      </Card>
    </>
  );
};

export default NotesCardView;
