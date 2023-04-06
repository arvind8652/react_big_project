import { Pagination } from 'antd';
import React from 'react';

const GenericGridViewPagination = (props) => {
	const { pageSize = 25, total = 25, setpageCountDetail = () => {} } = props;
	const pageChangeHandler = (val) => {
		let max = val * pageSize;
		setpageCountDetail({ start: max - pageSize, end: max > total ? total : max });
	};
	return (
		<Pagination
			onChange={(val) => pageChangeHandler(val)}
			defaultCurrent={1}
			pageSize={pageSize}
			showSizeChanger={false}
			total={total}
			showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
		/>
	);
};

export default GenericGridViewPagination;
