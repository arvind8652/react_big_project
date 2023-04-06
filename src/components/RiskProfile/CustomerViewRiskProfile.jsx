import { React, useEffect, useState, useRef } from 'react';
import { Statistic, Card, Col, Row, Typography, Divider, Progress } from 'antd';
import { palette, fontSet } from '../../theme';
import CustomGauge from '../CustomGauge/CustomGauge';
import ColorWithLabel from '../LabelTypes/ColorWithLabel';
import LabelWithHelpText from '../LabelTypes/LabelWithHelpText';
import GenericCard from '../GenericCard/GenericCard';
import moment from 'moment';
import { getDateFormat } from '../../utils/utils';

const { Text, Link, Title } = Typography;
const defaultValue = {
	riskProfile: '',
	riskProfileDate: '',
	nextProfileReview: ''
};
const RiskProfile = ({ riskProfileData = {} }) => {
	//const RiskProfile = ({ RiskProfile = defaultValue }) => {

	const [range, setRange] = useState([]);
	const [colorArray, setcolorArray] = useState([]);
	const [gaugeVaule, setGaugeVaule] = useState(0);
	const [showRiskProfile, setShowRiskProfile] = useState(false);

	const styleSet = {
		cardStyle: { width: '100%', marginTop: '15px', marginBottom: '15px' },
		cardBody: { display: 'flex', alignItems: 'center' },
		colorWithLabelText: {
			display: 'flex',
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
			//border-width:0,
			//color:gray,
			//background-color:gray,
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
		if (
			riskProfileData &&
			riskProfileData.lstCategories &&
			riskProfileData.lstCategories.length > 0
		) {
			setShowRiskProfile(true);
			let color = riskProfileData.lstCategories.map((ele) => ele.displayColor);
			let splitArray = color.map((ele, index) => {
				return index / color.length;
			});
			let vaule = riskProfileData.lstCategories.filter((ele, index) => {
				if (ele.dataValue === riskProfileData.recommendedCategoryCode) {
					return (ele.rangeValue = parseInt(ele.displayAngle) / 100);
				}
			});
			let rangeArray = [...splitArray, 1];
			setcolorArray(color);
			setRange(rangeArray);
			if (vaule.length) setGaugeVaule(vaule[0].rangeValue);
		}
	}, []);

	return (
		<>
			<GenericCard header={'Risk Profile'}>
				{showRiskProfile ? (
					<div style={styleSet.cardBody}>
						<div>
							<CustomGauge
								title={
									riskProfileData &&
									riskProfileData.recommendedCategoryCodeName &&
									riskProfileData.recommendedCategoryCodeName
								}
								subtitle={'Agreed Risk Profile'}
								value={gaugeVaule}
								range={range}
								color={colorArray}
							/>
						</div>
						<div style={styleSet.colorWithLabelText}>
							{riskProfileData && riskProfileData.lstCategories
								? riskProfileData.lstCategories.map((tab, index) => {
										return (
											<ColorWithLabel
												color={tab.displayColor}
												label={tab.displayValue}
												key={index}
											/>
										);
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

// const RISK_PROFILE_TEXT = [
//     {
//         label: "Risk Averse",
//         helpText: "Risk Profile",
//     }, {
//         label: "15 May 2020",
//         helpText: "Risk Profile Date",
//     }, {
//         label: "30 May 2020",
//         helpText: "Next Profile Review",
//     }
// ]

const RISK_PROFILE = [
	{
		color: '#57BB61',
		label: 'Risk Averse'
	},
	{
		color: '#9BBB57',
		label: 'Conservative'
	},
	{
		color: '#E8CE49',
		label: 'Moderate'
	},
	{
		color: '#E89F49',
		label: 'Aggressive'
	},
	{
		color: '#E84949',
		label: 'Highly Aggressive'
	}
];
