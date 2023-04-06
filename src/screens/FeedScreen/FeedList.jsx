import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Row, Col } from "antd";
import TopBarHeader from "../../components/TopBarHeader/TopBarHeader";
import CustomModalWithCloseIcon from "../../components/Modal/CustomModalWithCloseIcon/CustomModalWithCloseIcon";

import Feed from "../../components/Feed/Feed";
import { executeGetTopFeedData } from "../../redux/actions/crmHomeActions";
import FeedFilter from "../../components/Feed/FeedFilter";
const FeedList = ({ allTopFeedData }) => {
  const feedsList = [
    {
      id: 0,
      image: "",
      feedTitle: allTopFeedData?.title
        ? allTopFeedData.title
        : "What does the mark look like ahead of festival season?",
      feedBody: allTopFeedData?.description
        ? allTopFeedData.description
        : "Lorem ipsum dolor sit amet. Et asperiores nisi et omnis natus in sint ipsam`Lorem ipsum dolor sit amet. Et asperiores nisi etomnis natus in sint ipsam`Lorem ipsum dolor sit amet. Et asperiores nisi etomnis natus in sint ipsam Lorem ipsum dolor sit amet. Et asperiores nisi etomnis natus in sint ipsam`Lorem ipsum dolor sit amet. Et asperiores nisi etomnis natus in sint ip...",
      tag: "Wealth",
      type: "book",
      date: allTopFeedData?.expiry ? allTopFeedData.expiry : "22 May 2020"
    },
    {
      id: 1,
      image: "",
      feedTitle: allTopFeedData?.title
        ? allTopFeedData.title
        : "What does the mark look like ahead of festival season?",
      feedBody: allTopFeedData?.description
        ? allTopFeedData.description
        : "Lorem ipsum dolor sit amet. Et asperiores nisi et omnis natus in sint ipsam`Lorem ipsum dolor sit amet. Et asperiores nisi etomnis natus in sint ipsam`Lorem ipsum dolor sit amet. Et asperiores nisi etomnis natus in sint ipsam Lorem ipsum dolor sit amet. Et asperiores nisi etomnis natus in sint ipsam`Lorem ipsum dolor sit amet. Et asperiores nisi etomnis natus in sint ip...",
      tag: "Wealth",
      type: "book",
      date: allTopFeedData?.expiry ? allTopFeedData.expiry : "22 May 2020"
    },
    {
      id: 2,
      image: "",
      feedTitle: allTopFeedData?.title
        ? allTopFeedData.title
        : "What does the mark look like ahead of festival season?",
      feedBody: allTopFeedData?.description
        ? allTopFeedData.description
        : "Lorem ipsum dolor sit amet. Et asperiores nisi et omnis natus in sint ipsam`Lorem ipsum dolor sit amet. Et asperiores nisi etomnis natus in sint ipsam`Lorem ipsum dolor sit amet. Et asperiores nisi etomnis natus in sint ipsam Lorem ipsum dolor sit amet. Et asperiores nisi etomnis natus in sint ipsam`Lorem ipsum dolor sit amet. Et asperiores nisi etomnis natus in sint ip...",
      tag: "Wealth",
      type: "book",
      date: allTopFeedData?.expiry ? allTopFeedData.expiry : "22 May 2020"
    },
    {
      id: 3,
      image: "",
      feedTitle: allTopFeedData?.title
        ? allTopFeedData.title
        : "What does the mark look like ahead of festival season?",
      feedBody: allTopFeedData?.description
        ? allTopFeedData.description
        : "Lorem ipsum dolor sit amet. Et asperiores nisi et omnis natus in sint ipsam`Lorem ipsum dolor sit amet. Et asperiores nisi etomnis natus in sint ipsam`Lorem ipsum dolor sit amet. Et asperiores nisi etomnis natus in sint ipsam Lorem ipsum dolor sit amet. Et asperiores nisi etomnis natus in sint ipsam`Lorem ipsum dolor sit amet. Et asperiores nisi etomnis natus in sint ip...",
      tag: "Bond",
      type: "book",
      date: allTopFeedData?.expiry ? allTopFeedData.expiry : "21 May 2020"
    }
  ];

  const [notesList, setNotesList] = useState(feedsList);
  const [modifyNotesList, setModifyNotesList] = useState(feedsList);

  useEffect(() => {
    setNotesList(apiData);
    setModifyNotesList(apiData);
  }, [allTopFeedData]);
 {console.log("feed.....",notesList)}
 console.log("modifylisttt....",modifyNotesList)
  // for FeedInDetail
  const [showModal, setShowModal] = useState(false);
  const [feedInDetail, setFeedInDetail] = useState();
  const [filterTagVal, setFilterTagVal] = useState();
  const [filterUsed, setFilterUsed] = useState(0);

  // const showModalHandler = (val)=>{
  //     setShowModal(val)
  // }
console.log("1....",feedInDetail)
  const hideModalHandler = () => {
    setShowModal(false);
    setFeedInDetail("");
  };

  const feedInDetailHandler = (data) => {
    setFeedInDetail(data);
    setShowModal(true);
  };
  {console.log("feedindetail....",feedInDetail)}

  const tagFilterHandler = (val) => {
    let tagVal = val;
    setFilterUsed(1);
    if (tagVal === undefined) {
      tagVal = "";
      setFilterUsed(0);
    }
    setFilterTagVal(tagVal);
    setModifyNotesList(notesList?.filter((item) => item.tag === tagVal));
  };

  // const searchFilterHandler = (val) => {
  //     let searchVal = val;
  //     setModifyNotesList(notesList ?.filter(item => item.feedTitle || ))
  // }

  const apiData = allTopFeedData?.map((item) => {
    return {
      id: item.id,
      image: item.thumbnail,
      feedTitle: item.title,
      feedBody: item.description,
      // userName: "Chris Ramos",
      // category: "Prospect",
      tag: "Wealth",
      date: item.expiry
    };
  });

  return (
    <div>
      <TopBarHeader
        headerName={"My Feed"}
        // buttonTitle={"Add"}
        // navigationLink={"MyLead/leadCreate"}
      />
      {/* <FiltersPanel /> */}
      {/* <FeedFilterPanel  /> */}
      <FeedFilter tagFilterHandler={tagFilterHandler} />
      <Row gutter={[16, 16]}>
        {filterUsed == 0
          ? notesList?.map((item) => (
              <Col span={8}>
                <Feed
                  feedData={item}
                  key={item.id}
                  feedInDetailHandler={feedInDetailHandler}
                  viewType="cardView"
                />
              </Col>
            ))
          : modifyNotesList?.map((item) => (
              <Col span={8}>
                <Feed
                  feedData={item}
                  key={item.id}
                  feedInDetailHandler={feedInDetailHandler}
                  viewType="cardView"
                />
              </Col>
            ))}
      </Row>
      {
        feedInDetail && (
          <CustomModalWithCloseIcon
            visible="true"
            handleCancel={hideModalHandler}
            handleOk={hideModalHandler}
          >
            <Feed
              feedInDetailHandler={feedInDetailHandler}
              feedData={feedInDetail}
              viewType="modalView"
            />
          </CustomModalWithCloseIcon>
        )
        // <FeedInDetail feedDetail={feedInDetail} showModal={showModal} feedInDetailHandler={feedInDetailHandler} hideModalHandler={hideModalHandler} viewType="modalView" />
      }
    </div>
  );
};

// export default Feed
const mapStateToProps = (state) => {
  return {
    allTopFeedData: state.crmHome.topFeed
    // allTopFeedData: [],
  };
};
const mapDispatchToProps = {
  executeGetTopFeedData
};
export default connect(mapStateToProps, mapDispatchToProps)(FeedList);
