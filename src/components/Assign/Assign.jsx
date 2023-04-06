import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCheck } from '@fortawesome/pro-light-svg-icons';
import { Button, Form, Input, Select, Alert, Result } from 'antd';
import { ScButtonPrimary, ScButtonText } from '../StyledComponents/genericElements';

const Assign = ({
	formData,
	setFormData,
	selectedRowKeys,
	cs,
	onAssign,
	cancelModal,
	required
}) => {
	const [form] = Form.useForm();
	// handle change form data
	const onValuesChange = (values) => {
		if (values.assignRelationManager) {
			const reManager = cs?.RelationshipManager?.lookupValue?.lookUpValues.find((item) => {
				return item.ID === values.assignRelationManager;
			});
			setFormData((prevData) => {
				return { ...prevData, ...values, assignBranchName: reManager ? reManager.Branch : '' };
			});
		} else if (values.reason) {
			setFormData((prevData) => {
				return { ...prevData, ...values, oReason: '' };
			});
		} else {
			setFormData((prevData) => {
				return { ...prevData, ...values };
			});
		}
	};
	// handle other reason
	const handleOtherReason = (e) => {
		setFormData({ ...formData, oReason: e.target.value });
	};
	useEffect(() => {
		form.setFieldsValue(formData);
	}, [formData]);

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
				Prospect{selectedRowKeys.length > 1 ? 's' : ' '}?
				<Form
					name='assign-leads-form'
					className='assign-leads-form'
					form={form}
					initialValues={formData}
					onValuesChange={onValuesChange}
				>
					<div id='assignCategory' className='field-section' style={{ marginTop: '1rem' }}>
						<label className='field-label' htmlFor='assignRelationManager'>
							Relationship Manager
						</label>
						<Form.Item name='assignRelationManager'>
							<Select
								size='large'
								mode='single'
								placeholder='Select Relation Name'
								value={formData.assignRelationManager}
								filterOption={(input, opt) => {
									return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
								}}
								showSearch
							>
								{cs?.RelationshipManager?.lookupValue.lookUpValues.map((option) => (
									<Select.Option key={option.ID} value={option.ID}>
										{option.Name}
									</Select.Option>
								))}
							</Select>
						</Form.Item>
						<label className='field-label' htmlFor='assignBranchName'>
							Office
						</label>
						<Form.Item name='assignBranchName'>
							<Select
								size='large'
								mode='single'
								placeholder='Select Office Name'
								value={formData.assignBranchName}
								filterOption={(input, opt) => {
									return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
								}}
								disabled={true}
								showSearch
							>
								{cs?.Branch?.lookupValue.lookUpValues.map((option) => (
									<Select.Option key={option.Unit_Hierarchy} value={option.Unit_Hierarchy}>
										{option.NAME}
									</Select.Option>
								))}
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
								value={formData.assignReason}
								filterOption={(input, opt) => {
									return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
								}}
								showSearch
							>
								{cs?.ProspectAssignReason?.dropDownValue.map((option) => (
									<Select.Option key={option.dataValue} value={option.dataValue}>
										{option.displayValue}
									</Select.Option>
								))}
							</Select>
						</Form.Item>
						{formData.assignReason == 'O' ? (
							<Form.Item name='oReason'>
								<Input
									maxLength={20}
									onChange={(evt) => handleOtherReason(evt)}
									size='large'
									value={formData.oReason}
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
									style={{ marginBottom: '15px' }}
									message='Relationship Manager and Office fields are mandatory'
									type='error'
									closable
								/>
							</Form.Item>
						)}
					</div>
				</Form>
				<div className='modal-footer'>
					<ScButtonText
						key='back'
						type='text'
						onClick={() => {
							cancelModal();
						}}
					>
						Cancel
					</ScButtonText>
					<ScButtonPrimary key='submit' type='primary' onClick={onAssign}>
						Assign
					</ScButtonPrimary>
				</div>
			</div>
		</>
	);
};

export default Assign;
