import { Col, Row, Typography, Rate, Avatar, Tag, Card, Progress } from 'antd';
import {
	palette,
	RESP_NORMALX_FONTSIZE,
	RESP_NORMAL_FONTSIZE,
	RESP_SUBHEADING_FONTSIZE,
	RESP_FIELD_SIZE,
	RESP_TEXT_AREA_ROW,
	RESP_MODAL_SUBMIT_FONTSIZE,
	RESP_AVATAR_SIZEXS_FOR_INPUT_FIELD,
	RESP_NORMALS_FONTSIZE,
	RESP_HEADING_FONTSIZE
} from '../../theme';
import moment from 'moment';

import { getDateFormat } from '../../utils/utils';
import './style.scss';

const { p } = Typography;

const defaultProps = {
	security: '',
	securityName: '',
	assetType: '',
	assetGroup: '',
	theme: null,
	subTheme: null,
	logo: null,
	issuer: '',
	sector: '',
	isinCode: '',
	latestPrice: 0,
	averagePrice: 0,
	category: '',
	fundType: null,
	fund: 25,
	securityProduct: 22,
	alpha: 9,
	score: null,
	riskScore: 8,
	riskCategory: '',
	rating: null,
	isUp: false,
	matDate: null,
	performance: 8.0,
	downsideRisk: 2.5,
	assetUnderManagement: null,
	lastUpdatedDate: null,
	holding: null,
	holdingPercentage: null,
	currency: null,
	currencySymbol: '₹',
	graph: null,
	graphDetails: [],
	securityInitials: 'ZO',
	diffAmount: null,
	assetTypeName: '',
	assetGroupName: '',
	securityReturn: null,
	valueDate: null,
	isNewlyLaunched: false,
	isUpgraded: false,
	isDowngraded: false,
	isBestMatch: false,
	equityCapitalization: null,
	isTopRated: false,
	isSafeHaven: false,
	isTopPerformer: false,
	stkExIndexes: [],
	inputDateTime: null,
	version: null,
	sectorName: null,
	income: 0,
	amount: 0,
	mDuration: 7,
	creditQuality: 0,
	securedType: null,
	isHigherYield: false,
	isLowDuration: false,
	isCreditQuality: false,
	expenseRatio: null,
	isLowCostMfu: false,
	isInstantRedeem: false,
	isTaxSaver: false,
	id: 0,
	mfCategory: null,
	mfClassification: null,
	priceDifference: 0,
	isGraph: false,
	creditRating: null,
	interestRate: 0,
	minInvestMent: 0,
	minTenure: 0,
	maxTenure: 0,
	currentVTM: 0,
	payout: null,
	compounding: null,
	premium: 70.0,
	priceBand: null,
	appMinimum: null,
	pmLotsize: null,
	pmBasis: null,
	pmApplnDateFrom: null,
	pmApplnDateTo: '',
	allotDate: '',
	taxStatus: '',
	displayType: '',
	isFavorite: null,
	isRegularIncome: false,
	yield: '-'
};

