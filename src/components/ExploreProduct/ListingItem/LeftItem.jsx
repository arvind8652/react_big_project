// antd
import { Col, Rate, Row, Progress, Space, Tag } from 'antd';
import { palette, fontSet } from '../../../theme';

import { TinyArea } from '@ant-design/charts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { theme } from '../../../theme';

import '../ExploreProduct.scss';
import { SecurityCard } from '../../../screens/PrimaryMarket/SecurityCard';

import TypoGraphy from '../../TypoGraphy/TypoGraphy';
import { faArrowAltUp } from '@fortawesome/pro-solid-svg-icons';

import moment from 'moment';

const defaultValue = {
	securityName: 'Alexandra Romus', //  found as securityName
	id: 'BDO1928345', // found as id
	tagName: 'Equity', //  found as securedType
	secondaryTag: 'Stocks', // found as assetType
	value: '$21', // not found latestPrice
	risk: 'Moderate', // not found riskCategory, found currencySymbol
	score: '5', // found score
	category: 'Multi Cap', // not found
	sector: 'Industrial', // found sector
	lastUpdate: '21 June 202', // not found
	fund: '25%', // not found fund
	sp: '21%', // not found securityProduct
	alpha: '8%', // not found alpha
	downsideRisk: '2.5%', // found downsideRisk
	categoryName: 'Trending',
	securityDetails: {
		isinCode: '',
		securityInitials: '',
		rating: ''
	}
};

