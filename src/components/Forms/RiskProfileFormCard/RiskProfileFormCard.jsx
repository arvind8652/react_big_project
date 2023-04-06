import React, { memo, useEffect, useState, useRef } from 'react';
import {
	Card,
	Col,
	Divider,
	Form,
	Radio,
	Row,
	Space,
	Typography,
	Button,
	message,
	Modal
} from 'antd';
import { ScButtonPrimary, ScButtonText, ScModal } from '../../StyledComponents/genericElements';
import ReactSpeedometer from 'react-d3-speedometer';
import ColorWithLabel from '../../LabelTypes/ColorWithLabel';
import RiskProfileResult from '../RiskProfileResult/RiskProfileResult';
import './AccountRiskProfileFormCard.scss';
import { connect } from 'react-redux';
import { setRiskProfileData } from '../../../redux/actions/customerCreateActions';
import { calculateScore, getQuestionAnswerList } from '../../../api/customerCreateApi';
import { getQA } from '../../../api/accountCreateApi';
import QuestionAnswerSection from './QuestionAnswerSection';
import ReactToPrint, { useReactToPrint } from 'react-to-print';
import CsafPdfToPrint from './CsafPrintPdf';
import moment from 'moment';

const RiskProfileFormCard = ({
	formData,
	form,
	onValuesChange,
	questionAnswer,
	action,
	screen,
	rules,
	// setIsSecuritySuitability=(true),
	onIsSecuritySuitabilityHandler = () => {},
	cifRespData = () => {},
	setRiskProfileRequiredField = () => {}
}) => {
	const [isModalVisible, setModalVisibility] = useState(false);
	const [isModal2Visible, setModal2Visibility] = useState(false);
	const [showResult, setShowResult] = useState(false);
	const [questionAnswerList, setQuestionAnswerList] = useState(questionAnswer);
	const [calculatedScore, setCalculatedScore] = useState();
	const [selectedAnswer, setSelectedAnswer] = useState([]);
	const [lastSectionValue, setLastSectionValue] = useState(1);
	const [checkRetake, setCheckRetake] = useState(false);
	const [retakeRiskProfileModal, setRetakeRiskProfileModal] = useState(false);
	useEffect(() => {
		if (screen == 'customerCreate') {
			setModalVisibility(false);
			setModal2Visibility(false);
			setShowResult(false);
			setCalculatedScore();
			setSelectedAnswer([]);
			setLastSectionValue(1);
			setCheckRetake(false);
		}
	}, [formData?.customerType, formData?.category, formData?.residentialStatus]);

	useEffect(() => {
		if (screen == 'accountCreate') {
			setModalVisibility(false);
			setModal2Visibility(false);
			setShowResult(false);
			setCalculatedScore();
			setSelectedAnswer([]);
			setLastSectionValue(1);
			setCheckRetake(false);
		}
	}, [formData?.type, formData?.nature, formData?.classification]);

	const checkDependence = () => {
		switch (screen) {
			case 'prospectCreate':
				if (formData?.individualCategory || formData?.corporateCategory) {
					toggleModalVisibility();
				} else {
					message.warning('Kindly select category to proceed with risk profile.');
				}
				break;
			case 'customerCreate':
				if (
					cifRespData?.riskProfileModel &&
					Object.keys(cifRespData?.riskProfileModel).length > 0
				) {
					setRetakeRiskProfileModal(true);
				} else {
					if (formData?.category && formData?.residentialStatus) {
						toggleModalVisibility();
					} else {
						message.warning(
							'Kindly select category / residential status to proceed with risk profile.'
						);
					}
				}
				break;
			case 'accountCreate':
				// if (formData?.nature && formData?.type && formData?.classification) {
				if (formData?.nature && formData?.type) {
					toggleModalVisibility();
				} else {
					message.warning('Kindly select nature / product provider  to proceed with risk profile.');
				}
				break;
			default:
				toggleModalVisibility();
				break;
		}
	};

	const toggleModalVisibility = (onCancelClick) => {
		setModalVisibility((prev) => !prev);
		// onValuesChange({['isBlanketWaiver']: false})
		onValuesChange({ ['isBlanketWaiver']: null });
		if (showResult && onCancelClick !== 'onCancel') {
			getQuestionAnswer();
			setLastSectionValue(1);
		}
	};

	const toggleModal2Visibility = () => setModal2Visibility((prev) => !prev);
	useEffect(() => {
		setRiskProfileData({
			qaList: questionAnswerList,
			slctdAns: selectedAnswer,
			clctdScore: calculatedScore,
			isRiskProfile: lastSectionValue
		});
	}, [questionAnswerList, selectedAnswer, calculatedScore, lastSectionValue]);

	const getQuestionAnswer = async () => {
		try {
			if (screen == 'customerCreate') {
				// const response = await getQuestionAnswerList(
				// 	formData?.customerType,
				// 	formData?.category,
				// 	formData?.residentialStatus
				// );
				const response = await getQuestionAnswerList(formData, 'CUSTOMER');
				if (response?.data?.lstQuestionsAnswers?.length > 0) {
					setRiskProfileRequiredField({
						showRiskProfileAlertMessage: false,
						required: true
					});
				} else {
					setRiskProfileRequiredField({
						showRiskProfileAlertMessage: false,
						required: false
					});
				}
				setQuestionAnswerList(response.data);
				setSelectedAnswer([]);
			}
			if (screen == 'accountCreate') {
				const response = await getQA(formData?.type, formData?.nature, formData?.classification);
				setQuestionAnswerList(response.data);
				setSelectedAnswer([]);
			}
		} catch (error) {}
	};
	useEffect(() => {
		setQuestionAnswerList(questionAnswer);
	}, [questionAnswer]);

	useEffect(() => {
		onValuesChange({ riskProfileModel: calculatedScore });
	}, [calculatedScore]);

	useEffect(() => {
		if (
			action === 'edit' ||
			// action === 'copy' ||
			action === 'profileEdit' ||
			// action === 'profileCopy' ||
			(cifRespData?.riskProfileModel && Object.keys(cifRespData?.riskProfileModel).length > 0)
		) {
			// if (formData.riskProfileModel) {
			// 	setShowResult(true);
			// 	setCalculatedScore(formData.riskProfileModel);
			// }
			if (formData?.riskProfileModel && Object?.keys(formData?.riskProfileModel)?.length > 0) {
				setShowResult(true);
				if (!checkRetake) {
					setCalculatedScore(formData.riskProfileModel);
				}
			} else {
				setShowResult(false);
				// setCalculatedScore();
			}
		}
	}, [formData?.riskProfileModel, checkRetake, cifRespData?.riskProfileModel]);

	const getNamesTogether = () => {
		const { title, firstName, secondName, thirdName } = formData;
		if (title || firstName || secondName || thirdName) {
			return `${title ? title : ''} ${firstName ? firstName : ''} ${secondName ? secondName : ''} ${
				thirdName ? thirdName : ''
			}`;
		}

		return '';
	};

	const componentRef = useRef();
	const handlePrint = useReactToPrint({
		content: () => componentRef.current
	});

	return (
		<>
			<ScModal
				title=' '
				visible={retakeRiskProfileModal}
				footer={[
					<ScButtonText
						type='text'
						key='back'
						onClick={() => {
							setRetakeRiskProfileModal(false);
						}}
					>
						Cancel
					</ScButtonText>,
					<ScButtonPrimary
						key='submit'
						type='primary'
						onClick={() => {
							setRetakeRiskProfileModal(false);
							toggleModalVisibility();
						}}
					>
						OK
					</ScButtonPrimary>
				]}
				width='35vw'
				centered
				onCancel={() => {
					setRetakeRiskProfileModal(false);
				}}
			>
				Risk Profile is received from CBS. Do you want to retake Risk Profile?
			</ScModal>
			<Card
				title='Risk Profile'
				className={'risk-profile'}
				extra={
					<Typography.Title level={5}>
						{/* <Typography.Link style={{paddingRight: '30px'}}><a href={`${window.location.origin}/csafPdf`} target="_blank" rel="noopener">{showResult ? 'Print' : ''}</a></Typography.Link> */}
						{showResult ? (
							<ReactToPrint
								pageStyle={`size: 2.5in 4in`}
								trigger={() => (
									<Typography.Link style={{ paddingRight: '30px' }} onClick={handlePrint}>
										{showResult ? 'Print' : ''}
									</Typography.Link>
								)}
								content={() => componentRef.current}
								documentTitle={`CSAF / ${getNamesTogether()} ${moment(new Date()).format(
									'DD-MMMM-YYYY'
								)}`}
							/>
						) : (
							''
						)}
						{/* <Typography.Link onClick={toggleModalVisibility}> */}
						<Typography.Link
							// disabled={
							// 	cifRespData?.riskProfileModel &&
							// 	Object.keys(cifRespData?.riskProfileModel).length > 0
							// }
							onClick={checkDependence}
						>
							{showResult ? 'Retake' : '+ Add'}
						</Typography.Link>
					</Typography.Title>
				}
			>
				{showResult ? (
					<RiskProfileResult
						setCalculatedScore={setCalculatedScore}
						rules={rules}
						calculatedScore={calculatedScore}
						lastSectionValue={lastSectionValue}
						form={form}
						formData={formData}
						onValuesChange={onValuesChange}
						cifRespData={cifRespData}
					/>
				) : (
					<Row justify='center'>
						<Typography.Text>Risk Profile Pending</Typography.Text>
					</Row>
				)}
			</Card>
			<RiskProfileModal
				questionAnswerList={questionAnswerList}
				toggleModal={toggleModalVisibility}
				isModalVisible={isModalVisible}
				toggleModal2={toggleModal2Visibility}
				form={form}
				formData={formData}
				onValuesChange={onValuesChange}
				setCalculatedScore={setCalculatedScore}
				setSelectedAnswer={setSelectedAnswer}
				setCheckRetake={setCheckRetake}
				selectedAnswer={selectedAnswer}
			/>
			<RiskProfileModal2
				setShowResult={setShowResult}
				calculatedScore={calculatedScore}
				setCalculatedScore={setCalculatedScore}
				toggleModal2={toggleModal2Visibility}
				isModal2Visible={isModal2Visible}
				lastSectionValue={lastSectionValue}
				setLastSectionValue={setLastSectionValue}
				toggleModal={toggleModalVisibility}
				// setIsSecuritySuitability={setIsSecuritySuitability}
				onIsSecuritySuitabilityHandler={onIsSecuritySuitabilityHandler}
				formData={formData}
			/>
			<div style={{ display: 'none' }}>
				<CsafPdfToPrint ref={componentRef} />
			</div>
		</>
	);
};

