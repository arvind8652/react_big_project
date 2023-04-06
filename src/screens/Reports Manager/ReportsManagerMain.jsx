import React, { useState, useEffect } from 'react';

import { useHistory, useLocation } from 'react-router-dom';
import { Form, Row, Col, Button } from 'antd';
import ReportManagerFilter from './ReportManagerFilter';
import ReportTableFilter from './ReportTableFilter';
import ReportTableView from './ReportTableView';
import { executePostSaveReportManager } from '../../redux/actions/reportsActions/reportsActions';
import {
	executePostArchiveReportManager,
	executePostDeleteReportManager
} from '../../redux/actions/reportsActions/reportsActions';
import {
	executeTableReportManager,
	executeGetLeftPanelData,
	executePostRegenerateReportManager
} from '../../redux/actions/reportsActions/reportsActions';

import SuccessModal from '../../components/SuccessModal/SuccessModal';
import WarningModal from '../../components/WarningModal/WarningModal';
import Modal from 'antd/lib/modal/Modal';
import CustomModal from '../../components/Modal/CustomModal/CustomModal';
import { faTrashAlt, faArchive } from '@fortawesome/pro-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import moment from 'moment';
import ReportScreenTopbar from './ReportScreenTopbar';
import { postDownloadReportManager } from '../../api/reportsApi/reportsApi';

