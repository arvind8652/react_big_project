// built-in imports
import React, { useEffect, useRef, useState } from 'react';
import { Typography, Card, Table } from 'antd';

// internal imports
import { getDocumentDetails } from '../../../api/customerCreateApi';
import DocumentsDetailsFormCard from '../DocumentsDetailsFormCard/DocumentsDetailsFormCard';
import AttachmentFormModal from './AttachmentFormModal';
import { downloadDocument } from '../../../utils/utils';

// external import
import moment from 'moment';
import { downloadAttachment } from '../../../utils/utils';

export default function DocumentsDetail({
	form = {},
	formData = {},
	onValuesChange,
	rules = undefined,
	removeAttachment = () => {},
	csObject = {},
	action = '',
	showUploadButton = true,
	showNoData = false,
	documentRequestObject,
	setDocumentRequiredField = {},
	documentRequiredField = {},
	checkDocMandatory = () => {},
	type = null
}) {
	const updateRequestObject = (uploadedDocInfo, latestRowData = []) => {
		let withDocIdRecord = [];
		if (uploadedDocInfo) {
			let documentInfoData = uploadedDocInfo;
			documentInfoData?.sort((a, b) => {
				if (a?.documentType < b?.documentType) {
					return -1;
				}
				if (a?.documentType > b?.documentType) {
					return 1;
				}
			});
			let testDocType;
			let testDocTypeCount = 0;
			if (documentInfoData?.length > 0) {
				documentInfoData?.map((item) => {
					let dataObject = {};
					for (const prop in item) {
						dataObject[`${prop}`] = item[prop];
					}
					if (
						'documentId' in dataObject &&
						dataObject?.docStatus === 'U' &&
						dataObject?.fileString !== null &&
						dataObject?.fileString !== ''
					) {
						delete dataObject?.documentId;
					}
					if (testDocType === '' || item?.documentsetupid !== testDocType) {
						testDocType = item?.documentsetupid;
						testDocTypeCount = 0;
						dataObject.sameTypeRecord = 0;
					}
					if (testDocType === item?.documentsetupid) {
						testDocTypeCount = testDocTypeCount + 1;
						dataObject.sameTypeRecord = testDocTypeCount - 1;
					}
					withDocIdRecord.push(dataObject);
				});
			}
			if (latestRowData?.length > 0 && withDocIdRecord?.length > 0) {
				let updatedData = [];
				withDocIdRecord.map((_) => {
					let valueUnMatched = false;
					latestRowData.map((itm) => {
						if (
							_?.documentsetupid === itm?.documentsetupid &&
							_?.sameTypeRecord === itm?.sameTypeRecord
						) {
							valueUnMatched = true;
						}
					});
					if (valueUnMatched) {
						updatedData.push(_);
					}
				});
				withDocIdRecord = updatedData;
			} else {
				withDocIdRecord = [];
			}
			if (editDataLoaded === false) {
				withDocIdRecord = [];
			}

			onValuesChange({ DocumentInfo: withDocIdRecord });
			return withDocIdRecord;
		}
	};

	const [rowData, setRowData] = useState([]);
	const [isModal1Visible, setModal1Visible] = useState(false);
	const [isModal2Visible, setModal2Visible] = useState(false);
	const [callDependentApi, setCallDependentApi] = useState(false);
	const [requestObject, setRequestObject] = useState([]);
	const [selectedUploadIndex, setSelectedUploadIndex] = useState(0);
	const reqObject = useRef([]);
	const [reqObjectState, setReqObjectState] = useState([]);
	const [objKeydocType, setObjKeydocType] = useState([]);
	// const [mainModalCount,setMainModalCount] = useState(0);
	const [mainModalCount, setMainModalCount] = useState(false);
	const [requestObjectbackUp, setRequestObjectbackUp] = useState([]);
	const [editDataLoaded, setEditDataLoaded] = useState(true);

	const downloadFile = (record) => {
		downloadDocument(record.documentId);
	};

	const columns = [
		{
			title: 'Type',
			key: 'documentsetupid',
			dataIndex: 'documentsetupid',
			render: (documentsetupid, record) => {
				// let name = documentType === "A" ? "Address Proof" : "Disclaimer";
				return (
					<div>
						{/* <span>{name}</span> */}
						<span>{record?.documentTypeName}</span>
						{record.docmandatory === 'Y' ? <span style={{ color: 'red' }}> *</span> : null}
					</div>
				);
			}
		},
		{
			title: 'Name',
			key: 'fileName',
			dataIndex: 'fileName',
			render: (item, record) => (
				<a
					// onClick={() =>
					//   downloadFile({
					//     file: record,
					//     id: record?.id,
					//     progName: record?.progName,
					//     recordId: record?.recordId,
					//   })
					// }
					onClick={() => downloadFile(record)}
				>
					{item}
				</a>
			)
		},
		{
			title: 'Status',
			key: 'docStatus',
			dataIndex: 'docStatus',
			render: (status) => (status === 'P' ? 'Pending' : status === 'U' ? 'Submitted' : 'Deferred')
		},
		{
			title: 'Submission Date',
			key: 'submissionDate',
			dataIndex: 'submissionDate',
			render: (sDate) => (sDate ? moment(sDate).format('DD-MM-YYYY') : null)
		},
		{
			title: 'Expiry Date',
			key: 'expiryDate',
			dataIndex: 'expiryDate',
			render: (expiryDate) => (expiryDate ? moment(expiryDate).format('DD-MM-YYYY') : null)
		},
		{
			title: 'Action Date',
			key: 'actionDate',
			dataIndex: 'actionDate',
			render: (actionDate) => (actionDate ? moment(actionDate).format('DD-MM-YYYY') : null)
		}
	];

	// const updateLatestRowWithRequest = (rowRecordData, requestRecordData) => { };

	const generateRowData = (data, data1) => {
		let count = 0;
		const modifiedRowData = [];
		// ------------------------------------------14-12-2021-----------------------
		const reqObjectStateArray = [];
		const objkeyAndValArray = [];
		// ------------------------------------------14-12-2021-----------------------
		const status = [
			{
				displayValue: 'Pending',
				dataValue: 'P',
				disabled: false
			},
			{
				displayValue: 'Submitted',
				dataValue: 'U',
				disabled: false
			},
			{
				displayValue: 'Deferred',
				dataValue: 'D',
				disabled: false
			}
		];

		reqObject.current = [];
		if (Array.isArray(data)) {
			data?.map((itm, idx) => {
				const len = itm?.noDocRequired;
				let i = 0;
				let obj = {};
				let objkeyAndVal = {};
				for (i; i < len; i++) {
					obj = {
						...itm,
						// documentType: itm?.documentType === 'A' ? 'Address Proof' : 'Disclaimer',
						status: status,
						// key: i,
						key: count,
						rowIndex: count,
						sameTypeRecord: i,
						docmandatory: itm?.docmandatory,
						documentsetupid: itm?.lstDocumentNames[0]?.documentsetupid
					};
					objkeyAndVal = {
						keyVal: count,
						documentTypeVal: itm?.documentType
					};
					modifiedRowData.push(obj);
					objkeyAndValArray.push(objkeyAndVal);

					// feed up request object with empty object
					reqObject.current.push({
						docStatus: 'P',
						rowIndex: count,
						key: count,
						docmandatory: itm?.docmandatory,
						documentsetupid: itm?.lstDocumentNames[0]?.documentsetupid,
						expiryDate: null,
						docType: itm?.documentType,
						documentTypeName: itm?.documentTypeName
					});

					// --------------------------------------------------------------14-12-2021----------------------------
					reqObjectStateArray.push({
						docStatus: 'P',
						rowIndex: count,
						docmandatory: itm?.docmandatory,
						documentsetupid: itm?.lstDocumentNames[0]?.documentsetupid,
						expiryDate: null,
						docType: itm?.documentType,
						documentTypeName: itm?.documentTypeName
					});

					count++;
				}
				setReqObjectState(reqObjectStateArray);
			});
		}
		setDocumentRequiredFieldMandatoryCount(modifiedRowData);
		setObjKeydocType(objkeyAndValArray);
		if (data1 && data1?.length > 0) {
			setRequestObject(() => updateRequestObject(data1, modifiedRowData));
		} else if (data1 === undefined) {
			// ([]);
			// if (action !== "edit") {
			//   onValuesChange({ DocumentInfo: [] });
			// }
			setRequestObject([]);
			if (action !== 'edit') {
				onValuesChange({ DocumentInfo: [] });
			}
		} else {
			// setRequestObject(formsetRequestObjectData?.DocumentInfo);
			// setRequestObject(() =>
			//   updateRequestObject(formData?.DocumentInfo, modifiedRowData)
			// );
			setRequestObject(() => updateRequestObject(formData?.DocumentInfo, modifiedRowData));
		}

		// --------------------------------------------------------03-01-2022------------------------------
		// updateLatestRowWithRequest(modifiedRowData, data1);
		return modifiedRowData;
	};

	// ------------------------------------------------start document mandatory-------------------------------
	const setDocumentRequiredFieldMandatoryCount = (data) => {
		let mandatoryCountVal = 0;
		let requiredVal = false;
		data.map((_) => {
			if (_.docmandatory === 'Y') {
				mandatoryCountVal += 1;
			}
		});
		if (mandatoryCountVal > 0) {
			requiredVal = true;
		}
		// if (type === 'CLIENTREQADD' || 'ORDERBOOK' || 'ACCOUNTREQADD') {
		if (type === 'CLIENTREQADD' || 'ORDERBOOK' || 'ACCOUNTREQADD' || 'PROSPECTADD') {
			setDocumentRequiredField({
				mandatoryCount: mandatoryCountVal,
				required: requiredVal,
				showAlertMessage: false
			});
		}
	};
	// ------------------------------------------------end document mandatory-------------------------------

	const getDocumentRow = async () => {
		try {
			const res = await getDocumentDetails(documentRequestObject);
			setRowData(
				generateRowData(res.data?.documentDetailsModel, res.data?.uploadedDocInfo?.lstDocumentInfo)
			);
		} catch (error) {}
	};

	useEffect(() => {
		getDocumentRow();
		return () => {
			reqObject.current = [];
			setRequestObject([]);
		};
	}, [documentRequestObject]);

	useEffect(() => {
		if (action === 'edit' && mainModalCount === true) {
			// alert('123');
		}
	}, [mainModalCount]);

	return (
		<Card
			title='Documents Details'
			className={requestObject?.length > 0 || showNoData ? 'card-body' : 'no-card-body'}
			extra={
				<Typography.Title
					level={5}
					onClick={() => {
						setModal1Visible(true);
					}}
				>
					{showUploadButton && (
						<Typography.Link>
							{Array.isArray(requestObject) && requestObject?.length > 0 ? 'Edit' : '+ Add'}
						</Typography.Link>
					)}
				</Typography.Title>
			}
		>
			<AttachmentFormModal
				form={form}
				formData={formData}
				onValuesChange={onValuesChange}
				isModal1Visible={isModal1Visible}
				setModal1Visible={setModal1Visible}
				setModal2Visible={setModal2Visible}
				isModal2Visible={isModal2Visible}
				selectedUploadIndex={selectedUploadIndex}
				setRequestObject={setRequestObject}
				reqObject={reqObject}
				setRowData={setRowData}
				// ------------------------------------------14-12-2021------------------------
				reqObjectState={reqObjectState}
				setReqObjectState={setReqObjectState}
				// ------------------------------------------14-12-2021------------------------
			/>
			<DocumentsDetailsFormCard
				isModal1Visible={isModal1Visible}
				setModal1Visible={setModal1Visible}
				setModal2Visible={setModal2Visible}
				csObject={csObject}
				form={form}
				formData={formData}
				onValuesChange={onValuesChange}
				requestObject={requestObject}
				rowData={rowData}
				setRowData={setRowData}
				setRequestObject={setRequestObject}
				setSelectedUploadIndex={setSelectedUploadIndex}
				reqObject={reqObject}
				action={action}
				documentRequiredField={documentRequiredField}
				setDocumentRequiredField={setDocumentRequiredField}
				checkDocMandatory={checkDocMandatory}
				// ------------------------------------------14-12-2021------------------------
				reqObjectState={reqObjectState}
				setReqObjectState={setReqObjectState}
				setObjKeydocType={setObjKeydocType}
				objKeydocType={objKeydocType}
				setMainModalCount={setMainModalCount}
				mainModalCount={mainModalCount}
				// ------------------------------------------14-12-2021------------------------
				setRequestObjectbackUp={setRequestObjectbackUp}
				requestObjectbackUp={requestObjectbackUp}
				setEditDataLoaded={setEditDataLoaded}
				editDataLoaded={editDataLoaded}
			/>
			{(requestObject?.length > 0 || showNoData) && (
				<Table
					key={requestObject?.documentId}
					columns={columns}
					dataSource={requestObject}
					pagination={false}
				/>
			)}
		</Card>
	);
}
