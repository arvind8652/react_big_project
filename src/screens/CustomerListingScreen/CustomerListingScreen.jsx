import React, { useEffect, useState } from 'react';
import {
	Button,
	Table,
	Form,
	Input,
	Drawer,
	Select,
	Menu,
	Alert,
	Tooltip,
	Result,
	Spin
} from 'antd';
import { exportJSON, generateCsObject } from '../../utils/utils';
import './CustomerListingScreen.scss';
import { NavLink, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faArrowCircleDown, faArrowCircleUp } from '@fortawesome/pro-light-svg-icons';
import AccountsModal from './Modal/AccountsModal';
import { assets } from '../../constants/assetPaths';
import { authorizeModule } from '../../utils/utils';
import {
	faArrowCircleDown,
	faUserCheck,
	//faArrowCircleDown,
	faArrowCircleUp,
	faPlus
} from '@fortawesome/pro-light-svg-icons';
import {
	faFilter,
	faArrowAltToBottom,
	faThLarge,
	faThList,
	faRedo
} from '@fortawesome/pro-solid-svg-icons';
import { assignSelectedCustomerOnboardingApi } from '../../api/customerOnboardingListingApi';
import { getDependentDataCustomerOnboarding } from '../../api/customerOnboardingListingApi';
import { approveRejectCustomer, upgradeOrDownGradeCustomer } from '../../api/customerViewApi';
import { connect } from 'react-redux';
import moment from 'moment';
import {
	executeGetCustomerListingCs,
	executeGetAllCustomersData
} from '../../redux/actions/customerListingActions';
import {
	addFavouriteCustomerApi,
	getAccountDetailsApi,
	upgradeDowngradeCustomer,
	doRefreshClientApi
} from '../../api/customerListingApi';
import CustomModal from '../../components/Modal/CustomModal/CustomModal';
import CustomerCard from '../../components/CustomerCard/CustomerCard';
import CustomerTable from '../../components/CustomerTable/CustomerTable';
import { CONSTANTS } from '../../constants/constants';
import MyCustomerListingFilterForm from '../../components/Forms/MyCustomerListingFilterForm/MyCustomerListingFilterForm';
import { SET_CHILD_MENU_FLAG } from '../../redux/actions/actionTypes';
import BackToTop from '../../components/BackToTop/BackToTop';

// import { assignSelectedCustomerOnboardingApi } from "../../api/customerOnboardingListingApi";
// import { getDependentDataCustomerOnboarding } from '../../api/customerOnboardingListingApi';

