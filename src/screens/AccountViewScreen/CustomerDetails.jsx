import { React } from 'react';
import { Card, Col, Row, Avatar, Tooltip, Typography, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { authorizeModule } from '../../utils/utils';
import { CONSTANTS } from '../../constants/constants';
import {
	faMapMarkerAlt,
	faPhoneAlt,
	faEnvelope,
	faArrowLeft
} from '@fortawesome/pro-solid-svg-icons';
import {
	faTrashAlt,
	faEdit,
	faChevronRight,
	faChevronLeft,
	faFileTimes,
	faFileCheck,
	faCopy
} from '@fortawesome/pro-regular-svg-icons';
import { palette } from '../../theme';
import AvatarLogo from '../../components/Avatar/AvatarLogo';
import { connect } from 'react-redux';

const { Title } = Typography;
const defaultValue = {
	name: '-',
	address: '-',
	tagName: '-',
	mobile: '-',
	email: '-',
	opportunityName: '-',
	stage: '-',
	targetAmount: '-',
	probability: '-'
};

const CustomerDetails = ({
	currentRowCount = '',
	action = '',
	customerDetails = defaultValue,
	accountDetails = {},
	jointHolder = [],
	allAccountData,
	setShowApproveModal,
	setShowRejectModal,
	setShowDeleteModal,
	handleNextClick,
	authData,
	handlePreviousClick,
	authorizeCode
}) => {
	const styleSet = {
		container: {
			color: palette.text.banner
		},
		disableIcon: {
			opacity: '0.5',
			cursor: 'not-allowed'
		}
	};
	const history = useHistory();

	const goToEdit = () => {
		const toObject = {
			pathname: '/dashboard/MyAccount/AccountEdit',
			// state: { action: 'edit', refID: accountDetails?.scheme, refType: 'ACCOUNTREQADD' }
			state: {
				action: action === 'profileView' ? 'profileEdit' : 'edit',
				refID: accountDetails?.scheme,
				refType: action === 'profileView' ? 'ACCOUNTADD' : 'ACCOUNTREQADD'
			}
		};
		history.push(toObject);
	};

	const goToCopy = () => {
		const toObject = {
			pathname: '/dashboard/MyAccount/AccountEdit',
			// state: { action: 'copy', refID: accountDetails?.scheme, refType: 'ACCOUNTREQADD' }
			state: {
				action: action === 'profileView' ? 'profileCopy' : 'copy',
				refID: accountDetails?.scheme,
				refType: action === 'profileView' ? 'ACCOUNTADD' : 'ACCOUNTREQADD'
			}
		};
		history.push(toObject);
	};

	const options = [];
	if (
		allAccountData.workFlowFormType === 'Process' &&
		allAccountData.workFlowUserGroup === authData
	) {
	}

	return (
		<>
			<Card
				style={{
					backgroundImage: 'linear-gradient(to right, #354081 , #727EC6 )',
					borderBottomRightRadius: '12px',
					borderBottomLeftRadius: '12px'
				}}
			>
				<Row>
					<Col style={{ width: '73%' }}>
						<FontAwesomeIcon
							icon={faArrowLeft}
							// onClick={() =>
							// 	history.push({
							// 		pathname: action === 'profileView' ? `/dashboard/Profile` : `/dashboard/MyAccount`
							// 	})
							// }
							onClick={() =>
								history.push({
									pathname:
										action === 'profileView'
											? `/dashboard/Profile`
											: action === 'clientView'
											? `/dashboard/MyCustomers`
											: `/dashboard/MyAccount`
								})
							}
							className='opportunityViewTopBarIcons'
							// size='15x'
							size='lg'
						/>
					</Col>
					<Col>
						<Tooltip title='Copy'>
							<FontAwesomeIcon
								icon={faCopy}
								onClick={goToCopy}
								className='opportunityViewTopBarIcons'
							/>
						</Tooltip>
						{accountDetails?.workFlowFormType === 'Modificaiton' &&
						// accountDetails?.workFlowUserGroup === authData ? (
						accountDetails?.workFlowUserGroup?.includes(authData) ? (
							<>
								{authorizeModule(authorizeCode, CONSTANTS.authorizeCode.delete) && (
									<Tooltip title='Delete'>
										<FontAwesomeIcon
											icon={faTrashAlt}
											onClick={() => setShowDeleteModal(true)}
											className='opportunityViewTopBarIcons'
										/>
									</Tooltip>
								)}
								{authorizeModule(authorizeCode, CONSTANTS.authorizeCode.modify) && (
									<>
										<Tooltip title='Edit'>
											<FontAwesomeIcon
												icon={faEdit}
												onClick={goToEdit}
												className='opportunityViewTopBarIcons'
											/>
										</Tooltip>
										{/* <Tooltip title='Copy'>
											<FontAwesomeIcon
												icon={faCopy}
												onClick={goToCopy}
												className='opportunityViewTopBarIcons'
											/>
										</Tooltip> */}
									</>
								)}
							</>
						) : accountDetails?.workFlowFormType === 'ApproveReject' &&
						  //   accountDetails?.workFlowUserGroup === authData ? (
						  accountDetails?.workFlowUserGroup?.includes(authData) ? (
							<>
								{/* Approve Icon */}
								{authorizeModule(authorizeCode, CONSTANTS.authorizeCode.approve) && (
									<Tooltip title='Approve'>
										<FontAwesomeIcon
											icon={faFileCheck}
											onClick={() => setShowApproveModal(true)}
											className='opportunityViewTopBarIcons'
										/>
									</Tooltip>
								)}
								{/* Reject Icon */}
								{authorizeModule(authorizeCode, CONSTANTS.authorizeCode.approveReject) && (
									<Tooltip title='Reject'>
										<FontAwesomeIcon
											icon={faFileTimes}
											onClick={() => setShowRejectModal(true)}
											className='opportunityViewTopBarIcons'
										/>
									</Tooltip>
								)}
							</>
						) : (
							''
						)}
						<FontAwesomeIcon
							style={currentRowCount === 0 && styleSet.disableIcon}
							icon={faChevronLeft}
							onClick={() => currentRowCount !== 0 && handlePreviousClick()}
							className='opportunityViewTopBarIcons'
						/>
						<FontAwesomeIcon
							style={allAccountData?.length - 1 === currentRowCount && styleSet.disableIcon}
							icon={faChevronRight}
							onClick={() => allAccountData?.length - 1 > currentRowCount && handleNextClick()}
							className='opportunityViewTopBarIcons'
						/>
					</Col>
				</Row>
				<Row justify='space-between' align='bottom'>
					<Col span={11}>
						{customerDetails && (
							<Row align='bottom' style={{ padding: '5px 0px' }}>
								<Col className='gutter-row' align='middle' span={9}>
									<AvatarLogo
										imgsrc={customerDetails.profileImage}
										profileName={customerDetails.profileInitial}
										avatarSize={120}
									/>
								</Col>
								<Col className='gutter-row' span={12}>
									<Row>
										<Title
											level={3}
											style={{ color: '#FFF', margin: 0 }}
											className='opportunityName'
										>
											{customerDetails.name}
										</Title>
									</Row>

									<Row style={{ alignItems: 'center', margin: '5px 0px' }}>
										<FontAwesomeIcon
											icon={faMapMarkerAlt}
											className='opportuntiyViewHeaderDetailIcon'
										/>
										<p className='opportunityDescriptionText' style={styleSet.container}>
											{customerDetails.address} {customerDetails.city}
										</p>
									</Row>
									<Row style={{ alignItems: 'center', margin: '5px 0px' }}>
										<div className='opportunityTag'>{customerDetails.customerCategory}</div>
									</Row>
									<Row style={{ alignItems: 'center', margin: '5px 0px' }}>
										<FontAwesomeIcon
											icon={faPhoneAlt}
											className='opportuntiyViewHeaderDetailIcon'
										/>
										<p className='opportunityDescriptionText' style={styleSet.container}>
											{customerDetails.dialCode}
										</p>{' '}
										&nbsp;
										<p className='opportunityDescriptionText' style={styleSet.container}>
											{customerDetails.mobile}
										</p>
									</Row>
									<Row style={{ alignItems: 'center', margin: '5px 0px' }}>
										<FontAwesomeIcon
											icon={faEnvelope}
											className='opportuntiyViewHeaderDetailIcon'
										/>
										<p className='opportunityDescriptionText' style={styleSet.container}>
											{customerDetails.email}
										</p>
									</Row>
								</Col>
							</Row>
						)}
					</Col>

					<Col span={13}>
						<Row gutter={[16, 16]}>
							<Col className='gutter-row' span={8}>
								<Row gutter={16} className='opportunityDetailText' style={styleSet.container}>
									{accountDetails?.schemeTypeName}
								</Row>
								<Row gutter={16} className='opportunityDescriptionText' style={styleSet.container}>
									Nature
								</Row>
							</Col>
							<Col className='gutter-row' span={8}>
								<Row gutter={12} className='opportunityDetailText' style={styleSet.container}>
									{accountDetails && accountDetails?.incomeGrowthName
										? accountDetails?.incomeGrowthName
										: ''}
								</Row>
								<Row gutter={16} className='opportunityDescriptionText' style={styleSet.container}>
									Type
								</Row>
							</Col>
							<Col className='gutter-row' span={8}>
								<Row gutter={12} className='opportunityDetailText' style={styleSet.container}>
									{accountDetails && accountDetails?.fundClassificationName
										? accountDetails?.fundClassificationName
										: ''}
								</Row>
								<Row gutter={16} className='opportunityDescriptionText' style={styleSet.container}>
									Classification
								</Row>
							</Col>
						</Row>
						<Row gutter={[16, 16]}>
							<Col className='gutter-row' span={8}>
								<Row gutter={16} className='opportunityDetailText' style={styleSet.container}>
									{accountDetails && accountDetails?.holdingPatternName
										? accountDetails?.holdingPatternName
										: ''}
								</Row>
								<Row gutter={16} className='opportunityDescriptionText' style={styleSet.container}>
									Holding Pattern
								</Row>
							</Col>
							<Col className='gutter-row' span={8}>
								<Row gutter={16} className='opportunityDetailText' style={styleSet.container}>
									{jointHolder && jointHolder.length > 2 ? (
										<Avatar.Group
											maxCount={2}
											maxStyle={{
												color: '#696A91',
												backgroundColor: '#F0F2FB'
											}}
										>
											<Avatar
												src={jointHolder[0].profileImage}
												style={{ color: '#696A91', backgroundColor: '#F0F2FB' }}
											>
												{jointHolder[0].profileInitials}
											</Avatar>
											<Avatar
												src={jointHolder[1].profileImage}
												style={{ color: '#696A91', backgroundColor: '#F0F2FB' }}
											>
												{jointHolder[1].profileInitials}
											</Avatar>
											{jointHolder.slice(2).map((ele, index) => {
												return (
													<Tooltip key={index} title={ele.profileInitials} placement='top'>
														<Avatar
															src={ele.profileImage}
															style={{
																color: '#696A91',
																backgroundColor: '#F0F2FB'
															}}
														>
															{ele.profileInitials}
														</Avatar>
													</Tooltip>
												);
											})}
										</Avatar.Group>
									) : (
										<Avatar.Group
											maxCount={2}
											maxStyle={{
												color: '#f56a00',
												backgroundColor: '#fde3cf'
											}}
										>
											{jointHolder?.map((ele, index) => {
												return (
													<Tooltip key={index} title={ele.profileInitials} placement='top'>
														<Avatar
															src={ele.profileImage}
															style={{
																color: '#696A91',
																backgroundColor: '#F0F2FB'
															}}
														>
															{ele.profileInitials}
														</Avatar>
													</Tooltip>
												);
											})}
										</Avatar.Group>
									)}
								</Row>
								<Row gutter={16} className='opportunityDescriptionText' style={styleSet.container}>
									Account Holder
								</Row>
							</Col>
							<Col className='gutter-row' span={8}>
								<Row gutter={16} className='opportunityDetailText' style={styleSet.container}>
									{accountDetails && accountDetails?.status ? accountDetails?.status : '-'}
								</Row>
								<Row gutter={16} className='opportunityDescriptionText' style={styleSet.container}>
									Status
								</Row>
							</Col>
						</Row>
					</Col>
				</Row>
			</Card>
		</>
	);
};
const mapStateToProps = (state) => {
	return {
		authData: state.auth.user.userRole
	};
};

export default connect(mapStateToProps)(CustomerDetails);