const ReportsManagerMain = (props) => {
	const { listData, leftPanelReduxData, customerInfoReduxData } = props;

	const defaultAdvState = { Dropdown: {}, Multiselect: {} };

	const [form] = Form.useForm();
	const [oneTimeFormData, setOneTimeFormData] = useState([]);
	const [formData, setFormData] = useState([]);
	const [leftPanelData, setLeftPanelData] = useState();
	const [localTableData, setLocalTableData] = useState(listData);
	const [selectedRecord, setSelectedRecord] = useState([]);
	const [selectedRecordId, setSelectedRecordId] = useState([]);
	const [selectedRecordStatus, setSelectedRecordStatus] = useState([]);
	const [deleteRec, setDeleteRec] = useState();
	const [finalData, setFinalData] = useState([]);
	const [errorArray, setErrorArray] = useState([]);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showArchiveModal, setShowArchiveModal] = useState(false);
	const [showWarningModal, setShowWarningModal] = useState(false);
	const [deleteFailedArray, setDeleteFailedArray] = useState();

	const [requiredFiled, setRequiredFiled] = useState(false);
	const [showFailModal, setShowFailModal] = useState(false);

	const [showSuccessModal, setShowSuccessModal] = useState(false);
	const [advancedFilterVal, setAdvancedFilterVal] = useState([]);
	const [reportName, setReportName] = useState({
		reportId: null,
		progName: null,
		particularReportName: 'Report'
	});
	const [clearColumnNames, setClearColumnNames] = useState('');
	const [isRequiredField, setIsRequiredField] = useState([]);
	const [oneTimeSetIsRequiredField, setOneTimeSetIsRequiredField] = useState([]);
	const [latestField, setLatestField] = useState({ keyField: '', value: '' });

	// states
	const [tableData, setTableData] = useState([]);
	const [advFilter, setAdvFilters] = useState(defaultAdvState);
	const [showRequiredError, setShowRequiredError] = useState(false);
	const [customerInfo, setCustomerInfo] = useState(customerInfoReduxData);
	const [generateButtonDisable, setGenerateButtonDisable] = useState(true);
	const [loading, setLoading] = useState(true);

	const history = useHistory();
	const location = useLocation();

	useEffect(() => {
		executeTableReportManager(setLoading);
		executeGetLeftPanelData();
	}, []);

	useEffect(() => {
		setLocalTableData(listData);
	}, [listData]);

	useEffect(() => {
		Object.values(leftPanelReduxData).filter((data) => {
			if (data.title === 'Report Manager') {
				setLeftPanelData(data);
			}
		});
	}, [leftPanelReduxData]);

	const regenerateReportHandler = async (queueId) => {
		let queueId1 = queueId.split(',');
		let resp = await executePostRegenerateReportManager(queueId1);
		listRefreshHandler();
	};

	const listRefreshHandler = () => {
		executeTableReportManager(setLoading);
		setSelectedRecord([]);
		setSelectedRecordStatus([]);
		setSelectedRecordId([]);
	};

	// start for download
	const downloadFile = async (selectedRows, format = 'XLSX') => {
		try {
			const postObject = {
				data: {
					// Id: "175",
					// Id: selectedRows
					Id: selectedRows
				},
				responseType: 'arraybuffer'
			};
			let resp = await postDownloadReportManager(postObject);
			createAndDownloadBlobFile(resp.data, 'report', format.toLowerCase());
		} catch (error) {
			console.log(error);
			alert('Unable to downaload file ');
		}
	};

	function createAndDownloadBlobFile(body, filename, extension) {
		const blob = new Blob([body], { type: 'application/octet-stream' });
		const fileName = `${filename}.${extension}`;
		if (navigator.msSaveBlob) {
			// IE 10+
			navigator.msSaveBlob(blob, fileName);
		} else {
			const link = document.createElement('a');
			// Browsers that support HTML5 download attribute
			if (link.download !== undefined) {
				const url = URL.createObjectURL(blob);
				link.setAttribute('href', url);
				link.setAttribute('download', fileName);
				link.style.visibility = 'hidden';
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
			}
		}
	}
	// end for download

	// start download click button of filter
	const downloadSelectedHandler = () => {
		selectedRecordId.map((data) => {
			downloadFile(data.id, data.format);
			// downloadFile(data.id, 'XLSX')
		});
	};
	// start download click button of filter

	// start save record
	const onChangeHandler = (keyField, value) => {
		let fromDate;
		let toDate;
		let newFormData = [...formData];
		let updatedFormData = newFormData.filter((data) => {
			return Object.keys(data)[0] !== keyField;
		});

		let updatedDataValue = { [keyField]: value };

		updatedFormData.push(updatedDataValue);

		setFormData(updatedFormData);
		setLatestField({ keyField: keyField, value: value });
		setShowRequiredError(false);
	};

	//start isRequired
	const isRequiredHandler = (keyField, value) => {
		let a = [];
		formData.map((data) => {
			if (oneTimeSetIsRequiredField.includes(Object.keys(data)[0])) {
				if (Object.values(data)[0] != '' && Object.values(data)[0] != undefined) {
				} else {
					a.push(Object.keys(data)[0]);
				}
			} else {
			}
		});
		setIsRequiredField(a);
	};

	useEffect(() => {
		isRequiredHandler(latestField.keyField, latestField.value);
	}, [formData]);

	// end isRequired

	useEffect(() => {
		setIsRequiredField(oneTimeSetIsRequiredField);
	}, [showSuccessModal]);

	// start check isRequired field
	const checkIsRequiredHandler = () => {
		let a = [];
		formData.map((data) => {
			if (isRequiredField.includes(Object.keys(data)[0])) {
				if (Object.values(data)[0] != '' && Object.values(data)[0] != undefined) {
				} else {
					a.push(Object.keys(data)[0]);
				}
			} else {
			}
		});
		setIsRequiredField(a);

		if (isRequiredField.length === 0) {
			handleFormSubmit();
			// handleFinalFormData()
		} else {
			setShowRequiredError(true);
		}
	};

	// end check isRequired field

	// start clearFormData
	const onClearColumn = (clearColumnData) => {
		let newFormData = [...formData];
		let arrayData = clearColumnData.split(',');
		let updatedFormData = newFormData.filter((data) => {
			if (!arrayData.includes(Object.keys(data)[0])) {
				return data;
			}
		});
		arrayData.forEach((element) => {
			updatedFormData.push({ [element]: [] });
		});
		setFormData(updatedFormData);
		setClearColumnNames('');
	};

	useEffect(() => {
		if (clearColumnNames != '' && clearColumnNames != null) {
			onClearColumn(clearColumnNames);
		}
	}, [formData]);
	// end clearFormData

	// start for record detail selected
	const onRowSelections = (data) => {
		let selectedkey = [];
		let selectedKeyId = [];
		let selectedStatus = [];
		data.map((element) => {
			selectedkey.push(element.key);
			selectedStatus.push(element.status);
			if (element.status === 'COMPLETED') {
				// selectedKeyId.push(element.id);
				selectedKeyId.push({ ['id']: element.id, ['format']: element.format });
			}
		});
		setSelectedRecordId(selectedKeyId);
		setSelectedRecord(selectedkey);
		setSelectedRecordStatus(selectedStatus);
	};
	// end record detail selected

	// start for modals
	const handleConfirmDeleteModalOk = () => {
		executePostDeleteReportManager(selectedRecord).then((res) => {
			setShowDeleteModal(false);
			listRefreshHandler();
		});
	};

	const handleConfirmArchiveModalOk = () => {
		executePostArchiveReportManager(selectedRecord).then((res) => {
			setShowArchiveModal(false);
			listRefreshHandler();
		});
	};

	const handleModalCancel = () => {
		setShowDeleteModal(false);
		setShowArchiveModal(false);
	};

	const keyFieldsHandler = (formRecord, isRequiredFields) => {
		setFormData(formRecord);
		setOneTimeFormData(formRecord);

		setOneTimeSetIsRequiredField(isRequiredFields);
	};

	// end for modals

	// start for archive and delete button
	const checkTableRowStatus = (keyType) => {
		switch (keyType) {
			case 'archiveBtn':
				if (selectedRecordStatus.includes('QUEUED') || selectedRecordStatus.includes('PENDING')) {
					setShowWarningModal(true);
				} else {
					setShowArchiveModal(true);
				}
				break;
			case 'deleteBtn':
				if (
					selectedRecordStatus.includes('ARCHIVE') ||
					selectedRecordStatus.includes('ARCHIVED') ||
					selectedRecordStatus.includes('COMPLETED')
				) {
					setShowWarningModal(true);
				} else {
					setShowDeleteModal(true);
				}
			default:
				break;
		}
	};
	// end for archive and delete button

	// start final changes on form data
	const handleFinalFormData = () => {
		let fileTypeVal = '';
		if (formData.filter((a) => a.RPTDLDFORMAT)[0]) {
			fileTypeVal = Object.values(formData.filter((a) => a.RPTDLDFORMAT)[0]).toString();
		}
		let newFormData = [...formData];
		let expiryDateRange;
		let updatedFormData = newFormData.filter((data) => {
			if (Object.keys(data)[0] === 'ExpiringDateRange') {
				expiryDateRange = data;
			}
			return Object.keys(data)[0] !== 'ExpiringDateRange';
		});
		if (expiryDateRange && expiryDateRange['ExpiringDateRange'].length > 0) {
			updatedFormData.push({ ['FromDate']: expiryDateRange['ExpiringDateRange'][0] });
			updatedFormData.push({ ['ToDate']: expiryDateRange['ExpiringDateRange'][1] });
		}

		setFinalData({
			ReportId: reportName.reportId,
			ProgName: reportName.progName,
			FileType: fileTypeVal,
			Status: 'PENDING',
			QueueFileName: 'Report.' + fileTypeVal,
			RepParameters: JSON.stringify(updatedFormData),
			InputDateTime: moment(),
			Remarks: null
		});

		return JSON.stringify({
			ReportId: reportName.reportId,
			ProgName: reportName.progName,
			FileType: fileTypeVal,
			Status: 'PENDING',
			QueueFileName: 'Report.' + fileTypeVal,
			RepParameters: JSON.stringify(updatedFormData),
			InputDateTime: moment(),
			Remarks: null
		});
	};
	// end final changes on form data

	// start save record
	const handleFormSubmit = () => {
		form
			.validateFields()
			.then((res) => {
				executePostSaveReportManager({ data: handleFinalFormData() })
					.then((res) => {
						if (res.data.success) {
							setShowSuccessModal(true);

							listRefreshHandler();

							setFormData(oneTimeFormData);
						} else {
							setErrorArray([
								{
									message: res.data.message
								}
							]);
							setShowFailModal(true);
						}
					})
					.catch((err) => {
						console.log(err);
					});
			})
			.catch((err) => {
				setRequiredFiled(true);
			});
	};
	// end save record

	const modals = () => {
		if (showSuccessModal) {
			return <SuccessModal message='Record Saved Successfully' />;
		} else if (showWarningModal) {
			return <WarningModal message='Please select appropriate record' />;
		}
	};

	return (
		<>
			<Modal
				visible={showSuccessModal ? showSuccessModal : showWarningModal}
				closable={false}
				footer={[
					<Button
						onClick={() => {
							setShowSuccessModal(false);
							setShowWarningModal(false);
						}}
					>
						OK
					</Button>
				]}
				centered
			>
				{showSuccessModal ? (
					<SuccessModal message='Record Saved Successfully' />
				) : (
					<WarningModal message='Please select appropriate record' />
				)}
			</Modal>

			<CustomModal
				visible={showArchiveModal ? showArchiveModal : showDeleteModal}
				handleCancel={handleModalCancel}
				handleOk={showArchiveModal ? handleConfirmArchiveModalOk : handleConfirmDeleteModalOk}
			>
				<div className='modal-header' style={{ display: 'flex', alignItems: 'center' }}>
					<div className='header-icon'>
						<FontAwesomeIcon icon={showArchiveModal ? faArchive : faTrashAlt} />
					</div>
					<div className='header-title'>
						{showArchiveModal ? 'Archive Record' : 'Delete Record'}
					</div>
				</div>
				<div className='modal-body'>
					{showArchiveModal
						? 'Are you sure you want to archive this record ?'
						: 'Are you sure you want to delete this record ?'}
				</div>
				<div className='modal-footer'>
					<Button className='text-only-btn' key='back' type='text' onClick={handleModalCancel}>
						Cancel
					</Button>
					<Button
						className='submit-btn'
						key='submit'
						type='primary'
						onClick={showArchiveModal ? handleConfirmArchiveModalOk : handleConfirmDeleteModalOk}
					>
						{showArchiveModal ? 'Archive' : 'Delete'}
					</Button>
				</div>
			</CustomModal>

			<div className='reportManagerScreen'>
				<ReportScreenTopbar
					breadCrumb={reportName.particularReportName}
					cancelBtnText='Cancel'
					submitBtnText='Generate'
					disabledVal={generateButtonDisable}
					onSubmit={checkIsRequiredHandler}
				/>
				<Row>
					<Col span={24}>
						<ReportManagerFilter
							setReportName={setReportName}
							keyFieldsHandler={keyFieldsHandler}
							onChangeHandler={onChangeHandler}
							handleFormSubmit={handleFormSubmit}
							pathName={location?.pathname}
							leftPanelData={leftPanelData}
							formData={formData}
							setFormData={setFormData}
							setClearColumnNames={setClearColumnNames}
							setIsRequiredField={setIsRequiredField}
							oneTimeSetIsRequiredField={oneTimeSetIsRequiredField}
							setShowRequiredError={setShowRequiredError}
							showRequiredError={showRequiredError}
							customerInfo={customerInfo}
							setGenerateButtonDisable={setGenerateButtonDisable}
						/>
					</Col>
				</Row>
				<Row style={{ marginTop: '15px' }}>
					<Col span={24}>
						<ReportTableFilter
							checkTableRowStatus={checkTableRowStatus}
							selectedRowKeys={selectedRecord}
							localTableData={localTableData}
							setLocalTableData={setLocalTableData}
							listData={listData}
							setShowDeleteModal={setShowDeleteModal}
							setShowArchiveModal={setShowArchiveModal}
							advFilter={advFilter}
							setAdvFilters={setAdvFilters}
							listRefreshHandler={listRefreshHandler}
							downloadSelectedHandler={downloadSelectedHandler}
						/>
					</Col>
				</Row>
				<Row style={{ marginTop: '15px', borderRadius: '8px' }}>
					<Col span={24}>
						{
							<ReportTableView
								loading={loading}
								regenerateReportHandler={regenerateReportHandler}
								onRowSelection={onRowSelections}
								reportData={localTableData}
								listData={listData}
								downloadFile={downloadFile}
							/>
						}
					</Col>
				</Row>
			</div>
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		listData: state?.reportsData?.tableReportData?.reportManagers,
		leftPanelReduxData: state?.dashboard?.leftPanel,
		customerInfoReduxData: state.common.customerInfo
	};
};

export default connect(mapStateToProps)(ReportsManagerMain);
