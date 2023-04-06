import { Checkbox, Col, DatePicker, Form, Input, Row } from 'antd';
import { memo, useEffect, useState } from 'react';
import moment from 'moment';
import ColorWithLabel from '../../LabelTypes/ColorWithLabel';
import ReactSpeedometer from 'react-d3-speedometer';

const RiskProfileResult = ({
	calculatedScore,
	lastSectionValue,
	form,
	formData,
	rules,
	onValuesChange = () => {},
	setCalculatedScore = () => {},
	cifRespData = () => {}
}) => {
	const [range, setRange] = useState([]);
	const [colorArray, setcolorArray] = useState([]);
	const [score, setScore] = useState(0);
	const [colorLabels, setColorLabels] = useState([]);
	const [maxValue, setMaxValue] = useState(1000);
	const [minValue, setMinValue] = useState(0);
	const [customSegmentLabels, setCustomSegmentLabels] = useState([]);
	const [selectedDate, setSelectedDate] = useState(moment);

	useEffect(() => {
		onValuesChange({ riskProfileModel: calculatedScore });
	}, [calculatedScore]);

	const onChangeDate = (value) => {
		//formData.riskProfileModel.nextProfileReviewDt = moment(value).format();
		let selectedReviewDate = moment.utc(value, 'YYYY-MM-DD');
		setCalculatedScore((prev) => {
			return { ...prev, nextProfileReviewDt: selectedReviewDate };
		});
		setSelectedDate(selectedReviewDate);
	};
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
	const { Item } = Form;
	function findRiskProfileValue() {
		let categoryCodeName;
		if (calculatedScore?.nonRecommendedCategory) {
			categoryCodeName = calculatedScore?.lstCategories?.find(
				(e) => e.dataValue === calculatedScore?.nonRecommendedCategory
			)?.displayValue;
		} else {
			categoryCodeName = calculatedScore?.lstCategories?.find(
				(e) => e.dataValue === calculatedScore?.recommendedCategoryCode
			)?.displayValue;
		}
		return categoryCodeName;
	}

	function findRiskProfileDate() {
		form?.setFieldsValue({
			riskProfileDate: moment.utc(calculatedScore.riskProfileDate, 'YYYY-MM-DD')
		});
		return calculatedScore?.riskProfileDate;
	}
	function findNextRiskProfileDate() {
		form?.setFieldsValue({
			nextProfileReviewDt: moment.utc(calculatedScore.nextProfileReviewDt, 'YYYY-MM-DD')
		});
		return calculatedScore?.nextProfileReviewDt;
	}

	return (
		<>
			<Form
				form={form}
				initialValues={formData}
				//   onValuesChange={onValuesChange}
				layout='vertical'
			>
				<Row align='middle'>
					<Col span={18}>
						<Row justify='center' align='middle'>
							<Col span={8}>
								{range.length > 1 && (
									<ReactSpeedometer
										customSegmentStops={range}
										segmentColors={colorArray}
										value={score}
										currentValueText={`${score} Score Based`}
										// minValue={0}
										minValue={minValue || 0}
										maxValue={maxValue}
										// customSegmentLabels={customSegmentLabels} // Can be usefull in future
										height={200}
									/>
								)}
							</Col>
							<Col span={4} />
							<Col span={8}>
								{colorLabels.map((tab, index) => {
									return <ColorWithLabel color={tab.color} label={tab.label} key={index} />;
								})}
							</Col>
						</Row>
						<p className='rp-questions'>
							The Suitability Assessment Results are provisional and it is subject to the
							verification and approval from a certified personnel
						</p>
						{formData?.riskProfileModel?.sophisticatedYn === 'Y' ? (
							<p className='rp-questions'>
								Based on our assessment, we have classified you as Sophisticated
							</p>
						) : (
							<p className='rp-questions'>
								Based on our assessment, we have classified you as Non-Sophisticated
							</p>
						)}
						{calculatedScore?.recommendedCategoryCode != lastSectionValue &&
						lastSectionValue != 1 ? (
							<p className='rp-questions'>
								You are deviating from the assessed Risk Profile, Please ensure appropriate
								disclaimers are uploaded
							</p>
						) : (
							''
						)}
						{/* {calculatedScore?.isBlanketwaiver === true && <Item name="IsBlanketWaiver" label=" " > */}
						{(calculatedScore?.isBlanketwaiver === 'Y' || formData?.isBlanketWaiver !== null) && (
							<Item name='IsBlanketWaiver'>
								{/* <Checkbox className="interaction-text" onChange={(evt)=>onValuesChange('isBlanketWaiver',evt.target.value)}> */}
								<Checkbox
									className='interaction-text'
									checked={formData?.isBlanketWaiver === 'Y' || formData?.isBlanketWaiver === true}
									onChange={(evt) => onValuesChange({ ['isBlanketWaiver']: evt.target.checked })}
									// disabled={
									// 	cifRespData?.riskProfileModel &&
									// 	Object.keys(cifRespData?.riskProfileModel).length > 0 &&
									// 	cifRespData?.riskProfileModel?.isBlanketwaiver
									// }
								>
									Blanket Waiver Received
								</Checkbox>
							</Item>
						)}
					</Col>

					<Col span={6}>
						<Form
							layout='vertical'
							form={form}
							initialValues={formData}
							onValuesChange={onValuesChange}
						>
							<Item label='Risk Profile'>
								<Input
									disabled={true}
									// value={findRiskProfileValue()}
									value={
										findRiskProfileValue() || formData?.riskProfileModel?.nonRecommendedCategoryName
									}
									placeholder='Select Risk Profile'
									size='large'
								/>
							</Item>
							<Item label='Risk Profile Date' name='riskProfileDate'>
								<DatePicker
									allowClear={false}
									onChange={(val) => {
										setCalculatedScore({
											...calculatedScore,
											riskProfileDate: val.format('YYYY-MM-DD')
										});
									}}
									disabledDate={(d) => !d || d.isAfter(new Date().setDate(new Date().getDate()))}
									// disabled={
									// 	cifRespData?.riskProfileModel &&
									// 	Object.keys(cifRespData?.riskProfileModel).length > 0 &&
									// 	cifRespData?.riskProfileModel?.riskProfileDate
									// }
									defaultValue={
										calculatedScore.riskProfileDate
											? // ? moment.utc(calculatedScore.riskProfileDate, 'YYYY-MM-DD')
											  moment.utc(findRiskProfileDate(), 'YYYY-MM-DD')
											: moment()
									}
									format='DD-MM-YYYY'
									placeholder='Select Risk Profile Date'
									size='large'
								/>
							</Item>
							{/* <p>{rules ? rules?.nextprofilereview:""}</p> */}
							<Form.Item
								required={true}
								//  rules={rules?.nextprofilereview}
								rules={rules ? rules?.nextprofilereview : []}
								validateTrigger={['onChange', 'onBlur']}
								label='Next Profile Review'
								name='nextProfileReviewDt'
							>
								<DatePicker
									allowClear={false}
									onChange={(val) => {
										setCalculatedScore({
											...calculatedScore,
											nextProfileReviewDt: val.format('YYYY-MM-DD')
										});
									}}
									defaultValue={
										calculatedScore.nextProfileReviewDt
											? // ? moment.utc(calculatedScore.nextProfileReviewDt, 'YYYY-MM-DD')
											  moment.utc(findNextRiskProfileDate(), 'YYYY-MM-DD')
											: moment().add(36, 'months')
									}
									disabledDate={(d) => !d || d.isBefore(new Date().setDate(new Date().getDate()))}
									// disabled={
									// 	cifRespData?.riskProfileModel &&
									// 	Object.keys(cifRespData?.riskProfileModel).length > 0 &&
									// 	cifRespData?.riskProfileModel?.nextProfileReviewDt
									// }
									placeholder='Select Next Profile Review'
									format='DD-MM-YYYY'
									size='large'
									// value={selectedDate}
									// onChange={date => onChangeDate(date)}
								/>
							</Form.Item>
						</Form>
					</Col>
				</Row>
			</Form>
		</>
	);
};

export default memo(RiskProfileResult);
