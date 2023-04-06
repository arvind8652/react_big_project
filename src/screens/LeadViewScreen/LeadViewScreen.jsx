import { useEffect, useState } from 'react';
import { Col, Layout, Row, Tooltip } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import { getDateFormat, fetchAsset, generateCsObject } from '../../utils/utils';
import { CONSTANTS } from '../../constants/constants';
import RenderConfirmDeleteModal from './RenderConfirmDeleteModal';
import RenderSuccessFailureDeleteModal from './RenderSuccessFailureDeleteModal';
import {
	excecuteGetLeadView,
	executeLeadViewNextOrPreviousData,
	executeSaveLeadEditDetail
} from '../../redux/actions/leadViewActions';
import './LeadViewScreen.scss';
import { PageHeader, Card } from 'antd';
import BackToTop from '../../components/BackToTop/BackToTop';
import {
	faMapMarkerAlt,
	faPhoneAlt,
	faEnvelope,
	faArrowLeft,
	faFlag,
	faFire,
	faSnowflake
} from '@fortawesome/pro-solid-svg-icons';
import {
	faTwitter,
	faFacebookSquare,
	faLinkedin,
	faViber,
	faWhatsapp
} from '@fortawesome/free-brands-svg-icons';
import {
	faTrashAlt,
	faEdit,
	faChevronRight,
	faChevronLeft,
	faArrowCircleUp,
	faChevronSquareUp,
	faChevronSquareDown
} from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GenericCard from '../../components/GenericCard/GenericCard';
import DetailsCardField from '../../components/DetailsCardField/DetailsCardField';
import SocialAppLink from '../../components/SocialAppLink/SocialAppLink';
import RenderConfirmUpgradeModal from './RenderConfirmUpgradeModal';
import RenderConfirmUpgradeLeadCategoryModal from './RenderConfirmUpgradeLeadCategoryModal';
const { Content } = Layout;

