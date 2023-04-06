import { Card, Row, Col, Form, Radio, Select, Input } from 'antd';
import { getCifValidation } from '../../../api/customerCreateApi';
import moment from 'moment';
import { useEffect } from 'react';

const ProspectTypeFormCard = ({
	form,
	formData,
	onValuesChange,
	rules,
	csObject,
	action = '',
	setProspectFormData = {},
	defaultProspectFormData = {}
}) => {
	const handleOnValuesChange = (key, value) => {
		if (action === 'edit' && key === 'prospectId') {
			onValuesChange({ [key]: value, ['prospectRequisitionN']: value });
		} else {
			onValuesChange({ [key]: value });
		}
	};

	const cifValidator = async (rule, value, callback) => {
		if (value) {
			try {
				let response = await getCifValidation(formData.id, value);
				handleOnValuesChange('qib', response.data?.field1);
				if (!response.data.success) {
					// alert('1');

					if (formData?.cifRelatedclientRequisitionData) {
						let dataObject = {};
						for (const prop in defaultProspectFormData) {
							dataObject[`${prop}`] = defaultProspectFormData[prop];
						}
						// ======================================================
						dataObject.id = null;
						// dataObject.clientId = null
						dataObject.recType = null;
						dataObject.version = null;
						dataObject.mnemonic = null;
						dataObject.firstName = null;
						dataObject.surName = null;
						dataObject.amcType = null;
						dataObject.contactPerson = null;
						dataObject.mothersName = null;
						dataObject.dateOfBirth = null;
						dataObject.gender = null;
						dataObject.genderName = null;
						dataObject.legalStatus = null;
						dataObject.legalStatusName = null;
						dataObject.race = null;
						dataObject.bumiputraYn = null;
						dataObject.resident = null;
						dataObject.residentStatus = null;
						dataObject.residentStatusName = null;
						dataObject.relatedYn = null;
						dataObject.maritalStatus = null;
						dataObject.maritalStatusName = null;
						dataObject.noOfDependents = null;
						dataObject.telephoneHome = null;
						dataObject.telephoneOff = null;
						dataObject.telephoneExtn = null;
						dataObject.faxNo = null;
						dataObject.mobileNo = null;
						dataObject.eMail = null;
						dataObject.permAdd1 = null;
						dataObject.permAdd2 = null;
						dataObject.permAdd3 = null;
						dataObject.permCity = null;
						dataObject.permCityName = null;
						dataObject.permAddPin = null;
						dataObject.mailAdd1 = null;
						dataObject.mailAdd2 = null;
						dataObject.mailAdd3 = null;
						dataObject.mailCity = null;
						dataObject.mailCityName = null;
						dataObject.mailAddPin = null;
						dataObject.compAdd1 = null;
						dataObject.compAdd2 = null;
						dataObject.compAdd3 = null;
						dataObject.compCity = null;
						dataObject.compCountry = null;
						dataObject.compAddPin = null;
						dataObject.regDocument = null;
						dataObject.regNumber = null;
						dataObject.regBy = null;
						dataObject.regDate = null;
						dataObject.regCountry = null;
						dataObject.compSealreqYn = null;
						dataObject.signRequirement = null;
						dataObject.irdRefNo = null;
						dataObject.idType = null;
						dataObject.idTypeName = null;
						dataObject.oldIdNo = null;
						dataObject.idNo = null;
						dataObject.idIssueDate = null;
						dataObject.idLifeTime = null;
						dataObject.idExpDate = null;
						dataObject.otherIdNo = null;
						dataObject.employment = null;
						dataObject.taxId = null;
						dataObject.panNumber = null;
						dataObject.urgContName = null;
						dataObject.urgAdd1 = null;
						dataObject.urgAdd2 = null;
						dataObject.urgAdd3 = null;
						dataObject.urgCity = null;
						dataObject.urgAddPin = null;
						dataObject.urgTelNo = null;
						dataObject.urgMobNo = null;
						dataObject.bkoffAssignment = null;
						dataObject.agent = null;
						dataObject.remarks = null;
						dataObject.familyCcid = null;
						dataObject.webPassword = null;
						dataObject.secretQuestion = null;
						dataObject.secretQuestionAnswer = null;
						dataObject.lastLoginDate = null;
						dataObject.resetPassword = null;
						dataObject.salutation = null;
						dataObject.salutationName = null;
						dataObject.occupation = null;
						dataObject.occupationName = null;
						dataObject.genmailYn = null;
						dataObject.categoryMfid = null;
						dataObject.prospectId = null;
						dataObject.prospectName = null;
						dataObject.dateBestExe = null;
						dataObject.dateConsent = null;
						dataObject.operationMode = null;
						dataObject.riskAppetite = null;
						dataObject.riskId = null;
						dataObject.resPermitNo = null;
						dataObject.resPermitExpDate = null;
						dataObject.regionalPref = null;
						dataObject.investHorizon = null;
						dataObject.assetType = null;
						dataObject.liquidityReq = null;
						dataObject.assetGroup = null;
						dataObject.sectoralPref = null;
						dataObject.commPref = null;
						dataObject.corresLang = null;
						dataObject.stkexindex = null;
						dataObject.relType = null;
						dataObject.titleRegional = null;
						dataObject.firstNameRegional = null;
						dataObject.dateOfIssue = null;
						dataObject.placeOfIssue = null;
						dataObject.secondName = null;
						dataObject.thirdName = null;
						dataObject.convertedOn = null;
						dataObject.sourceNetworth = null;
						dataObject.sourceNetworthName = null;
						dataObject.networth = null;
						dataObject.networthName = null;
						dataObject.income = null;
						dataObject.incomeName = null;
						dataObject.activeYn = null;
						dataObject.clientType = null;
						dataObject.dateOfBirthHijri = null;
						dataObject.addClass = null;
						dataObject.status = null;
						dataObject.fatcaClassification = null;
						dataObject.fatcaClassificationName = null;
						dataObject.expiryFrq = null;
						dataObject.relatedpartyYn = null;
						dataObject.mail2Add1 = null;
						dataObject.mail2Add2 = null;
						dataObject.mail2Add3 = null;
						dataObject.mail2City = null;
						dataObject.mail2Country = null;
						dataObject.mail2AddPin = null;
						dataObject.mail3Add1 = null;
						dataObject.mail3Add2 = null;
						dataObject.mail3Add3 = null;
						dataObject.mail3City = null;
						dataObject.mail3Country = null;
						dataObject.mail3AddPin = null;
						dataObject.branch = null;
						dataObject.branchName = null;
						dataObject.source = null;
						dataObject.sourceName = null;
						dataObject.headOfFamily = null;
						dataObject.rm2 = null;
						dataObject.rm2Name = null;
						dataObject.rm3 = null;
						dataObject.rm3Name = null;
						dataObject.personalidVerified = null;
						dataObject.kycCheck = null;
						dataObject.permanentState = null;
						dataObject.permanentStateName = null;
						dataObject.empState = null;
						dataObject.mailstate = null;
						dataObject.mailstateName = null;
						dataObject.mailstate1 = null;
						dataObject.mailstate2 = null;
						dataObject.sourceType = null;
						dataObject.sourceTypeName = null;
						dataObject.sourceValue = null;
						dataObject.sourceValueName = null;
						dataObject.profileImage = null;
						dataObject.longitude = null;
						dataObject.latitude = null;
						dataObject.dialCode = null;
						dataObject.alternateDialCode = null;
						dataObject.taxStatus = null;
						dataObject.taxStatusName = null;
						dataObject.potentiallyVulnerable = null;
						dataObject.potentiallyVulnerableName = null;
						dataObject.bannedList = null;
						dataObject.bannedListName = null;
						dataObject.referrerName = null;
						dataObject.natureofbusiness = null;
						dataObject.natureofbusinessName = null;
						dataObject.riskCategoryAmla = null;
						dataObject.riskCategoryAmlaName = null;
						dataObject.workFlowStatus = null;
						dataObject.workFlowId = null;
						dataObject.userGroup = null;
						dataObject.stageSequence = null;
						dataObject.amla = null;
						dataObject.amlaName = null;
						dataObject.attachMisc = null;
						dataObject.investmentValue = null;
						dataObject.fullName = null;
						dataObject.profileInitial = null;
						dataObject.inputDateTime = null;
						dataObject.conditionCode = null;
						dataObject.reason = null;
						dataObject.isExistingCustomer = null;
						dataObject.clientCode = null;
						dataObject.familyName = null;
						dataObject.address = null;
						dataObject.netAsset = null;
						dataObject.isEditable = null;
						dataObject.additionalFields = null;
						dataObject.isblanketWaiver = null;
						dataObject.subType = null;
						dataObject.subTypeName = null;
						dataObject.suffix = null;
						dataObject.relation = null;
						dataObject.relatedParty = null;
						dataObject.occupationType = null;
						dataObject.city = null;
						dataObject.employerName = null;
						dataObject.communicationPre = null;
						dataObject.riskCategory = null;
						dataObject.riskCategoryName = null;
						dataObject.riskScore = null;
						dataObject.tin = null;
						dataObject.generateCsaf = null;
						dataObject.mailingPreference = null;
						dataObject.frequency = null;
						dataObject.location = null;
						dataObject.deliveryInstr = null;
						dataObject.authorizedPerson = null;
						dataObject.deliverToRm = null;
						dataObject.deliverToRmName = null;
						dataObject.otherInstruction = null;
						dataObject.qib = null;
						dataObject.qibName = null;
						dataObject.secId = null;
						dataObject.secIdName = null;
						dataObject.secIdNo = null;
						dataObject.secIdExpdt = null;
						dataObject.sourceOfFundsOth = null;
						dataObject.employeeId = null;
						dataObject.secondaryIssuanceDate = null;
						dataObject.issuanceCountryPrimary = null;
						dataObject.issuanceCountrySecondary = null;
						dataObject.primaryIssuanceDate = null;
						dataObject.sophisticatedYn = null;
						dataObject.workFlowUserGroup = null;
						dataObject.workFlowFormType = null;
						dataObject.clientRequisitionN = null;
						dataObject.primaryId = null;
						dataObject.primaryIdName = null;
						dataObject.primaryIdnumber = null;
						dataObject.deliveryInstructionsName = null;
						dataObject.mailingPreferenceName = null;
						dataObject.frequencyName = null;
						dataObject.locationType = null;
						dataObject.otherInstructions = null;
						dataObject.cityName = null;
						dataObject.surnameName = null;
						dataObject.dob = null;
						dataObject.mailState = null;
						dataObject.sourceOfFund = null;
						dataObject.Amla = null;
						dataObject.disablePrermanentAddressField = false;
						dataObject.cifRelatedclientRequisitionData = false;

						// ======================================================
						// setProspectFormData(dataObject);
						// form.setFieldsValue(dataObject);
					}
					return Promise.reject(new Error(response.data.message));
				} else {
					let clientRequisitionData = response?.data?.clientRequisition;
					if (clientRequisitionData !== null && clientRequisitionData !== '') {
						let dataObject = {};
						for (const prop in clientRequisitionData) {
							dataObject[`${prop}`] = clientRequisitionData[prop];
						}
						dataObject.dob = clientRequisitionData?.dateOfBirth
							? moment(clientRequisitionData?.dateOfBirth, 'YYYY-MM-DD')
							: null;

						dataObject.natureOfBusiness = clientRequisitionData?.natureofbusiness;
						dataObject.residentialStatus = clientRequisitionData?.residentStatus;
						dataObject.Amla = clientRequisitionData?.amla;
						dataObject.InvestmentValue = clientRequisitionData?.investmentValue;
						dataObject.sourceOfFund = clientRequisitionData?.sourceNetworth;
						dataObject.mailState = clientRequisitionData?.mailstate;
						dataObject.event = 'M';
						dataObject.isBlanketWaiver = clientRequisitionData?.isblanketWaiver;
						dataObject.qib = clientRequisitionData?.qibName;
						dataObject.clientRequisitionN = clientRequisitionData?.clientRequisitionN;
						dataObject.titleCondition =
							clientRequisitionData?.title === 'MR'
								? 'M'
								: clientRequisitionData?.title === 'MS'
								? 'F'
								: 'A';
						dataObject.title =
							clientRequisitionData?.title === 'MR'
								? 'MR|M'
								: clientRequisitionData?.title === 'MS'
								? 'MS|F'
								: `${clientRequisitionData?.title}|A`;

						if (
							clientRequisitionData?.mailAdd1 === clientRequisitionData?.permAdd1 &&
							clientRequisitionData?.mailCountry === clientRequisitionData?.permCountry &&
							clientRequisitionData?.mailstate === clientRequisitionData?.permanentState &&
							clientRequisitionData?.mailCity === clientRequisitionData?.permCity &&
							clientRequisitionData?.mailAddPin === clientRequisitionData?.permAddPin
						) {
							dataObject.disablePrermanentAddressField = true;
						} else {
							dataObject.disablePrermanentAddressField = false;
						}
						dataObject.cifRelatedclientRequisitionData = true;
						// setProspectFormData(dataObject);
						// form.setFieldsValue(dataObject);
					}
					return Promise.resolve();
				}
			} catch (error) {}
		} else {
			return Promise.resolve();
		}
	};
	const cifNumberDisable = () => {
		if (formData?.reference !== '' || action !== 'edit') {
			return false;
		}

		return true;
	};

	return (
		<Card className='pt-ref-cif-form-card'>
			<Form
				className='form-container'
				layout='vertical'
				initialValues={formData}
				form={form}
				onValuesChange={onValuesChange}
			>
				<Row align='middle' justify='space-between' className='pt-section'>
					<Col span={8}>
						<Form.Item
							name='prospectType'
							label={<div className='text'>Prospect Type</div>}
							validateTrigger={['onChange', 'onBlur']}
							rules={rules ? rules.type : []}
							style={{ width: '100%' }}
						>
							<Radio.Group
								className='field pt-field'
								value={formData.prospectType}
								defaultValue={formData?.customertype ? formData.customertype : 'C'}
								size='large'
								style={{ width: '95%' }}
							>
								{csObject &&
									csObject.Type &&
									csObject.Type.dropDownValue.map((radioOption) => (
										<Radio.Button
											style={{ width: '50%' }}
											className={`radio-field ${
												formData.prospectType === radioOption.dataValue ? 'active' : ''
											}`}
											value={radioOption.dataValue}
											key={radioOption.dataValue}
										>
											{radioOption.displayValue}
										</Radio.Button>
									))}
							</Radio.Group>
						</Form.Item>
					</Col>
					<Col span={7}>
						<Form.Item
							name='reference'
							label='Reference'
							validateTrigger={['onChange', 'onBlur']}
							rules={rules ? rules.reference : []}
						>
							<Select
								disabled
								onChange={(val) => handleOnValuesChange('reference', val)}
								placeholder='Select reference'
								size='large'
								value={formData?.reference}
							>
								{csObject?.Reference?.dropDownValue?.map((item, i) => (
									<Select.Option key={i} value={item.dataValue}>
										{item.displayValue}
									</Select.Option>
								))}
							</Select>
						</Form.Item>
					</Col>
					<Col span={7}>
						<Form.Item
							name='cifnumber'
							label='CIF Number'
							validateTrigger={['onBlur', 'onChange']}
							rules={rules.cifnumber}
							// rules={formData?.reference ?
							//   [
							//     {
							//       validator: action!=="edit" ? cifValidator : ""
							//     },
							//     ...rules?.cifnumber,
							//   ]
							//   : []
							// }
							// required={formData?.reference ? true : false}
						>
							<Input
								disabled={cifNumberDisable()}
								value={
									formData?.prospectRequisitionN
										? formData?.prospectRequisitionN
										: formData?.cifnumber
								}
								onChange={(evt) => handleOnValuesChange('cifnumber', evt.target.value)}
								onKeyPress={(evt) => {
									var k = evt.which;
									if ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || (k >= 48 && k <= 57)) {
										return true;
									} else {
										evt.preventDefault();
										return false;
									}
								}}
								size='large'
								placeholder='Enter CIF number'
							/>
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</Card>
	);
};

export default ProspectTypeFormCard;
