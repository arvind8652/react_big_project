import { Select, Input, Checkbox, Space, Slider, DatePicker } from 'antd';
import { faUserPlus } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GenericDrawer from '../GenericDrawer/GenericDrawer';
import React, { useEffect, useState } from 'react';
import moment from 'moment';

const { Option } = Select;
const dateFormat = 'DD-MM-YYYY';

const AdvFilterBody = ({
	setAdvFilters,
	advFilters,
	advFilterData,
	setStartDate,
	setEndDate,
	setFlag,
	flag
}) => {
	const [filterCount, setFilterCount] = useState(0);
	const styles = {
		title: {
			fontFamily: 'Poppins',
			fontWeight: 600,
			fontSize: '1.5rem',
			lineHeight: '24px',
			color: '#354081'
		},
		subtitle: {
			fontFamily: 'Open Sans',
			fontSize: '1rem',
			lineHeight: '25px',
			color: '#696a91'
		},
		datepickerStyle: {
			width: '100%',
			height: '42px',
			background: '#f6f7fb',
			border: '1px solid #cbd6ff',
			boxSizing: 'border-box',
			borderRadius: '4px'
		}
	};

	const setFiltersObj = (dataType, key, whatChanged) => {
		let prevFilters = advFilters;
		prevFilters[dataType][key] = whatChanged;
		setAdvFilters({ ...prevFilters });
	};

	const renderFilter = (field) => {
		switch (field.dataType) {
			case 'Dropdown':
				return (
					<Select
						mode='multiple'
						style={{ width: '100%' }}
						placeholder={`Select ${field.label}`}
						onChange={(whatChanged) => {
							setFiltersObj(field.dataType, field.keyField, whatChanged);
							let temp = whatChanged;
							whatChanged.map((e) => {
								e === 'C' && setFlag(!flag);
							});
							console.log({ Check: temp[temp.length - 1], what: whatChanged, see: field.keyField });
							field.dataValues[0].value === 'Closed' && whatChanged.length < 1 && setFlag(false);
							// field.dataValues.map((eachOption) => {
							// 	console.log({ eachOption });
							// 	if (eachOption.value === 'Close') {
							// 		whatChanged.length > 1 && whatChanged.includes('C') && setFlag(!flag);
							// 	}
							// });
						}}
						value={advFilters[field.dataType][field.keyField]}
					>
						{field.dataValues.map((eachOption) => {
							return (
								<Option value={eachOption.key} label={eachOption.value} key={eachOption.key}>
									{eachOption.value}
								</Option>
							);
						})}
					</Select>
				);
			case 'Autocomplete':
				return (
					<Input
						className='field'
						type='text'
						value={advFilters[field.dataType][field.keyField]}
						onChange={(event) => {
							setFiltersObj(field.dataType, field.keyField, event.target.value);
						}}
						placeholder='Search by client/ prospect name'
						suffix={<FontAwesomeIcon icon={faUserPlus} style={{ margin: '0 0 0 auto' }} />}
					/>
				);
			case 'Checkbox':
				return (
					<Checkbox.Group
						style={{ width: '100%' }}
						value={advFilters[field.dataType][field.keyField]}
						onChange={(whatChanged) => {
							setFiltersObj(field.dataType, field.keyField, whatChanged);
						}}
					>
						<Space style={{ paddingLeft: '12px' }} direction='Horizontal'>
							{field.dataValues?.map((eachOption) => (
								<Checkbox key={eachOption?.key} value={eachOption?.key}>
									{eachOption?.value}
								</Checkbox>
							))}
						</Space>
					</Checkbox.Group>
				);
			case 'DateRange':
				return (
					<DatePicker.RangePicker
						style={styles.datepickerStyle}
						allowClear={true}
						onChange={(e) => {
							setFiltersObj(field.dataType, field.keyField, e);
							setStartDate(e[0]);
							setEndDate(e[1]);
						}}
						value={advFilters[field.dataType][field.keyField]}
						format={dateFormat}
					/>
				);
			case 'Range':
				return (
					<Slider
						className='amount-range-slider'
						min={0}
						max={field.maxValue ? field.maxValue : 10000000}
						onChange={(e) => {
							setFiltersObj(field.dataType, field.keyField, e);
						}}
						range={true}
						value={
							advFilters[field.dataType][field.keyField]
								? advFilters[field.dataType][field.keyField]
								: [0, field.maxValue ? field.maxValue : 10000000]
						}
					/>
				);
			default:
				return <p>Wrong Filter</p>;
		}
	};
	// useEffect(() => {
	// 	let temp,
	// 		sum = 0;
	// 	Object.keys(advFilters).forEach((eachTypeOfFilter) => {
	// 		for (let i = 0; i < eachTypeOfFilter.length; i++) {
	// 			temp = Object.keys(advFilters[eachTypeOfFilter]).filter(
	// 				(item) =>
	// 					advFilters[eachTypeOfFilter][item] !== undefined &&
	// 					advFilters[eachTypeOfFilter][item].length > 0
	// 			).length;
	// 		}
	// 		sum += temp;
	// 		setFilterCount(sum);
	// 	});
	// }, [advFilters]);

	return (
		<>
			<div style={styles.title}>Filter</div>
			<div style={styles.subtitle}>
				{' '}
				{filterCount === 0 ? 'No' : filterCount} tag
				{filterCount > 1 && 's '}{' '}
			</div>
			{advFilterData?.map((eachFilter) => {
				return (
					<div style={{ marginBottom: '10px' }} key={eachFilter.keyField}>
						<p style={{ marginBottom: '0px' }}>{eachFilter.label}</p>
						{renderFilter(eachFilter)}
					</div>
				);
			})}
			{flag ? <h4 style={{ color: '#D0342C' }}>*Due date is mandatory for status closed</h4> : null}
		</>
	);
};

