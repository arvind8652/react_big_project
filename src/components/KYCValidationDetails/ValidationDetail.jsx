import { React, useEffect, useState, useRef } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Card, Col, Row, Typography, Divider } from 'antd';
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
	faUpload
} from '@fortawesome/pro-solid-svg-icons';
import moment from 'moment';
import { getDateFormat } from '../../utils/utils';
import { palette } from '../../theme';

const { Text, Link, Title } = Typography;

const ValidationDetail = ({ validationDetails }) => {
	const [addAttachmentModalVisible, setAddAttachmentModalVisible] = useState(false);
	const styleSet = {
		validationBlock: {
			color: palette.secondary.light
		}
	};

	return (
		<>
			<Card
				className='opportunityViewCardDetail'
				bordered={false}
				title='KYC Validation Details'
				style={{ width: '100%', marginTop: '15px', marginBottom: '15px' }}
			>
				<Row justify='space-between' align='bottom'>
					<Col className='gutter-row' span={8}>
						<Row gutter={16}>
							<p className='opportunityDetailText' style={styleSet.validationBlock}>
								{validationDetails.email}
							</p>
						</Row>
						<Row gutter={16}>
							<p className='opportunityDescriptionText'>Primary ID</p>
						</Row>
					</Col>

					<Col className='gutter-row' span={8}>
						<Row gutter={16}>
							<p className='opportunityDetailText' style={styleSet.validationBlock}>
								{validationDetails.mobile}
							</p>
						</Row>
						<Row gutter={16}>
							<p className='opportunityDescriptionText'>Primary ID Number</p>
						</Row>
					</Col>

					<Col className='gutter-row' span={8}>
						<Row gutter={16}>
							<p className='opportunityDetailText' style={styleSet.validationBlock}>
								{validationDetails.email}
							</p>
						</Row>
						<Row gutter={16}>
							<p className='opportunityDescriptionText'>Expiry Date</p>
						</Row>
					</Col>
				</Row>
				<Divider />

				<Row>
					<Col className='gutter-row' span={8}>
						<Row gutter={16}>
							<p className='opportunityDetailText' style={styleSet.validationBlock}>
								{validationDetails.address}
							</p>
						</Row>
						<Row gutter={16}>
							<p className='opportunityDescriptionText'>FATCA Validation</p>
						</Row>
					</Col>
					<Col className='gutter-row' span={8}>
						<Row gutter={16}>
							<p className='opportunityDetailText' style={styleSet.validationBlock}>
								{validationDetails.address}
							</p>
						</Row>
						<Row gutter={16}>
							<p className='opportunityDescriptionText'>PEP</p>
						</Row>
					</Col>
					<Col className='gutter-row' span={8}>
						<Row gutter={16}>
							<p className='opportunityDetailText' style={styleSet.validationBlock}>
								{validationDetails.address}
							</p>
						</Row>
						<Row gutter={16}>
							<p className='opportunityDescriptionText'>Potentially Vulnerable</p>
						</Row>
					</Col>
				</Row>
				<Divider />
				<Row>
					<Col className='gutter-row' span={8}>
						<Row gutter={16}>
							<p className='opportunityDetailText' style={styleSet.validationBlock}>
								{validationDetails.name}
							</p>
						</Row>
						<Row gutter={16}>
							<p className='opportunityDescriptionText'>AMLA</p>
						</Row>
					</Col>
					<Col className='gutter-row' span={8}>
						<Row gutter={16}>
							<p className='opportunityDetailText' style={styleSet.validationBlock}>
								{validationDetails.address}
							</p>
						</Row>
						<Row gutter={16}>
							<p className='opportunityDescriptionText'>Banned List</p>
						</Row>
					</Col>
				</Row>
			</Card>
		</>
	);
};
export default ValidationDetail;
