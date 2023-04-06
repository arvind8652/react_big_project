import React, { useEffect, useState } from 'react';
import { DatePicker, Row, Col, Modal, Select, Upload, Button } from 'antd';
import moment from 'moment';
import { UploadOutlined, PaperClipOutlined } from '@ant-design/icons';
import './DocumentManagerStyle.scss';
import GenericBadge from '../../components/GenericBadge/GenericBadge';
import { getDocumentForDownloadApi } from '../../api/documentManagerApi';
import AvatarLogo from '../../components/Avatar/AvatarLogo';
import { AvatarSize } from '../../constants/AvatarSize';
import { genrateRequestObj } from './DocConstant';
import { getUploadDocumentToDB } from '../../redux/actions/documentManagerAction';
import { downloadDocument } from '../../utils/utils';
import { authorizeModule } from '../../utils/utils';
import { CONSTANTS } from '../../constants/constants';

let respAvatarSize =
	window?.screen?.width < 1200
		? AvatarSize?.extrasmall
		: window?.screen?.width < 1500
		? AvatarSize?.small
		: AvatarSize?.medium;
let dropDownSize =
	window?.screen?.width < 1200 ? 'small' : window?.screen?.width < 1500 ? 'middle' : 'large';
const DocumentManagerDetails = ({
	selectedRow = {},
	isModalVisible,
	handleOk,
	handleCancel,
	controlStructure,
	dependentData,
	authorizeCode
}) => {
	const dateFormat = 'DD-MM-YYYY';
	const [error, setError] = useState({});
	const [errorMsg, setErrorMsg] = useState('');
	const [showActionDate, setShowActionDate] = useState(false);
	const [requestObj, setRequestObj] = useState(selectedRow);
	const [expDate, setExpDate] = useState(null);
	const clearErrors = () => {
		setError([]);
		setErrorMsg('');
	};
	const [isFileUpload, setIsFileUpload] = useState(true);
	const styleSet = {
		redBorder: '1px solid red',
		errorMsg: {
			float: 'left',
			color: 'red',
			marginTop: 10,
			paddingLeft: '24px'
		}
	};

	useEffect(() => {
		setExpDate(selectedRow?.expiryDate);
		handleFirstRenderChange(selectedRow.documentStatus);
	}, []);

	const handleFirstRenderChange = (value) => {
		clearErrors();
		requestObj.uploadedDocStatus = value;

		if (value === 'U') {
			setIsFileUpload(false);
		} else {
			setIsFileUpload(true);
		}
		if (value === 'D') {
			setShowActionDate(true);
		} else {
			setShowActionDate(false);
		}
		setRequestObj(requestObj);
	};

	const downloadFile = async (selectedRows) => {
		downloadDocument(selectedRows.documentId);
		// try {
		// 	const postObject = {
		// 		DocumentDownloads: [
		// 			{
		// 				DocumentId: selectedRows.documentId,
		// 				RefType: ''
		// 			}
		// 		]
		// 	};

		// 	let resp = await getDocumentForDownloadApi(postObject);
		// 	var a = document.createElement('a'); //Create <a>
		// 	a.href = 'data:image/png;base64,' + resp.data[0].fileData; //Image Base64 Goes here
		// 	//a.href = "data:" + resp.data[0].fileType + ";base64," + resp.data[0].fileData; //Image Base64 Goes here
		// 	a.download = selectedRows.documentName; //File name Here
		// 	a.click(); //Downloaded file
		// } catch (error) {
		// 	alert('Unable to downaload file ');
		// }
	};
	const handleOnDocumentNameChange = (value) => {
		clearErrors();
		const selectedDoc =
			dependentData && dependentData.lookUpValues.find((item) => item.documentName === value);
		requestObj.docNameDataValue = value;
		requestObj.expiryYN = selectedDoc.expiryYN;
		requestObj.docmandatory = selectedDoc.docmandatory;
		requestObj.docId = selectedDoc.documentId;
		setRequestObj(requestObj);
	};
	const handleOnStatusChange = (value) => {
		clearErrors();
		requestObj.uploadedDocStatus = value;
		requestObj.actionDateShow = null;
		requestObj.submissionDateShow = null;

		if (value === 'U') {
			setIsFileUpload(false);
		} else {
			setIsFileUpload(true);
		}
		if (value === 'D') {
			setShowActionDate(true);
		} else {
			setShowActionDate(false);
		}
		setRequestObj(requestObj);
	};
	const updateFileObj = (file, base64String) => {
		requestObj.fileName = file.name;
		requestObj.fileType = file.type;
		const base64Array = base64String.split(',');
		requestObj.filestring = base64Array[1];
		setRequestObj(requestObj);
	};
	const getBase64 = (file) => {
		var reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = function () {
			updateFileObj(file, reader.result);
		};
		reader.onerror = function (error) {
			alert(error);
		};
	};
	const onDocUpload = (data) => {
		setErrorMsg('');
		// const isLt1M = data.size / 1024 / 1024 <= 1;
		const isLt1M = data.size / 1024 / 1024 <= 5;
		if (data.size === '' || data.size === null || data.size === undefined || data.size === 0) {
			setErrorMsg('Please try to upload the file again');
			return true;
		}
		if (!isLt1M) {
			// setErrorMsg("File size must be smaller than 1MB!");
			setErrorMsg('File size must be smaller than 5MB!');
			return true;
		}
		getBase64(data);
		return false;
	};
	const disabledPastDate = (current) => {
		// Can not select days after today and today
		return current && current < moment().startOf('day');
	};
	const disabledFutureDate = (current) => {
		// Can not select days after today and today
		return current && current > moment().endOf('day');
	};
	const handleOnSubmissionDate = (value) => {
		clearErrors();
		if (showActionDate) {
			if (value) {
				if (moment(value).isValid()) {
					requestObj.actionDate = moment(value).format('YYYY-MM-DD');
					requestObj.actionDateShow = moment(value);
					return;
				}
			}
			requestObj.actionDate = null;
			return;
		}
		if (value) {
			if (moment(value).isValid()) {
				requestObj.submissionDate = moment(value).format('YYYY-MM-DD');
				requestObj.submissionDateShow = moment(value);
				return;
			}
		}
		requestObj.submissionDate = null;
	};
	const handleOnExpiryDateChange = (value) => {
		clearErrors();
		if (value) {
			if (moment(value).isValid()) {
				requestObj.expiryDate = moment(value).format('YYYY-MM-DD');
				return;
			}
		}
		requestObj.expiryDate = null;
	};
	const onSubmit = async () => {
		let isValid = true;
		clearErrors();
		let tempError = {};
		if (expDate) {
			let expDateCheck = moment(expDate).format('YYYY-MM-DD');
			let changeExpDate = moment(requestObj.expiryDate).format('YYYY-MM-DD');
			if (moment(changeExpDate).isBefore(expDateCheck)) {
				setErrorMsg('Unable to set Expiray date');
				isValid = false;
			}
		}
		if (
			requestObj.docmandatory === 'Y' &&
			(!requestObj.hasOwnProperty('uploadedDocStatus') || requestObj.uploadedDocStatus === null)
		) {
			isValid = false;
			tempError = { ...tempError, docStatus: true };
			setErrorMsg('Please fill all mandatory details');
		}
		if (requestObj.docmandatory === 'Y' && requestObj.uploadedDocStatus === 'P') {
			isValid = false;
			tempError = { ...tempError, docStatus: true };
			setErrorMsg('Document is mandatory please select Deferred or Submitted option');
		}
		if (
			requestObj.expiryYN === 'Y' &&
			requestObj.uploadedDocStatus === 'U' &&
			(!requestObj.hasOwnProperty('expiryDate') || requestObj.expiryDate === null)
		) {
			isValid = false;
			tempError = { ...tempError, expireyDateStyle: true };
			setErrorMsg('Please select expiry date');
		}
		if (
			requestObj.uploadedDocStatus === 'D' &&
			(!requestObj.hasOwnProperty('actionDate') || requestObj.actionDate === null)
		) {
			isValid = false;
			tempError = {
				...tempError,
				submissionDateStyle: true,
				expireyDateStyle: false
			};
			setErrorMsg('Please select action date');
		}
		if (
			requestObj.uploadedDocStatus === 'U' &&
			(!requestObj.hasOwnProperty('submissionDate') || requestObj.submissionDate === null)
		) {
			if (!requestObj.hasOwnProperty('submissionDate') || requestObj.submissionDate === null) {
				isValid = false;
				tempError = { ...tempError, submissionDateStyle: true };
				setErrorMsg('Please select submission date');
			}
		}
		if (requestObj.docmandatory === 'Y' && requestObj.uploadedDocStatus === 'U') {
			if (!requestObj.hasOwnProperty('filestring') || requestObj.filestring === null) {
				isValid = false;
				tempError = { ...tempError, filepload: true };
				setErrorMsg('Please upload the file');
			}
		}

		if (requestObj.uploadedDocStatus === 'D') {
			requestObj.Isdeferred = 'Y';
			requestObj.IsOverWrite = false;
		} else {
			requestObj.Isdeferred = 'N';
		}

		if (requestObj.uploadedDocStatus === 'U') {
			requestObj.IsOverWrite = true;
		} else {
			requestObj.IsOverWrite = false;
		}

		if (!isValid) {
			setError(tempError);
			return;
		}

		if (isValid) {
			try {
				let finalRequestObj = genrateRequestObj(requestObj);
				let resp = await getUploadDocumentToDB(finalRequestObj);
				if (resp.postResponses.length > 0) {
					if (!resp.postResponses[0].success) {
						setErrorMsg('Unable to upload Document');
					} else {
						handleOk();
					}
				}
			} catch (error) {
				alert('Unable to downaload file ');
			}
			// setRequestObject(newRequestObject);
			// onValuesChange({ DocumentInfo: newRequestObject });
		}
	};

	return (
		<Modal
			className='documentManagerViewUpdateModal'
			title='View/Update Document'
			visible={isModalVisible}
			okText='Update'
			onOk={handleOk}
			onCancel={handleCancel}
			width={1500}
			borderRadius={10}
			headerStyle={{ color: 'blue' }}
			footer={[
				<span style={styleSet.errorMsg}>{errorMsg}</span>,
				<Button type='text' key='back' onClick={handleCancel}>
					Cancel
				</Button>,
				<Button
					htmlType='submit'
					key='submit'
					type='primary'
					onClick={onSubmit}
					// disabled={!authorizeModule(authorizeCode, CONSTANTS.authorizeCode.modify)}
					disabled={!authorizeModule(authorizeCode, CONSTANTS.authorizeCode.add)}
				>
					Submit
				</Button>
			]}
		>
			<div style={{ marginBottom: 20, height: '100%' }}>
				<Row gutter={16}>
					<Col span={2}>
						<Col>
							<AvatarLogo
								imgsrc={selectedRow.fileString}
								profileName={selectedRow.profileInitial}
								avatarSize={respAvatarSize}
							/>
						</Col>
					</Col>
					<Col span={7}>
						<h4 className='customer-name'>{selectedRow.clientName}</h4>
						<Row>
							<p className='familyName'>
								{selectedRow.clientId}
								{selectedRow.familyName && `|${selectedRow.familyName}`}
							</p>
						</Row>
						<Row>
							<Col>
								<GenericBadge badgeBody={selectedRow.clientCategory} />
							</Col>
						</Row>
					</Col>
					<Col span={7}>
						<Row>
							<Col>
								<div className='col-text'>
									<h4 className='customer-name'>{selectedRow.accountName}</h4>
									<div className='nature-badge'>{selectedRow.accountNature}</div>
								</div>
							</Col>
						</Row>
					</Col>
					<Col span={7}>
						<Row>
							<h4 className='customer-name'>{selectedRow.securityName}</h4>
						</Row>
						<Row>
							<p className='order-text'>
								{' '}
								{selectedRow.orderCartId && `${selectedRow.orderCartId} | ${selectedRow.orderType}`}
							</p>
						</Row>
					</Col>
				</Row>
				<Row gutter={16} style={{ marginLeft: '100px', alignItems: 'center' }}>
					<Col span={8}>
						<Row>
							<h4 className='order'>{selectedRow.applicableForName}</h4>
						</Row>
						<Row>
							<p className='order-text'>Applicability</p>
						</Row>
					</Col>
					<Col span={8}>
						<Row>
							<h4 className='order'>{selectedRow.purpose}</h4>
						</Row>
						<Row>
							<p className='order-text'>Purpose</p>
						</Row>
					</Col>
					<Col span={8}>
						<Col className='order-details'>
							<Row>
								<h4 className='address-proof'>{selectedRow.documentTypeName}</h4>
							</Row>
							<Row>
								<p className='order-text'>Type</p>
							</Row>
						</Col>
					</Col>
				</Row>
				<Row gutter={16} style={{ marginLeft: '100px', alignItems: 'center' }}>
					<Col span={8}>
						<Row className='document-manager-details'>
							<lable className='label'>Document Name</lable>
						</Row>
						<Row>
							<Select
								className='select'
								size={dropDownSize}
								placeholder='Select Document Name'
								onChange={handleOnDocumentNameChange}
								filterOption={(input, opt) => {
									return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
								}}
								showSearch
								showArrow
								defaultValue={requestObj.documentName}
							>
								{dependentData &&
									dependentData.lookUpValues.map((option) => (
										<Select.Option key={option.documentId} value={option.documentName}>
											{option.documentName}
										</Select.Option>
									))}
							</Select>
						</Row>
					</Col>
					<Col span={8}>
						<Row className='document-manager-details'>
							<lable className='label'>Status</lable>
						</Row>
						<Row>
							<Select
								className='select'
								size={dropDownSize}
								placeholder='Select Status'
								onChange={handleOnStatusChange}
								style={{
									border: error.docStatus === true ? styleSet.redBorder : ''
								}}
								filterOption={(input, opt) => {
									return opt.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
								}}
								showSearch
								showArrow
								defaultValue={requestObj.documentStatus}
							>
								{controlStructure &&
									controlStructure.csList[1].controlStructureField[0].dropDownValue.map(
										(option) => (
											<Select.Option key={option.dataValue} value={option.dataValue}>
												{option.displayValue}
											</Select.Option>
										)
									)}
							</Select>
						</Row>
					</Col>
					<Col span={8} className='document-manager-details'>
						<Row>
							<lable className='label'>Attached file</lable>
						</Row>
						<div>
							{selectedRow.documentStatus === 'U' && (
								<Button
									className='attachedBtn'
									size={dropDownSize}
									style={{ width: '100%', textAlign: 'left' }}
									onClick={() => downloadFile(selectedRow)}
								>
									<PaperClipOutlined className='paper-clip-outlined-icon' /> {selectedRow.fileName}
								</Button>
							)}
						</div>
					</Col>
				</Row>
				<Row gutter={16} style={{ marginLeft: '100px', alignItems: 'center' }}>
					<Col span={8}>
						<Row className='document-manager-details'>
							<lable className='label'> {showActionDate ? 'Action Date' : 'Submission Date'}</lable>
						</Row>
						{!showActionDate && (
							<Row>
								<DatePicker
									size={dropDownSize}
									disabledDate={showActionDate ? disabledPastDate : disabledFutureDate}
									format={dateFormat}
									style={{
										width: '100%',
										border: error.submissionDateStyle === true ? styleSet.redBorder : ''
									}}
									onChange={(val) => handleOnSubmissionDate(val)}
									value={showActionDate ? requestObj.actionDateShow : requestObj.submissionDateShow}
									defaultValue={requestObj.submissionDate ? moment(requestObj.submissionDate) : ''}
								/>
							</Row>
						)}
						{showActionDate && (
							<Row>
								<DatePicker
									size={dropDownSize}
									disabledDate={showActionDate ? disabledPastDate : disabledFutureDate}
									format={dateFormat}
									style={{
										width: '100%',
										border: error.submissionDateStyle === true ? styleSet.redBorder : ''
									}}
									onChange={(val) => handleOnSubmissionDate(val)}
									value={showActionDate ? requestObj.actionDateShow : requestObj.submissionDateShow}
									defaultValue={requestObj.actionDate ? moment(requestObj.actionDate) : ''}
								/>
							</Row>
						)}
					</Col>
					<Col span={8}>
						<Row className='document-manager-details'>
							<lable className='label'>Expiry Date</lable>
						</Row>
						<Row>
							<DatePicker
								size={dropDownSize}
								disabledDate={disabledPastDate}
								format={dateFormat}
								onChange={(value) => handleOnExpiryDateChange(value)}
								style={{
									width: '100%',
									border: error.expireyDateStyle === true ? styleSet.redBorder : ''
								}}
								defaultValue={requestObj.expiryDate ? moment(requestObj.expiryDate) : ''}
							/>
						</Row>
					</Col>
					<Col span={8}>
						<Upload.Dragger
							//disabled={isFileUpload}
							showUploadList={errorMsg ? false : true}
							maxCount={1}
							name='files'
							multiple={false}
							beforeUpload={(file) => onDocUpload(file)}
							size={dropDownSize}
						>
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center'
								}}
							>
								<div className='ant-upload-drag-icon'>
									<UploadOutlined className='icon' />
								</div>
								<div>
									<p className='ant-upload-text'>Drag and drop file</p>
									<p className='ant-upload-text'>or</p>
									<u className='browse'>Browse file</u>
								</div>
							</div>
						</Upload.Dragger>
					</Col>
				</Row>
			</div>
		</Modal>
	);
};

export default DocumentManagerDetails;
