import { React, useState, useEffect } from 'react';

import { Modal, Row, Typography, Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Space, Table } from 'antd';
import { faTimes } from '@fortawesome/pro-solid-svg-icons';
import { getCustomerSourceDetailApi } from '../../../api/customerListingApi';
import './AccountsModal.scss';
import { AvatarSize } from '../../../constants/AvatarSize';
import AvatarLogo from '../../../components/Avatar/AvatarLogo';
import { useHistory } from 'react-router-dom';

const { Title, Text } = Typography;

function AccountModal(props) {
	const history = useHistory();
	const onCellDefault = (row, rowIndex) => {
		const accountIds = props.data.map((item) => item.scheme);

		const index = [
			...props.data.map((item, index) => {
				if (item.scheme === row.scheme) {
					return index;
				} else return null;
			})
		].filter((item) => item !== null);

		const toObject = {
			pathname: 'MyAccount/accountView',
			state: {
				accountIds: accountIds,
				rowIndex: index[0],
				allAccountData: props.data,
				progName: 'ACCOUNTADD',
				action: 'clientView'
			}
		};
		return {
			onClick: (event) => {
				history.push(toObject);
			} // click row
		};
	};

	const renderAccountTagName = (accountName, dataObject) => {
		if (!dataObject) return null;

		return (
			<Space>
				{/* {props.data.img && (
          <img
            src={props.data.img}
            className="card-img"
            style={{ width: "50px" }}
            alt="user-img"
          />
        )} */}

				<Space direction='vertical' size={0}>
					<Text style={{ fontWeight: '600' }}>{accountName}</Text>
					<Text
						className='medium-text-secondary'
						style={{
							color: '#696A91',
							fontSize: '14px',
							wordWrap: 'unset'
						}}
					>
						{dataObject.scheme}
					</Text>
					{dataObject.accountNature && (
						<Text
							style={{
								backgroundColor: '#F0F2FB',
								color: '#354081',
								padding: '2px 10px',
								borderRadius: '20px',
								fontSize: '14px',
								marginRight: '2px'
							}}
						>
							{dataObject.accountNature}
						</Text>
					)}
				</Space>
			</Space>
		);
	};

	const renderGoalImageInitials = (goals) => {
		if (!goals) return null;
		return (
			<Space size={4}>
				{goals.length !== 0 &&
					goals.slice(0, 2).map((item, index) => {
						return (
							item.dataValue && (
								<div
									title={item.dataValue}
									key={index}
									style={{
										background: '#F0F2FB',
										padding: '10px',
										borderRadius: '50%',
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center'
									}}
								>
									{item.dataValue}
								</div>
							)
						);
					})}
				{goals.length > 2 ? (
					<span
						style={{
							width: '30px',
							height: '30px',
							borderRadius: '50%',
							backgroundColor: '#F0F2FB',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center'
						}}
					>
						<Text style={{ fontSize: '12px' }}>+{goals.length - 2}</Text>
					</span>
				) : (
					''
				)}
			</Space>
		);
	};

	const RenderCustomerDetail = ({ dataObject }) => {
		const [sourceDetail, setSourceDetail] = useState();

		useEffect(() => {
			if (dataObject && dataObject.clientId) {
				getCustomerSourceDetailApi(dataObject.clientId).then((res) => {
					setSourceDetail(res.data);
				});
			}
		}, [dataObject]);

		// if (!dataObject || !sourceDetail) return <>loading...</>;

		return sourceDetail ? (
			<Space>
				<div>
					<AvatarLogo
						imgsrc={sourceDetail.profileImage}
						profileName={sourceDetail.profileInitial}
						avatarSize={AvatarSize.small}
					/>
					{/* {sourceDetail.profileImage ? (
            <Avatar
              size={64}
              className="avatar"
              style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
              icon={
                <img
                  src={`data:image/jpeg;base64,${sourceDetail.profileImage}`}
                  alt="img"
                />
              }
            />
          ) : (
            <Avatar size={80}>{sourceDetail.profileInitial}</Avatar>
          )} */}
				</div>
				<Space direction='vertical' size={0}>
					<Text style={{ fontWeight: '600' }}>{sourceDetail.name}</Text>
					{(sourceDetail.recordId || sourceDetail.familyName) && (
						<Text
							style={{
								color: '#696A91',
								fontSize: '12px',
								wordWrap: 'unset'
							}}
						>{`${sourceDetail.recordId} | ${sourceDetail.familyName}`}</Text>
					)}
					{sourceDetail.customerCategory && (
						<Text
							style={{
								backgroundColor: '#F0F2FB',
								color: '#354081',
								padding: '2px 10px',
								borderRadius: '20px',
								fontSize: '14px',
								marginRight: '2px'
							}}
						>
							{sourceDetail.customerCategory}
						</Text>
					)}
				</Space>
			</Space>
		) : (
			<>Loading</>
		);
	};

	const JointFamilyImageInitials = (props) => {
		return (
			<Space size={4}>
				{props.data.length !== 0 &&
					props.data.slice(0, 2).map((item, index) => {
						return item.isImageAvailable ? (
							<img
								key={index}
								src={item.profileImage}
								alt='logo'
								style={{
									borderRadius: '50%',
									height: '28px',
									width: '28px',
									marginRight: '5px'
								}}
							/>
						) : (
							<div
								key={index}
								style={{
									width: '28px',
									height: '28px',
									background: '#F0F2FB',
									padding: '10px',
									borderRadius: '50%',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center'
								}}
							>
								{item.profileInitials}
							</div>
						);
					})}
				{props.data.length > 2 ? (
					<span
						style={{
							width: '30px',
							height: '30px',
							borderRadius: '50%',
							backgroundColor: '#F0F2FB',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center'
						}}
					>
						<Text style={{ fontSize: '12px' }}>+{props.data.length - 2}</Text>
					</span>
				) : (
					''
				)}
			</Space>
		);
	};

	const accountColumns = [
		{
			title: 'Account Name',
			dataIndex: 'accountName',
			onCell: onCellDefault,
			render: (accountName, dataObject) => renderAccountTagName(accountName, dataObject)
		},
		{
			title: 'Investment Values',
			dataIndex: 'investmentValue',
			onCell: onCellDefault,
			render: (investmentValue, dataObject) => (
				<Text className='medium-text-secondary'>
					{dataObject.currencySymbol ? dataObject.currencySymbol : ''} {investmentValue}
				</Text>
			)
		},
		{
			title: 'Risk Profile',
			dataIndex: 'category',
			onCell: onCellDefault,
			render: (data) => <Text className='medium-text-secondary'>{data}</Text>
		},
		// {
		//   title: "Linked Goals",
		//   dataIndex: "goalCapture",
		//   render: (goals) => renderGoalImageInitials(goals),
		// },
		{
			title: 'Account Holding',
			dataIndex: 'holdingPatternName',
			onCell: onCellDefault,
			render: (holdingPatternName, dataObject) => {
				return dataObject?.isSingle ? (
					<Text className='medium-text-secondary'>{holdingPatternName}</Text>
				) : (
					<Space direction='vertical' size={2}>
						<Text className='medium-text-secondary'>{holdingPatternName}</Text>
						<JointFamilyImageInitials data={dataObject.lstJointDetails} />
					</Space>
				);
			}
		},

		// {
		//   title: "Account Holding",
		//   dataIndex: "isSingle",
		//   render: (isSingle, dataObject) => {
		//     return isSingle ? (
		//       <Text className="medium-text-secondary">Single</Text>
		//     ) : (
		//       <Space direction="vertical" size={2}>
		//         <Text className="medium-text-secondary">Joint &nbsp;(Anyone)</Text>
		//         <JointFamilyImageInitials data={dataObject.lstJointDetails} />
		//       </Space>
		//     );
		//   },
		// },
		{
			title: 'Primary Holder',
			onCell: onCellDefault,
			dataIndex: '',
			render: (dataObject) => {
				return <RenderCustomerDetail dataObject={dataObject} />;
			}
		}
	];
	if (!props.data) {
		return null;
	}
	return (
		<Modal
			centered
			visible={props.show}
			onCancel={() => props.setShow(false)}
			closeIcon={<></>}
			footer={null}
			className='modal-container'
			width='auto'
		>
			<Row justify='space-between' className='modal-title-container'>
				<Title className='modal-title'>Accounts</Title>
				<Button type='text' className='modal-close-btn'>
					<FontAwesomeIcon icon={faTimes} size='2x' color='#354081' />
				</Button>
			</Row>

			<Table
				className='modal-table-container'
				rowKey='props.data.scheme'
				columns={accountColumns}
				pagination={false}
				dataSource={props.data}
			/>
		</Modal>
	);
}

export default AccountModal;