function LeadViewScreen(props) {
	const {
		excecuteGetLeadView,
		executeLeadViewNextOrPreviousData,
		executeSaveLeadEditDetail,
		leadCustomerDetail,
		leadViewData,
		leadListingCs
	} = props;
	const location = useLocation();
	const controlStructure =
		leadListingCs &&
		Array.isArray(leadListingCs) &&
		leadListingCs.length > 0 &&
		generateCsObject(leadListingCs[0].controlStructureField);
	const emptyArray = 'emptyArray';
	let { leadId, rowNumber, filters } = location.state;
	const [upgradeFailedArray, setUpgradeFailedArray] = useState();
	const [upgradeCategoryFailedArray, setUpgradeCategoryFailedArray] = useState(emptyArray);
	const [errorMsg, setErrorMsg] = useState('');
	const history = useHistory();
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const availableFlagList = ['IN', 'MY', 'PH', 'US'];
	const [showSuccessFailureDeleteModal, setShowSuccessFailureDeleteModal] = useState(false);
	const [nextTappedCount, setNextTappedCount] = useState(rowNumber);
	const [deleteLeadMessage, setDeleteLeadMessage] = useState(false);
	const [isNextTapped, setIsNextTapped] = useState(false);
	const [showUpgradeLeadModal, setShowUpgradeLeadModal] = useState(false);
	const [showUpgradeLeadCategoryModal, setShowUpgradeLeadCategoryModal] = useState(false);
	const [categoryDropdownValues, setCategoryDropdownValues] = useState([]);
	const [categoryFlag, setCategoryFlag] = useState(false);
	useEffect(() => {
		excecuteGetLeadView(leadId, setErrorMsg);
	}, []);
	useEffect(() => {
		if (leadViewData && leadViewData.lead && leadViewData.lead.category && !categoryFlag) {
			let categoryDropdownValues = controlStructure?.Category?.dropDownValue.filter((item) => {
				return parseInt(item.dataValue) > parseInt(leadViewData.lead.category);
			});
			setCategoryFlag(true);
			setCategoryDropdownValues(categoryDropdownValues);
		}
	}, [leadViewData, controlStructure]);

	useEffect(() => {
		if (isNextTapped) {
			filters.FromRowNumber = nextTappedCount;
			executeLeadViewNextOrPreviousData(filters, setErrorMsg);
		}
	}, [nextTappedCount]);

	const styleSet = {
		sideMargin: { margin: 20 },
		cardDetails: { 'margin-top': '15px' }
	};

	function handleNextClick() {
		if (isNextTapped) {
			setNextTappedCount(leadViewData.lead.rowNumber + 1);
		} else {
			setIsNextTapped(true);
			setNextTappedCount(nextTappedCount + 1);
		}
	}
	function handlePreviousClick() {
		if (isNextTapped) {
			setNextTappedCount(leadViewData.lead.rowNumber - 1);
		} else {
			setIsNextTapped(true);
			setNextTappedCount(nextTappedCount - 1);
		}
	}

	function handleEditClick() {
		const leadEditDetail = {
			Type: leadViewData.lead.type,
			Salutation: leadViewData.lead.salutation,
			FirstName: leadViewData.lead.firstName,
			MiddleName: leadViewData.lead.middleName,
			LastName: leadViewData.lead.lastName,
			Suffix: leadViewData.lead.Suffix,
			DateofBirthCorp:
				leadViewData.lead.dateofBirthCorp !== null
					? moment(JSON.stringify(leadViewData.lead.dateofBirthCorp), 'YYYY-MM-DD')
					: '',
			Gender: leadViewData.lead.gender,
			Category: leadViewData.lead.category,
			Nationality: leadViewData.lead.nationality,
			DialCode: leadViewData.lead.dialCode,
			Mobile: leadViewData.lead.mobile,
			AlternateDialCode: leadViewData.lead.alternateDialCode,
			AlternateNumber: leadViewData.lead.alternateNumber,
			Email: leadViewData.lead.email,
			SocialType: leadViewData.lead.socialType,
			Address: leadViewData.lead.address,
			ZipCode: leadViewData.lead.zipCode,
			Country: leadViewData.lead.country,
			State: leadViewData.lead.state,
			City: leadViewData.lead.city,
			Twitter: leadViewData.lead.twitter,
			Linkedln: leadViewData.lead.linkedIn,
			Facebook: leadViewData.lead.facebook,
			Source: leadViewData.lead.source,
			SourceType: leadViewData.lead.sourceType,
			SourceValue: leadViewData.lead.sourceValue,
			SourcedBy: leadViewData.lead.sourcedBy,
			InterestLevel: leadViewData.lead.interestlevel,
			Remarks: leadViewData.lead.remark,
			RelationshipManager: leadViewData.lead.relationshipManager,
			Branch: leadViewData.lead.branch
		};
		executeSaveLeadEditDetail(leadEditDetail);

		const toObject = {
			pathname: '/dashboard/MyLead/leadCreate',
			state: {
				screen: 'view',
				data: leadViewData,
				mode: 'edit',
				filters: filters,
				rowNumber: nextTappedCount
			}
		};
		history.push(toObject);
	}

	if (!leadViewData) {
		return null;
	}

	return (
		<>
			<RenderConfirmDeleteModal
				showDeleteModal={showDeleteModal}
				setShowDeleteModal={setShowDeleteModal}
				setShowSuccessFailureDeleteModal={setShowSuccessFailureDeleteModal}
				leadViewData={leadViewData}
				setDeleteLeadMessage={setDeleteLeadMessage}
			/>
			<RenderSuccessFailureDeleteModal
				deleteLeadMessage={deleteLeadMessage}
				showSuccessFailureDeleteModal={showSuccessFailureDeleteModal}
				setShowSuccessFailureDeleteModal={setShowSuccessFailureDeleteModal}
				setDeleteLeadMessage={setDeleteLeadMessage}
			/>
			<RenderConfirmUpgradeModal
				setUpgradeFailedArray={setUpgradeFailedArray}
				upgradeFailedArray={upgradeFailedArray}
				showUpgradeLeadModal={showUpgradeLeadModal}
				setShowUpgradeLeadModal={setShowUpgradeLeadModal}
				leadId={leadId}
			/>
			<RenderConfirmUpgradeLeadCategoryModal
				setUpgradeCategoryFailedArray={setUpgradeCategoryFailedArray}
				upgradeCategoryFailedArray={upgradeCategoryFailedArray}
				showUpgradeLeadCategoryModal={showUpgradeLeadCategoryModal}
				setShowUpgradeLeadCategoryModal={setShowUpgradeLeadCategoryModal}
				leadId={leadId}
				controlStructure={controlStructure}
				categoryDropdownValues={categoryDropdownValues}
				emptyArray={emptyArray}
			/>
			<PageHeader
				className='lead-site-page-header'
				onBack={() => history.push('/dashboard/MyLead')}
				backIcon={<FontAwesomeIcon icon={faArrowLeft} className='leadViewTopBarIcons' />}
				extra={[
					<FontAwesomeIcon
						icon={faChevronSquareUp}
						onClick={() => setShowUpgradeLeadCategoryModal(true)}
						className='leadViewTopBarIcons'
					/>,
					<FontAwesomeIcon
						icon={faChevronSquareDown}
						onClick={() => setShowUpgradeLeadCategoryModal(true)}
						className='leadViewTopBarIcons'
					/>,
					<FontAwesomeIcon
						icon={faArrowCircleUp}
						onClick={() => setShowUpgradeLeadModal(true)}
						className='leadViewTopBarIcons'
					/>,
					<FontAwesomeIcon
						icon={faTrashAlt}
						onClick={() => setShowDeleteModal(true)}
						className='leadViewTopBarIcons'
					/>,
					<FontAwesomeIcon
						icon={faEdit}
						onClick={handleEditClick}
						className='leadViewTopBarIcons'
					/>,
					<FontAwesomeIcon
						icon={faChevronLeft}
						onClick={handlePreviousClick}
						className='leadViewTopBarIcons'
					/>,
					<FontAwesomeIcon
						icon={faChevronRight}
						onClick={handleNextClick}
						className='leadViewTopBarIcons'
					/>
				]}
				style={{
					backgroundImage: 'linear-gradient(to right, #354081 , #727EC6 )',
					borderBottomRightRadius: '12px',
					borderBottomLeftRadius: '12px'
				}}
			>
				<Content>{leadDetails(leadViewData.lead)}</Content>
			</PageHeader>
			<div className='bodyContent'>
				<GenericCard
					header={
						leadViewData.lead.type === 'I'
							? CONSTANTS.leadView.personalDetailsTitleLabel
							: CONSTANTS.leadView.companyDetails.companyDetails
					}
					menuFlag={0}
				>
					<Row span={36} style={styleSet.sideMargin}>
						<Col span={8}>
							<DetailsCardField
								headerText={
									`${leadViewData.lead.type === 'I' ? leadViewData.lead.salutationName : ''}` +
									' ' +
									`${leadViewData.lead.type === 'I' ? leadViewData.lead.firstName : ''}` +
									' ' +
									`${leadViewData.lead.middleName ? leadViewData.lead.middleName : ''}` +
									' ' +
									`${leadViewData.lead.lastName ? leadViewData.lead.lastName : ''}` +
									' ' +
									`${leadViewData.lead.suffix ? leadViewData.lead.suffix : ''}` +
									' '
								}
								descriptionText={
									leadViewData.lead.type === 'I'
										? CONSTANTS.leadView.personalDetails.fullNameLabel
										: CONSTANTS.leadView.companyDetails.companyNameLabel
								}
								className='innerDetailContainer'
							/>
						</Col>
						<Col span={6}>
							<DetailsCardField
								headerText={leadViewData.lead.categoryName}
								descriptionText={CONSTANTS.leadView.personalDetails.categoryLabel}
								className='innerDetailContainer'
							/>
						</Col>
						{leadViewData.lead.type === 'C' ? (
							<Col span={8}>
								<DetailsCardField
									headerText={`${leadViewData.lead.middleName ? leadViewData.lead.middleName : ''}`}
									descriptionText={CONSTANTS.leadView.companyDetails.companyContactPerson}
									className='innerDetailContainer'
								/>
							</Col>
						) : (
							''
						)}
					</Row>

					<Row span={36} style={styleSet.sideMargin}>
						<Col span={8}>
							<DetailsCardField
								headerText={moment(leadViewData.lead.dateofBirthCorp).format(getDateFormat())}
								descriptionText={
									leadViewData.lead.type === 'I'
										? CONSTANTS.leadView.personalDetails.dateOfBirthLabel
										: CONSTANTS.leadView.personalDetails.dateOfIncorporation
								}
								className='innerDetailContainer'
								dateOfIncorporation
							/>
						</Col>

						{leadViewData.lead.type === 'I' && (
							<Col span={8}>
								<DetailsCardField
									headerText={leadViewData.lead.genderName && leadViewData.lead.genderName}
									descriptionText={CONSTANTS.leadView.personalDetails.genderLabel}
									className='innerDetailContainer'
								/>
							</Col>
						)}

						{/* Nationality API not created */}
						{/* <Col span={6}>
              <DetailsCardField
                headerText={
                  leadViewData.lead.country ? (
                    availableFlagList.includes(leadViewData.lead.country) ? (
                      <img
                        src={fetchAsset(
                          "countryFlags",
                          leadViewData.lead.country
                        )}
                        alt="logo"
                        className="leadViewFlagIcon"
                      />
                    ) : (
                      <img
                        src={fetchAsset("countryFlags", "DEFAULT")}
                        alt="logo"
                        className="leadViewFlagIcon"
                      />
                    )
                  ) : (
                    (
                      <FontAwesomeIcon
                        icon={faFlag}
                        color="black"
                        className="leadViewBodyDetailIcon"
                      />
                    ) + leadViewData.lead.nationality
                  )
                  
                }

                
                
                descriptionText={
                  CONSTANTS.leadView.personalDetails.nationalityLabel
                }
                className="innerDetailContainer"
              />
            </Col> */}

						<Col span={6}>
							<DetailsCardField
								headerText={
									<Row style={{ justifyItems: 'center' }}>
										{leadViewData.lead.country ? (
											availableFlagList.includes(leadViewData.lead.country) ? (
												<>
													<img
														src={fetchAsset('countryFlags', leadViewData.lead.country)}
														alt='logo'
														className='leadViewFlagIcon'
													/>
													<p className='detailText'>{leadViewData.lead.countryName}</p>
												</>
											) : (
												<img
													src={fetchAsset('countryFlags', 'DEFAULT')}
													alt='logo'
													className='leadViewFlagIcon'
												/>
											)
										) : (
											''
										)}
									</Row>
								}
								descriptionText={CONSTANTS.leadView.personalDetails.nationalityLabel}
								className='innerDetailContainer'
							/>
						</Col>
						{leadViewData.lead.type === 'C' ? (
							<Col span={8}>
								<DetailsCardField
									headerText={`${leadViewData.lead.lastName ? leadViewData.lead.lastName : ''}`}
									descriptionText={CONSTANTS.leadView.companyDetails.companyContactPersonDetails}
									className='innerDetailContainer'
								/>
							</Col>
						) : (
							''
						)}
					</Row>
				</GenericCard>

				<div style={styleSet.cardDetails}>
					<GenericCard
						header={CONSTANTS.leadView.contactDetailsTitleLabel}
						menuFlag={0}
						className='leadViewCardDetail'
					>
						<Row span={36} style={styleSet.sideMargin}>
							<Col span={8}>
								<DetailsCardField
									headerText={
										<Row style={{ justifyItems: 'center' }}>
											{leadViewData.lead.country ? (
												availableFlagList.includes(leadViewData.lead.country) ? (
													<img
														src={fetchAsset('countryFlags', leadViewData.lead.country)}
														alt='logo'
														className='leadViewFlagIcon'
													/>
												) : (
													<img
														src={fetchAsset('countryFlags', 'DEFAULT')}
														alt='logo'
														className='leadViewFlagIcon'
													/>
												)
											) : (
												<FontAwesomeIcon
													icon={faFlag}
													className='leadViewBodyDetailIcon'
													color='black'
													style={{ marginRight: '5px' }}
												/>
											)}
											{leadViewData.lead.dialCode ? (
												<p className='detailText'>
													{leadViewData.lead.dialCode} {leadViewData.lead.mobile}
												</p>
											) : (
												<p className='detailText'>{leadViewData.lead.mobile}</p>
											)}
											{leadViewData.socialList.WhatsApp && (
												<FontAwesomeIcon
													icon={faWhatsapp}
													className='leadViewBodyDetailIcon'
													style={{ marginLeft: '8px' }}
												/>
											)}
											{leadViewData.socialList.Viber && (
												<FontAwesomeIcon
													icon={faViber}
													className='leadViewBodyDetailIcon'
													style={{ marginLeft: '8px' }}
												/>
											)}{' '}
										</Row>
									}
									descriptionText={CONSTANTS.leadView.contactDetails.contactNumberLabel}
									className='innerDetailContainer'
								/>
							</Col>
							<Col span={8}>
								<DetailsCardField
									headerText={
										<Row>
											{leadViewData.lead.country ? (
												availableFlagList.includes(leadViewData.lead.country) ? (
													<img
														src={fetchAsset('countryFlags', leadViewData.lead.country)}
														alt='logo'
														className='leadViewFlagIcon'
													/>
												) : (
													<img
														src={fetchAsset('countryFlags', 'DEFAULT')}
														alt='logo'
														className='leadViewFlagIcon'
													/>
												)
											) : (
												<FontAwesomeIcon
													icon={faFlag}
													className='leadViewBodyDetailIcon'
													color='black'
													style={{ marginRight: '5px' }}
												/>
											)}

											{leadViewData.lead.alternateDialCode ? (
												<p className='detailText'>
													{leadViewData.lead.alternateDialCode} {leadViewData.lead.alternateNumber}
												</p>
											) : (
												''
											)}
										</Row>
									}
									descriptionText={CONSTANTS.leadView.contactDetails.alternateNumberLabel}
									className='innerDetailContainer'
								/>
							</Col>
							<Col span={6}>
								<DetailsCardField
									headerText={leadViewData.lead.email}
									descriptionText={CONSTANTS.leadView.contactDetails.emailIdLabel}
									className='innerDetailContainer'
								/>
							</Col>
						</Row>
						<Row span={36} style={styleSet.sideMargin}>
							<Col span={8}>
								<DetailsCardField
									headerText={leadViewData.lead.address}
									descriptionText={CONSTANTS.leadView.contactDetails.addressLabel}
									className='innerDetailContainer'
								/>
							</Col>
							<Col span={8}>
								<DetailsCardField
									headerText={
										<Row>
											{leadViewData.lead.country ? (
												availableFlagList.includes(leadViewData.lead.country) ? (
													<img
														src={fetchAsset('countryFlags', leadViewData.lead.country)}
														alt='logo'
														className='leadViewFlagIcon'
													/>
												) : (
													<img
														src={fetchAsset('countryFlags', 'DEFAULT')}
														alt='logo'
														className='leadViewFlagIcon'
													/>
												)
											) : (
												<FontAwesomeIcon
													icon={faFlag}
													className='leadViewBodyDetailIcon'
													color='black'
													style={{ marginRight: '5px' }}
												/>
											)}
											<p className='detailText'>
												{leadViewData.lead.cityName}, {leadViewData.lead.countryName}
											</p>{' '}
										</Row>
									}
									descriptionText={
										<p className='descriptionText'>
											{CONSTANTS.leadView.contactDetails.cityLabel}
											{', '}
											{CONSTANTS.leadView.contactDetails.countryLabel}
										</p>
									}
									className='innerDetailContainer'
								/>
							</Col>
							<Col span={6}>
								<DetailsCardField
									headerText={leadViewData.lead.zipCode}
									descriptionText={CONSTANTS.leadView.contactDetails.pincodeLabel}
									className='innerDetailContainer'
								/>
							</Col>
						</Row>
						<Row span={36} style={styleSet.sideMargin}>
							<Col span={8}>
								<SocialAppLink
									faIcon={faTwitter}
									userName={
										leadViewData.socialList.Twitter && (
											<a
												href={`https://www.twitter.com/${leadViewData.socialList.Twitter.replace(
													'@',
													''
												)}`}
												target='_blank'
												rel='noreferrer noopener'
											>
												{leadViewData.socialList.Twitter}
											</a>
										)
									}
									color={'#48A1EC'}
									className='leadViewBodySocialMediaIcon'
								/>
							</Col>
							<Col span={8}>
								<SocialAppLink
									faIcon={faFacebookSquare}
									userName={
										leadViewData.socialList.Facebook && (
											<a
												href={`https://www.facebook.com/${leadViewData.socialList.Facebook.replace(
													'@',
													''
												)}`}
												target='_blank'
												rel='noreferrer noopener'
											>
												{leadViewData.socialList.Facebook}
											</a>
										)
									}
									color={'#4267B2'}
									className='leadViewBodySocialMediaIcon'
								/>
							</Col>
							<Col span={6}>
								<SocialAppLink
									faIcon={faLinkedin}
									userName={
										leadViewData.socialList.LinkedIn && (
											<a
												href={`https://www.linkedin.com/in/${leadViewData.socialList.LinkedIn.replace(
													'@',
													''
												)}`}
												target='_blank'
												rel='noreferrer noopener'
											>
												{leadViewData.socialList.LinkedIn}
											</a>
										)
									}
									color={'#0077b5'}
									className='leadViewBodySocialMediaIcon'
								/>
							</Col>
						</Row>
					</GenericCard>
				</div>

				<Card
					className='leadViewCardDetail'
					title={CONSTANTS.leadView.sourceDetailsTitleLabel}
					bordered={false}
				>
					<div
						style={{
							width: '63%',
							marginRight: '40px',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-between'
						}}
					>
						<div className='innerDetailContainer'>
							<p className='detailText'>{leadViewData.lead.sourceName}</p>
							<p className='descriptionText'>{CONSTANTS.leadView.sourceDetails.sourceLabel}</p>
						</div>
						<div className='innerDetailContainer'>
							<p className='detailText'>{leadViewData.lead.sourcedBy}</p>
							<p className='descriptionText'>{CONSTANTS.leadView.sourceDetails.sourcedByLable}</p>
						</div>
						<div className='innerDetailContainer'>
							<p className='detailText'>{leadViewData.lead.sourceValueName}</p>
							<p className='descriptionText'>
								<div style={{ display: 'flex', justifyContent: 'space-between' }}>
									{CONSTANTS.leadView.sourceDetails.sourceValueName}
								</div>
							</p>
						</div>
						<div className='innerDetailContainer'>
							<p className='detailText'>{leadViewData.lead.remark}</p>
							<div style={{ display: 'flex', justifyContent: 'space-between' }}>
								<p className='descriptionText'>{CONSTANTS.leadView.sourceDetails.remarksLabel}</p>
								<p className='descriptionText'>
									{CONSTANTS.leadView.sourceDetails.lastUpdateLabel}:{' '}
									{moment(leadViewData.lead.lastUpdateTime).format(getDateFormat())}
								</p>
							</div>
						</div>
					</div>
					<div className='innerCardDetailContainer'>
						<div className='innerDetailContainer'>
							<p className='detailText'>{leadViewData.lead.sourceTypeName}</p>
							<p className='descriptionText'>
								{CONSTANTS.leadView.sourceDetails.referralTypeLabel}
							</p>
						</div>
						{leadCustomerDetail.recordId && (
							<Card className='referralCardDetail'>
								<div className='referralDetailContainer'>
									<div className='sourceProfileContainer'>
										{leadCustomerDetail.profileImage ? (
											<div className='sourceProfile'>
												<img
													src={`data:image/jpeg;base64,${leadCustomerDetail.profileImage}`}
													className='circle-img'
													alt='user-img'
												/>
											</div>
										) : (
											<div className='leadInitialsCircleImg'>
												{leadCustomerDetail.profileInitial}
											</div>
										)}
									</div>
									<div style={{ width: '75%' }}>
										<div className='innerDetailContainer'>
											<p className='detailText'>{leadCustomerDetail.name}</p>
											<p className='descriptionText'>{leadCustomerDetail.address}</p>
										</div>
										<div className='innerDetailContainer'>
											<p className='detailText'>{leadCustomerDetail.mobile}</p>
											<p className='descriptionText'>{leadCustomerDetail.email}</p>
										</div>
									</div>
								</div>
							</Card>
						)}
					</div>
				</Card>

				<Card
					className='leadViewCardDetail'
					title={CONSTANTS.leadView.relationshipManagerDetailTitleLabel}
					bordered={false}
				>
					<div className='innerCardDetailContainer'>
						<div className='innerDetailContainer'>
							<p className='detailText'>{leadViewData.lead.relationshipManagerName}</p>
							<p className='descriptionText'>
								{CONSTANTS.leadView.relationshipManagerDetail.relationshipManagerLabel}
							</p>
						</div>
					</div>
					<div className='innerCardDetailContainer'>
						<div className='innerDetailContainer'>
							<p className='detailText'>{leadViewData.lead.branchName}</p>
							<p className='descriptionText'>
								{CONSTANTS.leadView.relationshipManagerDetail.branchLabel}
							</p>
						</div>
					</div>
				</Card>
				<BackToTop />
			</div>
		</>
	);
}

