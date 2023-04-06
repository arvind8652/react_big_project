import React from 'react';
import { connect } from 'react-redux';
import { faPlus } from '@fortawesome/pro-light-svg-icons';
import { Select, Button, Card, Typography, Row, Col } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { palette, fontSet, theme } from '../../theme';
import { executeSetDropdownValue } from '../../redux/actions/commonActions';
import CustomModal from '../Modal/CustomModal/CustomModal';
import ReactToPrint from 'react-to-print';

const defaultList = [
	{
		id: 0,
		menuName: 'Benchmark',
		data: {}
	},
	{
		id: 1,
		menuName: 'Capital ',
		data: {}
	}
	// {
	//   id: 2,
	//   menuName: "Yearly",
	//   data: {},
	// },
];

const defaultFunction = (event) => {
	console.log(event);
};

const GenericCard = ({
	header = false,
	children,
	menuFlag = 0, // 0 --> Blank, 1 --> Button, 2 -->Dropdown
	buttonTitle = 'Button Title',
	onClick,
	onClickPrint,
	menuList = defaultList,
	viewAll = false,
	dropdownKey = 'defaultKey',
	printFlag = 2,
	fpoverviewDataFlag = false,
	investmentDataFlag = false,
	componentRef,
	viewClick = defaultFunction
}) => {
	const styleSet = {
		cardStyle: {
			borderRadius: '8px',
			width: '100%'
		},
		cardHeader: {
			color: palette.text.heavy
		},
		dropdownBtn: {
			height: '36px',
			width: '122px',
			// width: "100%",
			color: palette.secondary.heavy,
			backgroundColor: palette.invert.light
		},
		headerStyle: {
			width: '100%',
			marginTop: '15px',
			marginBottom: '15px',
			text: fontSet.heading.large
		},
		buttonStyle: {
			color: `${palette.primary.primary}`
		},
		selectStyle: {
			border: `1px solid ${palette.text.cardBrder}`,
			borderRadius: '5px',
			color: `${palette.secondary.heavy}`,
			background: `${palette.invert.light}`
		},
		btnBlock: { display: 'flex', justifyContent: 'space-between' },
		viewAllBtn: {
			textAlign: 'right',
			padding: '8px'
		},
		btnStyle: {
			border: '1px solid #6674C7',
			borderRadius: '8px',
			fontSize: fontSet.body.large,
			color: palette.text.btn
		}
	};

	function handleMenuClick(e) {
		// message.info('Click on menu item.');
	}

	const { Option } = Select;

	function handleChange(event) {
		let payload = {};
		const value = menuList.filter((item) => item.id === event);
		payload[`${dropdownKey}`] = value[0]?.menuName;
		executeSetDropdownValue(payload);
	}

	const renderExtra = () => {
		return (
			<>
				{menuFlag === 1 ? (
					// <Button type='text' onClick={onClick} style={styleSet.buttonStyle}>
					// 	{buttonTitle && buttonTitle != 'Calculate' && (
					// 		<FontAwesomeIcon icon={faPlus} style={{ marginRight: '7px' }} />
					// 	)}
					// 	{buttonTitle}
					// </Button>
					buttonTitle === 'Calculate' ? (
						<Button type='text' onClick={onClick} style={styleSet.buttonStyle}>
							{buttonTitle}
						</Button>
					) : (
						buttonTitle && (
							<Row>
								<Col>
									<Typography.Title level={5}>
										<Typography.Link onClick={onClick}>{`+ ${buttonTitle}`}</Typography.Link>
									</Typography.Title>
								</Col>
								{printFlag === 6 && fpoverviewDataFlag && investmentDataFlag && (
									<Col>
										<ReactToPrint
											trigger={() => (
												<Typography.Title level={5} style={{ marginLeft: '10px' }}>
													<Typography.Link onClick={onClickPrint}>{`Print`}</Typography.Link>
												</Typography.Title>
											)}
											content={() => componentRef.current}
											documentTitle={'Investment Policy Statement'}
										/>
									</Col>
								)}
							</Row>
						)
					)
				) : (
					menuFlag === 2 && (
						<Select
							defaultValue={menuList[0].id}
							style={styleSet.dropdownBtn}
							onChange={handleChange}
						>
							{menuList.map((option) => (
								<Option value={option.id} key={option.id}>
									{option.menuName}
								</Option>
							))}
						</Select>
					)
				)}
			</>
		);
	};

	return (
		<>
			<Card style={theme.cardStyle} bordered={false} title={header} extra={renderExtra()}>
				{children}
				{viewAll && (
					<div style={styleSet.viewAllBtn}>
						<Button size='large' style={styleSet.btnStyle} onClick={viewClick}>
							View all
						</Button>
					</div>
				)}
			</Card>
		</>
	);
};
export default connect()(GenericCard);