const RiskProfileModal = ({
	isModalVisible = false,
	toggleModal = () => {},
	toggleModal2 = () => {},
	questionAnswerList,
	setCalculatedScore = () => {},
	setCheckRetake = () => {},
	selectedAnswer,
	setSelectedAnswer
}) => {
	const onSubmit = async () => {
		try {
			const response = await calculateScore(selectedAnswer, questionAnswerList);
			if (
				response?.data?.riskProfileDate === null &&
				response?.data?.nextProfileReviewDt === null
			) {
				setCalculatedScore({
					...response.data,
					lstQuestionsAnswers: selectedAnswer,
					riskProfileDate: moment().format('YYYY-MM-DD'),
					// nextProfileReviewDt: moment().add(12, 'months').format('YYYY-MM-DD')
					nextProfileReviewDt: moment().add(36, 'months').format('YYYY-MM-DD')
				});
			} else if (
				response?.data?.riskProfileDate !== null &&
				response?.data?.nextProfileReviewDt === null
			) {
				setCalculatedScore({
					...response.data,
					lstQuestionsAnswers: selectedAnswer,
					// nextProfileReviewDt: moment().add(12, 'months').format('YYYY-MM-DD')
					nextProfileReviewDt: moment().add(36, 'months').format('YYYY-MM-DD')
				});
			} else if (
				response?.data?.riskProfileDate === null &&
				response?.data?.nextProfileReviewDt !== null
			) {
				setCalculatedScore({
					...response.data,
					lstQuestionsAnswers: selectedAnswer,
					riskProfileDate: moment().format('YYYY-MM-DD')
				});
			}
			// setCalculatedScore({ ...response.data, lstQuestionsAnswers: selectedAnswer,test:null });
			toggleModal('onCancel');
			toggleModal2();
		} catch (error) {}
	};
	return (
		<ScModal
			title='Risk Profiling'
			visible={isModalVisible}
			footer={[
				<ScButtonText
					type='text'
					key='back'
					onClick={() => {
						toggleModal();
						setCheckRetake(false);
					}}
				>
					Cancel
				</ScButtonText>,
				<ScButtonPrimary
					htmlType='submit'
					key='submit'
					disabled={
						// questionAnswerList?.lstQuestionsAnswers?.length == selectedAnswer.length ? false : true
						questionAnswerList?.lstQuestionsAnswers?.length ===
						selectedAnswer?.filter((item) => item !== undefined && item !== null)?.length
							? false
							: true
					}
					type='primary'
					onClick={() => {
						onSubmit();
						setCheckRetake(true);
					}}
				>
					Submit
				</ScButtonPrimary>
			]}
			width='75vw'
			centered
			onCancel={() => {
				toggleModal();
			}}
		>
			{questionAnswerList?.lstQuestionsAnswers?.map((item, idx) => (
				<QuestionAnswerSection
					{...item}
					idx={idx}
					setSelectedAnswer={setSelectedAnswer}
					selectedAnswer={selectedAnswer}
					key={idx}
				/>
			))}
			{questionAnswerList?.lstQuestionsAnswers?.length ===
			selectedAnswer?.filter((item) => item !== undefined && item !== null)?.length ? (
				<p></p>
			) : (
				<p style={{ color: 'red' }}>Please answer all the given question</p>
			)}
		</ScModal>
	);
};

