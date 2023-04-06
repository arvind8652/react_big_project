import { Row, Col } from 'antd';
import TypoGraphy from '../../components/TypoGraphy/TypoGraphy';
import moment from 'moment';
import { getDateFormat } from '../../utils/utils';

import { UserOutlined } from '@ant-design/icons';
import './customerViewDetails.scss';

const defaultValue = {
	fullName: 'Mr. Alexandra Romus',
	category: 'Wealth',
	CIF: '1345432345',
	dateOfBirth: '12 Jan 1967',
	gender: 'Female',
	nationality: 'Philippines',
	taxStatus: 'Mr. Alexandra Romus',
	natureOfBusiness: 'Wealth',
	occupation: '1345432345',
	sourceOfFund: 'Source of Fund',
	annualIncome: '5441235444',
	netWorth: '1345432345',
	relationshipManager: 'Johnathan Doe',
	branch: 'Central Avenue'
};

const CustomerDetails = ({ customerDetails = defaultValue }) => {
	const styleSet = {
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
					{/* <TypoGraphy label={"CIF"}>{customerDetails?.clientId}</TypoGraphy> */}
					<TypoGraphy label={'CIF'}>
						{/* {customerDetails?.clientRequisitionN ? customerDetails?.clientRequisitionN : customerDetails?.clientId} */}
						{customerDetails?.otherIdNo ? customerDetails?.otherIdNo : '-'}
					</TypoGraphy>
				</Col>
			</Row>

			<Row>
				<Col span={8}>
					<TypoGraphy label={'Group/ Family name'}>
						{customerDetails?.surnameName ?? '-'}
					</TypoGraphy>
				</Col>
				<Col span={8}>
					<TypoGraphy label={'Sub Type'}>{customerDetails?.subTypeName ?? '-'}</TypoGraphy>
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
					<TypoGraphy label={'Residential Status'}>
						{customerDetails?.residentStatusName ?? '-'}
					</TypoGraphy>
				</Col>
				{customerDetails?.customerType === 'I' && (
					<Col span={8}>
						{/* <TypoGraphy label={'Maritial Status'}> */}
						<TypoGraphy label={'Marital Status'}>
							{customerDetails?.maritalStatusName ?? '-'}
						</TypoGraphy>
					</Col>
				)}
			</Row>

			<Row>
				<Col span={8}>
					{/* <TypoGraphy label={'Source of Fund (Others)'}> */}
					<TypoGraphy label={'Source of Wealth (Others)'}>
						{customerDetails?.sourceOfFundsOth ?? '-'}
					</TypoGraphy>
				</Col>
				<Col span={8}>
					<TypoGraphy label={'Employer Name'}>{customerDetails?.employerName ?? '-'}</TypoGraphy>
				</Col>
				<Col span={8}>
					{/* <TypoGraphy label={"Employer ID"}>{customerDetails?.employeeId}</TypoGraphy> */}
					<TypoGraphy label={'Employee ID'}>{customerDetails?.employeeId ?? '-'}</TypoGraphy>
				</Col>
			</Row>

			<Row>
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
				<Col span={8}>
					<TypoGraphy label={customerDetails?.customerType === 'I' ? 'Nationality' : 'Domicile'}>
						{customerDetails?.nationalityName ?? '-'}
					</TypoGraphy>
				</Col>
			</Row>
			<Row>
				<Col span={8}>
					<TypoGraphy label={'Tax Status'}>{customerDetails?.taxStatusName ?? '-'}</TypoGraphy>
				</Col>
				<Col span={8}>
					<TypoGraphy label={'Nature Of Business'}>
						{customerDetails?.natureofbusinessName ?? '-'}
					</TypoGraphy>
				</Col>
				<Col span={8}>
					<TypoGraphy label={'Occupation'}>{customerDetails?.occupationName ?? '-'}</TypoGraphy>
				</Col>
			</Row>
			<Row>
				<Col span={8}>
					{/* <TypoGraphy label={'Source Of Fund'}> */}
					<TypoGraphy label={'Source Of Wealth'}>
						{customerDetails?.sourceNetworthName ?? '-'}
					</TypoGraphy>
				</Col>
				<Col span={8}>
					<TypoGraphy label={'Annual Income'}>{customerDetails?.incomeName ?? '-'}</TypoGraphy>
				</Col>
				<Col span={8}>
					{/* <TypoGraphy label={'Net Worth'}>{customerDetails?.networthName ?? '-'}</TypoGraphy> */}
					<TypoGraphy label={'Financial Situation'}>
						{customerDetails?.networthName ?? '-'}
					</TypoGraphy>
				</Col>
			</Row>
			<Row>
				<Col span={8}>
					<TypoGraphy label={'Related Party'}>
						{customerDetails?.relatedParty?.length > 0 ? (
							<div style={styleSet.tagContainer}>
								{customerDetails?.relatedParty?.map((e) => (
									<Col span={12}>
										<div style={styleSet.tag}>
											<div style={styleSet.close}>
												<UserOutlined />
											</div>
											<div style={styleSet.name}>{e.displayValue}</div>
										</div>
									</Col>
								))}
							</div>
						) : (
							'-'
						)}
					</TypoGraphy>
				</Col>
				<Col span={8}>
					<TypoGraphy label={'Client Classification'}>
						{customerDetails?.physchlgdMinorName ?? '-'}
					</TypoGraphy>
				</Col>
			</Row>
		</div>
	);
};
export default CustomerDetails;
