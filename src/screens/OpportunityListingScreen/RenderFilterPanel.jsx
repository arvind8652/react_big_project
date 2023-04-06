import {
	faArrowAltToBottom,
	faFilter,
	faThLarge,
	faThList,
	faTrashAlt,
	faWindowClose
} from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Drawer, Menu, Form, Select } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import OpportunityListingFilterForm from '../../components/Forms/OpportunityListingFilterForm/OpportunityListingFilterForm';
import {
	currencyFormatter,
	exportJSON,
	generateCsObject,
	JSONToCSVConvertor
} from '../../utils/utils';

const RenderFiltersPanel = ({ props }) => {
	const {
		executeGetOpportunityListingCs,
		executeGetAllOpportunityData,
		opportunityListingCs,
		allOpportunityData,
		miniComponentData,
		miniMode
	} = props;
	const [showDrawer, setShowDrawer] = useState(false);
	const [selectedRows, setSelectedRows] = useState([]);
	const [filterBy, setFilterBy] = useState('Show All');
	const [sortBy, setSortBy] = useState('Probability (High to Low)');

	const toggleDrawer = () => {
		setShowDrawer(!showDrawer);
	};
	const [loading, setLoading] = useState();
	const [cardViewMode, setCardViewMode] = useState(false);
	const [selectedRowKeys, setSelectedRowKeys] = useState([]);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showUpdateStageModal, setShowUpdateStageModal] = useState(false);
	const [localOpportunityData, setLocalOpportunityData] = useState(
		(miniMode && miniComponentData.tableData) || allOpportunityData
	);
	const [filterFormData, setFilterFormData] = useState({
		searchName: undefined,
		tagName: undefined,
		stage: undefined,
		type: undefined,
		targetAmountRange: undefined,
		ddrRange: undefined
	});
	const [opportunityStageData, setOpportunityStageData] = useState({
		recordId: undefined,
		status: undefined,
		stage: undefined,
		probability: undefined,
		preferredCurrency: undefined,
		closureAmount: undefined,
		closureDate: undefined,
		reason: undefined,
		remark: undefined
	});
	const controlStructure =
		opportunityListingCs && generateCsObject(opportunityListingCs[0].controlStructureField);

	const onAdvancedFilterSubmit = (filterData) => {
		setFilterFormData(filterData);
		setFilterBy('Show All');
		setSortBy('Probability (High to Low)');
	};
	const toggleCardViewMode = () => {
		setCardViewMode(!cardViewMode);
		sessionStorage.setItem('cardViewMode', !cardViewMode);
	};

	const RenderDropdown = ({ mode, onSelect }) => {
		let options = [];
		if (mode === 'filter') {
			options = [
				{ label: 'Show All', value: 'Show All' },
				{ label: 'Favourites', value: 'Favourites' },
				{ label: 'Open Only', value: 'Open Only' },
				{ label: 'High Probability', value: 'High Probability' },
				{ label: 'Recently Created', value: 'Recently Created' },
				{ label: 'Recently Modified', value: 'Recently Modified' },
				{ label: 'Due in 7 Days', value: 'Due in 7 Days' },
				{ label: 'Due in 15 Days', value: 'Due in 15 Days' },
				{ label: 'Due in 30 Days', value: 'Due in 30 Days' }
			];
		} else if (mode === 'sort') {
			options = [
				{ label: 'Due Date (Near to Far)', value: 'Due Date (Near to Far)' },
				{ label: 'Due Date (Far to Near)', value: 'Due Date (Far to Near)' },
				{
					label: 'Probability (Low to High)',
					value: 'Probability (Low to High)'
				},
				{
					label: 'Probability (High to Low)',
					value: 'Probability (High to Low)'
				},
				{
					label: 'Target Value (Low to High)',
					value: 'Target Value (Low to High)'
				},
				{
					label: 'Target Value (High to Low)',
					value: 'Target Value (High to Low)'
				},
				{ label: 'Recently Created', value: 'Recently Created' },
				{ label: 'Recently Modified', value: 'Recently Modified' }
			];
		}
		const menu = (
			<Menu>
				{options.map((item) => (
					<div
						onClick={() => {
							setLoading(true);
							onSelect(item.value);
						}}
					>
						{item.label}
					</div>
				))}
			</Menu>
		);
		return (
			<div style={{ position: 'relative' }}>
				{/* <div className="dropdown-prefix">
              {mode.charAt(0).toUpperCase() + mode.substring(1)}:
            </div> */}
				{/* <Dropdown
              className={"filter-sort-dropdown " + mode}
              overlay={menu}
              overlayClassName="fs-dropdown"
              trigger={["click"]}
            >
              <Button>
                {mode === "filter" ? "Filter: " + filterBy : "Sort: " + sortBy}
                <FontAwesomeIcon icon={faChevronDown} />
              </Button>
            </Dropdown> */}
				<div className='dropdown-prefix'>{mode.charAt(0).toUpperCase() + mode.substring(1)}:</div>
				<Select
					className={'filter-sort-dropdown ' + mode}
					size='large'
					// defaultValue={mode === "filter" ? "Show All" : "Recently Modified"}
					onSelect={onSelect}
					value={mode === 'filter' ? filterBy : sortBy}
					showArrow
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
	const onFilterSelect = (value) => {
		// filter operation
		let filteredOpportunityList;

		switch (value) {
			case 'Show All':
				filteredOpportunityList = allOpportunityData;

				break;
			case 'Favourites':
				filteredOpportunityList = allOpportunityData.filter((item) => item.isFavourite);
				break;
			case 'Open Only':
				filteredOpportunityList = allOpportunityData.filter((item) => item.isOpen);
				break;
			case 'High Probability':
				break;
			case 'Recently Created':
				filteredOpportunityList = allOpportunityData.filter((item) => {
					const now = moment();
					const dueDate = moment(item.dueDate);
					return item.version === 1;
				});
				break;
			case 'Recently Modified':
				filteredOpportunityList = allOpportunityData.filter((item) => {
					const now = moment();
					const dueDate = moment(item.dueDate);
					return item.version > 1;
				});
				break;
			case 'Due in 7 Days':
				filteredOpportunityList = allOpportunityData.filter((item) => item.dueDays <= 7);
				break;
			case 'Due in 15 Days':
				filteredOpportunityList = allOpportunityData.filter((item) => item.dueDays <= 15);
				break;
			case 'Due in 30 Days':
				filteredOpportunityList = allOpportunityData.filter((item) => item.dueDays <= 30);
				break;
			default:
				break;
		}
		if (filteredOpportunityList) {
			setFilterBy(value);
			setLocalOpportunityData(filteredOpportunityList);
		} else {
			setLocalOpportunityData(allOpportunityData);
		}
		setLoading(false);
	};

	const RenderAdvancedFilterDrawer = ({
		showDrawer,
		toggleDrawer,
		filterCs,
		onAdvFilterSubmit
	}) => {
		const [form] = Form.useForm();
		const [filterCount, setFilterCount] = useState(0);
		const [filterFormData, setFilterFormData] = useState({
			searchName: undefined,
			tagName: undefined,
			stage: undefined,
			type: undefined,
			targetAmountRange: undefined,
			ddrRange: undefined
		});
		const [formData, setFormData] = useState({
			searchName: filterFormData.searchName || undefined,
			tagName: filterFormData.tagName || undefined,
			stage: filterFormData.stage || undefined,
			type: filterFormData.type || undefined,
			targetAmountRange: filterFormData.targetAmountRange || undefined,
			ddrRange: filterFormData.ddrRange || undefined
		});

		useEffect(() => {
			const formDataKeys = Object.keys(formData);
			setFilterCount(
				formDataKeys.filter((item) => formData[item] !== undefined && formData[item].length > 0)
					.length
			);
		}, [formData]);
		const onValuesChange = (values) => {
			if (values.targetAmountRange) {
				if (values.targetAmountRange[0] < values.targetAmountRange[1]) {
					setFormData({
						...formData,
						targetAmountRange: values.targetAmountRange,
						targetAmountMin: values.targetAmountRange[0],
						targetAmountMax: values.targetAmountRange[1]
					});
				}
				form.setFieldsValue({
					targetAmountRange: values.targetAmountRange,
					targetAmountMin: values.targetAmountRange[0],
					targetAmountMax: values.targetAmountRange[1]
				});
			} else if (values.targetAmountMin) {
				if (formData.targetAmountMax > values.targetAmountMin) {
					setFormData({
						...formData,
						targetAmountMin: values.targetAmountMin,
						targetAmountRange: [values.targetAmountMin, formData.targetAmountRange[1]]
					});
					form.setFieldsValue({
						targetAmountMin: values.targetAmountMin,
						targetAmountRange: [values.targetAmountMin, formData.targetAmountMax]
					});
				}
			} else if (values.targetAmountMax) {
				if (formData.targetAmountMin < values.targetAmountMax) {
					setFormData({
						...formData,
						targetAmountMax: values.targetAmountMax,
						targetAmountRange: [formData.targetAmountRange[0], values.targetAmountMax]
					});
					form.setFieldsValue({
						targetAmountMax: values.targetAmountMax,
						targetAmountRange: [formData.targetAmountMin, values.targetAmountMax]
					});
				}
			} else if (values.ddrRange) {
				setFormData({
					ddrRange: values.ddrRange.map((date) => moment(date).toISOString())
				});
			} else {
				setFormData({ ...formData, ...values });
			}
		};
		return (
			<Drawer
				width={'26vw'}
				className='oppor-list-advanced-filter-drawer-container'
				visible={showDrawer}
				onClose={toggleDrawer}
				closable
			>
				<div className='header'>
					<div className='title'>Filter</div>
					<div className='subtitle'>
						{filterCount === 0 ? 'No' : filterCount} tag
						{filterCount > 1 && 's '}
					</div>
				</div>

				<OpportunityListingFilterForm
					form={form}
					filterCs={filterCs}
					formData={formData}
					toggleDrawer={toggleDrawer}
					onFinish={onAdvFilterSubmit}
					onValuesChange={onValuesChange}
					setFilterFormData={setFilterFormData}
					setFormData={setFormData}
				/>
			</Drawer>
		);
	};

	const downloadRecords = () => {
		const downloadData =
			selectedRows && selectedRows.length > 0
				? selectedRows.map((opp, index) => ({
						'Sr.No': index + 1,
						Opportunity: opp.opportunityName,
						Currency: opp.currencySymbol,
						Target: opp.targetAmount,
						'Due Date': moment(opp.dueDate).format('DD-MMM-YYYY'),
						Stage: opp.stage,
						'Client/Prospect Name': opp.clientProspectName,
						Type: opp.refType === 'PROSPECTADD' ? 'Prospect' : 'Client'
				  }))
				: localOpportunityData.map((opp, index) => ({
						'Sr.No': index + 1,
						Opportunity: opp.opportunityName,
						Currency: opp.currencySymbol,
						Target: opp.targetAmount,
						'Due Date': moment(opp.dueDate).format('DD-MMM-YYYY'),
						Stage: opp.stage,
						'Client/Prospect Name': opp.clientProspectName,
						Type: opp.refType === 'PROSPECTADD' ? 'Prospect' : 'Client'
				  }));
		exportJSON(downloadData, 'opportunity');
	};

	const onSortSelect = (value) => {
		// sort operation
		let sortedOpportunityList;
		switch (value) {
			case 'Due Date (Near to Far)':
				sortedOpportunityList = [...localOpportunityData].sort((a, b) => {
					return new Date(a.dueDate) - new Date(b.dueDate);
				});
				break;
			case 'Due Date (Far to Near)':
				sortedOpportunityList = [...localOpportunityData].sort((a, b) => {
					return new Date(b.dueDate) - new Date(a.dueDate);
				});
				break;
			case 'Probability (Low to High)':
				sortedOpportunityList = [...localOpportunityData].sort((a, b) => {
					return a.probability - b.probability;
				});
				break;
			case 'Probability (High to Low)':
				sortedOpportunityList = [...localOpportunityData].sort((a, b) => {
					return b.probability - a.probability;
				});
				break;
			case 'Target Value (Low to High)':
				sortedOpportunityList = [...localOpportunityData].sort((a, b) => {
					return a.amount - b.amount;
				});
				break;
			case 'Target Value (High to Low)':
				sortedOpportunityList = [...localOpportunityData].sort((a, b) => {
					return b.amount - a.amount;
				});
				break;
			case 'Recently Created':
				let oppListVersion1 = localOpportunityData.filter((item) => item.version === 1);
				let oppListVersion2 = localOpportunityData.filter((item) => item.version === 2);
				oppListVersion1 = oppListVersion1.sort((a, b) => {
					const aTimestamp = moment(a.inputDateTime);
					const bTimestamp = moment(b.inputDateTime);
					return bTimestamp.diff(aTimestamp);
				});
				oppListVersion2 = oppListVersion2.sort((a, b) => {
					const aTimestamp = moment(a.inputDateTime);
					const bTimestamp = moment(b.inputDateTime);
					return bTimestamp.diff(aTimestamp);
				});
				sortedOpportunityList = [...oppListVersion1, ...oppListVersion2];
				break;
			case 'Recently Modified':
				sortedOpportunityList = [...localOpportunityData].sort((a, b) => {
					const aTimestamp = moment(a.inputDateTime);
					const bTimestamp = moment(b.inputDateTime);
					return bTimestamp.diff(aTimestamp);
				});
				break;
			default:
				break;
		}

		if (sortedOpportunityList) {
			setSortBy(value);
			setLocalOpportunityData(sortedOpportunityList);
		} else {
			setLocalOpportunityData(allOpportunityData);
		}
		setLoading(false);
	};

	return (
		<div className='filters-panel'>
			<div className='left'>
				<FontAwesomeIcon
					icon={faWindowClose}
					className={selectedRowKeys.length === 0 ? 'disabled-icon' : 'icon'}
					onClick={() => {
						selectedRowKeys.length > 0 &&
							setOpportunityStageData({
								...opportunityStageData,
								recordId: selectedRowKeys,
								status: 'CLOSE',
								stage: 'LOSS'
							});
						selectedRowKeys.length > 0 && setShowUpdateStageModal(true);
					}}
				/>
				<FontAwesomeIcon
					icon={faTrashAlt}
					className={selectedRowKeys.length === 0 ? 'disabled-icon' : 'icon'}
					onClick={() => selectedRowKeys.length > 0 && setShowDeleteModal(true)}
				/>
			</div>
			<RenderDropdown mode='filter' onSelect={onFilterSelect} />
			<RenderDropdown mode='sort' onSelect={onSortSelect} />
			<div className='right'>
				<FontAwesomeIcon
					icon={faFilter}
					className={loading ? 'disabled-icon' : 'icon'}
					onClick={() => {
						toggleDrawer();
					}}
				/>
				<FontAwesomeIcon
					icon={faArrowAltToBottom}
					className={loading ? 'disabled-icon' : 'icon'}
					onClick={() => {
						downloadRecords();
					}}
				/>
				<FontAwesomeIcon
					icon={cardViewMode ? faThList : faThLarge}
					className={loading ? 'disabled-icon' : 'icon'}
					onClick={() => {
						toggleCardViewMode();
					}}
				/>
			</div>

			<RenderAdvancedFilterDrawer
				showDrawer={showDrawer}
				toggleDrawer={toggleDrawer}
				onAdvFilterSubmit={onAdvancedFilterSubmit}
				filterCs={controlStructure}
			/>
		</div>
	);
};

export default RenderFiltersPanel;
