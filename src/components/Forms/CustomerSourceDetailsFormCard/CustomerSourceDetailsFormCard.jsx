import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Select, Form } from 'antd';
import { getCampaignName, getCampaignType } from '../../../api/commonApi';

export default function SourceDetails({
	form,
	formData,
	onValuesChange,
	rules,
	csObject,
	screen,
	mode,
	cifRespData = {}
}) {
	const [sourceTypeList, setSourceTypesList] = useState([]);
	const [sourceValuesList, setSourceValuesList] = useState([]);

	const onSourceChange = (value) => {
		setSourceTypesList([]);
		onValuesChange({ sourceType: null, sourceValue: null, source: value });
	};

	const onSourceTypeChange = (value) => {
		onValuesChange({ sourceValue: null, sourceType: value });
	};

	useEffect(() => {
		getCampaignType(formData.source).then((ct) => {
			setSourceTypesList(ct.data);
			setSourceValuesList([]);
		});
	}, [formData.source]);

	useEffect(() => {
		getCampaignName(formData.sourceType).then((cn) => setSourceValuesList(cn.data));
	}, [formData.sourceType]);

	return (
		<Card title='Source Details'>
			<Form form={form} layout='vertical' initialValues={formData} onValuesChange={onValuesChange}>
				<Row>
					<Col span={8}>
						<Form.Item
							label='Source'
							name='source'
							required
							rules={rules ? rules.source : []}
							validateTrigger={['onChange', 'onBlur']}
						>
							<Select
								// disabled={cifRespData?.source}
								// onChange={onSourceChange}
								onChange={(value) => {
									onSourceChange(value);
								}}
								placeholder='Select'
								size='large'
								filterOption={(input, option) =>
									option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
								}
								options={csObject?.source?.dropDownValue?.map((_, i) => ({
									key: i,
									label: _.displayValue,
									value: _.dataValue
								}))}
								value={formData?.source}
								showSearch
							/>
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item
							label='Source Type'
							name='sourceType'
							required
							rules={rules ? rules.sourcetype : []}
							validateTrigger={['onChange', 'onBlur']}
						>
							<Select
								// disabled={cifRespData?.sourceType}
								onChange={onSourceTypeChange}
								placeholder='Select'
								size='large'
								showSearch
								filterOption={(input, option) =>
									option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
								}
								options={sourceTypeList?.lookUpValues?.map((_) => ({
									key: _.data_value,
									label: _.display_value,
									value: _.data_value
								}))}
							/>
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item
							label='Source Name'
							name='sourceValue'
							rules={rules ? rules.campaignname : []}
							validateTrigger={['onChange', 'onBlur']}
						>
							<Select
								// disabled={cifRespData?.sourceValue}
								placeholder='Select'
								size='large'
								showSearch
								filterOption={(input, option) =>
									option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
								}
								onChange={(value) => onValuesChange({ sourceValue: value })}
								options={sourceValuesList?.lookUpValues
									?.map((_) => ({
										key: _.data_value,
										label: _.display_value,
										value: _.data_value,
										BranchType: _.BranchType ? _.BranchType : null
									}))
									.filter((x) => {
										if (formData?.sourceType === 'WOFFICE') return x?.BranchType === 'W';
										else if (formData?.sourceType === 'BRANCH') return x?.BranchType === 'B';
										else return x;
									})}
							/>
						</Form.Item>
					</Col>
				</Row>
				<Row>
					<Col span={8}>
						<Form.Item
							label='Sourced By'
							name='sourcedBy'
							required
							rules={rules ? rules.sourcedby : []}
							validateTrigger={['onChange', 'onBlur']}
						>
							<Select
								// disabled={(screen === 'list' && mode === 'edit') || cifRespData?.sourcedBy}
								disabled={screen === 'list' && mode === 'edit'}
								onChange={(value) => onValuesChange({ sourcedBy: value })}
								placeholder='Select'
								size='large'
								filterOption={(input, option) =>
									option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
								}
								options={csObject?.SourcedBy?.dropDownValue?.map((_, i) => ({
									key: i,
									label: _.displayValue,
									value: _.dataValue
								}))}
								value={formData?.sourcedBy}
								showSearch
							/>
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</Card>
	);
}
