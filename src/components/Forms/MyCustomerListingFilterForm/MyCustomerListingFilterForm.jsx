import { fal, faUserPlus } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Form, Input, Select, Slider, Tag, Checkbox } from 'antd';
import { useEffect } from 'react';
import { useState } from 'react';
import { ScInputNumber, ScRangePicker } from '../../StyledComponents/formElements';

const MyCustomerListingFilterForm = ({
	form,
	filterCs,
	formData,
	toggleDrawer,
	onFinish,
	onValuesChange,
	setFilterFormData,
	setIsFilterApplied,
	setFormData
}) => {
	const [reset, setReset] = useState(1);

	const changeVal = (name, val) => {
		switch (name) {
			case 'aumAmountMin':
				form.setFieldsValue({
					aumAmountRange: [val, formData.aumAmountMax]
				});
				break;
			case 'aumAmountMax':
				form.setFieldsValue({
					aumAmountRange: [formData.aumAmountMin, val]
				});
				break;
			case 'aumAmountRange':
				form.setFieldsValue({
					aumAmountMin: val[0],
					aumAmountMax: val[1]
				});
				break;

			default:
				break;
		}
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
		<Form
			form={form}
			layout='vertical'
			name='filter-form'
			className='filter-form'
			initialValues={formData}
			onFinish={onFinish}
			onValuesChange={onValuesChange}
			key={reset}
		>
			<div id='name' className='field-section'>
				<Form.Item label='Search' name='name'>
					<Input
						className='field'
						type='text'
						value={formData.name}
						placeholder='Search by client/ prospect name'
						suffix={<FontAwesomeIcon icon={faUserPlus} style={{ margin: '0 0 0 auto' }} />}
					/>
				</Form.Item>
			</div>

			<div id='type' className='field-section'>
				<Form.Item name='type' label='Type'>
					<Select
						className='filter-dropdown'
						size='large'
						mode='multiple'
						tagRender={tagRender}
						placeholder='Select option'
						value={formData.type}
						filterOption={(input, opt) => {
							return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
						}}
						showSearch
						showArrow
					>
						{filterCs &&
							filterCs.Type &&
							filterCs.Type.dropDownValue.map((option) => (
								<Select.Option key={option.dataValue} value={option.displayValue}>
									{option.displayValue}
								</Select.Option>
							))}
					</Select>
				</Form.Item>
			</div>

			<div id='category' className='field-section'>
				<Form.Item name='category' label='Category'>
					<Select
						className='filter-dropdown'
						size='large'
						mode='multiple'
						tagRender={tagRender}
						placeholder='Select option'
						value={formData.category}
						filterOption={(input, opt) => {
							return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
						}}
						showSearch
						showArrow
					>
						{filterCs &&
							filterCs.Category &&
							filterCs.Category.dropDownValue.map((option) => (
								<Select.Option key={option.dataValue} value={option.displayValue}>
									{option.displayValue}
								</Select.Option>
							))}
					</Select>
				</Form.Item>
			</div>

			<div id='source' className='field-section'>
				<Form.Item name='source' label='Source'>
					<Select
						className='filter-dropdown'
						size='large'
						mode='multiple'
						tagRender={(e) => tagRender(e)}
						placeholder='Select option'
						value={formData.source}
						filterOption={(input, opt) => {
							return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
						}}
						showSearch
						showArrow
					>
						{filterCs &&
							filterCs.Source &&
							filterCs.Source.dropDownValue.map((option) => (
								<Select.Option key={option.dataValue} value={option.displayValue}>
									{option.displayValue}
								</Select.Option>
							))}
					</Select>
				</Form.Item>
			</div>

			<div id='branch' className='field-section'>
				<Form.Item name='branch' label='Office'>
					<Select
						className='filter-dropdown'
						size='large'
						mode='multiple'
						tagRender={tagRender}
						placeholder='Search by Office'
						value={formData.branch}
						filterOption={(input, opt) => {
							return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
						}}
						showSearch
					>
						{filterCs &&
							filterCs.Branch &&
							filterCs.Branch.lookupValue &&
							filterCs.Branch.lookupValue.lookUpValues.map((option) => (
								<Select.Option key={option.Unit_Hierarchy} value={option.Unit_Hierarchy}>
									{option.NAME}
								</Select.Option>
							))}
					</Select>
				</Form.Item>
			</div>

			<div id='aumAmountRange' className='field-section'>
				<Form.Item label='AUM Amount' name='aumAmountRange'>
					<Slider
						className='amount-range-slider'
						min={0}
						max={1000000000}
						range={true}
						value={formData.aumAmountRange}
						onChange={(val) => {
							changeVal('aumAmountRange', val);
						}}
					/>
				</Form.Item>
				<div className='target-range-input-fields'>
					<Form.Item name='aumAmountMin'>
						<ScInputNumber
							min={0}
							onChange={(val) => {
								changeVal('aumAmountMin', val);
							}}
						/>
					</Form.Item>
					<span className='range-span'> to </span>
					<Form.Item
						name='aumAmountMax'
						dependencies={['aumAmountMin']}
						rules={[
							({ getFieldValue }) => ({
								validator(_, value) {
									if (getFieldValue('aumAmountMin') > value) {
										return Promise.reject(new Error('Value should be greater than minimum amount'));
									}
									return Promise.resolve();
								}
							})
						]}
						validateTrigger={['onChange', 'onBlur']}
					>
						<ScInputNumber
							min={0}
							onChange={(val) => {
								changeVal('aumAmountMax', val);
							}}
						/>
					</Form.Item>
				</div>
			</div>

			<div id='relationshipManager' className='field-section'>
				<Form.Item name='relationshipManager' label='Relationship Manager'>
					<Select
						className='filter-dropdown'
						size='large'
						mode='multiple'
						tagRender={tagRender}
						placeholder='Search by relationship manager name'
						value={formData.relationshipManager}
						filterOption={(input, opt) => {
							return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
						}}
						showSearch
					>
						{filterCs &&
							filterCs.RelationshipManager &&
							filterCs.RelationshipManager.lookupValue.lookUpValues.map((option) => (
								<Select.Option key={option.ID} value={option.Name}>
									{option.Name}
								</Select.Option>
							))}
					</Select>
				</Form.Item>
			</div>

			{/* <div id="revenueAmountRange" className="field-section">
        <Form.Item label="Revenue Amount" name="revenueAmountRange">
          <Slider
            className="amount-range-slider"
            min={0}
            max={10000000}
            range={true}
            value={formData.revenueAmountRange}
          />
        </Form.Item>
        <div className="target-range-input-fields">
          <Form.Item name="revenueAmountMin">
            <ScInputNumber
              min={0}
            />
          </Form.Item>
          <span className="range-span"> to </span>
          <Form.Item name="revenueAmountMax">
            <ScInputNumber
              min={0}
            />
          </Form.Item>
        </div>
      </div> */}

			{/* <div id="investibleCashRange" className="field-section">
        <Form.Item label="Investible Cash" name="investibleCashRange">
          <Slider
            className="amount-range-slider"
            min={0}
            max={900000000}
            range={true}
            value={formData.investibleCashRange}
          />
        </Form.Item>
        <div className="target-range-input-fields">
          <Form.Item name="investibleCashMin">
            <ScInputNumber
              min={0}
            />
          </Form.Item>
          <span className="range-span"> to </span>
          <Form.Item name="investibleCashMax">
            <ScInputNumber
              min={0}
            />
          </Form.Item>
        </div>
      </div> */}

			<div id='riskProfile' className='field-section'>
				<Form.Item name='riskProfile' label='Risk Profile'>
					<Select
						className='filter-dropdown'
						size='large'
						mode='multiple'
						tagRender={tagRender}
						placeholder='Search by risk profile'
						value={formData.riskProfile}
						filterOption={(input, opt) => {
							return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
						}}
						showSearch
					>
						{filterCs &&
							filterCs.Category_Name &&
							filterCs.Category_Name.dropDownValue.map((option) => (
								<Select.Option key={option.dataValue} value={option.displayValue}>
									{option.displayValue}
								</Select.Option>
							))}
					</Select>
				</Form.Item>
			</div>

			{/* <div className='form-btn'> */}
			<div style={{ position: 'relative', paddingTop: '50px' }}>
				<div style={{ position: 'absolute', bottom: '10px', right: '0px' }}>
					<Button
						type='text'
						onClick={() => {
							setReset(reset + 1);
							setFormData({
								name: undefined,
								category: undefined,
								type: undefined,
								source: undefined,
								relationshipManager: undefined,
								branch: undefined,
								aumAmountRange: undefined,
								revenueAmountRange: undefined,
								investibleCashRange: undefined,
								riskProfile: undefined
							});
							setFilterFormData({});
							setIsFilterApplied(false);
							//  toggleDrawer();
						}}
						className='cancel-btn'
					>
						Reset
					</Button>
					<Button type='primary' htmlType='submit' className='submit-btn'>
						Apply
					</Button>
				</div>
			</div>
		</Form>
	);
};

export default MyCustomerListingFilterForm;
