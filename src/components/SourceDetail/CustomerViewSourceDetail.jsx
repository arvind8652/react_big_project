import { React, useEffect, useState, useRef } from 'react';
import { Button, Card, Col, Row, Typography, Divider } from 'antd';
import { Avatar } from 'antd';
import GenericBadge from '../GenericBadge/GenericBadge';
import AvatarLogo from '../Avatar/AvatarLogo';
import { AvatarSize } from '../../constants/AvatarSize';
import { palette, fontSet } from '../../theme';
import GenericCard from '../GenericCard/GenericCard';
import TypoGraphy from '../TypoGraphy/TypoGraphy';
import UserDetails from '../UserDetail/UserDetail';

const { Text, Link, Title } = Typography;

const defaultValue = {
	sourceName: 'Referral',
	sourceTypeName: 'Existing Customer',
	fullName: 'Mr. Markus Romus',
	email: 'alxendra@yahoo.com',
	contactNumber: '+654 4567 6767',
	name: 'Alexandra Sandralock',
	family: 'Sandralock Family',
	id: 'Asan102104',
	tags: 'Wealth'
};
const CustomerViewSourceDetail = ({ sourceDetail = defaultValue }) => {
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
		},
		name: {
			fontSize: fontSet.heading.large
		}
	};

	return (
		<>
			<GenericCard header={'Source Details'}>
				<Row gutter={[, 32]}>
					<Col span={8}>
						<TypoGraphy label={'Source'}>{sourceDetail?.sourceName ?? '-'}</TypoGraphy>
					</Col>
					<Col span={8}>
						<TypoGraphy label={'Source Type'}>{sourceDetail?.sourceTypeName ?? '-'}</TypoGraphy>
					</Col>

					<Col span={8}>
						<TypoGraphy label={'Source Name'}>{sourceDetail?.sourceValueName ?? '-'}</TypoGraphy>
					</Col>
					<Col span={8}>
						<TypoGraphy label={'Sourced By'}>{sourceDetail?.sourcedByName ?? '-'}</TypoGraphy>
					</Col>
				</Row>
			</GenericCard>
		</>
	);
};
export default CustomerViewSourceDetail;
