import React, { useState, useEffect } from 'react';
import { Row, Select, Badge, Button, Tabs, Form, Drawer } from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';
import TopBarHeader from '../../components/TopBarHeader/TopBarHeader';
import DocumentTable from '../../components/DocumentTable/DocumentTable';
import {
	documentManagerAllApi,
	documentManagerDetailsData,
	getDependentData
} from '../../redux/actions/documentManagerAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faArrowAltToBottom } from '@fortawesome/pro-solid-svg-icons';
import DocumentManagerFilter from './DocumentManagerFilter';
import { docViewUploadObj, tabs } from './DocConstant';
import './DocumentManagerStyle.scss';
import DocumentManagerDetails from './DocumentManagerDetails';
import { exportJSON, getDateFormat } from '../../utils/utils';
import CustomModal from '../../components/Modal/CustomModal/CustomModal';
import { isForOfStatement } from '@babel/types';

const { TabPane } = Tabs;
let dropDownSize =
	window?.screen?.width < 1200 ? 'small' : window?.screen?.width < 1500 ? 'middle' : 'large';
const DocumentManagerScreen = (props) => {
	const { documentManagerDetailsList, advancedFilter, controlStructure, dependentData, leftPanel } =
		props;
	const [activeTab, setActiveTab] = useState('0');
	const [filterBy, setFilterBy] = useState('Show All');
	const [sortBy, setSortBy] = useState('Recently Modified (Near to Far)');
	const [loading, setLoading] = useState(true);
	const [documentManagerList, setDocumentManagerList] = useState([]);
	const [isAdvanceFilterApplied, setAdvanceFiltreApplied] = useState(false);
	const [selectedRow, setSelectedRow] = useState({});
	const [isModalVisible, setModalVisible] = useState(false);
	const [docTab, setDocTab] = useState(tabs);
	const [rowSelection, setRowSelection] = useState([]);
	const [showSuccessFailureDeleteModal, setShowSuccessFailureDeleteModal] = useState(false);
	const [authorizeCode, setAuthorizeCode] = useState('');
	const [filterFormData, setFilterFormData] = useState({
		clientName: undefined,
		applicability: undefined,
		documentType: undefined,
		documentPurpose: undefined,
		documentName: undefined,
		submissionDate: undefined,
		expiryDate: undefined,
		actionDate: undefined,
		status: undefined
	});
	const styleSet = {
		cardStyle: {
			margin: '12px 0px',
			borderBottom: '1px solid'
		}
	};
	useEffect(() => {
		leftPanel &&
			leftPanel.subMenu.map((subMenu) => {
				if (subMenu.subMenuId == 'DOCUMENTS') setAuthorizeCode(subMenu.authorizeCode);
			});
	}, [selectedRow]);
	// leftPanel && leftPanel.subMenu.map(subMenu => {
	//     if (subMenu.subMenuId == 'DOCUMENTS')
	//     setAuthorizeCode(subMenu.authorizeCode);
	//   });

	const resetAdvanceFilter = () => {
		setFilterFormData({
			clientName: undefined,
			applicability: undefined,
			documentType: undefined,
			documentPurpose: undefined,
			documentName: undefined,
			submissionDate: undefined,
			expiryDate: undefined,
			actionDate: undefined
		});
	};

	const handleTabChange = (key) => {
		if (isAdvanceFilterApplied) {
			setAdvanceFiltreApplied(false);
			resetAdvanceFilter();
		}
		setActiveTab(key);
		setFilterBy('Show All');
		setSortBy('Recently Modified (Near to Far)');
	};

	useEffect(() => {
		getDocData();
	}, []);

	useEffect(() => {
		setDocumentManagerList(documentManagerDetailsList);
		calculateTypeCount();
	}, [documentManagerDetailsList]);
	const getDocData = async () => {
		setLoading(true);
		await documentManagerAllApi();
		let resp = await documentManagerDetailsData();
		await calculateTypeCount();
		setLoading(resp);
	};

	const calculateTypeCount = () => {
		let tab = docTab.map((ele) => {
			if (ele.status === 'A') {
				ele.count =
					documentManagerDetailsList && documentManagerDetailsList.length > 0
						? documentManagerDetailsList.length
						: 0;
			} else if (ele.status === 'E') {
				ele.count =
					documentManagerDetailsList && documentManagerDetailsList.length > 0
						? documentManagerDetailsList.filter((item) => item?.isExpired === true).length
						: 0;
			} else if (ele.status === 'U') {
				ele.count =
					documentManagerDetailsList && documentManagerDetailsList.length > 0
						? documentManagerDetailsList.filter(
								(item) => item?.isExpired === false && item.documentStatus === ele.status
						  ).length
						: 0;
			} else {
				ele.count =
					documentManagerDetailsList && documentManagerDetailsList.length > 0
						? documentManagerDetailsList.filter((item) => item.documentStatus === ele.status).length
						: 0;
			}
			return ele;
		});
		setDocTab(tab);
	};
	const downloadRecords = () => {
		let docList = rowSelection.length > 0 ? rowSelection : documentManagerList;
		const downloadData = docList.map((ele, index) => ({
			'Sr.No': index + 1,
			'Client Name': ele.clientName,
			'Client Category': ele.clientCategory,
			Type: ele.documentTypeName,
			'Document Name': ele.documentName,
			'Document Status':
				ele.documentStatus === 'P'
					? 'Pending'
					: // : ele.documentStatus === "U" && ele.isExpired=== false
					ele.documentStatus === 'U' && ele.isExpired === false
					? 'Submitted'
					: ele.documentStatus === 'D'
					? 'Deferred'
					: // : ele.documentStatus === "E"
					ele.isExpired === true
					? 'Expired'
					: '',

			Date:
				// ele.documentStatus === "U"
				ele.documentStatus === 'U' && ele.isExpired === false
					? moment(ele.submissionDate).format(getDateFormat())
					: ele.documentStatus === 'D'
					? moment(ele.actionDate).format(getDateFormat())
					: // : ele.documentStatus === "E"
					ele.isExpired === true
					? moment(ele.expiryDate).format(getDateFormat())
					: '-',
			'Submission Date': moment(ele.submissionDate).format(getDateFormat()),
			'Action Date': moment(ele.actionDate).format(getDateFormat()),
			'Expiry Date': moment(ele.expiryDate).format(getDateFormat()),
			'Account Name': ele.accountName && ele.accountName.length > 0 ? ele.accountName : '-',
			'Account Nature': ele.accountNature && ele.accountNature.length > 0 ? ele.accountNature : '-'
		}));
		exportJSON(downloadData, 'document');
	};

	useEffect(() => {
		if (activeTab === '0') {
			setDocumentManagerList(documentManagerDetailsList);
		}
		if (activeTab === '1') {
			setDocumentManagerList(
				documentManagerDetailsList.filter((item) => item.documentStatus === 'P')
			);
		}
		if (activeTab === '2') {
			setDocumentManagerList(
				documentManagerDetailsList.filter(
					(item) => item.documentStatus === 'U' && item.isExpired === false
				)
			);
		}
		if (activeTab === '3') {
			setDocumentManagerList(
				documentManagerDetailsList.filter((item) => item.documentStatus === 'D')
			);
		}
		if (activeTab === '4') {
			setDocumentManagerList(
				// documentManagerDetailsList.filter((item) => item.documentStatus === "E")
				documentManagerDetailsList.filter((item) => item.isExpired === true)
			);
		}
	}, [activeTab]);
	useEffect(() => {
		if (!isAdvanceFilterApplied) {
			if (
				documentManagerDetailsList.length > 0 &&
				activeTab === '0' &&
				documentManagerList.length !== documentManagerDetailsList.length
			) {
				// setDocumentManagerList(documentManagerDetailsList);
			}
		}
	}, [documentManagerDetailsList, activeTab, documentManagerList]);

	const filterRecords = (filterData) => {
		let filteredOpportunityData = documentManagerDetailsList;
		if (filterData.clientName) {
			filteredOpportunityData = filteredOpportunityData.filter(
				(record) =>
					(record.clientName &&
						record.clientName !== null &&
						record.clientName.toLowerCase().includes(filterData.clientName.toLowerCase())) ||
					(record.orderCartId &&
						record.orderCartId !== null &&
						record.orderCartId.toLowerCase().includes(filterData.clientName.toLowerCase()))
			);
		}
		if (filterData.applicability && filterData.applicability.length > 0) {
			filteredOpportunityData = filteredOpportunityData.filter((record) => {
				return (
					record.applicableForName &&
					record.applicableForName !== null &&
					filterData.applicability.includes(record.applicableForName)
				);
			});
		}
		if (filterData.documentType && filterData.documentType.length > 0) {
			filteredOpportunityData = filteredOpportunityData.filter(
				(record) =>
					record.documentTypeName &&
					record.documentTypeName !== null &&
					filterData.documentType.includes(record.documentTypeName)
			);
		}
		if (filterData.documentPurpose && filterData.documentPurpose.length > 0) {
			filteredOpportunityData = filteredOpportunityData.filter((record) => {
				return (
					record.purpose &&
					record.purpose !== null &&
					filterData.documentPurpose.includes(record.purpose)
				);
			});
		}
		if (filterData.status && filterData.status.length > 0) {
			filteredOpportunityData = filteredOpportunityData.filter((record) => {
				return (
					record.documentStatus &&
					record.documentStatus !== null &&
					filterData.status.includes(record.documentStatus)
				);
			});
		}
		if (filterData.documentName) {
			filteredOpportunityData = filteredOpportunityData.filter(
				(record) =>
					record.documentName &&
					record.documentName !== null &&
					record.documentName.toLowerCase().includes(filterData.documentName.toLowerCase())
			);
		}
		if (filterData.expiryDate) {
			let expDate = moment(filterData.expiryDate).format('YYYY-MM-DD');
			filteredOpportunityData = filteredOpportunityData.filter(
				(record) =>
					record.expiryDate &&
					record.expiryDate !== null &&
					moment(expDate).isSame(moment(record.expiryDate).format('YYYY-MM-DD'))
				// record.expiryDate.split("T")[0] === filterData.expiryDate
			);
		}
		if (filterData.submissionDate) {
			let subDate = moment(filterData.submissionDate).format('YYYY-MM-DD');
			filteredOpportunityData = filteredOpportunityData.filter(
				(record) =>
					record.submissionDate &&
					record.submissionDate !== null &&
					moment(subDate).isSame(moment(record.submissionDate).format('YYYY-MM-DD'))
				// record.submissionDate.split("T")[0] === filterData.submissionDate
			);
		}
		if (filterData.actionDate) {
			let actDate = moment(filterData.actionDate).format('YYYY-MM-DD');
			filteredOpportunityData = filteredOpportunityData.filter(
				(record) =>
					record.actionDate &&
					record.actionDate !== null &&
					moment(actDate).isSame(moment(record.actionDate).format('YYYY-MM-DD'))
				// record.actionDate.split("T")[0] === filterData.actionDate
			);
		}
		setDocumentManagerList(filteredOpportunityData);
	};

	useEffect(() => {
		filterRecords(filterFormData);
	}, [filterFormData]);

	const RenderAdvancedFilterDrawer = ({
		showDrawer,
		toggleDrawer,
		filterCs,
		onAdvFilterSubmit,
		setFilterCount
	}) => {
		const [form] = Form.useForm();
		const [formData, setFormData] = useState({
			clientName: filterFormData.clientName || undefined,
			applicability: filterFormData.applicability || undefined,
			documentType: filterFormData.documentType || undefined,
			documentName: filterFormData.documentName || undefined,
			documentPurpose: filterFormData.documentPurpose || undefined,
			submissionDate: filterFormData.submissionDate || undefined,
			expiryDate: filterFormData.expiryDate || undefined,
			actionDate: filterFormData.actionDate || undefined,
			status: filterFormData.status || undefined
		});

		useEffect(() => {
			const formDataKeys = Object.keys(formData);
			setFilterCount(
				formDataKeys.filter((item) => formData[item] !== undefined && formData[item].length > 0)
					.length
			);
		}, [formData]);

		useEffect(() => {
			if (activeTab == 1) {
				formData.status = ['P'];
			}
			if (activeTab == 2) {
				formData.status = ['U'];
			}
			if (activeTab == 3) {
				formData.status = ['D'];
			}
			if (activeTab == 4) {
				formData.status = ['E'];
			}
		}, [activeTab]);
		const onValuesChange = (values) => {
			if (values.submissionDate) {
				setFormData({
					submissionDate: moment(values.submissionDate).format('YYYY-MM-DD')
				});
			} else if (values.expiryDate) {
				setFormData({
					expiryDate: moment(values.expiryDate).format('YYYY-MM-DD')
				});
			} else if (values.actionDate) {
				setFormData({
					actionDate: moment(values.actionDate).format('YYYY-MM-DD')
				});
			} else {
				setFormData({ ...formData, ...values });
			}
		};

		return (
			<Drawer
				width={'26vw'}
				className='documentManager-list-advanced-filter-drawer-container'
				visible={showDrawer}
				onClose={toggleDrawer}
				closable
			>
				<div className='header'>
					<DocumentManagerFilter
						form={form}
						filterCs={filterCs}
						formData={formData}
						activeTab={activeTab}
						controlStructure={controlStructure}
						toggleDrawer={toggleDrawer}
						onFinish={onAdvFilterSubmit}
						advancedFilter={advancedFilter}
						onValuesChange={onValuesChange}
						setFilterFormData={setFilterFormData}
						setFormData={setFormData}
					/>
				</div>
			</Drawer>
		);
	};

	const onRowSeletect = async (data) => {
		let res = await getDependentData(data.documentsetupId);
		let updatedDoc = docViewUploadObj(data);
		if (res.status === 200) {
			setModalVisible(true);
			setSelectedRow(updatedDoc);
		}
	};

	const onRowSelections = (data) => {
		setRowSelection(data);
	};
	const RenderFiltersPanel = () => {
		const [showDrawer, setShowDrawer] = useState(false);
		const [filterCount, setFilterCount] = useState(0);
		const toggleDrawer = () => {
			setShowDrawer(!showDrawer);
		};
		const onAdvancedFilterSubmit = (filterData) => {
			setFilterFormData(filterData);
			setFilterBy('Show All');
			setSortBy('Recently Modified (Near to Far)');
			setAdvanceFiltreApplied(true);
		};

		return (
			<div className='filters-panel'>
				<div className='left'></div>

				<RenderDropdown mode='filter' onSelect={onFilterSelect} />
				<RenderDropdown mode='sort' onSelect={onSortSelect} />
				<div className='right'>
					{/* <div className="icon-filter-wrapper"> */}
					<FontAwesomeIcon
						icon={faFilter}
						className={loading ? 'disabled-icon' : 'icon'}
						onClick={() => {
							toggleDrawer();
						}}
					/>
					{filterCount > 0 && <span class='filter-badge'></span>}
					{/* </div> */}
					<FontAwesomeIcon
						icon={faArrowAltToBottom}
						className={loading ? 'disabled-icon' : 'icon'}
						onClick={() => {
							downloadRecords();
						}}
					/>
				</div>

				<RenderAdvancedFilterDrawer
					showDrawer={showDrawer}
					toggleDrawer={toggleDrawer}
					onAdvFilterSubmit={onAdvancedFilterSubmit}
					setFilterCount={setFilterCount}
					// filterCs={controlStructure}
				/>
			</div>
		);
	};
	const handleOk = () => {
		setModalVisible(false);
		setShowSuccessFailureDeleteModal(true);
	};
	const handleCancel = () => {
		setModalVisible(false);
		setSelectedRow({});
	};

	const handleSuccessFailureDeleteModalOk = async () => {
		setShowSuccessFailureDeleteModal(false);
		getDocData();
		setActiveTab('0');
	};

	const RenderSuccessFailureDeleteModal = () => {
		return (
			<CustomModal
				visible={showSuccessFailureDeleteModal}
				handleOk={handleSuccessFailureDeleteModalOk}
			>
				<div className='modal-header' style={{ display: 'flex', alignItems: 'center' }}></div>
				<div className='modal-body'>{'Document status updated successfully.'}</div>
				<div className='modal-footer'>
					<Button
						className='submit-btn'
						key='submit'
						type='primary'
						onClick={handleSuccessFailureDeleteModalOk}
					>
						OK
					</Button>
				</div>
			</CustomModal>
		);
	};

	const DocumentDetailsModal = () => {
		return (
			<DocumentManagerDetails
				selectedRow={selectedRow}
				isModalVisible={isModalVisible}
				handleOk={handleOk}
				handleCancel={handleCancel}
				controlStructure={controlStructure}
				dependentData={dependentData}
				authorizeCode={authorizeCode}
			/>
		);
	};
	const onFilterSelect = (value, displayValue) => {
		// filter operation
		// setValueFiltered(true);
		var today = moment().format('YYYY-MM-DD');
		let filteredDocList;
		switch (value) {
			case 'SHOWALL':
				filteredDocList = documentManagerDetailsList;
				break;
			case 'DUE15DAYS':
				var next15date = moment().add(15, 'days').format('YYYY-MM-DD');
				filteredDocList = documentManagerDetailsList.filter((item) => {
					var actDate = moment(item.actionDate).format('YYYY-MM-DD');
					var expDate = moment(item.expiryDate).format('YYYY-MM-DD');
					if (item.actionDate) {
						return moment(actDate).isBetween(today, next15date, null, '()');
					} else if (item.expiryDate) {
						return moment(expDate).isBetween(today, next15date, null, '()');
					}
				});
				break;
			case 'DUE30DAYS':
				var next30date = moment().add(30, 'days').format('YYYY-MM-DD');
				filteredDocList = documentManagerDetailsList.filter((item) => {
					var actDate = moment(item.actionDate).format('YYYY-MM-DD');
					var expDate = moment(item.expiryDate).format('YYYY-MM-DD');
					if (item.actionDate) {
						return moment(actDate).isBetween(today, next30date, null, '()');
					} else if (item.expiryDate) {
						return moment(expDate).isBetween(today, next30date, null, '()');
					}
				});
				break;
			case 'DUE7DAYS':
				var next7date = moment().add(7, 'days').format('YYYY-MM-DD');
				filteredDocList = documentManagerDetailsList.filter((item) => {
					var actDate = moment(item.actionDate).format('YYYY-MM-DD');
					var expDate = moment(item.expiryDate).format('YYYY-MM-DD');
					if (item.actionDate) {
						return moment(actDate).isBetween(today, next7date, null, '()');
					} else if (item.expiryDate) {
						return moment(expDate).isBetween(today, next7date, null, '()');
					}
				});
				break;
			case 'OVERDUE':
				filteredDocList = documentManagerDetailsList.filter((item) => {
					var actDate = moment(item.actionDate).format('YYYY-MM-DD');
					var expDate = moment(item.expiryDate).format('YYYY-MM-DD');
					if (item.actionDate) {
						return moment(actDate).isBefore(today);
					} else if (item.expiryDate) {
						return moment(expDate).isBefore(today);
					}
				});
			default:
				break;
		}
		if (filteredDocList) {
			setFilterBy(displayValue.displayValue);
			setDocumentManagerList(filteredDocList);
		} else {
			setDocumentManagerList(documentManagerList);
		}
		setLoading(false);
	};
	const onSortSelect = (value, displayValue) => {
		// sort operation
		// setValueFiltered(false);
		let sortedOpportunityList;
		switch (value) {
			case 'ACTDATENTOF':
				sortedOpportunityList = [...documentManagerList].sort((a, b) => {
					return new Date(b.inputDateTime) - new Date(a.inputDateTime);
				});
				break;
			case 'ACTDATEFTON':
				sortedOpportunityList = [...documentManagerList].sort((a, b) => {
					return new Date(a.inputDateTime) - new Date(b.inputDateTime);
				});
				break;
			case 'EXPDATENTOF':
				sortedOpportunityList = [...documentManagerList].sort((a, b) => {
					return new Date(b.expiryDate) - new Date(a.expiryDate);
				});
				break;
			case 'EXPDATENFTON':
				sortedOpportunityList = [...documentManagerList].sort((a, b) => {
					return new Date(a.expiryDate) - new Date(b.expiryDate);
				});
				break;
			case 'RECMODNTOF':
				sortedOpportunityList = [...documentManagerList].sort((a, b) => {
					return new Date(b.inputDateTime) - new Date(a.inputDateTime);
				});
				break;
			case 'RECMODFTON':
				sortedOpportunityList = [...documentManagerList].sort((a, b) => {
					return new Date(a.inputDateTime) - new Date(b.inputDateTime);
				});
				break;
			case 'SUBDATENTOF':
				sortedOpportunityList = [...documentManagerList].sort((a, b) => {
					return new Date(b.submissionDate) - new Date(a.submissionDate);
				});
				break;
			case 'SUBDATEFTON':
				sortedOpportunityList = [...documentManagerList].sort((a, b) => {
					return new Date(a.submissionDate) - new Date(b.submissionDate);
				});
				break;
			default:
				break;
		}

		if (sortedOpportunityList) {
			setSortBy(displayValue.displayValue);
			setDocumentManagerList(sortedOpportunityList);
		} else {
			setDocumentManagerList(documentManagerList);
		}
		setLoading(false);
	};
	const RenderDropdown = ({ mode, onSelect }) => {
		let options = [];
		if (mode === 'filter') {
			options =
				controlStructure && controlStructure.csList.length > 0
					? controlStructure.csList[0].controlStructureField[0].dropDownValue
					: [];
		} else if (mode === 'sort') {
			options =
				controlStructure && controlStructure.csList.length > 0
					? controlStructure.csList[0].controlStructureField[1].dropDownValue
					: [];
		}

		return (
			<div style={{ position: 'relative' }}>
				<Select
					className={'filter-sort-dropdown ' + mode}
					size={dropDownSize}
					placeholder={mode === 'filter' ? 'Filter: ' + filterBy : 'Sort: ' + sortBy}
					onSelect={onSelect}
					showArrow
				>
					{options &&
						options.map((option, index) => (
							<Select.Option
								key={index}
								value={option.dataValue}
								displayValue={option.displayValue}
							>
								{option.displayValue}
							</Select.Option>
						))}
				</Select>
			</div>
		);
	};

	return (
		// <div className="lead-listing-container">
		<div className='documentManagerScreen-listing-container'>
			<TopBarHeader headerName={'Document Manager'} navigationLink={'MyLead/leadCreate'} />
			<Row style={styleSet.cardStyle}>
				<Tabs activeKey={activeTab} onChange={handleTabChange}>
					{docTab.map((tab, index) => {
						return (
							<TabPane
								tab={
									<div>
										{tab.title}
										<span style={{ marginLeft: '10px' }}>
											<Badge showZero={true} count={tab.count} overflowCount={tab.count} />
										</span>
									</div>
								}
								key={index}
							/>
						);
					})}
				</Tabs>
				<hr />
			</Row>
			<RenderFiltersPanel />
			<DocumentTable
				loading={loading}
				onRowSeletect={onRowSeletect}
				allLeadData={documentManagerList}
				onRowSelection={onRowSelections}
			/>
			{isModalVisible ? <DocumentDetailsModal /> : ''}
			<RenderSuccessFailureDeleteModal />
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		documentManagerDetailsList: state.documentManager.documentManagerDetails,
		advancedFilter: state.documentManager.advancedFilter,
		controlStructure: state.documentManager.controlStructure,
		dependentData: state.documentManager.dependentData,
		leftPanel: state.dashboard.leftPanelBottomNav
	};
};

export default connect(mapStateToProps)(DocumentManagerScreen);
