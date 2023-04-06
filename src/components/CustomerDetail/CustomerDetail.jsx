import { React, useEffect, useState, useRef } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { connect } from 'react-redux';
import { CONSTANTS } from '../../constants/constants';
import { createValidators } from '../../utils/utils';
import { getDateFormat } from '../../utils/utils';

import {
	excecuteGetOpportunityViewCs,
	excecuteGetOpportunityAddCs,
	excecuteGetOpportunityView,
	executeOpportunityViewNextOrPreviousData,
	executeSaveOpportunityEditDetail,
	excecuteGetAttachmentDetail
} from '../../redux/actions/opportunityViewActions';
import { downloadAttachment } from '../../utils/utils';
import {
	getOpportunityViewApi,
	deleteOpportunityApi,
	uploadAttachmentApi,
	getProbablityByStageApi,
	updateOpportunityStageDetailApi,
	getOpportunityDependentDataApi,
	downloadAttachmentApi,
	getAttachmentDetailApi
} from '../../api/opportunityViewApi';
//import OpportunityViewScreen from "../../screens/OpportunityViewScreen/OpportunityViewScreen.scss";
import 'antd/dist/antd.css';
import {
	Button,
	Layout,
	PageHeader,
	Card,
	Row,
	Col,
	Table,
	Input,
	Modal,
	Form,
	Upload,
	Divider,
	List,
	Space,
	Typography,
	Radio,
	Select,
	DatePicker,
	Timeline,
	InputNumber
} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import {
	faMapMarkerAlt,
	faPhoneAlt,
	faEnvelope,
	faArrowLeft,
	faCheckCircle,
	faCaretUp,
	faCaretDown,
	faPaperclip,
	faUpload
} from '@fortawesome/pro-solid-svg-icons';
import {
	faTrashAlt,
	faEdit,
	faChevronRight,
	faChevronLeft,
	faCircle as NormalFaCircle,
	faPencilAlt,
	faChevronDoubleDown,
	faChevronDoubleUp
} from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fetchAsset } from '../../utils/utils';
import CustomModal from '../../components/Modal/CustomModal/CustomModal';
import moment from 'moment';
import { faCircle } from '@fortawesome/pro-duotone-svg-icons';
import {
	faChevronUp,
	faChevronDown,
	faPlus,
	faChevronCircleLeft,
	faChevronCircleRight
} from '@fortawesome/pro-light-svg-icons';
import AttachmentListTable from '../../components/AttachmentListTable/AttachmentListTable';
import CommentBoxCard from '../../components/CommentBox/CommentBoxCard';
import OpportunityProgressDetails from '../../screens/OpportunityViewScreen/OpportunityProgressDetails';
//import ContactDetails from "../../components/ContactDetails/ContactDetails";

import ValidationDetail from '../../components/KYCValidationDetails/ValidationDetail.jsx';
import RelationDetail from '../../components/RelationDetail/RelationDetail.jsx';
import SourceDetail from '../../components/SourceDetail/SourceDetail.jsx';
import OtherDetail from '../../components/OtherDetail/OtherDetail.jsx';
import RiskProfile from '../../components/RiskProfile/RiskProfile.jsx';
import ContactDetails from '../../components/ContactDetails/ContactDetails.jsx';
import ProfileBannerList from '../../components/ProfileBannerList/ProfileBannerList.jsx';
import AttachmentPanel from '../../components/AttachmentPannel/AttachmentPanel.jsx';

const { Content } = Layout;
const { Text, Link, Title } = Typography;
const { Option } = Select;

