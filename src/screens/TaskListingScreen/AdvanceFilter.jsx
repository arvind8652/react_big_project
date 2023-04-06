import React, { useEffect, useState } from 'react';
import { Form, Drawer } from 'antd';
import moment from 'moment';
import TaskListingFilterForm from '../../components/Forms/TaskListingFilterForm/TaskListingFilterForm';
const AdvancedFilter = ({ showDrawer, toggleDrawer, filterCs, onAdvFilterSubmit }) => {
	const [form] = Form.useForm();
	const [filterCount, setFilterCount] = useState(0);
	const [formData, setFormData] = useState({
		searchName: undefined,
		tag: undefined,
		type: undefined,
		purpose: undefined,
		status: undefined,
		ddrRange: undefined
	});
	useEffect(() => {
		const formDataKeys = Object.keys(formData);
		setFilterCount(
			formDataKeys.filter((item) => formData[item] !== undefined && formData[item].length > 0)
				.length
		);
	}, [formData]);
	const onValuesChange = (values) => {
		if (values.ddrRange) {
			setFormData({
				ddrRange: values.ddrRange.map((date) => moment(date).toISOString())
			});
		} else {
			setFormData({ ...formData, ...values });
		}
	};

	return (
		<Drawer
			width={'26vw'}
			className='task-list-advanced-filter-drawer-container'
			visible={showDrawer}
			onClose={toggleDrawer}
			closable
		>
			<div className='header'>
				<div className='title'>Filter</div>
				<div className='subtitle'>
					{filterCount === 0 ? 'No' : filterCount} tag
					{filterCount > 1 && 's '}
				</div>
			</div>

			<TaskListingFilterForm
				form={form}
				filterCs={filterCs}
				formData={formData}
				toggleDrawer={toggleDrawer}
				onFinish={onAdvFilterSubmit}
				onValuesChange={onValuesChange}
			/>
		</Drawer>
	);
};
export default AdvancedFilter;