const leadDetails = (props) => (
	<div className='leadViewMainContainer'>
		<div className='profileContainer'>
			<div className='imageContainer'>
				{props.profileImage ? (
					<div style={{ width: '85%', height: 'auto' }}>
						<img
							src={`data:image/jpeg;base64,${props.profileImage}`}
							className='leadHeader-img'
							alt='user-img'
						/>
					</div>
				) : (
					<div className='leadInitialsCircleImg'>{props.profileInitial}</div>
				)}
			</div>
			<div className='basicDetailContainer'>
				<p className='nameLabel'>
					{props.firstName} {props.middleName} {props.lastName}
				</p>
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<FontAwesomeIcon icon={faMapMarkerAlt} className='leadViewHeaderDetailIcon' />
					<p className='basicDetailLabel'>{props.address}</p>
				</div>
				<div className='tag'>
					<p className='basicDetailLabel' style={{ color: '#354081' }}>
						{props.categoryName}
					</p>
				</div>
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<FontAwesomeIcon icon={faPhoneAlt} className='leadViewHeaderDetailIcon' />
					<p className='basicDetailLabel'>{props.mobile}</p>
				</div>
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<FontAwesomeIcon icon={faEnvelope} className='leadViewHeaderDetailIcon' />
					<p className='basicDetailLabel'>{props.email}</p>
				</div>
			</div>
		</div>
		<div className='actionContainer'>
			<div className='leadCategory'>
				<p className='categoryDetailLabel'>{props.typeName}</p>
				<p className='basicDetailLabel'>{CONSTANTS.leadView.topBar.typeLabel}</p>
			</div>
			<div className='leadCategory'>
				<p className='categoryDetailLabel'>{props.sourceTypeName}</p>
				<p className='basicDetailLabel'>{CONSTANTS.leadView.topBar.sourceLabel}</p>
			</div>
			<div className='leadCategory'>
				<p className='categoryDetailLabel'>{props.sourcedBy}</p>
				<p className='basicDetailLabel'>{CONSTANTS.leadView.topBar.sourcedByLabel}</p>
			</div>
			<div className='leadCategory'>
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<p className='categoryDetailLabel'>{props.interestlevelName}</p>
					{props.interestlevelName && (
						<FontAwesomeIcon
							icon={props.interestlevelName === 'Hot' ? faFire : faSnowflake}
							style={{ marginLeft: '8px' }}
							className='leadViewHeaderDetailIcon'
						/>
					)}
				</div>
				<p className='basicDetailLabel'>{CONSTANTS.leadView.topBar.interestLabel}</p>
			</div>
		</div>
	</div>
);

const mapStateToProps = (state) => {
	const { leadView } = state;
	const leadViewData = leadView.leadViewData;
	const leadCustomerDetail = leadView.leadCustomerDetail;
	const leadListingCs = state.leadListing.controlStructure;
	return {
		leadView,
		leadViewData,
		leadCustomerDetail,
		leadListingCs
	};
};

const mapDispatchToProps = {
	excecuteGetLeadView,
	executeLeadViewNextOrPreviousData,
	executeSaveLeadEditDetail
};

export default connect(mapStateToProps, mapDispatchToProps)(LeadViewScreen);
