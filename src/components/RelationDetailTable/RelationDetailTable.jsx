import { faEdit, faTrashAlt } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ScTable } from '../StyledComponents/genericElements';
import moment from 'moment';

const RelationDetailTable = ({
	cs,
	csObject,
	dataSource,
	onValuesChange,
	toggleShowModal,
	setRelationDetailEditingFormData
}) => {
	const removeRelationDetail = (dataObject) => {
		onValuesChange({
			relationDetail: dataSource.filter(
				(item) => item.relationEmailId !== dataObject.relationEmailId
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
			dataIndex: 'relation',
			key: 'relation',
			render: (relation) => (
				<span>
					{
						csObject[
							cs
								.map((item, index) => (item.sectionName === 'Grid_Relation' ? index : false))
								.filter((indexItem) => indexItem !== false)[0]
						] &&
							csObject[
								cs
									.map((item, index) => (item.sectionName === 'Grid_Relation' ? index : false))
									.filter((indexItem) => indexItem !== false)[0]
							].Relation &&
							csObject[
								cs
									.map((item, index) => (item.sectionName === 'Grid_Relation' ? index : false))
									.filter((indexItem) => indexItem !== false)[0]
							].Relation.dropDownValue &&
							csObject
						// csObject[
						//   cs
						//     .map((item, index) =>
						//       item.sectionName === "Grid_Relation" ? index : false
						//     )
						//     .filter((indexItem) => indexItem !== false)[0]
						// ].Relation.dropDownValue.filter(
						//   (option) => option.dataValue === relation
						// )[0].displayValue
					}
				</span>
			)
		},
		{
			title: 'Date of Birth',
			dataIndex: 'dob',
			key: 'dob',
			render: (dob) => <span>{moment(dob).format('DD-MM-YYYY')}</span>
		},
		{
			title: 'Contact',
			dataIndex: 'relationMobile',
			key: 'relationMobile',
			render: (mobile, dataObject) => (
				<span>{dataObject.relationDialingCode + ' ' + dataObject.relationMobile}</span>
			)
		},
		{
			title: 'Email ID',
			dataIndex: 'relationEmailId',
			key: 'emailId',
			render: (relationEmailId) => <span>{relationEmailId}</span>
		},
		{
			title: '',
			width: 50,
			dataIndex: '',
			key: 'contact',
			render: (contact, dataObject) => (
				<span>
					<FontAwesomeIcon
						icon={faEdit}
						onClick={() => {
							setRelationDetailEditingFormData(dataObject);
							toggleShowModal();
						}}
					/>
				</span>
			)
		},
		{
			title: '',
			width: 50,
			dataIndex: '',
			key: 'contact',
			render: (contact, dataObject) => (
				<span>
					<FontAwesomeIcon
						icon={faTrashAlt}
						onClick={() => {
							removeRelationDetail(dataObject);
						}}
					/>
				</span>
			)
		}
	];
	return (
		<>
			<ScTable
				dataSource={dataSource}
				columns={columns}
				scroll={{ y: 150 }}
				backgroundColor='#F0F2FB'
				pagination={false}
			/>
		</>
	);
};

export default RelationDetailTable;
