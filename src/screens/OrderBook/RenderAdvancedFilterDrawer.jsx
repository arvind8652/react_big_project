import { Select, Slider } from 'antd';
import { useSelector } from 'react-redux';
import GenericDrawer from '../../components/GenericDrawer/GenericDrawer';
import React, { useEffect, useState, useContext } from 'react';
import { OrderBookListData } from '../../redux/actions/orderBookListAction';
import { Form } from 'antd';
import moment from 'moment';
import { ScRangePicker } from '../../components/StyledComponents/formElements';
import { ActiveTabContext } from './Listing';

const { Option } = Select;
const dateFormat = 'DD-MM-YYYY';

const AdvFilterBody = ({ setAdvFilters, advFilter, clientId, setIsFilterApplied }) => {
	const [fromDate, setFromDate] = useState(null);
	const [toDate, setToDate] = useState(null);
	const [filterCount, setFilterCount] = useState(0);
	const activeTab = useContext(ActiveTabContext);
	const reactSelect = useSelector((state) => state.orderBook.advancedFilter.advancedFiltersList);
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
		}
	};

	const callDateAPI = async () => {
		const postObject = {
			data: {
				AssetGroup: activeTab,
				CustomerId: clientId,
				ClientId: clientId,
				Filterparam: '',
				Period: null,
				FromRowNumber: 0,
				RowSize: 25,
				StartDate: fromDate ? moment(fromDate).format('YYYY-MM-DD') : null,
				EndDate: toDate ? moment(toDate).format('YYYY-MM-DD') : null
			}
		};

		//THIS WAS THERE
		OrderBookListData(postObject);

		//USE THIS
		// executeGetTradeBookList(postObject);
	};

	useEffect(() => {
		callDateAPI();
	}, [fromDate, toDate]);

	const setFiltersObj = (controlType, key, whatChanged) => {
		setAdvFilters({
			...advFilter,
			...(advFilter[controlType][key] = whatChanged)
		});
	};

	const renderFilter = (field) => {
		switch (field.controlType) {
			case 'Dropdown':
				return (
					<Select
						mode='multiple'
						style={{ width: '100%' }}
						placeholder={`Select ${field.label}`}
						onChange={(whatChanged) => {
							setFiltersObj(field.controlType, field.keyField, whatChanged);
						}}
						value={advFilter[field.controlType][field.keyField]}
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
			case 'Range':
				return (
					<Slider
						range
						max={field.maxValue}
						onChange={(whatChanged) => {
							setFiltersObj(field.controlType, field.keyField, whatChanged);
						}}
						value={
							advFilter[field.controlType][field.keyField]
								? advFilter[field.controlType][field.keyField]
								: [0, field.maxValue]
						}
					/>
				);
			default:
				return <p>Wrong Filter</p>;
		}
	};

	let secondReact = reactSelect.slice(1); //To view from portfolio screen of a particular customer, so we are eliminating client name at that point

	useEffect(() => {
		const formDataKeys = Object.keys(advFilter.Dropdown);
		const checkOrderVal = Object.keys(advFilter.Range);
		setFilterCount(
			formDataKeys.filter(
				(item) => advFilter.Dropdown[item] !== undefined && advFilter.Dropdown[item].length > 0
			).length +
				checkOrderVal.filter(
					(item) => advFilter.Range[item] !== undefined && advFilter.Range[item].length > 0
				).length
		);
	}, [advFilter]);

	useEffect(() => {
		filterCount > 0 ? setIsFilterApplied(true) : setIsFilterApplied(false);
	}, [filterCount]);

	return (
		<>
			{/* <div style={styles.title}>Filter</div>
      <div style={styles.subtitle}>
        {" "}
        {filterCount === 0 ? "No" : filterCount} tag
        {filterCount > 1 && "s "}{" "}
      </div> */}
			<div>
				<label style={styles.title}>Filter</label>
				<label
					style={styles.subtitle}
					// style={{ position: "absolute", right: "60px" }}
				>
					{filterCount === 0 ? 'No' : filterCount} tag
					{filterCount > 1 && 's '}
				</label>
			</div>
			{clientId
				? secondReact?.map((eachFilter) => (
						<div style={{ marginBottom: '10px' }} key={eachFilter.keyField}>
							<p style={{ marginBottom: '0px' }}>{eachFilter.label}</p>
							{renderFilter(eachFilter)}
						</div>
				  ))
				: reactSelect?.map((eachFilter) => (
						<div style={{ marginBottom: '10px' }} key={eachFilter.keyField}>
							<p style={{ marginBottom: '0px' }}>{eachFilter.label}</p>
							{renderFilter(eachFilter)}
						</div>
				  ))}
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
						fromDate && toDate ? [moment(fromDate, dateFormat), moment(toDate, dateFormat)] : null
					}
					format={dateFormat}
				/>
			</Form.Item>
		</>
	);
};

const RenderAdvancedFilterDrawer = ({
	showDrawer = false,
	toggleDrawer = () => {},
	setTableData = () => {},
	closable = true,
	advFilter = [],
	setAdvFilters = () => {},
	tableData = [],
	clientId,
	setIsFilterApplied
}) => {
	const cacheData = useSelector((state) => state?.orderBook?.orderBookList?.orderBookList ?? []);
	const onClosingTheDrawer = () => {
		let DropdownObj = {};

		Object.keys(advFilter['Dropdown']).forEach((key) => {
			DropdownObj[key] = [];
		});

		setAdvFilters({
			Dropdown: { ...DropdownObj },
			Range: {}
		});
		setTableData(cacheData);
		toggleDrawer();
	};
	const onApplyPressed = () => {
		let filterData = cacheData;
		let filters = advFilter;
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
						filterData = filterData.filter((each) => {
							if (parseInt(each[key]) === null && parseInt(advFilter['Range'][key][0]) === 0) {
								return true;
							} else {
								return (
									parseInt(each[key]) >= parseInt(advFilter['Range'][key][0]) &&
									parseInt(each[key]) <= parseInt(advFilter['Range'][key][1])
								);
							}
						});
					});
					break;
				default:
					Object.keys(filters[eachTypeOfFilter]).forEach((key) => {
						filterData = filterData.filter((each) => {
							return filters[eachTypeOfFilter][key].includes(each[key]);
						});
					});
			}
		});
		setTableData(filterData);
		toggleDrawer();
	};

	const buttonFooter = [
		{
			buttonProps: {
				type: 'text'
			},
			title: 'Cancel',
			onButtonClick: () => onClosingTheDrawer()
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
					advFilter={advFilter}
					clientId={clientId}
					setIsFilterApplied={setIsFilterApplied}
				/>
			}
			buttonFooter={buttonFooter}
		/>
	);
};

export default RenderAdvancedFilterDrawer;
