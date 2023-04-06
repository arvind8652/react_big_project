import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Scatter } from '@ant-design/charts';
import { assetAllocationAnomaly, ASSET_ALLOCATION_DATA } from '../constant';
import GenericCard from '../../../components/GenericCard/GenericCard';
import PlottingMultiAttributeSelector from '../../../components/PlottingAttributeSelector/PlottingMultiAttributeSelector';
import { connect } from 'react-redux';
import { getAssetAnomolyApi } from '../../../api/customerOverviewApi';

const AssetAllocationAnomalyCard = (props) => {
	const { controlStructure, riskModel, selectedType } = props;
	const [dropDownMenu, setdropDownMenu] = useState([]);
	const [plottingField, setPlottingField] = useState('individual');
	const [assetData, setAssetData] = useState({});
	const curDate = sessionStorage.getItem('curDate');
	const [demoData, setDemoData] = useState([]);

	useEffect(() => {
		let demoList = [];
		if (Object.keys(assetData).length > 0) {
			if (assetData?.assetAllocation?.length) {
				assetData?.assetAllocation.map((ele) =>
					demoList.push({
						'H/A': 'A',
						Team: 'Torino',
						Allocation: ele.fieldPer,
						'Risk Score': ele.riskScore,
						Result: ele.assetType
					})
				);
			}
		}
		setDemoData(demoList);
	}, [assetData]);

	useEffect(() => {
		const options = riskModel.dropDownValue?.map((option, index) => {
			return {
				id: option.dataValue,
				menuName: option.displayValue
			};
		});
		setdropDownMenu(options);
	}, [riskModel]);

	const config = {
		appendPadding: 30,
		data: demoData,
		xField: 'Allocation',
		yField: 'Risk Score',
		colorField: 'Result',
		color: ['#5564C1', '#792B80', '#56B8BE', '#898EA9'],
		size: 10,
		shape: 'circle',
		pointStyle: {
			fillOpacity: 1
		},
		yAxis: {
			nice: true,
			line: {
				style: {
					stroke: '#aaa'
				}
			}
		},
		xAxis: {
			grid: {
				line: {
					style: {
						stroke: '#eee'
					}
				}
			},
			line: {
				style: {
					stroke: '#aaa'
				}
			}
		}
	};

	const getApiData = async () => {
		let selectedData = selectedType?.length
			? dropDownMenu.filter((ins) => selectedType === ins.menuName)
			: dropDownMenu.length
			? [dropDownMenu[0]]
			: [];
		let obj = {
			assetgroup: plottingField,
			RiskId: selectedData[0].id,
			// BusinessDate: curDate?.split("T")[0].trim(),
			BusinessDate: '2021-06-01'
		};
		let resp = await getAssetAnomolyApi(obj);
		setAssetData(resp.data);
	};
	useEffect(() => {
		if (dropDownMenu && dropDownMenu.length > 0) {
			getApiData();
		}
	}, [selectedType, dropDownMenu, plottingField]);

	const menuListDefault = [
		{
			id: 0,
			menuName: 'Equity'
		},
		{
			id: 1,
			menuName: 'Fixed Income'
		},
		{
			id: 2,
			menuName: 'Alternate'
		},
		{
			id: 3,
			menuName: 'Cashaa'
		}
	];

	return (
		<>
			<div>
				<GenericCard
					header={assetAllocationAnomaly}
					menuFlag={2}
					menuList={dropDownMenu && dropDownMenu.length > 0 ? dropDownMenu : menuListDefault}
					dropdownKey={'assetAnomalyType'}
				>
					<PlottingMultiAttributeSelector
						controlStructure={controlStructure.dropDownValue}
						callBack={setPlottingField}
					/>
					{!demoData.length ? (
						<div
							style={{
								height: '300px',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center'
							}}
						>
							<span style={{ textAlign: 'center' }}>No Graph Data </span>{' '}
						</div>
					) : (
						<Scatter {...config} />
					)}
				</GenericCard>
			</div>
		</>
	);
};
function mapStateToProps(state) {
	return {
		selectedType: state?.common?.dropdownKeys?.assetAnomalyType
	};
}

export default connect(mapStateToProps)(AssetAllocationAnomalyCard);
