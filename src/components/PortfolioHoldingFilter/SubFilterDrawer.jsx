import React, { useEffect, useState } from 'react';
import { Avatar, Button, Table, Form, Input, Drawer, Select, Tag, Popover } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faArrowCircleUp,
	faEllipsisHAlt,
	faPlus,
	faSnowflake,
	faTrashAlt,
	faUserPlus
} from '@fortawesome/pro-light-svg-icons';
import { faFilter, faArrowAltToBottom, faThLarge } from '@fortawesome/pro-solid-svg-icons';
import { faChevronLeft } from '@fortawesome/pro-regular-svg-icons';
import { faHotjar } from '@fortawesome/free-brands-svg-icons';
import { connect } from 'react-redux';
import { NavLink, useHistory, useRouteMatch } from 'react-router-dom';
import {
	executeGetLeadListingCs,
	executeGetAllLeadsData
} from '../../redux/actions/leadListingActions';
import { exportJSON, generateCsObject } from '../../utils/utils';
import {
	upgradeSelectedLeadsApi,
	deleteSelectedLeadsApi,
	assignSelectedLeadsApi
} from '../../api/leadListingApi';
import CustomModal from '../../components/Modal/CustomModal/CustomModal';
import { assets } from '../../constants/assetPaths';
import '../../screens/LeadListingScreen/LeadListingScreen.scss';
import '../../styles/common.scss';
import { ScAvatarProfileInitialText } from '../../components/StyledComponents/genericElements';
import ListingTable from '../../components/ListingTable/ListingTable';
import TopBarHeader from '../../components/TopBarHeader/TopBarHeader';

