import React from 'react';
import { Col, Row } from 'antd';

import { palette, fontSet } from '../../theme';
import GenericCard from '../../components/GenericCard/GenericCard';
import TypoGraphy from '../../components/TypoGraphy/TypoGraphy';
import moment from 'moment';
import { getDateFormat } from '../../utils/utils';

const KYCValidationDetails = ({ detail, source }) => {
	const styleSet = {
		validationBlock: {
			color: palette.secondary.light
		},
		contactBlock: {
			color: palette.secondary.light,
			height: 0.5
			//border-width:0,
			//color:gray,
			//background-color:gray,
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
		}
	};

	return (
		<>
			<GenericCard header='KYC Validation Details'>
				<Row gutter={[, 32]}>
					<Col span={8}>
						<TypoGraphy label={'Primary ID '}>{detail?.prospectDetail?.primaryIdName}</TypoGraphy>
					</Col>
					<Col span={8}>
						<TypoGraphy label={'Primary ID Number'}>
							{detail?.prospectDetail?.primaryIdnumber}
						</TypoGraphy>
					</Col>
					<Col span={8}>
						<TypoGraphy label={'Expiry Date'}>
							{detail?.prospectDetail?.expiryDate
								? moment(detail?.prospectDetail?.expiryDate).format(getDateFormat())
								: ''}
						</TypoGraphy>
					</Col>
					<Col span={8}>
						<TypoGraphy label={'Risk Category'}>
							{detail?.prospectDetail?.riskCategoryName}
						</TypoGraphy>
					</Col>
					<Col span={8}>
						<TypoGraphy label={'Risk Score'}>{detail?.prospectDetail?.riskScore}</TypoGraphy>
					</Col>
				</Row>
			</GenericCard>
		</>
	);
};
export default KYCValidationDetails;
