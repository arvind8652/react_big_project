import React, { useState } from 'react';
import { Table, Popover, Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisHAlt, faPhoneAlt } from '@fortawesome/pro-light-svg-icons';
import moment from 'moment';
//import "./InteractionTable.scss";
import { useHistory } from 'react-router-dom';
import { AvatarSize } from '../../constants/AvatarSize';
import AvatarLogo from '../Avatar/AvatarLogo';
import Modal from 'antd/lib/modal/Modal';
import SuccessModal from '../SuccessModal/SuccessModal';
import FailModal from '../Modal/FailModal/FailModal';
import { updateCloseOccurrenceApi } from '../../api/interactionViewApi';
import { executeGetAllInteractionData } from '../../redux/actions/interactionListingActions';
import { connect } from 'react-redux';
import CloseInteraction from '../../screens/InteractionViewScreen/InteractionModal/CloseIteractionModal';
// const InterationData = {
//     activityDate: "15 Jan 2021",
//     name: "Peter Dudchenko",
//     family: "Sandralock Family",
//     id: "BD190048",
//     tagName: "Wealth",
//     secondaryTag: "Mutual Fund",
//     add: "Central ave",
//     city: "Albany",
//     subject
//     followUpActivityStatus
// }
export const BANKDETAILS_DATA_M = [
	{
		key: '0',
		subject: 'Hi',
		followUpActivityStatus: 'Active',
		activityDate: '12 Jan 2021',
		activityPurposeName: 'ABC',
		interactionTypeName: 'DEF',
		clientProspectName: 'AAA',
		tagName: 'Wealth'
	},
	{
		key: '1',
		subject: 'Hi',
		followUpActivityStatus: 'Active',
		activityDate: '12 Jan 2021',
		activityPurposeName: 'ABC',
		interactionTypeName: 'DEF',
		clientProspectName: 'AAA',
		tagName: 'Wealth'
	}
];
const PortfolioInteractionTable = ({
	loading,
	onCellDefault,
	selectedRows,
	setSelectedRows,
	selectedRowKeys,
	setSelectedRowKeys,
	tableData = BANKDETAILS_DATA_M,
	setLocalInteractionData,
	setLoading,
	executeGetAllInteractionData,
	dataObject
}) => {
	// render table columns
	const history = useHistory();
	const [showSelectAllofAllPrompt, setShowSelectAllofAllPrompt] = useState(false);
	const [showCloseInteractionModal, setShowCloseInteractionModal] = useState(false);
	const [selectedInteraction, setSelectedInteraction] = useState('');
	const [showSuccessModal, setShowSuccessModal] = useState(false);
	const [showFailModal, setShowFailModal] = useState(false);
	const [errorArray, setErrorArray] = useState([]);
	const renderSubjectColumn = (subject, dataObject) => {
		return (
			<div className='col-text col-interaction-name'>
				<div>{dataObject.subject}</div>
				<div className='status-tag'>{dataObject.followUpActivityStatus}</div>
			</div>
		);
	};
	const renderDueDateColumn = (activityDate, dataObject) => {
		return (
			<div className='col-text'>
				<div>{moment(dataObject.activityDate).format('DD MMM YYYY')}</div>
			</div>
		);
	};
	const renderPurposeColumn = (activityPurposeName, dataObject) => {
		return (
			<div className='col-text'>
				<div>{dataObject.activityPurposeName}</div>
			</div>
		);
	};
	const renderInteractionTypeColumn = (interactionTypeName, dataObject) => {
		return (
			<div className='col-text'>
				<div>
					<FontAwesomeIcon icon={faPhoneAlt} /> &nbsp; {dataObject.interactionTypeName}
				</div>
			</div>
		);
	};
	const renderClientProspectProfile = (clientProspectName, dataObject) => {
		return (
			<div className='col-profile'>
				<div>
					{dataObject.profileImage === null || dataObject.profileImage === 'U' ? (
						<AvatarLogo
							imgsrc={dataObject.profileImage}
							profileName={dataObject.profileInitial}
							avatarSize={AvatarSize.small}
						/>
					) : (
						<AvatarLogo
							imgsrc={dataObject.profileImage}
							profileName={dataObject.profileInitial}
							avatarSize={AvatarSize.small}
						/>
					)}
				</div>
				<div className='profile-details' style={{ paddingLeft: '8px' }}>
					<div>{dataObject.clientProspectName}</div>
					<div className='profile-tag'>
						{dataObject.tagName.charAt(0).toUpperCase() +
							dataObject.tagName.substring(1).toLowerCase()}
					</div>
				</div>
			</div>
		);
	};
	function handleCreateInteractionClick() {
		const toObject = {
			pathname: '/dashboard/MyInteractions/InteractionCreate'
		};

		history.push(toObject);
	}

	function handleCreateOpportunityClick() {
		const toObject = {
			pathname: '/dashboard/MyOpportunity/OpportunityCreate'
		};

		history.push(toObject);
	}

	const handleUpdateProspectClick = (prospectId) => {
		const toObject = {
			pathname: '/dashboard/MyProspect/ProspectCreate',
			state: { screen: 'list', data: prospectId, mode: 'edit' }
		};
		history.push(toObject);
	};

	const handleEditInteractionClick = (activityID, dataObject) => {
		const toObject = {
			pathname: '/dashboard/MyInteractions/InteractionCreate',
			state: { screen: 'list', data: activityID, mode: 'edit', dataObject }
		};

		history.push(toObject);
	};
	const handleCloseInteractionClick = (id, dataObject) => {
		setSelectedInteraction(dataObject);
		setShowCloseInteractionModal(true);
	};
	const renderMoreOptions = (id, dataObject) => {
		const options =
			dataObject.followUpActivityStatus === 'Deferred' ||
			dataObject.followUpActivityStatus === 'Cmpleted'
				? [
						'Take Note',
						'Create New Interaction',
						'Create Task',
						'Create Opportunity',
						'Update Prospect/Client'
				  ]
				: [
						'Edit',
						'Close',
						'Take Note',
						'Create New Interaction',
						'Create Task',
						'Create Opportunity',
						'Update Prospect/Client'
				  ];
		const content = () => (
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'flex-start',
					paddingLeft: '20px'
				}}
			>
				{options.map((option, index) => (
					<div key={index} className='row-action-option'>
						<span
							onClick={() => {
								setSelectedRowKeys([...selectedRowKeys, id]);
								setSelectedRows([...selectedRows, dataObject]);
								option.toLowerCase() === 'edit' && handleEditInteractionClick(id, dataObject);
								option.toLowerCase() === 'close' && handleCloseInteractionClick(id, dataObject);
								option.toLowerCase() === 'create new interaction' && handleCreateInteractionClick();
								option.toLowerCase() === 'create opportunity' && handleCreateOpportunityClick();
								option.toLowerCase() === 'update prospect/client' && handleUpdateProspectClick();
							}}
						>
							{option}
						</span>
					</div>
				))}
			</div>
		);
		return (
			<div className='col-more'>
				<Popover
					placement='bottomLeft'
					content={content}
					overlayClassName='interaction-listing-actions-popover'
				>
					<FontAwesomeIcon icon={faEllipsisHAlt} size='2x' className='row-actions-menu-icon' />
				</Popover>
			</div>
		);
	};
	const columns = [
		{
			//      width: 324,
			title: 'Subject',
			dataIndex: 'subject',
			key: 'subject',
			onCell: onCellDefault,
			render: (subject, dataObject) => renderSubjectColumn(subject, dataObject)
		},
		{
			// width: 200,
			title: 'Type',
			dataIndex: 'interactionTypeName',
			key: 'interactionTypeName',
			onCell: onCellDefault,
			render: (interactionTypeName, dataObject) =>
				renderInteractionTypeColumn(interactionTypeName, dataObject)
		},
		{
			// width: 200,
			title: 'Due Date',
			dataIndex: 'activityDate',
			key: 'activityDate',
			onCell: onCellDefault,
			render: (activityDate, dataObject) => renderDueDateColumn(activityDate, dataObject)
		},
		{
			title: 'Purpose',
			key: 'activityPurposeName',
			dataIndex: 'activityPurposeName',
			onCell: onCellDefault,
			render: (activityPurposeName, dataObject) =>
				renderPurposeColumn(activityPurposeName, dataObject)
		},
		{
			float: 'left',
			title: 'Client / Prospect Name',
			dataIndex: 'clientProspectName',
			key: 'clientProspectName',
			// width: 304,
			onCell: onCellDefault,
			render: (clientProspectName, dataObject) =>
				renderClientProspectProfile(clientProspectName, dataObject)
		},
		{
			title: '',
			dataIndex: 'id',
			key: 'id',
			render: (id, dataObject) => renderMoreOptions(id, dataObject)
		}
	];
	// const rowSelection = {
	//     onChange: (rowKeys, rows) => {
	//         setSelectedRowKeys(rowKeys);
	//         setSelectedRows(rows);
	//     },
	//     onSelectAll: (enabled) => {
	//         if (enabled) {
	//             setShowSelectAllofAllPrompt(true);
	//         } else {
	//             setShowSelectAllofAllPrompt(false);
	//             setSelectedRowKeys([]);
	//             setSelectedRows([]);
	//         }
	//     },
	//     getCheckboxProps: (record) => ({
	//         disabled: record.id === "Disabled User",
	//         // Column configuration not to be checked
	//         name: record.id,
	//     }),
	//     selectedRowKeys: selectedRowKeys,
	// };
	// const selectAllRecords = () => {
	//     setSelectedRowKeys(tableData.map((item) => item.activityID));
	//     setSelectedRows(tableData);
	// };
	// const clearSelection = () => {
	//     setSelectedRowKeys([]);
	//     setSelectedRows([]);
	// };
	/**
	 * API call for Close Interaction
	 */
	// const closeInteraction = (formData) => {
	//     updateCloseOccurrenceApi(formData)
	//         .then((res) => {
	//             if (res.data.success) {
	//                 setShowSuccessModal(true);
	//             } else {
	//                 setErrorArray([
	//                     {
	//                         message: res.data.message,
	//                     },
	//                 ]);
	//                 setShowFailModal(true);
	//             }
	//         })
	//         .catch((err) => {
	//         });
	// }
	// const handleFailModalOkOrCancel = () => {
	//     setShowFailModal(false);
	// };
	// const onOkSuccessModal = () => {
	//     executeGetAllInteractionData(setLocalInteractionData, setLoading);
	//     setSelectedRowKeys([]);
	//     setSelectedRows([]);
	//     setShowSuccessModal(false);
	//     const toObject = {
	//         pathname: '/dashboard/MyInteractions'
	//     }
	//     history.push(toObject);
	// }
	return (
		<div className='interaction-table-container'>
			{showCloseInteractionModal ? (
				<CloseInteraction
					showCloseInteractionModal={showCloseInteractionModal}
					setShowCloseInteractionModal={setShowCloseInteractionModal}
					//closeInteractionApi={closeInteraction}
					selectedInteraction={selectedInteraction}
					setSelectedRowKeys={setSelectedRowKeys}
					setSelectedRows={setSelectedRows}
				/>
			) : (
				''
			)}
			{/* <Modal
                visible={showSuccessModal}
                closable={false}
                footer={[
                    <Button
                        onClick={onOkSuccessModal}
                    >
                        OK
          </Button>,
                ]}
                centered
            >
                <SuccessModal message="Action Completed Successfully" />
            </Modal> */}
			{/* <FailModal
                visible={showFailModal}
                onOk={handleFailModalOkOrCancel}
                onCancel={handleFailModalOkOrCancel}
                errorArray={errorArray}
            /> */}
			{/* {selectedRowKeys.length > 0 && (
                <span className="selected-record-count">
                    {showSelectAllofAllPrompt ? (
                        <>
                            <div>
                                All {selectedRowKeys.length} Records on this page are
                                selected.&nbsp;
              </div>
                            {selectedRowKeys.length !== tableData.length ? (
                                <Button
                                    type="link"
                                    className="link"
                                    onClick={() => {
                                        selectAllRecords();
                                    }}
                                    style={{ padding: 0 }}
                                >
                                    Select all {tableData.length} Records
                </Button>
                            ) : (
                                    <Button
                                        type="link"
                                        className="link"
                                        onClick={() => {
                                            clearSelection();
                                        }}
                                        style={{ padding: 0 }}
                                    >
                                        Clear Selection
                </Button>
                                )}
                        </>
                    ) : (
                            <div>
                                {selectedRowKeys.length} Record
              {selectedRowKeys.length > 1 ? "s" : " "}
                                &nbsp;on this page {selectedRowKeys.length > 1
                                    ? "are"
                                    : "is"}{" "}
                                selected.&nbsp;
            </div>
                        )}
                </span>
            )} */}
			<Table
				loading={loading}
				rowClassName='interaction-list-table-row'
				rowKey='id'
				//rowSelection={rowSelection}
				columns={columns}
				dataSource={tableData}
				// pagination={{
				//     position: ["topRight"],
				//     pageSize: 25,
				//     showSizeChanger: false,
				// }}
			/>
		</div>
	);
};
export default PortfolioInteractionTable;
