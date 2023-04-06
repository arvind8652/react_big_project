import { React, useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import { palette, fontSet } from '../../theme';
import ReactSpeedometer from 'react-d3-speedometer';
import ColorWithLabel from '../LabelTypes/ColorWithLabel';
import LabelWithHelpText from '../LabelTypes/LabelWithHelpText';
import GenericCard from '../GenericCard/GenericCard';
import moment from 'moment';
import { getDateFormat } from '../../utils/utils';
import TypoGraphy from '../TypoGraphy/TypoGraphy';

const RiskProfile = ({
	riskProfileData = {},
	riskProfileModel,
	allCustomerOnboardingData = {}
}) => {
	const [range, setRange] = useState([]);
	const [colorArray, setcolorArray] = useState([]);
	const [score, setScore] = useState(0);
	const [colorLabels, setColorLabels] = useState([]);
	const [maxValue, setMaxValue] = useState(1000);
	const [minValue, setMinValue] = useState(0);
	const [customSegmentLabels, setCustomSegmentLabels] = useState([]);
	const [showRiskProfile, setShowRiskProfile] = useState(false);
	const styleSet = {
		cardStyle: { width: '100%', marginTop: '15px', marginBottom: '15px' },
		cardBody: { display: 'flex', alignItems: 'center' },
		textBody: { fontSize: '16px' },
		colorWithLabelText: {
			marginTop: '16px',
			paddingTop: '16px',
			// display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			alignContent: 'flex-start',
			width: '24% ',
			display: 'inline-block'
		},
		cardText: {
			display: 'flex',
			flexDirection: 'column',
			alignContent: 'flex-start'
		},
		cardBottomText: {
			display: 'flex',
			alignItems: 'center',
			fontSize: '18px',
			alignContent: 'flex-start',
			marginTop: '2%'
		},
		validationBlock: {
			color: palette.secondary.light
		},
		contactBlock: {
			color: palette.secondary.light,
			height: 0.5
			//border-width:0,
			//color:gray,
			//background-color:gray,
		},
		fmeeter: {
			paddingTop: '16px '
		},
		smeeter: {
			marginLeft: '5px',
			padding: '2px'
		},
		container: {
			flex: 1,
			width: '100%',
			marginTop: '10px',
			marginBottom: '15px'
		},
		subCardHeader: {
			fontSize: fontSet.body.xlarge,
			color: palette.text.dark
		}
	};
	useEffect(() => {
		let colorLabels = [],
			colors = [],
			rangeArray = [0],
			rangeMinValue = [],
			customSegmentLabels = [];
		if (
			riskProfileData &&
			riskProfileData.lstCategories &&
			riskProfileData.lstCategories.length > 0
		) {
			setShowRiskProfile(true);
			let score = riskProfileData.score ? riskProfileData.score : 0;
			riskProfileData.lstCategories.map((ele) => {
				let riskProfileColorObject = {},
					customSegmentLabelsObject = {};
				if (ele.maxScore && ele.maxScore !== null) {
					riskProfileColorObject.color = ele.displayColor;
					riskProfileColorObject.label = ele.displayValue;
					riskProfileColorObject.maxScore = ele.maxScore;
					riskProfileColorObject.minScore = ele.minScore;
					colorLabels.push(riskProfileColorObject);

					customSegmentLabelsObject.text = ele.displayValue;
					customSegmentLabelsObject.position = 'OUTSIDE';
					customSegmentLabels.push(customSegmentLabelsObject);
					// colors.push(ele.displayColor);
					// rangeArray.push(ele.maxScore);
				}
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
			if (rangeArray.length > 1) {
				setMaxValue(Math.max(...rangeArray));
				setMinValue(Math.min(...rangeMinValue));
				setRange(rangeArray);
			}
			setcolorArray(colors);
			setScore(score);
			setColorLabels(colorLabels);
			setCustomSegmentLabels(customSegmentLabels);
		}
	}, [riskProfileData]);

	return (
		<>
			<GenericCard header={'Risk Profile'}>
				{showRiskProfile ? (
					<>
						{/* <div style={styleSet.cardBody}> */}
						<Row>
							<Col span={10} style={styleSet.fmeeter}>
								{
									// range.length > 0 &&

									<ReactSpeedometer
										customSegmentStops={range}
										segmentColors={colorArray}
										value={score}
										currentValueText={`${score} Score Based`}
										// minValue={0}
										minValue={minValue || 0}
										maxValue={maxValue}
										// customSegmentLabels={customSegmentLabels} can be usefull in future
										height={300}
									/>
								}
							</Col>
							{/* IT CAN BE USEFUL IN PORTFOLIO SCREEN AMEER IS DISCUSSING ON THIS */}
							{/* <Col style={styleSet.smeeter} >
              {
                // range.length > 1 &&
                <ReactSpeedometer
                  customSegmentStops={range}
                  segmentColors={colorArray}
                  value={score}
                  currentValueText={`${score} Score Based`}
                  minValue={0}
                  maxValue={maxValue}
                  customSegmentLabels={customSegmentLabels}
                  height={200}
                />}
            </Col> */}
							<Col span={6} style={styleSet.colorWithLabelText}>
								{riskProfileData && riskProfileData.lstCategories
									? colorLabels.map((tab, index) => {
											return <ColorWithLabel color={tab.color} label={tab.label} key={index} />;
									  })
									: null}
							</Col>
							<Col span={8}>
								<Row gutter={[, 32]}>
									<Col span={24}>
										<TypoGraphy label={'Risk Profile'}>
											{riskProfileData?.recommendedCategoryCodeName ?? '-'}
										</TypoGraphy>
									</Col>

									<Col span={24}>
										<TypoGraphy label={'Risk Profile Date'}>
											{riskProfileData?.riskProfileDate
												? moment(riskProfileData?.riskProfileDate).format(getDateFormat())
												: '-'}
										</TypoGraphy>
									</Col>

									<Col span={24}>
										<TypoGraphy label={'Next Profile Review'}>
											{riskProfileData?.nextProfileReviewDt
												? moment(riskProfileData?.nextProfileReviewDt).format(getDateFormat())
												: '-'}
										</TypoGraphy>
									</Col>
									{allCustomerOnboardingData?.isblanketWaiver !== null ? (
										<Col span={24}>
											<TypoGraphy label={'Blanket Waiver Received'}>
												{allCustomerOnboardingData?.isblanketWaiver === 'Y' ? 'Yes' : 'No'}
											</TypoGraphy>
										</Col>
									) : (
										''
									)}
								</Row>
							</Col>
							<Col Span={24}>
								<div style={styleSet.cardBottomText}>
									{riskProfileData &&
										riskProfileData.profileReviewComment &&
										riskProfileData.profileReviewComment}
								</div>
							</Col>
						</Row>
						{/* </div> */}
						<p style={styleSet.textBody}>
							The Suitability Assessment Results are provisional and it is subject to the
							verification and approval from a certified personnel
						</p>
						{allCustomerOnboardingData?.sophisticatedYn === 'Y' ? (
							<p style={styleSet.textBody}>
								Based on our assessment, we have classified you as Sophisticated
							</p>
						) : (
							<p style={styleSet.textBody}>
								Based on our assessment, we have classified you as Non-Sophisticated
							</p>
						)}
					</>
				) : (
					<div style={styleSet.cardBody}> No Risk Profile Data</div>
				)}
			</GenericCard>
		</>
	);
};
export default RiskProfile;
