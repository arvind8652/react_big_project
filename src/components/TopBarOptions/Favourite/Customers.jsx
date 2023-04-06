import { List, Avatar, Tag, Row, Col } from 'antd';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { theme } from '../../../theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faClipboardCheck, faPhoneAlt } from '@fortawesome/pro-solid-svg-icons';
import { faHotjar } from '@fortawesome/free-brands-svg-icons';

import { palette } from '../../../theme';
import RupeeOrNonRupee from '../../RupeeOrNonRupee/RupeeOrNonRupee';

const defaultValues = [];

const styleSet = {
	avatar: {
		color: '#fff',
		backgroundColor: '#696A91',
		fontSize: '1.8rem',
		padding: '0.65em',
		width: '2.5em',
		height: '2.5em'
	},
	avSize: '220',
	faviconStyleMargin: { marginRight: '1em' },
	avatarPic: {
		color: '#fff',
		backgroundColor: '#696A91',
		width: '5em',
		height: '5em'
	}
};

const Customers = ({ data = defaultValues, onCloseDrawer }) => {
	const history = useHistory();

	const onCellDefault = (data) => {
		const toObject = {
			pathname: `/dashboard/Profile`,
			state: {
				clientObject: data
			}
		};
		history.push(toObject);
		onCloseDrawer();
	};

	data = useSelector((state) => state?.favouritesReducer.CLIENTADD);

	return (
		<List
			dataSource={data}
			renderItem={(item) => (
				<List.Item
					key={item.clientCode}
					onClick={() => {
						onCellDefault(item);
					}}
				>
					<List.Item.Meta
						avatar={
							item.profileImage !== '' ? (
								<Avatar
									src={'data:image/jpeg;base64,' + item.profileImage}
									size={styleSet.avSize}
									style={styleSet.avatarPic}
								></Avatar>
							) : (
								<Avatar style={styleSet.avatar} size={styleSet.avSize}>
									{item.profileInitial}
								</Avatar>
							)
						}
						title={
							<>
								<div style={{ display: 'flex', flexWrap: 'wrap' }}>
									<span style={{ width: '40%' }}>
										<p
											style={{
												marginBottom: '0px',
												color: '#222747',
												fontSize: '1rem'
											}}
										>
											{item.name}
										</p>
										<p style={{ fontSize: '0.65rem', color: '#696A91' }}>
											{item.clientCode + ' | ' + item.familyName}
										</p>
									</span>
									<span style={{ width: '60%' }}>
										{item.netAsset ? (
											<Col flex={3} offset={3} style={{ color: '#696A91' }}>
												{item.currencySymbol} <RupeeOrNonRupee amount={item.netAsset} />
												<br />
												<p>AUM</p>
											</Col>
										) : (
											''
										)}
									</span>
								</div>
								{/*  */}
							</>
						}
						description={
							<>
								<Row style={{ fontSize: '0.62rem' }}>
									<Col>
										<FontAwesomeIcon
											icon={faMapMarkerAlt}
											size='small'
											style={{
												...styleSet.faviconStyleMargin,
												marginRight: '5px',
												color: palette.text.main
											}}
										/>
									</Col>
									<Col>
										{item.address}, {item.city}
									</Col>
								</Row>
								<Row style={{ marginTop: '0.3em' }}>
									<Col span={7}>
										{item.customerCategory && (
											<Tag
												style={{
													borderRadius: '1em',
													color: '#696A91',
													backgroundColor: '#F0F2FB',
													fontSize: '1rem',
													marginRight: '2.5em'
												}}
											>
												{item.customerCategory}
											</Tag>
										)}
									</Col>

									{item.mobile && (
										<Col flex={3} style={{ textAlign: 'right' }}>
											<FontAwesomeIcon
												icon={faPhoneAlt}
												size='small'
												style={{
													marginRight: '0.4em',
													color: palette.text.main
												}}
											/>{' '}
											{item.mobile}
										</Col>
									)}
								</Row>
							</>
						}
					/>
				</List.Item>
			)}
		></List>
	);
};

export default Customers;