const RiskProfileModal2 = ({
	isModal2Visible = false,
	toggleModal2 = () => {},
	toggleModal = () => {},
	setShowResult = () => {},
	calculatedScore,
	setCalculatedScore = () => {},
	lastSectionValue,
	setLastSectionValue,
	// setIsSecuritySuitability,
	onIsSecuritySuitabilityHandler = () => {},
	formData = {}
}) => {
	const [range, setRange] = useState([]);
	const [colorArray, setcolorArray] = useState([]);
	const [score, setScore] = useState(0);
	const [colorLabels, setColorLabels] = useState([]);
	const [maxValue, setMaxValue] = useState(1000);
	const [minValue, setMinValue] = useState(0);
	const [customSegmentLabels, setCustomSegmentLabels] = useState([]);

	useEffect(() => {
		if (screen == 'customerCreate') {
			setRange([]);
			setcolorArray([]);
			setScore(0);
			setColorLabels([]);
			setMaxValue(1000);
			setCustomSegmentLabels([]);
		}
	}, [formData?.customerType, formData?.category, formData?.residentialStatus]);

	useEffect(() => {
		if (screen == 'accountCreate') {
			setRange([]);
			setcolorArray([]);
			setScore(0);
			setColorLabels([]);
			setMaxValue(1000);
			setCustomSegmentLabels([]);
		}
	}, [formData?.type, formData?.nature, formData?.classification]);

	useEffect(() => {
		let colorLabels = [],
			colors = [],
			rangeArray = [0],
			rangeMinValue = [],
			customSegmentLabels = [];
		if (
			calculatedScore &&
			calculatedScore.lstCategories &&
			calculatedScore.lstCategories.length > 0
		) {
			let score = calculatedScore.score ? calculatedScore.score : 0;
			calculatedScore.lstCategories.map((ele) => {
				let riskProfileColorObject = {},
					customSegmentLabelsObject = {};
				riskProfileColorObject.color = ele.displayColor;
				riskProfileColorObject.label = ele.displayValue;
				riskProfileColorObject.maxScore = ele.maxScore;
				riskProfileColorObject.minScore = ele.minScore;
				colorLabels.push(riskProfileColorObject);

				customSegmentLabelsObject.text = ele.displayValue;
				customSegmentLabelsObject.position = 'OUTSIDE';
				customSegmentLabels.push(customSegmentLabelsObject);
			});

			colorLabels.sort((a, b) => {
				return a.maxScore - b.maxScore;
			});
			colorLabels.map((labelWithScore) => {
				rangeArray.push(labelWithScore.maxScore);
				rangeMinValue.push(labelWithScore.minScore);
				colors.push(labelWithScore.color);
			});

			rangeArray[0] = Math.min(...rangeMinValue) || 0;
			setScore(score);
			setcolorArray(colors);
			setColorLabels(colorLabels);
			setRange(rangeArray);
			setMaxValue(Math.max(...rangeArray));
			setMinValue(Math.min(...rangeMinValue));
			setCustomSegmentLabels(customSegmentLabels);
		}
	}, [calculatedScore]);

	const onLastSectionChange = (e) => {
		let selectedCategoery = e.target.value;
		if (selectedCategoery === calculatedScore.recommendedCategoryCode) {
			// setIsSecuritySuitability(true);
			onIsSecuritySuitabilityHandler(true);
		} else {
			// setIsSecuritySuitability(false);
			onIsSecuritySuitabilityHandler(false);
		}
		setCalculatedScore((prev) => {
			return { ...prev, nonRecommendedCategory: selectedCategoery };
		});
		setLastSectionValue(selectedCategoery);
	};
	const checkLastSectionValue = () => {
		if (lastSectionValue === 1) {
			onIsSecuritySuitabilityHandler(true);
		}
		setCalculatedScore((prev) => {
			return { ...prev, nonRecommendedCategory: null };
		});
	};

	return (
		<ScModal
			title='Risk Profiling'
			visible={isModal2Visible}
			footer={[
				<ScButtonText
					type='text'
					key='back'
					onClick={() => {
						toggleModal('onCancel');
						toggleModal2();
					}}
				>
					Cancel
				</ScButtonText>,
				<ScButtonPrimary
					htmlType='submit'
					key='submit'
					type='primary'
					onClick={() => {
						toggleModal2();
						setShowResult(true);
						checkLastSectionValue();
					}}
				>
					Save
				</ScButtonPrimary>
			]}
			width='75vw'
			closable={false}
			centered
		>
			<Row justify='center' align='middle'>
				<Col span={8}>
					<ReactSpeedometer
						customSegmentStops={range}
						segmentColors={colorArray}
						value={score}
						currentValueText={`${score} Score Based`}
						// minValue={0}
						minValue={minValue || 0}
						maxValue={maxValue}
						// customSegmentLabels={customSegmentLabels} // CAN BE USEFUL IN FUTURE
						height={200}
					/>
				</Col>
				<Col span={8}>
					{colorLabels.map((tab, index) => {
						return <ColorWithLabel color={tab.color} label={tab.label} key={index} />;
					})}
				</Col>
			</Row>

			<div style={{ marginTop: '50px' }} className='rp-questions'>
				{calculatedScore && calculatedScore.message}
			</div>

			<Divider />
			<p className='rp-questions'>
				The Suitability Assessment Results are provisional and it is subject to the verification and
				approval from a certified personnel
			</p>
			{/* <p className='rp-questions'>
				Please Select an appropriate risk profile if you wish to differ
			</p>
			<Radio.Group value={lastSectionValue}>
				<Space direction='vertical'>
					{calculatedScore?.lstCategories?.map((item) => (
						<Radio
							onChange={(evt) => onLastSectionChange(evt)}
							value={item.dataValue}
							className={`radio-option ${
								lastSectionValue === item?.dataValue ? 'radio-checked' : ''
							}`}
							key={item.dataValue}
						>
							{item?.displayValue}
						</Radio>
					))}
				</Space>
			</Radio.Group> */}
		</ScModal>
	);
};

const mapDispatchToProps = { setRiskProfileData };
// export default memo(RiskProfileFormCard);
export default connect(null, mapDispatchToProps)(RiskProfileFormCard);
