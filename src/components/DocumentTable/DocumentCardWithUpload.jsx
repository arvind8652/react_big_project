// built-in imports
import React, { useEffect, useRef, useState } from 'react';
import { Typography, Card, Table } from 'antd';
import moment from 'moment';
import '../../screens/ProspectViewScreen/ProspectComponent/CardView.scss';
import DocumentModal from './DocumentModal';
import { generateRowData } from './Utils';
import { getDocumentDetails } from '../../api/primaryMarketApi';
import DocAttachmentDetails from './DocAttachmentDetails';
import { downloadDocument } from '../../utils/utils';
import { palette, theme } from '../../theme';

// internal imports

export const DocumentCardWithUpload = (props) => {
	const {
		showUploadButton = true,
		showNoData = false,
		documentRequestObject,
		data,
		isUpload = true,
		docDetailsObj = {},
		securityList,
		setDocumentData = () => {},
		allCustomerOnboardingData = [],
		authData = '',
		action = ''
	} = props;
	const [dataSource, setDataSource] = useState([]);
	const [isModal1Visible, setModal1Visible] = useState(false);
	const [rowData, setRowData] = useState([]);
	const [requestObject, setRequestObject] = useState([]);
	const [addAttachmentModalVisible, setAddAttachmentModalVisible] = useState(false);
	const [selectedUploadIndex, setSelectedUploadIndex] = useState(0);
	const reqObject = useRef([]);
	const [docData, setDocData] = useState({});

	const [showUploadButtonVal, setShowUploadButtonVal] = useState(showUploadButton);
	const [showDocAddLink, setShowDocAddLink] = useState(true);

	const getDocumentRow = async () => {
		try {
			const res = await getDocumentDetails(docDetailsObj);
			const resp = generateRowData(res.data?.documentDetailsModel);

			setRowData(resp.modifiedRowData);
			reqObject.current.push(...resp.requstData);
		} catch (error) {
			// console.log("error", error);
		}
	};

	useEffect(() => {
		setRequestObject(data);
	}, [data]);

	useEffect(() => {
		if (action === 'view') {
			setShowUploadButtonVal(
				allCustomerOnboardingData?.workFlowFormType === 'Modificaiton' &&
					allCustomerOnboardingData?.workFlowUserGroup === authData
					? showUploadButtonVal
					: false
			);
			setShowDocAddLink(
				allCustomerOnboardingData?.workFlowFormType === 'Modificaiton' &&
					allCustomerOnboardingData?.workFlowUserGroup === authData
					? showDocAddLink
					: false
			);
		}
	}, [action]);

	useEffect(() => {
		getDocumentRow();
		return () => {
			reqObject.current = [];
		};
	}, [documentRequestObject]);

	if (!props) {
		return null;
	}
	const downloadFile = (record) => {
		downloadDocument(record.documentId);
	};

	const checkDateExpiry = (expiryDate) => {
		let toDate = new Date();
		if (new Date(expiryDate).getTime() < toDate.getTime()) {
			return 'Expired';
		}
		return 'Submitted';
	};

	const renderStatusColumn = (status, dataObject) => {
		if (status === 'P') {
			return 'Pending';
		} else if (status === 'U') {
			if (dataObject?.expiryDate) {
				// return 'Expired';
				return checkDateExpiry(dataObject?.expiryDate);
			} else {
				return 'Submitted';
			}
		} else if (status === 'D') {
			return 'Deferred';
		}
	};

	const onValuesChange = (values) => {
		setDocData({ ...docData, ...values });
		props?.setDocumentData({ ...docData, ...values });
	};

	const styles = {
		cardStyle: {
			borderRadius: '8px'
		},
		cardHeader: {
			color: palette.text.heavy
		}
	};

	const columns = [
		{
			title: 'Type',
			key: 'documentType',
			dataIndex: 'documentType',
			render: (documentType, record) => {
				// let name = documentType === "A" ? "Address Proof" : "Disclaimer";
				return (
					<div>
						{/* <span>{name}</span> */}
						<span>{record?.documentTypeName}</span>
						{record.docmandatory === 'Y'
							? action !== 'view' && <span style={{ color: 'red' }}> *</span>
							: null}
					</div>
				);
			}
		},
		{
			title: 'Name',
			key: 'fileName',
			dataIndex: 'fileName',
			render: (item, record) => <a onClick={() => downloadFile(record)}>{item}</a>
		},
		{
			title: 'Status',
			key: 'docStatus',
			dataIndex: 'docStatus',
			// render: (status) => (status === 'P' ? 'Pending' : status === 'U' ? 'Submitted' : 'Deferred')
			render: (status, dataObject) => renderStatusColumn(status, dataObject)
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
	return (
		<Card
			title={'Documents Details'}
			// title={<h6>Documents Details</h6>}
			// headStyle={theme.cardHeaderStyle}
			extra={
				<Typography.Title
					level={5}
					onClick={() => action !== 'view' && showDocAddLink && setModal1Visible(true)}
					style={styles.cardHeader}
				>
					{action !== 'view' && showUploadButtonVal && (
						<Typography.Link onClick={securityList ? getDocumentRow : ''}>
							{Array.isArray(requestObject) && requestObject.length > 0 ? 'Edit' : '+ Add'}
						</Typography.Link>
					)}
				</Typography.Title>
			}
			style={styles.cardStyle}
		>
			<DocAttachmentDetails
				// form={form}
				// formData={formData}
				onValuesChange={onValuesChange}
				isModal1Visible={isModal1Visible}
				setModal1Visible={setModal1Visible}
				setModal2Visible={setAddAttachmentModalVisible}
				isModal2Visible={addAttachmentModalVisible}
				selectedUploadIndex={selectedUploadIndex}
				setRequestObject={setRequestObject}
				reqObject={reqObject}
				setRowData={setRowData}
			/>
			<DocumentModal
				isModal1Visible={isModal1Visible}
				setModal1Visible={setModal1Visible}
				setModal2Visible={setAddAttachmentModalVisible}
				onValuesChange={onValuesChange}
				rowData={rowData}
				setSelectedUploadIndex={setSelectedUploadIndex}
				setRowData={setRowData}
				setRequestObject={setRequestObject}
				reqObject={reqObject}
			/>

			<Table columns={columns} dataSource={requestObject} pagination={false} />
		</Card>
	);
};
