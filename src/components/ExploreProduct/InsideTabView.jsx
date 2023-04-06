import React, { memo, useEffect, useState } from 'react';

import { Space } from 'antd';
import { FilterButtons, Listing, RenderFilterPanel } from './index';
import { connect, useSelector } from 'react-redux';

import {
	executeGetSecurityListDetails,
	executeCache
} from '../../redux/actions/exploreProductsActions';

const InsideTabView = ({
	isCustomerUser,
	clientId,
	buttonOptions = [],
	loading = false,
	setLoading = () => {},
	detailsLoading = true,
	tabData = '',
	tabName,
	authorizeCode,
	exploreProductsFilteredData = [],
	callRefreshApis = () => {}
}) => {
	const PAGE_SIZE = 20;
	const defaultAdvState = { Dropdown: {}, Range: {} };
	// states
	const [tableData, setTableData] = useState([]);
	const [isAllSelectData, setAllSelectData] = useState(false);
	const [selectedFilterButtonValue, setSelectedFilterButtonValue] = useState(null);
	const [advFilter, setAdvFilters] = useState(defaultAdvState);
	const [currentPageInfo, setCurrentPaginationInfo] = useState({
		current: 1,
		pageSize: PAGE_SIZE
	});

	const [sortingValue, setSortingValue] = useState('RATINGHTOL');

	// GETTING SECURITY DETAILS ON SELECTED PAGE
	const getLatestSecurityInfo = async (newTableData) => {
		let securityArray = [];
		const startIndex = currentPageInfo.pageSize * (currentPageInfo.current - 1);
		const endIndex = currentPageInfo.pageSize * currentPageInfo.current;

		newTableData.forEach((eachObj, index) => {
			if (eachObj.securityDetails === undefined && index >= startIndex && index < endIndex) {
				securityArray[securityArray.length] = eachObj.security;
			}
		});

		if (securityArray.length > 0) {
			const responseWithSecurities = await executeGetSecurityListDetails(securityArray);

			if (responseWithSecurities.data.length > 0) {
				for (const eachSecurity of responseWithSecurities.data) {
					for (const each in newTableData) {
						if (newTableData[each].security === eachSecurity.security.security) {
							newTableData[each].securityDetails = eachSecurity.security;
						}
					}
				}
			}
		}
		return newTableData;
	};

	const cacheData = useSelector((state) => state.exploreProducts.advCache);

	const isString = (data) => typeof data === 'string';

	const sortByHighToLow = (key, data) => [...data]?.sort((a, b) => b[key] - a[key]);

	const sortByLowToHigh = (key, data) => [...data]?.sort((a, b) => a[key] - b[key]);

	const sortByAToZ = (key, data) =>
		data?.sort((a, b) => {
			if (isString(a[key]) && isString(b[key])) {
				return a[key]?.localeCompare(b[key]);
			}
			return a[key] - b[key];
		});

	const sortByZToA = (key, data) =>
		data?.sort((a, b) => {
			if (isString(a[key]) && isString(b[key])) {
				return b[key]?.localeCompare(a[key]);
			}
			return b[key] - a[key];
		});
	const applySort = (value, dataList) => {
		console.log('check value----', value);
		console.log('check value--dataList--', dataList);
		switch (value) {
			case 'SECURITYATOZ': {
				return sortByAToZ('securityName', dataList);
			}

			case 'SECURITYZTOA': {
				return sortByZToA('securityName', dataList);
			}

			case 'PRICELTOH': {
				return sortByLowToHigh('conversionPrice', dataList);
			}

			case 'PRICEHTOL': {
				return sortByHighToLow('conversionPrice', dataList);
			}

			case 'DURATIONATOZ': {
				return sortByAToZ('mDuration', dataList);
			}

			case 'DURATIONZTOA': {
				return sortByZToA('mDuration', dataList);
			}

			case 'PERFHTOL': {
				return sortByHighToLow('performance', dataList);
			}

			case 'PERFLTOH': {
				return sortByLowToHigh('performance', dataList);
			}

			case 'RATINGHTOL': {
				return sortByHighToLow('rating', dataList);
			}

			case 'RATINGLTOH': {
				return sortByLowToHigh('rating', dataList);
			}

			case 'YIELDATOZ': {
				return sortByAToZ('yield', dataList);
			}

			case 'YIELDZTOA': {
				return sortByZToA('yield', dataList);
			}

			case 'ASSETTYPEYATOZ': {
				return sortByAToZ('assetTypeName', dataList);
			}

			case 'ASSETTYPEZTOA': {
				return sortByZToA('assetTypeName', dataList);
			}

			default:
				alert('Filter code not written', dataList);
				return null;
		}
	};

	useEffect(() => {
		if (buttonOptions.length > 0) setSelectedFilterButtonValue(buttonOptions[0].value);
	}, [tabName]);

	// LIST DETAILS API CALL
	useEffect(() => {
		setLoading(true);
		let newTableData = exploreProductsFilteredData;

		if (
			!isAllSelectData &&
			selectedFilterButtonValue &&
			exploreProductsFilteredData.length > 0 &&
			!detailsLoading
		) {
			newTableData = exploreProductsFilteredData?.filter(
				(e) => e.assetType === selectedFilterButtonValue || e[selectedFilterButtonValue] === true
			);
		}
		getLatestSecurityInfo(newTableData).then((resTableData) => {
			setTableData(resTableData);
			executeCache(resTableData);
			setLoading(false);
		});
	}, [tabName, selectedFilterButtonValue, isAllSelectData, detailsLoading, currentPageInfo]);

	//SORTING

	useEffect(() => {
		setAdvFilters(defaultAdvState);
		setLoading(true);
		setTableData([]);
		let newTableData = cacheData ? cacheData : [];

		// APPLYING SORT ON COMPLETE BUTTON TAB SELECTED
		newTableData = applySort(sortingValue, newTableData);
		console.log('newTableData----', newTableData);
		getLatestSecurityInfo(newTableData).then((resTableData) => {
			setTableData(resTableData);
			executeCache(resTableData);
			setLoading(false);
		});
	}, [sortingValue]);

	return (
		<Space direction='vertical' size={16}>
			<FilterButtons
				buttonOptions={buttonOptions}
				isCustomerUser={isCustomerUser}
				value={selectedFilterButtonValue}
				onFilterChange={setSelectedFilterButtonValue}
				isAllSelectData={isAllSelectData}
				setAllSelectData={setAllSelectData}
			/>
			<RenderFilterPanel
				tableData={tableData}
				tabData={tabData}
				setTableData={setTableData}
				selectedFilterButtonValue={selectedFilterButtonValue}
				tabName={tabName}
				advFilter={advFilter}
				setAdvFilters={setAdvFilters}
				applySort={(e) => setSortingValue(e)}
				authorizeCode={authorizeCode}
				setLoading={setLoading}
				getLatestSecurityInfo={getLatestSecurityInfo}
			/>
			<Listing
				isCustomerUser={isCustomerUser}
				clientId={clientId}
				tableData={tableData}
				loading={loading || detailsLoading}
				setCurrentPaginationInfo={setCurrentPaginationInfo}
				pageSize={PAGE_SIZE}
				callRefreshApis={callRefreshApis}
			/>
		</Space>
	);
};

const mapStateToProps = (state) => {
	return {
		exploreProductsFilteredData: state?.exploreProducts?.exploreProductsFilteredData
	};
};

export default connect(mapStateToProps)(memo(InsideTabView));
