import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col, Space, PageHeader, Tooltip, Layout, Typography, Popover } from 'antd';
import CustomerDetailTabs from './CustomerDetailTabs';
import ContactDetails from '../../components/ContactDetails/ContactDetails';
import CustomerViewAddressDetails from '../../components/AddressDetails/CustomerViewAddressDetails';
import RelationDetail from '../../components/RelationDetail/RelationDetail';
import KYCValidationDetails from '../../components/KYCValidationDetails/KYCValidationDetails';
import RiskProfile from '../../components/RiskProfile/RiskProfile';
import { DocumentCardWithUpload } from '../../components/DocumentTable/DocumentCardWithUpload';
import CardWithTableView from '../../components/CommonCards/CardWithTableView';
// import { docColumns } from '../../components/CommonCards/DocumentTableData';
// import { columns } from '../../components/CommonCards/BankAccountTableData';
import { fontSet } from '../../theme';
import { profileDetailsAllApi } from '../../redux/actions/profileViewAccountAction';
import { connect } from 'react-redux';
// import ProfileTopBanner from '../../components/ProfileBannerList/ProfileTopBanner';
import SourceDetail from '../../components/SourceDetail/SourceDetail';
// import OtherDetail from '../../components/OtherDetail/OtherDetail';
import CustomerViewMailingInstruction from '../../components/MailingInstruction/CustomerViewMailingInstruction';
import CustomerViewRelationshipManagerDetails from '../../components/RelationshipManagerDetails/CustomerViewRelationshipManagerDetails';
import { useLocation } from 'react-router-dom';
import MiscellaneousCardView from '../ProspectViewScreen/ProspectComponent/MiscellaneousCardView';
import BackToTop from '../../components/BackToTop/BackToTop';
import AttachmentUploadModal from '../../components/AttachmentPannel/AttachmentUploadModal';
import CustomerViewOtherDetail from '../../components/OtherDetail/CustomerViewOtherDetail';
import ProfileTopBannerData from '../ProfileViewAccount/PrrofileBannerData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/pro-solid-svg-icons';
import { faEdit, faEllipsisVAlt } from '@fortawesome/pro-regular-svg-icons';
const { Content } = Layout;
const { Link } = Typography;