function CustomerListingScreen(props) {
	const {
		executeGetCustomerListingCs,
		executeGetAllCustomersData,
		customerListingCs,
		allCustomersData,
		miniComponentData,
		miniMode,
		leftPanel
	} = props;
	const emptyArray = 'emptyArray';
	// const [loading, setLoading] = useState(true);
	const [loading, setLoading] = useState();
	const [selectedRows, setSelectedRows] = useState([]);
	const [selectedRowKeys, setSelectedRowKeys] = useState([]);
	const [cardViewMode, setCardViewMode] = useState(false);
	const [localCustomerData, setLocalCustomerData] = useState(
		(miniMode && miniComponentData.tableData) || allCustomersData
	);
	const [filterBy, setFilterBy] = useState('Show All');

	const [sortBy, setSortBy] = useState('Creation Date Near To Far');
	const [filterData, setFilterData] = useState({});
	const [flag, setFlag] = useState(false);

	const [filterFormData, setFilterFormData] = useState({
		name: undefined,
		tagName: undefined,
		category: undefined,
		type: undefined,
		source: undefined,
		relationshipManager: undefined,
		branch: undefined,
		aumAmountRange: undefined,
		aumAmountMax: undefined,
		aumAmountMin: undefined,
		revenueAmountRange: undefined,
		revenueAmountMax: undefined,
		revenueAmountMin: undefined,
		investibleCashRange: undefined,
		investibleCashMax: undefined,
		investibleCashMin: undefined,
		riskProfile: undefined
	});
	const [accountsModalShow, setAccountsModalShow] = useState(false);
	const [customerAccounts, setCustomerAccounts] = useState([]);
	const [showDowngradeModal, setShowDowngradeModal] = useState(false);
	const [rmForDowngrade, setRmForDowngrade] = useState();
	const [categoryDropdownValues, setCategoryDropdownValues] = useState([]);
	const [downgradeFailedArray, setDowngradeFailedArray] = useState(emptyArray);
	const [showFailedActions, setShowFailedActions] = useState(false);
	const [categoryUpgradeDropdownValues, setCategoryUpgradeDropdownValues] = useState([]);
	const [showUpgradeModal, setShowUpgradeModal] = useState();
	const [refreshListing, doRefreshListing] = useState();
	const [upgradeFailedArray, setUpgradeFailedArray] = useState(emptyArray);
	const [approveFailedArray, setApproveFailedArray] = useState(emptyArray);
	const [showEndorseModal, setShowEndorseModal] = useState(false);
	const [endorseFailedArray, setEndorseFailedArray] = useState(emptyArray);
	const history = useHistory();
	const controlStructure =
		customerListingCs &&
		Array.isArray(customerListingCs) &&
		customerListingCs.length > 0 &&
		generateCsObject(customerListingCs[0].controlStructureField);

	let authorizeCode = '';
	leftPanel &&
		leftPanel.map((menu) => {
			menu.subMenu.map((subMenu) => {
				if (subMenu.subMenuId == 'CLIENTADD') authorizeCode = subMenu.authorizeCode;
			});
		});

	useState(() => {}, [localCustomerData]);

	useEffect(() => {
		if (selectedRows && selectedRows.length > 0) {
			let categoryDropdownValues = controlStructure?.Category?.dropDownValue?.filter((item) => {
				return parseInt(item.dataValue) < parseInt(selectedRows[0].customerCategory);
			});
			setCategoryDropdownValues(categoryDropdownValues);
		}
	}, [selectedRows]);

	useEffect(() => {
		setFilterFormData({
			name: undefined,
			category: undefined,
			type: undefined,
			source: undefined,
			relationshipManager: undefined,
			branch: undefined,
			aumAmountRange: undefined,
			aumAmountMax: undefined,
			aumAmountMin: undefined,
			revenueAmountRange: undefined,
			revenueAmountMax: undefined,
			revenueAmountMin: undefined,
			investibleCashRange: undefined,
			investibleCashMax: undefined,
			investibleCashMin: undefined,
			riskProfile: undefined
		});
		setCardViewMode(Boolean.valueOf(sessionStorage.getItem('cardViewMode')));
		executeGetCustomerListingCs();
		!miniMode && executeGetAllCustomersData(setLocalCustomerData, setLoading);
	}, []);

	const handleApproveOk = () => {
		let requestBody = [];
		selectedRows.forEach((ele) => {
			let payload = {};
			payload.ClientId = ele.customerCode;
			payload.LegalStatus = ele.customerCategory;
			payload.IsNew = false;
			payload.Event = 'A';
			requestBody.push(payload);
		});
		approveRejectCustomer(requestBody).then((res) => {
			setApproveFailedArray(res.data.filter((status) => !status.success));
		});
	};

	const handleUpgradeOk = (upgradeFormData, setDisabled = () => {}) => {
		setDisabled(true);
		let requestBody = [];
		selectedRows.forEach((ele) => {
			let payload = {};
			payload.ClientId = ele.customerCode;
			payload.LegalStatus = upgradeFormData.category;
			payload.IsNew = true;
			payload.Event = 'U';
			payload.IsExistingCustomer = 'Y';
			payload.bankaccbranch = upgradeFormData.branch;
			payload.CustRelMgr = upgradeFormData.relationshipManager;
			payload.CategoryMfid = upgradeFormData.category;
			payload.Reason = upgradeFormData.reason;
			if (upgradeFormData.reason) {
				payload.Remark = upgradeFormData.otherReason;
			}
			requestBody.push(payload);
		});
		upgradeDowngradeCustomer(requestBody).then((res) => {
			setDisabled(false);
			setUpgradeFailedArray(res.data.filter((status) => !status.success));
		});
	};

	const handleEndorseOk = (assignFormData, setDisabled = () => {}) => {
		// SelectedCustomerOnboardingApi(
		//   selectedRowKeys,
		//   values.relationshipManager
		// ).then((res) => {
		//   setEassignndorseFailedArray(res.data.filter((status) => !status.success));
		// });
		setDisabled(true);
		let requestBody = [];
		selectedRows.forEach((ele) => {
			let payload = {};
			payload.ClientId = ele.customerCode;
			// payload.LegalStatus = ele.customerCategory;
			payload.IsNew = true;
			payload.Event = 'ASSIGN';
			payload.IsExistingCustomer = 'Y';
			payload.bankaccbranch = assignFormData.branch;
			payload.CustRelMgr = assignFormData.relationshipManager;
			payload.CategoryMfid = assignFormData.category;
			payload.Reason = assignFormData.reason;
			if (assignFormData.reason) {
				payload.Remark = assignFormData.otherReason;
			}
			requestBody.push(payload);
		});
		upgradeDowngradeCustomer(requestBody).then((res) => {
			setDisabled(false);
			setEndorseFailedArray(res.data.filter((status) => !status.success));
		});
	};

	const handleDowngradeOk = (downGradeFormData, setDisabled = () => {}) => {
		setDisabled(true);
		let requestBody = [];
		// console.log("selectedrows........",selectedRows);
		selectedRows.map((ele) => {
			let payload = {};

			// payload.ClientId= "334",
			// payload.LegalStatus= 1,
			// payload.IsNew=true,
			// payload.Event="D",
			// payload.IsExistingCustomer= "Y",
			// payload.Reason= "",
			// payload.Remarks= ""

			payload.ClientId = ele.customerCode;
			payload.LegalStatus = downGradeFormData.category;
			payload.IsNew = true;
			payload.Event = 'D';
			payload.IsExistingCustomer = 'Y';
			payload.bankaccbranch = downGradeFormData.branch;
			payload.CustRelMgr = downGradeFormData.relationshipManager;
			payload.Reason = downGradeFormData.reason;
			if (downGradeFormData.reason) {
				payload.Remark = downGradeFormData.otherReason;
			}

			requestBody.push(payload);
		});
		upgradeDowngradeCustomer(requestBody).then((res) => {
			setDisabled(false);
			setDowngradeFailedArray(res.data.filter((status) => !status.success));
		});
	};

	const filterRecords = (filterData) => {
		let filteredCustomerData = allCustomersData;
		//  let filteredCustomerData = localCustomerData;

		if (filterData.name) {
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
			filteredCustomerData = filteredCustomerData.filter((record) => {
				return (
					record.customerType &&
					record.customerType !== null &&
					filterData.type.includes(record.customerType)
				);
			});
		}
		if (filterData.category && filterData.category.length > 0) {
			filteredCustomerData = filteredCustomerData.filter((record) => {
				return (
					record.customerCategory &&
					record.customerCategory !== null &&
					filterData.category.includes(record.customerCategory)
				);
			});
		}
		if (filterData.source && filterData.source.length > 0) {
			filteredCustomerData = filteredCustomerData.filter((record) => {
				return record.source && record.source !== null && filterData.source.includes(record.source);
			});
		}

		if (filterData.branch && filterData.branch.length > 0) {
			filteredCustomerData = filteredCustomerData.filter((record) => {
				return record.branch && record.branch !== null && filterData.branch.includes(record.branch);
			});
		}
		if (filterData.relationshipManager && filterData.relationshipManager.length > 0) {
			filteredCustomerData = filteredCustomerData.filter((record) => {
				return (
					record.relationshipManagerName &&
					record.relationshipManagerName !== null &&
					filterData.relationshipManager.includes(record.relationshipManagerName)
				);
			});
		}
		if (filterData.aumAmountRange) {
			filteredCustomerData = filteredCustomerData.filter((record) => {
				return (
					record.aum >= filterData.aumAmountRange[0] && record.aum <= filterData.aumAmountRange[1]
				);
			});
		}
		if (filterData.revenueAmountRange) {
			filteredCustomerData = filteredCustomerData.filter((record) => {
				return (
					record.revenue &&
					filterData.revenueAmountRange &&
					record.revenue >= filterData.revenueAmountRange[0] &&
					record.revenue <= filterData.revenueAmountRange[1]
				);
			});
		}
		if (filterData.investibleCashRange) {
			filteredCustomerData = filteredCustomerData.filter((record) => {
				return (
					record.investibleCash &&
					filterData.investibleCashRange &&
					record.investibleCash >= filterData.investibleCashRange[0] &&
					record.investibleCash <= filterData.investibleCashRange[1]
				);
			});
		}
		if (filterData.riskProfile && filterData.riskProfile.length > 0) {
			filteredCustomerData = filteredCustomerData.filter((record) => {
				return (
					record.riskProfileCategoryName &&
					record.riskProfileCategoryName !== null &&
					filterData.riskProfile.includes(record.riskProfileCategoryName)
				);
			});
		}
		setLocalCustomerData(filteredCustomerData);
		onSortSelect(sortBy, filteredCustomerData);
	};
	useEffect(() => {
		if (!flag) {
			filterRecords(filterFormData);
		}
	}, [filterFormData]);

	const toggleCardViewMode = () => {
		setCardViewMode(!cardViewMode);
		sessionStorage.setItem('cardViewMode', !cardViewMode);
	};

	const downloadRecords = () => {
		const downloadData =
			selectedRows && selectedRows.length > 0
				? selectedRows.map((customer, index) => ({
						'Sr.No': index + 1,
						'Date Created': customer.inputDateTime,
						'Client Name': customer.customerName,
						'Client Code': customer.customerCode,
						'Family Name': customer.FamilyName,
						Category: customer.customerCategory,
						Office: customer.branch,
						'Relationship Manager': customer.relationshipManagerName,
						'Contact Number': customer.mobileNo,
						Email: customer.emailID,
						AUM: customer.currencySymbol + customer.aum,
						Type: customer.customerType,
						'Risk Profile': customer.riskProfileCategoryName,
						Address: customer.address,
						Favorite: customer.isFavourite === false ? 'No' : 'Yes'
				  }))
				: localCustomerData.map((customer, index) => ({
						'Sr.No': index + 1,
						'Date Created': customer.inputDateTime,
						'Client Name': customer.customerName,
						'Client Code': customer.customerCode,
						'Family Name': customer.familyName,
						Category: customer.customerCategory,
						Office: customer.branch,
						'Relationship Manager': customer.relationshipManagerName,
						'Contact Number': customer.mobileNo,
						Email: customer.emailID,
						AUM: customer.currencySymbol + customer.aum,
						Type: customer.customerType,
						'Risk Profile': customer.riskProfileCategoryName,
						Address: customer.address,
						Favorite: customer.isFavourite === false ? 'No' : 'Yes'
				  }));
		exportJSON(downloadData, 'Client');
	};

	const RenderTopBar = () => {
		return (
			<div className='dashboard-topbar-container'>
				{/* <FontAwesomeIcon icon={faChevronLeft} className="chevron-left" /> */}
				<div>My Client</div>
				{/* <Button className="topbar-btn">
          {/* <NavLink to="/dashboard/MyCustomers/CustomerCreate"> */}
				{/* <FontAwesomeIcon
              icon={faPlus}
              style={{ marginRight: 8 }}
              onClick={() => {
                // history.push("MyCustomers/CustomerCreate");
                const toObject1 = {
                  pathname: "/dashboard/MyCustomers/CustomerCreate",
                  state: {action:"create",refType:"CLIENTADD"},
                };
                history.push(toObject1);
              }}
            />
            Add */}
				{/* </NavLink> */}
				{/* </Button> */}
				<Button
					style={{ opacity: loading ? '0.5' : '1' }}
					disabled={loading}
					onClick={() => {
						// history.push("/dashboard/MyCustomers/CustomerCreate", { action: 'create' });
						const toObject = {
							pathname: '/dashboard/MyCustomers/CustomerCreate',
							state: { action: 'create', refType: 'CLIENTADD' }
						};
						history.push(toObject);
					}}
					className='topbar-btn'
				>
					<FontAwesomeIcon
						// className={loading ? 'disabled-icon' : 'icon'}
						icon={faPlus}
						style={{ marginRight: 8 }}
					/>
					Add
				</Button>
			</div>
		);
	};

	const onFilterSelect = (value) => {
		// filter operation
		// setFilterFormData(filterData)
		setLoading(true);
		setFlag(true);
		let filteredCustomersList;
		switch (value) {
			case 'Show All':
				filteredCustomersList = allCustomersData;
				break;
			case 'Favourites':
				filteredCustomersList =
					allCustomersData && allCustomersData.filter((item) => item.isFavourite);

				break;
			case 'Open Only':
				filteredCustomersList =
					allCustomersData && allCustomersData.filter((item) => item.activeYN === 'Y');
				break;
			case 'Recently Modified (Modified in last 30 days)':
				filteredCustomersList =
					allCustomersData &&
					allCustomersData.filter((item) => {
						return item?.noOfDays <= 30 && item?.version > 1;
					});
				break;
			case 'Created in last 7 Days':
				filteredCustomersList =
					allCustomersData &&
					allCustomersData.filter((item) => item?.noOfDays <= 7 && item?.version === 1);
				break;
			case 'Created in last 15 Days':
				filteredCustomersList =
					allCustomersData &&
					allCustomersData.filter((item) => item?.noOfDays <= 15 && item?.version === 1);
				break;
			case 'Created in last 30 Days':
				filteredCustomersList =
					allCustomersData &&
					allCustomersData.filter((item) => item?.noOfDays <= 30 && item?.version === 1);
				break;
			default:
				break;
		}
		if (filteredCustomersList) {
			// console.log('line no 524----------------', filteredCustomersList);
			setFilterFormData(filterData);
			setFilterBy(value);
			setLocalCustomerData(filteredCustomersList);
			onSortSelect(sortBy, filteredCustomersList);
		} else {
			setLocalCustomerData(allCustomersData);
		}
		setLoading(false);
	};

	// const onSortSelect = (value,updatedLocalData=[]) => {
	const onSortSelect = (value, updatedLocalData = localCustomerData) => {
		let sortedCustomerList;
		let latestUpdatedLocalData = updatedLocalData;
		if (latestUpdatedLocalData) {
			switch (value) {
				case 'Creation Date Near To Far':
					let customerOnboardingListVersion1 = latestUpdatedLocalData?.filter(
						(item) => item?.version === 1
					);
					let customerOnboardingListVersion2 = latestUpdatedLocalData?.filter(
						// (item) => item?.version === 2
						(item) => item?.version >= 2
					);
					customerOnboardingListVersion1 = customerOnboardingListVersion1?.sort((a, b) => {
						const aTimestamp = moment(a.inputDateTime);
						const bTimestamp = moment(b.inputDateTime);
						return bTimestamp.diff(aTimestamp);
					});
					customerOnboardingListVersion2 = customerOnboardingListVersion2?.sort((a, b) => {
						const aTimestamp = moment(a.inputDateTime);
						const bTimestamp = moment(b.inputDateTime);
						return bTimestamp.diff(aTimestamp);
					});

					sortedCustomerList = [
						...customerOnboardingListVersion1,
						...customerOnboardingListVersion2
					];

					break;
				case 'Creation Date Far To Near':
					let customerOnboardingListVersionFar1 = latestUpdatedLocalData?.filter(
						(item) => item?.version === 1
					);
					let customerOnboardingListVersionFar2 = latestUpdatedLocalData?.filter(
						// (item) => item?.version === 2
						(item) => item?.version >= 2
					);
					customerOnboardingListVersionFar1 = customerOnboardingListVersionFar1?.sort((a, b) => {
						const aTimestamp = moment(a?.inputDateTime);
						const bTimestamp = moment(b?.inputDateTime);
						return aTimestamp?.diff(bTimestamp);
					});
					customerOnboardingListVersionFar2 = customerOnboardingListVersionFar2?.sort((a, b) => {
						const aTimestamp = moment(a?.inputDateTime);
						const bTimestamp = moment(b?.inputDateTime);
						return aTimestamp?.diff(bTimestamp);
					});
					sortedCustomerList = [
						...customerOnboardingListVersionFar2,
						...customerOnboardingListVersionFar1
					];
					break;
				case 'Modification Near To Far':
					let customerListVersion2 = latestUpdatedLocalData?.filter((item) => item.version === 1);
					let customerListVersion1 = latestUpdatedLocalData?.filter((item) => item.version >= 2);
					customerListVersion1 = customerListVersion1?.sort((a, b) => {
						return b.version - a.version;
					});
					customerListVersion2 = customerListVersion2?.sort((a, b) => {
						const aTimestamp = moment(a.inputDateTime);
						const bTimestamp = moment(b.inputDateTime);
						return bTimestamp.diff(aTimestamp);
					});
					sortedCustomerList = [...customerListVersion1, ...customerListVersion2];
					break;
				case 'Modification Far To Near':
					let customerListVersionFar2 = latestUpdatedLocalData?.filter(
						(item) => item.version === 1
					);
					let customerListVersionFar1 = latestUpdatedLocalData?.filter((item) => item.version >= 2);
					customerListVersionFar1 = customerListVersionFar1?.sort((a, b) => {
						return a.version - b.version;
					});
					customerListVersionFar2 = customerListVersionFar2?.sort((a, b) => {
						const aTimestamp = moment(a.inputDateTime);
						const bTimestamp = moment(b.inputDateTime);
						return aTimestamp.diff(bTimestamp);
					});
					sortedCustomerList = [...customerListVersionFar1, ...customerListVersionFar2];
					break;
				case 'AUM (Highest to Lowest)':
					sortedCustomerList = [...latestUpdatedLocalData]?.sort((a, b) => {
						return b.aum - a.aum;
					});
					break;
				case 'AUM(Lowest to Highest)':
					sortedCustomerList = [...latestUpdatedLocalData]?.sort((a, b) => {
						return a.aum - b.aum;
					});
					break;
				case 'Revenue (Highest to Lowest)':
					sortedCustomerList = [...latestUpdatedLocalData]?.sort((a, b) => {
						return b.revenue - a.revenue;
					});
					break;
				case 'Revenue (Lowest to Highest)':
					sortedCustomerList = [...latestUpdatedLocalData]?.sort((a, b) => {
						return a.revenue - b.revenue;
					});
					break;
				case 'Investible Cash (Highest to Lowest)':
					sortedCustomerList = [...latestUpdatedLocalData]?.sort((a, b) => {
						return b.investibleCash - a.investibleCash;
					});
					break;
				case 'Investible Cash (Lowest to Highest)':
					sortedCustomerList = [...latestUpdatedLocalData]?.sort((a, b) => {
						return a.investibleCash - b.investibleCash;
					});
					break;
				default:
					break;
			}
		}

		if (sortedCustomerList) {
			setSortBy(value);
			setLocalCustomerData(sortedCustomerList);
		} else {
			setLocalCustomerData(allCustomersData);
		}
		// setLoading(false);
	};

	const RenderDropdown = ({ mode, onSelect, loading = false }) => {
		let options = [];
		if (mode === 'filter') {
			options = [
				{ label: 'Show All', value: 'Show All' },
				{ label: 'Favourites', value: 'Favourites' },
				{
					label: 'Recently Modified (Modified in last 30 days)',
					value: 'Recently Modified (Modified in last 30 days)'
				},
				{ label: 'Created in last 7 Days', value: 'Created in last 7 Days' },
				{ label: 'Created in last 15 Days', value: 'Created in last 15 Days' },
				{ label: 'Created in last 30 Days', value: 'Created in last 30 Days' }
			];
		} else if (mode === 'sort') {
			options = [
				// recent change
				{
					label: 'Creation Date Near To Far',
					value: 'Creation Date Near To Far'
				},
				{
					label: 'Creation Date Far To Near',
					value: 'Creation Date Far To Near'
				},
				{
					label: 'Modification Near To Far',
					value: 'Modification Near To Far'
				},
				{
					label: 'Modification Far To Near',
					value: 'Modification Far To Near'
				}
			];
		}
		const menu = (
			<Menu>
				{options.map((item, idx) => (
					<div
						onClick={() => {
							setLoading(true);
							onSelect(item.value);
						}}
						key={idx}
					>
						{item.label}
					</div>
				))}
			</Menu>
		);
		return (
			<div style={{ position: 'relative' }}>
				<div className='dropdown-prefix'>{mode.charAt(0).toUpperCase() + mode.substring(1)}:</div>
				<Select
					className={'filter-sort-dropdown ' + mode}
					size='large'
					placeholder={mode === 'filter' ? 'Select filter' : 'Select Sort by'}
					onSelect={onSelect}
					value={mode === 'filter' ? filterBy : sortBy}
					showArrow={true}
					disabled={loading}
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

	const RenderAdvancedFilterDrawer = ({
		showDrawer,
		toggleDrawer,
		filterCs,
		onAdvFilterSubmit,
		filterRecords,
		setIsFilterApplied
	}) => {
		const [form] = Form.useForm();
		const [filterCount, setFilterCount] = useState(0);
		const [formData, setFormData] = useState({
			name: filterFormData.name || undefined,
			category: filterFormData.category || undefined,
			type: filterFormData.type || undefined,
			source: filterFormData.source || undefined,
			relationshipManager: filterFormData.relationshipManager || undefined,
			branch: filterFormData.branch || undefined,
			aumAmountRange: filterFormData.aumAmountRange || undefined,
			// aumAmountMax: filterFormData.aumAmountMax || undefined,
			aumAmountMax: filterFormData.aumAmountMax || 0,
			aumAmountMin: filterFormData.aumAmountMin || 0,
			revenueAmountRange: filterFormData.revenueAmountRange || undefined,
			revenueAmountMax: filterFormData.revenueAmountMax || undefined,
			revenueAmountMin: filterFormData.revenueAmountMin || 0,
			investibleCashRange: filterFormData.investibleCashRange || undefined,
			investibleCashMax: filterFormData.investibleCashMax || undefined,
			investibleCashMin: filterFormData.investibleCashMin || 0,
			riskProfile: filterFormData.riskProfile || undefined
		});
		useEffect(() => {
			const formDataKeys = Object.keys(formData);
			setFilterCount(
				formDataKeys.filter((item) => formData[item] !== undefined && formData[item]?.length > 0)
					.length
			);
		}, [formData]);
		useEffect(() => {
			filterCount > 0 ? setIsFilterApplied(true) : setIsFilterApplied(false);
		}, [filterCount]);

		const onValuesChange = (values) => {
			if (values.aumAmountRange) {
				setFormData({
					...formData,
					aumAmountRange: values.aumAmountRange,
					aumAmountMin: values.aumAmountRange[0],
					aumAmountMax: values.aumAmountRange[1]
				});
			} else if (values.aumAmountMin) {
				setFormData({
					...formData,
					aumAmountMin: values.aumAmountMin,
					aumAmountRange: [values.aumAmountMin, formData.aumAmountMax]
				});
			} else if (values.aumAmountMax) {
				setFormData({
					...formData,
					aumAmountMax: values.aumAmountMax,
					aumAmountRange: [formData.aumAmountMin, values.aumAmountMax]
				});
			} else if (values.revenueAmountRange) {
				if (values.revenueAmountRange[0] < values.revenueAmountRange[1]) {
					setFormData({
						...formData,
						revenueAmountRange: values.revenueAmountRange,
						revenueAmountMin: values.revenueAmountRange[0],
						revenueAmountMax: values.revenueAmountRange[1]
					});
				}
				form.setFieldsValue({
					revenueAmountRange: values.revenueAmountRange,
					revenueAmountMin: values.revenueAmountRange[0],
					revenueAmountMax: values.revenueAmountRange[1]
				});
			} else if (values.revenueAmountMin) {
				if (formData.revenueAmountMax > values.revenueAmountMin) {
					setFormData({
						...formData,
						revenueAmountMin: values.revenueAmountMin,
						revenueAmountRange: [values.revenueAmountMin, formData.revenueAmountRange[1]]
					});
					form.setFieldsValue({
						revenueAmountMin: values.revenueAmountMin,
						revenueAmountRange: [values.revenueAmountMin, formData.revenueAmountMax]
					});
				}
			} else if (values.revenueAmountMax) {
				if (formData.aumAmountMin < values.aumAmountMax) {
					setFormData({
						...formData,
						revenueAmountMax: values.revenueAmountMax,
						revenueAmountRange: [formData.revenueAmountRange[0], values.revenueAmountMax]
					});
					form.setFieldsValue({
						revenueAmountMax: values.revenueAmountMax,
						revenueAmountRange: [formData.revenueAmountMin, values.revenueAmountMax]
					});
				}
			} else if (values.investibleCashRange) {
				if (values.investibleCashRange[0] < values.investibleCashRange[1]) {
					setFormData({
						...formData,
						investibleCashRange: values.investibleCashRange,
						investibleCashMin: values.investibleCashRange[0],
						investibleCashMax: values.investibleCashRange[1]
					});
				}
				form.setFieldsValue({
					investibleCashRange: values.investibleCashRange,
					investibleCashMin: values.investibleCashRange[0],
					investibleCashMax: values.investibleCashRange[1]
				});
			} else if (values.investibleCashMin) {
				if (formData.investibleCashMax > values.investibleCashMin) {
					setFormData({
						...formData,
						investibleCashMin: values.investibleCashMin,
						investibleCashRange: [values.investibleCashMin, formData.investibleCashRange[1]]
					});
					form.setFieldsValue({
						investibleCashMin: values.investibleCashMin,
						investibleCashRange: [values.investibleCashMin, formData.investibleCashMax]
					});
				}
			} else if (values.investibleCashMax) {
				if (formData.investibleCashMin < values.investibleCashMax) {
					setFormData({
						...formData,
						investibleCashMax: values.investibleCashMax,
						investibleCashRange: [formData.investibleCashRange[0], values.investibleCashMax]
					});
					form.setFieldsValue({
						investibleCashMax: values.investibleCashMax,
						investibleCashRange: [formData.investibleCashMin, values.investibleCashMax]
					});
				}
			} else {
				setFormData({ ...formData, ...values });
			}
		};
		return (
			<Drawer
				width={'26vw'}
				className='myCustomer-list-advanced-filter-drawer-container'
				visible={showDrawer}
				onClose={toggleDrawer}
				closable
			>
				<div className='header' style={{ position: 'relative' }}>
					<div className='title'>Filter</div>
					<div className='subtitle' style={{ position: 'absolute', right: '50px' }}>
						{filterCount === 0 ? 'No' : filterCount} tag
						{filterCount > 1 && 's '}
					</div>
				</div>

				<MyCustomerListingFilterForm
					form={form}
					filterCs={filterCs}
					formData={formData}
					toggleDrawer={toggleDrawer}
					onFinish={onAdvFilterSubmit}
					onValuesChange={onValuesChange}
					setFilterFormData={setFilterFormData}
					setIsFilterApplied={setIsFilterApplied}
					setFormData={setFormData}
				/>
			</Drawer>
		);
	};

	const RenderFiltersPanel = () => {
		const [showDrawer, setShowDrawer] = useState(false);
		const [isFilterApplied, setIsFilterApplied] = useState(false);
		const toggleDrawer = () => {
			setShowDrawer(!showDrawer);
			setFlag(false);
		};

		const onAdvancedFilterSubmit = (filterData) => {
			setFilterFormData(filterData);
			setFilterBy('Show All');
			//  setSortBy("CreationDateNearToFar")
			setSortBy(sortBy);
		};

		// const enableDisableDowngrade = () => {
		//   if (selectedRowKeys.length > 0) {
		//     return false;
		//   } else {
		//     return true;
		//   }
		// }
		// const enableDisableUpgradeDowngrade = () => {
		//   let flag = false;
		//   if (selectedRowKeys.length <= 0) {
		//     flag = true;
		//   } else {
		//     selectedRows.map(ele => {
		//       if (ele.customerCategory != selectedRows[0].customerCategory) {
		//         flag = true;
		//       }
		//     });
		//   }
		//   return flag;
		// }
		// const onDowngradeClick = () => {
		//   let requestBody = {
		//     FieldListID: 20068,
		//     dependentValue: { cust_catid: selectedRows[0].customerCategory }
		//   }
		//   getDependentDataCustomerOnboarding(requestBody).then((res) => {
		//     setShowDowngradeModal(true);
		//     if (res.data) {
		//       setRmForDowngrade(res.data);
		//     }
		//   });
		// }
		// const onUpgradeClick = () => {
		//   let requestBody = {
		//     FieldListID: 20068,
		//     dependentValue: { cust_catid: selectedRows[0].customerCategory }
		//   }
		//   getDependentDataCustomerOnboarding(requestBody).then((res) => {
		//     setShowUpgradeModal(true);
		//     if (res.data) {
		//       setRmForDowngrade(res.data);
		//     }
		//   });
		// }
		return (
			<div className='filters-panel'>
				<div className='left'>
					{authorizeModule(authorizeCode, CONSTANTS.authorizeCode.upgrade) && (
						<FontAwesomeIcon
							icon={faArrowCircleUp}
							// className={!enableDisableUpgradeDowngrade() ? 'icon' : 'disabled-icon'}
							// onClick={() => !enableDisableUpgradeDowngrade() && onUpgradeClick()}
							className={selectedRowKeys.length === 0 ? 'disabled-icon' : 'icon'}
							onClick={() => selectedRowKeys.length > 0 && setShowUpgradeModal(true)}
						/>
					)}
					{authorizeModule(authorizeCode, CONSTANTS.authorizeCode.downgrade) && (
						<FontAwesomeIcon
							icon={faArrowCircleDown}
							// className={enableDisableDowngrade() ? 'disabled-icon' : 'icon'}
							// onClick={() => !enableDisableDowngrade() && onDowngradeClick()}
							// className={enableDisableUpgradeDowngrade() ? 'disabled-icon' : 'icon'}
							// onClick={() => !enableDisableUpgradeDowngrade() && onDowngradeClick()}
							className={selectedRowKeys.length === 0 ? 'disabled-icon' : 'icon'}
							onClick={() => selectedRowKeys.length > 0 && setShowDowngradeModal(true)}
						/>
					)}
					{authorizeModule(authorizeCode, CONSTANTS.authorizeCode.assign) && (
						<FontAwesomeIcon
							icon={faUserCheck}
							className={selectedRowKeys.length === 0 ? 'disabled-icon' : 'icon'}
							onClick={() => selectedRowKeys.length > 0 && setShowEndorseModal(true)}
						/>
					)}
				</div>

				<RenderDropdown mode='filter' loading={loading} onSelect={onFilterSelect} />
				{/* <RenderDropdown mode="sort" onSelect={onSortSelect} /> */}
				<RenderDropdown
					mode='sort'
					loading={loading}
					onSelect={(val) => onSortSelect(val, localCustomerData)}
				/>
				<div className='right'>
					<div className='icon-filter-wrapper'>
						<FontAwesomeIcon
							icon={faFilter}
							className={loading ? 'disabled-icon' : 'icon'}
							onClick={() => {
								toggleDrawer();
							}}
						/>
						{isFilterApplied && <span className='filter-badge'></span>}
					</div>
					<FontAwesomeIcon
						icon={faArrowAltToBottom}
						// className='icon'
						className={loading ? 'disabled-icon' : 'icon'}
						onClick={() => {
							downloadRecords();
						}}
					/>
					<Tooltip title={!cardViewMode ? 'Grid view' : 'List View'}>
						<FontAwesomeIcon
							icon={cardViewMode ? faThList : faThLarge}
							className={loading ? 'disabled-icon' : 'icon'}
							onClick={() => {
								toggleCardViewMode();
							}}
						/>
					</Tooltip>
					<FontAwesomeIcon
						icon={faRedo}
						className={loading ? 'disabled-icon' : 'icon'}
						onClick={() => {
							doRefreshClientApi()
								.then((res) => {
									if (res.status === 200) {
										executeGetAllCustomersData(setLocalCustomerData, setLoading);
									}
								})
								.catch((err) => {
									console.log(err);
								});
						}}
					/>
				</div>
				<RenderAdvancedFilterDrawer
					showDrawer={showDrawer}
					toggleDrawer={toggleDrawer}
					onAdvFilterSubmit={onAdvancedFilterSubmit}
					filterCs={controlStructure}
					setIsFilterApplied={setIsFilterApplied}
				/>
			</div>
		);
	};

	const onCellDefault = (row, rowNumber) => {
		return {
			onClick: (event) => {
				const CustomerCode = row.customerCode;
				CustomerCode &&
					getAccountDetailsApi(CustomerCode)
						.then((res) => {
							let result = res.data.lstAccountList.filter((each) => each !== null);
							setCustomerAccounts(result);
							setAccountsModalShow(true);
						})
						.catch((err) => {
							console.log(err);
						});
			}, // click row

			onDoubleClick: (event) => {}, // double click row
			onContextMenu: (event) => {}, // right button click row
			onMouseEnter: (event) => {}, // mouse enter row
			onMouseLeave: (event) => {} // mouse leave row
		};
	};

	const onProfileSelect = (row) => {
		const toObject = {
			pathname: `/dashboard/Profile`,
			state: {
				clientObject: row
			}
		};
		history.push(toObject);
	};

	const onCellFavourite = (record, rowIndex) => {
		return {
			onClick: (event) => {
				addFavouriteCustomerApi(record.customerCode, CONSTANTS.progNames.CLIENTADD)
					.then((res) => {})
					.catch((err) => {
						console.log('EEROR: ', err);
					})
					.finally(() => {
						executeGetAllCustomersData(setLocalCustomerData, setLoading);
					});
			}, // click row
			onDoubleClick: (event) => {}, // double click row
			onContextMenu: (event) => {}, // right button click row
			onMouseEnter: (event) => {}, // mouse enter row
			onMouseLeave: (event) => {} // mouse leave row
		};
	};
	const ActionSuccessModalScreen = ({ operationName }) => (
		<>
			<div className='modal-body'>
				<div className='action-success-screen'>
					<img src={assets.common.successTick} alt='success' className='success-logo' />
					<div style={{ display: 'flex', flexDirection: 'column' }}>
						<div className='title'>
							{selectedRowKeys.length}/{selectedRowKeys.length} Successful Action
						</div>
						<div className='subtitle'>Your action has been completed successfully</div>
					</div>
				</div>
				<div className='modal-footer'>
					<Button
						className='text-only-btn'
						type='text'
						onClick={() => {
							closeModal(operationName);
						}}
					>
						Ok
					</Button>
				</div>
			</div>
		</>
	);
	const ActionFailModalScreen = ({ errorArray, operationName }) => {
		const FailScreen = () => (
			<>
				<div className='modal-body'>
					<div
						className='action-fail-screen'
						style={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center'
						}}
					>
						<img src={assets.common.triangleExclamation} alt='fail' className='fail-logo' />
						<div style={{ display: 'flex', flexDirection: 'column' }}>
							<div className='title'>
								{selectedRowKeys.length - errorArray.length}/{selectedRowKeys.length} Successful
								Action
							</div>
							<div className='subtitle'>
								{errorArray.length} action{errorArray.length > 1 && 's'} could not be
								completed.&nbsp;
								<div
									className='view-failed-actions-screen'
									onClick={() => {
										setShowFailedActions(true);
									}}
								>
									View
								</div>
							</div>
						</div>
					</div>
					<div className='modal-footer'>
						<Button
							className='text-only-btn'
							type='text'
							onClick={() => {
								closeModal(operationName);
							}}
						>
							Ok
						</Button>
					</div>
				</div>
			</>
		);
		const ListFailedActionsScreen = () => {
			const renderRecordDetailsCol = (errObject) => (
				<div className='record-details'>
					<div>
						{selectedRows.map(
							(row) =>
								row.customerCode === errObject.refID && (
									<strong key={row.customerCode}>{row.customerName}</strong>
								)
						)}
					</div>
				</div>
			);
			const renderFailReasonCol = (message) => <div style={{ color: '#bc0573' }}>{message}</div>;
			const failTableColumns = [
				{
					float: 'right',
					title: 'Customer',
					dataIndex: 'name',
					key: 'avatar',
					// width: 300,
					render: (name, dataObject) => renderRecordDetailsCol(dataObject)
				},
				{
					float: 'right',
					title: 'Failed Reason',
					dataIndex: 'message',
					key: 'name',
					// width: 300,
					render: (message) => renderFailReasonCol(message)
				}
			];

			return (
				<>
					<div className='modal-header'>
						<img
							src={assets.common.triangleExclamation}
							alt='fail'
							className='header-icon fail-logo'
						/>
						<div className='failed-actions-title'>Failed Actions</div>
					</div>
					<div>
						<Table
							className='failed-actions-list-container'
							rowClassName='failed-action-row'
							columns={failTableColumns}
							dataSource={errorArray}
							rowKey='mobile'
							showHeader={true}
							bordered={false}
							pagination={false}
							authorizeCode={authorizeCode}
							loading={loading}
						/>
					</div>
					<div className='modal-footer'>
						<Button
							className='text-only-btn'
							type='text'
							onClick={() => {
								closeModal(operationName);
							}}
						>
							Ok
						</Button>
					</div>
				</>
			);
		};

		return <>{!showFailedActions ? <FailScreen /> : <ListFailedActionsScreen />}</>;
	};
	const closeModal = (operationName) => {
		if (operationName === 'downgrade') {
			setShowDowngradeModal(false);
			setDowngradeFailedArray(emptyArray);
		}
		if (operationName === 'endorse') {
			setEndorseFailedArray(emptyArray);
			setShowEndorseModal(false);
		}
		if (operationName === 'upgrade') {
			setShowUpgradeModal(false);
			setUpgradeFailedArray(emptyArray);
		}
		setShowFailedActions(false);
		setSelectedRowKeys([]);
		setSelectedRows([]);
		executeGetAllCustomersData(setLocalCustomerData, setLoading);
	};
	const cancelOperation = (operationName) => {
		operationName === 'downgrade' && setShowDowngradeModal(false);
		operationName === 'endorse' && setShowEndorseModal(false);
		operationName === 'upgrade' && setShowUpgradeModal(false);
		setSelectedRowKeys([]);
		setSelectedRows([]);
	};
	const RenderConfirmEndorseModal = () => {
		const ConfirmScreen = () => {
			const [form] = Form.useForm();
			const [assignReason, setAssignReason] = useState('');
			const [assignRelationManager, setAssignRelationManager] = useState('');
			const [assignBranchName, setAssignBranchName] = useState('');
			const [otherAssignReason, setOtherAssignReason] = useState('');
			const [required, setRequired] = useState(false);
			const [disabled, setDisabled] = useState(false);

			const handleAssignReasonChange = (key, value) => {
				setAssignReason({ [key]: value });
				setOtherAssignReason('');
				setRequired(false);
			};
			const handleAssignBranchChange = (key, value) => {
				setAssignBranchName({ [key]: value });
			};
			const handleAssignRMChange = (key, value) => {
				controlStructure?.RelationshipManager?.lookupValue.lookUpValues.find((e) => {
					if (e.ID === value) {
						setAssignBranchName(e.Branch);
						form.setFieldsValue({ assignBranchName: e.Branch });
					}
				});
				setAssignRelationManager({ [key]: value });
			};

			const handleOtherAssignReasonChange = (e) => {
				setOtherAssignReason(e.target.value);
				setRequired(false);
			};
			const onAssign = () => {
				let assignFormData = {
					branch: assignBranchName,
					relationshipManager: assignRelationManager.assignRelationManager,
					reason: assignReason.assignReason,
					otherReason: otherAssignReason
				};

				if (
					assignRelationManager.assignRelationManager &&
					// assignBranchName.assignBranchName &&
					assignReason.assignReason
				) {
					if (assignReason.assignReason === 'O') {
						if (otherAssignReason) {
							setRequired(false);
							handleEndorseOk(assignFormData, setDisabled);
						} else {
							setRequired(true);
						}
					} else {
						setRequired(false);
						handleEndorseOk(assignFormData, setDisabled);
					}
				} else {
					setRequired(true);
				}
			};
			return (
				<>
					<div className='modal-header'>
						<div className='header-icon'>
							<FontAwesomeIcon icon={faUserCheck} />
						</div>
						<div className='header-title'>Assign</div>
					</div>
					<div className='modal-body'>
						Are you sure you want to Assign selected
						{selectedRowKeys.length > 1
							? ` ${selectedRowKeys.length} `
							: selectedRowKeys.length === 1 && ' '}
						Client{selectedRowKeys.length > 1 ? 's' : ' '}?
						<Form
							// name='assign-leads-form'
							className='assign-leads-form'
						>
							<div id='assignCategory' className='field-section' style={{ marginTop: '1rem' }}>
								<label className='field-label' htmlFor='assignBranchName'>
									Office
								</label>
								<Form.Item
								// name='assignBranchName'
								>
									<Select
										size='large'
										mode='single'
										placeholder='Select Office Name'
										// onChange={(value) => handleAssignBranchChange('assignBranchName', value)}
										value={assignBranchName}
										filterOption={(input, opt) => {
											return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
										}}
										disabled={true}
										showSearch
									>
										{controlStructure?.Branch?.lookupValue.lookUpValues.map((option) => (
											<Select.Option key={option.Unit_Hierarchy} value={option.Unit_Hierarchy}>
												{option.NAME}
											</Select.Option>
										))}
									</Select>
								</Form.Item>
								<label className='field-label' htmlFor='assignRelationManager'>
									Relationship Manager
								</label>
								<Form.Item name='assignRelationManager'>
									<Select
										size='large'
										mode='single'
										placeholder='Select Relation Name'
										onChange={(value) => handleAssignRMChange('assignRelationManager', value)}
										value={assignRelationManager}
										filterOption={(input, opt) => {
											return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
										}}
										showSearch
									>
										{controlStructure?.RelationshipManager?.lookupValue.lookUpValues.map(
											(option) => (
												<Select.Option key={option.ID} value={option.ID}>
													{option.Name}
												</Select.Option>
											)
										)}
									</Select>
								</Form.Item>
								<label className='field-label' htmlFor='assignReason'>
									Reason
								</label>
								<Form.Item name='assignReason'>
									<Select
										size='large'
										mode='single'
										placeholder='Select Reason'
										onChange={(value) => handleAssignReasonChange('assignReason', value)}
										value={assignReason}
										filterOption={(input, opt) => {
											return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
										}}
										showSearch
									>
										{controlStructure?.AssignReason?.dropDownValue.map((option) => (
											<Select.Option key={option.dataValue} value={option.dataValue}>
												{option.displayValue}
											</Select.Option>
										))}
									</Select>
								</Form.Item>
								{assignReason.assignReason ? (
									<Form.Item>
										<Input
											maxLength={20}
											onChange={(evt) => handleOtherAssignReasonChange(evt)}
											size='large'
											value={otherAssignReason}
											placeholder={'Enter Reason'}
											max={20}
										/>
									</Form.Item>
								) : (
									''
								)}
								{required && (
									<Form.Item>
										<Alert
											//style={{ marginBottom: "15px" }}
											message='All fields are required'
											type='error'
											closable
										/>
									</Form.Item>
								)}
							</div>
						</Form>
						<div className='modal-footer2'>
							<Button
								className='text-only-btn'
								key='back'
								type='text'
								disabled={disabled}
								onClick={() => {
									cancelOperation('endorse');
								}}
							>
								Cancel
							</Button>
							<Button
								className='submit-btn2'
								key='submit'
								type='primary'
								disabled={disabled}
								style={{ fontSize: '28px' }}
								onClick={onAssign}
							>
								Assign
							</Button>
						</div>
					</div>
				</>
			);
		};

		return (
			<CustomModal
				handleCancel={() => {
					closeModal('endorse');
				}}
				handleOk={handleEndorseOk}
				visible={showEndorseModal}
			>
				{endorseFailedArray === 'emptyArray' ? (
					<ConfirmScreen />
				) : endorseFailedArray.length === 0 ? (
					<ActionSuccessModalScreen operationName='endorse' />
				) : (
					<ActionFailModalScreen errorArray={endorseFailedArray} operationName='endorse' />
				)}
			</CustomModal>
		);
	};
	const RenderUpgradeModal = () => {
		const UpgradeScreen = () => {
			const [upgradeReason, setUpgradeReason] = useState('');
			const [upgradeRelationManager, setUpgradeRelationManager] = useState('');
			const [upgradeBranchName, setUpgradeBranchName] = useState('');
			const [upgradeCategory, setUpgradeCategory] = useState('');
			const [otherUpgradeReason, setOtherUpgradeReason] = useState('');
			const [required, setRequired] = useState(false);
			const [disabled, setDisabled] = useState(false);
			const handleUpgradeReasonChange = (key, value) => {
				setUpgradeReason({ [key]: value });
				setOtherUpgradeReason('');
				setRequired(false);
			};
			const handleUpgradeBranchChange = (key, value) => {
				setUpgradeBranchName({ [key]: value });
			};
			const handleUpgradeRMChange = (key, value) => {
				setUpgradeRelationManager({ [key]: value });
			};
			const handleUpgradeCategoryChange = (key, value) => {
				setUpgradeCategory({ [key]: value });
			};
			const handleOtherUpgradeReasonChange = (e) => {
				if (upgradeReason.upgradeReason) {
					setOtherUpgradeReason(e.target.value);
					setRequired(false);
				}
			};
			const onUpgrade = () => {
				let upgradeFormData = {
					category: upgradeCategory.upgradeCategory,
					branch: upgradeBranchName.upgradeBranchName,
					relationshipManager: upgradeRelationManager.upgradeRelationManager,
					reason: upgradeReason.upgradeReason,
					otherReason: otherUpgradeReason
				};

				if (
					upgradeRelationManager.upgradeRelationManager &&
					upgradeBranchName.upgradeBranchName &&
					upgradeCategory.upgradeCategory &&
					upgradeReason.upgradeReason
				) {
					if (upgradeReason.upgradeReason === 'O') {
						if (otherUpgradeReason) {
							setRequired(false);
							handleUpgradeOk(upgradeFormData, setDisabled);
						} else {
							setRequired(true);
						}
					} else {
						setRequired(false);
						handleUpgradeOk(upgradeFormData, setDisabled);
					}
				} else {
					setRequired(true);
					// handleEndorseOk(otherAssignReason);
				}
			};
			return (
				<>
					<div className='modal-header'>
						<div className='header-icon'>
							<FontAwesomeIcon icon={faArrowCircleUp} />
						</div>
						<div className='header-title'>Upgrade</div>
					</div>
					<div className='modal-body'>
						Are you sure you want to Upgrade selected
						{selectedRowKeys.length > 1
							? ` ${selectedRowKeys.length} `
							: selectedRowKeys.length === 1 && ' '}
						Client{selectedRowKeys.length > 1 ? 's' : ' '}?
						<Form name='assign-leads-form' className='assign-leads-form'>
							<div id='upgradeCategory' className='field-section' style={{ marginTop: '1rem' }}>
								<label className='field-label' htmlFor='upgradeCategory'>
									Category
								</label>
								<Form.Item name='upgradeCategory'>
									<Select
										size='large'
										mode='single'
										placeholder='Select Category'
										onChange={(value) => handleUpgradeCategoryChange('upgradeCategory', value)}
										filterOption={(input, opt) => {
											return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
										}}
										showSearch
									>
										{/* {categoryUpgradeDropdownValues.map( */}
										{controlStructure?.Category?.dropDownValue.map((option) => (
											<Select.Option key={option.dataValue} value={option.dataValue}>
												{option.displayValue}
											</Select.Option>
										))}
									</Select>
								</Form.Item>
								<label className='field-label' htmlFor='upgradeBranchName'>
									Office
								</label>
								<Form.Item name='upgradeBranchName'>
									<Select
										size='large'
										mode='single'
										placeholder='Select Office Name'
										onChange={(value) => handleUpgradeBranchChange('upgradeBranchName', value)}
										value={upgradeBranchName}
										filterOption={(input, opt) => {
											return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
										}}
										showSearch
									>
										{controlStructure?.Branch?.lookupValue.lookUpValues.map((option) => (
											<Select.Option key={option.Unit_Hierarchy} value={option.Unit_Hierarchy}>
												{option.NAME}
											</Select.Option>
										))}
									</Select>
								</Form.Item>
								<label className='field-label' htmlFor='upgradeRelationManager'>
									Relationship Manager
								</label>
								<Form.Item name='upgradeRelationManager'>
									<Select
										size='large'
										mode='single'
										placeholder='Select Relation Name'
										onChange={(value) => handleUpgradeRMChange('upgradeRelationManager', value)}
										value={upgradeRelationManager}
										filterOption={(input, opt) => {
											return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
										}}
										showSearch
									>
										{/* {rmForDowngrade?.lookUpValues.map(
                      (option) => (
                        <Select.Option key={option.user_id} value={option.user_id}>
                          {option.user_name}
                        </Select.Option>
                      )
                    )} */}
										{controlStructure?.RelationshipManager?.lookupValue.lookUpValues.map(
											(option) => (
												<Select.Option key={option.ID} value={option.ID}>
													{option.Name}
												</Select.Option>
											)
										)}
									</Select>
								</Form.Item>
								<label className='field-label' htmlFor='upgradeReason'>
									Reason
								</label>
								<Form.Item name='upgradeReason'>
									<Select
										size='large'
										mode='single'
										placeholder='Select Reason'
										onChange={(value) => handleUpgradeReasonChange('upgradeReason', value)}
										value={upgradeReason}
										filterOption={(input, opt) => {
											return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
										}}
										showSearch
									>
										{controlStructure?.UpgradeReason?.dropDownValue.map((option) => (
											<Select.Option key={option.dataValue} value={option.dataValue}>
												{option.displayValue}
											</Select.Option>
										))}
									</Select>
								</Form.Item>
								{upgradeReason.upgradeReason ? (
									<Form.Item>
										<Input
											maxLength={20}
											onChange={(evt) => handleOtherUpgradeReasonChange(evt)}
											size='large'
											value={otherUpgradeReason}
											placeholder={'Enter Reason'}
											max={20}
										/>
									</Form.Item>
								) : (
									''
								)}
								{required && (
									<Form.Item>
										<Alert
											//style={{ marginBottom: "15px" }}
											message='All fields are Mandatory'
											type='error'
											closable
										/>
									</Form.Item>
								)}
							</div>
						</Form>
					</div>
					<div className='modal-footer2'>
						<Button
							className='text-only-btn'
							key='back'
							type='text'
							disabled={disabled}
							onClick={() => {
								cancelOperation('upgrade');
							}}
						>
							Cancel
						</Button>
						<Button
							className='submit-btn2'
							key='submit'
							type='primary'
							disabled={disabled}
							style={{ fontSize: '28px' }}
							onClick={onUpgrade}
						>
							Upgrade
						</Button>
					</div>
				</>
			);
		};
		return (
			<CustomModal
				handleCancel={() => {
					closeModal('upgrade');
				}}
				handleOk={handleUpgradeOk}
				visible={showUpgradeModal}
			>
				{upgradeFailedArray === 'emptyArray' ? (
					<UpgradeScreen />
				) : upgradeFailedArray.length === 0 ? (
					<ActionSuccessModalScreen operationName='upgrade' />
				) : (
					<ActionFailModalScreen errorArray={upgradeFailedArray} operationName='upgrade' />
				)}
			</CustomModal>
		);
	};

	const RenderDowngradeModal = () => {
		const DowngradeScreen = () => {
			const [downGradeReason, setDownGradeReason] = useState('');
			const [downGradeRelationManager, setDownGradeRelationManager] = useState('');
			const [downGradeBranchName, setDownGradeBranchName] = useState('');
			const [downGradeCategory, setDownGradeCategory] = useState('');
			const [otherDownGradeReason, setOtherDownGradeReason] = useState('');
			const [required, setRequired] = useState(false);
			const [disabled, setDisabled] = useState(false);
			const handleDownGradeReasonChange = (key, value) => {
				setRequired(false);
				setDownGradeReason({ [key]: value });
				setOtherDownGradeReason('');
			};
			const handleDownGradeBranchChange = (key, value) => {
				setDownGradeBranchName({ [key]: value });
			};
			const handleDownGradeRMChange = (key, value) => {
				setDownGradeRelationManager({ [key]: value });
			};
			const handleDownGradeCategoryChange = (key, value) => {
				setDownGradeCategory({ [key]: value });
			};
			const handleOtherDownGradeReasonChange = (e) => {
				// if (downGradeReason.downGradeReason==="O") {

				setOtherDownGradeReason(e.target.value);
				setRequired(false);
				// }
			};
			const onDownGrade = () => {
				let downGradeFormData = {
					category: downGradeCategory.downGradeCategory,
					branch: downGradeBranchName.downGradeBranchName,
					relationshipManager: downGradeRelationManager.downGradeRelationManager,
					reason: downGradeReason.downGradeReason,
					otherReason: otherDownGradeReason
				};

				if (
					downGradeRelationManager.downGradeRelationManager &&
					downGradeBranchName.downGradeBranchName &&
					downGradeCategory.downGradeCategory &&
					downGradeReason.downGradeReason
				) {
					if (downGradeReason.downGradeReason === 'O') {
						if (otherDownGradeReason) {
							//  console.log("other....",otherDownGradeReason)
							setRequired(false);
							handleDowngradeOk(downGradeFormData, setDisabled);
						} else {
							setRequired(true);
						}
					} else {
						setRequired(false);
						handleDowngradeOk(downGradeFormData, setDisabled);
					}
				} else {
					setRequired(true);
				}
			};
			return (
				<>
					<div className='modal-header'>
						<div className='header-icon'>
							<FontAwesomeIcon icon={faArrowCircleDown} />
						</div>
						<div className='header-title'>Downgrade</div>
					</div>
					<div className='modal-body'>
						Are you sure you want to Downgrade selected
						{selectedRowKeys.length > 1
							? ` ${selectedRowKeys.length} `
							: selectedRowKeys.length === 1 && ' '}
						Client{selectedRowKeys.length > 1 ? 's' : ' '}?
						<Form name='assign-leads-form' className='assign-leads-form'>
							<div id='downGradeCategory' className='field-section' style={{ marginTop: '1rem' }}>
								<label className='field-label' htmlFor='downGradeCategory1'>
									Category
								</label>
								<Form.Item name='downGradeCategory1'>
									<Select
										size='large'
										mode='single'
										placeholder='Select Category'
										onChange={(value) => handleDownGradeCategoryChange('downGradeCategory', value)}
										filterOption={(input, opt) => {
											return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
										}}
										showSearch
									>
										{/* {categoryDropdownValues.map( */}
										{controlStructure?.Category?.dropDownValue.map((option) => (
											<Select.Option key={option.dataValue} value={option.dataValue}>
												{option.displayValue}
											</Select.Option>
										))}
									</Select>
								</Form.Item>
								<label className='field-label' htmlFor='downGradeBranchName'>
									Office
								</label>
								<Form.Item name='downGradeBranchName'>
									<Select
										size='large'
										mode='single'
										placeholder='Select Office Name'
										onChange={(value) => handleDownGradeBranchChange('downGradeBranchName', value)}
										value={downGradeBranchName}
										filterOption={(input, opt) => {
											return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
										}}
										showSearch
									>
										{controlStructure?.Branch?.lookupValue.lookUpValues.map((option) => (
											<Select.Option key={option.Unit_Hierarchy} value={option.Unit_Hierarchy}>
												{option.NAME}
											</Select.Option>
										))}
									</Select>
								</Form.Item>
								<label className='field-label' htmlFor='downGradeRelationManager'>
									Relationship Manager
								</label>
								<Form.Item name='downGradeRelationManager'>
									<Select
										size='large'
										mode='single'
										placeholder='Select Relation Name'
										onChange={(value) => handleDownGradeRMChange('downGradeRelationManager', value)}
										value={downGradeRelationManager}
										filterOption={(input, opt) => {
											return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
										}}
										showSearch
									>
										{/* {rmForDowngrade?.lookUpValues.map(
                      (option) => (
                        <Select.Option key={option.user_id} value={option.user_id}>
                          {option.user_name}
                        </Select.Option>
                      )
                    )} */}
										{controlStructure?.RelationshipManager?.lookupValue.lookUpValues.map(
											(option) => (
												<Select.Option key={option.ID} value={option.ID}>
													{option.Name}
												</Select.Option>
											)
										)}
									</Select>
								</Form.Item>
								<label className='field-label' htmlFor='downGradeReason'>
									Reason
								</label>
								<Form.Item name='downGradeReason'>
									<Select
										size='large'
										mode='single'
										placeholder='Select Reason'
										onChange={(value) => handleDownGradeReasonChange('downGradeReason', value)}
										value={downGradeReason}
										filterOption={(input, opt) => {
											return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
										}}
										showSearch
									>
										{controlStructure?.DowngradeReason?.dropDownValue.map((option) => (
											<Select.Option key={option.dataValue} value={option.dataValue}>
												{option.displayValue}
											</Select.Option>
										))}
									</Select>
								</Form.Item>
								{downGradeReason.downGradeReason ? (
									<Form.Item name='otherDownGradeReason'>
										<Input
											maxLength={20}
											onChange={(evt) => handleOtherDownGradeReasonChange(evt)}
											size='large'
											value={otherDownGradeReason}
											placeholder={'Enter Reason'}
										/>
									</Form.Item>
								) : (
									''
								)}
								{required && (
									<Form.Item>
										<Alert
											//style={{ marginBottom: "15px" }}
											message='All fields are Mandatory'
											type='error'
											closable
										/>
									</Form.Item>
								)}
							</div>
						</Form>
					</div>
					<div className='modal-footer2'>
						<Button
							className='text-only-btn'
							key='back'
							type='text'
							disabled={disabled}
							onClick={() => {
								cancelOperation('downgrade');
							}}
						>
							Cancel
						</Button>
						<Button
							className='submit-btn2'
							key='submit'
							type='primary'
							style={{ fontSize: '28px' }}
							disabled={disabled}
							onClick={onDownGrade}
						>
							Downgrade
						</Button>
					</div>
				</>
			);
		};
		return (
			<CustomModal
				handleCancel={() => {
					closeModal('downgrade');
				}}
				handleOk={handleDowngradeOk}
				visible={showDowngradeModal}
			>
				{downgradeFailedArray === 'emptyArray' ? (
					<DowngradeScreen />
				) : downgradeFailedArray.length === 0 ? (
					<ActionSuccessModalScreen operationName='downgrade' />
				) : (
					<ActionFailModalScreen errorArray={downgradeFailedArray} operationName='downgrade' />
				)}
			</CustomModal>
		);
	};
	return (
		<div className='myCustomer-listing-container'>
			<Spin spinning={loading}>
				{!miniMode && (
					<>
						{/* <RenderConfirmEndorseModal /> */}
						{/* <RenderUpgradeModal /> */}
						<RenderConfirmEndorseModal />
						<RenderUpgradeModal />
						<RenderDowngradeModal />
						<RenderTopBar />
						<RenderFiltersPanel />
					</>
				)}
				<AccountsModal
					show={accountsModalShow}
					setShow={(val) => setAccountsModalShow(val)}
					data={customerAccounts}
				/>
				{!cardViewMode ? (
					<CustomerTable
						onCellDefault={onCellDefault}
						onCellFavourite={onCellFavourite}
						loading={loading}
						selectedRows={selectedRows}
						setSelectedRows={setSelectedRows}
						selectedRowKeys={selectedRowKeys}
						setSelectedRowKeys={setSelectedRowKeys}
						// tableData={localCustomerData}
						onProfileSelect={(selectedRows) => onProfileSelect(selectedRows)}
						tableData={miniMode ? miniComponentData.tableData : localCustomerData}
						miniMode={miniMode}
						setShowUpgradeModal={setShowUpgradeModal}
						setShowEndorseModal={setShowEndorseModal}
						setShowDowngradeModal={setShowDowngradeModal}
						authorizeCode={authorizeCode}
						// onClickEdit={onClickEdit}
					/>
				) : (
					<CustomerCard
						data={localCustomerData}
						setLocalCustomerData={setLocalCustomerData}
						onCellFavourite={onCellFavourite}
						loading={loading}
						setLoading={setLoading}
						selectedRows={selectedRows}
						setSelectedRows={setSelectedRows}
						selectedRowKeys={selectedRowKeys}
						setSelectedRowKeys={setSelectedRowKeys}
						setShowDowngradeModal={setShowDowngradeModal}
						setShowUpgradeModal={setShowUpgradeModal}
						setShowEndorseModal={setShowEndorseModal}
						authorizeCode={authorizeCode}
					/>
				)}
				{!miniMode && localCustomerData && <BackToTop />}
			</Spin>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		customerListingCs: state.customerListing.controlStructure,
		allCustomersData:
			state.customerListing &&
			state.customerListing.allCustomers &&
			state.customerListing.allCustomers.lstCustomerResponseModel,
		rowsCount:
			state.customerListing &&
			state.customerListing.allCustomers &&
			state.customerListing.allCustomers.rowCount,
		leftPanel: state.dashboard.leftPanel
	};
};
const mapDispatchToProps = {
	executeGetCustomerListingCs,
	executeGetAllCustomersData
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerListingScreen);