const LeftItem = ({ rowData = defaultValue, tabName = '' }) => {
	const data = rowData?.securityDetails?.graphDetails?.map((e) => e?.price); // [0, 1000, 240, 340, 839, 810, 850];
	const config = {
		autoFit: true,
		data: data,
		smooth: false,
		areaStyle: {
			fill: `l(270) 0:#ffffff 1:${rowData?.isUp ? palette.text.success : '#FFDEDC'}`,
			fillOpacity: 0.1,

			shadowBlur: 3,
			shadowOffsetX: 1,
			shadowOffsetY: 1,
			cursor: 'pointer'
		},
		line: {
			color: rowData?.isUp ? palette.text.success : '#BE5C56'
		}
	};

	const styleSet = {
		container: {
			fontSize: fontSet.body.xsmall,
			color: rowData?.isUp ? palette.text.success : '#BE5C56'
		},
		containerStyle: {
			marginLeft: '15px'
		},
		bannerId: {
			//fontSize: fontSet.body.xsmall,
			color: palette.text.main,
			alignItems: 'center'
		},
		subContainer: {
			fontSize: fontSet.body.xsmall,
			color: palette.text.dark,
			marginTop: '10px'
			//marginLeft: "80px",
			//marginRight: "15px",
		},
		subMain: {
			fontSize: fontSet.body.xsmall,
			color: palette.text.dark,
			marginTop: '10px'
			//marginLeft: "80px",
			//marginRight: "15px",
		},
		subStyle: {
			fontSize: fontSet.body.xsmall,
			color: palette.text.dark,
			marginTop: '10px',
			marginLeft: '35px'
			//marginRight: "15px",
		},
		subStyleCard: {
			fontSize: fontSet.body.xsmall,
			color: palette.text.dark,
			marginTop: '10px',
			marginLeft: '15%'
			//marginRight: "15px",
		},
		labelCard: {
			fontSize: fontSet.body.large,
			color: palette.text.main
		},
		subCategory: {
			fontSize: fontSet.body.xsmall,
			color: palette.text.dark,
			marginTop: '10px',
			marginLeft: '15px'
			// marginRight: "15px",
		},
		subIcon: {
			marginTop: '10px'
		},
		mapBlock: {
			height: '65px',
			width: '350px'
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
			width: '155px'
		},
		subCardHeader: {
			fontSize: fontSet.body.large,
			color: palette.text.scard
		},
		sCardHeader: {
			fontSize: fontSet.body.xxlarge,
			color: palette.text.scard
		},
		noImage: {
			backgroundColor: '#F0F2FB',
			height: '75px',
			width: '75px',
			borderRadius: '50%',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center'
		},
		initials: {
			color: '#222747',
			fontSize: '20px',
			margin: 0,
			padding: 0
		},
		mainContainer: {
			paddingLeft: '48px',
			paddingBottom: '10px',
			borderRadius: '8px',
			paddingTop: '10px'
		},
		truncate: {
			width: '222px',
			whiteSpace: 'nowrap',
			overflow: 'hidden',
			textOverflow: 'ellipsis'
		}
	};

	const renderColWithGraph = () => (
		<>
			<Col style={{ marginLeft: '25px' }}>
				<Row>
					<Col style={styleSet.container}>
						<TypoGraphy clabel={rowData?.averagePrice}>
							<div style={styleSet.sCardHeader}>
								{rowData?.securityDetails?.currencySymbol &&
								rowData?.securityDetails?.securityProduct
									? rowData?.securityDetails?.currencySymbol +
									  rowData?.securityDetails?.securityProduct
									: 0}
							</div>
						</TypoGraphy>
					</Col>
				</Row>
				<Row>
					<Col style={{ ...styleSet.cBlock, paddingTop: 15 }}>
						<TypoGraphy label={'Last Update'}>
							<div style={styleSet.subCardHeader}>
								{rowData?.securityDetails?.lastUpdatedDate
									? moment(rowData?.securityDetails?.lastUpdatedDate).format('DD-MM-YYYY')
									: '-'}
							</div>
						</TypoGraphy>
					</Col>
				</Row>
			</Col>
			<Col style={{ marginLeft: '15px' }}>
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
							<div style={styleSet.subCardHeader}>{rowData?.securityDetails?.fund}%</div>
						</TypoGraphy>
					</Col>
					<Col style={styleSet.subStyleCard}>
						<TypoGraphy label={'S&P 500'}>
							<div style={styleSet.subCardHeader}>{rowData?.securityDetails?.securityProduct}%</div>
						</TypoGraphy>
					</Col>
					<Col style={styleSet.subStyleCard}>
						<div style={styleSet.subCardHeader}>
							<FontAwesomeIcon icon={faArrowAltUp} style={{ color: '#05BC6A', height: '60px' }} />
						</div>
					</Col>
					<Col style={styleSet.subCategory}>
						<TypoGraphy label={'Alpha'}>
							<div style={styleSet.subCardHeader}>{rowData?.securityDetails?.alpha}%</div>
						</TypoGraphy>
					</Col>
				</Row>
			</Col>
		</>
	);

	const renderColForBondTab = () => {
		const data = [
			[
				{
					label: 'Interest Rate',
					value: rowData?.securityDetails?.interestRate
				},
				{
					label: 'Minimum Investment',
					value: rowData?.securityDetails?.minInvestMent
				}
			],
			[
				{ label: 'Minimum Tenure', value: rowData?.securityDetails?.minTenure },
				{ label: 'Current VTM', value: rowData?.securityDetails?.currentVTM }
			],
			[
				{
					label: 'Maximum Tenure',
					value: rowData?.securityDetails?.maxTenure + ' Months'
				},
				{ label: 'Payout', value: rowData?.securityDetails?.payout }
			]
		];

		return (
			<>
				{data?.map((e) => {
					return (
						<Col style={{ marginLeft: '25px' }}>
							<Space size={40} direction='vertical'>
								<Row>{renderLabelAndValue(e[0]?.label, e[0]?.value)}</Row>

								<Row>{renderLabelAndValue(e[1]?.label, e[1]?.value)}</Row>
							</Space>
						</Col>
					);
				})}
			</>
		);
	};

	const renderLabelAndValue = (label = '', value = '') => {
		return (
			<Col style={styleSet.subMain}>
				<TypoGraphy label={label}>
					<div style={styleSet.subCardHeader}>{value}</div>
				</TypoGraphy>
			</Col>
		);
	};

	return (
		<SecurityCard
			marketType={rowData.securityDetails?.isPrimary ? 'PRIMARY' : 'Secondary'}
			data={rowData.securityDetails}
		/>
	);
};

