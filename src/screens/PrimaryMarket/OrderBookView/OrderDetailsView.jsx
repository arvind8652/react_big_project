import React from 'react';
import moment from 'moment';
import { Row, Col } from 'antd';
import { styleSet } from '../Style';
import { LabelWithSubText } from './LabelWithSubText';

export const OrderDetailsView = (props) => {
	const { orderDetails = {} } = props;
	const orderList = [
		{
			subtext: 'Order Date',
			label: 'valueDate',
			type: 'Date'
		},
		{
			subtext: 'Price',
			type: '',
			label: 'appAmount'
		},
		{
			subtext: 'Application Quantity',
			label: 'eligUnits',
			type: ''
		},
		{
			subtext: orderDetails?.assetGroup === 'EQ' ? 'Applicaton Amount' : 'Face Value',
			label: 'fcyTotPaid',
			type: ''
		},
		{
			subtext: 'Broker',
			label: 'agentName',
			type: ''
		},
		{
			subtext: 'Brokerage',
			label: 'brokerage',
			type: ''
		},
		{
			subtext: 'Other Charges',
			label: 'fcyArrangerFee',
			type: ''
		},
		{
			subtext: 'Settlement Value',
			label: 'nettVal',
			type: ''
		},
		{
			subtext: 'Default Credit Account',
			label: 'bankAccForINMName',
			type: ''
		},
		{
			subtext: 'Custodian',
			label: 'custodianName',
			type: ''
		},
		{
			subtext: 'DP Account Numbers',
			label: 'dpAccountNo',
			type: ''
		}
	];

	return (
		<>
			{Object.keys(orderDetails).length ? (
				<Row>
					{orderList.map((ele) => {
						return (
							<Col style={styleSet.container} span={8}>
								<LabelWithSubText
									label={
										ele.type === 'Date'
											? moment(orderDetails[ele.label]).format('DD MMM YYYY')
											: orderDetails[ele.label] ?? '-'
									}
									subtext={ele.subtext}
								/>
							</Col>
						);
					})}
				</Row>
			) : (
				<Row>
					<Col style={styleSet.container} span={24}>
						No Order Details{' '}
					</Col>
				</Row>
			)}
		</>
	);
};
