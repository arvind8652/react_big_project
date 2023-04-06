import { Row, Col } from 'antd';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';

const SMCalculatorScreen = ({
	info = {
		formValues: {
			transferFee: '',
			yield: ''
		}
	}
}) => {
	const RMN = useSelector((state) => state.auth.user.userName);
	const calculateStructureDeal = useSelector(
		(state) => state.pNBData?.calculateSMOrder?.dealRequisition
	);
	const dateFormat = 'DD-MM-YYYY';

	const styleSet = {
		commonBorder: {
			border: '1px solid black',
			padding: '0.2em',
			marginBottom: '0px'
		}
	};

	const momentDiff = (prev, next) => {
		let prevDate = prev;
		let nextDate = next;
		if (typeof prev === 'string') {
			prevDate = moment(prev);
		}

		if (typeof next === 'string') {
			nextDate = moment(next);
		}

		if (prev && next) {
			return prevDate.diff(nextDate, 'days');
		}
		return '';
	};

	const titleObject = {
		transaction: {
			key: 'Transaction',
			value: info.buySell
		},
		security: {
			key: 'Security Name',
			value: info.securityData?.securityName ?? ' '
		},
		accountName: {
			key: 'Account Name',
			value: info.accountName
		},
		rmn: {
			key: 'RM Name',
			value: RMN ?? ''
		}
	};

	const [dataObject, setDataObject] = useState({});

	useEffect(() => {
		// console.log(info.securityData);

		let updateObject = {
			isin: {
				key: 'ISIN',
				value: info.securityData.isinCode
			},
			issueDate: {
				key: 'Issue Date',
				value: info.securityData.basisDate
					? moment(info.securityData.basisDate).format(dateFormat)
					: ''
			},
			matDate: {
				key: 'Maturity Date',
				value: moment(info.securityData.matDate).format(dateFormat) ?? ''
			},
			couponRate: {
				key: 'Coupon Rate',
				value: info.securityData.interestRate
			},
			ytm: {
				key: 'Yield to Maturity',
				value: info.formValues.yield
			},
			finalTax: {
				key: 'Final Withholding Tax',
				value: info?.formValues?.withholdingTaxPer?.toString()
			}
		};

		if (info.securityData?.discounted === 'Y') {
			if (info.buySell === 'BUY') {
				setDataObject({
					...updateObject,
					oTerm: {
						key: 'Original Term',
						value:
							`${momentDiff(info.securityData.matDate, info.securityData.basisDate)} days` ??
							'0 days'
					},
					rTerm: {
						key: 'Remaining Term',
						value:
							`${momentDiff(info.securityData.matDate, info.formValues.orderDate)} days` ?? '0 days'
					},
					tradeDate: {
						key: 'Trade Date',
						value: moment(info.formValues.orderDate).format(dateFormat) ?? ''
					},
					sDate: {
						key: 'Settlement Date',
						value: calculateStructureDeal
							? moment(calculateStructureDeal.delDate).format(dateFormat)
							: ''
					},
					fv: {
						key: 'Face Value',
						value: info.formValues.faceValue
					},
					principal: {
						key: 'Principal',
						value:
							info.formValues.price * (info.formValues.faceValue / info.securityData.faceValue) ??
							''
					},
					bFee: {
						key: "Add: Broker's Fee",
						value: info.formValues.brokerage
					},
					tProceeds: {
						key: 'TOTAL PROCEEDS',
						value: info.formValues.settlementValue
					},
					advInt: {
						key: '  Advanced Interest ',
						value: info.formValues.faceValue - info.formValues.settlementValue
					},
					grossYield: {
						key: 'Gross Effective Yield',
						// value: info.formValues.yield,
						value: (
							100 *
							((((info.formValues.faceValue - info.formValues.settlementValue) /
								info.formValues.settlementValue) *
								360) /
								momentDiff(info.securityData.matDate, info.formValues.orderDate)) *
							(1 - info.formValues.withholdingTaxPer / 100)
						).toFixed(4)
					},
					netYield: {
						key: 'Net Effective Yield',
						// value:info.formValues.yield * (1 - info.formValues.withholdingTaxPer),
						value: (
							(100 *
								(((info.formValues.faceValue - info.formValues.settlementValue) /
									info.formValues.settlementValue) *
									360)) /
							momentDiff(info.securityData.matDate, info.formValues.orderDate)
						).toFixed(4)
					},
					mValueCh: {
						key: 'Maturity Value Check',
						value:
							info.securityData.faceValue *
							(info.formValues.faceValue / info.securityData.faceValue)
					}
				});
			} else {
				setDataObject({
					...updateObject,
					oTerm: {
						key: 'Original Term',
						value:
							`${momentDiff(info.securityData.matDate, info.securityData.basisDate)} days` ??
							'0 days'
					},
					rTerm: {
						key: 'Remaining Term',
						value:
							`${momentDiff(info.securityData.matDate, info.formValues.orderDate)} days` ?? '0 days'
					},
					tradeDate: {
						key: 'Trade Date',
						value: moment(info.formValues.orderDate).format(dateFormat) ?? ''
					},
					sDate: {
						key: 'Settlement Date',
						value: calculateStructureDeal
							? moment(calculateStructureDeal.delDate).format(dateFormat)
							: ''
					},
					fv: {
						key: 'Face Value',
						value: info.formValues.faceValue
					},
					principal: {
						key: 'Principal',
						value:
							info.formValues.price * (info.formValues.faceValue / info.securityData.faceValue) ??
							''
					},
					bFee: {
						key: "Add: Broker's Fee",
						value: info.formValues.brokerage
					},
					tProceeds: {
						key: 'TOTAL PROCEEDS',
						value: info.formValues.settlementValue
					}
				});
			}
		} else if (info.securityData?.intYN === 'Y' && info.buySell === 'BUY') {
			setDataObject({
				...updateObject,
				net: {
					key: 'Net Price',
					value: info.formValues.price ?? ''
				},
				oTerm: {
					key: 'Original Term',
					value:
						`${momentDiff(info.securityData.matDate, info.securityData.basisDate)} days` ?? '0 days'
				},
				rTerm: {
					key: 'Remaining Term',
					value:
						`${momentDiff(info.securityData.matDate, info.formValues.orderDate)} days` ?? '0 days'
				},
				aTerm: {
					key: 'Accrued Term',
					value:
						`${momentDiff(info.formValues.orderDate, info.securityData.lastIP)} days` ?? '0 days'
				},
				tradeDate: {
					key: 'Trade Date',
					value: moment(info.formValues.orderDate).format(dateFormat) ?? ''
				},
				sDate: {
					key: 'Settlement Date',
					value: calculateStructureDeal
						? moment(calculateStructureDeal.delDate).format(dateFormat)
						: ''
				},
				vDate: {
					key: 'Value Date',
					value: moment(info.formValues.orderDate).format(dateFormat) ?? ''
				},
				fv: {
					key: 'Face Value',
					value: info.formValues.faceValue
				},
				principal: {
					key: 'Principal',
					value:
						info.formValues.price * (info.formValues.faceValue / info.securityData.faceValue) ?? ''
				},
				netI: {
					key: 'Add: Net Accrued Interest',
					value: info.formValues.accruedInterest
				},
				tFee: {
					key: '          Transfer Fee',
					value: info.formValues.transferFee ?? '0'
				},
				bFee: {
					key: "          Broker's Fee",
					value: info.formValues.brokerage
				},
				tProceeds: {
					key: 'TOTAL PROCEEDS',
					value: info.formValues.settlementValue
				},
				cpnAmt: {
					key: 'Cpn Amount',
					value: calculateStructureDeal ? calculateStructureDeal.couponAmt : ''
				},
				remCpnAmt: {
					key: 'Rem # of Cpn Payments',
					value: calculateStructureDeal ? calculateStructureDeal.couponCnt : ''
				},
				totCpn: {
					key: 'Total Cpns Received',
					value: calculateStructureDeal
						? calculateStructureDeal.couponAmt * calculateStructureDeal.couponCnt
						: ''
				},
				cpnFV: {
					key: 'Total Cpns + FV',
					value: calculateStructureDeal
						? calculateStructureDeal.couponAmt * calculateStructureDeal.couponCnt +
						  info.formValues.faceValue
						: ''
				},
				grossYield: {
					key: 'Gross Effective Yield',
					// value: info.formValues.yield,
					value: (
						100 *
						(((((info.formValues.faceValue *
							(info.securityData.interestRate / 100) *
							(1 - info.formValues.withholdingTaxPer / 100) *
							180) /
							360) *
							calculateStructureDeal?.couponCnt +
							info.formValues.faceValue -
							info.formValues.settlementValue) *
							360) /
							(info.formValues.settlementValue *
								momentDiff(info.securityData.matDate, info.formValues.orderDate))) *
						(1 - info.formValues.withholdingTaxPer / 100)
					).toFixed(4)
				},
				netYield: {
					key: 'Net Effective Yield',
					// value: info.formValues.yield * (1 - info.formValues.withholdingTaxPer),
					value: (
						100 *
						(((((info.formValues.faceValue *
							(info.securityData.interestRate / 100) *
							(1 - info.formValues.withholdingTaxPer / 100) *
							180) /
							360) *
							calculateStructureDeal?.couponCnt +
							info.formValues.faceValue -
							info.formValues.settlementValue) *
							360) /
							(info.formValues.settlementValue *
								momentDiff(info.securityData.matDate, info.formValues.orderDate)))
					).toFixed(4)
				},
				mValueCh: {
					key: 'Maturity Value Check',
					// value: (info.formValues.settlementValue +
					// 	(info.formValues.settlementValue * ( ((((info.formValues.faceValue *
					// 	(info.securityData.interestRate)*
					// 	(1 - (info.formValues.withholdingTaxPer))*
					// 	180 /
					// 	360 *
					// 	calculateStructureDeal?.couponCnt ) +
					// 	info.formValues.faceValue -
					// 	info.formValues.settlementValue ) *
					// 	360 )/
					// (info.formValues.settlementValue * momentDiff(info.securityData.matDate, info.formValues.orderDate)))*
					// 	(1 - (info.formValues.withholdingTaxPer))) * (1 - (info.formValues.withholdingTaxPer)) * (momentDiff(info.securityData.matDate, info.formValues.orderDate)/ 360))),
					value: calculateStructureDeal
						? calculateStructureDeal.couponAmt * calculateStructureDeal.couponCnt +
						  info.formValues.faceValue
						: ''
				}
			});
		} else {
			setDataObject({
				...updateObject,
				net: {
					key: 'Net Price',
					value: info.formValues.price ?? ''
				},
				oTerm: {
					key: 'Original Term',
					value:
						`${momentDiff(info.securityData.matDate, info.securityData.basisDate)} days` ?? '0 days'
				},
				rTerm: {
					key: 'Remaining Term',
					value:
						`${momentDiff(info.securityData.matDate, info.formValues.orderDate)} days` ?? '0 days'
				},
				aTerm: {
					key: 'Accrued Term',
					value:
						`${momentDiff(info.formValues.orderDate, info.securityData.lastIP)} days` ?? '0 days'
				},
				tradeDate: {
					key: 'Trade Date',
					value: moment(info.formValues.orderDate).format(dateFormat) ?? ''
				},
				sDate: {
					key: 'Settlement Date',
					value: calculateStructureDeal
						? moment(calculateStructureDeal.delDate).format(dateFormat)
						: ''
				},
				vDate: {
					key: 'Value Date',
					value: moment(info.formValues.orderDate).format(dateFormat) ?? ''
				},
				fv: {
					key: 'Face Value',
					value: info.formValues.faceValue
				},
				principal: {
					key: 'Principal',
					value:
						info.formValues.price * (info.formValues.faceValue / info.securityData.faceValue) ?? ''
				},
				accInterest: {
					key: 'Add: Net Accrued Interest',
					value: info.formValues.accruedInterest
				},
				tFee: {
					key: '          Transfer Fee',
					value: info.formValues.transferFee ?? '0'
				},
				bFee: {
					key: "          Broker's Fee",
					value: info.formValues.brokerage
				},
				tProceeds: {
					key: 'TOTAL PROCEEDS',
					value: info.formValues.settlementValue
				}
			});
		}
	}, [info]);

	return (
		<div style={{ marginTop: '10%', paddingBottom: '10%' }}>
			<Row>
				<Col offset={4}>
					<center>
						<h1>Indicative Order Sheet</h1>
					</center>
				</Col>
			</Row>
			<Row>
				<Col offset={4} span={16}>
					{Object.keys(titleObject).map((eachObj) => (
						<Row key={eachObj}>
							<Col style={styleSet.commonBorder} span={14}>
								<h3 style={{ marginBottom: '0px' }}>{titleObject[eachObj].key}: </h3>
							</Col>
							<Col style={styleSet.commonBorder} span={10}>
								<h3 style={{ marginBottom: '0px' }}>{titleObject[eachObj].value}</h3>
							</Col>
						</Row>
					))}
					<br />
					{Object.keys(dataObject).map((eachObj, index) => (
						<Row key={index}>
							<Col style={styleSet.commonBorder} span={14}>
								<h4 style={{ marginBottom: '0px' }}>{dataObject[eachObj].key}</h4>
							</Col>
							<Col style={styleSet.commonBorder} span={10}>
								<p style={{ marginBottom: '0px' }}>{dataObject[eachObj].value ?? ''}</p>
							</Col>
						</Row>
					))}
				</Col>
			</Row>
		</div>
	);
};

export default SMCalculatorScreen;
