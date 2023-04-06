import React, { useState, useEffect } from 'react';
import { useLocation, useRouteMatch } from 'react-router-dom';
import { connect } from 'react-redux';
import { Card, Row, Col, Space } from 'antd';
import BackToTop from '../../components/BackToTop/BackToTop';
import {
	BANKDETAILS_COL,
	SECURITYACCOUNTS_COL
} from '../../components/CommonCards/BankDetailsConstant';
import AttachmentUploadModal from '../../components/AttachmentPannel/AttachmentUploadModal';
import { DocumentCardWithUpload } from '../../components/DocumentTable/DocumentCardWithUpload';
import MiscellaneousCardView from './CustomerMiscellaneous';
import ContactDetails from '../../components/ContactDetails/CustomerViewContactDetails';
import RelationDetail from '../../components/RelationDetail/CustomerViewRelationDetail';
import KYCValidationDetails from '../../components/KYCValidationDetails/CustomerViewKYCValidationDetails';
import CustomerViewOtherDetail from '../../components/OtherDetail/CustomerViewOtherDetail';
import CustomerViewSourceDetail from '../../components/SourceDetail/CustomerViewSourceDetail';
import RiskProfile from '../../components/RiskProfile/RiskProfile';
import CardWithTableView from '../../components/CommonCards/CardWithTableView';
import ProfileBannerList from '../../components/ProfileBannerList/ProfileBannerList';
import CustomerDetails from '../ProfileViewAccount/CustomerViewDetails';
import CustomerViewVerticalTimeline from './CustomerViewVerticalTimeline';
import { fontSet } from '../../theme';
import { HorizontalTimeLine } from '../../components/Timeline/HorizontalTimeLine';
import { customerDetailsAllApi } from '../../redux/actions/customerViewActions';
import CustomerDeleteModal from './CustomerDeleteModal';
import CustomerViewMailingInstruction from '../../components/MailingInstruction/CustomerViewMailingInstruction';
import CustomerViewRelationshipManagerDetails from '../../components/RelationshipManagerDetails/CustomerViewRelationshipManagerDetails';
import CustomerViewAddressDetails from '../../components/AddressDetails/CustomerViewAddressDetails';
// import DocumentsDetail from "../../components/Forms/CustomerDocumentsDetailFormCard/CustomerDocumentsDetailFormCard";

