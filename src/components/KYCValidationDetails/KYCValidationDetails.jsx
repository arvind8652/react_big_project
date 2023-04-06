import { React } from 'react';
import { Col, Row } from 'antd';
import { palette, fontSet } from '../../theme';
import GenericCard from '../GenericCard/GenericCard';
import TypoGraphy from '../TypoGraphy/TypoGraphy';
import { getDateFormat } from '../../utils/utils';
import moment from 'moment';

const defaultValue = {
	primaryID: '',
	primaryIDNumber: '',
	expiryDate: '',
	FATCAValidation: '',
	PEP: 'PEP',
	potentiallyVulnerable: '',
	AMLA: '',
	bannedList: ''
};
const KYCValidationDetails = ({ KYCValidationDetails = defaultValue }) => {
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
			{/* <GenericCard header={"KYC Validation Details"}>
        <Row>
          <Col style={styleSet.container}>
            <TypoGraphy label={"Primary ID "}>
              <div style={styleSet.subCardHeader}>
                {KYCValidationDetails.primaryID}
              </div>
            </TypoGraphy>
          </Col>
          <Col style={styleSet.container}>
            <TypoGraphy label={"Primary ID Number"}>
              <div style={styleSet.subCardHeader}>
                {KYCValidationDetails.primaryIDNumber}
              </div>
            </TypoGraphy>
          </Col>
          <Col style={styleSet.container}>
            <TypoGraphy label={"Expiry Date"}>
              <div style={styleSet.subCardHeader}>
                {moment(KYCValidationDetails.expiryDate).format("DD MMM YYYY")}
              </div>
            </TypoGraphy>
          </Col>
        </Row>
        <Row>
          <Col style={styleSet.container}>
            <TypoGraphy label={"FATCA Validation"}>
              <div style={styleSet.subCardHeader}>
                {KYCValidationDetails.FATCAValidation}
              </div>
            </TypoGraphy>
          </Col>
          <Col style={styleSet.container}>
            <TypoGraphy label={"PEP"}>
              <div style={styleSet.subCardHeader}>
                {KYCValidationDetails.PEP}
              </div>
            </TypoGraphy>
          </Col>
          <Col style={styleSet.container}>
            <TypoGraphy label={"Potentially Vulnerable"}>
              <div style={styleSet.subCardHeader}>
                {KYCValidationDetails.potentiallyVulnerable}
              </div>
            </TypoGraphy>
          </Col>
        </Row>
        <Row>
          <Col style={styleSet.container}>
            <TypoGraphy label={"AMLA"}>
              <div style={styleSet.subCardHeader}>
                {KYCValidationDetails.AMLA}
              </div>
            </TypoGraphy>
          </Col>
          <Col style={styleSet.container}>
            <TypoGraphy label={"Banned List"}>
              <div style={styleSet.subCardHeader}>
                {KYCValidationDetails.bannedList}
              </div>
            </TypoGraphy>
          </Col>
          <Col style={styleSet.container}>
            <TypoGraphy></TypoGraphy>
          </Col>
        </Row>
      </GenericCard> */}

			<GenericCard header={'KYC Validation Details'}>
				<Row gutter={[, 32]}>
					<Col span={8}>
						<TypoGraphy label={'Primary ID '}>{KYCValidationDetails?.idTypeName ?? '-'}</TypoGraphy>
					</Col>
					<Col span={8}>
						<TypoGraphy label={'Primary ID Number'}>{KYCValidationDetails?.idNo ?? '-'}</TypoGraphy>
					</Col>
					<Col span={8}>
						<TypoGraphy label={'Issuance Date (Primary ID)'}>
							{KYCValidationDetails?.primaryIssuanceDate
								? moment(KYCValidationDetails?.primaryIssuanceDate).format(getDateFormat())
								: '-'}
						</TypoGraphy>
					</Col>
					<Col span={24}>
						<TypoGraphy label={'Primary ID Expiry Date'}>
							{KYCValidationDetails?.idExpDate
								? moment(KYCValidationDetails?.idExpDate).format(getDateFormat())
								: '-'}
						</TypoGraphy>
					</Col>
					<Col span={8}>
						<TypoGraphy label={'Secondary ID'}>{KYCValidationDetails?.secIdName ?? '-'}</TypoGraphy>
					</Col>
					<Col span={8}>
						<TypoGraphy label={'Secondary ID Number'}>
							{KYCValidationDetails?.secIdNo ?? '-'}
						</TypoGraphy>
					</Col>
					<Col span={8}>
						<TypoGraphy label={'Issuance Date (Secondary ID)'}>
							{KYCValidationDetails?.secondaryIssuanceDate
								? moment(KYCValidationDetails?.secondaryIssuanceDate).format(getDateFormat())
								: '-'}
						</TypoGraphy>
					</Col>
					<Col span={24}>
						<TypoGraphy label={'Secondary ID Expiry Date'}>
							{KYCValidationDetails?.secIdExpdt
								? moment(KYCValidationDetails?.secIdExpdt).format(getDateFormat())
								: '-'}
						</TypoGraphy>
					</Col>
					<Col span={8}>
						<TypoGraphy label={'FATCA Validation'}>
							{KYCValidationDetails?.fatcaClassificationName ?? '-'}
						</TypoGraphy>
					</Col>
					<Col span={8}>
						<TypoGraphy label={'PEP'}>
							{KYCValidationDetails?.riskCategoryAmlaName ?? '-'}
						</TypoGraphy>
					</Col>
					<Col span={8}>
						<TypoGraphy label={'Potentially Vulnerable'}>
							{KYCValidationDetails?.potentiallyVulnerableName ?? '-'}
						</TypoGraphy>
					</Col>
					<Col span={8}>
						<TypoGraphy label={'AMLA'}>{KYCValidationDetails?.amlaName ?? '-'}</TypoGraphy>
					</Col>
					<Col span={8}>
						<TypoGraphy label={'Banned List'}>
							{KYCValidationDetails?.bannedListName ?? '-'}
						</TypoGraphy>
					</Col>
					<Col span={8}>
						<TypoGraphy label={'Risk Category (CRR)'}>
							{KYCValidationDetails?.riskCategoryName ?? '-'}
						</TypoGraphy>
					</Col>
					<Col span={8}>
						<TypoGraphy label={'Risk Score'}>{KYCValidationDetails?.riskScore ?? '-'}</TypoGraphy>
					</Col>
					<Col span={8}>
						<TypoGraphy label={'TIN'}>{KYCValidationDetails?.tin ?? '-'}</TypoGraphy>
					</Col>
					<Col span={8}>
						<TypoGraphy label={'SEC Qualified Investor Buyer'}>
							{KYCValidationDetails?.qibName ?? '-'}
						</TypoGraphy>
					</Col>
				</Row>
			</GenericCard>
		</>
	);
};
export default KYCValidationDetails;