const GenericAdvFilterForTaskInteraction = ({
	showDrawer = false, //to display drawer
	toggleDrawer = () => {}, // to change the state of showdrawer
	setTableData = () => {}, //setting the values on the table
	closable = true, // to close the drawer on X symbol
	//defaultAdvState, // default state for adv filter
	setIsFilterApplied, // if filter is applied
	cacheData, //data of the table
	advFilterData, //Adv filter's data
	handleAppplyClick
}) => {
	const defaultAdvState = { Dropdown: {}, Autocomplete: {}, Checkbox: {}, DateRange: {} };
	const [advFilters, setAdvFilters] = useState(defaultAdvState);
	const [startDate, setStartDate] = useState();
	const [endDate, setEndDate] = useState();
	const [flag, setFlag] = useState(false);
	const onResetPressed = () => {
		setAdvFilters(defaultAdvState);
		setTableData(cacheData);
		setIsFilterApplied(false);
		setFlag(false);
	};
	const onClosingTheDrawer = () => {
		toggleDrawer();
	};

	const onApplyPressed = (e) => {
		let filterData = cacheData;
		let filters = advFilters;
		Object.keys(filters).forEach((eachTypeOfFilter) => {
			Object.keys(filters[eachTypeOfFilter]).forEach((key) => {
				if (filters[eachTypeOfFilter][key].length === 0) {
					delete filters[eachTypeOfFilter][key];
					setAdvFilters({ ...filters });
				}
			});
			switch (eachTypeOfFilter) {
				case 'Range':
					Object.keys(filters[eachTypeOfFilter]).forEach((key) => {
						let rangeValue = filters[eachTypeOfFilter][key];
						filterData = filterData.filter((each) => {
							return each.targetAmount >= rangeValue[0] && each.targetAmount <= rangeValue[1];
						});
					});
					break;
				case 'DateRange':
					Object.keys(filters[eachTypeOfFilter]).forEach((key) => {
						let dateValue = filters[eachTypeOfFilter][key];
						filterData = filterData.filter((each) => {
							return each.activityDate
								? moment(each.activityDate).isSameOrAfter(dateValue[0]) &&
										moment(each.activityDate).isSameOrBefore(dateValue[1])
								: moment(each.dueDate).isSameOrAfter(dateValue[0]) &&
										moment(each.dueDate).isSameOrBefore(dateValue[1]);
						});
					});
					break;
				default:
					// For CHECKBOX, DROPDOWN, AUTOCOMPLETE
					Object.keys(filters[eachTypeOfFilter]).forEach((key) => {
						filterData = filterData.filter((each) => {
							// USED FOR (SEARCHING BY STRING), AUTOCOMPLETE
							if (typeof filters[eachTypeOfFilter][key] === 'string') {
								return each[key]
									.toLowerCase()
									.includes(filters[eachTypeOfFilter][key].toLowerCase());
							}
							// USED FOR FILTERING IN DROPDOWN, CHECKBOX
							return filters[eachTypeOfFilter][key].includes(each[key]);
						});
					});
			}
		});
		flag &&
			endDate &&
			handleAppplyClick(
				moment(startDate).format('YYYY-MM-DD'),
				moment(endDate).format('YYYY-MM-DD')
			);
		!flag ? setTableData([...filterData]) : null;
		setIsFilterApplied(true);
		toggleDrawer();
	};

	const buttonFooter = [
		{
			buttonProps: {
				type: 'text'
			},
			title: 'Reset',
			onButtonClick: () => onResetPressed()
		},
		{
			buttonProps: {
				type: 'primary',
				className: 'submit-btn'
			},
			title: 'Apply',
			onButtonClick: () => onApplyPressed()
		}
	];

	return (
		<GenericDrawer
			showDrawer={showDrawer}
			onCloseDrawer={onClosingTheDrawer}
			closable={closable}
			renderBody={
				<AdvFilterBody
					setAdvFilters={setAdvFilters}
					advFilters={advFilters}
					advFilterData={advFilterData}
					setStartDate={setStartDate}
					setEndDate={setEndDate}
					setFlag={setFlag}
					flag={flag}
				/>
			}
			buttonFooter={buttonFooter}
		/>
	);
};

export default GenericAdvFilterForTaskInteraction;
