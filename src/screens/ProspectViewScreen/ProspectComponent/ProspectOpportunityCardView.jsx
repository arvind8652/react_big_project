import { Card, Table, Layout, Space, Button, Typography } from 'antd';
import './CardView.scss';
// import { useState } from "react";
import { getDateFormat } from '../../../utils/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign, faPlus } from '@fortawesome/pro-light-svg-icons';
import moment from 'moment';
import RupeeOrNonRupee from '../../../components/RupeeOrNonRupee/RupeeOrNonRupee';
const { Content } = Layout;
const { Text } = Typography;

const ProspectOpportunityCardView = (props) => {
	const formatData = (data) => {
		return data.map((item, index) => ({
			key: index,
			subject: { name: item?.name && item?.name, status: item?.status },
			// target: item.targetAmount,
			target: { targetAmount: item?.targetAmount, currencySymbol: item?.currencySymbol },
			dueDate: item?.dueDate && moment(item?.dueDate)?.format(getDateFormat()),
			stage: item.stage
		}));
	};
	const dataSource = formatData(props.data);

	const columns = [
		{
			title: 'Opportunities',
			dataIndex: ['subject'],
			key: 'subject',
			render: (text) => {
				return (
					<Space direction='vertical' size={1}>
						{text.name}
						<Text
							className='header-badge'
							style={{
								backgroundColor: '#D9DFFF',
								color: '#354081',
								padding: '2px 10px',
								borderRadius: '20px'
							}}
						>
							{text.status}
						</Text>
					</Space>
				);
			}
		},
		{
			title: 'Target',
			dataIndex: 'target',
			key: 'target',
			render: (text) => {
				return (
					<>
						{/* <FontAwesomeIcon icon={faDollarSign} style={{ color: '#696A91', marginRight: '8px' }} /> */}
						{/* {text} */}
						{/* {`${text?.currencySymbol} `} */}
						{text?.currencySymbol} {<RupeeOrNonRupee amount={text?.targetAmount} />}
					</>
				);
			}
		},
		{
			title: 'Stage',
			dataIndex: 'stage',
			key: 'stage'
		},
		{
			title: 'Due Date',
			dataIndex: 'dueDate',
			key: 'dueDate'
		}
	];

	return (
		<>
			<Card
				bordered={false}
				title='Opportunities'
				// extra={
				//   <Button
				//     type="text"
				//     style={{ color: "#354081", fontSize: "16px" }}
				//     onClick={() => props.onAdd()}
				//   >
				//     Add <FontAwesomeIcon icon={faPlus} style={{ marginLeft: "5px" }} />
				//   </Button>
				// }
				className='opportunity-table'
				style={{ width: '100%' }}
			>
				<Content>
					{dataSource.length === 0 ? (
						<Text>No Records Found</Text>
					) : (
						<Table
							dataSource={dataSource}
							columns={columns}
							scroll={{ y: 175 }}
							pagination={false}
						/>
					)}
				</Content>
			</Card>
		</>
	);
};

export default ProspectOpportunityCardView;
