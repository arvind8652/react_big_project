import React from 'react';
import moment from 'moment';
import { Row, Col } from 'antd';
import TypoGraphy from '../../../components/TypoGraphy/TypoGraphy';
import { styleSet } from '../Style';
import { LabelWithSubText } from './LabelWithSubText';

export const PaymentDetailsView = (props) => {
	const { paymentDetails = {} } = props;
	const paymentList = [
		{
			subtext: 'Payment Mode',
			label: 'instrTypeName',
			type: ''
		},
		{
			subtext: 'Payment Date',
			type: 'Date',
			label: 'chqDate'
		},
		{
			subtext: 'Bank A/c',
			label: 'accountName',
			type: ''
		},
		{
			subtext: 'Cheque Number',
			label: 'chqNumber',
			type: ''
		},
		{
			subtext: 'Bank Name',
			label: 'bankName',
			type: ''
		}
	];
	return (
		<>
			{paymentDetails && Object.keys(paymentDetails).length ? (
				<Row>
					{paymentList.map((ele) => {
						return (
							<Col style={styleSet.container} span={8}>
								<LabelWithSubText
									label={
										ele.type === 'Date'
											? moment(paymentDetails[ele.label]).format('DD MMM YYYY')
											: paymentDetails[ele.label] ?? '-'
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
						No Payment Details{' '}
					</Col>
				</Row>
			)}
		</>
	);
};
