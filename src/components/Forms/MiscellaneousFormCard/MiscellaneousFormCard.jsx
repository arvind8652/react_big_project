import { Button, Card, Col, Row, Typography } from 'antd';
import { useEffect, useState } from 'react';
import MiscellaneousFormModal from '../../Modal/MiscellaneousFormModal/MiscellaneousFormModal';
import { ScButtonText } from '../../StyledComponents/genericElements';
import moment from 'moment';
import './miscellaneousFormCard.scss';

import { getMiscellaneousDetailsForCustomer } from '../../../api/customerCreateApi';
import { getMiscellaneousDetails } from '../../../api/commonApi';

const MiscellaneousFormCard = ({
	form,
	formData,
	onValuesChange,
	rules,
	csObject,
	refID,
	action,
	progName,
	screenName = null,
	mode
}) => {
	const getMiscellaneous = async () => {
		try {
			let response;
			let responsedata;
			let misc = [];
			if (screenName === 'customer' || screenName === 'account') {
				response = await getMiscellaneousDetailsForCustomer(progName, refID);

				if (screenName === 'customer' && response.data.miscellaneous.length > 0) {
					response.data.miscellaneous.map((data) => {
						misc.push({ miscellaneous: data.fieldValue, type: data.fieldName });
						//misc.push(data);
					});
				}
				if (screenName === 'account' && response.data.miscellaneous.length > 0) {
					response.data.miscellaneous.map((data) => {
						misc.push({ miscellaneous: data.fieldValue, type: data.fieldName });
						//misc.push(data);
					});
				}
			} else {
				response = await getMiscellaneousDetails(progName, refID);
			}
			responsedata = response.data;
			if (screenName === 'customer') {
				responsedata = misc;
			}
			if (screenName === 'account') {
				responsedata = misc;
			}
			onValuesChange({ miscellaneous: responsedata });
		} catch (error) {}
	};
	useEffect(() => {
		if (action === 'edit' || action === 'profileEdit') {
			getMiscellaneous();
		}
	}, []);

	const [showMiscellaneousFormModal, setShowMiscellaneousFormModal] = useState(false);
	const mfmHandleOk = (values) => {
		let miscellaneous;

		if (
			formData &&
			formData.miscellaneous &&
			Array.isArray(formData.miscellaneous) &&
			formData.miscellaneous.length > 0
		) {
			miscellaneous = {
				miscellaneous: [
					// ...formData.miscellaneous,
					...values.map((v) => ({
						type: v.key,
						miscellaneous: v.value
					}))
				]
			};
		} else {
			miscellaneous = {
				miscellaneous: [
					...values.map((v) => ({
						type: v.key,
						miscellaneous: v.value
					}))
				]
			};
		}
		onValuesChange(miscellaneous);
		toggleShowMiscellaneousFormModal();
	};
	const mfmHandleCancel = () => {
		toggleShowMiscellaneousFormModal();
	};
	const toggleShowMiscellaneousFormModal = () => {
		setShowMiscellaneousFormModal(!showMiscellaneousFormModal);
	};
	const objKeys = csObject ? Object.keys(csObject) : [];

	return (
		<Card
			title='Miscellaneous'
			className={formData.miscellaneous ? '' : 'no-card-body'}
			extra={
				<Typography.Title level={5}>
					<Typography.Link onClick={toggleShowMiscellaneousFormModal}>+ Add</Typography.Link>
				</Typography.Title>
			}
		>
			{showMiscellaneousFormModal && (
				<MiscellaneousFormModal
					miscFormData={
						formData.miscellaneous &&
						formData.miscellaneous.map((item) => ({
							key: item.type,
							value: item.miscellaneous
						}))
					}
					visible={showMiscellaneousFormModal}
					handleOk={mfmHandleOk}
					handleCancel={mfmHandleCancel}
					csObject={csObject}
					rules={rules}
				/>
			)}
			{formData.miscellaneous &&
				Array.isArray(formData.miscellaneous) &&
				formData.miscellaneous.length > 0 && (
					<Row align='middle' justify='space-between'>
						{formData.miscellaneous.map((item, idx) => {
							return (
								<Col span={8} key={idx}>
									<Row>
										<strong>
											{csObject &&
												objKeys.includes(item.type) &&
												csObject[item.type] &&
												!['NumericTextBox', 'TextBox', 'AutoComplete'].includes(
													csObject[item.type]?.controlType
												) &&
												csObject[item.type].dropDownValue &&
												csObject[item.type].dropDownValue.filter(
													(option) => option.dataValue === item.miscellaneous
												) &&
												csObject[item.type].dropDownValue.filter(
													(option) => option.dataValue === item.miscellaneous
												)[0] &&
												csObject[item.type].dropDownValue.filter(
													(option) => option.dataValue === item.miscellaneous
												)[0].displayValue}
											{csObject &&
												csObject[item.type] &&
												objKeys.includes(item.type) &&
												['AutoComplete'].includes(csObject[item.type].controlType) &&
												csObject[item.type].lookupValue &&
												csObject[item.type].lookupValue.lookUpValues &&
												csObject[item.type].lookupValue.lookUpValues.filter(
													(option) => option.industry === item.miscellaneous
												) &&
												csObject[item.type].lookupValue.lookUpValues.filter(
													(option) => option.industry === item.miscellaneous
												)[0] &&
												csObject[item.type].lookupValue.lookUpValues.filter(
													(option) => option.industry === item.miscellaneous
												)[0].name}
											{csObject &&
												csObject[item.type] &&
												objKeys.includes(item.type) &&
												['NumericTextBox', 'TextBox'].includes(csObject[item.type].controlType) &&
												item.miscellaneous}
											{csObject &&
												csObject[item.type] &&
												objKeys.includes(item.type) &&
												csObject[item.type].controlType !== undefined &&
												['DatePicker'].includes(csObject[item.type].controlType) &&
												moment(item.miscellaneous).format('Do MMM YYYY')}
										</strong>
									</Row>
									<Row>
										{csObject &&
											csObject[item.type] &&
											objKeys.includes(item.type) &&
											csObject[item.type].fieldLabel}
									</Row>
									{(mode === 'edit' || action === 'edit') && (
										<>
											<Row>
												<strong>
													{item.fieldLabel === 'Date Value'
														? moment(item.fieldValueName).format('Do MMM YYYY')
														: item.fieldValueName}
												</strong>
											</Row>
											<Row>{item.fieldLabel}</Row>
										</>
									)}
								</Col>
							);
						})}
					</Row>
				)}
		</Card>
	);
};

export default MiscellaneousFormCard;