export const SecurityCard = ({
	data = { ...defaultProps },
	showBorder = false,
	marketType = 'PRIMARY'
}) => {
	const styleSet = {
		container: {
			color: palette.text.banner
		},
		subContainer: {
			color: palette.text.banner,
			align: 'top'
		},
		iconStyle: {
			display: 'inline-flex',
			justifyContent: 'center',
			alignItems: 'center'
		},
		eachTag: {
			// fontSize: "0.8rem",
			fontSize: RESP_NORMALX_FONTSIZE,
			borderRadius: '1em',
			padding: '2px 10px',
			marginBottom: '5px',
			marginTop: '5px',
			color: '#696A91',
			backgroundColor: '#F0F2FB'
		},
		avatar: {
			color: '#f56a00',
			backgroundColor: '#fde3cf',
			// fontSize: "1rem",
			// fontSize: window.screen.width > 1800 ? '2.5rem' : '1.50rem',
			fontSize: RESP_AVATAR_SIZEXS_FOR_INPUT_FIELD,
			marginRight: '10px'
		},
		eachLabel: {
			color: '#898EA9',
			margin: '0px',
			fontSize: RESP_NORMALX_FONTSIZE
			// fontSize: "1.2rem",
		},
		eachInfo: {
			color: '#222747',
			margin: '0px',
			// fontSize: '1.2rem'
			fontWeight: '600',
			fontSize: RESP_NORMALX_FONTSIZE
		},
		eachInfoRisk: {
			color: '#222747',
			margin: '0px',
			// fontSize: "0.8vw",
			fontSize: RESP_NORMALX_FONTSIZE
		},
		block: {
			height: '25px',
			width: '50px'
		},
		leftMargin: {
			marginLeft: '2vw'
		}
	};

	const defaultData = '-';
	const dateFormatDB = 'YYYY-MM-DD';
	const displayDate = (prop) => moment(prop, dateFormatDB).format(getDateFormat());

	const withBorder = {
		// borderRadius: "0.3rem",
		borderRadius: '5px',
		border: '1px solid #CBD6FF',
		margin: '0 1em 0 1em'
	};

	const withoutBorder = {
		margin: '0 1em 0 1em'
	};

	if (marketType === 'PRIMARY') {
		return (
			<div style={showBorder ? withBorder : withoutBorder} bordered={showBorder}>
				<Row>
					<Col>
						<Avatar
							style={styleSet.avatar}
							// size={window.screen.width > 1800 ? 100 : 50}
							size={RESP_AVATAR_SIZEXS_FOR_INPUT_FIELD}
						>
							{data.securityInitials}
						</Avatar>
					</Col>
					<Col>
						{/* <p style={{ fontWeight: "bold", fontSize: "1.2rem" }}> */}
						<p
							className='securityTitle'
							style={{
								// fontSize: window.screen.width > 1800 ? '2rem' : '1.25rem'
								fontSize: RESP_HEADING_FONTSIZE,
								color: '#000000'
							}}
						>
							{data.securityName}
						</p>
						<Row style={{ marginTop: '-25px' }}>
							<Col>
								<span style={{ marginRight: '10px', fontSize: '0.7rem' }} />
								<span
									style={{
										marginRight: '10px',
										fontSize: RESP_NORMALX_FONTSIZE
									}}
								>
									{data.isinCode}
								</span>
							</Col>
							<Col>{data.isinCode && '|'}</Col>
							<Col>
								<Rate
									disabled
									defaultValue={data.rating ?? 0}
									style={{
										marginTop: '-50px',
										marginLeft: '10px',
										// fontSize: "0.7rem",
										fontSize: RESP_NORMALX_FONTSIZE
										// marginRight: "100px",
									}}
								/>
							</Col>
						</Row>
						<Row>
							<Tag style={styleSet.eachTag}>{data.assetGroupName}</Tag>
							<Tag style={styleSet.eachTag}>{data.assetTypeName}</Tag>
						</Row>
					</Col>

					<Col style={styleSet.leftMargin}>
						<p className='eachInfo' style={styleSet.eachInfo}>
							{data.premium ? `${data.currencySymbol} ${data.premium}` : defaultData}
						</p>
						<p className='eachLabel' style={styleSet.eachLabel}>
							Recommended price
						</p>
					</Col>
					<Col style={styleSet.leftMargin}>
						<p className='eachInfo' style={styleSet.eachInfo}>
							{data.yield ?? defaultData}
							{/* {data.penIntInt
                ? `${data.currencySymbol} ${data.penIntInt}`
                : defaultData} */}
						</p>
						<p className='eachInfo' style={styleSet.eachLabel}>
							Indicative rate
						</p>
					</Col>
					<Col style={styleSet.leftMargin}>
						<p className='eachInfo' style={styleSet.eachInfo}>
							{data.appMinimum ?? defaultData}
						</p>
						<p className='eachInfo' style={styleSet.eachLabel}>
							Minimum Application
						</p>
					</Col>
					<Col style={styleSet.leftMargin}>
						<p className='eachInfo' style={styleSet.eachInfo}>
							{data.pmLotsize ?? defaultData}
						</p>
						<p className='eachInfo' style={styleSet.eachLabel}>
							Lot Size
						</p>
					</Col>
				</Row>
				<br />
				<Row>
					<Col style={{ marginLeft: '3em' }}>
						<p className='eachInfo' style={styleSet.eachInfo}>
							{data.category ?? defaultData}
						</p>
						<p className='eachInfo' style={styleSet.eachLabel}>
							Category
						</p>
					</Col>
					<Col style={styleSet.leftMargin}>
						<p className='eachInfo' style={styleSet.eachInfo}>
							{data.creditRating ?? defaultData}
						</p>
						<p className='eachInfo' style={styleSet.eachLabel}>
							Credit Rating
						</p>
					</Col>
					<Col style={styleSet.leftMargin}>
						<p className='eachInfo' style={styleSet.eachInfo}>
							{data.priceBand ?? defaultData}
						</p>
						<p className='eachInfo' style={styleSet.eachLabel}>
							Price Band
						</p>
					</Col>
					<Col style={styleSet.leftMargin}>
						<p className='eachInfo' style={styleSet.eachInfo}>
							{data.pmApplnDateFrom ? displayDate(data.pmApplnDateFrom) : defaultData}
						</p>
						<p className='eachInfo' style={styleSet.eachLabel}>
							Issue Opens
						</p>
					</Col>
					<Col style={styleSet.leftMargin}>
						<p className='eachInfo' style={styleSet.eachInfo}>
							{data.pmApplnDateTo ? displayDate(data.pmApplnDateTo) : defaultData}
						</p>
						<p className='eachInfo' style={styleSet.eachLabel}>
							Issue Closes
						</p>
					</Col>
					<Col style={styleSet.leftMargin}>
						<p className='eachInfo' style={styleSet.eachInfo}>
							{data.allotDate ? displayDate(data.allotDate) : defaultData}
						</p>
						<p className='eachInfo' style={styleSet.eachLabel}>
							Allotment Date
						</p>
					</Col>
					<Col style={styleSet.leftMargin}>
						<p className='eachInfo' style={styleSet.eachInfo}>
							{data.taxStatus ? (
								<span style={{ color: '#CD0000' }}>{data.taxStatus}</span>
							) : (
								defaultData
							)}
						</p>
						<p className='eachInfo' style={styleSet.eachLabel}>
							Tax Status
						</p>
					</Col>
				</Row>
			</div>
		);
	} else if (marketType === 'Secondary') {
		return (
			<div style={showBorder ? withBorder : withoutBorder} bordered={showBorder}>
				<Row>
					<Col>
						<Avatar style={styleSet.avatar} size={window.screen.width > 1800 ? 100 : 50}>
							{data.securityInitials}
						</Avatar>
					</Col>
					<Col>
						<p
							className='securityTitle'
							style={{
								// fontSize: window.screen.width > 1800 ? '2rem' : '1.25rem'
								fontSize: RESP_HEADING_FONTSIZE,
								color: '#000000'
							}}
						>
							{data.securityName}
						</p>
						<Row style={{ marginTop: '-25px' }}>
							<Col>
								<span
									style={{
										marginRight: '10px',
										fontSize: RESP_NORMALX_FONTSIZE
									}}
								>
									{data.isinCode}
								</span>
							</Col>
							<Col>{data.isinCode && '|'}</Col>
							<Col>
								<Rate
									disabled
									defaultValue={data.rating ?? 0}
									style={{
										marginTop: '-50px',
										marginLeft: '10px',
										// marginRight: "200px",
										// fontSize: '0.7rem'
										fontSize: RESP_NORMALX_FONTSIZE
									}}
								/>
							</Col>
						</Row>
						<Row>
							<Tag style={styleSet.eachTag}>{data.assetGroupName}</Tag>
							<Tag style={styleSet.eachTag}>{data.assetTypeName}</Tag>
						</Row>
					</Col>
					<Row>
						<Col style={styleSet.leftMargin}>
							<p className='eachInfo' style={styleSet.eachInfo}>
								{data.matDate ? displayDate(data.matDate) : defaultData}
							</p>
							<p className='eachInfo' style={styleSet.eachLabel}>
								Maturity Date
							</p>
						</Col>
						<Col style={styleSet.leftMargin}>
							<p className='eachInfo' style={styleSet.eachInfo}>
								{data.interestRate ?? defaultData}
							</p>
							<p className='eachInfo' style={styleSet.eachLabel}>
								Interest Rate
							</p>
						</Col>
						<Col style={styleSet.leftMargin}>
							<p className='eachInfo' style={styleSet.eachInfo}>
								{data.lastIP ? displayDate(data.lastIP) : defaultData}
							</p>
							<p className='eachInfo' style={styleSet.eachLabel}>
								Last IP
							</p>
						</Col>
						<Col style={{ marginLeft: '3em' }}>
							<p className='eachInfo' style={styleSet.eachInfo}>
								{data.nextIP ? displayDate(data.nextIP) : defaultData}
							</p>
							<p className='eachInfo' style={styleSet.eachLabel}>
								Next IP
							</p>
						</Col>
					</Row>
					{/* <Col style={styleSet.leftMargin}>
            <p className="eachInfo" style={styleSet.eachInfo}>
              {data.creditRating ?? defaultData}
            </p>
            <p className="eachInfo" style={styleSet.eachLabel}>
              Credit Rating
            </p>
          </Col> */}
					{/* <Col style={styleSet.leftMargin}>
            <div style={styleSet.block}>
              <Progress
                strokeColor={{
                  "0%": "#FFFFFF",
                  "100%": "#FFC122",
                }}
                percent={71}
                showInfo={false}
              />
            </div>
            <Row>
              <Col span={15}>
                <p className='eachInfo' style={styleSet.eachInfoRisk}>
                  {data.riskCategory ?? defaultData}
                </p>
                <p className='eachInfo' style={styleSet.eachLabel}>
                  Risk
                </p>
              </Col>
              <Col>
                <p className='eachInfo' style={styleSet.eachInfo}>
                  {data.riskScore ?? defaultData}
                </p>
                <p className='eachInfo' style={styleSet.eachLabel}>
                  Score
                </p>
              </Col>
            </Row>
          </Col> */}
				</Row>
				<br />
				{/* <Row style={{ marginLeft: '3em', marginRight: '200px' }}> */}
				{/* <Col style={{ marginLeft: "3em" }}>
            <p className='eachInfo' style={styleSet.eachInfo}>
              {data.nextIP ? displayDate(data.nextIP) : defaultData}
            </p>
            <p className='eachInfo' style={styleSet.eachLabel}>
              Next IP
            </p>
          </Col> */}
				<Row xxl={8} xl={24} lg={24} md={24} sm={24}>
					<Col style={styleSet.leftMargin}>
						<p className='eachInfo' style={styleSet.eachInfo}>
							{data.creditRating ?? defaultData}
						</p>
						<p className='eachInfo' style={styleSet.eachLabel}>
							Credit Rating
						</p>
					</Col>
					<Col style={styleSet.leftMargin}>
						<p className='eachInfo' style={styleSet.eachInfo}>
							{data.faceValue ?? defaultData}
						</p>
						<p className='eachInfo' style={styleSet.eachLabel}>
							Face Value
						</p>
					</Col>
					<Col style={styleSet.leftMargin}>
						<p className='eachInfo' style={styleSet.eachInfo}>
							{data.isinCode ? data.isinCode : defaultData}
						</p>
						<p className='eachInfo' style={styleSet.eachLabel}>
							ISIN No
						</p>
					</Col>
					<Col style={styleSet.leftMargin}>
						<p className='eachInfo' style={styleSet.eachInfo}>
							{data.lastBidPrice ? data.lastBidPrice : defaultData}
						</p>
						<p className='eachInfo' style={styleSet.eachLabel}>
							Last Bid Price
						</p>
					</Col>
					<Col style={styleSet.leftMargin}>
						<p className='eachInfo' style={styleSet.eachInfo}>
							{data.yield ? data.yield : defaultData}
						</p>
						<p className='eachInfo' style={styleSet.eachLabel}>
							Last Bid Yield
						</p>
					</Col>
					<Col style={styleSet.leftMargin}>
						<p className='eachInfo' style={styleSet.eachInfo}>
							{data.marketLot ? data.marketLot : defaultData}
						</p>
						<p className='eachInfo' style={styleSet.eachLabel}>
							Market Lot
						</p>
					</Col>
				</Row>
				{/* </Row> */}
			</div>
		);
	}
};
