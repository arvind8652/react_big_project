import React, { useState } from 'react';
import { Card, Row, Col, Select, Form, Input } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/pro-light-svg-icons';

export default function RelationshipManagerDetails({
	form,
	user,
	formData,
	onValuesChange,
	rules,
	csObject,
	cifRespData = {},
	action = ''
}) {
	// const updatedData = csObject?.RelationshipManager?.lookupValue?.lookUpValues?.map(
	//   (_) => ({
	//     label: _.Name,
	//     value: _.ID,
	//   })
	// )

	// const [data, setData] = React.useState(updatedData);
	// const [data1, setData1] = useState({})
	// const [data2, setData2] = useState({})

	// --------------------------
	const handleOnValuesChange = (key, value) => {
		if (key === 'custRelMgr') {
			let bankAccbranchVal = '';
			csObject?.RelationshipManager?.lookupValue?.lookUpValues?.find((e) => {
				if (e?.ID === value) {
					bankAccbranchVal = e?.Branch;
				}
			});
			onValuesChange({ [key]: value, ['bankAccbranch']: bankAccbranchVal });
			form.setFieldsValue({ ['bankAccbranch']: bankAccbranchVal });
		} else {
			onValuesChange({ [key]: value });
		}
	};
	// --------------------------

	// // onChange function for Secondary Relationship Manager
	// const handleOnValuesChange = (key, val) => {
	//   setData1(val)
	//   const newData = [...updatedData]
	//   updatedData.map((d,i) => {
	//     if(d.value === val.value) {

	//       return newData[i] = {
	//         ...d,
	//         disabled:true,
	//       }
	//     } else if(d.value === data2.value) {

	//       return newData[i] = {
	//         ...d,
	//         disabled:true,
	//       }
	//     } else {
	//       return newData[i] = {
	//         ...d,
	//         disabled:false,
	//       }
	//     }
	//   })
	//   setData(newData)
	// };

	// // onChange function for Relationship Manager
	// const handleOnValuesChange2 = (key, val) => {
	//   setData2(val)
	//   const newData2 = [...updatedData]
	//   updatedData.map((d,i) => {
	//     if(d.value === val.value) {
	//       return newData2[i] = {
	//         ...d,
	//         disabled:true,
	//       }
	//     } else if(d.value === data1.value) {
	//       return newData2[i] = {
	//         ...d,
	//         disabled:true,
	//       }
	//     } else {
	//       return newData2[i] = {
	//         ...d,
	//         disabled:false,
	//       }
	//     }
	//   })
	//   setData(newData2)
	// }

	return (
		<Card title="Relationship Manager's Details">
			<Form form={form} layout='vertical' initialValues={formData} onValuesChange={onValuesChange}>
				<Row>
					<Col span={8}>
						<Form.Item
							label='Relationship Manager’s Name'
							name='custRelMgr'
							required
							rules={rules ? rules.relationshipmanager : []}
							validateTrigger={['onChange', 'onBlur']}
						>
							<Select
								disabled={action === 'edit'}
								// disabled={cifRespData?.custRelMgr}   //this line maybe use in future
								onChange={(val) => handleOnValuesChange('custRelMgr', val)}
								placeholder='Search by name'
								defaultValue={user?.rmYN === 'Y' ? user.userID : null}
								size='large'
								suffixIcon={<FontAwesomeIcon icon={faUserPlus} color='#354081' />}
								showSearch
								// options={data ? data:  data?.filter((d) => d.disabled === false)?.map(
								//   (_) => ({
								//     label: _.Name,
								//     value: _.ID,
								//   })
								// )}
								options={csObject?.RelationshipManager?.lookupValue?.lookUpValues?.map(
									(_, index) => ({
										key: index,
										disabled: formData?.rm2 === _.ID || formData?.rm3 === _.ID ? true : false,
										label: _.Name,
										value: _.ID
									})
								)}
								filterOption={(input, option) => {
									return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
								}}
								value={formData?.custRelMgr}
							/>
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item
							// label="Branch Name"
							label='Office'
							name='bankAccbranch'
							// name="custRelMgr"
							required
							rules={rules ? rules.branchname : []}
							validateTrigger={['onChange', 'onBlur']}
						>
							<Select
								onChange={(val) => handleOnValuesChange('bankAccbranch', val)}
								placeholder='Enter office name'
								defaultValue={user?.rmYN === 'Y' ? user.branch : null}
								size='large'
								disabled
								options={csObject?.RelationshipManager?.lookupValue?.lookUpValues?.map(
									(_, index) => ({
										key: index,
										label: _.BranchName,
										// value: _.ID
										value: _.Branch
									})
								)}
								value={formData?.bankAccbranch}
								showSearch
							/>
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item
							label='Secondary Relationship Manager'
							name='rm2'
							rules={rules ? rules.secrelationshipmanager : []}
							validateTrigger={['onChange', 'onBlur']}
						>
							<Select
								allowClear
								// disabled={cifRespData?.rm2}
								// onChange={(key,val) => handleOnValuesChange(key, val)}
								onChange={(val) => handleOnValuesChange('rm2', val)}
								placeholder='Search by name'
								size='large'
								suffixIcon={<FontAwesomeIcon icon={faUserPlus} color='#354081' />}
								showSearch
								// options={data ? data:  data?.filter((d) => d.disabled === false)?.map(
								//   (_) => ({
								//     label: _.Name,
								//     value: _.ID,
								//   })
								// )}
								options={csObject?.RelationshipManager?.lookupValue?.lookUpValues?.map(
									(_, index) => ({
										key: index,
										disabled:
											formData?.custRelMgr === _.ID || formData?.rm3 === _.ID ? true : false,
										label: _.Name,
										value: _.ID
									})
								)}
								filterOption={(input, option) => {
									return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
								}}
							/>
						</Form.Item>
					</Col>
				</Row>
				<Row>
					<Col span={8}>
						<Form.Item
							label='Service Relationship Manager'
							name='rm3'
							rules={rules ? rules.servicerelationshipmanager : []}
							validateTrigger={['onChange', 'onBlur']}
						>
							<Select
								allowClear
								// disabled={cifRespData?.rm3}
								onChange={(val) => handleOnValuesChange('rm3', val)}
								placeholder='Search by name'
								size='large'
								suffixIcon={<FontAwesomeIcon icon={faUserPlus} color='#354081' />}
								showSearch
								options={csObject?.ServiceRelationshipManager?.lookupValue?.lookUpValues?.map(
									(_, index) => ({
										key: index,
										disabled:
											formData?.custRelMgr === _.ID || formData?.rm2 === _.ID ? true : false,
										label: _.Name,
										value: _.ID
									})
								)}
								filterOption={(input, option) => {
									return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
								}}
							/>
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</Card>
	);
}
