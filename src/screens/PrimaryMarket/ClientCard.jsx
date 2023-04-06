import { Col, Row, Typography, Avatar, Tag, Card } from 'antd';
import { palette } from '../../theme';

const { Title } = Typography;

export const ClientCard = ({ clientData = {}, showBorder = true }) => {
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
		eachTag: {
			fontSize: '0.8rem',
			borderRadius: '1em',
			padding: '2px 10px',
			marginBottom: '5px',
			marginTop: '5px',
			color: '#696A91',
			backgroundColor: '#F0F2FB'
		},
		avatar: {
			color: '#f56a00',
			backgroundColor: '#fde3cf',
			fontSize: '1rem',
			marginRight: '10px'
		},
		eachLabel: {
			color: '#898EA9',
			margin: '0px',
			fontSize: '0.8vw'
		},
		eachInfo: {
			color: '#222747',
			margin: '0px',
			fontSize: '1.2vw'
		},
		block: {
			height: '155px',
			width: '155px'
		},
		leftMargin: {
			marginLeft: '2vw',
			marginBottom: '0.5vw'
		}
	};

	const withBorder = {
		borderRadius: '0.3rem',
		border: '1px solid #CBD6FF',
		margin: '0 1em 0 1em'
	};

	const withoutBorder = {
		margin: '0 1em 0 1em'
	};

	return (
		clientData && (
			<Card style={showBorder ? withBorder : withoutBorder} bordered={showBorder}>
				<Row>
					<Col>
						{clientData?.profileImage ? (
							<Avatar
								style={styleSet.avatar}
								size={40}
								src={`data:image/jpeg;base64,${clientData?.profileImage}`}
							/>
						) : (
							<Avatar style={styleSet.avatar} size={40}>
								{clientData?.profileInitial}
							</Avatar>
						)}
					</Col>
					<Col>
						<p style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{clientData.name}</p>
						<Row style={{ marginTop: '-25px' }}>
							<Col>
								<span style={{ marginRight: '10px', fontSize: '0.7rem' }}>
									{clientData.customerCategory}
								</span>
							</Col>
						</Row>
					</Col>

					<Col style={styleSet.leftMargin}>
						<Title level={4} style={styleSet.eachInfo}>
							{clientData.taxStatus ? (
								<span style={{ color: '#CD0000' }}>{clientData?.taxStatus}</span>
							) : (
								<span style={{ color: '#CD0000' }}>Taxable</span>
							)}
						</Title>
						<Title level={5} style={styleSet.eachLabel}>
							Tax Status
						</Title>
					</Col>

					{/* ------------------------------- */}
					<Col style={styleSet.leftMargin}>
						<Title level={4} style={styleSet.eachInfo}>
							{clientData?.mobile ? clientData?.mobile : '-'}
						</Title>
						<Title level={5} style={styleSet.eachLabel}>
							{'Mobile no.'}
						</Title>
					</Col>
					<Col style={styleSet.leftMargin}>
						<Title level={4} style={styleSet.eachInfo}>
							{clientData?.email ? clientData?.email : '-'}
						</Title>
						<Title level={5} style={styleSet.eachLabel}>
							{'Email Id'}
						</Title>
					</Col>
					<Col style={styleSet.leftMargin}>
						<Title level={4} style={styleSet.eachInfo}>
							{clientData?.ctype ? clientData?.ctype : '-'}
						</Title>
						<Title level={5} style={styleSet.eachLabel}>
							{'Client Type'}
						</Title>
					</Col>
					<Col style={styleSet.leftMargin}>
						<Title level={4} style={styleSet.eachInfo}>
							{clientData?.mailCountryName ? clientData?.mailCountryName : '-'}
						</Title>
						<Title level={5} style={styleSet.eachLabel}>
							{'Resident Country'}
						</Title>
					</Col>
					<Col style={styleSet.leftMargin}>
						<Title level={4} style={styleSet.eachInfo}>
							{clientData?.riskCategory ? clientData?.riskCategory : '-'}
						</Title>
						<Title level={5} style={styleSet.eachLabel}>
							{'Agreed Risk Profile'}
						</Title>
					</Col>
					{clientData?.tagName && (
						<Col style={styleSet.leftMargin}>
							<Title level={4} style={styleSet.eachInfo}>
								{clientData?.tagName ? clientData?.tagName : '-'}
							</Title>
							<Title level={5} style={styleSet.eachLabel}>
								{'Wealth Personnel'}
							</Title>
						</Col>
					)}
					<Col style={styleSet.leftMargin}>
						{/* <Title level={4} style={styleSet.eachInfo}>{clientData?.mailAddress?clientData?.mailAddress+", "+clientData?.mailCityName+", "+clientData?.mailStateName+", "+clientData?.mailCountryName+", "+clientData?.mailAddPin :"-"}</Title> */}
						<Title level={4} style={styleSet.eachInfo}>
							{clientData?.mailAddress}
						</Title>
						{/* <Title level={4} style={styleSet.eachInfo}>{clientData?.mailCityName+", "+clientData?.mailAddPin}</Title> */}
						{/* <Title level={4} style={styleSet.eachInfo}>{clientData?.mailStateName}</Title> */}
						<Title level={4} style={styleSet.eachInfo}>
							{clientData?.mailCityName +
								', ' +
								clientData?.mailAddPin +
								', ' +
								clientData?.mailStateName +
								', ' +
								clientData?.mailCountryName}
						</Title>
						{/* <Title level={4} style={styleSet.eachInfo}>{clientData?.mailAddPin}</Title> */}
						<Title level={5} style={styleSet.eachLabel}>
							{'Address'}
						</Title>
					</Col>
					{/* -------------------------------- */}
				</Row>
			</Card>
		)
	);
};
