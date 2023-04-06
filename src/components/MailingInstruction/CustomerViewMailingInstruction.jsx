import { React } from 'react';
import { Col, Row, Typography } from 'antd';
import { palette, fontSet } from '../../theme';
import GenericCard from '../GenericCard/GenericCard';
import TypoGraphy from '../TypoGraphy/TypoGraphy';

const { Text, Link, Title } = Typography;

// const defaultValue = {
//     mailingPreferenceName: "Mailing Preference Name",
//     frequencyName: "Frequency Name",
//     locationAndAddressName: "locationAndAddress",
//     deliveryInstructionsName: "deliveryInstructionsName",
//     authorisedPerson: "+654 4567 6767",
//     deliverToRm: "Alexandra Sandralock",
//     otherDetailsRemarks: "Sandralock Family",
// };
// const CustomerViewMailingInstruction = ({ mailingInstructionDetail = defaultValue }) => {
const CustomerViewMailingInstruction = ({ mailingInstructionDetail, screen = '' }) => {
	// console.log({ mailingInstructionDetail });
	const styleSet = {
		relationBlock: {
			color: palette.secondary.light
		},
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
		name: {
			fontSize: fontSet.heading.large
		}
	};

	return (
		<>
			<GenericCard header={'Mailing Instruction'}>
				<Row gutter={[, 32]}>
					<Col span={8}>
						<TypoGraphy label={'Mailing Preference'}>
							{mailingInstructionDetail?.mailingPreferenceName ?? '-'}
						</TypoGraphy>
					</Col>
					<Col span={8}>
						<TypoGraphy label={'Frequency'}>
							{mailingInstructionDetail?.frequencyName ?? '-'}
						</TypoGraphy>
					</Col>

					<Col span={8}>
						<TypoGraphy label={'Location / Address'}>
							{mailingInstructionDetail?.locationType ?? '-'}
						</TypoGraphy>
					</Col>
					<Col span={8}>
						<TypoGraphy label={'Delivery Instruction'}>
							{mailingInstructionDetail?.deliveryInstructionsName ?? '-'}
						</TypoGraphy>
					</Col>

					<Col span={8}>
						<TypoGraphy label={'Authorised Person'}>
							{mailingInstructionDetail?.authorizedPerson
								? mailingInstructionDetail?.authorizedPerson
								: mailingInstructionDetail?.authorisedPerson
								? mailingInstructionDetail?.authorisedPerson
								: '-'}
						</TypoGraphy>
					</Col>

					<Col span={8}>
						<Row>
							<Col span={10}>
								<TypoGraphy label={'Deliver to RM'}>
									{mailingInstructionDetail?.deliverToRm === 'Y' ? 'Yes' : 'No'}
								</TypoGraphy>
							</Col>
							{screen === 'accountViewScreen' && (
								<Col span={14}>
									<TypoGraphy label={'Block report generation'}>
										{mailingInstructionDetail?.blockYn === 'Y' ? 'Yes' : 'No'}
									</TypoGraphy>
								</Col>
							)}
							{/* <Col span={14}>
								<TypoGraphy label={'Block report generation'}>
									{mailingInstructionDetail?.blockYn === 'Y' ? 'Yes' : 'No'}
								</TypoGraphy>
							</Col> */}
						</Row>
					</Col>
					{/* ----------Preffered Office or Branch----- */}
					<Col span={8}>
						<TypoGraphy label={'Preferred RCBC Branch or Office'}>
							{mailingInstructionDetail?.compAdd2Name ?? '-'}
						</TypoGraphy>
					</Col>
					<Col span={8}>
						<TypoGraphy label={'Other Instructions'}>
							{mailingInstructionDetail?.otherInstruction
								? mailingInstructionDetail?.otherInstruction
								: mailingInstructionDetail?.otherInstructions
								? mailingInstructionDetail?.otherInstructions
								: '-'}
						</TypoGraphy>
					</Col>
				</Row>
			</GenericCard>
		</>
	);
};
export default CustomerViewMailingInstruction;
