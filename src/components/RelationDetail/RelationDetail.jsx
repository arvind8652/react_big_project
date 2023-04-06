import { React, useEffect, useState, useRef } from 'react';
import { Button, Card, Col, Row, Typography, Divider, Image, Empty } from 'antd';

import AvatarLogo from '../Avatar/AvatarLogo';
import { AvatarSize } from '../../constants/AvatarSize';
import { palette, fontSet, avatar } from '../../theme';
import GenericCard from '../GenericCard/GenericCard';
import TypoGraphy from '../TypoGraphy/TypoGraphy';
import UserDetail from '../UserDetail/UserDetail';
import moment from 'moment';
import Avatar from 'antd/lib/avatar/avatar';
import { theme } from '../../theme';
import UserDetailView from '../UserDetail/UserDetailView';

const { Text, Link, Title } = Typography;
const defaultUserDetails = {
	name: 'BDO Global Equity...',
	id: 'BD190048',
	tags: 'Equity'
};
const defaultValue = [
	{
		relation: '',
		dateOfBirth: '',
		fullName: '',
		email: '',
		contactNumber: '',
		mobile: ''
	}
];
const RelationDetail = ({
	// userDetails = defaultUserDetails,
	relationDetailsTrue = defaultValue,
	relationDetailsFalse
}) => {
	const styleSet = {
		relationBlock: {
			color: palette.secondary.light
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
			<GenericCard header='Relationship Details'>
				{/* {
           defaultValue !== null ? ( */}
				{/* <div> */}

				{relationDetailsTrue &&
					relationDetailsTrue?.map((item, idx) => (
						<Row key={idx} gutter={[, 32]}>
							<Col span={8} style={styleSet.container}>
								{/* <UserDetailView UserDetailView={relationDetailsTrue} /> */}
								<Row>
									<Col>
										{item.profileImage != null ? (
											<Avatar style={avatar.smallAvatar} src={item.profileImage}></Avatar>
										) : (
											<Avatar style={{ color: '#f56a00', backgroundColor: '#E5EBFF' }} size={55}>
												{item.profileInitial}
											</Avatar>
										)}
									</Col>
									<Col style={{ marginLeft: '10px' }}>
										<TypoGraphy>{item?.name ?? '-'}</TypoGraphy>
										<TypoGraphy label={`${item?.id} | ${item?.family}`}></TypoGraphy>
										<Row style={theme.profileTag}>
											<div className='opportunityTag'>{item?.tagName ?? '-'}</div>
											{/* <div className="opportunityTag">{item.secondaryTag}</div> */}
										</Row>
									</Col>
								</Row>
							</Col>
							<Col span={8}>
								<TypoGraphy label={'Relation'}>{item?.relation ?? '-'}</TypoGraphy>
							</Col>
							{/* 
                    <Row>
                      <div>There Is No Data</div>
                    </Row> */}
							<Col span={8}>
								<TypoGraphy label={'Date of Birth'}>
									{item?.dateOfBirth ? moment(item?.dateOfBirth).format('DD MMM YYYY') : '-'}
								</TypoGraphy>
							</Col>
						</Row>
					))}

				<hr />
				{relationDetailsFalse &&
					relationDetailsFalse.map((item) => (
						<>
							<Row gutter={[, 32]}>
								<Col span={8}>
									<TypoGraphy label={'Full Name'}>{item?.fullName ?? '-'}</TypoGraphy>
								</Col>
								<Col span={8}>
									<TypoGraphy label={'Relation'}>{item?.relation ?? '-'}</TypoGraphy>
								</Col>
								<Col span={8}>
									<TypoGraphy label={'Date of Birth'}>
										{item?.dateOfBirth ? moment(item?.dateOfBirth).format('DD MMM YYYY') : '-'}
									</TypoGraphy>
								</Col>
								<Col span={8}>
									<TypoGraphy label={'Email ID'}>{item?.email ?? '-'}</TypoGraphy>
								</Col>
								<Col span={8}>
									<TypoGraphy label={'Contact Number'}>
										{item?.dialCode
											? item?.dialCode + ' ' + item?.contactNumber
											: item?.contactNumber}
									</TypoGraphy>
								</Col>
							</Row>
						</>
					))}

				{/* </div> */}
				{/* ) 
        : (
            <div><Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /></div>
          ) 
        }  */}
			</GenericCard>
		</>
	);
};
export default RelationDetail;
