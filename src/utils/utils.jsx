import storage from 'redux-persist/lib/storage';
import CryptoJS from 'crypto-js';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { assets } from '../constants/assetPaths';
import { registerRuleService } from './validators/fieldRules';
import { downloadAttachmentApi } from '../api/commonApi';
import { CONSTANTS } from '../constants/constants';
import { getDocumentForDownloadApi } from '../api/documentManagerApi';
import moment from 'moment';
import { currencyData } from './currencyData';
import RupeeOrNonRupee from '../components/RupeeOrNonRupee/RupeeOrNonRupee';

// listner for site activity

export const encryptionKey = 'QWERTYUIOPASDFGHJKLZXCVBNM123456';

export const aesEncryptionKey = 'b14ca5898a4e4133bbce2ea2315a1916';
// .split("")
// .map(getCharCode);

export const aesEncrypt = (str) => {
	const aesEncryptedString = CryptoJS.AES.encrypt(str, encryptionKey, {
		salt: ''
	});
	const base64EncodedString = CryptoJS.enc.Utf8.parse(aesEncryptedString).toString(
		CryptoJS.enc.Base64
	);
	return base64EncodedString;
};

export const aesDecrypt = (cipher) => {
	const base64decodedString = CryptoJS.enc.Base64.parse(cipher).toString(CryptoJS.enc.Utf8);
	const decryptedString = CryptoJS.AES.decrypt(base64decodedString, encryptionKey).toString(
		CryptoJS.enc.Utf8
	);
	return decryptedString;
};

export const clearLocalStorage = () => {
	storage.removeItem('persist:root');
	sessionStorage.clear();
};

export const fetchAsset = (type, name) => {
	return assets[type][name];
};

const fieldSpecificValidators = (fieldStructure, rules) => [
	fieldStructure.keyField && fieldStructure.keyField.toLowerCase() === 'confirmpaswd'
		? rules.validateMatchingPasswords()
		: false,
	fieldStructure.keyField && fieldStructure.keyField.toLowerCase().includes('email')
		? rules.validEmailRule()
		: false
];

export const createValidators = (controlStructure, form, dynamicCS = false) => {
	let formValidator = {};
	const rules = registerRuleService(form);
	controlStructure &&
		controlStructure.forEach((fieldStructure) => {
			const fieldValidators = {
				[dynamicCS ? fieldStructure.keyField : fieldStructure.keyField.toLowerCase()]: [
					fieldStructure.isRequired
						? rules.requiredRule(fieldStructure.fieldLabel, fieldStructure.dataType)
						: false,
					fieldStructure.fieldLength ? rules.fieldLengthRule(fieldStructure.fieldLength) : false,
					// fieldStructure.controlType?.toLowerCase() === 'textbox' ||
					// fieldStructure.controlType?.toLowerCase() === 'textarea'
					// 	? rules.checkWhiteSpace(fieldStructure.fieldLabel)
					// 	: false,
					fieldStructure.pattern
						? rules.regexMatchRule(
								fieldStructure.pattern,
								fieldStructure.keyField,
								fieldStructure.errorMessage
						  )
						: false,
					...fieldSpecificValidators(fieldStructure, rules)
				].filter((rule) => rule !== false)
			};
			formValidator = { ...formValidator, ...fieldValidators };
		});
	return formValidator;
};

export const getTimeStamp = () => {
	return new Date().toLocaleString();
};

export const getDateFormat = () => {
	return 'DD MMM YYYY';
};

export const generateCsObject = (controlStructure) => {
	let csObject = {};
	if (!controlStructure) {
		// console.log("no data");
	}
	controlStructure &&
		controlStructure.forEach((item) => {
			if (item && item.keyField !== undefined && item.keyField !== null) {
				csObject[item.keyField] = item;
			}
		});
	return csObject;
};

export const currencyFormatterLatest = (amount) => {
	return <RupeeOrNonRupee amount={amount} />;
};

