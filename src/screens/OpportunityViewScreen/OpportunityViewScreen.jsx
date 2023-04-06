import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
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
import {
	getOpportunityViewApi,
	deleteOpportunityApi,
	getProbablityByStageApi,
	updateOpportunityStageDetailApi,
	getOpportunityDependentDataApi,
	postNotesOnOpportunityViewApi,
	getNotesOnOpportunityViewApi
} from '../../api/opportunityViewApi';
import './OpportunityViewScreen.scss';
import 'antd/dist/antd.css';
import {
	Button,
	Layout,
	PageHeader,
	Card,
	Row,
	Col,
	Input,
	Modal,
	Form,
	Divider,
	Skeleton,
	Space,
	Typography,
	Radio,
	Select,
	DatePicker,
	Timeline,
	Tooltip,
	Table
} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import {
	faMapMarkerAlt,
	faPhoneAlt,
	faEnvelope,
	faArrowLeft,
	faCaretUp,
	faCaretDown
} from '@fortawesome/pro-solid-svg-icons';
import {
	faTrashAlt,
	faEdit,
	faChevronRight,
	faChevronLeft,
	faPencilAlt,
	faChevronDoubleDown,
	faChevronDoubleUp
} from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fetchAsset } from '../../utils/utils';
import CustomModal from '../../components/Modal/CustomModal/CustomModal';
import moment from 'moment';
import { faChevronUp, faChevronDown, faPlus } from '@fortawesome/pro-light-svg-icons';
// import CommentBoxCard from '../../components/CommentBox/CommentBoxCard';
import OpportunityProgressDetails from './OpportunityProgressDetails';
// import OpportunityAttachmentDetails from './OpportunityAttachmentDetails';
import GenericCard from '../../components/GenericCard/GenericCard';
import AttachmentUploadModal from '../../components/AttachmentPannel/AttachmentUploadModal';
import RupeeOrNonRupee from '../../components/RupeeOrNonRupee/RupeeOrNonRupee';
import BackToTop from '../../components/BackToTop/BackToTop';
import { authorizeModule } from '../../utils/utils';
import { CONSTANTS } from '../../constants/constants';

const { Content } = Layout;
const { Text, Title } = Typography;
const { Option } = Select;

