import RenderDropdown from './RenderDropdown';
import React, { useState } from 'react';
import { Tooltip } from 'antd';
import { exportJSON } from '../../../utils/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCheck, faFileExcel, faStopCircle } from '@fortawesome/pro-light-svg-icons';
import { faFilter, faArrowAltToBottom } from '@fortawesome/pro-solid-svg-icons';
import moment from 'moment';
import '../AccountListingScreen.scss';
import RenderAdvancedFilterDrawer from './RenderAdvancedFilterDrawer';
import { connect } from 'react-redux';
import { authorizeModule } from '../../../utils/utils';
import { CONSTANTS } from '../../../constants/constants';

const RenderFiltersPanel = ({
	onAdvFilterSubmit,
	allCustomerOnboardingData,
	allAccountData,
	localAccountData,
	setLocalAccountData,
	loading,
	setLoading,
	controlStructure,
	selectedRows,
	setShowTerminateModal,
	setLocalCustomerOnboardingData,
	selectedRowKeys,
	setShowEndorseModal,
	setShowRejectModal,
	setShowApproveModal,
	localCustomerOnboardingData,
	filtersData,
	authorizeCode,
	allPendingData
}) => {
	const [showDrawer, setShowDrawer] = useState(false);
	const [filterBy, setFilterBy] = useState('Show All');
	const [sortBy, setSortBy] = useState('Creation Date (Near to Far)');
	const [isFilterApplied, setIsFilterApplied] = useState(false);
	const [filterData, setFilterData] = useState({});
	const toggleDrawer = () => {
		setShowDrawer(!showDrawer);
	};

	const downloadRecords = () => {
		const downloadData =
			selectedRows && selectedRows.length > 0
				? selectedRows.map((account, index) => ({
						'Sr.No': index + 1,
						'Account Name': account.accountName,
						'Account Holding': account.holdingPatternName,
						Type: account.accountTypeName,
						Classification: account.accountClassification,
						Status: account.status
				  }))
				: localAccountData.map((account, index) => ({
						'Sr.No': index + 1,
						'Account Name': account.accountName,
						'Account Holding': account.holdingPatternName,
						Type: account.accountTypeName,
						Classification: account.accountClassification,
						Status: account.status
				  }));
		exportJSON(downloadData, 'Account');
	};
	const onFilterSelect = (value) => {
		// filter operation
		let filteredAccountList;
		switch (value) {
			case 'Show All':
				filteredAccountList = allAccountData;
				break;
			case 'Under Process':
				filteredAccountList =
					allAccountData &&
					allAccountData.filter((item) =>
						['Account Creation', 'Authorization', 'Verification'].includes(item.status)
					);
				break;
			case 'Recently Modified (Modified in last 30 days)':
				filteredAccountList =
					allAccountData &&
					allAccountData.filter((item) => {
						const now = moment();
						const date = moment(item.inputDateTime);
						return item.version > 1;
					});
				break;
			case 'Created in last 7 Days':
				filteredAccountList = allAccountData && allAccountData.filter((item) => item.noOfDays <= 7);
				break;
			case 'Created in last 15 Days':
				filteredAccountList =
					allAccountData && allAccountData.filter((item) => item.noOfDays <= 15);
				break;
			case 'Created in last 30 Days':
				filteredAccountList =
					allAccountData && allAccountData.filter((item) => item.noOfDays <= 30);
				break;
			default:
				break;
		}
		if (filteredAccountList) {
			setFilterBy(value);
			setLocalAccountData(filteredAccountList);
		} else {
			setLocalAccountData(allAccountData);
		}
		setLoading(false);
	};

	const onSortSelect = (value) => {
		// sort operation
		onFilterSelect(filterBy);
		let sortedAccountList;
		const AccountData = { allAccountData };
		switch (value) {
			case 'Creation Date (Near to Far)':
				sortedAccountList = [...allAccountData].sort((a, b) => {
					const aTimestamp = moment(a.inputDateTime);
					const bTimestamp = moment(b.inputDateTime);
					return bTimestamp.diff(aTimestamp);
				});
				break;
			case 'Creation Date (Far to Near)':
				sortedAccountList = [...allAccountData].sort((a, b) => {
					const aTimestamp = moment(a.inputDateTime);
					const bTimestamp = moment(b.inputDateTime);
					return aTimestamp.diff(bTimestamp);
				});
				break;
			case 'Modification Date (Near to Far)':
				sortedAccountList = [...allAccountData].sort((a, b) => {
					const aTimestamp = moment(a.version);
					const bTimestamp = moment(b.version);
					return bTimestamp.diff(aTimestamp);
				});
				break;
			case 'Modification Date (Far to Near)':
				sortedAccountList = [...allAccountData].sort((a, b) => {
					const aTimestamp = moment(a.version);
					const bTimestamp = moment(b.version);
					return aTimestamp.diff(bTimestamp);
				});
				break;
			default:
				break;
		}

		if (sortedAccountList) {
			setSortBy(value);
			setLocalAccountData(sortedAccountList);
		} else {
			setLocalAccountData(allAccountData);
		}
		setLoading(false);
	};

	const onAdvancedFilterRecord = (filterData) => {
		setFilterData(filterData);
		setFilterBy('Show All');
		setSortBy('Creation Date (Near to Far)');
		// toggleDrawer();
		let filteredAccountData = allAccountData;
		if (filterData.name) {
			filteredAccountData = filteredAccountData.filter((record) => {
				return record.accountName.toLowerCase().includes(filterData.name.toLowerCase());
			});
		}
		if (filterData.status && filterData.status.length > 0) {
			filteredAccountData = filteredAccountData.filter((record) => {
				// return record.status && filterData.status.includes(record.status.split(' ')[0]);
				return record.status && filterData.status.includes(record.status);
			});
		}
		if (filterData.type && filterData.type.length > 0) {
			filteredAccountData = filteredAccountData.filter((record) => {
				return record.accountTypeName && filterData.type.includes(record.accountTypeName);
			});
		}
		if (filterData.nature && filterData.nature.length > 0) {
			filteredAccountData = filteredAccountData.filter((record) => {
				return record.accountNatureName && filterData.nature.includes(record.accountNatureName);
			});
		}
		if (filterData.classification && filterData.classification.length > 0) {
			filteredAccountData = filteredAccountData.filter((record) => {
				return (
					record.accountClassificationName &&
					filterData.classification.includes(record.accountClassificationName)
				);
			});
		}
		setLocalAccountData(filteredAccountData);
	};
	return (
		<div className='filters-panel'>
			<div className='left'>
				{authorizeModule(authorizeCode, CONSTANTS.authorizeCode.approve) && (
					<Tooltip title='Approve'>
						<FontAwesomeIcon
							icon={faFileCheck}
							className={selectedRowKeys.length === 0 ? 'disabled-icon' : 'icon'}
							onClick={() => selectedRowKeys.length > 0 && setShowApproveModal(true)}
						/>
					</Tooltip>
				)}
				{authorizeModule(authorizeCode, CONSTANTS.authorizeCode.approveReject) && (
					<Tooltip title='Reject'>
						<FontAwesomeIcon
							icon={faFileExcel}
							className={selectedRowKeys.length === 0 ? 'disabled-icon' : 'icon'}
							onClick={() => selectedRowKeys.length > 0 && setShowRejectModal(true)}
						/>
					</Tooltip>
				)}

				{/* {authorizeModule(authorizeCode, CONSTANTS.authorizeCode.delete) &&
				<FontAwesomeIcon
					icon={faStopCircle}
					className={selectedRowKeys.length === 0 ? 'disabled-icon' : 'icon'}
					onClick={() => selectedRowKeys.length > 0 && setShowTerminateModal(true)}
				/>
				 }  */}
			</div>
			<RenderDropdown
				mode='filter'
				onSelect={onFilterSelect}
				setLoading={setLoading}
				filterBy={filterBy}
				loading={loading}
			/>
			<RenderDropdown
				mode='sort'
				onSelect={onSortSelect}
				setLoading={setLoading}
				loading={loading}
				sortBy={sortBy}
			/>

			<div className='right'>
				<div className='icon-filter-wrapper'>
					<Tooltip title='Advance Filter'>
						<FontAwesomeIcon
							icon={faFilter}
							className={loading ? 'disabled-icon' : 'icon'}
							onClick={() => {
								toggleDrawer();
							}}
						/>
					</Tooltip>

					{isFilterApplied && <span class='filter-badge'></span>}
				</div>
				{authorizeModule(authorizeCode, CONSTANTS.authorizeCode.download) && (
					<Tooltip title='Download'>
						<FontAwesomeIcon
							icon={faArrowAltToBottom}
							// className={loading || selectedRows.length === 0 ? 'icon' : 'icon'}
							className={loading && selectedRows.length === 0 ? 'disabled-icon' : 'icon'}
							onClick={() => {
								downloadRecords();
							}}
						/>
					</Tooltip>
				)}
			</div>
			{showDrawer && (
				<RenderAdvancedFilterDrawer
					showDrawer={showDrawer}
					toggleDrawer={toggleDrawer}
					filterCs={controlStructure}
					onAdvFilterSubmit={onAdvFilterSubmit}
					filterData={filterData}
					onAdvancedFilterRecord={onAdvancedFilterRecord}
					setIsFilterApplied={setIsFilterApplied}
					allPendingData={allPendingData}
				/>
			)}
		</div>
	);
};

const mapStateToProps = (state) => {};

export default connect(mapStateToProps)(RenderFiltersPanel);
