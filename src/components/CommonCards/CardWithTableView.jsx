import React, { Children } from 'react';
import { Table } from 'antd';
import GenericCard from '../GenericCard/GenericCard';

const CardWithTableView = ({
	type = '',
	header = '',
	columns = [],
	data = [],
	buttonTitle = '',
	menuFlag = 0,
	onButtonClick = () => console.log('Button Clicked')
}) => {
	return (
		<GenericCard
			type={type}
			header={header}
			controlType={'BUTTON'}
			menuFlag={menuFlag}
			buttonTitle={buttonTitle}
			onClick={onButtonClick}
		>
			<Table columns={columns} scroll={{ y: 210 }} pagination={false} dataSource={data} />
		</GenericCard>
	);
};
export default CardWithTableView;
