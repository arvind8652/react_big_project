import React, { useState, useEffect } from 'react';

// ant design
import { Upload, Avatar, Row, Col, message } from 'antd';
import ImgCrop from 'antd-img-crop';

// font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { beforeCrop, beforeUpload, getBase64 } from '../../utils/utils';
import { CONSTANTS } from '../../constants/constants';

const UploadPhoto = ({
	name = '',
	style = {},
	icon = '',
	color = '',
	size = '',
	text = '',
	onChange = () => {},
	customRequest = () => {},
	accept = '',
	showPreview = false,
	formData = {},
	action = ''
}) => {
	const [uri, setUri] = useState('');
	const [remove, setRemove] = useState(false);
	const [fileList, setFileList] = useState([]);
	const [errorList, setErrorList] = useState([]);
	const [firstTimeEditPage, setFirstTimeEditPage] = useState(false);

	// -------------------------------start using in customer create screen-----------------------------
	useEffect(() => {
		if (action === 'edit') {
			setFirstTimeEditPage(true);
		}
	}, []);

	useEffect(() => {
		if (
			(action === 'edit' || action === 'convert') &&
			formData?.profileImage?.fileString &&
			formData?.profileImage?.fileString !== null &&
			formData?.profileImage?.fileString !== ''
		) {
			// let stringVal = "data:image/png;base64,"+formData?.profileImage;
			let stringVal = 'data:image;base64,' + formData?.profileImage?.fileString;
			let stringLength = stringVal?.length;
			let sizeInBytes = 4 * Math.ceil(stringLength / 3) * 0.5624896334383812;
			let sizeInKb = sizeInBytes / 1000;
			setUri('data:image;base64,' + formData?.profileImage?.fileString);
			setErrorList(['size of the file: ' + Math.floor(sizeInKb) + ' KBs']);
			setFirstTimeEditPage(false);
		}
	}, [formData?.profileImage?.fileString, action]);

	// -------------------------------end using in customer create screen-----------------------------

	const handleOnChange = (params) => {
		if (showPreview && beforeCrop(params?.file, 'image')) {
			onChange(params);
			setFileList(params.fileList.slice([params.fileList.length - 1]));
			getBase64(params.file.originFileObj, (img) => {
				setUri(img);
				params.fileList.length > 0 && setRemove(false);
			});
		}
	};

	const handleCustomRequest = (params) => {
		customRequest(params);
	};

	const onPreview = async (file) => {
		let src = file.url;
		if (!src) {
			src = await new Promise((resolve) => {
				const reader = new FileReader();
				reader.readAsDataURL(file.originFileObj);
				reader.onload = () => resolve(reader.result);
			});
		}
		const image = new Image();
		image.src = src;
		const imgWindow = window.open(src);
		imgWindow.document.write(image.outerHTML);
	};

	const checkBeforeCrop = (file) => {
		let res = beforeCrop(file, 'image');
		if (!res) {
			message.error('File size should be less than 1MB');
		}
		return res;
	};
	const checkBeforeUpload = (file) => {
		let res = beforeCrop(file, 'image');
		if (!res) {
			message.error('File size should be less than 1MB');
		} else {
			return beforeUpload(file, setErrorList, accept, 'image');
		}
	};
	const renderDragger = () => (
		<div style={{ marginBottom: 20 }}>
			<ImgCrop beforeCrop={(file) => checkBeforeCrop(file)}>
				<Upload.Dragger
					accept={accept}
					//   listType="picture-card"
					listType='picture-circle'
					fileList={fileList}
					onChange={handleOnChange}
					customRequest={handleCustomRequest}
					multiple={false}
					// beforeUpload={(file) => beforeUpload(file, setErrorList, accept, 'image')}
					beforeUpload={(file) => checkBeforeUpload(file)}
					// style={style}
					// style={{ size: "164" }}
					name={name}
					onPreview={onPreview} //comment this line of code, if you have to disable preview functionality
					onRemove={() => setRemove(true)}
				>
					{uri && showPreview ? (
						remove ? (
							<>
								<FontAwesomeIcon icon={icon} color={color} size={size} />
								<p>
									<br />
									<b>
										<u>{text}</u>
									</b>
								</p>
							</>
						) : (
							<Avatar size={164} icon={<img src={uri} alt='avatar' />} />
							// <img
							// 	alt='avatar'
							// 	style={{
							// 		width: '170px',
							// 		maxHeight: '170px',
							// 		borderRadius: '100%'
							// 	}}
							// 	src={uri}
							// />
						)
					) : (
						<>
							<FontAwesomeIcon icon={icon} color={color} size={size} />
							<p>
								<br />
								<b>
									<u>{text}</u>
								</b>
							</p>
						</>
					)}
					{/* {
            <>
              <b>
                <u>{text}</u>
              </b>
            </>
          } */}
				</Upload.Dragger>
			</ImgCrop>
			<Row>
				<Col>{CONSTANTS.attachmentFileTypes.validationMessageUploadPhoto}</Col>
			</Row>
			{errorList.length > 0 && (
				<Row>
					<Col>
						{errorList.map((error) => (
							<>
								<Row>{!remove && error}</Row>
							</>
						))}
					</Col>
				</Row>
			)}
		</div>
	);

	return renderDragger();
};

export default UploadPhoto;