function CustomerDetail(props) {
	const {
		excecuteGetOpportunityViewCs,
		excecuteGetOpportunityAddCs,
		excecuteGetOpportunityView,
		executeLOpportunityNextOrPreviousData,
		executeSaveOpportunityEditDetail,
		excecuteGetAttachmentDetail,
		opportunityViewData,
		horizontalTimelineDetail,
		verticalTimelineDetail,
		opportunityAttachments,
		opportunityMiscellaneousDetail,
		controlStructure,
		fullControlStructure,
		fullControlStructureAdd,
		controlStructureAdd
	} = props;

	const OpportunityDetailAndTimelineTabDetails = (props) => {
		const tabListNoTitle = [
			{
				key: 'OpportunityDetails',
				tab: 'Opportunity Details'
			},
			{
				key: 'Timeline',
				tab: 'Timeline'
			}
		];

		const timelines = props.timelines;
		const opportunityViewRules = props.opportunityViewRules;
		const controlStructure = props.controlStructure;
		const fullControlStructure = props.fullControlStructure;

		const opportunityDetail = {
			status: props.detail.isOpen,
			stage: props.detail.stage,
			probability: props.detail.probability,
			opportunityId: props.detail.opportunityId,
			opportunityName: props.detail.opportunityName,
			targetAmount: props.detail.targetAmount,
			opportunityType: props.detail.opportunityType,
			expectedDate: props.detail.dueDate,
			closureAmount: props.detail.amount,
			closureDate: props.detail.closeDate,
			product: props.detail.productOrService,
			currency: props.detail.preferredCurrency,
			countryCode: props.detail.countryCodeData_Value,
			remarks: props.detail.remark,
			lastUpdate: props.detail.inputDateTime,
			relationshipManager: props.detail.relationshipManager,
			branchName: props.detail.branchName,
			creationDate: props.detail.creationDate,
			closeReason: props.detail.closeReason
		};

		const OpportunityDetails = (props) => {
			const [opportunityUpdateModalVisible, setOpportunityUpdateModalVisible] = useState(false);

			const detail = props.data;

			if (!props.data) {
				return null;
			}

			const TextSub = (props) => (
				<div>
					<Space>
						{props.flag && (
							<img
								src={fetchAsset('countryFlags', props.flag)}
								alt={props.text}
								className='opportunityViewFlagIcon'
							/>
						)}
						{props.symbol && (
							<img
								src={fetchAsset('currencySymbols', props.symbol)}
								alt={props.text}
								className='opportunityViewFlagIcon'
							/>
						)}
						<Text>
							<span className='opportunityDetailText' style={{ color: '#696a91' }}>
								{props.text}
							</span>
						</Text>
					</Space>
					<br />
					<Row justify='space-between'>
						<Text style={{ color: '#2c2d33' }}>
							<span className='opportunityDescriptionText'> {props.subtext}</span>
						</Text>
						<Text style={{ color: '#2c2d33' }}>
							<span className='opportunityDescriptionText'>
								{props.endsubtext ? props.endsubtext : ''}
							</span>
						</Text>
					</Row>
				</div>
			);

			return (
				<>
					<Space direction='vertical' style={{ width: '100%' }} size={5}>
						<Row>
							<Col span={8}>
								<TextSub text={detail.status} subtext='Status' />
							</Col>
							<Col span={8}>
								<TextSub text={props.data.stage} subtext='Stage' />
							</Col>
							<Col span={8}>
								<Row justify='space-between'>
									<TextSub text={detail.probability} subtext='Probability' />
									{detail.status === 'OPEN' && (
										<Button
											style={{
												paddingInline: '30px',
												borderRadius: '8px',
												color: '#47518B',
												borderColor: '#47518B'
											}}
											onClick={() => setOpportunityUpdateModalVisible(true)}
											size='middle'
										>
											Update
										</Button>
									)}
								</Row>
							</Col>
						</Row>
						<Divider />
						<Row>
							<Col span={8}>
								<TextSub text={detail.opportunityName} subtext='Opportunity Name' />
							</Col>
							<Col span={8}>
								<TextSub text={detail.opportunityType} subtext='Opportunity Type' />
							</Col>
							<Col span={8}>
								<TextSub text={detail.product} subtext='Product / Service' />
							</Col>
							<Col span={8} style={{ marginTop: '22px' }}>
								{detail.status === 'OPEN' ? (
									<TextSub
										text={
											detail.currencySymbol === null && detail.currencySymbol === ''
												? detail.currencySymbol + detail.targetAmount
												: detail.targetAmount
										}
										subtext='Target Amount'
									/>
								) : detail.status === 'CLOSED' ? (
									<TextSub
										text={
											detail.currencySymbol === null && detail.currencySymbol === ''
												? detail.currencySymbol + detail.closureAmount
												: detail.closureAmount
										}
										subtext='Closure Amount'
									/>
								) : (
									<TextSub
										text={
											detail.currencySymbol === null && detail.currencySymbol === ''
												? detail.currencySymbol + detail.targetAmount
												: detail.targetAmount
										}
										subtext='Target Amount'
									/>
								)}
							</Col>
							<Col span={8} style={{ marginTop: '22px' }}>
								{detail.status === 'OPEN' ? (
									<TextSub
										text={moment(detail.expectedDate).format(getDateFormat())}
										subtext='Expected date'
									/>
								) : detail.status === 'CLOSED' ? (
									<TextSub
										text={moment(detail.closureDate).format(getDateFormat())}
										subtext='Closure date'
									/>
								) : (
									<TextSub
										text={moment(detail.expectedDate).format(getDateFormat())}
										subtext='Expected date'
									/>
								)}
							</Col>
							<Col span={8} style={{ marginTop: '22px' }}>
								<TextSub flag={detail.countryCode} text={detail.currency} subtext='Currency' />
							</Col>
							<Col span={12} style={{ marginTop: '22px' }}>
								<TextSub
									text={detail.remarks}
									subtext='Remarks'
									endsubtext={detail.lastUpdate && `Last Update: ${detail.lastUpdate}`}
								/>
							</Col>
						</Row>
						<br />
						<Row>
							<Col span={8}>
								<TextSub text={detail.relationshipManager} subtext='Relationship Manager' />
							</Col>
							<Col span={8}>
								<TextSub text={detail.branchName} subtext='Branch' />
							</Col>
							<Col span={8}>
								<TextSub
									text={moment(detail.creationDate).format(getDateFormat())}
									subtext='Created'
								/>
							</Col>
						</Row>
					</Space>
					<RenderOpportunityDetailUpdateModal
						modal={opportunityUpdateModalVisible}
						setfn={(val) => setOpportunityUpdateModalVisible(val)}
						opportunityStageList={props.opportunityStageList}
						onUpdateView={props.onUpdateView}
						detail={detail}
						opportunityViewRules={props.opportunityViewRules}
						fullControlStructure={props.fullControlStructure}
						controlStructure={props.controlStructure}
					/>
				</>
			);
		};

		const RenderOpportunityDetailUpdateModal = (props) => {
			const [form] = Form.useForm();
			// const opportunityViewRules = props.opportunityViewRules;
			// const [opportunityAddRules, setOpportunityAddRules] = useState();
			const fullControlStructure = props.fullControlStructure;
			const controlStructure = props.controlStructure;
			const [status, setStatus] = useState(props.detail.status);
			const [activeStageDisplayValue, setActiveStageDisplayValue] = useState(props.detail.stage);
			const [activeStageDataValue, setActiveStageDataValue] = useState();
			const [opportunityStageList, setOpportunityStageList] = useState();
			const [probability, setProbability] = useState(
				props && props.detail && props.detail.probability
			);
			const [editStageValues, setEditStageValues] = useState({
				OpportunityId: props.detail.opportunityId,
				IsOpen: null,
				Stage: props.detail.stage,
				Probability: props.detail.probability,
				PreferredCurrency: props.detail.currency,
				Amount: props.detail.targetAmount,
				Remark: props.detail.remarks,
				CloseReason: null,
				// CloseDate: props.detail.expectedDate
				//   ? moment(props.detail.expectedDate).toISOString()
				//   : "",
				CloseDate:
					controlStructure && controlStructure.CloseDate && controlStructure.CloseDate.defaultvalue
						? moment.utc(controlStructure.CloseDate.defaultvalue).toISOString()
						: ''
			});

			let opportunityViewRules = [];
			fullControlStructure &&
				fullControlStructure !== '' &&
				fullControlStructure.length > 0 &&
				fullControlStructure.forEach((s, index) => {
					opportunityViewRules[index] = createValidators(s.controlStructureField, form);
				});
			const RenderUpdateStageSuccessFailureModal = () => {
				return (
					<CustomModal
						visible={showSuccessFailureUpdateStageModal}
						handleOk={handleSuccessFailureUpdateStageModalOk}
					>
						<div className='modal-header' style={{ display: 'flex', alignItems: 'center' }}>
							{/* <div className="header-icon">
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </div> */}
							<div className='header-title'>Upload Status</div>
						</div>
						<div className='modal-body'>{updateStageSuccessFailureMessage}</div>
						<div className='modal-footer'>
							<Button
								className='submit-btn'
								key='submit'
								type='primary'
								onClick={handleSuccessFailureUpdateStageModalOk}
							>
								OK
							</Button>
						</div>
					</CustomModal>
				);
			};

			const [showSuccessFailureUpdateStageModal, setShowSuccessFailureUpdateStageModal] =
				useState(false);

			const [updateStageSuccessFailureMessage, setUpdateStageSuccessFailureMessage] = useState('');

			const handleSuccessFailureUpdateStageModalOk = () => {
				closeModal();
				setShowSuccessFailureUpdateStageModal(false);
				// props.updateOpportunityView();
			};

			useEffect(() => {
				if (opportunityStageList && opportunityStageList.lookUpValues !== []) {
					const stageDropdown = opportunityStageList.lookUpValues.filter((stage) => {
						return stage.display_value === activeStageDisplayValue ? true : false;
					});

					if (stageDropdown.length >= 1) {
						setActiveStageDataValue(stageDropdown[0].data_value);
					}
				}
			}, [activeStageDisplayValue, opportunityStageList]);

			useEffect(() => {
				if (status === props.detail.status) {
					setActiveStageDisplayValue(props.detail.stage);
					setProbability(props.detail.probability);
				} else {
					setActiveStageDisplayValue('');
					setProbability('');
				}
			}, [status]);

			useEffect(() => {
				setEditStageValues((prevValue) => ({
					...prevValue,
					Stage: activeStageDataValue
				}));
				getProbablityByStageApi(activeStageDataValue).then((res) => {
					setProbability(res.data);
				});
			}, [activeStageDataValue]);

			useEffect(() => {
				getOpportunityDependentDataApi(status === 'CLOSED' ? 'CLOSE' : 'OPEN').then((res) => {
					setOpportunityStageList(res.data);
				});
				setEditStageValues((prevValue) => ({
					...prevValue,
					IsOpen: status === 'OPEN' ? true : false
				}));
			}, [status]);

			useEffect(() => {
				setEditStageValues((prevValue) => ({
					...prevValue,
					Probability: probability
				}));
				form.setFieldsValue({
					probability: probability
				});
			}, [probability]);

			function closeModal() {
				props.setfn(false);
			}

			const onUpdate = (values) => {
				updateOpportunityStageDetailApi(editStageValues).then((res) => {
					setUpdateStageSuccessFailureMessage(res.data.message);
					setShowSuccessFailureUpdateStageModal(true);
					res.data === true && props.onUpdateView(true);
				});
			};

			useEffect(() => {}, [editStageValues]);

			return (
				<>
					<RenderUpdateStageSuccessFailureModal />
					<Modal
						centered
						visible={props.modal}
						onCancel={closeModal}
						footer={null}
						className='update-stage-modal'
						width={800}
					>
						<div>
							<Title level={3} style={{ color: '#354081' }}>
								Update Stage
							</Title>
							<Divider style={{ opacity: 0 }} />
							<Form layout='vertical' onFinish={onUpdate} form={form}>
								<Row>
									<Col span={12}>
										<Form.Item label='Status'>
											<Radio.Group
												value={status}
												size='large'
												onChange={(e) => {
													setStatus(e.target.value);
												}}
											>
												<Radio.Button className='lead-type-rb' value='OPEN'>
													Open
												</Radio.Button>
												<Radio.Button className='lead-type-rb' value='CLOSED'>
													Close
												</Radio.Button>
											</Radio.Group>
										</Form.Item>
									</Col>
									<Col span={12}>
										<Row>
											<Col span={16}>
												<Form.Item label='Stage'>
													<Select
														// defaultValue={`${
														//   opportunityStageList.lookUpValues[active][
														//     opportunityStageList.returnColumn
														//   ]
														// }-${active}`}
														// defaultValue={
														//   status === props.detail.status
														//     ? props.detail.stage
														//     : activeStageDisplayValue
														// }
														style={{ width: '100%' }}
														size='large'
														placeholder='Select'
														value={activeStageDisplayValue}
														defaultValue={activeStageDisplayValue}
														onChange={(value, index) => {
															setActiveStageDisplayValue(index.children);
														}}
														rules={opportunityViewRules ? opportunityViewRules.stage : []}
														required
													>
														{opportunityStageList &&
															opportunityStageList.lookUpValues &&
															opportunityStageList.lookUpValues.map((item, index) => {
																return (
																	<Option
																		key={index}
																		value={`${item[opportunityStageList.returnColumn]}-${index}`}
																	>
																		{item[opportunityStageList.displayColumn]}
																	</Option>
																);
															})}
													</Select>
												</Form.Item>
											</Col>
											<Col span={6} offset={1}>
												<Form.Item
													label='Probability'
													name='probability'
													rules={opportunityViewRules ? opportunityViewRules.probability : []}
												>
													<Input
														size='large'
														defaultValue={probability}
														value={probability}
														disabled={true}
													></Input>
												</Form.Item>
											</Col>
										</Row>
									</Col>
									<Col span={24}>
										{status === 'CLOSED' && (
											<Row>
												{activeStageDisplayValue === 'Closed Won' ? (
													<ClosedWonForm
														detail={props.detail}
														controlStructure={controlStructure}
														opportunityViewRules={opportunityViewRules}
														onSelectClosedWonValues={(value) => {
															setEditStageValues(value);
														}}
													/>
												) : (
													<ClosedLossForm
														detail={props.detail}
														controlStructure={controlStructure}
														opportunityViewRules={props.opportunityViewRules}
														onSelectCloseReason={(value) => {
															setEditStageValues(value);
														}}
													/>
												)}
												<Col span={12}>
													<Form.Item
														label='Closure Date'
														name='closeDate'
														style={{
															width: '100%'
														}}
														rules={opportunityViewRules ? opportunityViewRules.duedate : []}
														required
													>
														<DatePicker
															style={{
																width: '100%'
															}}
															size='large'
															// defaultValue={
															//   moment(props.detail.expectedDate) || null
															// }
															defaultValue={
																controlStructure &&
																controlStructure.CloseDate &&
																controlStructure.CloseDate.defaultvalue
																	? moment.utc(
																			controlStructure.CloseDate.defaultvalue,
																			'DD-MM-YYYY'
																	  )
																	: null
															}
															format='DD-MM-YYYY'
															onChange={(value) => {
																setEditStageValues((prevValue) => ({
																	...prevValue,
																	CloseDate: moment.utc(value)
																}));
															}}
														/>
													</Form.Item>
												</Col>
											</Row>
										)}
									</Col>
									<Col span={24}>
										<Form.Item label='Remark' name='remark'>
											<TextArea
												rows={5}
												placeholder='Enter'
												defaultValue={props.detail.remarks}
												onChange={(e) => {
													setEditStageValues((prevValue) => ({
														...prevValue,
														Remark: e.target.value
													}));
												}}
												rules={opportunityViewRules ? opportunityViewRules.remark : []}
											/>
										</Form.Item>
									</Col>
									<Col style={{ marginLeft: 'auto' }}>
										<Space>
											<Button type='text' size='large' onClick={closeModal}>
												Cancel
											</Button>
											<Button
												style={{
													borderRadius: '10px',
													background: '#354081',
													color: 'white'
												}}
												size='large'
												htmlType='submit'
											>
												Update
											</Button>
										</Space>
									</Col>
								</Row>
							</Form>
						</div>
					</Modal>
				</>
			);
		};
		const ClosedWonForm = ({
			detail,
			controlStructure,
			opportunityViewRules,
			onSelectClosedWonValues
		}) => {
			const [currencyDataValue, setCurrencyDataValue] = useState(detail.currency);
			const [closureAmount, setClosureAmount] = useState(detail.targetAmount);

			return (
				<Col span={12}>
					<Form.Item
						label='Closure Amount'
						name='closureAmount'
						rules={opportunityViewRules ? opportunityViewRules.amount : []}
						required
					>
						<Input.Group compact>
							<Select
								size='large'
								value={currencyDataValue}
								defaultValue={currencyDataValue}
								placeholder='Select'
								onChange={(value) => {
									setCurrencyDataValue(value);
									onSelectClosedWonValues((prevValue) => ({
										...prevValue,
										PreferredCurrency: value
									}));
								}}
							>
								{controlStructure &&
									controlStructure.PreferredCurrency &&
									controlStructure.PreferredCurrency.dropDownValue &&
									controlStructure.PreferredCurrency.dropDownValue.length > 0 &&
									controlStructure.PreferredCurrency.dropDownValue.map((item, index) => (
										<Option value={item.dataValue} key={index}>
											{item.displayValue}({item.dataValue})
										</Option>
									))}
							</Select>
							<Input
								className='quantity'
								style={{ width: '70%' }}
								type='number'
								placeholder='Enter'
								defaultValue={closureAmount}
								size='large'
								onChange={(value) => {
									setClosureAmount(value);
									onSelectClosedWonValues((prevValue) => ({
										...prevValue,
										Amount: value
									}));
								}}
							/>
						</Input.Group>
					</Form.Item>
				</Col>
			);
		};
		const ClosedLossForm = ({ controlStructure, opportunityViewRules, onSelectCloseReason }) => {
			return (
				<Col span={12}>
					<Form.Item
						label='Reason'
						name='closeReason'
						rules={opportunityViewRules ? opportunityViewRules.closereason : []}
						required
					>
						<Select
							style={{ width: '100%' }}
							size='large'
							placeholder='Select'
							onChange={(value) => {
								onSelectCloseReason((prevValue) => ({
									...prevValue,
									CloseReason: value
								}));
							}}
						>
							{controlStructure &&
								controlStructure.CloseReason &&
								controlStructure.CloseReason.dropDownValue &&
								controlStructure.CloseReason.dropDownValue.length > 0 &&
								controlStructure.CloseReason.dropDownValue.map((item, index) => (
									<Option value={item.dataValue} key={index}>
										{item.displayValue}
									</Option>
								))}
						</Select>
					</Form.Item>
				</Col>
			);
		};
		const LabelDiv = (props) =>
			props.label && (
				<div style={{ marginRight: '15px', width: 'auto' }} className='verticalTimelineDetailText'>
					{props.label}
				</div>
			);
		const TimelineUpgradeIcon = () => (
			<div
				style={{
					backgroundColor: '#05BC6A',
					padding: '6px',
					borderRadius: '50%'
				}}
			>
				<FontAwesomeIcon
					icon={faChevronDoubleUp}
					className='opportunityViewBodyDetailIcon'
					style={{ color: 'white' }}
				/>
			</div>
		);

		const TimelineDowngradeIcon = () => (
			<div
				style={{
					backgroundColor: '#BC4705',
					padding: '6px',
					borderRadius: '50%'
				}}
			>
				<FontAwesomeIcon
					icon={faChevronDoubleDown}
					className='opportunityViewBodyDetailIcon'
					style={{ color: 'white' }}
				/>
			</div>
		);

		const TimelineEditIcon = () => (
			<div
				style={{
					backgroundColor: '#E5EBFF',
					padding: '6px',
					borderRadius: '50%'
				}}
			>
				<FontAwesomeIcon
					icon={faPencilAlt}
					className='opportunityViewBodyDetailIcon'
					style={{ color: '#696A91' }}
				/>
			</div>
		);

		const OpportunityTimeline = (props) => {
			const [show, setShow] = useState(false);
			const TimelineList = props.data;

			if (!TimelineList || TimelineList.count === 0) {
				return (
					<Col className='opporunityDescriptionText' type='flex' align='middle' span={24}>
						No Records Found
					</Col>
				);
			}
			return (
				<div>
					<div
						className='opportunities-timeline'
						style={{ display: 'flex', justifyContent: 'start' }}
					>
						<Timeline mode='left' style={{ marginTop: '25px' }}>
							{(show ? TimelineList : TimelineList.slice(0, 4)).map((item, index) => {
								return (
									<Timeline.Item
										key={index}
										className='opportunities-timeline-item'
										style={{ marginBottom: '15px' }}
										label={
											<LabelDiv
												label={
													item.inputDateTime && moment(item.inputDateTime).format(getDateFormat())
												}
											/>
										}
										dot={
											item.stageStatus === 'Edit' ? (
												<TimelineEditIcon />
											) : item.stageStatus === 'Downgrade' ? (
												<TimelineDowngradeIcon />
											) : (
												<TimelineUpgradeIcon />
											)
										}
									>
										<div style={{ marginLeft: '10px' }}>
											{(item.stage || item.stageMessages) && (
												<>
													<span className='descriptionText'>
														{item.stageMessages} <span className='detailText'>{item.stage}</span>
													</span>
													<br />
												</>
											)}
											{(item.targetAmount || item.targetAmountMessages) && (
												<>
													<span className='descriptionText'>
														{item.targetAmountMessages}{' '}
														<span className='detailText'>${item.targetAmount + ' '}</span>
														{item.targetAmountStatus === 'Upgrade' ? (
															<FontAwesomeIcon icon={faCaretUp} style={{ color: '#05BC6A' }} />
														) : (
															<FontAwesomeIcon icon={faCaretDown} style={{ color: '#BC4705' }} />
														)}
													</span>
													<br />
												</>
											)}
											{item.createdMessages ? (
												<>
													<span className='descriptionText'>{item.createdMessages}</span>
												</>
											) : (
												(item.dueDate || item.dueDateMessages) && (
													<>
														<span className='descriptionText'>
															{item.dueDateMessages}{' '}
															<span className='detailText'>
																{item.dueDate && moment(item.dueDate).format(getDateFormat())}
															</span>
														</span>
													</>
												)
											)}
										</div>
									</Timeline.Item>
								);
							})}
						</Timeline>
					</div>
					{TimelineList.length > 4 ? (
						<div style={{ marginLeft: '11em' }}>
							<Button type='text' onClick={() => setShow(!show)}>
								{show ? (
									<FontAwesomeIcon
										icon={faChevronUp}
										className='opportunityViewBodyDetailIcon'
										style={{
											color: '#5D6DD1',
											marginRight: '5px'
										}}
									/>
								) : (
									<FontAwesomeIcon
										icon={faChevronDown}
										className='opportunityViewBodyDetailIcon'
										style={{
											marginRight: '5px',
											color: '#5D6DD1'
										}}
									/>
								)}
								<u style={{ color: '#5D6DD1' }} className='descriptionText'>
									{show ? 'Collapse' : 'See full'} timeline
								</u>
							</Button>
						</div>
					) : null}
				</div>
			);
		};

		const contentListNoTitle = {
			OpportunityDetails: (
				<OpportunityDetails
					data={opportunityDetail}
					opportunityViewRules={opportunityViewRules}
					controlStructure={controlStructure}
					fullControlStructure={fullControlStructure}
					onUpdateView={props.onUpdateView}
					onUpdateDetail={props.onUpdateDetail}
				/>
			),
			Timeline: <OpportunityTimeline data={timelines} />
		};

		const [noTitleKey, setnoTitleKey] = useState('OpportunityDetails');
		const onTabChange = (key, type) => {
			setnoTitleKey(key);
		};

		return (
			<>
				<Card
					className='opportunityViewCardDetail'
					bordered={false}
					style={{ width: '100%' }}
					tabList={tabListNoTitle}
					activeTabKey={noTitleKey}
					onTabChange={(key) => {
						onTabChange(key, 'noTitleKey');
					}}
				>
					{contentListNoTitle[noTitleKey]}
				</Card>
				<ProfileBannerList profileBannerList={props.detail} />
				<ContactDetails contactDetails={props.detail} />
				<AttachmentPanel attachmentPanel={props.detail} />
				<ValidationDetail validationDetails={props.detail} />
				<RelationDetail relationDetail={props.detail} />
				<SourceDetail sourceDetail={props.detail} />
				<OtherDetail otherDetail={props.detail} />
				<RiskProfile riskProfile={props.detail} />
			</>
		);
	};
}

export default CustomerDetail;
