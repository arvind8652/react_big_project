import { React } from 'react';
import { Col, Row } from 'antd';

import { palette, fontSet, avatar } from '../../theme';
import GenericCard from '../GenericCard/GenericCard';
import TypoGraphy from '../TypoGraphy/TypoGraphy';
import moment from 'moment';
import Avatar from 'antd/lib/avatar/avatar';
import { theme } from '../../theme';

const defaultValue = [
	{
		relation: '',
		dateOfBirth: '',
		fullName: '',
		email: '',
		contactNumber: '',
		dialCode: ''
	}
];
const RelationDetail = ({ relationDetailsTrue = defaultValue, relationDetailsFalse }) => {
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
				{relationDetailsTrue &&
					relationDetailsTrue.map((item, idx) => (
						<Row key={idx} gutter={[, 32]}>
							<Col span={8} style={styleSet.container}>
								<Row>
									<Col>
										{item.profileImage != null ? (
											<Avatar
												style={avatar.smallAvatar}
												// src={item?.profileImage}
												src={`data:image/jpeg;base64,${item?.profileImage}`}
											></Avatar>
										) : (
											<Avatar style={{ color: '#f56a00', backgroundColor: '#E5EBFF' }} size={55}>
												{item?.profileInitial}
											</Avatar>
										)}
									</Col>
									{/* <Row><div>There Is No Data From BAckend Side</div></Row> */}
									<Col style={{ marginLeft: '10px' }}>
										{/* <Row style={theme.profileName}>{item?.name}</Row> */}
										<TypoGraphy>{item?.name ?? '-'}</TypoGraphy>
										<TypoGraphy label={`${item?.id} | ${item?.family}`}>
											{/* {item?.id} | {item?.family} */}
										</TypoGraphy>

										{/* <Row style={theme.profileTag}>
											{item?.id} | {item?.family}
										</Row> */}
										<Row style={theme.profileTag}>
											<div className='opportunityTag'>{item?.tagName ?? '-'}</div>
										</Row>
									</Col>
								</Row>
							</Col>
							<Col span={8}>
								<TypoGraphy label={'Relation'}>{item?.relation ?? '-'}</TypoGraphy>
							</Col>
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
										{item?.dialCode && item?.dialCode?.includes('+') ? '' : '+'}
										{item?.dialCode && item?.dialCode + ' '}
										{item?.contactNumber ?? '-'}
									</TypoGraphy>
								</Col>
							</Row>
						</>
					))}
			</GenericCard>
		</>
	);
};
export default RelationDetail;
