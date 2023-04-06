import React, { useState, useEffect } from 'react';
import { Col, Divider, Radio, Row, Space } from 'antd';
import { ScButtonPrimary, ScButtonText, ScModal } from '../StyledComponents/genericElements';
import ReactSpeedometer from 'react-d3-speedometer';
import ColorWithLabel from '../LabelTypes/ColorWithLabel';
import '../../components/Forms/RiskProfileFormCard/AccountRiskProfileFormCard.scss';
import { palette, fontSet } from '../../theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/pro-regular-svg-icons';

const RiskProfileModal2 = ({
	setModal2Visibility,
	isModal2Visible,
	riskProfileData,
	setRiskProfileData,
	setPageId,
	backArrow = () => {}
}) => {
	const [range, setRange] = useState([]);
	const [colorArray, setcolorArray] = useState([]);
	const [score, setScore] = useState(0);
	const [colorLabels, setColorLabels] = useState([]);
	const [maxValue, setMaxValue] = useState(1000);
	const styleSet = {
		cardStyle: { width: '100%', marginTop: '15px', marginBottom: '15px' },
		cardBody: { display: 'flex', alignItems: 'center' },
		textBody: { fontSize: '16px' },
		colorWithLabelText: {
			marginTop: '16px',
			paddingTop: '16px',
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
			rangeArray = [0];
		if (riskProfileData?.lstCategories?.length > 0) {
			let score = riskProfileData.score ?? 0;
			riskProfileData.lstCategories.map((ele) => {
				let riskProfileColorObject = {};
				if (ele.maxScore && ele.maxScore !== null) {
					riskProfileColorObject.color = ele.displayColor;
					riskProfileColorObject.label = ele.displayValue;
					riskProfileColorObject.maxScore = ele.maxScore;
					colorLabels.push(riskProfileColorObject);
				}
			});
			colorLabels.sort((a, b) => {
				return a.maxScore - b.maxScore;
			});
			colorLabels.map((labelWithScore) => {
				rangeArray.push(labelWithScore.maxScore);
				colors.push(labelWithScore.color);
			});
			if (rangeArray.length > 1) {
				setMaxValue(Math.max(...rangeArray));
				setRange(rangeArray);
			}
			setcolorArray(colors);
			setScore(score);
			setColorLabels(colorLabels);
		}
	}, [riskProfileData]);
	return (
		<ScModal
			// title='Risk Profiling'
			title={
				<>
					<FontAwesomeIcon icon={faChevronLeft} onClick={() => backArrow('RiskProfileModal2')} />
					&nbsp;
					{'Risk Profiling'}
				</>
			}
			visible={isModal2Visible}
			footer={[
				<ScButtonText type='text' key='back' onClick={() => setModal2Visibility((prev) => !prev)}>
					Cancel
				</ScButtonText>,
				<ScButtonPrimary htmlType='submit' key='submit' type='primary' onClick={() => setPageId(3)}>
					Save
				</ScButtonPrimary>
			]}
			width='75vw'
			closable={true}
			centered
			onCancel={() => {
				setModal2Visibility((prev) => !prev);
				setPageId(0);
			}}
		>
			<Row justify='center' align='middle'>
				<Col span={8} style={styleSet.fmeeter}>
					<ReactSpeedometer
						customSegmentStops={range}
						segmentColors={colorArray}
						value={score}
						currentValueText={`${score} Score Based`}
						minValue={0}
						maxValue={maxValue}
						height={200}
					/>
				</Col>
				<Col span={8} style={styleSet.colorWithLabelText}>
					{riskProfileData && riskProfileData.lstCategories
						? colorLabels.map((tab, index) => {
								return <ColorWithLabel color={tab.color} label={tab.label} key={index} />;
						  })
						: null}
				</Col>
			</Row>

			<div style={{ marginTop: '50px' }} className='rp-questions'>
				{riskProfileData && riskProfileData.message}
			</div>

			<Divider />
			<p className='rp-questions'>
				The Suitability Assessment Results are provisional and it is subject to the verification and
				approval from a certified personnel
			</p>
			<p className='rp-questions'>
				Please Select an appropriate risk profile if you wish to differ
			</p>
			<Radio.Group value={riskProfileData?.nonRecommendedCategory ?? 1}>
				<Space direction='vertical'>
					{riskProfileData?.lstCategories?.map((item) => (
						<Radio
							onChange={(evt) =>
								setRiskProfileData({
									...riskProfileData,
									nonRecommendedCategory: evt.target.value
								})
							}
							value={item.dataValue}
							className={`radio-option ${
								riskProfileData?.nonRecommendedCategory ?? 1 === item?.dataValue
									? 'radio-checked'
									: ''
							}`}
							key={item.dataValue}
						>
							{item?.displayValue}
						</Radio>
					))}
				</Space>
			</Radio.Group>
		</ScModal>
	);
};

export default RiskProfileModal2;
