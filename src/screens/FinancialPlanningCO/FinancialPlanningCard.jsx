import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import GenericCard from '../../components/GenericCard/GenericCard';
import FundCards from './FundCards';
import SetGoals from './SetGoals';
import { Form, Button } from 'antd';
import ReactToPrint, { useReactToPrint } from 'react-to-print';
import {
	executeFinancialPlanningCOCs,
	setFinancialPlanningCOCs,
	executeFinancialPlanningGetGoal
} from '../../redux/actions/financialPlanningCOActions';
import {
	getFinancialCalculation,
	getFinancialPlanningGoalsCOApi,
	financialPlanningDeleteApi,
	financialPlanningEditApi,
	getIPSPDF
} from '../../api/financialPlanningCOApi';
import { getPortFolioQaList } from '../../api/accountCreateApi';
import RetirementPlanning from './RetirementPlanning';
import { formRulesAndCSObj } from '../../utils/utils';
import PostGoal from './PostGoal';
import IncomeProjections from './IncomeProjections';
// Risk Profile
import RiskProfileModal from '../../components/RiskProfileModal/RiskProfileModal';
import RiskProfileModal2 from '../../components/RiskProfileModal/RiskProfileModal2';
import RenderConfirmDeleteModalFO from './RenderConfirmDeleteModalFO';
import SuccessModal from '../../components/SuccessModal/SuccessModal';
import Modal from 'antd/lib/modal/Modal';
import './FinancialPlanning.scss';
import InvetstmentPolicyPrint from './InvestmentPolicyPdf/InvetstmentPolicyPrint';

