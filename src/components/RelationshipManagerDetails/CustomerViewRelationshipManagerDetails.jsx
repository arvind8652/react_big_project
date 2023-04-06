import { React } from 'react';
import { Col, Row, Typography } from 'antd';
import { palette, fontSet } from '../../theme';
import GenericCard from '../GenericCard/GenericCard';
import TypoGraphy from '../TypoGraphy/TypoGraphy';

const { Text, Link, Title } = Typography;

// const defaultValue = {
//     sourceName: "Referral",
//     sourceTypeName: "Existing Customer",
//     fullName: "Mr. Markus Romus",
//     email: "alxendra@yahoo.com",
//     contactNumber: "+654 4567 6767",
//     name: "Alexandra Sandralock",
//     family: "Sandralock Family",
//     id: "Asan102104",
//     tags: "Wealth",
// };
// const CustomerViewRelationshipManagerDetails = ({ relationshipManagerDetails = defaultValue }) => {
const CustomerViewRelationshipManagerDetails = ({ relationshipManagerDetails }) => {
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
			<GenericCard header={"Relationship Manager's Details"}>
				<Row gutter={[, 32]}>
					<Col span={8}>
						<TypoGraphy label={"Relationship Manager's Name"}>
							{relationshipManagerDetails?.custRelMgrName ?? '-'}
						</TypoGraphy>
					</Col>
					<Col span={8}>
						<TypoGraphy label={'Office'}>
							{relationshipManagerDetails?.bankAccbranchName ?? '-'}
						</TypoGraphy>
					</Col>

					<Col span={8}>
						<TypoGraphy label={'Secondary Relationship Manager'}>
							{relationshipManagerDetails?.rm2Name ?? '-'}
						</TypoGraphy>
					</Col>
					<Col span={8}>
						<TypoGraphy label={'Service Relationship Manager'}>
							{relationshipManagerDetails?.rm3Name ?? '-'}
						</TypoGraphy>
					</Col>
				</Row>
			</GenericCard>
		</>
	);
};
export default CustomerViewRelationshipManagerDetails;
