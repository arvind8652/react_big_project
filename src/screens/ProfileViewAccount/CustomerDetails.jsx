import { Row, Col } from 'antd';
import TypoGraphy from '../../components/TypoGraphy/TypoGraphy';
import moment from 'moment';
import { palette, fontSet } from '../../theme';
import { CloseOutlined, UserOutlined } from '@ant-design/icons';
import { getDateFormat } from '../../utils/utils';

const customerDetailsDefault = {
	salutation: '',
	name: '',
	category: '',
	CIF: '',
	dateOfBirth: '',
	gender: '',
	nationality: '',
	taxStatus: '',
	natureOfBusiness: '',
	occupation: '',
	sourceOfFund: '',
	annualIncome: '',
	netWorth: '',
	relationshipManager: '',
	branch: '',
	clientId: '',
	clientType: null,
	branchName: ''
};

const CustomerDetails = ({ customerDetails = customerDetailsDefault }) => {
	const styleSet = {
		wrapper: {
			display: 'grid',
			gridTemplateColumns: 'repeat(3, 1fr)',
			gap: '5px',
			gridAutoRows: '80px'
		},
		container: {
			flex: 1,
			width: '100%',
			marginTop: '10px',
			marginBottom: '15px'
		},
		contactBlock: {
			color: palette.secondary.light,
			height: 0.5
		},
		subCardHeader: {
			fontSize: fontSet.body.xlarge,
			color: palette.text.dark
		},
		text: {
			fontSize: '22px',
			color: 'rgb(0, 0, 0)',
			fontWeight: '600'
		},

		parentCheckBox: { display: 'flex', alignItems: 'center', padding: '10px' },
		checkboxContainer: {
			flex: 0.1,
			justifyContent: 'center',
			alignItems: 'center'
		},
		itemCheckbox: { flex: 0.9 },
		tag: {
			display: 'flex',
			backgroundColor: '#F6F7FB',
			color: '#5D6DD1',
			alignItems: 'center',
			borderRadius: 10,
			padding: 5
		},
		close: {
			paddingLeft: 5,
			paddingRight: 5
		},
		name: {
			whiteSpace: 'nowrap',
			width: '100%',
			overflow: 'hidden',
			textOverflow: 'ellipsis'
		},
		tagContainer: { overflowX: 'auto', display: 'flex', paddingBottom: 10 },
		dropDownHeight: { maxHeight: '150px', overflowY: 'scroll' }
	};
	return (
		// <>
		//   <Row>
		//     <Col span={8} style={styleSet.container}>
		//       <TypoGraphy label={"Full Name"}>
		//         {console.log("customerdetails", customerDetails)}
		//         {customerDetails.salutation}
		//         {customerDetails.name}
		//       </TypoGraphy>
		//     </Col>
		//     <Col span={8} style={styleSet.container}>
		//       <TypoGraphy label={"Category"}>{customerDetails.category}</TypoGraphy>
		//     </Col>
		//     <Col span={8} style={styleSet.container}>
		//       <TypoGraphy label={"CIF"}>{customerDetails.clientId}</TypoGraphy>
		//     </Col>
		//   </Row>
		//   <Row>
		//     <Col span={8} style={styleSet.container}>
		//       {/* <TypoGraphy label={"Date Of Birth"}> */}
		//       <TypoGraphy label={customerDetails.clientType == "C" || customerDetails.clientType == null ? "Date Of Incorporation" : "Date of Birth"}>

		//         {moment(customerDetails.dateOfBirth).format("DD MMM YYYY")}
		//       </TypoGraphy>
		//     </Col>
		//     <Col span={8} style={styleSet.container}>
		//       <TypoGraphy label={"Gender"}>{customerDetails.clientType == "C" || customerDetails.clientType == null ? "NA" : customerDetails.gender}</TypoGraphy>
		//     </Col>
		//     <Col span={8} style={styleSet.container}>
		//       <TypoGraphy label={"Nationality"}>
		//         {customerDetails.nationality}
		//       </TypoGraphy>
		//     </Col>
		//   </Row>
		//   <Row>
		//     <Col span={8} style={styleSet.container}>
		//       <TypoGraphy label={"Tax Status"}>
		//         {customerDetails.taxStatus}
		//       </TypoGraphy>
		//     </Col>
		//     <Col span={8} style={styleSet.container}>
		//       <TypoGraphy label={"Nature Of Business"}>
		//         {customerDetails.natureOfBusiness}
		//       </TypoGraphy>
		//     </Col>
		//     <Col span={8} style={styleSet.container}>
		//       <TypoGraphy label={"Occupation"}>
		//         {customerDetails.occupation}
		//       </TypoGraphy>
		//     </Col>
		//   </Row>
		//   <Row>
		//     <Col span={8} style={styleSet.container}>
		//       <TypoGraphy label={"Source Of Fund"}>
		//         {customerDetails.sourceOfFund}
		//       </TypoGraphy>
		//     </Col>
		//     <Col span={8} style={styleSet.container}>
		//       <TypoGraphy label={"Annual Income"}>
		//         {customerDetails.annualIncome}
		//       </TypoGraphy>
		//     </Col>
		//     <Col span={8} style={styleSet.container}>
		//       <TypoGraphy label={"Net Worth"}>
		//         {customerDetails.netWorth}
		//       </TypoGraphy>
		//     </Col>
		//   </Row>
		//   <Row>
		//     <Col span={8} style={styleSet.container}>
		//       <TypoGraphy label={"Relationship Manager"}>
		//         {customerDetails.relationshipManager}
		//       </TypoGraphy>
		//     </Col>
		//     <Col span={8} style={styleSet.container}>
		//       <TypoGraphy label={"Branch"}>{customerDetails.branchName}</TypoGraphy>
		//     </Col>
		//   </Row>
		// </>

		/// Full Details
		<div className='customerDetailViewDiv'>
			<Row>
				<Col span={8}>
					<TypoGraphy label={'Full Name'}>
						{customerDetails?.customerType === 'I' ? customerDetails?.salutationName : ''}{' '}
						{customerDetails?.firstName} {customerDetails?.secondName} {customerDetails?.thirdName}{' '}
						{customerDetails?.suffix ? '- ' + customerDetails?.suffix : ''}
					</TypoGraphy>
				</Col>
				<Col span={8}>
					<TypoGraphy label={'Category'}>{customerDetails?.legalStatusName ?? '-'}</TypoGraphy>
				</Col>
				<Col span={8}>
					<TypoGraphy label={'CIF'}>
						{customerDetails?.otherIdNo ? customerDetails?.otherIdNo : '-'}
					</TypoGraphy>
				</Col>
			</Row>

			<Row>
				<Col span={8}>
					<TypoGraphy label={'Group/ Family name'}>
						{/* {customerDetails?.surnameName} */}
						{customerDetails?.familyName ?? '-'}
					</TypoGraphy>
				</Col>
				<Col span={8}>
					<TypoGraphy label={'Head of Family'}>{customerDetails?.headOfFamily ?? '-'}</TypoGraphy>
				</Col>
				<Col span={8}>
					<TypoGraphy label={'Sub Type'}>{customerDetails?.subTypeName ?? '-'}</TypoGraphy>
				</Col>
			</Row>

			<Row>
				<Col span={8}>
					<TypoGraphy
						label={
							customerDetails?.customerType === 'C'
								? 'Place of Incorporation City'
								: 'Place of Birth (City)'
						}
					>
						{customerDetails?.cityName ?? '-'}
					</TypoGraphy>
				</Col>
				<Col span={8}>
					<TypoGraphy
						label={
							customerDetails?.customerType === 'C'
								? 'Place of Incorporation Country'
								: 'Place of Birth (Country)'
						}
					>
						{customerDetails?.countryName ?? '-'}
					</TypoGraphy>
				</Col>
				<Col span={8}>
					<TypoGraphy label={'Residential Status'}>
						{customerDetails?.residentStatusName ?? '-'}
					</TypoGraphy>
				</Col>
			</Row>

			<Row>
				{customerDetails?.customerType === 'I' && (
					<Col span={8}>
						{/* <TypoGraphy label={'Maritial Status'}> */}
						<TypoGraphy label={'Marital Status'}>
							{customerDetails?.maritalStatusName ?? '-'}
						</TypoGraphy>
					</Col>
				)}
				<Col span={8}>
					{/* <TypoGraphy label={'Source of Fund (Others)'}> */}
					<TypoGraphy label={'Source of Wealth (Others)'}>
						{customerDetails?.sourceOfFundsOth ?? '-'}
					</TypoGraphy>
				</Col>
				<Col span={8}>
					<TypoGraphy label={'Employer Name'}>{customerDetails?.employerName ?? '-'}</TypoGraphy>
				</Col>
			</Row>

			<Row>
				<Col span={8}>
					{/* <TypoGraphy label={"Employer ID"}>{customerDetails?.employeeId}</TypoGraphy> */}
					<TypoGraphy label={'Employee ID'}>{customerDetails?.employeeId ?? '-'}</TypoGraphy>
				</Col>
				<Col span={8}>
					<TypoGraphy label={customerDetails?.customerType === 'C' ? 'DOI' : 'Date of Birth'}>
						{customerDetails?.dateOfBirth
							? moment(customerDetails?.dateOfBirth).format(getDateFormat())
							: '-'}
					</TypoGraphy>
				</Col>
				{customerDetails?.customerType === 'I' && (
					<Col span={8}>
						<TypoGraphy label={'Gender'}>{customerDetails?.genderName ?? '-'}</TypoGraphy>
					</Col>
				)}
			</Row>
			<Row>
				<Col span={8}>
					<TypoGraphy label={customerDetails?.customerType === 'I' ? 'Nationality' : 'Domicile'}>
						{customerDetails?.nationalityName ?? '-'}
					</TypoGraphy>
				</Col>
				<Col span={8}>
					<TypoGraphy label={'Tax Status'}>{customerDetails?.taxStatusName ?? '-'}</TypoGraphy>
				</Col>
				<Col span={8}>
					<TypoGraphy label={'Nature Of Business'}>
						{customerDetails?.natureofbusinessName ?? '-'}
					</TypoGraphy>
				</Col>
			</Row>
			<Row>
				<Col span={8}>
					<TypoGraphy label={'Occupation'}>{customerDetails?.occupationName ?? '-'}</TypoGraphy>
				</Col>
				<Col span={8}>
					{/* <TypoGraphy label={'Source Of Fund'}> */}
					<TypoGraphy label={'Source Of Wealth'}>
						{customerDetails?.sourceNetworthName ?? '-'}
					</TypoGraphy>
				</Col>
				<Col span={8}>
					<TypoGraphy label={'Annual Income'}>{customerDetails?.incomeName ?? '-'}</TypoGraphy>
				</Col>
			</Row>
			<Row>
				<Col span={8}>
					{/* <TypoGraphy label={'Net Worth'}>{customerDetails?.networthName ?? '-'}</TypoGraphy> */}
					<TypoGraphy label={'Financial Situation'}>
						{customerDetails?.networthName ?? '-'}
					</TypoGraphy>
				</Col>

				<Col span={8}>
					<TypoGraphy label={'Client Classification'}>
						{customerDetails?.physchlgdMinorName ?? '-'}
					</TypoGraphy>
				</Col>
			</Row>
			<Row>
				<Col span={8} style={styleSet.container}>
					<TypoGraphy label={'Related Party'}>
						{customerDetails?.relatedParty?.length > 0 ? (
							<div style={styleSet.tagContainer}>
								{customerDetails?.relatedParty?.map((e) => (
									<Col span={12}>
										<div style={styleSet.tag}>
											<div style={styleSet.close}>
												<UserOutlined />
											</div>
											<div style={styleSet.name}>
												{e?.display_value ? e?.display_value : e?.displayValue}
											</div>
										</div>
									</Col>
								))}
							</div>
						) : (
							'-'
						)}
					</TypoGraphy>
				</Col>
			</Row>
		</div>
	);
};
export default CustomerDetails;
