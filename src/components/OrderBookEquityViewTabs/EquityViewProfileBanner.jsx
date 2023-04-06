import { React, useEffect, useState, useRef } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { connect } from 'react-redux';
import {
	Button,
	Card,
	Col,
	Row,
	Typography,
	Divider,
	Progress,
	PageHeader,
	Rate,
	Avatar,
	Image,
	Tag
} from 'antd';
import { LeftOutlined, UserAddOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/pro-light-svg-icons';
import {
	faMapMarkerAlt,
	faPhoneAlt,
	faEnvelope,
	faArrowLeft,
	faCheckCircle,
	faCaretUp,
	faCaretDown,
	faPaperclip,
	faUpload,
	faUser,
	faUserAltSlash,
	faUserAlt,
	faUserAlien,
	faUserCheck
} from '@fortawesome/pro-solid-svg-icons';
import {
	faTrashAlt,
	faEdit,
	faChevronRight,
	faChevronLeft,
	faCircle as NormalFaCircle,
	faPencilAlt,
	faChevronDoubleDown,
	faChevronDoubleUp,
	faFileTimes,
	faFileCheck
} from '@fortawesome/pro-regular-svg-icons';
import moment from 'moment';
import { getDateFormat } from '../../utils/utils';
import { avatar, palette, theme } from '../../theme';

const { Text, Link, Title } = Typography;
const defaultValue = {
	name: 'Alexandra Romus',
	id: 'BDO1928345',
	address: 'Central ave, Albany',
	tagName: 'Equity',
	secondaryTag: 'Stocks',
	mobile: '+63 98468265802',
	email: 'alxendra@yahoo.com',
	orderType: 'Buy',
	status: 'Order Placed',
	Amount: '$6000',
	quantity: '100',
	Price: '$560 / Unit',
	charges: '$40 / Unit',
	profileInitial: 'AB'
};

const EquityViewProfileBanner = ({ EquityViewProfileBanner = defaultValue }) => {
	const { opportunityViewData } = EquityViewProfileBanner;
	const styleSet = {
		container: {
			color: palette.text.banner
		},
		subContainer: {
			color: palette.text.banner,
			align: 'top'
		},
		iconStyle: {
			display: 'inline-flex',
			justifyContent: 'center',
			alignItems: 'center'
		},
		subIconStyle: {
			color: palette.text.banner,
			//stroke: '#FFFFFF',
			fontSize: '14px',
			display: 'inline-block',
			verticalAlign: 'middle'
		},
		eachTag: {
			fontSize: '18px',
			borderRadius: '16px',
			padding: '2px 10px',
			marginBottom: '5px',
			color: '#354081',
			backgroundColor: '#D9DFFF;'
		}
	};

	return (
		<>
			<PageHeader
				style={{
					backgroundImage: 'linear-gradient(to right, #354081 , #727EC6 )',
					marginTop: '-6.25rem'
				}}
				onBack={() => window.history.back()}
				backIcon={<FontAwesomeIcon icon={faChevronLeft} className='opportunityViewTopBarIcons' />}
				extra={[
					<FontAwesomeIcon
						icon={faFileCheck}
						onClick={() => ''(true)}
						className='opportunityViewTopBarIcons'
					/>,
					<FontAwesomeIcon
						icon={faFileTimes}
						onClick={() => ''(true)}
						className='opportunityViewTopBarIcons'
					/>,
					<FontAwesomeIcon
						icon={faTrashAlt}
						onClick={() => ''(true)}
						className='opportunityViewTopBarIcons'
					/>,
					<FontAwesomeIcon icon={faEdit} onClick={''} className='opportunityViewTopBarIcons' />,
					<FontAwesomeIcon
						icon={faChevronLeft}
						onClick={''}
						className='opportunityViewTopBarIcons'
					/>,
					<FontAwesomeIcon
						icon={faChevronRight}
						onClick={''}
						className='opportunityViewTopBarIcons'
					/>
				]}
			>
				<Row>
					<Col xxl={3} md={4} style={{ marginLeft: '20px' }}>
						{EquityViewProfileBanner.profileImage != null ? (
							<Avatar
								src={`data:image/jpeg;base64,${EquityViewProfileBanner.profileImage}`}
								size={120}
							></Avatar>
						) : (
							<Avatar
								style={{
									color: '#f56a00',
									backgroundColor: '#fde3cf',
									fontSize: '2.5rem',
									marginTop: '-20px'
								}}
								size={120}
							>
								{EquityViewProfileBanner.profileInitial}
							</Avatar>
						)}
					</Col>
					<Col xxl={6} md={7}>
						<Row>
							<Col>
								<Title level={3} style={{ color: '#FFF', margin: 0 }} className='opportunityName'>
									{EquityViewProfileBanner.name}
								</Title>
								<span className='opportunityDescriptionText' style={styleSet.container}>
									{EquityViewProfileBanner.id}
								</span>
								<span className='opportunityDescriptionText' style={styleSet.container}>
									{' '}
									|{' '}
								</span>
								<span className='opportunityDescriptionText' style={styleSet.iconStyle}>
									{<Rate theme='outlined' style={styleSet.subIconStyle} />}
								</span>
							</Col>
						</Row>
						<Row>
							<Col>
								<Tag style={styleSet.eachTag}>{EquityViewProfileBanner.tagName}</Tag>
							</Col>
							<Col>
								<Tag style={styleSet.eachTag}>{EquityViewProfileBanner.secondaryTag}</Tag>
							</Col>
						</Row>
					</Col>
					<Col span={12}>
						<Row gutter={[16, 16]}>
							<Col className='gutter-row' span={8}>
								<Row
									gutter={12}
									className='opportunityDetailText'
									style={{ ...theme.container, ...styleSet.container }}
								>
									{EquityViewProfileBanner.orderType}
								</Row>
								<Row gutter={16} className='opportunityDescriptionText' style={styleSet.container}>
									Order Type
								</Row>
							</Col>
							<Col className='gutter-row' span={8}>
								<Row
									gutter={16}
									className='opportunityDetailText'
									style={{ ...theme.container, ...styleSet.container }}
								>
									{EquityViewProfileBanner.currencySymbol === null &&
									EquityViewProfileBanner.currencySymbol === ''
										? EquityViewProfileBanner.currencySymbol + EquityViewProfileBanner.status
										: EquityViewProfileBanner.status}
								</Row>
								<Row gutter={16} className='opportunityDescriptionText' style={styleSet.container}>
									Status
								</Row>
							</Col>
							<Col className='gutter-row' span={8}>
								<Row
									gutter={12}
									className='opportunityDetailText'
									style={{ ...theme.container, ...styleSet.container }}
								>
									{EquityViewProfileBanner.Amount}
								</Row>
								<Row gutter={16} className='opportunityDescriptionText' style={styleSet.container}>
									Amount
								</Row>
							</Col>
						</Row>
						<Row gutter={[16, 16]}>
							<Col className='gutter-row' span={8}>
								<Row
									gutter={16}
									className='opportunityDetailText'
									style={{ ...theme.container, ...styleSet.container }}
								>
									{EquityViewProfileBanner.quantity}
								</Row>
								<Row gutter={16} className='opportunityDescriptionText' style={styleSet.container}>
									Quantity
								</Row>
							</Col>
							<Col className='gutter-row' span={8}>
								<Row
									gutter={16}
									className='opportunityDetailText'
									style={{ ...theme.container, ...styleSet.container }}
								>
									{EquityViewProfileBanner.Price}
								</Row>
								<Row gutter={16} className='opportunityDescriptionText' style={styleSet.container}>
									Price
								</Row>
							</Col>
							<Col className='gutter-row' span={8}>
								<Row
									gutter={16}
									className='opportunityDetailText'
									style={{ ...theme.container, ...styleSet.container }}
								>
									{EquityViewProfileBanner.charges}
								</Row>
								<Row gutter={16} className='opportunityDescriptionText' style={styleSet.container}>
									Charges
								</Row>
							</Col>
						</Row>
					</Col>
				</Row>
			</PageHeader>
		</>
	);
};

export default EquityViewProfileBanner;
