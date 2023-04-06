import { React, useEffect, useState, useRef } from 'react';
import { palette, fontSet } from '../../theme';
import ReactSpeedometer from 'react-d3-speedometer';
import ColorWithLabel from '../LabelTypes/ColorWithLabel';
import LabelWithHelpText from '../LabelTypes/LabelWithHelpText';
import GenericCard from '../GenericCard/GenericCard';
import moment from 'moment';
import { getDateFormat } from '../../utils/utils';

const RiskProfile = ({ riskProfileData = {} }) => {
	const [range, setRange] = useState([]);
	const [colorArray, setcolorArray] = useState([]);
	const [showRiskProfile, setShowRiskProfile] = useState(false);
	const [score, setScore] = useState(0);
	const [colorLabels, setColorLabels] = useState([]);
	const [maxValue, setMaxValue] = useState(1000);
	const [minValue, setMinValue] = useState(0);
	const [customSegmentLabels, setCustomSegmentLabels] = useState([]);

	const styleSet = {
		cardStyle: { width: '100%', marginTop: '15px', marginBottom: '15px' },
		cardBody: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
		colorWithLabelText: {
			// display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			alignContent: 'flex-start',
			width: '15%',
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
			//  {
			//   setShowRiskProfile(true);
			//   let score = riskProfileData.score ? riskProfileData.score : 0
			//   riskProfileData.lstCategories.map(ele => {
			//     let riskProfileColorObject = {}, customSegmentLabelsObject = {};
			//     riskProfileColorObject.color = ele.displayColor;
			//     riskProfileColorObject.label = ele.displayValue;
			//     colorLabels.push(riskProfileColorObject);

			//     customSegmentLabelsObject.text = ele.displayValue
			//     customSegmentLabelsObject.position = 'OUTSIDE'
			//     customSegmentLabels.push(customSegmentLabelsObject);
			//     colors.push(ele.displayColor);
			//     if (ele.maxScore && ele.maxScore !== null) {
			//       rangeArray.push(ele.maxScore);
			//     }
			//   });
			//   if (rangeArray.length > 1) {
			//     setMaxValue(Math.max(...rangeArray));
			//     setRange(rangeArray);
			//   }
			//   setcolorArray(colors);
			//   setScore(score);
			//   setColorLabels(colorLabels);
			//   setCustomSegmentLabels(customSegmentLabels)
			// }
			setShowRiskProfile(true);
			let score = riskProfileData.score ? riskProfileData.score : 0;
			riskProfileData.lstCategories.map((ele) => {
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
	}, [riskProfileData]);

	return (
		<>
			<GenericCard header={'Risk Profile'}>
				{showRiskProfile ? (
					<div style={styleSet.cardBody}>
						<div>
							{range.length > 1 && (
								<ReactSpeedometer
									customSegmentStops={range}
									segmentColors={colorArray}
									value={score}
									currentValueText={`${score} Score Based`}
									// minValue={0}
									minValue={minValue || 0}
									maxValue={maxValue}
									// customSegmentLabels={customSegmentLabels} // can be useful in the future
									height={200}
								/>
							)}
						</div>
						<div style={styleSet.colorWithLabelText}>
							{riskProfileData && riskProfileData.lstCategories
								? colorLabels.map((tab, index) => {
										return <ColorWithLabel color={tab.color} label={tab.label} key={index} />;
								  })
								: null}
						</div>
						<div style={styleSet.cardText}>
							<LabelWithHelpText
								label={
									riskProfileData &&
									riskProfileData.recommendedCategoryCodeName &&
									riskProfileData.recommendedCategoryCodeName
								}
								helpText={'Risk Profile'}
							/>
							<LabelWithHelpText
								label={
									riskProfileData &&
									riskProfileData.riskProfileDate &&
									moment(riskProfileData.riskProfileDate).format(getDateFormat())
								}
								helpText={'Risk Profile Date'}
							/>
							<LabelWithHelpText
								label={
									riskProfileData &&
									riskProfileData.nextProfileReviewDt &&
									moment(riskProfileData.nextProfileReviewDt).format(getDateFormat())
								}
								helpText={'Next Profile Review'}
							/>
						</div>

						<div style={styleSet.cardBottomText}>
							{riskProfileData &&
								riskProfileData.profileReviewComment &&
								riskProfileData.profileReviewComment}
						</div>
					</div>
				) : (
					<div style={styleSet.cardBody}> No Risk Profile Data</div>
				)}
			</GenericCard>
		</>
	);
};
export default RiskProfile;
