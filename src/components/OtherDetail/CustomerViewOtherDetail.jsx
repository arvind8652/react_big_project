import { React, useEffect, useState, useRef } from 'react';
import { Button, Card, Col, Row, Typography, Divider } from 'antd';

import AvatarLogo from '../Avatar/AvatarLogo';
import { AvatarSize } from '../../constants/AvatarSize';
import { palette, fontSet } from '../../theme';
import GenericCard from '../GenericCard/GenericCard';
import TypoGraphy from '../TypoGraphy/TypoGraphy';
import UserDetails from '../UserDetail/UserDetail';
import moment from 'moment';
import { getDateFormat } from '../../utils/utils';

const { Text, Link, Title } = Typography;

const defaultValue = {
	currencyName: 'Euro',
	remarks: 'This is remark of John Doe',
	inputDateTime: '07 Dec 2020, 10:30 pm'
};
const CustomerViewOtherDetail = ({ otherDetail = defaultValue }) => {
	const styleSet = {
		relationBlock: {
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

	return (
		<>
			<GenericCard header={'Other Details'}>
				<Row gutter={[, 32]}>
					<Col span={8}>
						<TypoGraphy label={'Reporting Currency'}>{otherDetail?.currencyName ?? '-'}</TypoGraphy>
					</Col>
					<Col span={8}>
						{/* <TypoGraphy label={'Investment Value'}> */}
						<TypoGraphy label={'Investible Funds'}>
							{otherDetail?.investmentValueName ?? '-'}
						</TypoGraphy>
					</Col>
					<Col span={8}>
						{/* <TypoGraphy label={'Map Prospect'}>{otherDetail?.prospectIdName ?? '-'}</TypoGraphy> */}
						<TypoGraphy label={'Mapped / Converted Prospect'}>
							{otherDetail?.prospectName ?? '-'}
						</TypoGraphy>
					</Col>
					<Col span={8}>
						<TypoGraphy label={'Remarks'}>{otherDetail?.remarks ?? '-'}</TypoGraphy>
					</Col>
				</Row>
			</GenericCard>
		</>
	);
};
export default CustomerViewOtherDetail;
