import { Col, Row } from 'antd';
import { palette, fontSet } from '../../theme';
import GenericCard from '../GenericCard/GenericCard';
import TypoGraphy from '../TypoGraphy/TypoGraphy';
import TextSubText from '../../screens/ProspectViewScreen/ProspectComponent/TextSubText';

const defaultValue = {
	comAddress: 'Park Aveneue, 21 Ny',
	comCity: 'Berlin, Germany',
	comCode: 234532,
	perAddress: 'Park Aveneue, 21 Ny',
	perCity: 'Berlin, Germany'
};
const CustomerViewAddressDetails = ({ AddressDetails = defaultValue }) => {
	const styleSet = {
		contactBlock: {
			color: palette.secondary.light,
			height: 0.5
		},
		container: {
			flex: 1,
			width: '100%',
			marginTop: '10px',
			marginBottom: '15px'
		},
		subCardHeader: {
			fontSize: fontSet.body.xlarge,
			color: palette.text.dark
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
	// console.log({ AddressDetails });
	return (
		<>
			<GenericCard header={'Address Details'}>
				{AddressDetails?.customerType === 'C' ? (
					<Col style={styleSet.container}>
						<TypoGraphy label={'Registered Bussiness'}></TypoGraphy>
					</Col>
				) : (
					<Col style={styleSet.container}>
						<TypoGraphy label={'Present Address'}></TypoGraphy>
					</Col>
				)}
				<Row gutter={[, 32]}>
					<Col span={8}>
						<TypoGraphy label={'Address'}>{AddressDetails?.permAdd1 ?? '-'}</TypoGraphy>
					</Col>
					<Col span={16}>
						<TypoGraphy label={'Pincode'}> {AddressDetails?.permAddPin ?? '-'}</TypoGraphy>
					</Col>
					<Col span={8}>
						<TextSubText
							flag={AddressDetails?.permCountry}
							text={<span>{AddressDetails?.permCountryName ?? '-'}</span>}
							subtext='Country'
						/>
					</Col>
					<Col span={8}>
						<TypoGraphy label={'State'}> {AddressDetails?.permanentStateName ?? '-'}</TypoGraphy>
					</Col>

					<Col span={8}>
						<TypoGraphy label={'City'}>{AddressDetails?.permCityName ?? '-'}</TypoGraphy>
					</Col>
				</Row>
				<hr style={styleSet.contactBlock} />

				<Col style={styleSet.container}>
					<TypoGraphy label={'Mailing Address'}></TypoGraphy>
				</Col>
				<Row gutter={[, 32]}>
					<Col span={8}>
						<TypoGraphy label={'Address'}>{AddressDetails?.mailAdd1 ?? '-'}</TypoGraphy>
					</Col>
					<Col span={16}>
						<TypoGraphy label={'Pincode'}> {AddressDetails?.mailAddPin ?? '-'}</TypoGraphy>
					</Col>
					<Col span={8}>
						<TextSubText
							flag={AddressDetails?.mailCountry}
							text={<span>{AddressDetails?.mailCountryName ?? '-'}</span>}
							subtext='Country'
						/>
					</Col>
					<Col span={8}>
						<TypoGraphy label={'State'}> {AddressDetails?.mailstateName ?? '-'}</TypoGraphy>
					</Col>
					<Col span={8}>
						<TypoGraphy label={'City'}>{AddressDetails?.mailCityName ?? '-'}</TypoGraphy>
					</Col>
				</Row>
				{/* --------------Office Address----------------- */}

				<hr style={styleSet.contactBlock} />

				<Col style={styleSet.container}>
					<TypoGraphy label={'Office Address'}></TypoGraphy>
				</Col>
				<Row gutter={[, 32]}>
					<Col span={8}>
						<TypoGraphy label={'Address'}>{AddressDetails?.compAdd1 ?? '-'}</TypoGraphy>
					</Col>
					<Col span={16}>
						<TypoGraphy label={'Pincode'}> {AddressDetails?.compAddPin ?? '-'}</TypoGraphy>
					</Col>
					<Col span={8}>
						<TextSubText
							flag={AddressDetails?.compCountry}
							text={<span>{AddressDetails?.compCountryName ?? '-'}</span>}
							subtext='Country'
						/>
					</Col>
					<Col span={8}>
						<TypoGraphy label={'State'}> {AddressDetails?.compAdd3Name ?? '-'}</TypoGraphy>
					</Col>
					<Col span={8}>
						<TypoGraphy label={'City'}>{AddressDetails?.compCityName ?? '-'}</TypoGraphy>
					</Col>
				</Row>
			</GenericCard>
		</>
	);
};
export default CustomerViewAddressDetails;
