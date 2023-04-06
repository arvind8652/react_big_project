import { React } from 'react';
import { Col, Row } from 'antd';

import { palette, fontSet } from '../../theme';
import GenericCard from '../GenericCard/GenericCard';
import TypoGraphy from '../TypoGraphy/TypoGraphy';

const defaultValue = {
	currencyName: 'Euro',
	remark: 'This is remark of John Doe',
	inputDateTime: '07 Dec 2020, 10:30 pm'
};
const OtherDetail = ({ otherDetail = defaultValue }) => {
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
			marginTop: '15px',
			marginBottom: '15px'
		},
		subCardHeader: {
			fontSize: fontSet.body.xlarge,
			color: palette.text.dark
		}
	};

	return (
		<>
			<GenericCard header={'Other Details'}>
				<Row gutter={[, 32]}>
					<Col span={8}>
						<TypoGraphy label={'Reporting Currency'}>{otherDetail?.currencyName ?? '-'}</TypoGraphy>
					</Col>
					<Col span={8}>
						<TypoGraphy label={'Secondary Relationship Manager'}>
							{otherDetail?.investmentManagerNName ? otherDetail?.investmentManagerNName : '-'}
						</TypoGraphy>
					</Col>
					<Col span={8}>
						<TypoGraphy label={'Service Relationship Manager'}>
							{otherDetail?.investmentManager3Name ? otherDetail?.investmentManager3Name : '-'}
						</TypoGraphy>
					</Col>
					<Col span={8}>
						<TypoGraphy label={'Product Provider / External Relationship Manager(Primary)'}>
							{otherDetail?.primaryExternalRmName ? otherDetail?.primaryExternalRmName : '-'}
						</TypoGraphy>
					</Col>
					<Col span={8}>
						<TypoGraphy label={'Product Provider / External Relationship Manager(Secondary)'}>
							{otherDetail?.secondaryExternalRmName ? otherDetail?.secondaryExternalRmName : '-'}
						</TypoGraphy>
					</Col>
					<Col span={24}>
						<TypoGraphy label={'Remarks'}>
							{otherDetail?.remark ? otherDetail?.remark : '-'}
						</TypoGraphy>
					</Col>
				</Row>
			</GenericCard>
		</>
	);
};
export default OtherDetail;