const CustomerViewScreen = (props) => {
	const {
		allDocumentData,
		allAttachmentData,
		allRiskProfileData,
		allBankDetailsData,
		allCustomerOnboardingData,
		allWorkflowStatusData,
		allTimelineData,
		allSocialListData,
		allMiscellaneousData,
		allProspectRelationData,
		leftPanel,
		authData
	} = props;

	const location = useLocation();
	const { clientObject = {} } = location.state;
	const { customerOnboardingtIds, rowIndex } = location.state;
	const [currentRowCount, setcurrentRowCount] = useState(rowIndex);
	const [noTitleKey, setNoTitleKey] = useState('CustomerDetails');
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	// const [documentDetailsPayload, setDocumentDetailsPayload] = useState({});
	// const [documentData, setDocumentData] = useState({DocumentInfo:allDocumentData});

	const handlePreviousClick = () => {
		if (currentRowCount !== 0) setcurrentRowCount(currentRowCount - 1);
	};

	let authorizeCode = '';
	leftPanel &&
		leftPanel.map((menu) => {
			menu.subMenu.map((subMenu) => {
				if (subMenu.subMenuId == 'CLIENTREQADD') authorizeCode = subMenu.authorizeCode;
			});
		});

	// ---------------------------start for document edit on view screen-----------------------------
	// const handleDocFormChange = (values) =>{
	// 	setDocumentData ({ ...documentData, ...values });
	// }

	// useEffect(() => {
	//   const newDocumentRequestObject = {
	//     data: {
	//       CustomerType: allCustomerOnboardingData?.customerType || null,
	//       CustomerCategory: allCustomerOnboardingData?.legalStatus || null,
	//       ResidentialStatus: allCustomerOnboardingData?.residentStatus || null,
	//       RefID: "",
	//     },
	//   };
	//   setDocumentDetailsPayload(newDocumentRequestObject);
	// }, [
	//   allCustomerOnboardingData?.customerType,
	//   allCustomerOnboardingData?.legalStatus,
	//   allCustomerOnboardingData?.residentStatus,
	// ]);
	// ---------------------------end for document edit on view screen-----------------------------

	const handleNextClick = () => {
		if (customerOnboardingtIds.length === currentRowCount) {
			setcurrentRowCount(0);
		} else {
			setcurrentRowCount(currentRowCount + 1);
		}
	};

	const handleDeleteModal = () => {
		setShowDeleteModal(!showDeleteModal);
	};

	const onTabChange = (key) => {
		setNoTitleKey(key);
	};
	const tabListNoTitle = [
		{
			key: 'CustomerDetails',
			tab: 'Customer details'
		},
		{
			key: 'Timeline',
			tab: 'Timeline'
		}
	];
	const contentListNoTitle = {
		CustomerDetails: <CustomerDetails customerDetails={allCustomerOnboardingData} />,
		Timeline: <CustomerViewVerticalTimeline timelineData={allTimelineData} />
	};

	const styleSet = {
		cardStyle: {
			margin: '12px 0px',

			width: '100%',
			marginTop: '15px',
			marginBottom: '15px',
			text: fontSet.heading.large
		}
	};
	useEffect(() => {
		customerDetailsAllApi(customerOnboardingtIds[currentRowCount]);
	}, [currentRowCount]);

	return (
		<>
			{showDeleteModal && (
				<CustomerDeleteModal
					showDeleteModalFlag={showDeleteModal}
					handleDeleteModal={handleDeleteModal}
					customerId={customerOnboardingtIds[currentRowCount]}
				/>
			)}
			<Space direction='vertical' size={16} className='parent-form-container'>
				<ProfileBannerList
					authorizeCode={authorizeCode}
					allCustomerOnboardingData={allCustomerOnboardingData}
					allWorkflowStatusData={allWorkflowStatusData}
					allRiskProfileData={allRiskProfileData}
					handlePreviousClick={handlePreviousClick}
					handleNextClick={handleNextClick}
					setShowDeleteModal={handleDeleteModal}
				/>
				<HorizontalTimeLine
					horizontalTimeline={allWorkflowStatusData ? allWorkflowStatusData : []}
				/>
				<Card
					className='opportunityViewCardDetail'
					bordered={false}
					style={{ width: '100%' }}
					tabList={tabListNoTitle}
					activeTabKey={noTitleKey}
					onTabChange={(key) => onTabChange(key)}
				>
					{contentListNoTitle[noTitleKey]}
				</Card>
				<ContactDetails contactDetails={allCustomerOnboardingData} socialList={allSocialListData} />
				<CustomerViewAddressDetails AddressDetails={allCustomerOnboardingData} />
				{/* <ContactDetails
            contactDetails={allCustomerOnboardingData}
            socialList={allSocialListData}
          /> */}
				<KYCValidationDetails KYCValidationDetails={allCustomerOnboardingData} />
				<RelationDetail
					relationDetailsTrue={
						allProspectRelationData && allProspectRelationData.relationDetailData
					}
					relationDetailsFalse={
						allProspectRelationData && allProspectRelationData.relationDetailfalseData
					}
					relationDetails={allProspectRelationData}
				/>
				<CustomerViewSourceDetail sourceDetail={allCustomerOnboardingData} />
				<CustomerViewMailingInstruction mailingInstructionDetail={allCustomerOnboardingData} />
				<CustomerViewOtherDetail otherDetail={allCustomerOnboardingData} />
				<CustomerViewRelationshipManagerDetails
					relationshipManagerDetails={allCustomerOnboardingData}
				/>
				<RiskProfile
					allCustomerOnboardingData={allCustomerOnboardingData}
					riskProfileData={allRiskProfileData}
				></RiskProfile>
				<AttachmentUploadModal
					type={'CLIENTREQADD'}
					// selectedAccount={{ scheme: clientObject.customerCode }}
					selectedAccount={{
						scheme: clientObject?.customerCode
							? clientObject?.customerCode
							: allCustomerOnboardingData?.clientId,
						refType: 'CLIENTREQADD'
					}}
					data={allAttachmentData && allAttachmentData}
					allCustomerOnboardingData={allCustomerOnboardingData}
					authData={authData}
					action={'view'}
				/>
				<DocumentCardWithUpload
					data={allDocumentData}
					allCustomerOnboardingData={allCustomerOnboardingData}
					authData={authData}
					action={'view'}
				/>

				{/* <DocumentsDetail
							formData={documentData}
							onValuesChange={handleDocFormChange}
							// rules={rules.length > 0 ? rules[0] : undefined}
							// removeAttachment={removeAttachment}
							// action={location?.state?.action}
              documentRequestObject={documentDetailsPayload}
              action="edit"
							// setDocumentRequiredField={setDocumentRequiredField}
							// documentRequiredField={documentRequiredField}
							// checkDocMandatory={checkDocMandatory}
							// type='CLIENTREQADD'
						/> */}
				{/* Prasad Created ticket to remove this bank details section from create screen #958 */}
				{/* <Row style={styleSet.cardStyle}>
        <Col span={24}>
          <CardWithTableView
            header={"Bank Account"}
            columns={BANKDETAILS_COL}
            data={allBankDetailsData && allBankDetailsData}
          ></CardWithTableView>
        </Col>
      </Row> */}
				<MiscellaneousCardView detail={allMiscellaneousData} />
				<BackToTop />
			</Space>
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		authData: state.auth.user.userRole,
		allDocumentData:
			state.customerView &&
			state.customerView.customerOnboarding &&
			state.customerView.customerOnboarding.uploadedDocInfo &&
			state.customerView.customerOnboarding.uploadedDocInfo.lstDocumentInfo,
		allAttachmentData: (state.customerView && state.customerView.customerAttachmentsDetail) || [],
		allCustomerOnboardingData: state.customerView.customerOnboarding.clientRequisition,
		allRiskProfileData: state.customerView.customerOnboarding.riskProfileModel,
		allWorkflowStatusData: state.customerView.workflowStatus,
		allTimelineData: state.customerView.getTimeline,
		allProspectRelationData: state.customerView.prospectRelation,
		allSocialListData: state.customerView.customerOnboarding.socialList,
		allBankDetailsData: state.customerView.customerOnboarding.bankDetails || [],
		allMiscellaneousData: state.customerView.customerMiscellaneousDetail || [],
		leftPanel: state.dashboard.leftPanel
	};
};

export default connect(mapStateToProps)(CustomerViewScreen);
