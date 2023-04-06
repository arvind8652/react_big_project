import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Tooltip } from 'antd';

// icons
import { faArrowAltToBottom, faFilter } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { RenderSearch, RenderDropdown } from './index';

import { exportJSON } from '../../utils/utils';
import { connect } from 'react-redux';
import GenericAdvancedFilterDrawer from '../../components/GenericAdvancedFilter/GenericAdvancedFilter';

import { authorizeModule } from '../../utils/utils';
import { CONSTANTS } from '../../constants/constants';

const RenderFilterPanel = ({
	tabName = '',
	tableData = [],
	setTableData = () => {},
	csObject,
	selectedFilterButtonValue = '',
	applySort = () => {},
	tabData = 'EQ',
	exploreProductsAdvFilter = [],
	exploreProductsFilteredData = [],
	authorizeCode,
	setLoading = () => {},
	getLatestSecurityInfo = () => {}
}) => {
	// states
	const [showDrawer, setShowDrawer] = useState(false);
	const toggleDrawer = () => setShowDrawer(!showDrawer);
	const defaultAdvState = { Dropdown: {}, Range: {} };
	const [isFilterApplied, setIsFilterApplied] = useState(false);
	const cacheTableData = useSelector((state) => state.exploreProducts.advCache);
	const [sortOptions, setSortOptions] = useState(
		csObject?.csList[0]?.controlStructureField[5]?.dropDownValue
	);

	const toLowerCase = (text) => text?.toString()?.toLowerCase();

	const handleOnSearch = (value) => {
		setLoading(true);
		let newTableData = [];
		if (value) {
			newTableData = cacheTableData?.filter(
				(e) =>
					toLowerCase(e?.securityName)?.includes(toLowerCase(value)) &&
					// (e[selectedFilterButtonValue] || e?.assetType === selectedFilterButtonValue)
					(e[selectedFilterButtonValue] ||
						e?.assetType === selectedFilterButtonValue ||
						selectedFilterButtonValue === null)
			);
		} else {
			newTableData = cacheTableData?.filter(
				// (e) => e[selectedFilterButtonValue] || e?.assetType === selectedFilterButtonValue
				(e) =>
					e[selectedFilterButtonValue] ||
					e?.assetType === selectedFilterButtonValue ||
					selectedFilterButtonValue === null
			);
		}
		getLatestSecurityInfo(newTableData).then((resTableData) => {
			setTableData(resTableData);
			// executeCache(resTableData);
			setLoading(false);
		});
		// setTableData(newTableData);
		// setLoading(false);
	};

	const downloadRecords = () => {
		const dataToBedownloaded = tableData?.map((e, idx) => ({
			'Sr.No': idx + 1,
			Security: e.security,
			'Security Name': e.securityName,
			'Asset Type': e.assetTypeName,
			'Asset Group': e.assetGroupName,
			'Maturity Date': e.matDate,
			'Last IP': e.lastIP,
			'Next IP': e.nextIP,
			'Credit Rating': e.creditRating,
			'Face Value': e.faceValue,
			'ISIN No': e.isinCode,
			'Last Bid Price': e.lastBidPrice,
			'Last Bid Yield': '',
			'Market Lot': e.marketLot
		}));
		exportJSON(dataToBedownloaded, 'Explore Products Listing');
	};

	useEffect(() => {
		console.log('tabData------', tabData);
		if (csObject) {
			let afterFilter = csObject?.csList[0]?.controlStructureField?.filter(
				(each) => each.keyField === `EXPPRDSORTPARAM-${tabData === 'Trending' ? 'TR' : tabData}`
			);
			if (afterFilter.length > 0) {
				setSortOptions(afterFilter[0].dropDownValue);
			}
		}
	}, [csObject, tabData]);

	return (
		<>
			<div className='explore-products-filters-panel'>
				<div className='left'>
					<RenderSearch onSearch={(val) => handleOnSearch(val)} tabName={tabName} />
				</div>

				<RenderDropdown onChange={applySort} options={sortOptions} />

				<div className='right'>
					<Tooltip title='Advance Filter'>
						<FontAwesomeIcon onClick={toggleDrawer} icon={faFilter} className='icon' />
					</Tooltip>
					{isFilterApplied && <span className='filter-badge'></span>}
					{authorizeModule(authorizeCode, CONSTANTS.authorizeCode.download) && (
						<Tooltip title='Download'>
							<FontAwesomeIcon
								onClick={downloadRecords}
								icon={faArrowAltToBottom}
								className='icon'
							/>
						</Tooltip>
					)}
				</div>
			</div>
			<GenericAdvancedFilterDrawer
				showDrawer={showDrawer}
				toggleDrawer={toggleDrawer}
				closable={true}
				defaultAdvState={defaultAdvState}
				setIsFilterApplied={setIsFilterApplied}
				setTableData={(data) => {
					setTableData(data);
				}}
				cacheData={exploreProductsFilteredData}
				advFilterData={exploreProductsAdvFilter}
			/>
		</>
	);
};

function mapStateToProps(state) {
	return {
		csObject: state?.exploreProducts?.exploreProductsControlStructure,
		exploreProductsAdvFilter: state?.exploreProducts?.exploreProductsAdvFilter,
		exploreProductsFilteredData: state?.exploreProducts?.exploreProductsFilteredData
	};
}

export default connect(mapStateToProps)(RenderFilterPanel);
