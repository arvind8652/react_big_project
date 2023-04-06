// components
import GenericTable from '../GenericTable/GenericTable';
import FavoriteItem from './ListingItem/FavoriteItem';
import LeftItem from './ListingItem/LeftItem';
import RightItem from './ListingItem/RightItem';

const Listing = ({
	tableData = [],
	isCustomerUser,
	clientId,
	loading = false,
	setCurrentPaginationInfo = () => {},
	pageSize,
	callRefreshApis = () => {}
}) => {
	const commonProps = {
		isCustomerUser,
		clientId
	};
	const columns = [
		{
			dataIndex: 'icon',
			key: '',
			render: (_, rowData, rowIndex) => <LeftItem rowData={rowData} {...commonProps} />
		},
		// {
		//   dataIndex: "icon",
		//   key: "icon",
		//   render: (_, rowData, rowIndex) => (
		//     <RightItem rowData={rowData} {...commonProps} />
		//   )
		// }
		{
			dataIndex: 'icon',
			key: 'icon',
			render: (_, rowData, rowIndex) => (
				<FavoriteItem callRefreshApis={callRefreshApis} rowData={rowData} {...commonProps} />
			)
		}
	];

	return (
		<GenericTable
			loading={loading}
			showHeader={false}
			tableRows={tableData}
			tableColumns={columns}
			pageSize={pageSize}
			scroll={{ x: 'max-content' }}
			tableOptions={{
				checkbox: false,
				expandableRow: false,
				favorite: true,
				pagination: true,
				isMenuOptions: false
			}}
			onChange={(e) => setCurrentPaginationInfo(e)}
		/>
	);
};

export default Listing;
