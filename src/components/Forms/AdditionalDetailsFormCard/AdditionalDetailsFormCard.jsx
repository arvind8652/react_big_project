// internal imports
import { memo, useEffect, useState } from 'react';

// external imports
import {
	Card,
	Form,
	Row,
	Col,
	Checkbox,
	Select,
	Typography,
	AutoComplete,
	Tag,
	Badge,
	Input
} from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { getAccountBaseAccess, getTaxStatus } from '../../../api/accountCreateApi';

const AdditionalDetailsFormCard = ({
	rules,
	csObject,
	form,
	formData,
	userNameDropDownlist,
	setAccessData,
	onValuesChange = () => {},
	action,
	accountDetails
}) => {
	const { Item } = Form;
	const [types, setTypes] = useState([]);
	const [data, setData] = useState(csObject?.InvestmentAcccess?.lookupValue?.lookUpValues);
	const [taxData, setTaxData] = useState([]);
	const [accountBaseAccessData, setAccountBaseAccessData] = useState();

	useEffect(() => {
		if (action === 'edit') {
			const newTypes = accountDetails?.baseSchemeRequisition?.investmentAccessArray?.map((e) => {
				return {
					asset_type: e,
					name: data?.find((elem) => elem.asset_type === e)?.name
				};
			});
			setTypes(newTypes);
		}
	}, [accountDetails, data]);

	const getTstatus = () => {
		userNameDropDownlist.map(async (item) => {
			if (item.CustomerID === formData.name) {
				try {
					const response = await getTaxStatus(formData.name, item.category);
					setTaxData(response.data);
				} catch (error) {}
			}
		});
	};

	const _getAccountBaseAccess = async () => {
		try {
			const response = await getAccountBaseAccess(formData.type, formData.classification);
			setAccountBaseAccessData(response.data);
			setAccessData(response.data);
		} catch (error) {}
	};

	useEffect(() => {
		if (formData.name) {
			getTstatus();
		}
	}, [formData.name, userNameDropDownlist]);

	useEffect(() => {
		// if (formData.type && formData.classification) {
		if (formData.type) {
			_getAccountBaseAccess();
		}
		// }, [formData.classification]);
	}, [formData.type]);

	const styleSet = {
		parentCheckBox: { display: 'flex', alignItems: 'center', padding: '10px' },
		checkboxContainer: { flex: 0.1, justifyContent: 'center', alignItems: 'center' },
		itemCheckbox: { flex: 0.9 },
		tag: {
			display: 'flex',
			backgroundColor: '#F6F7FB',
			color: '#5D6DD1',
			width: '100%',
			alignItems: 'center',
			borderRadius: 10,
			padding: 5
		},
		close: {
			paddingLeft: 5,
			paddingRight: 5
		},
		tagContainer: { overflowX: 'auto', display: 'flex', paddingBottom: 10 },
		name: {
			whiteSpace: 'nowrap',
			width: '100%',
			overflow: 'hidden',
			textOverflow: 'ellipsis'
		},
		dropDownHeight: { maxHeight: '150px', overflowY: 'scroll' }
	};

	const renderInvestmentsTypes = () => {
		const handleOnChange = (checked, label, value) => {
			if (checked) {
				setTypes([...types, { name: label, asset_type: value }]);
			} else {
				setTypes(types?.filter((e) => e.asset_type !== value));
			}
		};

		return data?.map((e) => (
			<div style={styleSet.parentCheckBox}>
				<div style={styleSet.checkboxContainer}>
					<Checkbox
						checked={types?.find((item) => item.asset_type === e.asset_type) ? true : false}
						onChange={(evt) => handleOnChange(evt.target.checked, e.name, e.asset_type)}
					/>
				</div>
				<div style={styleSet.itemCheckbox}>
					<Typography.Text>{e.name}</Typography.Text>
				</div>
			</div>
		));
	};

	useEffect(() => {
		onValuesChange({ investmentAccess: types?.map((e) => e.asset_type).toString() });
	}, [types]);

	useEffect(() => {
		setData(csObject?.InvestmentAcccess?.lookupValue?.lookUpValues);
	}, [csObject?.InvestmentAcccess?.lookupValue?.lookUpValues]);

	const handleOnChange = (query) => {
		const small = query?.toLowerCase();
		const newData = csObject?.InvestmentAcccess?.lookupValue?.lookUpValues?.filter((e) => {
			return e.name.toLowerCase().includes(small);
		});
		setData(newData);
	};

	useEffect(() => {
		if (action !== 'edit') {
			if (typeof accountBaseAccessData === 'undefined') {
				formData.investmentAccess = '';
				formData.marketAccess = '';
			} else {
				let investment = accountBaseAccessData?.investment?.[0]?.accessCode;
				formData.investmentAccess = investment;
				let market = accountBaseAccessData?.market?.[0]?.accessCode;
				formData.marketAccess = market;
			}
		}
		// }, [formData.classification, accountBaseAccessData]);
	}, [accountBaseAccessData]);

	return (
		<>
			<Card title='Additional Details'>
				<Form
					form={form}
					initialValues={formData}
					onValuesChange={onValuesChange}
					layout='vertical'
				>
					<Row>
						<Col span={8}>
							<Item
								name='benchmark'
								rules={rules?.benchmark ? rules?.benchmark : []}
								label='Benchmark'
							>
								<Select
									placeholder='Select Option'
									showSearch={true}
									size='large'
									filterOption={(input, option) => {
										return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
									}}
									options={csObject?.Benchmark.lookupValue.lookUpValues.map((item) => ({
										label: item.name,
										value: item.benchmark
									}))}
								/>
							</Item>
						</Col>
						<Col span={8}>
							<Item
								name='investmentAccess'
								// rules={rules?.investmentacccess}
								label='Investment Access'
							>
								{accountBaseAccessData?.investment?.length > 0 && (
									<div style={styleSet.tagContainer}>
										{accountBaseAccessData?.investment?.map((e) => (
											<Col span={12}>
												<div style={styleSet.tag}>
													<div key={e.accessCode} style={styleSet.name}>
														{e.name}
													</div>
													{/* <div style={styleSet.close}>
                                                            <CloseOutlined onClick={() => setTypes(types?.filter(item => item.asset_type !== e.asset_type))} />
                                                        </div> */}
												</div>
											</Col>
										))}
									</div>
								)}
							</Item>
						</Col>
						<Col span={8}>
							<Item
								name='marketaccess'
								// rules={rules?.investmentacccess}
								label='Market Access'
							>
								{accountBaseAccessData?.market?.length > 0 && (
									<div style={styleSet.tagContainer}>
										{accountBaseAccessData?.market?.map((e) => (
											<Col span={12}>
												<div style={styleSet.tag}>
													<div key={e.accessCode} style={styleSet.name}>
														{e.name}
													</div>
													{/* <div style={styleSet.close}>
                                                                <CloseOutlined onClick={() => setTypes(types?.filter(item => item.asset_type !== e.asset_type))} />
                                                            </div> */}
												</div>
											</Col>
										))}
									</div>
								)}
							</Item>
						</Col>
					</Row>
					<Row>
						<Col span={8}>
							<Item
								name='SourceOfFund'
								rules={rules?.sourceoffund ? rules?.sourceoffund : []}
								label='Source of Fund'
							>
								<Select
									placeholder='Select Option'
									showSearch={true}
									size='large'
									filterOption={(input, option) => {
										return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
									}}
									options={csObject?.SourceOfFund?.dropDownValue?.map((item) => ({
										label: item.displayValue,
										value: item.dataValue
									}))}
								/>
							</Item>
						</Col>
						<Col span={8}>
							<Item name='TaxStatus' rules={rules?.taxstatus} label='Tax Status'>
								<Select
									placeholder='Select Option'
									showSearch={true}
									size='large'
									filterOption={(input, option) => {
										return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
									}}
									options={taxData?.lookUpValues?.map((item) => ({
										label: item.display_value,
										value: item.data_value
									}))}
								/>
							</Item>
						</Col>
						<Col span={8}>
							<Item name='ReferralBranch' rules={rules?.referralbranch} label='Referral Branch'>
								<Select
									placeholder='Select Option'
									showSearch={true}
									size='large'
									filterOption={(input, option) => {
										return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
									}}
									options={csObject?.ReferralBranch?.lookupValue?.lookUpValues?.map((item) => ({
										label: item.Branch,
										value: item.BranchCode
									}))}
								/>
							</Item>
						</Col>
					</Row>
				</Form>
			</Card>
		</>
	);
};

const mapStateToProps = (state) => ({
	accountDetails: state.accountCreate.accountDetails
});

export default connect(mapStateToProps)(memo(AdditionalDetailsFormCard));
