import { Col, Row, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import TypoGraphy from '../../components/TypoGraphy/TypoGraphy';
import moment from 'moment';
const defaultValue = {
	account: '',
	accountName: 'Chris Ramo’s Retirement Portfolio',
	yTM: '8.25%',
	faceValue: '1000',
	price: '1000',
	orderDate: '01/06/2021',
	brokerFee: '100',
	accuredInterest: '25',
	broker: '',
	brokerName: 'Chris Do',
	transferFee: '1000',
	custodyFee: '100',
	otherInstructionName: 'Nil',
	settelmentValue: '1000',
	orderInstruction: '',
	orderInstructionName: 'GTC',
	currencySymbol: '$',
	otherInstruction: 'Other Instruction'
};
const OrderDetailsCard = ({ apiData }) => {
	const [mappedData, setMappedData] = useState(defaultValue);

	useEffect(() => {
		setMappedData({
			account: '',
			accountName: apiData?.schemeName,
			yTM: apiData?.purYield,
			faceValue: apiData?.fcyGrossVal,
			price: apiData?.rate,
			orderDate: moment(apiData?.valueDate).format('DD MMM YYYY'),
			brokerFee: apiData?.fcyBrkCommn,
			accruedInterest: apiData?.fcyGrossInt,
			brokerName: apiData?.brokerName,
			transferFee: apiData?.fcyTransChrg,
			custodyFee: apiData?.custchrg,
			otherCharges: 'Other Charges',
			otherInstructionName: apiData?.otherInstructionName,
			settelmentValue: apiData?.fcyNettVal,
			orderInstructionName: apiData?.orderInstructionName,
			currencySymbol: apiData?.currencySymbol
		});
	}, [apiData]);

	return (
		<>
			<Space direction='vertical'>
				<Row>
					<Col span={24}>
						<TypoGraphy labelSize={'xlarge'} label={'Account Name'}>
							{mappedData.accountName}
						</TypoGraphy>
					</Col>
				</Row>
				<Row>
					<Col span={24}>
						<TypoGraphy labelSize={'xlarge'} label={'YTM'}>
							{mappedData.yTM}%
						</TypoGraphy>
					</Col>
				</Row>
				<Row>
					<Col span={8}>
						<TypoGraphy labelSize={'xlarge'} label={'Face Value'}>
							{mappedData.currencySymbol} {mappedData.faceValue}
						</TypoGraphy>
					</Col>
					<Col span={8}>
						<TypoGraphy labelSize={'xlarge'} label={'Price'}>
							{mappedData.currencySymbol} {mappedData.price}
						</TypoGraphy>
					</Col>
					<Col span={8}>
						<TypoGraphy labelSize={'xlarge'} label={'Order Date'}>
							{mappedData.orderDate}
						</TypoGraphy>
					</Col>
				</Row>
				<Row>
					<Col span={8}>
						<TypoGraphy labelSize={'xlarge'} label={'Broker Fees'}>
							{mappedData.currencySymbol} {mappedData.brokerFee}
						</TypoGraphy>
					</Col>
					<Col span={8}>
						<TypoGraphy labelSize={'xlarge'} label={'Accrued Interest'}>
							{mappedData.currencySymbol} {mappedData.accruedInterest}
						</TypoGraphy>
					</Col>
					<Col span={8}>
						<TypoGraphy labelSize={'xlarge'} label={'Broker'}>
							{mappedData.brokerName}
						</TypoGraphy>
					</Col>
				</Row>
				<Row>
					{/* <Col span={8}>
            <TypoGraphy labelSize={"xlarge"} label={"Other Charges"}>
              {mappedData.otherCharges}
            </TypoGraphy>
          </Col> */}
					<Col span={8}>
						<TypoGraphy labelSize={'xlarge'} label={'Transfer Fee'}>
							{mappedData.currencySymbol} {mappedData.transferFee}
						</TypoGraphy>
					</Col>
					<Col span={8}>
						<TypoGraphy labelSize={'xlarge'} label={'Custody Fees'}>
							{mappedData.currencySymbol} {mappedData.custodyFee}
						</TypoGraphy>
					</Col>
					<Col span={8}>
						<TypoGraphy labelSize={'xlarge'} label={'Other Instruction'}>
							{mappedData.otherInstructionName}
						</TypoGraphy>
					</Col>
				</Row>
				<Row>
					<Col span={8}>
						<TypoGraphy labelSize={'xlarge'} label={'Settlement Value'}>
							{mappedData.currencySymbol} {mappedData.settelmentValue}
						</TypoGraphy>
					</Col>
					<Col span={8}>
						<TypoGraphy labelSize={'xlarge'} label={'Order Instruction'}>
							{mappedData.orderInstructionName}
						</TypoGraphy>
					</Col>
				</Row>
			</Space>
		</>
	);
};

export default OrderDetailsCard;