const SubFilterDrawer = ({
	showDrawer,
	toggleDrawer,
	filterCs,
	onAdvFilterSubmit,
	filtersData,
	setIsFilterApplied
}) => {
	const [filterCount, setFilterCount] = useState(0);
	const [filterFormData, setFilterFormData] = useState({
		firstName: filtersData.firstName || undefined,
		category: filtersData.category || undefined,
		type: filtersData.type || undefined,
		source: filtersData.source || undefined,
		relationshipManager: filtersData.relationshipManager || undefined,
		branch: filtersData.branch || undefined,
		interestLevel: filtersData.interestLevel || undefined
	});
	useEffect(() => {
		const formDataKeys = Object.keys(filterFormData);
		setFilterCount(
			formDataKeys.filter(
				(item) => filterFormData[item] !== undefined && filterFormData[item].length > 0
			).length
		);
	}, [filterFormData]);
	useEffect(() => {
		filterCount > 0 ? setIsFilterApplied(true) : setIsFilterApplied(false);
	}, [filterCount]);
	const [form] = Form.useForm();
	const onValuesChange = (values) => {
		setFilterFormData({ ...filterFormData, ...values });
	};
	const tagRender = (props) => {
		const { label, value, closable, onClose } = props;
		return (
			<Tag
				className='filter-tag'
				color='#5D6DD1'
				closable={closable}
				onClose={onClose}
				style={{ marginRight: 3 }}
			>
				{label}
			</Tag>
		);
	};
	return (
		<Drawer
			width={'26vw'}
			className='lead-list-advanced-filter-drawer-container'
			visible={showDrawer}
			onClose={toggleDrawer}
			closable
		>
			<div className='header'>
				<div className='title'>Filter</div>
				<div className='subtitle'>
					{filterCount === 0 ? 'No' : filterCount} tag{filterCount > 0 && 's '} added
				</div>
			</div>

			<Form
				form={form}
				name='filter-form'
				className='filter-form'
				initialValues={filterFormData}
				onFinish={onAdvFilterSubmit}
				onValuesChange={onValuesChange}
			>
				<div id='firstName' className='field-section'>
					<label className='field-label' htmlFor='firstName'>
						Search
					</label>
					<Form.Item name='firstName'>
						<Input
							className='field'
							type='text'
							value={filterFormData.firstName}
							placeholder='Search by client/ prospect name'
							suffix={<FontAwesomeIcon icon={faUserPlus} style={{ margin: '0 0 0 auto' }} />}
						/>
					</Form.Item>
				</div>
				<div id='category' className='field-section'>
					<label className='field-label' htmlFor='category'>
						Units
					</label>
					<Form.Item name='category'>
						<Select
							className='filter-dropdown'
							size='large'
							mode='multiple'
							tagRender={tagRender}
							placeholder='Select option'
							value={filterFormData.category}
							filterOption={(input, opt) => {
								return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
							}}
							showSearch
							showArrow
						>
							{/* {filterCs.Category.dropDownValue.map((option) => (
                                <Select.Option key={option.dataValue} value={option.dataValue}>
                                    {option.displayValue}
                                </Select.Option>
                            ))} */}
						</Select>
					</Form.Item>
				</div>
				<div id='type' className='field-section'>
					<label className='field-label' htmlFor='type'>
						Book Value
					</label>
					<Form.Item name='type'>
						<Select
							className='filter-dropdown'
							size='large'
							mode='multiple'
							tagRender={tagRender}
							placeholder='Select option'
							value={filterFormData.type}
							filterOption={(input, opt) => {
								return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
							}}
							showSearch
							showArrow
						>
							{/* {filterCs.Type.dropDownValue.map((option) => (
                <Select.Option key={option.dataValue} value={option.dataValue}>
                  {option.displayValue}
                </Select.Option>
              ))} */}
						</Select>
					</Form.Item>
				</div>
				<div id='source' className='field-section'>
					<label className='field-label' htmlFor='source'>
						Income
					</label>
					<Form.Item name='source'>
						<Select
							className='filter-dropdown'
							size='large'
							mode='multiple'
							tagRender={(e) => tagRender(e)}
							placeholder='Select option'
							value={filterFormData.source}
							filterOption={(input, opt) => {
								return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
							}}
							showSearch
							showArrow
						>
							{/* {filterCs.Source.dropDownValue.map((option) => (
                <Select.Option key={option.dataValue} value={option.dataValue}>
                  {option.displayValue}
                </Select.Option>
              ))} */}
						</Select>
					</Form.Item>
				</div>
				<div id='relationshipManager' className='field-section'>
					<label className='field-label' htmlFor='relationshipManager'>
						Market Values
					</label>
					<Form.Item name='relationshipManager'>
						<Select
							className='filter-dropdown'
							size='large'
							mode='multiple'
							tagRender={tagRender}
							placeholder='Search by Market Values'
							value={filterFormData.relationshipManager}
							filterOption={(input, opt) => {
								return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
							}}
							showSearch
						>
							{/* {filterCs.RelationshipManager.lookupValue.lookUpValues.map(
                (option) => (
                  <Select.Option key={option.ID} value={option.ID}>
                    {option.Name}
                  </Select.Option>
                )
              )} */}
						</Select>
					</Form.Item>
				</div>
				<div id='branch' className='field-section'>
					<label className='field-label' htmlFor='branch'>
						Accounts
					</label>
					<Form.Item name='branch'>
						<Select
							className='filter-dropdown'
							size='large'
							mode='multiple'
							tagRender={tagRender}
							placeholder='Search by Account'
							value={filterFormData.branch}
							filterOption={(input, opt) => {
								return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
							}}
							showSearch
						>
							{/* {filterCs.Region.dropDownValue.map((option) => (
                <Select.Option key={option.dataValue} value={option.dataValue}>
                  {option.displayValue}
                </Select.Option>
              ))} */}
						</Select>
					</Form.Item>
				</div>
				{/* <div id="interestLevel" className="field-section">
                    <label className="field-label" htmlFor="interestLevel">
                        Interest level
                    </label>
                    <Form.Item name="interestLevel">
                        <Select
                            className="filter-dropdown"
                            size="large"
                            mode="multiple"
                            tagRender={(e) => tagRender(e)}
                            placeholder="Select option"
                            value={filterFormData.interestLevel}
                            filterOption={(input, opt) => {
                                return (
                                    opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                );
                            }}
                            showSearch
                            showArrow
                        >
                            {filterCs.InterestLevel.dropDownValue.map((option) => (
                <Select.Option key={option.dataValue} value={option.dataValue}>
                  {option.displayValue}
                </Select.Option>
              ))}
                        </Select>
                    </Form.Item>
                </div> */}

				{/*  */}
				<div className='form-btn'>
					<Button
						type='text'
						htmlType='submit'
						// className="text-only-btn"
						className='cancel-btn'
						onClick={() => {
							setFilterFormData({
								firstName: undefined,
								category: undefined,
								type: undefined,
								source: undefined,
								relationshipManager: undefined,
								branch: undefined,
								interestLevel: undefined
							});
							form.setFieldsValue({
								firstName: undefined,
								category: undefined,
								type: undefined,
								source: undefined,
								relationshipManager: undefined,
								branch: undefined,
								interestLevel: undefined
							});
						}}
					>
						Reset
					</Button>
					<Button type='primary' htmlType='submit' className='submit-btn'>
						Apply
					</Button>
				</div>
			</Form>
		</Drawer>
	);
};

export default SubFilterDrawer;