function OpportunityViewScreen(props) {
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
		controlStructureAdd,
		leftPanel
	} = props;

	const location = useLocation();
	const { opportunityIds, rowIndex, miniMode } = location?.state;
	const [errorMsg, setErrorMsg] = useState('');
	const history = useHistory();
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showSuccessFailureDeleteModal, setShowSuccessFailureDeleteModal] = useState(false);
	const [currentRowCount, setcurrentRowCount] = useState(rowIndex);
	const [opportunityId, setOpportunityId] = useState(opportunityIds[currentRowCount]);
	const [deleteOpportunityMessage, setDeleteOpportunityMessage] = useState('');
	const [opportunityViewRules, setOpportunityViewRules] = useState();
	const [onUpdateView, setOnUpdateView] = useState(false);
	const [opportunityData, setOpportunityData] = useState(opportunityViewData);

	let authorizeCode = '';
	leftPanel &&
		leftPanel.map((menu) => {
			menu.subMenu.map((subMenu) => {
				if (subMenu.subMenuId == 'OPPORTUNITYADD') authorizeCode = subMenu.authorizeCode;
			});
		});
	useEffect(() => {
		// excecuteGetOpportunityViewCs();
		excecuteGetOpportunityAddCs();
	}, []);

	useEffect(() => {
		fullControlStructureAdd &&
			fullControlStructureAdd[1] &&
			fullControlStructureAdd[1].controlStructureField &&
			setOpportunityViewRules(createValidators(fullControlStructureAdd[1].controlStructureField));
	}, [fullControlStructureAdd]);

	useEffect(() => {}, [opportunityViewRules]);

	useEffect(() => {
		setOpportunityId(opportunityIds[currentRowCount]);
	}, [currentRowCount]);

	useEffect(() => {
		excecuteGetOpportunityView(opportunityId, setErrorMsg);
	}, [opportunityId]);

	useEffect(() => {
		excecuteGetOpportunityView(opportunityId, setErrorMsg);
	}, [onUpdateView]);

	useEffect(() => {
		onUpdateView === true &&
			getOpportunityViewApi(opportunityId).then((res) => {
				setOpportunityData(res.data);
			});
	}, [onUpdateView]);

	useEffect(() => {
		setOpportunityData(opportunityViewData);
	}, [opportunityViewData]);

	function handleEditClick() {
		const opportunityEditDetail = {
			RefID: opportunityViewData.refID,
			RelationshipManager: opportunityViewData.relationshipManager,
			Branch: opportunityViewData.branchName,
			OpportunityName: opportunityViewData.opportunityName,
			OpportunityType: opportunityViewData.opportunityType,
			ProductOrService: opportunityViewData.productOrService,
			StartDate:
				opportunityViewData.creationDate !== null
					? moment(JSON.stringify(opportunityViewData.creationDate), 'YYYY-MM-DD')
					: '',
			Stage: opportunityViewData.stage,
			Probability: opportunityViewData.probability,
			TargetAmount: opportunityViewData.targetAmount,
			DueDate:
				opportunityViewData.duedate !== null
					? moment(JSON.stringify(opportunityViewData.duedate), 'YYYY-MM-DD')
					: '',
			CloseReason: opportunityViewData.closeReason,
			Remark: opportunityViewData.remark,
			CloseDate: opportunityViewData.closeDate,
			miscellaneous: props?.opportunityMiscellaneousDetail?.miscellaneous
		};

		executeSaveOpportunityEditDetail(opportunityEditDetail);
		const toObject = {
			pathname: '/dashboard/MyOpportunity/OpportunityCreate',
			state: {
				screen: 'view',
				data: {
					...opportunityViewData,
					attachments: opportunityAttachments,
					miscellaneous: opportunityMiscellaneousDetail
				},
				opportunityIds: opportunityIds,
				rowIndex: currentRowCount,
				miniMode: miniMode,
				mode: 'edit'
			}
		};
		// const prospectEditDetail = {};
		// executeSaveProspectEditDetail(prospectEditDetail);
		history.push(toObject);
		// history.push("/dashboard/MyOpportunity/OpportunityCreate");
	}

	function handlePreviousClick() {
		if (currentRowCount !== 0) {
			setcurrentRowCount(currentRowCount - 1);
		}
	}

	function handleNextClick() {
		if (opportunityIds.length === currentRowCount) {
			setcurrentRowCount(0);
		} else {
			setcurrentRowCount(currentRowCount + 1);
		}
	}

	const handleConfirmDeleteModalOk = () => {
		deleteOpportunityApi(opportunityData.opportunityId).then((res) => {
			setShowSuccessFailureDeleteModal(true);
			setDeleteOpportunityMessage(res.data[0].message);
			setShowDeleteModal(false);
		});
	};

	const handleSuccessFailureDeleteModalOk = () => {
		setShowSuccessFailureDeleteModal(false);
		history.push('/dashboard/MyOpportunity');
	};

	const handleConfirmDeleteModalCancel = () => {
		setShowDeleteModal(false);
	};

	const RenderSuccessFailureDeleteModal = () => {
		return (
			<CustomModal
				visible={showSuccessFailureDeleteModal}
				handleOk={handleSuccessFailureDeleteModalOk}
			>
				<div className='modal-header' style={{ display: 'flex', alignItems: 'center' }}>
					<div className='header-icon'>
						<FontAwesomeIcon icon={faTrashAlt} />
					</div>
					<div className='header-title'>Delete Opportunity</div>
				</div>
				<div className='modal-body'>{deleteOpportunityMessage}</div>
				<div className='modal-footer'>
					<Button
						className='submit-btn'
						key='submit'
						type='primary'
						onClick={handleSuccessFailureDeleteModalOk}
					>
						OK
					</Button>
				</div>
			</CustomModal>
		);
	};

	const RenderConfirmDeleteModal = () => {
		return (
			<CustomModal
				visible={showDeleteModal}
				handleCancel={handleConfirmDeleteModalCancel}
				handleOk={handleConfirmDeleteModalOk}
			>
				<div className='modal-header' style={{ display: 'flex', alignItems: 'center' }}>
					<div className='header-icon'>
						<FontAwesomeIcon icon={faTrashAlt} />
					</div>
					<div className='header-title'>Delete Opportunity</div>
				</div>
				<div className='modal-body'>
					Are you sure you want to delete this particular opportunity ?
				</div>
				<div className='modal-footer'>
					<Button
						className='text-only-btn'
						key='back'
						type='text'
						onClick={handleConfirmDeleteModalCancel}
					>
						Cancel
					</Button>
					<Button
						className='submit-btn'
						key='submit'
						type='primary'
						onClick={handleConfirmDeleteModalOk}
					>
						Delete
					</Button>
				</div>
			</CustomModal>
		);
	};

	if (
		!opportunityData ||
		opportunityData.opportunityId !== opportunityId ||
		opportunityData.opportunityId !== opportunityIds[currentRowCount]
	) {
		return (
			<div>
				<Skeleton active avatar paragraph={{ rows: 6 }} />
				<div style={{ marginLeft: '50px', marginTop: '20px' }}>
					<Skeleton active />
					<Skeleton active />
					<Skeleton active />
				</div>
			</div>
		);
	}
	return (
		<>
			<RenderConfirmDeleteModal />
			<RenderSuccessFailureDeleteModal />
			<PageHeader
				className='opportunityViewPageHeader'
				// onBack={() => history.push("/dashboard/MyOpportunity")}
				onBack={() => history.goBack()}
				backIcon={<FontAwesomeIcon icon={faArrowLeft} className='opportunityViewTopBarIcons' />}
				extra={[
					<Tooltip title='Delete'>
						{authorizeModule(authorizeCode, CONSTANTS.authorizeCode.delete) && (
							<FontAwesomeIcon
								icon={opportunityData.isOpen === 'OPEN' && faTrashAlt}
								onClick={() => setShowDeleteModal(true)}
								className='opportunityViewTopBarIcons'
								key='faTrashAlt'
							/>
						)}
					</Tooltip>,
					<Tooltip title='Edit'>
						{authorizeModule(authorizeCode, CONSTANTS.authorizeCode.modify) && (
							<FontAwesomeIcon
								icon={opportunityData.isOpen === 'OPEN' && faEdit}
								onClick={handleEditClick}
								className='opportunityViewTopBarIcons'
								key='faEdit'
							/>
						)}
					</Tooltip>,
					<Tooltip title='Previous'>
						<FontAwesomeIcon
							icon={!miniMode && faChevronLeft}
							onClick={handlePreviousClick}
							className='opportunityViewTopBarIcons'
							key='faChevronLeft'
						/>
					</Tooltip>,
					<Tooltip title='Next'>
						<FontAwesomeIcon
							icon={!miniMode && faChevronRight}
							onClick={handleNextClick}
							className='opportunityViewTopBarIcons'
							key='faChevronRight'
						/>
					</Tooltip>
				]}
				style={{
					backgroundImage: 'linear-gradient(to right, #354081 , #727EC6 )',
					borderBottomRightRadius: '12px',
					borderBottomLeftRadius: '12px'
				}}
			>
				<Content>{opportunityTopHeader(opportunityData)}</Content>
			</PageHeader>
			<div className='opportunityViewBodyContent'>
				<OpportunityProgressDetails data={horizontalTimelineDetail} />
				<OpportunityDetailAndTimelineTabDetails
					detail={opportunityData}
					timelines={verticalTimelineDetail}
					opportunityViewRules={opportunityViewRules}
					fullControlStructure={fullControlStructureAdd}
					controlStructure={controlStructureAdd}
					onUpdateDetail={onUpdateView}
					onUpdateView={(value) => setOnUpdateView(!onUpdateView)}
				/>
				<CommentComponent opportunityId={opportunityId} />
				{/* <CommentBoxCard
					form={form}
					formData={oppFormData}
					onValuesChange={handleOppFormChange}
					rules={rules.length > 0 ? rules[0] : undefined}
					removeAttachment={removeAttachment}
					csObject={csObject[0]}
					id={oppFormData.opportunityId}
				/> */}
				{/* <OpportunityAttachmentDetails
          attachments={opportunityAttachments}
          opportunityId={opportunityData.opportunityId}
        />
         */}
				<Col span={24} style={{ marginTop: '20px' }}>
					<AttachmentUploadModal
						type={'OPPORTUNITYADD'}
						// selectedAccount={{ scheme: clientObject.customerCode }}
						// selectedAccount={opportunityData.opportunityId}
						selectedAccount={{
							scheme: opportunityData?.opportunityId,
							refType: 'OPPORTUNITYADD'
						}}
						data={opportunityAttachments}
						// authData = {authData}
						action={'view'}
					/>
				</Col>
				<Col style={{ marginTop: '20px' }}>
					{OpportunityMiscellaneousDetails(opportunityMiscellaneousDetail)}
				</Col>

				<BackToTop />
			</div>
		</>
	);
}