const ProfileViewAccount = (props) => {
	const {
		verticalTimelineData,
		attachmentDetailsData,
		customerDetailsData,
		allMiscellaneousData,
		prospectRelations,
		accountDetailsData,
		profileTopBannerData,
		customer,
		allDocumentData,
		authData
	} = props;
	const location = useLocation();
	const history = useHistory();
	let { clientObject = {} } = {};

	useEffect(() => {
		clientObject = location?.state?.clientObject;
		profileDetailsAllApi(clientObject);
	}, [location?.state?.clientObject]);

	useEffect(() => {
		if (!location.state) {
			clientObject = { customerCode: customer };
			profileDetailsAllApi(clientObject);
		}
	}, [customer]);

	useEffect(() => {
		profileDetailsAllApi(clientObject);
	}, []);

	const [attachmentData, setattachmentData] = useState([]);
	useEffect(() => {
		const documentData = attachmentDetailsData;
		setattachmentData(documentData);
	}, []);

	const styleSet = {
		cardStyle: {
			margin: '12px 0px'
		},
		messageBlock: {
			width: '717px'
		},
		message: {
			fontSize: fontSet.heading.large
		},
		remark: {
			display: 'flex',
			justifyContent: 'space-between',
			fontSize: fontSet.body.large
		}
	};
	const goToEdit = () => {
		const toObject = {
			pathname: '/dashboard/MyCustomers/CustomerEdit',
			state: {
				refID: customer,
				action: 'edit',
				refType: 'CLIENTADD'
			}
		};
		history.push(toObject);
	};
	const handleClickMenuOption = (option) => {
		let pathName = '';
		if (option.toLowerCase() === 'record interaction') {
			pathName = '/dashboard/MyInteractions/InteractionCreate';
		}
		if (option.toLowerCase() === 'create opportunity') {
			pathName = '/dashboard/MyOpportunity/OpportunityCreate';
		}
		if (option.toLowerCase() === 'create task') {
			pathName = '/dashboard/TaskBoard/TaskCreate';
		}
		const toObject = {
			pathname: pathName,
			state: {
				data: profileTopBannerData,
				refType: 'CLIENTADD',
				mode: 'create',
				screen: 'customer-view'
			}
		};
		history.push(toObject);
	};

	const RenderMoreOptions = () => {
		const options = ['Create Opportunity', 'Create Interaction', 'Create Task'];
		const content = () => (
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'flex-start',
					paddingLeft: '20px'
				}}
			>
				{options.map((option, index) => (
					<div key={index} className='row-action-option'>
						<span
							onClick={() => {
								option.toLowerCase() === 'record interaction' && handleClickMenuOption(option);
								option.toLowerCase() === 'create opportunity' && handleClickMenuOption(option);
								option.toLowerCase() === 'create task' && handleClickMenuOption(option);
							}}
						>
							{option}
						</span>
					</div>
				))}
			</div>
		);
		return (
			<Popover
				placement='bottomLeft'
				content={content}
				overlayClassName='prospect-listing-actions-popover'
			>
				<FontAwesomeIcon icon={faEllipsisVAlt} size='sm' className='prospectViewTopBarIcons' />
			</Popover>
		);
	};

	return (
		<>
			<Space direction='vertical' size={16} className='parent-form-container'>
				{/* <ProfileTopBanner profileTopBanner={profileTopBannerData} customerCode={customer} /> */}
				<PageHeader
					className='prospectViewPageHeader'
					onBack={() => history.push('/dashboard/PortfolioOverview')}
					backIcon={
						<Tooltip title='Back'>
							<FontAwesomeIcon icon={faArrowLeft} size='sm' className='prospectViewTopBarIcons' />
						</Tooltip>
					}
					extra={[
						<Link key={4} style={{ color: '#fff', fontSize: '18px' }}>
							<Tooltip title='Edit'>
								<FontAwesomeIcon
									icon={faEdit}
									size='sm'
									onClick={goToEdit}
									className='prospectViewTopBarIcons'
								/>
							</Tooltip>
						</Link>,
						<Link key={5} style={{ color: '#fff', fontSize: '18px' }}>
							<RenderMoreOptions />
						</Link>
					]}
					style={{
						backgroundImage: 'linear-gradient(to right, #354081 , #727EC6 )',
						borderRadius: '8px'
						// borderBottomLeftRadius: '12px'
					}}
				>
					<Content>
						<ProfileTopBannerData profileData={profileTopBannerData} />
					</Content>
				</PageHeader>

				<CustomerDetailTabs
					profileContactDetails={profileTopBannerData}
					verticalDataTimeline={
						verticalTimelineData && verticalTimelineData.profileVerticalTimeline
					}
					ProfileAccountTable={accountDetailsData && accountDetailsData.profileAccountDetails}
				/>
				<ContactDetails
					contactDetails={profileTopBannerData}
					socialList={customerDetailsData && customerDetailsData.socialList}
				/>
				<CustomerViewAddressDetails AddressDetails={profileTopBannerData} />

				<KYCValidationDetails KYCValidationDetails={profileTopBannerData} />

				<RelationDetail
					relationDetailsTrue={prospectRelations && prospectRelations.relationDetailData}
					relationDetailsFalse={prospectRelations && prospectRelations.relationDetailfalseData}
					relationDetails={prospectRelations}
				/>
				<SourceDetail sourceDetail={profileTopBannerData} />

				<CustomerViewMailingInstruction mailingInstructionDetail={profileTopBannerData} />

				{/* <OtherDetail
            // otherDetail={
            //   customerDetailsData && customerDetailsData.profileTopBannerData
            // }
            otherDetail={profileTopBannerData
            }
          /> */}
				<CustomerViewOtherDetail otherDetail={profileTopBannerData} />

				<CustomerViewRelationshipManagerDetails relationshipManagerDetails={profileTopBannerData} />
				<RiskProfile riskProfileData={props.riskProfileModel} />

				<AttachmentUploadModal
					type={'CLIENTADD'}
					// selectedAccount={{ scheme: clientObject.customerCode }}
					selectedAccount={{
						scheme: clientObject?.clientCode ? clientObject?.clientCode : clientObject?.customerCode
					}}
					data={props.attachmentDetailsData && props.attachmentDetailsData}
					action={'view'}
				/>
				{/* <AttachmentUploadModal
            type={"CLIENTADD"}
            // selectedAccount={{ scheme: clientObject.customerCode }}
            // selectedAccount={{ scheme: clientObject?.customerCode ? clientObject?.customerCode : profileTopBannerData?.clientId, refType: 'CLIENTADD' }}
            selectedAccount={{ scheme: clientObject?.clientCode ? clientObject?.clientCode : clientObject?.customerCode }}
            data={props.attachmentDetailsData && props.attachmentDetailsData}
            profileTopBannerData = {profileTopBannerData}
            authData = {authData}
            action={"view"}
          /> */}
				{/* <CardWithTableView
            header={"Document Details"}
            columns={docColumns}
            data={
              customerDetailsData &&
              customerDetailsData.uploadedDocInfo?.lstDocumentInfo
            }
          ></CardWithTableView> */}
				<DocumentCardWithUpload
					data={allDocumentData}
					profileTopBannerData={profileTopBannerData}
					authData={authData}
					action={'view'}
				/>
				{/* MAY BE USEFUL IN FUTURE SO KEPING THIS FOR WHILE */}
				{/* <Row style={styleSet.cardStyle}>
        <Col span={24}>
          <CardWithTableView
            header={"Bank Accounts"}
            columns={columns}
            data={customerDetailsData.bankDetails}
          ></CardWithTableView>
        </Col>
      </Row> */}

				{/* <GenericCard
            header={"Miscellaneous"}
            menuFlag={1}
            buttonTitle={""}
          ></GenericCard> */}
				{/* <MiscellaneousCardView /> */}
				<MiscellaneousCardView detail={allMiscellaneousData && allMiscellaneousData} />

				<BackToTop />
			</Space>
		</>
	);
};
const mapStateToProps = (state) => {
	return {
		authData: state.auth.user.userRole,
		verticalTimelineData: state.profileViewAccount.verticalTimelineData,
		attachmentDetailsData: state.profileViewAccount.attachmentDetailsData,
		prospectRelations: state.profileViewAccount.prospectRelations,
		customerDetailsData: state.profileViewAccount.customerDetailsData,
		riskProfileModel: state.profileViewAccount.customerDetailsData.riskProfileModel,
		clientRelationsData: state.profileViewAccount.clientRelationsData,
		profileTopBannerData: state.profileViewAccount.customerDetailsData.clientRequisition,
		allMiscellaneousData: state.profileViewAccount.miscellaneousData || [],
		downloadAttachmentsData: state.profileViewAccount.downloadAttachmentsData,
		uploadFilesData: state.profileViewAccount.uploadFilesData,
		allDocumentData:
			state.profileViewAccount &&
			state.profileViewAccount.customerDetailsData &&
			state.profileViewAccount.customerDetailsData.uploadedDocInfo &&
			state.profileViewAccount.customerDetailsData.uploadedDocInfo.lstDocumentInfo,
		// documentDetailsData: state.profileViewAccount.documentDetailsData,
		clientAccountDetailsByID: state.profileViewAccount.clientAccountDetailsByID,
		CommonCustomerDetails: state.profileViewAccount.CommonCustomerDetails,
		accountDetailsData: state.profileViewAccount.accountDetailsData,
		customer: state.common.customerInfo.customerCode
	};
};
export default connect(mapStateToProps)(ProfileViewAccount);
