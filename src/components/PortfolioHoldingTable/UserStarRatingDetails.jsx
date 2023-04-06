import { Col, Row, Typography, Rate, Tooltip, Progress, Space } from 'antd';
import { palette, fontSet, avatar, theme } from '../../theme';
import Avatar from 'antd/lib/avatar/avatar';
import GenericBadge from '../GenericBadge/GenericBadge';

const UserStarRatingDetails = ({ UserStarRatingDetails }) => {
	const { Text } = Typography;
	const styleSet = {
		name: {
			fontSize: fontSet.heading.large
		}
	};
	return (
		<>
			<Row gutter={[16, 0]}>
				<Col xxl={5} xl={5} lg={24}>
					<Avatar size={45} style={avatar.smallAvatar} icon={UserStarRatingDetails.profileImg} />
				</Col>
				<Col xxl={19} xl={19} lg={24} style={styleSet.containerStyle}>
					<Row>
						<Col span={24}>
							<div
								style={{
									...theme.profileName,
									...{ maxWidth: '250px', width: '250px' }
								}}
							>
								<Tooltip title={UserStarRatingDetails.name}>
									<Text ellipsis={true}>
										{/* NOTE: Fragment is necessary to avoid showing the title */}
										{UserStarRatingDetails.name}
									</Text>
								</Tooltip>
							</div>
						</Col>
					</Row>
					<Row style={styleSet.bannerId}>
						<Col span={24}>
							{UserStarRatingDetails.id}|
							{
								<Rate
									defaultValue={UserStarRatingDetails.rate}
									style={{
										fontSize: '14px',
										display: 'inline-block',
										verticalAlign: 'middle',
										color: '#48528D'
									}}
								/>
							}
						</Col>
					</Row>
					{/* <Row>
              <Col>
  
                <GenericBadge badgeBody={UserStarDetails.tagName} />
                <GenericBadge badgeBody={UserStarDetails.secondaryTag} />
  
              </Col>
            </Row> */}
				</Col>
			</Row>
		</>
	);
};
export default UserStarRatingDetails;