export const currencyFormatterNew = (amount, currCode) => {
	let currencyCode;
	try {
		if (currCode === 'undefined' || currCode === '') {
			currencyCode = '';
		} else if (currCode === 'INDIAN') {
			return new Intl.NumberFormat('en-IN', {
				maximumSignificantDigits: 3
			}).format(amount);
		} else {
			// return Number((amount).toFixed(1)).toLocaleString()
			if (currCode) {
				const k = currencyData.find((a) => Object.keys(a) === currCode);
				if (k) {
					const newCurrCode = Object.entries(k)[0][1];
					currencyCode = newCurrCode;
					return new Intl.NumberFormat('en-US', {
						style: 'currency',
						currency: currencyCode,
						minimumFractionDigits: 0
					}).format(amount);
				} else {
					currencyCode = currCode;
					return new Intl.NumberFormat('en-US', {
						style: 'currency',
						currency: currencyCode,
						minimumFractionDigits: 0
					}).format(amount);
				}
			}
		}
	} catch (e) {
		// console.log(e);
	}
};

export const currencyFormatter = (amount, region) => {
	return <RupeeOrNonRupee amount={amount} />;
	// return new Intl.NumberFormat('en-IN', {
	//   style: "currency",
	//   currency: "USD",
	//   minimumFractionDigits: 0,
	// }).format(amount);
};

export const kFormatter = (num) => {
	return Math.abs(num) > 999
		? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + 'K'
		: Math.sign(num) * Math.abs(num);
};

export const getBase64 = (img, callback) => {
	if (CONSTANTS.attachmentFileTypes.uploadPhotoFileTypes.includes(img.type)) {
		const reader = new FileReader();
		reader.onload = (e) => {};
		reader.addEventListener('load', () => callback(reader.result));
		reader.readAsDataURL(img);
	}
};

export const exportJSON = (csvData, fileName) => {
	const fileType =
		'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
	const fileExtension = '.xlsx';
	const ws = XLSX.utils.json_to_sheet(csvData);
	const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
	const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
	const data = new Blob([excelBuffer], { type: fileType });
	FileSaver.saveAs(data, fileName + '_Report' + fileExtension);
};

export const checkValidGraphData = (graphData) => {
	let validFlag = true;
	if (graphData && graphData !== null) {
		const objectKeys = Object.keys(graphData);
		objectKeys.forEach((key) => {
			if (Array.isArray(graphData[key])) {
				const nullObjectArray = graphData[key].filter((item) => !item || item === null);
				if (nullObjectArray.length > 0) validFlag = false;
			}
			if (!graphData[key] || graphData[key] === null) validFlag = false;
		});
	} else {
		validFlag = false;
	}

	return validFlag;
};

export const downloadAttachment = (file, id, progName, recordId) => {
	if (recordId) {
		downloadAttachmentApi(id, progName, recordId).then((res) => {
			if (res.data) {
				res.data.forEach((atch) => {
					if (atch) {
						var downloadLink = document.createElement('a');
						downloadLink.download = atch.fileName;
						downloadLink.href = 'data:' + atch.mimeType + ';base64,' + atch.fileString;
						downloadLink.onclick = function (e) {
							document.body.removeChild(e.target);
						};
						downloadLink.style.display = 'none';
						document.body.appendChild(downloadLink);
						downloadLink.click();
					}
				});
			}
		});
	} else {
		var downloadLink = document.createElement('a');
		downloadLink.download = file.fileName;
		downloadLink.href = 'data:' + file.mimeType + ';base64,' + file.fileString;
		downloadLink.onclick = function (e) {
			document.body.removeChild(e.target);
		};
		downloadLink.style.display = 'none';
		document.body.appendChild(downloadLink);
		downloadLink.click();
	}
};

export const dummyRequest = ({ file, onSuccess }) => {
	setTimeout(() => {
		onSuccess('ok');
	}, 0);
};

export const beforeCrop = (file, uploadFormat = '') => {
	let fileSize = file.size / 1024 / 1024 <= 1;
	if (!fileSize) {
		return false;
	}
	return true;
};

