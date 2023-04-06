// import { useEffect, useState } from "react";
// import { useHistory, useLocation } from "react-router-dom";
// import { Row, Col, Form, Button } from "antd";
// import { useSelector } from "react-redux";

// import { createValidators } from "../../utils/utils";
// import {
//   executeControlStructure,
//   executePlaceOrder,
// } from "../../redux/actions/primaryMarketActions";

// import BackToTop from "../../components/BackToTop/BackToTop";
// import TopBar from "../../components/DashboardScreenTopbar/DashboardScreenTopbar";
// import GenericCard from "../../components/GenericCard/GenericCard";
// import { AccountDetails } from "./AccountDetails";
// import { AddressDetails } from "./AddressDetails";
// import { OrderDetails } from "./OrderDetails";
// import { OtherDetails } from "./OtherDetails";
// import { PaymentDetails } from "./PaymentDetails";
// import { SecurityDetails } from "./SecurityDetails";
// import { OrderType } from "./OrderType";
// import { DocumentCardWithUpload } from "../../components/DocumentTable/DocumentCardWithUpload";

// import "./style.scss";
// import AttachmentUploadModal from "../../components/AttachmentPannel/AttachmentUploadModal";

// const styleSet = {
//   cardStyle: {
//     margin: "10px 0px",
//   },
// };
// const InvestmentOrder = () => {
//   const location = useLocation();
//   const history = useHistory();

//   const whichInvestment = location.state?.activeTab;

//   const [csAvailable, setCSActive] = useState(false);
//   const [selectedAccount, setSelectedAccount] = useState({});
//   const [bankAccOptions, setUserBankAccOptions] = useState([]);
//   const [srcOfFund, setSrcOfFund] = useState("");
//   const [validators, setValidators] = useState([]);
//   const [mailingOption, setMailingAddressOption] = useState("Y");
//   const [form] = Form.useForm();

//   // USE THIS IN API CALL
//   const [attachmentsModalDataArray, setAttachmentsModalDataArray] = useState(
//     []
//   );
//   const [documentData, setDocumentData] = useState({});

//   const controlStructure = useSelector(
//     (state) => state.primaryMarketReducer.controlStructure
//   );
//   const user = useSelector((state) => state.auth.user);

//   useEffect(() => {
//     if (controlStructure.length > 0)
//       setValidators(createValidators(controlStructure, form));
//   }, [controlStructure]);

//   const handleOppFormChange = (values) => {
//     if (!values.attachments) {
//       setAttachmentsModalDataArray({
//         ...attachmentsModalDataArray,
//         ...values,
//       });
//     }
//     if (values.attachments && values.attachments.length > 0) {
//       let attachmentsModalData = [];
//       values.attachments.forEach((file) => {
//         attachmentsModalData = [
//           ...attachmentsModalData,
//           {
//             fileDescription: "Attachments",
//             fileName: file.FileName,
//             fileSize: file.FileSize,
//             mimeType: file.Mimetype,
//             fileString: file.FileString,
//             attachmentFor: "Attachments",
//             attachedBy: user && user.userName,
//             sessionId: file.SessionId,
//             refType: "ORDERPRADD",
//             refId: null,
//           },
//         ];
//       });
//       let finalAttachmentsModalData = [...attachmentsModalDataArray];
//       attachmentsModalData.forEach((file) => {
//         finalAttachmentsModalData = [...finalAttachmentsModalData, file];
//       });
//       setAttachmentsModalDataArray(finalAttachmentsModalData);
//     }
//   };

//   const returnValidators = (keyField) => {
//     return validators[keyField.toLowerCase()];
//   };

//   const selectValues = (keyField) => {
//     let filtered = csAvailable
//       ? Object.values(controlStructure).filter((e) => e.keyField === keyField)
//       : [];

//     if (filtered.length > 0) {
//       let validatorsFiltered = [];
//       if (validators) {
//         validatorsFiltered = validators[keyField.toLowerCase()];
//         // console.log({keyField : validatorsFiltered})
//       }

//       let selectedObj = filtered[0];
//       switch (selectedObj.controlType) {
//         case "AutoComplete":
//           return {
//             options: selectedObj.lookupValue.lookUpValues,
//             key: selectedObj.lookupValue.returnColumn,
//             value: selectedObj.lookupValue.displayColumn,
//             rules: validatorsFiltered ?? [],
//           };
//         case "DropdownList":
//           return {
//             options: selectedObj.dropDownValue,
//             key: "dataValue",
//             value: "displayValue",
//             rules: validatorsFiltered ?? [],
//           };
//         default:
//           return { options: [] };
//       }
//     }
//     return { options: [] };
//   };