export default LeftItem;

/* <Col style={styleSet.mainContainer}> */
//   <Row align="middle">
//     <Col>
//       <Row>
//         <Col>
//           <div style={styleSet.noImage}>
//             <h4 style={styleSet.initials}>
//               {rowData.securityDetails?.securityInitials}
//             </h4>
//           </div>
//           {/* <Avatar style={avatar.mediumAvatar} /> */}
//         </Col>
//         <Col style={styleSet.containerStyle}>
//           <Row style={theme.profileName}>
//             <div className="securityName">{rowData.securityName}</div>
//           </Row>
//           <Row style={styleSet.bannerId}>
//             {rowData?.securityDetails?.isinCode
//               ? `${rowData?.securityDetails?.isinCode} | `
//               : ""}
//             {rowData?.securityDetails?.rating ? (
//               <Rate
//                 defaultValue={rowData.securityDetails?.rating}
//                 style={{
//                   marginLeft: "10px",
//                   fontSize: "12px",
//                   display: "inline-block",
//                   verticalAlign: "middle",
//                   color: "#48528D",
//                 }}
//               />
//             ) : (
//               "No Rating"
//             )}
//           </Row>
//           <Row style={{ alignItems: "center", margin: "5px 0px" }}>
//             <Tag className="eachTag">
//               {rowData?.securityDetails?.assetGroupName}
//             </Tag>
//             <Tag className="eachTag">
//               {rowData?.securityDetails?.assetTypeName}
//             </Tag>
//           </Row>
//           <Row>
//             {renderLabelAndValue(
//               "Category",
//               rowData?.securityDetails?.category
//             )}

//             <Col style={styleSet.subCategory}>
//               <TypoGraphy
//                 label={rowData?.isGraph ? "Credit Rating" : "Sector"}
//               >
//                 <div style={styleSet.subCardHeader}>
//                   {rowData?.isGraph
//                     ? rowData?.securityDetails?.creditRating || "NA"
//                     : rowData?.securityDetails?.sector || "NA"}
//                 </div>
//               </TypoGraphy>
//             </Col>
//           </Row>
//         </Col>
//       </Row>
//     </Col>

//     {rowData?.isGraph ? renderColWithGraph() : renderColForBondTab()}

//     <Col style={{ marginLeft: "25px" }}>
//       <Row>
//         <div style={styleSet.block}>
//           <Progress
//             strokeColor={{
//               "0%": "#FFFFFF",
//               "100%": "#FFC122",
//             }}
//             percent={71}
//             showInfo={false}
//           />
//         </div>
//       </Row>
//       <Row>
//         <Col>
//           <TypoGraphy label={"Risk"}>
//             <div style={styleSet.subCardHeader}>
//               {rowData?.securityDetails?.riskCategory}
//             </div>
//           </TypoGraphy>
//         </Col>

//         <Col style={{ marginLeft: "24px" }}>
//           <TypoGraphy label={"Score"}>
//             <div style={styleSet.subCardHeader}>
//               {rowData?.securityDetails?.riskScore}
//             </div>
//           </TypoGraphy>
//         </Col>
//       </Row>
//       <h1>{rowData?.securityDetails?.downsideRisk}</h1>
//       <Row>
//         <Col style={styleSet.cBlock}>
//           <TypoGraphy
//             label={rowData?.isGraph ? "Compounding" : "Downside Risk"}
//           >
//             <div style={styleSet.subCardHeader}>
//               {rowData?.isGraph
//                 ? rowData?.securityDetails?.compounding
//                 : rowData?.securityDetails?.downsideRisk}
//             </div>
//           </TypoGraphy>
//         </Col>
//       </Row>
//     </Col>
//   </Row>
//   {/* <Divider style={{ marginTop: 5, marginBottom: 5 }} /> */}
// </Col>
