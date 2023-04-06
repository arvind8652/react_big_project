import RenderDropdown from './RenderDropdown';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faUserCheck,
	faFileCheck,
	faFileExcel,
	faArrowAltToBottom,
	faFilter
} from '@fortawesome/pro-solid-svg-icons';
import moment from 'moment';
import '../CustomerOnboardingListingScreen.scss';
import RenderAdvancedFilterDrawer from './RenderAdvancedFilterDrawer';
import { connect } from 'react-redux';
import { CONSTANTS } from '../../../constants/constants';
import { faArrowCircleDown, faArrowCircleUp, faStopCircle } from '@fortawesome/pro-light-svg-icons';
import { getDependentDataCustomerOnboarding } from '../../../api/customerOnboardingListingApi';
import { authorizeModule } from '../../../utils/utils';
import { Tooltip } from 'antd';

const RenderFiltersPanel = ({
	allCustomerOnboardingData,
	loading,
	setLoading,
	controlStructure,
	selectedRows,
	setLocalCustomerOnboardingData,
	selectedRowKeys,
	setShowEndorseModal,
	setShowRejectModal,
	setShowApproveModal,
	setShowUpgradeModal,
	setShowDowngradeModal,
	setRmForDowngrade,
	setShowTerminateModal,
	localCustomerOnboardingData,
	setTerminateFailedArray,
	downloadRecords,
	authorizeCode
}) => {
	const [showDrawer, setShowDrawer] = useState(false);
	const [filterBy, setFilterBy] = useState(CONSTANTS.filterSortOptions.showAll);
	const [sortBy, setSortBy] = useState(CONSTANTS.filterSortOptions.creationDateNearToFar);
	const [filterData, setFilterData] = useState({});
	const [isFilterApplied, setIsFilterApplied] = useState(false);
	const [flag, setFlag] = useState(false);

	const toggleDrawer = () => {
		setShowDrawer(!showDrawer);
	};
	const onFilterSelect = (value, btnClick1 = true) => {
		// filter operation
		const onSelection = (days, item) => {
			let startDate = moment().subtract(days, 'days');
			let endDate = moment();
			return moment(item.inputDateTime).isBetween(startDate, endDate, 'days', []);
		};

		let filteredCustomerOnboardingList;

		switch (value) {
			case CONSTANTS.filterSortOptions.showAll:
				filteredCustomerOnboardingList = allCustomerOnboardingData;
				break;
			// case CONSTANTS.filterSortOptions.favourites:
			// 	filteredCustomerOnboardingList =
			// 		allCustomerOnboardingData && allCustomerOnboardingData.filter((item) => item.isFavourite);
			// 	break;
			// case CONSTANTS.filterSortOptions.recentlyModifiedLast30Days:
			// 	filteredCustomerOnboardingList =
			// 		allCustomerOnboardingData &&
			// 		allCustomerOnboardingData.filter((item) => {
			// 			// const now = moment();
			// 			// const date = moment(item.date);
			// 			return item.version > 1;
			// 		});
			// 	break;
			case CONSTANTS.filterSortOptions.createdLast7Days:
				filteredCustomerOnboardingList =
					allCustomerOnboardingData &&
					allCustomerOnboardingData.filter((item) => item.noOfDays <= 7);

				break;
			case CONSTANTS.filterSortOptions.createdLast15Days:
				filteredCustomerOnboardingList =
					allCustomerOnboardingData &&
					allCustomerOnboardingData.filter((item) => item.noOfDays <= 15);
				break;
			case CONSTANTS.filterSortOptions.createdLast30Days:
				filteredCustomerOnboardingList =
					allCustomerOnboardingData &&
					allCustomerOnboardingData.filter((item) => item.noOfDays <= 30);

				break;

			default:
				break;
		}
		if (filteredCustomerOnboardingList) {
			// console.log("filteredCustomerOnboardingList----------------",filteredCustomerOnboardingList)

			setFilterBy(value);
			setLocalCustomerOnboardingData(filteredCustomerOnboardingList);
			// if(btnClick1){
			onSortSelect(sortBy, filteredCustomerOnboardingList, true);
			// }
		} else {
			setLocalCustomerOnboardingData(allCustomerOnboardingData);
			// onSortSelect(sortBy,filteredCustomerOnboardingList,true);
		}
		setLoading(false);
		setFlag(true);
	};

	// const onSortSelect = (value,updatedLocalData=[]) => {
	const onSortSelect = (value, updatedLocalData = localCustomerOnboardingData, btnClick = true) => {
		// sort operation
		// if(btnClick){
		//  onFilterSelect(filterBy,false);
		// }
		//  onFilterSelect(filterBy);
		// console.log("updatedLocalData--------------------",updatedLocalData);

		let sortedCustomerOnboardingList;
		let latestUpdatedLocalData = updatedLocalData;
		// let latestUpdatedLocalData = localCustomerOnboardingData;
		// if(updatedLocalData?.length>0){
		// 	latestUpdatedLocalData = updatedLocalData
		// }
		// else{
		// 	latestUpdatedLocalData = localCustomerOnboardingData
		// }
		// console.log("latestUpdatedLocalData--------------------",latestUpdatedLocalData);
		switch (value) {
			case CONSTANTS.filterSortOptions.creationDateNearToFar:
				let customerOnboardingListVersion1 = latestUpdatedLocalData.filter(
					(item) => item.version === 1
				);
				let customerOnboardingListVersion2 = latestUpdatedLocalData.filter(
					(item) => item.version === 2
				);
				customerOnboardingListVersion1 = customerOnboardingListVersion1.sort((a, b) => {
					const aTimestamp = moment(a.inputDateTime);
					const bTimestamp = moment(b.inputDateTime);
					// console.log("btimestamp", bTimestamp)

					return bTimestamp.diff(aTimestamp);
				});

				customerOnboardingListVersion2 = customerOnboardingListVersion2.sort((a, b) => {
					const aTimestamp = moment(a.inputDateTime);
					const bTimestamp = moment(b.inputDateTime);
					return bTimestamp.diff(aTimestamp);
				});
				sortedCustomerOnboardingList = [
					...customerOnboardingListVersion1,
					...customerOnboardingListVersion2
				];
				break;

			case CONSTANTS.filterSortOptions.creationDateFarToNear:
				// console.log("test record-----------------",latestUpdatedLocalData)
				let customerOnboardingListVersionFar1 = latestUpdatedLocalData?.filter(
					(item) => item.version === 1
				);
				let customerOnboardingListVersionFar2 = latestUpdatedLocalData?.filter(
					(item) => item.version === 2
				);
				customerOnboardingListVersionFar1 = customerOnboardingListVersionFar1.sort((a, b) => {
					const aTimestamp = moment(a.inputDateTime);
					const bTimestamp = moment(b.inputDateTime);
					return aTimestamp.diff(bTimestamp);
				});
				customerOnboardingListVersionFar2 = customerOnboardingListVersionFar2.sort((a, b) => {
					const aTimestamp = moment(a.inputDateTime);
					const bTimestamp = moment(b.inputDateTime);
					return aTimestamp.diff(bTimestamp);
				});
				sortedCustomerOnboardingList = [
					...customerOnboardingListVersionFar2,
					...customerOnboardingListVersionFar1
				];
				break;

			case CONSTANTS.filterSortOptions.modificationNearToFar:
				let customerListVersion2 = latestUpdatedLocalData.filter((item) => item.version === 1);
				let customerListVersion1 = latestUpdatedLocalData.filter((item) => item.version >= 2);
				customerListVersion1 = customerListVersion1.sort((a, b) => {
					return a.version - b.version;
				});
				customerListVersion1 = customerListVersion1.sort((a, b) => {
					const aTimestamp = moment(a.inputDateTime);
					const bTimestamp = moment(b.inputDateTime);

					return bTimestamp.diff(aTimestamp);
				});
				customerListVersion2 = customerListVersion2.sort((a, b) => {
					const aTimestamp = moment(a.inputDateTime);
					const bTimestamp = moment(b.inputDateTime);
					return bTimestamp.diff(aTimestamp);
				});
				sortedCustomerOnboardingList = [...customerListVersion1, ...customerListVersion2];

				break;

			case CONSTANTS.filterSortOptions.modificationFarToNear:
				let customerListVersionFar2 = latestUpdatedLocalData.filter((item) => item.version === 1);
				let customerListVersionFar1 = latestUpdatedLocalData.filter((item) => item.version >= 2);
				customerListVersionFar1 = customerListVersionFar1.sort((a, b) => {
					return b.version - a.version;
				});
				customerListVersionFar1 = customerListVersionFar1.sort((a, b) => {
					const aTimestamp = moment(a.inputDateTime);
					const bTimestamp = moment(b.inputDateTime);
					return aTimestamp.diff(bTimestamp);
				});
				customerListVersionFar2 = customerListVersionFar2.sort((a, b) => {
					const aTimestamp = moment(a.inputDateTime);
					const bTimestamp = moment(b.inputDateTime);
					return aTimestamp.diff(bTimestamp);
				});
				sortedCustomerOnboardingList = [...customerListVersionFar1, ...customerListVersionFar2];

				break;
			default:
				break;
		}

		if (sortedCustomerOnboardingList) {
			// console.log("sortedCustomerOnboardingList----------------------",sortedCustomerOnboardingList)
			setSortBy(value);
			setLocalCustomerOnboardingData(sortedCustomerOnboardingList);
		} else {
			setLocalCustomerOnboardingData(allCustomerOnboardingData);
		}
		setLoading(false);
		setFlag(false);
	};
	const onAdvancedFilterRecord = (filterData) => {
		// console.log("line no 231-----------------",filterData)
		setFlag(false);
		// setFilterData(filterData)
		setFilterBy(CONSTANTS.filterSortOptions.showAll);
		//  setSortBy(sortBy);
		// toggleDrawer();

		let filteredCustomerData = allCustomerOnboardingData;
		// let filteredCustomerData = localCustomerOnboardingData;

		if (filterData.name) {
			// alert(1)
			filteredCustomerData = filteredCustomerData.filter((record) => {
				if (
					record.customerName &&
					record.customerCode &&
					record.otherIdNo &&
					record.customerName != null &&
					record.customerCode !== null &&
					record.otherIdNo !== null &&
					(record.customerName.toLowerCase().includes(filterData.name.toLowerCase()) ||
						record.customerCode.toLowerCase().includes(filterData.name.toLowerCase()) ||
						record.otherIdNo.toLowerCase().includes(filterData.name.toLowerCase()))
				) {
					return (
						record.customerName.toLowerCase().includes(filterData.name.toLowerCase()) ||
						record.customerCode.toLowerCase().includes(filterData.name.toLowerCase()) ||
						record.otherIdNo.toLowerCase().includes(filterData.name.toLowerCase())
					);
				}
			});
		}
		if (filterData.type && filterData.type.length > 0) {
			// alert(2)

			filteredCustomerData = filteredCustomerData.filter((record) => {
				return (
					record.typeName && record.typeName !== null && filterData.type.includes(record.typeName)
				);
			});
		}
		if (filterData.category && filterData.category.length > 0) {
			// alert(3)

			filteredCustomerData = filteredCustomerData.filter((record) => {
				return (
					record.customerCategoryName &&
					record.customerCategoryName !== null &&
					filterData.category.includes(record.customerCategoryName)
				);
			});
		}
		// source is not in the filteredCustomerData record
		if (filterData.source && filterData.source.length > 0) {
			// alert(4)

			filteredCustomerData = filteredCustomerData.filter((record) => {
				return record.source && record.source !== null && filterData.source.includes(record.source);
			});
		}
		if (filterData.branch && filterData.branch.length > 0) {
			// alert(5)

			filteredCustomerData = filteredCustomerData.filter((record) => {
				return (
					record.branchName &&
					record.branchName !== null &&
					filterData.branch.includes(record.branchName)
				);
			});
		}
		if (filterData.relationshipManager && filterData.relationshipManager.length > 0) {
			// alert(6)

			filteredCustomerData = filteredCustomerData.filter((record) => {
				return (
					record.relationshipManagerName &&
					record.relationshipManagerName !== null &&
					filterData.relationshipManager.includes(record.relationshipManagerName)
				);
			});
		}

		if (filterData.riskProfile && filterData.riskProfile.length > 0) {
			// alert(7)

			filteredCustomerData = filteredCustomerData.filter((record) => {
				return (
					record.riskProfileName &&
					record.riskProfileName !== null &&
					filterData.riskProfile.includes(record.riskProfileName)
				);
			});
		}

		if (filterData.interestLevel && filterData.interestLevel.length > 0) {
			// alert(8)

			filteredCustomerData = filteredCustomerData.filter((record) => {
				return (
					record.riskProfileName &&
					record.riskProfileName !== null &&
					filterData.interestLevel.includes(record.riskProfileName)
				);
			});
		}
		if (Object.keys(filterData).length === 0 && filterData.constructor === Object) {
			// onFilterSelect(filterBy);
			setShowDrawer(false);
		}
		// else{
		setLocalCustomerOnboardingData(filteredCustomerData);
		onSortSelect(sortBy, filteredCustomerData);
		// }
	};
	// const enableDisableUpgradeDowngrade = () => {
	// 	let flag = false;
	// 	if (selectedRowKeys.length <= 0) {
	// 		flag = true;
	// 	} else {
	// 		selectedRows.map(ele => {
	// 			if (ele.customerCategory != selectedRows[0].customerCategory) {
	// 				flag = true;
	// 			}
	// 		});
	// 	}
	// 	return flag;
	// }
	// const onDowngradeClick = () => {
	// 	let requestBody = {
	// 		FieldListID: 20068,
	// 		dependentValue: { cust_catid: selectedRows[0].customerCategory }
	// 	}
	// 	getDependentDataCustomerOnboarding(requestBody).then((res) => {
	// 		setShowDowngradeModal(true);
	// 		if (res.data) {
	// 			setRmForDowngrade(res.data);
	// 		}
	// 	});
	// }
	// const onUpgradeClick = () => {
	// 	let requestBody = {
	// 		FieldListID: 20068,
	// 		dependentValue: { cust_catid: selectedRows[0].customerCategory }
	// 	}
	// 	getDependentDataCustomerOnboarding(requestBody).then((res) => {
	// 		setShowUpgradeModal(true);
	// 		if (res.data) {
	// 			setRmForDowngrade(res.data);
	// 		}
	// 	});
	// }

	return (
		<div className='filters-panel'>
			<div className='left'>
				{authorizeModule(authorizeCode, CONSTANTS.authorizeCode.approveReject) && (
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
				{/* {
					authorizeModule(authorizeCode, CONSTANTS.authorizeCode.upgrade) &&
					<FontAwesomeIcon
						icon={faArrowCircleUp}
						className={!enableDisableUpgradeDowngrade() ? 'icon' : 'disabled-icon'}
						onClick={() => !enableDisableUpgradeDowngrade() && onUpgradeClick()}
					/>
				}
				{
					authorizeModule(authorizeCode, CONSTANTS.authorizeCode.downgrade) &&
					<FontAwesomeIcon
						icon={faArrowCircleDown}
						className={enableDisableUpgradeDowngrade() ? 'disabled-icon' : 'icon'}
						onClick={() => !enableDisableUpgradeDowngrade() && onDowngradeClick()}
					/>
				} */}
				<Tooltip title='Terminate'>
					{authorizeModule(authorizeCode, CONSTANTS.authorizeCode.delete) && (
						<FontAwesomeIcon
							icon={faStopCircle}
							className={selectedRowKeys.length === 0 ? 'disabled-icon' : 'icon'}
							onClick={() => selectedRowKeys.length > 0 && setShowTerminateModal(true)}
						/>
					)}
				</Tooltip>
			</div>
			<RenderDropdown
				mode='filter'
				onSelect={onFilterSelect}
				setLoading={setLoading}
				loading={loading}
				filterBy={filterBy}
			/>
			{/* <RenderDropdown mode="sort" onSelect={onSortSelect} setLoading={setLoading} sortBy={sortBy} /> */}
			<RenderDropdown
				mode='sort'
				onSelect={(val) => onSortSelect(val, localCustomerOnboardingData, true)}
				setLoading={setLoading}
				sortBy={sortBy}
				loading={loading}
			/>

			<div className='right'>
				<div className='icon-filter-wrapper'>
					<Tooltip title='Filter'>
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
							className={loading ? 'disabled-icon' : 'icon'}
							onClick={() => {
								downloadRecords();
							}}
						/>
					</Tooltip>
				)}
			</div>
			<RenderAdvancedFilterDrawer
				showDrawer={showDrawer}
				toggleDrawer={toggleDrawer}
				filterCs={controlStructure}
				filterData={filterData}
				onAdvancedFilterRecord={onAdvancedFilterRecord}
				setIsFilterApplied={setIsFilterApplied}
				flag={flag}
			/>
		</div>
	);
};

const mapStateToProps = (state) => {};

export default connect(mapStateToProps)(RenderFiltersPanel);
