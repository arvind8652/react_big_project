import { Button, Form, Input, Select, Tag, DatePicker } from 'antd';
import { useState } from 'react';
let dropDownSize =
	window?.screen?.width < 1200 ? 'small' : window?.screen?.width < 1500 ? 'middle' : 'large';
const DocumentManagerFilter = ({
	form,
	filterCs,
	activeTab,
	formData,
	toggleDrawer,
	onFinish,
	onValuesChange,
	setFilterFormData,
	advancedFilter,
	controlStructure,
	setFormData
}) => {
	const [reset, setReset] = useState(1);
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
		<Form
			// form={form}
			layout='vertical'
			name='filter-form'
			className='filter-form'
			style={{ width: '100%' }}
			initialValues={formData}
			onFinish={onFinish}
			onValuesChange={onValuesChange}
			key={reset}
		>
			<div id='clientName' className='field-section'>
				<Form.Item label='Search' name='clientName'>
					<Input
						size={dropDownSize}
						className='field'
						type='text'
						value={formData.clientName}
						placeholder='Search by Client/Account name/ Order Name'
					/>
				</Form.Item>
			</div>
			<div id='applicability' className='field-section'>
				<Form.Item name='applicability' label='Applicability'>
					<Select
						className='filter-dropdown'
						size={dropDownSize}
						mode='multiple'
						tagRender={tagRender}
						placeholder='Select Applicability'
						value={formData.applicability}
						filterOption={(input, opt) => {
							return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
						}}
						showSearch
						showArrow
					>
						{advancedFilter.applicablityFilters.map((option) => (
							<Select.Option key={option.id} value={option.applicablity}>
								{option.applicablity}
							</Select.Option>
						))}
					</Select>
				</Form.Item>
			</div>
			<div id='documentType' className='field-section'>
				<Form.Item name='documentType' label='Document Type'>
					<Select
						className='filter-dropdown'
						size={dropDownSize}
						mode='multiple'
						tagRender={tagRender}
						placeholder='Select Document Type'
						value={formData.documentType}
						filterOption={(input, opt) => {
							return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
						}}
						showSearch
						showArrow
					>
						{advancedFilter.documentTypeFilters.map((option) => (
							<Select.Option key={option.id} value={option.documentType}>
								{option.documentType}
							</Select.Option>
						))}
					</Select>
				</Form.Item>
			</div>
			<div id='documentPurpose' className='field-section'>
				<Form.Item name='documentPurpose' label='Document Purpose'>
					<Select
						className='filter-dropdown'
						size={dropDownSize}
						mode='multiple'
						tagRender={tagRender}
						placeholder='Select Document Purpose'
						value={formData.documentPurpose}
						filterOption={(input, opt) => {
							return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
						}}
						showSearch
						showArrow
					>
						{advancedFilter.documentPurposeFilters.map((option) => (
							<Select.Option key={option.id} value={option.documentPurpose}>
								{option.documentPurpose}
							</Select.Option>
						))}
					</Select>
				</Form.Item>
			</div>
			{/* {activeTab === "0" ? ( */}
			<div id='status' className='field-section'>
				<Form.Item name='status' label='Status'>
					<Select
						className='filter-dropdown'
						size={dropDownSize}
						mode='multiple'
						tagRender={tagRender}
						placeholder='Select Status'
						value={formData.statuss}
						filterOption={(input, opt) => {
							return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
						}}
						showSearch
						showArrow
					>
						{controlStructure.csList[1].controlStructureField[1].dropDownValue.map((option) => (
							<Select.Option key={option.dataValue} value={option.dataValue}>
								{option.displayValue}
							</Select.Option>
						))}
					</Select>
				</Form.Item>
			</div>
			{/* ) : null} */}

			<div id='documentName' className='field-section'>
				<Form.Item label='Document Name' name='documentName'>
					<Input
						size={dropDownSize}
						className='field'
						type='text'
						value={formData.documentName}
						placeholder='Search by Document Name'
					/>
				</Form.Item>
			</div>
			<div id='submissionDate' className='field-section'>
				<Form.Item name='submissionDate' label='Submission Date'>
					<DatePicker allowClear={false} size={dropDownSize} format='DD-MM-YYYY' />
				</Form.Item>
			</div>
			<div id='expiryDate' className='field-section'>
				<Form.Item name='expiryDate' label='Expiry Date'>
					<DatePicker allowClear={false} size={dropDownSize} format='DD-MM-YYYY' />
				</Form.Item>
			</div>
			<div id='actionDate' className='field-section' style={{ marginBottom: '20%' }}>
				<Form.Item name='actionDate' label='Action Date'>
					<DatePicker allowClear={false} size={dropDownSize} format='DD-MM-YYYY' />
				</Form.Item>
			</div>
			<div className='form-btn' style={{ position: 'relative', bottom: '20px', float: 'right' }}>
				<Button
					type='text'
					onClick={() => {
						setReset(reset + 1);
						setFormData({
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
						// toggleDrawer();
					}}
					className='text-only-btn'
				>
					Reset
				</Button>
				<Button type='primary' htmlType='submit' className='submit-btn'>
					Apply
				</Button>
			</div>
		</Form>
	);
};

export default DocumentManagerFilter;
