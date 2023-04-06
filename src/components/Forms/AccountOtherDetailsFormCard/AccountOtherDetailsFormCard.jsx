import React from 'react';

import { Card, Form, Row, Col, Input, Select } from 'antd';
import { useEffect } from 'react';

const AccountOtherDetailsFormCard = ({
	rules,
	csObject,
	form,
	formData,
	userNameDropDownlist,
	onValuesChange = () => {},
	action,
	location
}) => {
	const { Item } = Form;

	useEffect(() => {
		if (!(action === 'edit' || action === 'profileEdit')) {
			if (!(location.state === null || location.state === undefined)) {
				formData.name = location.state?.contactDetails?.clientId;
				formData.relationshipManager = location.state?.contactDetails?.custRelMgr;
				formData.branch = location.state?.contactDetails?.branch;
				form.setFieldsValue({
					name: location.state?.contactDetails?.clientId,
					relationshipManager: location.state?.contactDetails?.custRelMgr,
					branch: location.state?.contactDetails?.branch
				});
			}
		}
	}, [location.state?.contactDetails]);

	useEffect(() => {
		if (!(action === 'edit' || action === 'profileEdit')) {
			if (location.state === null || location.state === undefined) {
				let usrname = userNameDropDownlist.find((o) => o?.CustomerID === formData.name);
				let secRM = csObject?.SecRelationshipManager?.lookupValue?.lookUpValues.find(
					(o) => o?.ID === usrname?.SecondaryRelationshipManager
				);
				let serRM = csObject?.ServiceRelationshipManager?.lookupValue?.lookUpValues.find(
					(o) => o?.ID === usrname?.ServiceRelationshipManager
				);
				formData.secondaryRelationshipManager = secRM?.ID;
				formData.serviceRelationshipManager = serRM?.ID;
				form.setFieldsValue({
					secondaryRelationshipManager: secRM?.Name,
					serviceRelationshipManager: serRM?.Name
				});
			}
		}
	}, [formData.name]);

	return (
		<>
			<Card title='Other Details'>
				<Form
					form={form}
					initialValues={formData}
					onValuesChange={onValuesChange}
					layout='vertical'
				>
					<Row align='middle'>
						<Col span={8}>
							<Item
								name='reportingCurrency'
								rules={rules ? rules?.currency : []}
								label='Reporting Currency'
							>
								<Select
									placeholder='Select Option'
									showSearch={true}
									size='large'
									filterOption={(input, option) => {
										return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
									}}
									options={csObject?.Currency?.dropDownValue?.map((item) => ({
										label: item.displayValue,
										value: item.dataValue
									}))}
								/>
							</Item>
						</Col>

						<Col span={8}>
							<Item
								name='secondaryRelationshipManager'
								rules={rules?.secrelationshipmanager}
								label='Secondary Relationship Manager'
							>
								<Select
									placeholder='Select Option'
									showSearch={true}
									size='large'
									disabled={true}
									filterOption={(input, option) => {
										return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
									}}
									options={csObject?.SecRelationshipManager?.lookupValue?.lookUpValues?.map(
										(item) => ({ label: item.Name, value: item.ID })
									)}
								/>
							</Item>
						</Col>

						<Col span={8}>
							<Item
								name='serviceRelationshipManager'
								rules={rules?.servicerelationshipmanager}
								label='Service Relationship Manager'
							>
								<Select
									placeholder='Select Option'
									showSearch={true}
									size='large'
									disabled={true}
									filterOption={(input, option) => {
										return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
									}}
									options={csObject?.ServiceRelationshipManager?.lookupValue?.lookUpValues?.map(
										(item) => ({ label: item.Name, value: item.ID })
									)}
								/>
							</Item>
						</Col>
					</Row>
					<Row>
						<Col span={8}>
							<Item
								name='primaryExternalRM'
								label='Product Provider / External Relationship Manager (Primary)'
								rules={rules?.primaryexternalrm}
							>
								<Select
									placeholder='Select Option'
									showSearch={true}
									size='large'
									filterOption={(input, option) => {
										return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
									}}
									options={csObject?.PrimaryExternalRm?.dropDownValue?.map((item) => ({
										label: item.displayValue,
										value: item.dataValue
									}))}
								/>
							</Item>
						</Col>
						<Col span={8}>
							<Item
								name='secondaryExternalRM'
								label='Product Provider / External Relationship Manager (Secondary)'
								rules={rules?.secondaryexternalrm}
							>
								<Select
									placeholder='Select Option'
									showSearch={true}
									size='large'
									filterOption={(input, option) => {
										return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
									}}
									options={csObject?.SecondaryExternalRm?.dropDownValue?.map((item) => ({
										label: item.displayValue,
										value: item.dataValue
									}))}
								/>
							</Item>
						</Col>
					</Row>
					<Row>
						<Col span={16}>
							<Item name='otherDetailsRemarks' rules={rules ? rules?.remark : []} label='Remarks'>
								<Input.TextArea rows={4} />
							</Item>
						</Col>
					</Row>
				</Form>
			</Card>
		</>
	);
};

export default AccountOtherDetailsFormCard;
