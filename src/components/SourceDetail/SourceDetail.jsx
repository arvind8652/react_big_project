import { React, useEffect, useState, useRef } from 'react';
import { Button, Card, Col, Row, Typography, Divider } from 'antd';

import AvatarLogo from '../Avatar/AvatarLogo';
import { AvatarSize } from '../../constants/AvatarSize';
import { palette, fontSet, avatar, theme } from '../../theme';
import GenericCard from '../GenericCard/GenericCard';
import TypoGraphy from '../TypoGraphy/TypoGraphy';
import UserDetails from '../UserDetail/UserDetail';
import UserDetailView from '../UserDetail/UserDetailView';
import Avatar from 'antd/lib/avatar/avatar';

const { Text, Link, Title } = Typography;

const defaultValue = {
	source: '',
	referralType: ' ',
	sourcedByValue: ' ',
	fullName: '',
	email: '',
	contactNumber: ''
};
const SourceDetail = ({ sourceDetail = defaultValue }) => {
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
			<GenericCard header={'Source Details'}>
				<Row gutter={[, 32]}>
					<Col span={8}>
						<TypoGraphy label={'Source'}>{sourceDetail?.sourceName}</TypoGraphy>
					</Col>
					<Col span={8}>
						<TypoGraphy label={'Source Type'}>{sourceDetail?.sourceTypeName}</TypoGraphy>
					</Col>

					<Col span={8}>
						<TypoGraphy label={'Source Name'}>{sourceDetail?.sourceValueName}</TypoGraphy>
					</Col>
					<Col span={8}>
						<TypoGraphy label={'Sourced By'}>{sourceDetail?.sourcedByName}</TypoGraphy>
					</Col>
				</Row>
			</GenericCard>
		</>
	);
};
export default SourceDetail;