export const beforeUpload = (file, setErrorList, acceptedFileTypes, uploadFormat = '') => {
	setErrorList([]);
	let errorList = [];
	// Gif, JPEG, jpg, png, doc, docx, xls, xlsx and pdf
	const fileTypeArray = acceptedFileTypes.split(',');

	const isValidFileType = fileTypeArray.includes(file.type);
	if (!isValidFileType) {
		errorList = [...errorList, 'File type not supported'];
		// return false;
	}
	if (file.size === '' || file.size === null || file.size === undefined || file.size === 0) {
		errorList = [...errorList, 'Please try to upload the file again'];
	}
	const fileSize = Math.round(file.size / 1024);
	// const isLt1M = file.size / 1024 / 1024 <= 1;
	let errorMsgMaxSize = '';
	let isLt1M;
	if (uploadFormat === 'image') {
		//only for profile image
		isLt1M = file.size / 1024 / 1024 <= 1;
		errorMsgMaxSize = '1MB';
	} else {
		isLt1M = file.size / 1024 / 1024 <= 5;
		errorMsgMaxSize = '5MB';
	}
	if (!isLt1M) {
		// errorList = [...errorList, 'File size must be smaller than 1MB!'];
		// errorList = [...errorList, 'File size must be smaller than 5MB!'];
		errorList = [...errorList, `File size must be smaller than ${errorMsgMaxSize}!`];
		// return false;
	}
	errorList = [...errorList, 'size of the file: ' + fileSize + ' KBs'];
	setErrorList(errorList);
	return isValidFileType && isLt1M;
};
export const symbolsArr = ['e', 'E', '+', '-', '.'];

export const downloadDocument = (documentId) => {
	const postObject = {
		DocumentDownloads: [
			{
				DocumentId: documentId, //selectedRows.documentId,
				RefType: ''
			}
		]
	};

	getDocumentForDownloadApi(postObject).then((res) => {
		if (res.data) {
			res.data.forEach((atch) => {
				// atch.mimeType = atch.mimeType && atch.mimeType.split("-")[0];
				if (atch) {
					var downloadLink = document.createElement('a');
					downloadLink.download = atch.fileName;
					downloadLink.href = 'data:' + atch.mimeType + ';base64,' + atch.fileData;
					downloadLink.onclick = function (e) {
						document.body.removeChild(e.target);
					};
					downloadLink.style.display = 'none';
					document.body.appendChild(downloadLink);
					downloadLink.click();
				}
			});
		}
	});
};

export const groupBy = (list, f) => {
	return list.reduce((r, v, i, a, k = f(v)) => ((r[k] || (r[k] = [])).push(v), r), {});
};

// tConvert funtion helps you to convert 24HR clock to AM/PM
export const tConvert = (time) => {
	// Check correct time format and split into components
	time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

	if (time.length > 1) {
		// If time format correct
		time = time.slice(1); // Remove full string match value
		time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
		time[0] = +time[0] % 12 || 12; // Adjust hours
	}
	return time.join(''); // return adjusted time or original string
};

// sortBykey funtion help you to sort data in ascending order with the help of given key
export const sortBykey = (list = [], key = '') => {
	let sortedList = [];
	sortedList = list.sort((a, b) => new Date(b[key]) - new Date(a[key]));
	return sortedList;
};

export const disabledPastDate = (current) => {
	// Can not select days after today and today
	return current && current < moment().startOf('day');
};

export const disabledFutureDate = (current) => {
	// Can not select days after today and today
	return current && current > moment().endOf('day');
};
export const authorizeModule = (authorigeCode, moduleCode) => {
	let moduleCodePow = Math.pow(2.0, moduleCode);
	if (authorigeCode < moduleCodePow) {
		return false;
	}
	if ((authorigeCode & moduleCodePow) === 0) {
		return false;
	} else {
		return true;
	}
};

export const formRulesAndCSObj = (controlStructure, form) => {
	let rules = {};
	let csObject = [];
	controlStructure.forEach((item, idx) => {
		rules = { ...rules, ...createValidators(item?.controlStructureField, form, true) };
		csObject[idx] = {
			data: generateCsObject(item?.controlStructureField),
			sectionName: item?.sectionName
		};
	});
	return { rules, csObject };
};
