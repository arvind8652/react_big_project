import { CONSTANTS } from '../../constants/constants';
import { palette, fontSet, avatar } from '../../theme';
import Avatar from 'antd/lib/avatar/avatar';
import { theme } from '../../theme';
import './ProspectViewScreen.scss';
import 'antd/dist/antd.css';
import { getDateFormat } from '../../utils/utils';
// import { getCustomerDetailApi } from "../../api/prospectViewApi";
import { Row, Col, Space, Divider } from 'antd';
import moment from 'moment';
import TextSubText from './ProspectComponent/TextSubText';
import GenericCard from '../../components/GenericCard/GenericCard';
// import CustomerSourceView from "./ProspectComponent/CustomerSourceCardView";

const RealtionDetailsCardView = (props) => {
	const relationDetails = props.detail;
	const styleSet = {
		relationBlock: {
			color: palette.secondary.light
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

	if (!relationDetails) {
		return null;
	}

	const ExistingRelation = (props) => {
		// const [relationSourceDetail, setRelationSourceDetail] = useState();

		// useEffect(() => {
		//     getCustomerDetailApi("CLIENTADD", props.relationName).then((res) => {
		//         setRelationSourceDetail(res.data);
		//     }, []);
		// });

		return (
			<>
				<Row>
					{/* <Col span={8}>
                        {relationSourceDetail && (
                            <CustomerSourceView data={relationSourceDetail} />
                        )}
                    </Col> */}
					<Col span={8} style={styleSet.container}>
						<Row>
							<Col>
								{props.relation.profileImage != null ? (
									<Avatar
										style={avatar.smallAvatar}
										// src={item?.profileImage}
										src={`data:image/jpeg;base64,${props.relation.profileImage}`}
									></Avatar>
								) : (
									<Avatar style={{ color: '#f56a00', backgroundColor: '#E5EBFF' }} size={55}>
										{props.relation.profileInitial}
									</Avatar>
								)}
							</Col>
							{/* <Row><div>There Is No Data From BAckend Side</div></Row> */}
							<Col style={{ marginLeft: '10px' }}>
								<Row style={theme.profileName}>{props.relation.name}</Row>
								<Row style={theme.profileTag}>
									{props.relation.id} | {props.relation?.familyName}
								</Row>
								<Row style={theme.profileTag}>
									<div className='opportunityTag'>{props.relation?.tagName}</div>
								</Row>
							</Col>
						</Row>
					</Col>
					<Col span={8}>
						<TextSubText
							text={props.relation.relation}
							subtext={CONSTANTS.prospectView.relationDetails.relationLabel}
						/>
					</Col>
					<Col span={8}>
						<TextSubText
							text={moment(props.relation.dob).format(getDateFormat())}
							subtext={CONSTANTS.prospectView.relationDetails.dobLabel}
						/>
					</Col>
				</Row>
			</>
		);
	};

	const NonExistingRelations = (props) => {
		return (
			<>
				<Row>
					<Col span={8}>
						<TextSubText
							text={props.relation.relationName}
							subtext={CONSTANTS.prospectView.relationDetails.nameLabel}
						/>
					</Col>
					<Col span={8}>
						<TextSubText
							text={props.relation.relation}
							subtext={CONSTANTS.prospectView.relationDetails.relationLabel}
						/>
					</Col>
					<Col span={8}>
						<TextSubText
							text={moment(props.relation.dob).format(getDateFormat())}
							subtext={CONSTANTS.prospectView.relationDetails.dobLabel}
						/>
					</Col>
				</Row>
				<Row>
					<Col span={8}>
						<TextSubText
							text={props.relation.email}
							subtext={CONSTANTS.prospectView.relationDetails.emailLabel}
						/>
					</Col>
					<Col span={8}>
						<TextSubText
							flag={props.relation.countryCode}
							text={props.relation.mobile}
							subtext={CONSTANTS.prospectView.relationDetails.mobileLabel}
						/>
					</Col>
				</Row>
			</>
		);
	};

	// const styleSet = {
	//     cardStyle: { width: "100%", marginTop: "15px", marginBottom: "15px" }
	// }

	return (
		<>
			<GenericCard
				header='Relationship Details'
				menuFlag={false}
				className='prospectViewCardDetail'
				style={styleSet.container}
			>
				<Row>
					{relationDetails.length === 0 ? (
						<Col type='flex' align='middle' span={24} className='prospectDescriptionText'>
							No Records Found
						</Col>
					) : (
						<Space direction='vertical' className='prospect-relation-details' size={5}>
							{relationDetails.map((item, index) => {
								return (
									<>
										{item.isCustomer ? (
											<ExistingRelation relation={item} />
										) : (
											<NonExistingRelations relation={item} />
										)}
										<Divider />
									</>
								);
							})}
						</Space>
					)}
				</Row>
			</GenericCard>
		</>
	);
};

export default RealtionDetailsCardView;
