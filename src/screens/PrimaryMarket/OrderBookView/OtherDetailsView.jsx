import React from 'react';
import { Row, Col } from 'antd';
import { styleSet } from '../Style';
import { LabelWithSubText } from './LabelWithSubText';
import moment from 'moment';

export const OtherDetailsView = (props) => {
	const { otherDetails = {} } = props;
	const otherList = [
		{
			subtext: 'Booking Branch',
			label: 'branchName',
			type: ''
		},
		{
			subtext: 'Source of Fund',
			label: 'sourceOfFund',
			type: ''
		},
		{
			subtext: 'Fresh Funds',
			label: 'freshSchemeYnName',
			type: ''
		},
		{
			subtext: 'Source',
			label: 'sourceUserIdName',
			type: ''
		},
		{
			subtext: 'Other Source',
			label: 'othSourceName',
			type: ''
		},
		{
			subtext: 'Designation',
			label: 'othDesignation',
			type: ''
		},
		{
			subtext: 'Email Id',
			label: 'emailId',
			type: ''
		},
		{
			subtext: 'Malling Address',
			label: 'addressOthYnName',
			type: ''
		},
		{
			subtext: 'Remark',
			label: 'remarks',
			type: ''
		}
	];
	return (
		<>
			{Object.keys(otherDetails).length ? (
				<Row>
					{otherList.map((ele) => {
						return (
							<Col style={styleSet.container} span={8}>
								<LabelWithSubText
									label={
										ele.type === 'Date'
											? moment(otherDetails[ele.label]).format('DD MMM YYYY')
											: otherDetails[ele.label] ?? '-'
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
						No Other Details{' '}
					</Col>
				</Row>
			)}
		</>
	);
};
