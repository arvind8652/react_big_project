import { memo, useState } from 'react';
import { DatePicker, Select, Table } from 'antd';
import moment from 'moment';
import { ScButtonPrimary, ScButtonText, ScModal } from '../StyledComponents/genericElements';
import { disabledFutureDate, disabledPastDate } from '../../utils/utils';

const DocumentModal = ({
	setModal1Visible,
	isModal1Visible,
	setModal2Visible,
	onValuesChange,
	rowData,
	setRowData,
	setRequestObject,
	setSelectedUploadIndex,
	reqObject
}) => {
	const [error, setError] = useState([{ idx: -1, type: '' }]);
	const [errorMsg, setErrorMsg] = useState('');

	const hideModal = () => setModal1Visible((prev) => !prev);

	const clearErrors = () => {
		// setError({ idx: -1, type: '' });
		setError([]);
		setErrorMsg('');
	};

	const styleSet = {
		redBorder: '1px solid red',
		errorMsg: {
			float: 'left',
			color: 'red',
			marginTop: 10,
			paddingLeft: '24px'
		}
	};

	const handleOnDocumentNameChange = (value, rowValues, parentRowIdx) => {
		clearErrors();
		const expiryYN = rowValues.lstDocumentNames.find(
			(item) => item.docNameDataValue === value
		)?.expiryYN;
		const newRequestObject = reqObject.current[parentRowIdx];

		newRequestObject.docNameDataValue = value;
		newRequestObject.expiryYN = expiryYN;
		newRequestObject.srlNo = parentRowIdx + 1;
		newRequestObject.documentType = rowValues.documentType;
		newRequestObject.noDocRequired = rowValues.noDocRequired;

		const modifiedRowData = rowData?.map((item, idx) => {
			if (idx !== parentRowIdx) {
				return {
					...item,
					// disabled other row doucment name which is currently selected
					lstDocumentNames: item.lstDocumentNames.map((obj) => {
						if (obj.docNameDataValue === value) {
							return {
								...obj,
								disabled: true
							};
						} else {
							return {
								...obj,
								disabled: false
							};
						}
					})
				};
			} else if (parentRowIdx === idx) {
				return {
					...item,
					// find update expiry date  based on selected document
					isExpiryDisable: rowValues.lstDocumentNames.find((obj) => obj.docNameDataValue === value)
						.expiryYN
				};
			}
			return item;
		});

		setRowData(modifiedRowData);
	};

	const handleOnStatusChange = (value, parentRowIdx) => {
		clearErrors();

		const newRequestObject = reqObject.current[parentRowIdx];

		newRequestObject.docStatus = value;

		if (value === 'D') {
			newRequestObject.isDeferred = 'Y';
		} else {
			newRequestObject.isDeferred = 'N';
		}

		const modifiedRowData = rowData?.map((item, idx) => {
			if (parentRowIdx === idx) {
				return {
					...item,
					showActionDate: value === 'D' ? true : false
				};
			}
			return item;
		});

		setRowData(modifiedRowData);
	};

	const handleDateChange = (value, parentRowIdx, key) => {
		clearErrors();

		const newRequestObject = reqObject.current[parentRowIdx];

		if (value) {
			if (moment(value).isValid()) {
				newRequestObject[key] = moment(value).format('YYYY-MM-DD');
			}
		} else {
			newRequestObject[key] = null;
		}
	};
	const handleUpload = (_, rowValues, parentRowIndex) => {
		clearErrors();

		const newRequestObject = reqObject.current[parentRowIndex];

		const docStatus = newRequestObject.docStatus;

		const docName = newRequestObject.docNameDataValue;

		const submissionDate = newRequestObject.submissionDate;

		const shouldExpiryDateSelected = newRequestObject.expiryYN === 'Y' ? true : false;
		const expiryDate = newRequestObject.expiryDate;

		const actionDate = newRequestObject.actionDate;

		if (
			isValidTable(
				docStatus,
				docName,
				submissionDate,
				shouldExpiryDateSelected,
				expiryDate,
				actionDate,
				parentRowIndex
			)
		) {
			hideModal();
			setSelectedUploadIndex(parentRowIndex);
			setModal2Visible(true);
		}
	};

	const isValidTable = (
		docStatus,
		docName,
		submissionDate,
		shouldExpiryDateSelected,
		expiryDate,
		actionDate,
		rowIndex
	) => {
		if (docStatus !== 'U') {
			setError((prev) => {
				const newError = prev;
				newError[rowIndex] = { idx: rowIndex, docStatus: true };
				return newError;
			});

			setErrorMsg('Please select status as Uploaded to upload file');
			return false;
		}

		if (docStatus !== 'P' && !docName) {
			setError((prev) => {
				const newError = prev;
				newError[rowIndex] = { idx: rowIndex, docName: true };
				return newError;
			});
			setErrorMsg('Document Name is mandatory for status rather than Pending');
			return false;
		}

		if (!submissionDate) {
			setError((prev) => {
				const newError = prev;
				newError[rowIndex] = { idx: rowIndex, submissionDate: true };
				return newError;
			});
			setErrorMsg('Please select Submission Date to upload file');
			return false;
		}

		if (shouldExpiryDateSelected && !expiryDate) {
			setError((prev) => {
				const newError = prev;
				newError[rowIndex] = { idx: rowIndex, expiryDate: true };
				return newError;
			});
			setErrorMsg('Please select Expiry Date to upload file');
			return false;
		}

		if (docStatus === 'D' && !actionDate) {
			setError((prev) => {
				const newError = prev;
				newError[rowIndex] = { idx: rowIndex, actionDate: true };
				return newError;
			});
			setErrorMsg('Please select Action Date');
			return false;
		}
		return true;
	};

	const columns = [
		{
			title: 'Type',
			dataIndex: 'documentType',
			key: 'documentType',
			width: '19%',
			render: (documentType, record) => {
				let name = documentType === 'A' ? 'Address Proof' : 'Disclaimer';
				return (
					<div>
						<span>{name}</span>
						{record.docmandatory === 'Y' ? <span style={{ color: 'red' }}> *</span> : null}
					</div>
				);
			}
		},
		{
			title: 'Document Name',
			dataIndex: 'lstDocumentNames',
			key: 'lstDocumentNames',
			width: '10%',
			render: (documentsName, record, parentRowIdx) => (
				<Select
					value={rowData[parentRowIdx]?.documentNameValue}
					placeholder='Select Document'
					style={{
						width: '100%',
						border:
							error[parentRowIdx]?.docName === true && error[parentRowIdx]?.idx === parentRowIdx
								? styleSet.redBorder
								: ''
					}}
					onChange={(value) => {
						handleOnDocumentNameChange(value, record, parentRowIdx);
						updateColumnsValue('documentNameValue', value, parentRowIdx);
					}}
				>
					{documentsName?.map((item) => (
						<Select.Option disabled={item?.disabled} value={item?.docNameDataValue}>
							{item?.docNameDisplayValue}
						</Select.Option>
					))}
				</Select>
			)
		},
		{
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
			width: '12%',
			render: (status, _, rowIdx) => {
				const { Option } = Select;
				return (
					<Select
						value={rowData[rowIdx]?.documentStatusValue}
						onChange={(value) => {
							handleOnStatusChange(value, rowIdx);
							updateColumnsValue('documentStatusValue', value, rowIdx);
						}}
						style={{
							width: '100%',
							border:
								error[rowIdx]?.idx === rowIdx && error[rowIdx]?.docStatus === true
									? styleSet.redBorder
									: ''
						}}
						defaultValue='Pending'
						placeholder='Select Status'
					>
						{status?.map((item) => (
							<Option value={item?.dataValue}>{item?.displayValue}</Option>
						))}
					</Select>
				);
			}
		},
		{
			title: 'Submission Date',
			key: 'submissionDate',
			dataIndex: 'submissionDate',
			width: '18%',
			render: (_, record, parentRowIdx) => (
				<DatePicker
					value={rowData[parentRowIdx]?.submissionDateValue}
					format='DD-MM-YYYY'
					style={{
						border:
							error[parentRowIdx]?.submissionDate === true &&
							error[parentRowIdx]?.idx === parentRowIdx
								? styleSet.redBorder
								: ''
					}}
					onChange={(val) => {
						updateColumnsValue('submissionDateValue', val, parentRowIdx);
						handleDateChange(val, parentRowIdx, 'submissionDate');
					}}
					disabledDate={disabledFutureDate}
				/>
			)
		},
		{
			title: 'Expiry Date',
			key: 'isExpiryDisable',
			dataIndex: 'isExpiryDisable',
			width: '18%',
			render: (isExpiryDisable, _, parentRowIdx) => (
				<DatePicker
					value={rowData[parentRowIdx]?.expiryDateValue}
					disabledDate={disabledPastDate}
					style={{
						border:
							error[parentRowIdx]?.expiryDate === true && error[parentRowIdx]?.idx === parentRowIdx
								? styleSet.redBorder
								: ''
					}}
					onChange={(value) => {
						updateColumnsValue('expiryDateValue', value, parentRowIdx);
						handleDateChange(value, parentRowIdx, 'expiryDate');
					}}
					format='DD-MM-YYYY'
					disabled={isExpiryDisable === 'Y' ? false : true}
				/>
			)
		},
		{
			title: 'Action Date',
			dataIndex: 'showActionDate',
			key: 'showActionDate',
			width: '18%',
			render: (showActionDate, _, parentRowIdx) => {
				return showActionDate ? (
					<DatePicker
						value={rowData[parentRowIdx]?.actionDateValue}
						style={{
							border:
								error[parentRowIdx]?.actionDate === true &&
								error[parentRowIdx]?.idx === parentRowIdx
									? styleSet.redBorder
									: ''
						}}
						disabledDate={disabledPastDate}
						onChange={(value) => {
							updateColumnsValue('actionDateValue', value, parentRowIdx);
							handleDateChange(value, parentRowIdx, 'actionDate');
						}}
						format='DD-MM-YYYY'
					/>
				) : null;
			}
		},
		{
			title: '',
			key: 'upload',
			dataIndex: 'upload',
			width: '8%',
			render: (value, _, parentRowIndex) => (
				<a
					onClick={() => {
						handleUpload(value, _, parentRowIndex);
					}}
				>
					{rowData[parentRowIndex]?.fileName ? 'Replace' : 'Upload'}
				</a>
			)
		}
	];

	const onCancel = () => {
		setError([{ idx: -1, type: '' }]);
		setErrorMsg('');
		// clearRowData();
		// setRequestObject([]);
		hideModal();
		// setRequestObject([]);
	};

	const updateColumnsValue = (key, value, rowIndex) => {
		setRowData((prevRowData) => {
			const newPrevRowData = [...prevRowData];
			newPrevRowData[rowIndex][key] = value;
			return prevRowData;
		});
	};

	//   const clearRowData = () => {
	//     const newRowData = rowData?.map((e) => ({
	//       ...e,
	//       documentNameValue: null,
	//       documentStatusValue: "P",
	//       submissionDateValue: null,
	//       expiryDateValue: null,
	//       actionDateValue: null,
	//       showActionDate: false,
	//       fileName: "",
	//     }));
	//     setRowData(newRowData);
	//     reqObject.current = reqObject.current?.map((e, i) => ({
	//       docStatus: "P",
	//       rowIndex: i,
	//       docmandatory: e.docmandatory,
	//       expiryDate: null,
	//     }));
	//   };

	const onSubmit = () => {
		let isValid = true;
		clearErrors();
		const newRequestObject =
			Array.isArray(reqObject.current) &&
			reqObject.current.filter(
				(e) => e.docmandatory === 'Y' || (e?.docmandatory === 'N' && e?.docNameDataValue)
			);

		for (let i = 0; i < newRequestObject.length; i++) {
			const e = newRequestObject[i];

			if (e?.docmandatory === 'Y') {
				if ((!e.submissionDate || !e.docNameDataValue) && e.docStatus !== 'D') {
					isValid = false;
					setError((prev) => {
						const newError = [...prev];
						newError[e.rowIndex] = {
							idx: e.rowIndex,
							docName: e.docNameDataValue ? false : true,
							submissionDate: e.submissionDate ? false : true
						};
						return newError;
					});
					setErrorMsg('Please fill all mandatory details');
				}
			}
		}

		if (!isValid) {
			return;
		}

		for (let i = 0; i < newRequestObject.length; i++) {
			const e = newRequestObject[i];
			if (e?.docmandatory === 'Y') {
				if (e.docStatus !== 'U' && e.docStatus !== 'D') {
					isValid = false;
					setError((prev) => {
						const newError = [...prev];
						newError[e.rowIndex] = {
							idx: e.rowIndex,
							docStatus: e.docStatus !== 'U' ? true : false
						};
						return newError;
					});
					setErrorMsg('Please select status as Uploaded to upload file');
					break;
				}
				if (e.docStatus === 'D') {
					if (!e.actionDate) {
						isValid = false;
						setError((prev) => {
							const newError = [...prev];
							newError[e.rowIndex] = {
								idx: e.rowIndex,
								actionDate: e.actionDate ? false : true
							};
							return newError;
						});
						setErrorMsg('Please select Action Date');
						break;
					}
				}
				if (e.docStatus !== 'D') {
					if (!e.fileName) {
						isValid = false;
						setErrorMsg('Please upload required docs');
						break;
					}
				}
			}
		}

		if (isValid) {
			setRequestObject(newRequestObject);
			onValuesChange({ lstDocumentInfo: newRequestObject });
			hideModal();
		}
	};

	return (
		<>
			<ScModal
				width='75vw'
				centered={true}
				onCancel={onCancel}
				visible={isModal1Visible}
				title='Documents Details'
				footer={[
					<span style={styleSet.errorMsg}>{errorMsg}</span>,
					<ScButtonText type='text' key='back' onClick={onCancel}>
						Cancel
					</ScButtonText>,
					<ScButtonPrimary htmlType='submit' key='submit' type='primary' onClick={onSubmit}>
						Submit
					</ScButtonPrimary>
				]}
			>
				<Table columns={columns} dataSource={rowData} pagination={false} />
			</ScModal>
		</>
	);
};

export default memo(DocumentModal);