//   const RENDER_CARDS_STOCKS = [
//     {
//       title: "Account Details",
//       component: (
//         <AccountDetails
//           setUserBankAccOptions={setUserBankAccOptions}
//           setSrcOfFund={setSrcOfFund}
//           returnValidators={returnValidators}
//         />
//       ),
//     },
//     {
//       title: "Security Details",
//       component: (
//         <SecurityDetails
//           selectValues={selectValues}
//           whichInvestment={whichInvestment}
//           returnValidators={returnValidators}
//         />
//       ),
//     },
//     {
//       title: "Order Details",
//       component: (
//         <OrderDetails
//           selectValues={selectValues}
//           bankAccOptions={bankAccOptions}
//           whichInvestment={whichInvestment}
//           returnValidators={returnValidators}
//         />
//       ),
//     },
//     {
//       title: "Payment Details",
//       component: (
//         <PaymentDetails
//           selectValues={selectValues}
//           bankAccOptions={bankAccOptions}
//           form={form}
//           returnValidators={returnValidators}
//         />
//       ),
//     },
//     {
//       title: "Other Details",
//       component: (
//         <OtherDetails
//           selectValues={selectValues}
//           srcOfFund={srcOfFund}
//           setMailingAddressOption={setMailingAddressOption}
//           mailingOption={mailingOption}
//           returnValidators={returnValidators}
//         />
//       ),
//     },
//     {
//       title: "Address Details",
//       component: (
//         <AddressDetails
//           selectValues={selectValues}
//           mailingOption={mailingOption}
//           returnValidators={returnValidators}
//         />
//       ),
//     },
//   ];

//   const RENDER_CARDS_BONDS = [
//     {
//       title: "Account Details",
//       component: (
//         <AccountDetails
//           setUserBankAccOptions={setUserBankAccOptions}
//           setSrcOfFund={setSrcOfFund}
//           returnValidators={returnValidators}
//         />
//       ),
//     },
//     {
//       title: "Order Type",
//       component: (
//         <OrderType
//           selectValues={selectValues}
//           returnValidators={returnValidators}
//         />
//       ),
//     },
//     {
//       title: "Security Details",
//       component: (
//         <SecurityDetails
//           selectValues={selectValues}
//           returnValidators={returnValidators}
//         />
//       ),
//     },
//     {
//       title: "Order Details",
//       component: (
//         <OrderDetails
//           selectValues={selectValues}
//           bankAccOptions={bankAccOptions}
//           returnValidators={returnValidators}
//         />
//       ),
//     },
//     {
//       title: "Payment Details",
//       component: (
//         <PaymentDetails
//           selectValues={selectValues}
//           bankAccOptions={bankAccOptions}
//           returnValidators={returnValidators}
//         />
//       ),
//     },
//     {
//       title: "Other Details",
//       component: (
//         <OtherDetails
//           selectValues={selectValues}
//           srcOfFund={srcOfFund}
//           setMailingAddressOption={setMailingAddressOption}
//           returnValidators={returnValidators}
//         />
//       ),
//     },
//     {
//       title: "Address Details",
//       component: (
//         <AddressDetails
//           selectValues={selectValues}
//           mailingOption={mailingOption}
//           returnValidators={returnValidators}
//         />
//       ),
//     },
//   ];

//   useEffect(() => {
//     csAvailable === false &&
//       executeControlStructure().then(() => {
//         setCSActive(true);
//       });
//   }, [csAvailable]);

//   const primaryOrderData = useSelector(
//     (state) => state.primaryMarketReducer.primaryOrder
//   );

//   const onSubmitForm = () => {
//     const reqObj = {
//       pmDealRequisitions: primaryOrderData,
//       documentInfo: documentData,
//       attachment: attachmentsModalDataArray,
//     };
//     executePlaceOrder(reqObj);
//     history.replace("../");
//   };

//   return (
//     <Form
//       form={form}
//       onFinish={(e) => console.log("Form finish", e)}
//       onFinishFailed={() => console.log("Finish failed")}
//     >
//       <TopBar
//         showBackArrow={true}
//         onCancel={() => history.goBack()}
//         screenText="Investment Order"
//         submitBtnText="Place Now"
//         cancelBtnText="Cancel"
//         onSubmit={onSubmitForm}
//       />
//       <Button type="primary" htmlType="submit">
//         Submit
//       </Button>
//       <Row>
//         {whichInvestment === "EQ"
//           ? RENDER_CARDS_STOCKS.map((ele) => {
//               return (
//                 <Col span={24} style={styleSet.cardStyle}>
//                   <GenericCard header={ele.title}>{ele.component}</GenericCard>
//                 </Col>
//               );
//             })
//           : RENDER_CARDS_BONDS.map((ele) => {
//               return (
//                 <Col span={24} style={styleSet.cardStyle}>
//                   <GenericCard header={ele.title}>{ele.component}</GenericCard>
//                 </Col>
//               );
//             })}
//       </Row>

//       <Row>
//         <Col span={24} style={styleSet.cardStyle}>
//           <DocumentCardWithUpload
//             data={documentData?.lstDocumentInfo ?? []}
//             docDetailsObj={{
//               AssetType: whichInvestment === "DB" ? "BND" : "ORD",
//               OrderType: "PMIPO",
//             }}
//             setDocumentData={(data) => setDocumentData(data)}
//           />
//         </Col>
//       </Row>
//       <AttachmentUploadModal
//         selectedAccount={selectedAccount}
//         isUpload={false}
//         onValuesChange={handleOppFormChange}
//         data={attachmentsModalDataArray}
//       />
//       <Row>
//         <BackToTop />
//       </Row>
//     </Form>
//   );
// };

// export default InvestmentOrder;

export default "";
