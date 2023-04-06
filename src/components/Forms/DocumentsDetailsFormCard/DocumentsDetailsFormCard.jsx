import { memo, useEffect, useRef, useState } from 'react';

import { Card, DatePicker, message, Select, Space, Table, Tag, Typography } from 'antd';
import { ScButtonPrimary, ScButtonText, ScModal } from '../../StyledComponents/genericElements';

import moment from 'moment';

const DocumentsDetailsFormCard = ({
	setModal1Visible,
	isModal1Visible,
	onValuesChange,
	rowData,
	setRowData,
	setRequestObject,
	setSelectedUploadIndex,
	setModal2Visible,
	reqObject,
	requestObject,
	action = '',
	documentRequiredField = {},
	setDocumentRequiredField = {},
	checkDocMandatory = () => {},

	reqObjectState = {},
	setReqObjectState = {},
	setObjKeydocType = {},
	objKeydocType = {},

	setMainModalCount = {},
	mainModalCount = {},
	setRequestObjectbackUp = {},
	requestObjectbackUp = {},
	setEditDataLoaded,
	editDataLoaded
}) => {
	// console.log('beforeoldRowData----------', rowData);
	const [error, setError] = useState([{ idx: -1, type: '' }]);
	const [errorMsg, setErrorMsg] = useState('');

	const [oldRowData, setOldRowData] = useState([]);
	const [oldRequestsObject, setOldRequestsObject] = useState([]);
	const [oldReqObject, setOldReqObject] = useState([]);
	const [editScreen, setEditScreen] = useState(false);
	const [editOperation, setEditOperation] = useState(false);

	let isValidSubmit = true;

	useEffect(() => {
		if (rowData && rowData?.length > 0 && oldRequestsObject && oldRequestsObject?.length > 0) {
			setRequestObjectbackUp(() => getOldRequestObjectHandler());
		}
	}, [rowData, oldRequestsObject]);

	// -----------------------------------------------start for edit screen--------------------------------------------------------
	useEffect(() => {
		if (
			action === 'edit' ||
			action === 'copy' ||
			action === 'profileEdit' ||
			action === 'profileCopy'
		) {
			setEditOperation(true);
		}
	}, []);

	useEffect(() => {
		if (
			(action === 'edit' ||
				action === 'copy' ||
				action === 'profileEdit' ||
				action === 'profileCopy') &&
			editOperation === true &&
			rowData.length > 0 &&
			reqObject.current.length > 0
		) {
			setOldRowData(() => setOldRowDataHandler());
			setOldReqObject(() => setOldReqObjectHandler());
			setOldRequestsObject(() => setOldRequestObjectHandler(requestObject));

			setEditOperation(false);
			setEditScreen(true);
		}
	}, [editOperation, reqObject, requestObject, rowData]);

	useEffect(() => {
		if (
			editScreen === true &&
			(action === 'edit' ||
				action === 'copy' ||
				action === 'profileEdit' ||
				action === 'profileCopy')
		) {
			editFirstTimeStateHandler();
		}
	}, [editScreen]);

	const editFirstTimeStateHandler = () => {
		// console.log('first dffdnbfbgm');
		let oldRequestsObjectArray = oldRequestsObject;
		let oldReqObjectArray = oldReqObject;
		let oldRowDataArray = oldRowData;
		let modifiedNewRequestObjectData = [];
		let unMatchedOldRowData = [];
		if (oldRequestsObject?.length > 0) {
			let newOldRequestObjectArray = [];
			let newRequestObjectArray = [];

			oldRowData?.map((_) => {
				let valMatched = false;
				oldRequestsObject?.map((item) => {
					if (
						item?.sameTypeRecordVal === _?.sameTypeRecordVal &&
						item?.documentsetupidVal === _?.documentsetupidVal
					) {
						let dataObjectNew = {};
						for (const prop in item) {
							dataObjectNew[`${prop}`] = item[prop];
						}
						dataObjectNew.keyVal = _?.keyVal;
						dataObjectNew.rowIndexVal = _?.rowIndexVal;
						newOldRequestObjectArray.push(dataObjectNew);
						newRequestObjectArray.push(getValue(dataObjectNew));
						valMatched = true;
					}
				});
				if (!valMatched) {
					unMatchedOldRowData.push(_);
				}
			});

			setOldRequestsObject(newOldRequestObjectArray);
			oldRequestsObjectArray = newOldRequestObjectArray;
			modifiedNewRequestObjectData = newRequestObjectArray;
			setRequestObject(newRequestObjectArray);
		}

		let oldRequestsObjectLatestArray = [];
		let oldRowDataLatestArray = [];
		let oldReqObjectLatestArray = [];

		let a = [];
		let b = [];
		let c = [];
		let d = [];
		let finalRowData = [];
		let finalReqObject = [];

		let indexValData = 0;

		if (oldRequestsObjectArray?.length > 0) {
			oldRowDataArray.map((data, index) => {
				indexValData = data?.keyVal;
				oldRequestsObjectArray.map((data1, index1) => {
					if (
						data1?.documentsetupidVal === data?.documentsetupidVal &&
						data1?.keyVal === data?.keyVal
					) {
						let a = [];
						let hashMap = {};
						rowData.map((item) => {
							let ab = [];
							item?.lstDocumentNames?.map((item1) => {
								ab.push(item1.docNameDataValue);
							});
							a.push(ab);
						});
						a.forEach(function (arr) {
							hashMap[arr.join('|')] = arr;
						});
						let result = Object.keys(hashMap).map(function (k) {
							if (hashMap[k].includes(data1.docNameDataValueVal)) {
								return hashMap[k];
							}
						});
						result = result.filter(function (element) {
							return element !== undefined;
						});
						let finalArray = result[0];

						let da = [];
						let aaa = requestObject?.map((_) => {
							if (finalArray?.includes(_.docNameDataValue)) {
								if (_.docNameDataValue !== data1.docNameDataValueVal) {
									da.push(_.docNameDataValue);
								}
							}
						});

						let lstDocumentNamesData = rowData[indexValData].lstDocumentNames.map((obj) => {
							if (finalArray?.includes(data1.docNameDataValueVal)) {
								let objData = { ...obj, disabled: false };

								if (obj.docNameDataValue === data1.docNameDataValueVal) {
								} else {
									if (finalArray?.includes(obj.docNameDataValue)) {
										da.map((_) => {
											if (obj.docNameDataValue === _) {
												objData = { ...objData, disabled: true };
											}
										});
									} else {
										objData = { ...obj };
									}
								}
								return objData;
							} else {
								return { ...obj };
							}
						});
						oldRowDataLatestArray.push({
							...data1,
							lstDocumentNamesVal: lstDocumentNamesData,
							statusVal: data?.statusVal,
							docmandatoryVal: data?.docmandatoryVal,
							showActionDateVal: data1.actionDateVal !== null ? true : null,
							documentStatusValueVal: data1.docStatusVal,
							documentNameValueVal: data1.docNameDataValueVal,
							actionDateValueVal: data1.actionDateVal !== null ? moment(data1.actionDateVal) : null,
							submissionDateValueVal:
								data1.submissionDateVal !== null ? moment(data1.submissionDateVal) : null,
							expiryDateValueVal: data1.expiryDateVal !== null ? moment(data1.expiryDateVal) : null,
							isDeferredVal: data1?.isDeferredVal ? data1?.isDeferredVal : data1?.isdeferredVal
						});
					}
				});
			});

			oldReqObjectArray.map((data, index) => {
				oldRequestsObjectArray.map((data1, index1) => {
					if (
						data1.documentsetupidVal === data.documentsetupidVal &&
						data1?.keyVal === data?.keyVal
					) {
						oldReqObjectLatestArray.push({
							...data1,
							docmandatoryVal: data?.docmandatoryVal,
							documentsetupidVal: data?.documentsetupidVal,
							isDeferredVal: data1?.isDeferredVal ? data1?.isDeferredVal : data1?.isdeferredVal
						});
					}
				});
			});
		} else {
			// console.log('test data value');
			oldRowDataLatestArray = oldRowDataArray;
			oldReqObjectLatestArray = oldReqObjectArray;
			// console.log('---dsfddsf-------dsdf-----', oldRowDataArray);
		}

		// ------------------------------------30-12-2021---------------------------------
		let newUnMatchedOldRowData = [];
		unMatchedOldRowData.map((_) => {
			let objUnMatchedOldRowData = { ..._ };
			let aaaa = [];
			oldRequestsObjectArray.map((itm) => {
				if (itm.documentsetupidVal === _.documentsetupidVal) {
					_?.lstDocumentNamesVal.map((lstData) => {
						let objLstData = { ...lstData, disabled: false };
						if (lstData?.docNameDataValue === itm?.docNameDataValueVal) {
							objLstData = { ...lstData, disabled: true };
						}
						aaaa.push(objLstData);
					});
				}
			});
			if (aaaa?.length > 0) {
				objUnMatchedOldRowData = { ..._, lstDocumentNamesVal: aaaa };
			}
			newUnMatchedOldRowData.push(objUnMatchedOldRowData);
		});
		unMatchedOldRowData = newUnMatchedOldRowData;
		oldRowDataLatestArray = oldRowDataLatestArray.concat(unMatchedOldRowData);
		oldReqObjectLatestArray = oldReqObjectLatestArray.concat(unMatchedOldRowData);

		if (oldReqObjectLatestArray.length > 0) {
			oldReqObjectLatestArray.map((_) => {
				finalReqObject.push(_);
			});
		}

		if (oldRowDataLatestArray.length > 0) {
			oldRowDataLatestArray.map((_) => {
				finalRowData.push(_);
			});
		}

		finalRowData?.sort((a, b) => {
			if (a?.keyVal < b?.keyVal) {
				return -1;
			}
			if (a?.keyVal > b?.keyVal) {
				return 1;
			}
		});

		finalReqObject?.sort((a, b) => {
			if (a?.keyVal < b?.keyVal) {
				return -1;
			}
			if (a?.keyVal > b?.keyVal) {
				return 1;
			}
		});

		// console.log('secondData----------', finalRowData);
		setOldRowData(finalRowData);
		setOldReqObject(finalReqObject);

		let clearRowData = [];
		let clearReqObject = [];

		finalRowData.map((_) => {
			clearRowData.push(getValue(_));
		});

		finalReqObject.map((_) => {
			clearReqObject.push(getValue(_));
		});

		// ------------commented below line on 06-01-2022 this maybe useful in future---------------
		setRowData(clearRowData);
		reqObject.current = [];
		reqObject.current = clearReqObject;
		// ------------commented below line on 06-01-2022 this maybe useful in future---------------

		onValuesChange({ DocumentInfo: modifiedNewRequestObjectData });

		checkDocMandatory();
		setMainModalCount(true);
		setEditDataLoaded(false);
	};
	//--------------------------------------------------------end for edit screen-------------------------------------------------

	const editButtonClickHandler = () => {
		let latestReqObject = reqObject.current;
		let latestOldReqObject = getOldReqObjectHandler();
		let latestOldRowData = getOldRowDataHandler();
		let latestRowData = rowData;
		let latestOldRequestObject = getOldRequestObjectHandler();
		let latestRequestObject = requestObject;
		if (latestReqObject?.length === latestOldReqObject?.length) {
			setRowData(getOldRowDataHandler);
			reqObject.current = [];
			reqObject.current = getOldReqObjectHandler();
		} else if (latestReqObject?.length > latestOldReqObject?.length) {
			let updatedData = [];
			latestReqObject.map((_) => {
				let valueUnMatched = false;
				latestOldReqObject.map((itm) => {
					if (_?.documentsetupid !== itm?.documentsetupid && _?.key !== itm?.key) {
						valueUnMatched = true;
					}
				});
				if (valueUnMatched) {
					updatedData.push(_);
				}
			});
			let updatedReqObjectData = [];
			updatedReqObjectData = getOldReqObjectHandler();
			if (updatedData?.length > 0) {
				updatedData?.map((_) => {
					updatedReqObjectData.push(_);
				});
			}
			updatedReqObjectData?.sort((a, b) => {
				if (a?.key < b?.key) {
					return -1;
				}
				if (a?.key > b?.key) {
					return 1;
				}
			});
			setRowData(getOldRowDataHandler);
			reqObject.current = [];
			reqObject.current = updatedReqObjectData;
		} else if (latestReqObject?.length < latestOldReqObject?.length) {
			let updatedData1 = [];
			latestOldReqObject.map((_) => {
				let valueUnMatched1 = false;
				latestReqObject.map((itm) => {
					if (_?.documentsetupid === itm?.documentsetupid && _?.key === itm?.key) {
						valueUnMatched1 = true;
					}
				});
				if (valueUnMatched1) {
					updatedData1.push(_);
				}
			});
			let updatedReqObjectData = [];
			if (updatedData1?.length > 0) {
				updatedData1?.map((_) => {
					updatedReqObjectData.push(_);
				});
			}
			updatedReqObjectData?.sort((a, b) => {
				if (a?.key < b?.key) {
					return -1;
				}
				if (a?.key > b?.key) {
					return 1;
				}
			});
			reqObject.current = [];
			reqObject.current = updatedReqObjectData;

			let dataArray = [];
			updatedReqObjectData?.map((_, index) => {
				dataArray?.push(setValue(_, index, 'oldReqObjectState'));
			});
			setOldReqObject(dataArray);

			// ================++++++++++++++++++++++++++++++++++++++++++++++++++================
			let updatedRowDataVal = [];
			latestOldRowData.map((_) => {
				let rowValueUnMatched = false;
				latestRowData.map((itm) => {
					if (_?.documentsetupid === itm?.documentsetupid && _?.key === itm?.key) {
						rowValueUnMatched = true;
					}
				});
				if (rowValueUnMatched) {
					updatedRowDataVal.push(_);
				}
			});
			let updatedRowData = [];
			// updatedRowData = getOldReqObjectHandler();
			if (updatedRowDataVal?.length > 0) {
				updatedRowDataVal?.map((_) => {
					updatedRowData.push(_);
				});
			}
			updatedRowData?.sort((a, b) => {
				if (a?.key < b?.key) {
					return -1;
				}
				if (a?.key > b?.key) {
					return 1;
				}
			});
			setRowData(updatedRowData);

			// if(updatedRowData?.length===0){
			//   updatedRowData = latestOldRowData;
			// }
			let dataArray1 = [];
			updatedRowData?.map((_, index) => {
				dataArray1?.push(setValue(_, index, 'oldRowDataState'));
			});
			setOldRowData(dataArray1);

			// ================++++++++++++++++++++++++++++++++++++++++++++++++++================++++++++++++++++++++++++++++++
			let updatedRequestObjectVal = [];
			if (updatedReqObjectData?.length > 0) {
				if (latestOldRequestObject?.length > 0) {
					latestOldRequestObject?.map((_) => {
						let requestValueUnMatched = false;
						updatedReqObjectData.map((itm) => {
							if (_?.documentsetupid === itm?.documentsetupid && _?.key === itm?.key) {
								requestValueUnMatched = true;
							}
						});
						if (requestValueUnMatched) {
							updatedRequestObjectVal.push(_);
						}
					});
				}
			}

			let updatedRequestObject = [];
			// updatedRequestObject = getOldReqObjectHandler();
			if (updatedRequestObjectVal?.length > 0) {
				updatedRequestObjectVal?.map((_) => {
					updatedRequestObject.push(_);
				});
			}
			updatedRequestObject?.sort((a, b) => {
				if (a?.key < b?.key) {
					return -1;
				}
				if (a?.key > b?.key) {
					return 1;
				}
			});
			// if(updatedRequestObject?.length===0){
			//   updatedRequestObject = requestObject;
			// }
			// alert("ab");
			// console.log("updatedRequestObject--------line 704---------------",updatedRequestObject);
			setRequestObject(updatedRequestObject);

			let dataArray2 = [];
			updatedRequestObject?.map((_, index) => {
				dataArray2?.push(setValue(_, index, 'oldRequestObjectState'));
			});
			setOldRequestsObject(dataArray2);
			// alert('b');

			onValuesChange({ DocumentInfo: updatedRequestObject });
		}
		checkDocMandatory();
	};

	useEffect(() => {
		// -------------------------------------------03-01-2022-----------------------------
		if (
			oldRowData &&
			oldRowData?.length > 0 &&
			oldReqObject &&
			oldReqObject?.length > 0 &&
			requestObject &&
			requestObject.length > 0
		) {
			editButtonClickHandler();
		}
		// -------------------------------------------03-01-2022-----------------------------
		if (Array.isArray(requestObject) && requestObject.length === 0) {
			setOldRowData(setOldRowDataHandler);
			setOldReqObject(setOldReqObjectHandler);
		}
		if (Array.isArray(requestObject) && requestObject.length > 0) {
			let documentsetupids = [];
			let oldRowDataArrayValtest = [];
			rowData?.map((i) => {
				documentsetupids.push(i.documentsetupid);
			});
			let uniquedocumentsetupids = [...new Set(documentsetupids)];

			rowData?.map((item) => {
				let dataObject = {};
				for (const prop in item) {
					dataObject[`${prop}Val`] = item[prop];
				}
				// ---------------------------------------------------------------------------------------------------------
				let dataMatch = false;
				let unMatchedData = [];
				oldRowData?.map((oldItem) => {
					let oldDataObject = {};
					for (const oldProp in oldItem) {
						oldDataObject[`${oldProp}`] = oldItem[oldProp];
					}

					// if (oldDataObject?.rowIndexVal === dataObject?.rowIndexVal) {
					if (
						oldDataObject?.rowIndexVal === dataObject?.rowIndexVal &&
						oldDataObject?.documentsetupidVal === dataObject?.documentsetupidVal
					) {
						dataMatch = true;
					}
				});
				if (dataMatch === false) {
					unMatchedData?.push(dataObject);
				}
				const oldRowDataArrayVal = oldRowData;
				if (unMatchedData?.length > 0) {
					for (let i = 0; i < unMatchedData?.length; i++) {
						oldRowDataArrayVal?.push(unMatchedData[i]);
					}
					oldRowDataArrayValtest.push(oldRowDataArrayVal);

					setOldRowData(oldRowDataArrayVal);
					const getOldRowUpdatedDataHandler = () => {
						let dataArray3 = [];
						oldRowDataArrayVal?.map((_) => {
							dataArray3.push(getValue(_));
						});
						return dataArray3;
					};

					setRowData(getOldRowUpdatedDataHandler);
				}
			});

			// */*/*//=====================10-02-2022==================//
			if (oldRowDataArrayValtest?.length > 0) {
				let lastItem = oldRowDataArrayValtest.pop();
				// console.log("oldRowDataArrayValtest---------------------",oldRowDataArrayValtest);
				// console.log("lastItem---------------------",lastItem);
				let lastItemVal = [];
				lastItem?.map((item) => {
					let dataObject = {};
					for (const prop in item) {
						dataObject[`${prop}`] = item[prop];
					}
					if (uniquedocumentsetupids?.includes(item?.documentsetupidVal)) {
						lastItemVal.push(dataObject);
					}
				});
				// console.log("lastItemVal---------------------",lastItemVal);

				setOldRowData(lastItemVal);
				const getOldRowUpdatedDataHandler = () => {
					let dataArray3 = [];
					lastItemVal?.map((_) => {
						dataArray3.push(getValue(_));
					});
					return dataArray3;
				};

				setRowData(getOldRowUpdatedDataHandler);
			}

			// */*/*//=======================10-02-2022================//

			// ============================================================================================================

			// =-=-=-=-+++++++----------------------10-02-2022============================//
			let reqDocumentsetupids = [];
			let reqOldRowDataArrayValtest = [];
			reqObject?.current?.map((i) => {
				reqDocumentsetupids.push(i.documentsetupid);
			});
			// console.log("reqDocumentsetupids-------------",reqDocumentsetupids)
			let reqUniquedocumentsetupids = [...new Set(documentsetupids)];
			// console.log("reqUniquedocumentsetupids-------------",reqUniquedocumentsetupids);
			// =-=-=-=-+++++++----------------------10-02-2022============================//

			reqObject.current?.map((item) => {
				let dataObject = {};
				for (const prop in item) {
					dataObject[`${prop}Val`] = item[prop];
				}
				// ---------------------------------------------------------------------------------------------------------
				let dataMatch = false;
				let unMatchedData = [];
				oldReqObject?.map((oldItem) => {
					let oldDataObject = {};
					for (const oldProp in oldItem) {
						oldDataObject[`${oldProp}`] = oldItem[oldProp];
					}
					// if (oldDataObject?.rowIndexVal === dataObject?.rowIndexVal) {
					if (
						oldDataObject?.rowIndexVal === dataObject?.rowIndexVal &&
						oldDataObject?.documentsetupidVal === dataObject?.documentsetupidVal
					) {
						dataMatch = true;
					}
				});
				if (dataMatch === false) {
					unMatchedData?.push(dataObject);
				}
				const oldRowDataArrayVal = oldReqObject;
				if (unMatchedData?.length > 0) {
					for (let i = 0; i < unMatchedData?.length; i++) {
						oldRowDataArrayVal?.push(unMatchedData[i]);
					}
					// console.log('oldRowDataArrayVal---------------------',oldRowDataArrayVal);
					// console.log("oldRowDataArrayVal---------------",oldRowDataArrayVal)
					reqOldRowDataArrayValtest.push(oldRowDataArrayVal);
					setOldReqObject(oldRowDataArrayVal);

					const getOldRowUpdatedDataHandler1 = () => {
						let dataArray3 = [];
						oldRowDataArrayVal?.map((_) => {
							dataArray3.push(getValue(_));
						});
						return dataArray3;
					};

					reqObject.current = getOldRowUpdatedDataHandler1();
				}
				// console.log('finally unmatched data-------------------------------',unMatchedData)
			});

			// =-=-=-=-+++++++----------------------10-02-2022============================//
			if (reqOldRowDataArrayValtest?.length > 0) {
				let lastItem = reqOldRowDataArrayValtest.pop();
				// console.log("reqOldRowDataArrayValtest---------req------------",reqOldRowDataArrayValtest);
				// console.log("lastItem-----req----------------",lastItem);
				let lastItemVal = [];
				lastItem?.map((item) => {
					let dataObject = {};
					for (const prop in item) {
						dataObject[`${prop}`] = item[prop];
					}
					if (reqUniquedocumentsetupids?.includes(item?.documentsetupidVal)) {
						lastItemVal.push(dataObject);
					}
				});
				// console.log("lastItemVal-----req----------------",lastItemVal);

				setOldReqObject(lastItemVal);

				const getOldRowUpdatedDataHandler1 = () => {
					let dataArray3 = [];
					lastItemVal?.map((_) => {
						dataArray3.push(getValue(_));
					});
					return dataArray3;
				};

				reqObject.current = getOldRowUpdatedDataHandler1();
			}
			// =-=-=-=-+++++++----------------------10-02-2022============================//

			// }
			// --------------------------------------------------------15-12-2021-----------------------
		}
		// ----------------------------------------------------------10-02-2022-------------10-02-2022-----------

		setEditScreen(false);
	}, [isModal1Visible]);

	const hideModal = (mainModalHide = true) => {
		if (Array.isArray(requestObject) && requestObject.length === 0) {
			setOldRowData(setOldRowDataHandler);
			setOldReqObject(setOldReqObjectHandler);
		}
		if (mainModalHide) {
			setModal1Visible((prev) => !prev);
		}
		if (!isValidSubmit) {
			// alert("ac");

			setRequestObject(getOldRequestObjectHandler());
			setRowData(getOldRowDataHandler());
			// -------------------------------------14-12-2021---------------------
			// setRowData({...rowData, getOldRowDataHandler})
			// -------------------------------------14-12-2021---------------------
			reqObject.current = getOldReqObjectHandler();
			// -------------------------------------14-12-2021---------------------
			// setReqObjectState({...reqObjectState,getOldReqObjectHandler})
			// setReqObjectState({getOldReqObjectHandler,...reqObjectState})
			// -------------------------------------14-12-2021------------------------
		}
	};

	const clearErrors = () => {
		setError([]);
		setErrorMsg('');
	};

	const styleSet = {
		// redBorder: "1px solid red",
		redBorder: '',
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
		const newRequestObject = reqObject?.current[parentRowIdx];
		// -----------------------------------------------------------14-12-2021-----------------------------
		// const newRequestObject = reqObjectState[parentRowIdx];
		// -----------------------------------------------------------14-12-2021-----------------------------

		newRequestObject.docNameDataValue = value;
		newRequestObject.expiryYN = expiryYN;
		newRequestObject.srlNo = parentRowIdx + 1;
		newRequestObject.documentType = rowValues?.documentType;
		newRequestObject.noDocRequired = rowValues?.noDocRequired;

		let documentSetupIdValue = newRequestObject.documentsetupid;
		let selectedDocName = [];
		reqObject?.current?.map((val) => {
			if (val?.docNameDataValue !== undefined) {
				selectedDocName.push(val?.docNameDataValue);
			}
		});

		let a = [];
		let hashMap = {};
		rowData.map((data) => {
			let ab = [];
			data.lstDocumentNames.map((data1) => {
				ab.push(data1.docNameDataValue);
			});
			a.push(ab);
		});
		a.forEach(function (arr) {
			// If your subArrays can be in any order, you can use .sort to have consistant order
			hashMap[arr.join('|')] = arr;
		});
		let result = Object.keys(hashMap).map(function (k) {
			if (hashMap[k].includes(value)) {
				return hashMap[k];
			}
		});
		result = result.filter(function (element) {
			return element !== undefined;
		});
		let finalArray = result[0];
		let filterFinalArray = finalArray.filter((el) => !selectedDocName.includes(el));
		// console.log("line no 1001---------",finalArray);
		// console.log("line no 1002---------",selectedDocName);
		// console.log("line no 1009---------",filterFinalArray);
		const modifiedRowData = rowData?.map((item, idx) => {
			// console.log("line no 1004---------",item);

			if (idx !== parentRowIdx) {
				return {
					...item,
					// disabled other row doucment name which is currently selected
					lstDocumentNames: item.lstDocumentNames.map((obj) => {
						// let objDataUp = {... obj, disabled: false}
						let objDataUp = { ...obj };
						if (objDataUp?.documentsetupid === documentSetupIdValue) {
							objDataUp = { ...obj, disabled: false };
						}
						selectedDocName.forEach((element) => {
							if (
								element === objDataUp?.docNameDataValue &&
								objDataUp?.documentsetupid === documentSetupIdValue
							) {
								// if(element===objDataUp?.docNameDataValue){
								objDataUp = { ...objDataUp, disabled: true };
							}
						});
						// console.log('line no 1047-------------',value);
						return objDataUp;
					})
				};
			} else if (parentRowIdx === idx) {
				return {
					...item,
					// find update expiry date  based on selected document
					isExpiryDisable: rowValues?.lstDocumentNames?.find(
						(obj) => obj?.docNameDataValue === value
					)?.expiryYN
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
			newRequestObject.actionDate = null;
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

	const handleOnSubmissionDate = (value, parentRowIdx) => {
		clearErrors();
		const newRequestObject = reqObject.current[parentRowIdx];
		if (value) {
			if (moment(value).isValid()) {
				newRequestObject.submissionDate = moment(value).format('YYYY-MM-DD');
			}
		} else {
			newRequestObject.submissionDate = null;
		}
	};

	const handleOnExpiryDateChange = (value, parentRowIdx) => {
		clearErrors();
		const newRequestObject = reqObject.current[parentRowIdx];
		if (value) {
			if (moment(value).isValid()) {
				newRequestObject.expiryDate = moment(value).format('YYYY-MM-DD');
			}
		} else {
			newRequestObject.expiryDate = null;
		}
	};

	const handleOnActionDateChange = (value, parentRowIdx) => {
		clearErrors();
		const newRequestObject = reqObject.current[parentRowIdx];
		if (value) {
			if (moment(value).isValid()) {
				newRequestObject.actionDate = moment(value).format('YYYY-MM-DD');
			}
		} else {
			newRequestObject.actionDate = null;
		}
	};

	const handleUpload = (_, rowValues, parentRowIndex) => {
		clearErrors();
		const newRequestObject = reqObject.current[parentRowIndex];
		const docStatus = newRequestObject?.docStatus;
		const docName = newRequestObject?.docNameDataValue;
		const submissionDate = newRequestObject?.submissionDate;
		const shouldExpiryDateSelected = newRequestObject?.expiryYN === 'Y' ? true : false;
		const expiryDate = newRequestObject?.expiryDate;
		const actionDate = newRequestObject?.actionDate;
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
			hideModal(false);
			setSelectedUploadIndex(parentRowIndex);
			setModal2Visible(true);
		}
	};

	function disabledPastDate(current) {
		// Can not select days after today and today
		return current && current < moment().startOf('day');
	}

	function disabledFutureDate(current) {
		// Can not select days after today and today
		return current && current > moment().endOf('day');
	}

	const removeAttachmentDoc = (rowIdx) => {
		if (rowData[rowIdx]?.fileName) {
			rowData[rowIdx].fileName = null;
		}
		if (rowData[rowIdx]?.fileType) {
			rowData[rowIdx].fileType = null;
		}
		if (rowData[rowIdx]?.fileDescription) {
			rowData[rowIdx].fileDescription = null;
		}
		if (rowData[rowIdx]?.fileString) {
			rowData[rowIdx].fileString = null;
		}
		if (rowData[rowIdx]?.fileSize) {
			rowData[rowIdx].fileSize = null;
		}
		if (rowData[rowIdx]?.mimetype) {
			rowData[rowIdx].mimetype = null;
		}
		if (rowData[rowIdx]?.FileType) {
			rowData[rowIdx].FileType = null;
		}
		if (rowData[rowIdx]?.attachmentFor) {
			rowData[rowIdx].attachmentFor = null;
		}
		// ------------------reqObject----------------
		if (reqObject?.current[rowIdx]?.fileName) {
			reqObject.current[rowIdx].fileName = null;
		}
		if (reqObject?.current[rowIdx]?.fileType) {
			reqObject.current[rowIdx].fileType = null;
		}
		if (reqObject?.current[rowIdx]?.fileDescription) {
			reqObject.current[rowIdx].fileDescription = null;
		}
		if (reqObject?.current[rowIdx]?.fileString) {
			reqObject.current[rowIdx].fileString = null;
		}
		if (reqObject?.current[rowIdx]?.fileSize) {
			reqObject.current[rowIdx].fileSize = null;
		}
		if (reqObject?.current[rowIdx]?.mimetype) {
			reqObject.current[rowIdx].mimetype = null;
		}
		if (reqObject?.current[rowIdx]?.FileType) {
			reqObject.current[rowIdx].FileType = null;
		}
		if (reqObject?.current[rowIdx]?.attachmentFor) {
			reqObject.current[rowIdx].attachmentFor = null;
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
			setErrorMsg('Please select status as Submitted to upload file');
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
			dataIndex: 'documentsetupid',
			key: 'documentsetupid',
			width: '19%',
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
							reqObject.current[rowIdx].submissionDate = null;
							reqObject.current[rowIdx].expiryDate = null;
							reqObject.current[rowIdx].actionDate = null;
							if (value === 'D') {
								removeAttachmentDoc(rowIdx);
							}
							rowData[rowIdx].submissionDateValue = null;
							rowData[rowIdx].expiryDateValue = null;
							rowData[rowIdx].actionDateValue = null;
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
						width: '113px',
						border:
							error[parentRowIdx]?.submissionDate === true &&
							error[parentRowIdx]?.idx === parentRowIdx
								? styleSet.redBorder
								: ''
					}}
					onChange={(val) => {
						updateColumnsValue('submissionDateValue', val, parentRowIdx);
						handleOnSubmissionDate(val, parentRowIdx);
					}}
					disabledDate={disabledFutureDate}
					disabled={reqObject.current[parentRowIdx]?.isDeferred === 'N' ? false : true}
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
						width: '113px',
						border:
							error[parentRowIdx]?.expiryDate === true && error[parentRowIdx]?.idx === parentRowIdx
								? styleSet.redBorder
								: ''
					}}
					onChange={(value) => {
						updateColumnsValue('expiryDateValue', value, parentRowIdx);
						handleOnExpiryDateChange(value, parentRowIdx);
					}}
					format='DD-MM-YYYY'
					disabled={
						(isExpiryDisable === 'Y' || reqObject?.current[parentRowIdx]?.expiryYN === 'Y') &&
						reqObject?.current[parentRowIdx]?.isDeferred === 'N'
							? false
							: true
					}
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
							width: '113px',
							border:
								error[parentRowIdx]?.actionDate === true &&
								error[parentRowIdx]?.idx === parentRowIdx
									? styleSet.redBorder
									: ''
						}}
						disabledDate={disabledPastDate}
						onChange={(value) => {
							updateColumnsValue('actionDateValue', value, parentRowIdx);
							handleOnActionDateChange(value, parentRowIdx);
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
		clearRowData();
		hideModal();
	};

	const updateColumnsValue = (key, value, rowIndex) => {
		setRowData((prevRowData) => {
			const newPrevRowData = [...prevRowData];
			newPrevRowData[rowIndex][key] = value;
			return prevRowData;
		});
	};

	const clearRowData = () => {
		if (Array.isArray(requestObject) && requestObject.length > 0) {
			setRequestObject(getOldRequestObjectHandler());
		} else {
			setOldRequestsObject([]);
		}
		setRowData(getOldRowDataHandler());

		reqObject.current = getOldReqObjectHandler();
	};

	const setValue = (item, index, type = '') => {
		let dataObject = {};
		for (const prop in item) {
			dataObject[`${prop}Val`] = item[prop];
			if (
				type !== 'oldRequestObjectState' &&
				type !== 'oldRowDataState' &&
				type !== 'oldReqObjectState'
			) {
				dataObject.keyVal = index;
				dataObject.rowIndexVal = index;
			}
		}

		if (
			'documentIdVal' in dataObject &&
			dataObject?.docStatusVal === 'U' &&
			dataObject?.fileStringVal !== null &&
			dataObject?.fileStringVal !== ''
		) {
			delete dataObject?.documentIdVal;
		}
		return dataObject;
	};

	const getValue = (data) => {
		let dataObject1 = {};
		for (const prop in data) {
			dataObject1[prop.substring(0, prop.length - 3)] = data[prop];
		}
		return dataObject1;
	};

	const setOldRequestObjectHandler = (updatedData) => {
		let dataArray = [];
		updatedData?.map((_, index) => {
			dataArray?.push(setValue(_, index, 'oldRequestObjectState'));
		});
		return dataArray;
	};

	const getOldRequestObjectHandler = () => {
		let dataArray1 = [];
		oldRequestsObject?.map((_) => {
			dataArray1?.push(getValue(_));
		});
		return dataArray1;
	};

	const setOldRowDataHandler = () => {
		let dataArray2 = [];
		rowData.map((_, index) => {
			dataArray2.push(setValue(_, index, 'oldRowDataState'));
		});
		// console.log('dataArray2------------', dataArray2);
		return dataArray2;
	};

	const getOldRowDataHandler = () => {
		let dataArray3 = [];
		oldRowData.map((_) => {
			dataArray3.push(getValue(_));
		});
		return dataArray3;
	};

	const setOldReqObjectHandler = () => {
		let dataArray4 = [];
		reqObject.current.map((_, index) => {
			dataArray4.push(setValue(_, index, 'oldReqObjectState'));
		});
		return dataArray4;
	};

	const getOldReqObjectHandler = () => {
		let dataArray5 = [];
		oldReqObject.map((_) => {
			dataArray5.push(getValue(_));
		});
		return dataArray5;
	};

	const removeDocIdFromFinalResult = (newRequestObject) => {
		let newCleanFinalResult = [];
		if (newRequestObject?.length > 0) {
			newRequestObject?.map((item) => {
				let newCleanSingalObject = {};
				for (const prop in item) {
					newCleanSingalObject[`${prop}`] = item[prop];
				}
				if (
					'documentId' in newCleanSingalObject &&
					newCleanSingalObject?.docStatus === 'U' &&
					newCleanSingalObject?.fileString !== null &&
					newCleanSingalObject?.fileString !== ''
				) {
					delete newCleanSingalObject?.documentId;
				}
				newCleanFinalResult.push(newCleanSingalObject);
			});
		}
		return newCleanFinalResult;
	};

	const onSubmit = () => {
		// let isValidSubmit = true;
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
					isValidSubmit = false;
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

		if (!isValidSubmit) {
			return;
		}

		for (let i = 0; i < newRequestObject.length; i++) {
			const e = newRequestObject[i];
			if (e?.docmandatory === 'Y') {
				if (e.docStatus !== 'U' && e.docStatus !== 'D') {
					isValidSubmit = false;
					setError((prev) => {
						const newError = [...prev];
						newError[e.rowIndex] = {
							idx: e.rowIndex,
							docStatus: e.docStatus !== 'U' ? true : false
						};
						return newError;
					});
					setErrorMsg('Please select status as Submitted to upload file');
					break;
				}
				if (e.docStatus === 'D') {
					if (!e.actionDate) {
						isValidSubmit = false;
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
						isValidSubmit = false;
						setErrorMsg('Please upload required docs');
						break;
					}
				}
			}
		}

		// ======================10-02-2022===================
		for (let i = 0; i < newRequestObject.length; i++) {
			const e = newRequestObject[i];

			if (e?.docmandatory !== 'Y') {
				if (e.docStatus === 'U') {
					if (!e.fileName) {
						isValidSubmit = false;
						setErrorMsg('Please upload docs for status submitted');
						break;
					}
				}
			}
		}
		// ======================10-02-2022===================

		if (isValidSubmit) {
			setOldReqObject(setOldReqObjectHandler);
			setOldRowData(setOldRowDataHandler());

			setRequestObject(removeDocIdFromFinalResult(newRequestObject));
			setOldRequestsObject(
				setOldRequestObjectHandler(removeDocIdFromFinalResult(newRequestObject))
			);

			onValuesChange({
				DocumentInfo: removeDocIdFromFinalResult(newRequestObject)
			});
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

export default memo(DocumentsDetailsFormCard);
