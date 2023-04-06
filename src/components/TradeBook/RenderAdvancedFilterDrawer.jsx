import { Col, Form, Row, Select, Slider } from 'antd';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { connect } from 'react-redux';
// import { executeGetTradeBookList } from '../../redux/actions/tradeBookListActions';
import { ScRangePicker } from '../StyledComponents/formElements';

import GenericDrawer from '../GenericDrawer/GenericDrawer';
import { palette } from '../../theme';

import { getTradeBookList, getAdvanceFilter } from '../../api/tradeBookListApi';
import {
	executeGetTradeBookList,
	executeGetTradeBookListAdvancedFilter
} from '../../redux/actions/tradeBookListActions';

// Context
import { ActiveTabContext } from './Listing';

//Custom SCSS
import './TradeBook.scss';

const RenderAdvancedFilterDrawer = ({
	showDrawer,
	toggleDrawer,
	filters,
	onAdvFilterSubmit,
	propsTradeBookList,
	setTableData,
	tradeBookType,
	clientId,
	setIsFilterApplied
}) => {
	const { Option } = Select;

	const dateFormat = 'DD-MM-YYYY';
	// using context
	const activeTab = useContext(ActiveTabContext);

	const [maxValueSlider, onChangeMaxValue] = useState([0, filters.transactionMaxValue]);
	const [changedFilters, setChangedFilters] = useState({});
	const [fromDate, setFromDate] = useState(null);
	const [toDate, setToDate] = useState(null);

	const [tradeBookList, setTradeBookList] = useState([]);
	const [filterCount, setFilterCount] = useState(0);

	const styles = {
		filterTitle: { marginBottom: '2px', marginTop: '15px' },
		select: {
			width: '100%',
			borderRadius: '4px',
			border: '1px solid #cbd6ff',
			background: '#f6f7fb',
			boxSizing: 'border-box'
		},
		filterDrawTitle: { color: palette.primary.dark },
		submitButton: {
			backgroundColor: palette.primary.dark,
			color: palette.invert.heavy,
			borderRadius: '8px',
			fontSize: '18px',
			marginTop: '10px',
			alignContent: 'flex-end'
		},
		subtitle: {
			fontFamily: 'Open Sans',
			fontSize: '1rem',
			lineHeight: '25px',
			color: '#696a91',
			marginTop: '-1rem'
		}
	};

	const callDateAPI = async () => {
		const postObject = {
			data: {
				Deal: {
					AssetGroup: activeTab
				},
				CustomerId: tradeBookType === 'CustomerTradeBook' ? clientId : null,
				Period: null,
				FromRowNumber: 0,
				RowSize: 25,
				Filterparam: null,
				Sorting: null,
				Scheme: null,
				Security: null,
				AssetType: null,
				CounterParty: null,
				TranType: null,
				Status: null,
				TransactionValueMin: maxValueSlider[0],
				TransactionValueMax: maxValueSlider[1],
				StartDate: fromDate ? moment(fromDate).format('YYYY-MM-DD') : null,
				EndDate: toDate ? moment(toDate).format('YYYY-MM-DD') : null
			}
		};

		//THIS WAS THERE
		const response = await getTradeBookList(postObject);
		setTradeBookList(response.data);
		// const response = await getAdvanceFilter(postObject);
		// setTradeBookList(response.data);

		// executeGetTradeBookList(postObject);
		// executeGetTradeBookListAdvancedFilter(postObject)
	};

	useEffect(() => {
		callDateAPI();
	}, [fromDate, toDate]);

	const applyFiltersOnList = (e) => {
		const parsedFilters = parseJSON();
		console.log({ parsedFilters });
		return (
			parsedFilters?.assetTypeFilters?.some((filter) => filter?.assetType === e?.assetType) ||
			parsedFilters?.counterpartyFilters?.some(
				(filter) => filter?.counterParty === e?.counterParty
			) ||
			parsedFilters?.orderTypeFilters?.some((filter) => filter?.tranType === e?.tranType) ||
			parsedFilters?.schemeFilters?.some((filter) => filter?.scheme === e?.scheme) ||
			parsedFilters?.securityFilters?.some((filter) => filter?.security === e?.security) ||
			parsedFilters?.statusFilters?.some((filter) => filter?.status === e?.status) ||
			parsedFilters?.customerNameFilters?.some((filter) => filter?.customerId === e?.customerId)
		);
	};

	const isFilterApplied = () => Object?.keys(parseJSON())?.length > 0;

	const handleOnSubmit = () => {
		let newTableData = [];

		if (isFilterApplied()) {
			newTableData = tradeBookList?.schemedetail?.filter((e) => applyFiltersOnList(e));
			console.log(newTableData);
		}
		setTableData(newTableData);
		toggleDrawer();
	};

	const getFilteredKeys = (obj) => {
		let keys = Object.keys(obj);
		keys = keys.filter((e) => changedFilters[e]?.length !== 0);
		return keys;
	};

	const parseJSON = () => {
		const keys = getFilteredKeys(changedFilters);

		const parsedFilters = keys?.reduce((acc, e) => {
			acc[e] = changedFilters[e]?.map((e) => JSON.parse(e));
			return acc;
		}, {});
		return parsedFilters;
	};

	const FilterBody = () => {
		useEffect(() => {
			const formDataKeys = getFilteredKeys(changedFilters);
			let DateCheck = fromDate ? 1 : 0;
			let TransactionCheck =
				maxValueSlider[0] > 0 || maxValueSlider[1] < filters.transactionMaxValue ? 1 : 0;
			setFilterCount(formDataKeys.length + DateCheck + TransactionCheck);
		}, [changedFilters, fromDate]);

		useEffect(() => {
			if (filterCount > 0) {
				setIsFilterApplied(true);
			} else {
				setIsFilterApplied(false);
			}
		}, [filterCount]);

		return (
			<>
				<h1 style={styles.filterDrawTitle}>Filter</h1>
				<div style={styles.subtitle}>
					{' '}
					{filterCount === 0 ? 'No' : filterCount} tag
					{filterCount > 1 && 's '}{' '}
				</div>
				{filters &&
					Object.keys(filters).map((each, idx) => {
						if (typeof filters[each] === 'object') {
							let key =
								filters[each].length > 0 &&
								Object.keys(filters[each][0]).filter((key) => key.includes('Name'));
							const titleRegex = each.replace(/([A-Z])/g, ' $1');
							const title = titleRegex.charAt(0).toUpperCase() + titleRegex.slice(1);
							return (
								<Row key={idx}>
									<Col span={24}>
										<p style={styles.filterTitle}>{title} :</p>
										<Select
											mode='multiple'
											value={
												changedFilters[each] !== undefined
													? changedFilters[each].length > 0
														? changedFilters[each]
														: []
													: []
											}
											onChange={(val) => {
												setChangedFilters({
													...changedFilters,
													[each]: val
												});
											}}
											style={styles.select}
											size='large'
											placeholder={title}
										>
											{filters[each].map((val, index) => (
												<Option value={JSON.stringify(val)} label={val[key]} key={index}>
													{val[key]}
												</Option>
											))}
										</Select>
									</Col>
								</Row>
							);
						}
					})}
				<Row>
					<Col span={24}>
						<Form.Item label='From Date To Date' name='ddrRange'>
							<ScRangePicker
								allowClear={true}
								onChange={(e) => {
									if (e) {
										setFromDate(e[0]);
										setToDate(e[1]);
									} else {
										setFromDate(null);
										setToDate(null);
									}
									// updateTradeBookListBasedOnFromAndToDate();
								}}
								onPanelChange={(e) => {
									console.log('I was clicked', e);
								}}
								defaultValue={
									fromDate && toDate
										? [moment(fromDate, dateFormat), moment(toDate, dateFormat)]
										: null
								}
								format={dateFormat}
							/>
						</Form.Item>
					</Col>
				</Row>
				<Row style={{ marginBottom: '100px' }}>
					<Col span={24}>
						<p>Transaction Max Value :</p>
						<Slider
							range
							min={0}
							max={filters.transactionMaxValue}
							onAfterChange={onChangeMaxValue}
							className='amount-range-slider'
							defaultValue={maxValueSlider}
						/>
					</Col>
				</Row>
			</>
		);
	};

	return (
		<GenericDrawer
			showDrawer={showDrawer}
			onCloseDrawer={toggleDrawer}
			closable
			renderBody={<FilterBody />}
			buttonFooter={[
				{
					buttonProps: {
						type: 'text'
					},
					title: 'Reset',
					onButtonClick: () => {
						setTableData(propsTradeBookList?.schemedetail);
						// toggleDrawer();
						setChangedFilters({});
						onChangeMaxValue([0, filters.transactionMaxValue]);
						setFromDate(null);
						setToDate(null);
					}
				},
				{
					buttonProps: {
						type: 'primary',
						className: 'submit-btn'
						// any required props for the button
					},
					title: 'Apply',
					onButtonClick: () => {
						handleOnSubmit();
					}
				}
			]}
		></GenericDrawer>
	);
};

const mapStateToProps = (state) => {
	return {
		propsTradeBookList: state.tradeBookList.tradeBookList
	};
};

export default connect(mapStateToProps)(RenderAdvancedFilterDrawer);