const OpportunityMiscellaneousDetails = (props) => {
	const TextSubText = (props) => {
		return (
			<Row>
				<Space direction='vertical' size={0}>
					<Space>
						<Text>
							<span className='opportunityDetailText' style={{ color: '#696a91' }}>
								{props.text}
							</span>
						</Text>
					</Space>
					<Row justify='space-between'>
						<Col>
							<Text style={{ color: '#2c2d33' }}>
								<span className='opportunityDescriptionText'> {props.subtext}</span>
							</Text>
						</Col>
						<Col>
							<Text style={{ color: '#2c2d33' }}>
								<span className='opportunityDescriptionText'>
									{props.endsubtext ? props.endsubtext : ''}
								</span>
							</Text>
						</Col>
					</Row>
				</Space>
			</Row>
		);
	};
	if (!props?.miscellaneous) {
		return (
			<Col className='opportunityDescriptionText' type='flex' align='middle' span={24}>
				No Records Found
			</Col>
		);
	}

	return (
		<>
			<GenericCard header={'Miscellaneous'} menuFlag={false} className='opportunityViewCardDetail'>
				{/* <Card
        className="opportunityViewCardDetail"
        bordered={false}
        title="Miscellaneous"
        style={{ width: "100%", marginTop: "15px", marginBottom: "15px" }}
      > */}
				<Space direction='vertical' style={{ width: '100%' }} size={5}>
					<Row>
						{props.miscellaneous.length === 0 ? (
							<Col className='opportunityDescriptionText' type='flex' align='middle' span={24}>
								No Records Found
							</Col>
						) : (
							props.miscellaneous.map((item, index) => {
								return (
									<Col span={8} key={index}>
										<TextSubText text={item.fieldLabel} subtext={item.fieldValueName} />
									</Col>
								);
							})
						)}
					</Row>
				</Space>
			</GenericCard>
		</>
	);
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
									detail.currencySymbol === null && detail.currencySymbol === '' ? (
										detail.currencySymbol + detail.targetAmount
									) : (
										<>
											{detail.currency} <RupeeOrNonRupee amount={detail.targetAmount} />
										</>
									)
								}
								subtext='Target Amount'
							/>
						) : detail.status === 'CLOSED' ? (
							<TextSub
								text={
									detail.currencySymbol === null && detail.currencySymbol === '' ? (
										detail.currencySymbol + detail.closureAmount
									) : (
										<>
											{detail.currency} <RupeeOrNonRupee amount={detail.closureAmount} />
										</>
									)
								}
								subtext='Closure Amount'
							/>
						) : (
							<TextSub
								text={
									detail.currencySymbol === null && detail.currencySymbol === '' ? (
										detail.currencySymbol + detail.targetAmount
									) : (
										<>
											{detail.currency} <RupeeOrNonRupee amount={detail.targetAmount} />
										</>
									)
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
						<TextSub
							// flag={detail.countryCode}
							text={detail.currency}
							subtext='Currency'
						/>
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
						<TextSub text={detail.branchName} subtext='Office' />
					</Col>
					<Col span={8}>
						<TextSub
							text={moment(detail.opportunityCreationDate).format(getDateFormat())}
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
	const [probability, setProbability] = useState(props && props.detail && props.detail.probability);
	const [stageErrormsg, setStageErrormsg] = useState('');
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
		CloseDate: null
		// controlStructure &&
		// controlStructure.CloseDate &&
		// controlStructure.CloseDate.defaultvalue
		//   ? moment.utc(controlStructure.CloseDate.defaultvalue).toISOString()
		//   : "",
	});

	useEffect(() => {
		if (probability !== '') {
			setStageErrormsg('');
		}
	}, [probability]);

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
		if (opportunityStageList && opportunityStageList.lookUpValues.length !== 0) {
			const stageDropdown = opportunityStageList.lookUpValues.filter((stage) => {
				return stage.display_value === activeStageDisplayValue ? true : false;
			});

			if (stageDropdown.length >= 1) {
				setActiveStageDataValue(stageDropdown[0].data_value);
			}
		}
	}, [activeStageDisplayValue, opportunityStageList]);

	useEffect(() => {
		setStageErrormsg('');
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
		if (editStageValues.Probability === '') {
			setStageErrormsg('*stage cannot be empty');
		}
		if (editStageValues?.Probability !== '') {
			updateOpportunityStageDetailApi(editStageValues).then((res) => {
				setUpdateStageSuccessFailureMessage(res.data.message);
				setShowSuccessFailureUpdateStageModal(true);
				res.data.success === true && props.onUpdateView(true);
			});
		}
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
										<Form.Item
											label='Stage'
											rules={props.opportunityViewRules ? props.opportunityViewRules.stage : []}
											// name={"activeStageDisplayValue"}
										>
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
												// onChange={(val) => {
												//   setActive(val.split("-").pop());
												// }}
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
											<span style={{ color: '#ff4d4f' }}>{stageErrormsg}</span>
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
												rules={props.opportunityViewRules ? props.opportunityViewRules.duedate : []}
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
														// controlStructure &&
														// controlStructure.CloseDate &&
														// controlStructure.CloseDate.defaultvalue
														//   ? moment.utc(
														//       controlStructure.CloseDate.defaultvalue,
														//       "DD-MM-YYYY"
														//     )
														//   :
														null
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

const OpportunityCommentBox = () => {
	return (
		<>
			<Card
				className='opportunityViewCardDetail'
				bordered={false}
				title='Attachments'
				extra={
					<Button
						type='text'
						style={{ color: '#354081', fontSize: '16px' }}
						//onClick={() => setAddAttachmentModalVisible(true)}
					>
						Add <FontAwesomeIcon icon={faPlus} style={{ marginLeft: '5px' }} />
					</Button>
				}
				style={{ width: '100%', marginTop: '15px', marginBottom: '15px' }}
			>
				<Content></Content>
			</Card>
		</>
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
				rules={opportunityViewRules ? opportunityViewRules?.amount : []}
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

const LabelDiv = (props) =>
	props.label && (
		<div style={{ marginRight: '15px', width: 'auto' }} className='verticalTimelineDetailText'>
			{props.label}
		</div>
	);

const TimelineUpgradeIcon = () => (
	<div style={{ backgroundColor: '#05BC6A', padding: '6px', borderRadius: '50%' }}>
		<FontAwesomeIcon
			icon={faChevronDoubleUp}
			className='opportunityViewBodyDetailIcon'
			style={{ color: 'white' }}
		/>
	</div>
);

const TimelineDowngradeIcon = () => (
	<div style={{ backgroundColor: '#BC4705', padding: '6px', borderRadius: '50%' }}>
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
			<div className='opportunities-timeline' style={{ display: 'flex', justifyContent: 'start' }}>
				<Timeline mode='left' style={{ marginTop: '25px' }}>
					{(show ? TimelineList : TimelineList.slice(0, 5)).map((item, index) => {
						return (
							<Timeline.Item
								key={index}
								className='opportunities-timeline-item'
								style={{ marginBottom: '15px' }}
								label={
									<LabelDiv
										label={item.inputDateTime && moment(item.inputDateTime).format(getDateFormat())}
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
			{TimelineList.length > 5 ? (
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

const CommentComponent = ({ opportunityId }) => {
	const [comment, setComment] = useState(null);
	const [flag, setFlag] = useState(false);
	const [value, setValue] = useState(true);
	const [data, setData] = useState();
	const columns = [
		{
			title: 'Created By',
			dataIndex: 'inputtedBy',
			key: 'inputtedBy',
			width: 200
			// render: (_, record) => (
			// 	<Space size='middle' style={{ color: 'black' }}>
			// 		<div> {record.inputtedBy}</div>
			// 	</Space>
			// )
		},
		{
			title: 'Description',
			dataIndex: 'noteText',
			key: 'noteText',
			width: 650
			// render: (_, record) => (
			// 	<Space size='middle' style={{ color: 'black' }}>
			// 		<div> {record.noteText}</div>
			// 	</Space>
			// )
		},
		{
			title: 'Created On',
			key: 'inputDateTime',
			dataIndex: 'inputDateTime',
			width: 150,
			render: (_, record) => (
				<Space size='middle'>
					<div> {moment(record.inputDateTime).format(getDateFormat())}</div>
				</Space>
			)
		}
	];

	useEffect(() => {
		getNotesOnOpportunityViewApi(opportunityId).then((res) => setData(res.data?.notesList));
	}, [value]);

	const onSubmit = () => {
		setFlag(true);
		setTimeout(() => setFlag(false), 2000);
		comment?.length > 0 &&
			postNotesOnOpportunityViewApi(opportunityId, comment).then((res) => {
				if (res.data.success) {
					setValue(!value);
					setFlag(false);
					setComment('');
				} else {
				}
			});
	};
	return (
		<GenericCard header='Comments'>
			<Table columns={columns} dataSource={data} pagination={false} />
			<Row gutter={20}>
				<Col className='gutter-row' span={22}>
					<TextArea
						rows={2}
						placeholder='Add a comment...'
						onChange={(evt) => setComment(evt.target.value)}
						className='text-area-field'
						size='large'
						allowClear={true}
						value={comment}
						style={{ marginTop: '20px' }}
					/>
				</Col>
				<Button
					type='primary'
					onClick={onSubmit}
					className='btn submit'
					size='large'
					style={{ marginTop: '30px' }}
				>
					Submit
				</Button>
				{flag && !comment && (
					<Space style={{ color: '#D0342C', fontWeight: 'bold', marginLeft: '5px' }}>
						{' '}
						*Please enter a comment before submitting.
					</Space>
				)}
			</Row>
		</GenericCard>
	);
};
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
		opportunityCreationDate: props.detail.opportunityCreationDate,
		closeReason: props.detail.closeReason
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
		</>
	);
};
const opportunityTopHeader = (props) => {
	return (
		<>
			<Row justify='space-between' align='bottom'>
				<Col span={10}>
					<Row align='bottom' style={{ padding: '10px 0px' }}>
						<Col className='gutter-row' align='middle' span={8}>
							{props.profileImage ? (
								<div style={{ width: '85%', height: 'auto' }}>
									<img
										src={`data:image/jpeg;base64,${props.profileImage}`}
										className='opportunityCircleImg'
										alt='user-img'
									/>
								</div>
							) : (
								<div className='opportunityInitialsCircleImg'>{props.profileInitial}</div>
							)}
						</Col>
						<Col className='gutter-row' span={16}>
							<Row>
								<Title level={3} style={{ color: '#FFF', margin: 0 }} className='opportunityName'>
									{props.name}
								</Title>
							</Row>

							<Row style={{ alignItems: 'center', margin: '5px 0px' }}>
								<FontAwesomeIcon
									icon={faMapMarkerAlt}
									className='opportuntiyViewHeaderDetailIcon'
								/>
								<p className='opportunityDescriptionText' style={{ color: '#f0f2fb' }}>
									{props.address}
								</p>
							</Row>
							<Row style={{ alignItems: 'center', margin: '5px 0px' }}>
								<div className='opportunityTag'>{props.tagName}</div>
							</Row>
							<Row style={{ alignItems: 'center', margin: '5px 0px' }}>
								<FontAwesomeIcon icon={faPhoneAlt} className='opportuntiyViewHeaderDetailIcon' />
								<p className='opportunityDescriptionText' style={{ color: '#f0f2fb' }}>
									{props.mobile}
								</p>
							</Row>
							<Row style={{ alignItems: 'center', margin: '5px 0px' }}>
								<FontAwesomeIcon icon={faEnvelope} className='opportuntiyViewHeaderDetailIcon' />
								<p className='opportunityDescriptionText' style={{ color: '#f0f2fb' }}>
									{props.email}
								</p>
							</Row>
						</Col>
					</Row>
				</Col>

				<Col span={14}>
					<Row gutter={[16, 16]}>
						<Col className='gutter-row' span={8}>
							<Row gutter={16}>
								<p className='opportunityDetailText' style={{ color: '#f0f2fb' }}>
									{props.opportunityName}
								</p>
							</Row>
							<Row gutter={16}>
								<p className='opportunityDescriptionText' style={{ color: '#f0f2fb' }}>
									Opportunity
								</p>
							</Row>
						</Col>
						<Col className='gutter-row' span={8}>
							<Row gutter={16}>
								<p className='opportunityDetailText' style={{ color: '#f0f2fb' }}>
									{props.currencySymbol === null && props.currencySymbol === '' ? (
										props.targetAmount
									) : (
										// Philadelphia: currency code should be PHP which need to change and has PH
										<>
											{props.currencySymbol} <RupeeOrNonRupee amount={props.targetAmount} />
										</>
									)}
								</p>
							</Row>
							<Row gutter={16}>
								<p className='opportunityDescriptionText' style={{ color: '#f0f2fb' }}>
									Target Amount
								</p>
							</Row>
						</Col>
					</Row>
					<Row gutter={[16, 16]}>
						<Col className='gutter-row' span={8}>
							<Row gutter={16}>
								<p className='opportunityDetailText' style={{ color: '#f0f2fb' }}>
									{props.stage}
								</p>
							</Row>
							<Row gutter={16}>
								<p className='opportunityDescriptionText' style={{ color: '#f0f2fb' }}>
									Stage
								</p>
							</Row>
						</Col>
						<Col className='gutter-row' span={8}>
							<Row gutter={16}>
								<p className='opportunityDetailText' style={{ color: '#f0f2fb' }}>
									{props.probability}%
								</p>
							</Row>
							<Row gutter={16}>
								<p className='opportunityDescriptionText' style={{ color: '#f0f2fb' }}>
									Probability
								</p>
							</Row>
						</Col>
						<Col className='gutter-row' span={8}>
							<Row gutter={16}>
								<p className='opportunityDetailText' style={{ color: '#f0f2fb' }}>
									{moment(props.dueDate).format(getDateFormat())}
								</p>
							</Row>
							<Row gutter={16}>
								<p className='opportunityDescriptionText' style={{ color: '#f0f2fb' }}>
									Due date
								</p>
							</Row>
						</Col>
					</Row>
				</Col>
			</Row>
		</>
	);
};

const mapStateToProps = (state) => {
	const { opportunityView } = state;
	const opportunityViewData = opportunityView.opportunityViewData;
	const horizontalTimelineDetail = opportunityView.horizontalTimelineDetail;
	const verticalTimelineDetail = opportunityView.verticalTimelineDetail;
	const opportunityAttachments = opportunityView.opportunityAttachments;
	const opportunityMiscellaneousDetail = opportunityView.opportunityMiscellaneousDetail;
	const controlStructureAdd = opportunityView.opportunityAddControlStructure;
	const fullControlStructureAdd = opportunityView.opportunityAddControlStructureFull;
	const controlStructure = opportunityView.opportunityViewControlStructure;
	const fullControlStructure = opportunityView.opportunityViewControlStructureFull;
	return {
		opportunityView,
		opportunityViewData,
		horizontalTimelineDetail,
		verticalTimelineDetail,
		opportunityAttachments,
		opportunityMiscellaneousDetail,
		controlStructureAdd,
		fullControlStructureAdd,
		controlStructure,
		fullControlStructure,
		leftPanel: state.dashboard.leftPanel
	};
};

const mapDispatchToProps = {
	excecuteGetOpportunityAddCs,
	excecuteGetOpportunityViewCs,
	excecuteGetOpportunityView,
	executeOpportunityViewNextOrPreviousData,
	executeSaveOpportunityEditDetail,
	excecuteGetAttachmentDetail
};

export default connect(mapStateToProps, mapDispatchToProps)(OpportunityViewScreen);