const FinancialPlanningCard = ({ customer }) => {
	const dispatch = useDispatch();

	const controlStructure = useSelector((state) => state.financialPlanningCO.controlStructure);

	const authData = useSelector((state) => state?.auth?.user?.configResponse[0]?.value2);

	const { useForm } = Form;
	const [form] = useForm();
	const [showModal, setShowModal] = useState(false);
	const [controlStructureParsed, setControlStructure] = useState();
	const [retirementPlanning, setRetirementPlanning] = useState(false);
	const [openPostGoal, setOpenPostGoal] = useState(false);
	const [goalName, setGoalName] = useState('');
	const [goalType, setGoalType] = useState('');
	const [planningObject, setPlanningObject] = useState([]);
	const [checkprop, setCheckprop] = useState(false);
	const [formData, setFormData] = useState({});
	const [flag, setFlag] = useState(false);
	const [openIncomeProjections, setOpenIncomeProjections] = useState(false);
	const [fpoverviewData, setFPoverviewData] = useState([]);
	const [visible, setVisible] = useState(false);
	//DeleteGoalModal
	const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
	const [fid, setFid] = useState(null);
	const [rectype, setRectype] = useState(null);
	const [deleteCardName, setDeleteCardName] = useState(null);
	const [deleteMessage, setDeleteMessage] = useState(null);
	const [callFPGoalAPI, setCallFPGoalAPI] = useState(false);
	// Risk Profile
	const [showQueAnsModal, setShowQueAnsModal] = useState(false);
	const [isModal2Visible, setModal2Visibility] = useState(false);

	const [qaList, setQaList] = useState([]);
	const [selectedAnswer, setSelectedAnswer] = useState([]);
	const [riskProfileData, setRiskProfileData] = useState();
	const [riskProfileSecondScreenData, setRiskProfileSecondScreenData] = useState({});

	const [calculateEditToggle, setCalculateEditToggle] = useState(true);
	const [financialPlanningID, setFinancialPlanningID] = useState(null);
	const [pageId, setPageId] = useState(0);

	//Investment Pdf
	const [investmentData, setInvestmentData] = useState([]);
	const handlePrint = useReactToPrint({
		content: () => componentRef.current
	});

	const goalNamesList = controlStructureParsed?.csObject.find((each) => each.sectionName === 'Main')
		?.data?.goalName;

	const frequencyDropdown = controlStructureParsed?.csObject.find(
		(each) => each.sectionName === 'Main'
	)?.data?.frequency.dropDownValue;

	const componentRef = useRef();

	useEffect(() => {
		if (!controlStructure) {
			executeFinancialPlanningCOCs().then((res) => {
				dispatch(setFinancialPlanningCOCs(res));
			});
		}
	}, [controlStructure]);

	useEffect(() => {
		if (controlStructure) {
			setControlStructure(formRulesAndCSObj(controlStructure, form));
		}
	}, [controlStructure]);

	useEffect(() => {
		if (controlStructureParsed && goalType) {
			setPlanningObject(
				controlStructureParsed.csObject
					.filter((each) => each.sectionName === goalType)
					.reduce((prev, next) => {
						return { ...prev, ...next.data };
					}, {})
			);
			// Make it dynamic
			getPortFolioQaList(goalName, goalType).then((res) => {
				const { lstQuestionsAnswers } = res.data;
				setQaList(lstQuestionsAnswers && lstQuestionsAnswers.length > 0 ? lstQuestionsAnswers : []);
				setRiskProfileData(res.data);
			});
		}
	}, [goalType, controlStructureParsed]);

	useEffect(() => {
		pageId && handleCalculation();
		if (pageId === 0) {
			getFinancialPlanningGoalsCOApi({
				ClientID: customer,
				RecType: 'L'
			}).then((res) => setFPoverviewData(res.data));
		}
	}, [pageId, callFPGoalAPI]);

	//getInvestmentPdfApi
	useEffect(() => {
		getIPSPDF({
			ClientId: customer
		})
			.then((res) => setInvestmentData(res.data))
			.catch((err) => {
				return;
			});
	}, [customer]);

	useEffect(() => {
		form.setFieldsValue(formData);
	}, [formData]);

	const deleteAPI = (financialPlanningID, RecType) => {
		setCallFPGoalAPI(!callFPGoalAPI);
		financialPlanningDeleteApi(financialPlanningID, RecType).then((res) =>
			setDeleteMessage(res.data[0].message)
		);
	};

	const onFormPageSubmit = (whichPage) => {
		form
			.validateFields()
			.then((res) => {
				// console.log({ response2: res });
				switch (whichPage) {
					case 'RetirementPlanning':
						setFlag(true);
						if (!flag) setPageId(1);
						else setPageId(2);
						break;
					case 'IncomeProjections':
						setCalculateEditToggle(!calculateEditToggle);
						if (calculateEditToggle) setPageId(4);
						if (!calculateEditToggle) setPageId(null);
					default:
						console.log('Default case');
				}
			})
			.catch((res) => {
				console.error('ERROR FOUND', res);
			});
	};
	const backArrow = (modalName) => {
		switch (modalName) {
			case 'SetGoals':
				setShowModal(false);
				break;
			case 'RetirementPlanning':
				if (flag) {
					setFlag(false);
					setRetirementPlanning(true);
					setPageId(0);
				} else {
					setRetirementPlanning(false);
					beginGoalCreation();
				}
				break;
			case 'RiskProfileModal':
				setShowQueAnsModal(false);
				setRetirementPlanning(true);
				setPageId(1);
				break;
			case 'RiskProfileModal2':
				setModal2Visibility(false);
				setShowQueAnsModal(true);
				setPageId(2);

				break;
			case 'IncomeProjection':
				setCalculateEditToggle(true);
				setOpenIncomeProjections(false);
				if (qaList.length > 0) {
					setModal2Visibility(true);
					setPageId(2);
				} else {
					setRetirementPlanning(true);
					setPageId(1);
				}
				break;
			case 'PostGoals':
				setOpenPostGoal(false);
				setOpenIncomeProjections(true);
				// setPageId(3);
				break;
			default:
				console.info(modalName);
		}
	};

	const beginGoalCreation = () => {
		setGoalName('');
		setGoalType('');
		// setFormData({});
		form.resetFields();
		setSelectedAnswer([]);
		setRiskProfileSecondScreenData({});
		executeFinancialPlanningGetGoal().then((res) => {
			setFormData(res);
			setShowModal(true);
		});
	};

	const handleSwitchSuccess = (response) => {
		handleFormChange(response);
		switch (pageId) {
			case 1:
				setFlag(true);
				break;
			case 2:
				setRetirementPlanning(false);
				setFlag(false);
				setFinancialPlanningID(response?.financialplanninigid);
				qaList.length > 0 ? setShowQueAnsModal(true) : setOpenIncomeProjections(true);
				break;
			case 3:
				setModal2Visibility(false);
				setOpenIncomeProjections(true);
				break;
			case 4:
				//setCalculateEditToggle(!calculateEditToggle);
				break;
			case 5:
				setOpenPostGoal(false);
				setVisible(true);
			default:
				return;
		}
	};

	const handleSwitchFailure = (response) => {
		console.error(response);
		return;
	};

	const handleCalculation = () => {
		getFinancialCalculation(
			formData,
			goalName,
			goalType,
			customer,
			pageId,
			financialPlanningID,
			riskProfileSecondScreenData
		)
			.then((res) => {
				// console.log({ res: res.data });
				if (res?.data?.success) {
					handleSwitchSuccess(res?.data);
				} else {
					handleSwitchFailure(res?.data);
					setRetirementPlanning(false);
					setFlag(false);
					setVisible(true);
					setDeleteMessage(res.data.message);
				}
			})
			.catch((err) => {
				console.error(err);
			});
	};

	const handleFormChange = (values) => {
		setFormData({ ...formData, ...values });
	};

	const deleteCard = (fid, recType, cardName) => {
		setShowConfirmDeleteModal(true);
		setFid(fid);
		setRectype(recType);
		setDeleteCardName(cardName);
	};

	const editCard = (id) => {
		financialPlanningEditApi(id).then((res) => {
			const data = {
				...res.data.financialGoalModel,
				...res.data.goalInvestmentModels[0],
				...res.data.riskProfileModel
			};
			setGoalName(data.goalName);
			setGoalType(data.goalType);
			setFormData(data);
			setRetirementPlanning(true);
		});
	};
	// console.log({ formData });
	return (
		<>
			<SetGoals
				goalNamesList={goalNamesList}
				setShowModal={setShowModal}
				showModal={showModal}
				retirementPlanning={retirementPlanning}
				setRetirementPlanning={setRetirementPlanning}
				setGoalName={setGoalName}
				goalName={goalName}
				setGoalType={setGoalType}
				goalType={goalType}
				backArrow={backArrow}
			/>
			<Form form={form} onValuesChange={(e) => handleFormChange(e)}>
				<RetirementPlanning
					retirementPlanning={retirementPlanning}
					setRetirementPlanning={setRetirementPlanning}
					goalName={goalName}
					planningObject={planningObject}
					setFlag={setFlag}
					flag={flag}
					setFormData={setFormData}
					setPageId={setPageId}
					goalType={goalType}
					rules={controlStructureParsed?.rules}
					onFormPageSubmit={onFormPageSubmit}
					backArrow={backArrow}
					setCheckprop={setCheckprop}
					checkprop={checkprop}
				/>
				<IncomeProjections
					openIncomeProjections={openIncomeProjections}
					setOpenIncomeProjections={setOpenIncomeProjections}
					setOpenPostGoal={setOpenPostGoal}
					setPageId={setPageId}
					calculateEditToggle={calculateEditToggle}
					setCalculateEditToggle={setCalculateEditToggle}
					frequencyDropdown={frequencyDropdown}
					formData={formData}
					goalName={goalName}
					authData={authData}
					backArrow={backArrow}
					rules={controlStructureParsed?.rules}
					onFormPageSubmit={onFormPageSubmit}
				/>
				<PostGoal
					openPostGoal={openPostGoal}
					setOpenPostGoal={setOpenPostGoal}
					formData={formData}
					goalName={goalName}
					setPageId={setPageId}
					authData={authData}
					backArrow={backArrow}
					// beginGoalCreation={beginGoalCreation}
					setRetirementPlanning={setRetirementPlanning}
					deleteAPI={deleteAPI}
				/>
			</Form>
			<RiskProfileModal
				showQueAnsModal={showQueAnsModal}
				setShowQueAnsModal={setShowQueAnsModal}
				qaList={qaList}
				setSelectedAnswer={setSelectedAnswer}
				selectedAnswer={selectedAnswer}
				backArrow={backArrow}
				riskProfileData={riskProfileData}
				setRiskProfileSecondScreenData={setRiskProfileSecondScreenData}
				setModal2Visibility={setModal2Visibility}
				setPageId={setPageId}
			/>
			<RiskProfileModal2
				setModal2Visibility={setModal2Visibility}
				isModal2Visible={isModal2Visible}
				backArrow={backArrow}
				riskProfileData={riskProfileSecondScreenData}
				setRiskProfileData={setRiskProfileSecondScreenData}
				setPageId={setPageId}
			/>
			<RenderConfirmDeleteModalFO
				showConfirmDeleteModal={showConfirmDeleteModal}
				setShowConfirmDeleteModal={setShowConfirmDeleteModal}
				fid={fid}
				rectype={rectype}
				deleteAPI={deleteAPI}
				deleteCardName={deleteCardName}
				setVisible={setVisible}
			/>
			<Modal
				visible={visible}
				closable={false}
				footer={
					<Button
						onClick={() => {
							setVisible(false);
							setPageId(0);
							setDeleteMessage(null);
						}}
					>
						Ok
					</Button>
				}
				centered
			>
				<SuccessModal
					message={deleteMessage ? deleteMessage : formData?.message}
					failTickmark={
						deleteMessage === 'For this client selected Goal is already exists' ? true : null
					}
				/>
			</Modal>
			<div style={{ display: 'none' }}>
				<InvetstmentPolicyPrint
					ref={componentRef}
					customer={customer}
					investmentData={investmentData}
					authData={authData}
				/>
			</div>

			<GenericCard
				header='Your Goals'
				menuFlag={1}
				onClick={() => beginGoalCreation()}
				onClickPrint={() => handlePrint()}
				buttonTitle='Add'
				printFlag={6}
				fpoverviewDataFlag={fpoverviewData?.length > 0 ? true : false}
				investmentDataFlag={investmentData?.clientRequisition?.customerType === 'I' ? true : false}
				componentRef={componentRef}
			>
				<FundCards
					data={fpoverviewData}
					authData={authData}
					deleteCard={deleteCard}
					editCard={editCard}
				/>
			</GenericCard>
		</>
	);
};

export default FinancialPlanningCard;
