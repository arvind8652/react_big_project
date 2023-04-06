import { React, useEffect, useState, useRef } from 'react';
import {
	Button,
	Card,
	Col,
	Row,
	Typography,
	Divider,
	Menu,
	Dropdown,
	message,
	Select,
	Rate,
	Progress
} from 'antd';
import { DownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import AvatarLogo from '../Avatar/AvatarLogo';
import { Liquid, TinyArea } from '@ant-design/charts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
import { AvatarSize } from '../../constants/AvatarSize';
import { palette, fontSet, avatar } from '../../theme';
import TypoGraphy from '../TypoGraphy/TypoGraphy';
import GenericCard from '../GenericCard/GenericCard';
import Avatar from 'antd/lib/avatar/avatar';
import { theme } from '../../theme';
import { faArrowAltUp } from '@fortawesome/pro-solid-svg-icons';

const { Text, Link, Title } = Typography;
const defaultValue = {
	name: 'Alexandra Romus',
	id: 'BDO1928345',
	tagName: 'Equity',
	secondaryTag: 'Stocks',
	value: '$21',
	risk: 'Moderate',
	score: '5',
	category: 'Multi Cap',
	sector: 'Industrial',
	lastUpdate: '21 June 202',
	fund: '25%',
	sp: '21%',
	alpha: '8%',
	downsideRisk: '2.5%'
};

const EquityViewFundDetails = ({ EquityViewFundDetails = defaultValue }) => {
	const data = [0, 1000, 240, 340, 839, 810, 850];
	const config = {
		autoFit: true,
		data: data,
		smooth: false,
		areaStyle: {
			fill: `l(270) 0:#ffffff 1:${palette.text.success}`,
			fillOpacity: 0.1,

			shadowBlur: 3,
			shadowOffsetX: 1,
			shadowOffsetY: 1,
			cursor: 'pointer'
		},
		line: {
			color: palette.text.success
		}
	};
	const styleSet = {
		container: {
			fontSize: fontSet.body.xsmall,
			color: palette.text.success
		},
		containerStyle: {
			marginLeft: '15px'
		},
		bannerId: {
			//fontSize: fontSet.body.xsmall,
			color: palette.text.main
		},
		subContainer: {
			fontSize: fontSet.body.xsmall,
			color: palette.text.dark,
			marginTop: '10px',
			marginLeft: '80px',
			marginRight: '15px'
		},
		subMain: {
			fontSize: fontSet.body.xsmall,
			color: palette.text.dark,
			marginTop: '10px',
			marginLeft: '100px',
			marginRight: '15px'
		},
		subStyle: {
			fontSize: fontSet.body.xsmall,
			color: palette.text.dark,
			marginTop: '10px',
			marginLeft: '80px',
			marginRight: '15px'
		},
		subCategory: {
			fontSize: fontSet.body.xsmall,
			color: palette.text.dark,
			marginTop: '10px'
			// marginLeft: "65px",
			// marginRight: "15px",
		},
		subIcon: {
			marginTop: '10px'
		},
		mapBlock: {
			height: '65px',
			width: '450px'
			//margin: "5px 0px 10px 10px"
			//marginTop: "10px",
		},
		cBlock: {
			fontSize: fontSet.body.xsmall,
			color: palette.text.dark,
			marginTop: '35px'
		},
		mBlock: {
			marginBottom: '40px'
		},
		block: {
			height: '25px',
			width: '235px'
		},
		subCardHeader: {
			fontSize: fontSet.body.large,
			color: palette.text.scard
		},
		sCardHeader: {
			fontSize: fontSet.body.xxlarge,
			color: palette.text.scard
		}
	};
	return (
		<>
			<GenericCard header={'Fund Details'}>
				<Col>
					<Row align='middle'>
						<Col span={7}>
							<Row>
								<Col span={5}>
									<Avatar style={avatar.mediumAvatar} />
								</Col>
								<Col style={styleSet.containerStyle}>
									<Row style={theme.profileName}>{EquityViewFundDetails.name}</Row>
									<Row style={styleSet.bannerId}>
										{EquityViewFundDetails.id}|
										{
											<Rate
												style={{
													fontSize: '12px',
													display: 'inline-block',
													verticalAlign: 'middle',
													color: '#48528D'
												}}
											/>
										}
									</Row>
									<Row style={{ alignItems: 'center', margin: '5px 0px' }}>
										<div className='opportunityTag'>{EquityViewFundDetails.tagName}</div>
										<div className='opportunityTag'>{EquityViewFundDetails.secondaryTag}</div>
									</Row>
								</Col>
							</Row>

							<Row>
								<Col style={styleSet.subMain}>
									<TypoGraphy label={'Category'}>
										<div style={styleSet.subCardHeader}>{EquityViewFundDetails.category}</div>
									</TypoGraphy>
								</Col>
								<Col style={styleSet.subCategory}>
									<TypoGraphy label={'Sector'}>
										<div style={styleSet.subCardHeader}>{EquityViewFundDetails.sector}</div>
									</TypoGraphy>
								</Col>
							</Row>
						</Col>

						<Col>
							<Row>
								<Col style={styleSet.container}>
									<TypoGraphy clabel={'+0.5%'}>
										<div style={styleSet.sCardHeader}>{EquityViewFundDetails.value}</div>
									</TypoGraphy>
								</Col>
							</Row>
							<Row>
								<Col style={styleSet.cBlock}>
									<TypoGraphy label={'Last Update'}>
										<div style={styleSet.subCardHeader}>{EquityViewFundDetails.lastUpdate}</div>
									</TypoGraphy>
								</Col>
							</Row>
						</Col>

						<Col>
							<Row>
								<Col>
									<div style={styleSet.mapBlock}>
										<TinyArea {...config} />
									</div>
								</Col>
							</Row>
							<Row>
								<div style={styleSet.mBlock}></div>
							</Row>
							<Row>
								<Col style={styleSet.subStyle}>
									<TypoGraphy label={'Fund'}>
										<div style={styleSet.subCardHeader}>{EquityViewFundDetails.fund}</div>
									</TypoGraphy>
								</Col>
								<Col style={styleSet.subStyle}>
									<TypoGraphy label={'S&P 500'}>
										<div style={styleSet.subCardHeader}>{EquityViewFundDetails.sp}</div>
									</TypoGraphy>
								</Col>
								<Col style={styleSet.subIcon}>
									<div style={styleSet.subCardHeader}>
										<FontAwesomeIcon
											icon={faArrowAltUp}
											style={{ color: '#05BC6A', height: '60px' }}
										/>
									</div>
								</Col>
								<Col style={styleSet.subCategory}>
									<TypoGraphy label={'Alpha'}>
										<div style={styleSet.subCardHeader}>{EquityViewFundDetails.alpha}</div>
									</TypoGraphy>
								</Col>
							</Row>
						</Col>
						<Col>
							<Row>
								<div style={styleSet.block}>
									<Progress
										strokeColor={{
											// '0%': '#FFFFFF',
											'0%': '#55C1B3',
											'100%': '#FFC122'
										}}
										percent={71}
										showInfo={false}
									/>
								</div>
							</Row>
							<Row>
								<Col>
									<TypoGraphy label={'Risk'}>
										<div style={styleSet.subCardHeader}>{EquityViewFundDetails.risk}</div>
									</TypoGraphy>
								</Col>

								<Col>
									<TypoGraphy label={'Score'}>
										<div style={styleSet.subCardHeader}>{EquityViewFundDetails.score}</div>
									</TypoGraphy>
								</Col>
							</Row>
							<Row>
								<Col style={styleSet.cBlock}>
									<TypoGraphy label={'Downside Risk'}>
										<div style={styleSet.subCardHeader}>{EquityViewFundDetails.downsideRisk}</div>
									</TypoGraphy>
								</Col>
							</Row>
						</Col>
					</Row>
				</Col>
			</GenericCard>
		</>
	);
};

export default EquityViewFundDetails;
