// antd
import { Col, Row, Select, Tooltip } from 'antd';

// icon
import { InteractionOutlined, ShoppingCartOutlined, TagOutlined } from '@ant-design/icons';
import { faArrowAltToBottom, faFilter } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// react
import React, { useEffect, useRef, useState } from 'react';

// redux
import { connect } from 'react-redux';

import moment from 'moment';

// styles
import './TradeBook.scss';

// components
import TableUI from './TableUI';
import RenderAdvancedFilterDrawer from './RenderAdvancedFilterDrawer';
import { exportJSON } from '../../utils/utils';
// Authorized
import { authorizeModule } from '../../utils/utils';
import { CONSTANTS } from '../../constants/constants';

const InsideTabView = ({
	tradeBookList,
	filterOptions,
	sortOptions,
	advancedFilter,
	tradeBookType,
	clientId,
	showCurrencySymbol,
	showLoader = false,
	leftPanel
}) => {
	// white box
	const [buyValue, setBuyValue] = useState(0);
	const [buyValueCount, setBuyValueCount] = useState(0);
	const [sellValue, setSellValue] = useState(0);
	const [sellValueCount, setSellValueCount] = useState(0);
	const [isFilterApplied, setIsFilterApplied] = useState(false);

	// drop down
	const [dropDownValue, setDropDownValue] = useState(null);

	// REMOVED FOR THIS PHASE, SO JUST COMMENTED
	// const [options, setOptions] = useState([]);

	// purple box
	const [currMonth, setCurrMonth] = useState(0);
	const [currQuarter, setCurrQuarter] = useState(0);
	const [currYear, setCurrYear] = useState(0);

	// for table
	// const [tableData, setTableData] = useState(
	// 	tradeBookList.schemedetail
	// 	.sort((a, b) => new Date(b["valueDate"]) - new Date(a["valueDate"])));
	const [tableData, setTableData] = useState([]);

	// filter
	const [showDrawer, hideShowDrawer] = useState(false);
	const [filters, setFilters] = useState({});
	const [sortDisplayValue, setSortDisplayValue] = useState('Sort: Show All');
	const [filterDisplayValue, setFilterDisplayValue] = useState('Filter: Show All');
	const [newFilterOptions, setNewFilterOptions] = useState([]);

	// refs
	const isSelected = useRef({ sort: false, filter: false });
	// Authorized Code
	let authorizeCode = '';
	leftPanel &&
		leftPanel.map((menu) => {
			menu.subMenu.map((subMenu) => {
				if (subMenu.subMenuId == 'TRADEBOOK') authorizeCode = subMenu.authorizeCode;
			});
		});

	useEffect(() => {
		const newFilters = {
			securityFilters: advancedFilter?.securityFilters,
			schemeFilters: advancedFilter?.schemeFilters,
			assetTypeFilters: advancedFilter?.assetTypeFilters,
			orderTypeFilters: advancedFilter?.orderTypeFilters,
			counterpartyFilters: advancedFilter?.counterpartyFilters,
			statusFilters: advancedFilter?.statusFilters,
			transactionMaxValue: advancedFilter?.transactionMaxValue,
			startDate: advancedFilter?.startDate,
			endDate: advancedFilter?.endDate
		};
		if (tradeBookType !== 'CustomerTradeBook') {
			newFilters.customerNameFilters = getUniqueCustomerName();
		}
		setFilters(newFilters);
	}, [advancedFilter, tradeBookList]);

	const getUniqueCustomerName = () => {
		let newOptions = tradeBookList?.schemedetail?.map((e) => ({
			customerId: e?.customerId,
			customerName: e?.customerName
		}));

		newOptions = newOptions?.filter(
			(elem, index) => newOptions?.findIndex((obj) => obj.customerId === elem.customerId) === index
		);
		return newOptions;
	};

	const toggleDrawer = () => {
		hideShowDrawer(!showDrawer);
	};

	useEffect(() => {
		// setTableData(tradeBookList?.schemedetail || []);
		let newTableData = tradeBookList?.schemedetail ? [...tradeBookList?.schemedetail] : [];
		setTableData(
			newTableData?.sort((a, b) => new Date(b['valueDate']) - new Date(a['valueDate'])) || []
		);
		populateFilterDropDown();
	}, [tradeBookList]);

	const populateFilterDropDown = () => {
		let newOptions =
			tradeBookType === 'CustomerTradeBook'
				? []
				: tradeBookList?.schemedetail?.map((e) => ({
						dataValue: e?.customerId,
						displayValue: e?.customerName
				  }));

		// newOptions = newOptions ?.filter(
		//   (elem, index) =>
		//     newOptions ?.findIndex((obj) => obj.dataValue === elem.dataValue) ===
		//       index
		// );
		setNewFilterOptions(filterOptions);
	};

	const calculateMonthQuarterYearCount = (type, isDropDownValueNeeded = false) => {
		let newSchemeDetail;
		if (isDropDownValueNeeded) {
			newSchemeDetail = tableData?.filter(
				(e) => e?.scheme === dropDownValue && e.currentperiod === type
			)?.length;
		} else {
			newSchemeDetail = tableData?.filter((e) => e.currentperiod === type)?.length;
		}
		return newSchemeDetail;
	};

	const calculateTotalValue = (type, isDropDownValueNeeded = false) => {
		let newSchemeDetail;

		if (isDropDownValueNeeded) {
			newSchemeDetail = tableData
				?.filter((e) => e?.scheme === dropDownValue && e[type] !== null)
				?.reduce((accumulator, currentValue) => accumulator + currentValue[type], 0);
		} else {
			newSchemeDetail = tableData
				?.filter((e) => e[type] !== null)
				?.reduce((accumulator, currentValue) => accumulator + currentValue[type], 0);
		}

		return newSchemeDetail;
	};

	const calculateTotalValueCount = (type, isDropDownValueNeeded = false) => {
		let newSchemeDetail;

		if (isDropDownValueNeeded) {
			newSchemeDetail = tableData?.filter(
				(e) => e?.scheme === dropDownValue && e[type] !== null && e[type] > 0
			)?.length;
		} else {
			newSchemeDetail = tableData?.filter((e) => e[type] !== null && e[type] > 0)?.length;
		}
		return newSchemeDetail;
	};

	useEffect(() => {
		if (dropDownValue) {
			const buyValueKey = 'buyValue';
			// updating white box based on selection
			setBuyValue(calculateTotalValue(buyValueKey, true));
			setBuyValueCount(calculateTotalValueCount(buyValueKey, true));

			const sellValueKey = 'sellValue';
			setSellValue(calculateTotalValue(sellValueKey, true));
			setSellValueCount(calculateTotalValueCount(sellValueKey, true));

			// updating purple box based on selection
			setCurrMonth(calculateMonthQuarterYearCount('M', true));
			setCurrQuarter(calculateMonthQuarterYearCount('Q', true));
			setCurrYear(calculateMonthQuarterYearCount('Y', true));

			// updating table based on selection
			const newTableData = tradeBookList?.schemedetail?.filter((e) => e.scheme === dropDownValue);
			setTableData(newTableData);
		}
	}, [dropDownValue]);

	const populateDropDown = () => {
		let newOptions = tradeBookList?.schemedetail?.map((e) => ({
			displayValue: e?.schemeName,
			dataValue: e?.scheme
		}));

		newOptions = newOptions?.filter(
			(elem, index) => newOptions?.findIndex((obj) => obj.dataValue === elem.dataValue) === index
		);
		setDropDownValue(null);
		// setOptions(newOptions);
	};

	useEffect(() => {
		const buyValueKey = 'buyValue';
		setBuyValue(calculateTotalValue(buyValueKey));
		setBuyValueCount(calculateTotalValueCount(buyValueKey));

		const sellValueKey = 'sellValue';
		setSellValue(calculateTotalValue(sellValueKey));
		setSellValueCount(calculateTotalValueCount(sellValueKey));

		// calculating month quarter and year
		setCurrMonth(calculateMonthQuarterYearCount('M'));
		setCurrQuarter(calculateMonthQuarterYearCount('Q'));
		setCurrYear(calculateMonthQuarterYearCount('Y'));

		populateDropDown();
	}, [tableData]);

	const styles = {
		rightSpace: {
			marginRight: '1rem'
		},
		leftMoreSpace: {
			marginLeft: '-7rem',
			position: 'relative'
		},
		leftLessSpace: {
			marginLeft: '-4rem',
			position: 'relative'
		},
		leftMediumSpace: {
			marginLeft: '-5rem',
			position: 'relative'
		}
	};

	const isFilterValueSelected = () => isSelected.current.filter;

	const sortByDate = (key, type) => {
		let newTableData = tradeBookList?.schemedetail ? [...tradeBookList?.schemedetail] : [];
		if (isFilterValueSelected()) {
			newTableData = [...tableData];
		}
		if (type === 'asc') {
			newTableData = newTableData?.sort(
				(a, b) => new Date(a['valueDate']) - new Date(b['valueDate'])
			);
		} else if (type === 'desc') {
			newTableData = newTableData?.sort(
				(a, b) => new Date(b['valueDate']) - new Date(a['valueDate'])
			);
		}
		setTableData(newTableData);
	};

	const sort = (key, type) => {
		let newTableData = tradeBookList?.schemedetail ? [...tradeBookList?.schemedetail] : [];
		if (isFilterValueSelected()) {
			newTableData = [...tableData];
		}
		if (type === 'asc') {
			newTableData = newTableData?.sort((a, b) => a[key] - b[key]);
		} else if (type === 'desc') {
			newTableData = newTableData?.sort((a, b) => b[key] - a[key]);
		}
		setTableData(newTableData);
	};

	const sortByCreatedDate = (days) => {
		let last7DayStart = moment().subtract(days, 'days').hours(0);
		let newTableData = tradeBookList?.schemedetail ? [...tradeBookList?.schemedetail] : [];

		newTableData = newTableData?.filter((e) => moment(e.valueDate) > last7DayStart);
		setTableData(newTableData);
	};

	const sortByTranType = (type) => {
		let newTableData = tradeBookList?.schemedetail?.filter((e) => e?.tranType === type);
		setTableData(newTableData);
	};

	const findIsBreached = () => {
		let newTableData = tradeBookList?.schemedetail?.filter((e) => e?.isBreached === true);
		setTableData(newTableData);
	};

	const filterByCustomer = (value) => {
		let newTableData = tradeBookList?.schemedetail ? [...tradeBookList?.schemedetail] : [];
		newTableData = newTableData?.filter((e) => e?.customerId === value);

		setTableData(newTableData);
	};

	const filterByVersion = () => {
		let newTableData = tradeBookList?.schemedetail ? [...tradeBookList?.schemedetail] : [];
		newTableData = newTableData
			?.filter((e) => e?.version > 1)
			?.sort((a, b) => b?.version - a?.version);
		setTableData(newTableData);
	};

	const handleFilterChange = (value) => {
		isSelected.current.filter = true;
		setFilterDisplayValue(
			'Filter: ' + newFilterOptions?.find((e) => e?.dataValue === value)?.displayValue
		);
		if (value === 'SHOWALL') {
			setTableData(tradeBookList?.schemedetail);
		} else if (value === 'RCNTMODF') {
			// sortByDate('valueDate', 'asc');
			filterByVersion();
		} else if (value === 'CREATED7') {
			sortByCreatedDate(7);
		} else if (value === 'CREATED15') {
			sortByCreatedDate(15);
		} else if (value === 'CREATED30') {
			sortByCreatedDate(30);
		} else if (value === 'SELL') {
			sortByTranType('SELL');
		} else if (value === 'BUY') {
			sortByTranType('BUY');
		} else if (value === 'PRIMARY') {
			sortByTranType('Primary Market Appliation');
		} else if (value === 'BREACHEDTRAN') {
			findIsBreached();
		} else {
			filterByCustomer(value);
		}
	};

	const handleSortChange = (value) => {
		isSelected.current.sort = true;
		setSortDisplayValue('Sort: ' + sortOptions?.find((e) => e?.dataValue === value)?.displayValue);
		if (value === 'TRANDATEFTON') {
			sortByDate('valueDate', 'desc');
		} else if (value === 'TRANDATENTOF') {
			sortByDate('valueDate', 'asc');
		} else if (value === 'TRANVALUELTOS') {
			sort('amount', 'desc');
		} else if (value === 'TRANVALUESTOL') {
			sort('amount', 'asc');
		}
	};

	const RenderDropdown = ({ mode, onSelect }) => {
		let options =
			mode === 'filter'
				? newFilterOptions?.map((e) => ({
						label: e?.displayValue,
						value: e?.dataValue
				  }))
				: sortOptions?.map((e) => ({
						label: e?.displayValue,
						value: e?.dataValue
				  }));

		return (
			<div style={{ position: 'relative' }}>
				{/* <div className='dropdown-prefix'>{mode.charAt(0).toUpperCase() + mode.substring(1)}:</div> */}
				<Select
					className={'filter-sort-dropdown ' + mode}
					size='large'
					onSelect={onSelect}
					placeholder={mode === 'filter' ? filterDisplayValue : sortDisplayValue}
					showArrow
					onChange={(value) =>
						mode === 'filter' ? handleFilterChange(value) : handleSortChange(value)
					}
				>
					{options &&
						options.map((option, index) => (
							<Select.Option key={index} value={option.value}>
								{option.label}
							</Select.Option>
						))}
				</Select>
			</div>
		);
	};

	const downloadRecords = () => {
		const csvData = tableData?.map((e, idx) => {
			return {
				'Sr.No': idx + 1,
				'Fund Name': e?.customerName,
				Id: e?.customerId,
				'Asset Group': e?.assetGroup,
				'Asset Type': e?.assetType,
				Consideration: e?.amount,
				Units: e?.units,
				Rate: e?.rate,
				'Trade Date': moment(e?.valueDate).format('DD-MM-YYYY'),
				Participants: e?.custodian,
				'Stock Exchange': e?.stockExchange,
				Account: e?.portfolio,
				Type: e?.assetType,
				Date: moment().format('DD-MMM-YYYY'),
				TimeStamp: moment().valueOf()
			};
		});
		exportJSON(csvData, 'Trade Book Listing');
	};

	const numberWithCommas = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

	return (
		<>
			<Row>
				<Col flex='52%' className='leftTopCard tradeCard'>
					<p className='cardTitle'>Trade Book</p>
					<Row justify='center'>
						<Col md={{ span: 7 }} style={styles.rightSpace}>
							<Row>
								<Col flex='auto'>
									<ShoppingCartOutlined className='cardIcons' />
								</Col>
								<Col
									flex='auto'
									className='tradeColumn'
									style={
										numberWithCommas(Math.floor(buyValue)).toString().length < 13
											? styles.leftMoreSpace
											: numberWithCommas(Math.floor(buyValue)).toString().length < 9 &&
											  numberWithCommas(Math.floor(buyValue)).toString().length > 6
											? styles.leftMediumSpace
											: styles.leftLessSpace
									}
								>
									<p>
										{showCurrencySymbol}
										{numberWithCommas(Math.floor(buyValue))}
									</p>
									<p>Buy Orders ({Math.floor(buyValueCount)})</p>
								</Col>
							</Row>
						</Col>
						<Col md={{ span: 7 }} style={styles.rightSpace}>
							<Row>
								<Col flex='auto'>
									<TagOutlined className='cardIcons' />
								</Col>
								<Col
									flex='auto'
									className='tradeColumn'
									style={
										numberWithCommas(Math.floor(buyValue)).toString().length < 13
											? styles.leftMoreSpace
											: numberWithCommas(Math.floor(buyValue)).toString().length < 9 ||
											  numberWithCommas(Math.floor(buyValue)).toString().length > 6
											? styles.leftMediumSpace
											: styles.leftLessSpace
									}
								>
									<p>
										{showCurrencySymbol}
										{numberWithCommas(Math.floor(sellValue))}
									</p>
									<p>Sell Orders ({Math.floor(sellValueCount)})</p>
								</Col>
							</Row>
						</Col>
						<Col md={{ span: 7 }} style={styles.rightSpace}>
							<Row>
								<Col flex='auto'>
									<InteractionOutlined className='cardIcons' />
								</Col>
								<Col
									flex='auto'
									className='tradeColumn'
									style={
										numberWithCommas(Math.floor(buyValue)).toString().length < 13
											? styles.leftMoreSpace
											: numberWithCommas(Math.floor(buyValue)).toString().length < 9 &&
											  numberWithCommas(Math.floor(buyValue)).toString().length > 6
											? styles.leftMediumSpace
											: styles.leftLessSpace
									}
								>
									<p>
										{showCurrencySymbol}
										{numberWithCommas(Math.floor(buyValue) + Math.floor(sellValue))}
									</p>
									<p>Net Trade ({buyValueCount + sellValueCount})</p>
								</Col>
							</Row>
						</Col>
					</Row>
				</Col>
				<Col flex='auto' className='rightTopCard tradeCard'>
					{/* {
                // for cutsomer 360 username is visible not for trade listing
                tradeBookList?.userName && (
                  <p className='cardTitle'>
                    {tradeBookList?.userName} portfolio
                  </p>
                )
              } */}
					<p className='cardTitle'>Consolidated</p>
					<Row>
						<Col span={12}></Col>
						<Col span={12}>
							{/* <Select
                value={dropDownValue}
                onChange={setDropDownValue}
                style={{ width: '100%' }}
                placeholder='Select Option'
                options={options?.map((e) => ({
                  label: e?.displayValue,
                  value: e?.dataValue
                }))}
              /> */}
						</Col>
					</Row>
					<Row>
						<Col span={8} className='tradeColumn'>
							<p>{currMonth}</p>
							<p>Current Month</p>
						</Col>
						<Col span={8} className='tradeColumn'>
							<p>{currMonth + currQuarter}</p>
							<p>Current Quarter</p>
						</Col>
						<Col span={8} className='tradeColumn'>
							<p>{currMonth + currQuarter + currYear}</p>
							<p>Current Year</p>
						</Col>
					</Row>
				</Col>
			</Row>
			<div className='filters-panel'>
				<div class='left'></div>
				<RenderDropdown mode='filter' />
				<RenderDropdown mode='sort' />
				<div className='right'>
					<div className='icon-filter-wrapper'>
						<Tooltip title='Advance Filter'>
							<FontAwesomeIcon icon={faFilter} className='icon' onClick={toggleDrawer} />
						</Tooltip>
						{isFilterApplied && <span class='filter-badge'></span>}
					</div>
					{authorizeModule(authorizeCode, CONSTANTS.authorizeCode.download) &&
						tableData?.length > 0 && (
							<Tooltip title='Download'>
								<FontAwesomeIcon
									icon={faArrowAltToBottom}
									className='icon'
									onClick={downloadRecords}
								/>
							</Tooltip>
						)}
				</div>
				{filters && (
					<RenderAdvancedFilterDrawer
						showDrawer={showDrawer}
						toggleDrawer={toggleDrawer}
						onAdvFilterSubmit={(val) => console.log(val)}
						filters={filters}
						setTableData={setTableData}
						tradeBookType={tradeBookType}
						clientId={clientId}
						setIsFilterApplied={setIsFilterApplied}
					/>
				)}
			</div>

			<TableUI tableData={tableData} showLoader={showLoader} authorizeCode={authorizeCode} />
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		tradeBookList: state.tradeBookList.tradeBookList,
		advancedFilter: state.tradeBookList.advancedFilter,
		leftPanel: state.dashboard.leftPanel
	};
};

export default connect(mapStateToProps)(InsideTabView);
