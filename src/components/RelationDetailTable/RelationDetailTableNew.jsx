import { ScTable } from '../StyledComponents/genericElements';
import { faEdit, faTrashAlt } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
// import findIndex from "@antv/util";

const RelationDetailTableNew = ({
	cs,
	csObject,
	dataSourceNew,
	onValuesChange,
	toggleShowModal,
	setRelationDetailEditingFormData,
	relationFormFrom
}) => {
	const removeRelationDetail = (dataObject, index) => {
		onValuesChange({
			relationDetail: dataSourceNew.filter(
				(item) => JSON.stringify(item) !== JSON.stringify(dataObject)
			)
		});
	};

	const columns = [
		{
			title: 'Name',
			dataIndex: 'relationName',
			key: 'relationName',
			render: (relationName) => <span>{relationName}</span>
		},
		{
			title: 'Relationship',
			dataIndex: 'relationType',
			key: 'relationType',
			render: (relationType) => <span>{relationType}</span>
		},
		{
			title: 'Date Of Birth',
			dataIndex: 'dob',
			key: 'dob',
			// render: (dob) => <span>{moment(dob).format("DD-MM-YYYY")}</span>,
			render: (dob) => <span>{dob ? moment(dob).format('DD-MM-YYYY') : ''}</span>
		},
		{
			title: 'Contact',
			dataIndex: 'contactNumber',
			key: 'contactNumber'
		},
		{
			title: 'Email ID',
			dataIndex: 'emailId',
			key: 'emailId'
		}
	];
	let editColumn = {
		title: '',
		width: 50,
		dataIndex: '',
		key: 'contact',
		render: (contact, dataObject) => (
			<span>
				<FontAwesomeIcon
					icon={faEdit}
					onClick={() => {
						let newObject = {
							...dataObject,
							dob: dataObject?.dob ? moment(dataObject?.dob) : null
						};
						setRelationDetailEditingFormData(newObject);
						toggleShowModal();
					}}
				/>
			</span>
		)
	};
	if (relationFormFrom != 'customerCreate') {
		columns.push(editColumn);
	}
	let deleteColumn = {
		title: '',
		width: 50,
		dataIndex: '',
		key: 'contact',
		render: (contact, dataObject, index) => (
			<span>
				<FontAwesomeIcon
					icon={faTrashAlt}
					onClick={() => {
						removeRelationDetail(dataObject, index);
					}}
				/>
			</span>
		)
	};
	columns.push(deleteColumn);
	return (
		<>
			<ScTable
				columns={columns}
				dataSource={dataSourceNew}
				scroll={{ y: 150 }}
				backgroundColor='#F0F2FB'
				pagination={false}
			/>
		</>
	);
};

export default RelationDetailTableNew;
