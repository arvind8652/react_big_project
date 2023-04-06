import { Row, Space, Card, Col } from 'antd';
import TextSubText from './TextSubText';
import { palette, fontSet } from '../../../theme';
import TypoGraphy from '../../../components/TypoGraphy/TypoGraphy';
import './CardView.scss';

const MiscellaneousCardView = (props) => {
	const styleSet = {
		relationBlock: {
			color: palette.secondary.light
		},
		contactBlock: {
			color: palette.secondary.light,
			height: 0.5
		},
		container: {
			// flex: 1,
			width: '100%',
			// marginTop: '10px',
			marginBottom: '15px'
		},
		subCardHeader: {
			fontSize: fontSet.body.xlarge,
			color: palette.text.dark
		}
	};
	const miscellaneousDetails = props?.detail?.miscellaneous;
	if (!miscellaneousDetails) {
		return (
			<Col type='flex' align='middle' span={24}>
				No Records Found
			</Col>
		);
	}
	return (
		<Card
			title='Miscellaneous'
			style={{ width: '100%', marginBottom: '15px' }}
			className='prospectCardDetail'
		>
			<Space direction='vertical' className='prospect-details' style={{ width: '100%' }} size={5}>
				<Row align='middle' justify='space-between'>
					{miscellaneousDetails.length === 0 ? (
						<Col type='flex' align='middle' span={24} className='prospectDescriptionText'>
							No Records Found
						</Col>
					) : (
						miscellaneousDetails.length &&
						miscellaneousDetails.map((item, index) => {
							return (
								<Col key={index} span={8}>
									<TypoGraphy label={item.fieldLabel}>{item.fieldValueName}</TypoGraphy>
								</Col>
							);
						})
					)}
				</Row>
			</Space>
		</Card>
	);
};

export default MiscellaneousCardView;
