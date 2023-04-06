import React, { useEffect, useState } from 'react';
import {
	Button,
	Card,
	Row,
	Modal,
	Col,
	Space,
	Dropdown,
	Typography,
	Progress,
	Menu,
	Avatar
} from 'antd';
import moment from 'moment';
import CampaignSource from './campaignSource';
import RecentCampaign from './RecentCampaign';
import { TinyArea, Column, Pie, Line } from '@ant-design/charts';
import './prospectOverviewScreen.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ScRate } from '../../components/StyledComponents/genericElements';
import { addFavouriteProspectApi } from '../../api/prospectListingApi';
import RenderConvertToCustomerModal from '../ProspectViewScreen/ProspectModals/RenderConvertToCustomerModal';
import RenderMapToExistingCustomerModal from '../ProspectViewScreen/ProspectModals/RenderMapToExistingCustomerModal';
import { connect } from 'react-redux';
import BackToTop from '../../components/BackToTop/BackToTop';
import RenderConfirmDowngradeModal from '../ProspectListingScreen/RenderConfirmDowngradeModal';
import RenderConfirmUpgradeModal from './RenderConfirmUpgradeModal';
import {
	faEllipsisHAlt,
	faSnowflake,
	// faStar as faStarOutlined,
	faAngleLeft,
	faAngleRight
} from '@fortawesome/pro-light-svg-icons';
import {
	faFire,
	// faStar,
	faMapMarkerAlt
} from '@fortawesome/pro-solid-svg-icons';
import { faClipboardCheck, faExternalLinkAlt } from '@fortawesome/pro-regular-svg-icons';
import { faTwitter, faFacebookSquare, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';
import {
	getProspectSourceCountDataApi,
	getProspectCreationDataApi,
	getLeadCreationDataApi,
	getCampaignTypeApi,
	getActiveCampaignGraphApi,
	getRecentLeadApi,
	getRecentProspectApi,
	getRecentCampaignApi
} from '../../api/prospectOverviewApi';
import CampaignPopOverModal from './CampaignPopOverModal';
import RecentModal from './recentModal';
import TextSubText from './textSubText/index';
import styled from 'styled-components';
import { AvatarSize } from '../../constants/AvatarSize';
import AvatarLogo from '../../components/Avatar/AvatarLogo';
import ProspectRepoCard from './ProspectRepoCard';
import LeadRepoCard from './LeadRepoCard';
import DemographicDistributionCard from './DemographicDistributionCard';
import PlottingCategorySelector from './PlottingCategorySelector';
import { useHistory } from 'react-router-dom';
import ProspectUpdateStageModal from '../../components/Modal/ProspectUpdateStageModal/ProspectUpdateStageModal';
import RenderConfirmDeleteModal from './RenderConfirmDeleteModal';
import RenderSuccessFailureDeleteModal from './RenderSuccessFailureDeleteModal';
import { postConvertProspectToCustomer } from '../../api/prospectViewApi';
import SuccessModal from '../../components/SuccessModal/SuccessModal';
import FailModal from '../../components/Modal/FailModal/FailModal';
import {
	excecuteGetProspect360View,
	getProspectDependantData
} from '../../redux/actions/prospectViewActions';
import RenderAssignModal from './RenderAssignModal';
import { authorizeModule, getDateFormat } from '../../utils/utils';
import { CONSTANTS } from '../../constants/constants';
import GenericBadge from '../../components/GenericBadge/GenericBadge';
import { palette, theme } from '../../theme';

const { Text } = Typography;
const ProspectOverviewScreen = ({
	// setShowDowngradeModal,
	// miniMode,
	// setSelectedRows,
	// setSelectedRowKeys,
	setLoading,
	setLocalProspectData,
	// selectedRowKeys,
	// selectedRows,
	prospectConversionDependantData,
	leftPanel
}) => {
	const history = useHistory();

	const [prospectData] = useState({
		recordId: undefined,
		status: undefined,
		stage: undefined
	});

	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showUpdateStageModal, setShowUpdateStageModal] = useState(false);
	const [showSuccessFailureDeleteModal, setShowSuccessFailureDeleteModal] = useState(false);
	const [deleteMessage, setDeleteMessage] = useState(false);
	const [checkLead, setCheckLead] = useState(false);
	const [id, setId] = useState();
	const [textLP, setTextLP] = useState();
	const [convertProspectModalOpen, setConvertProspectModalOpen] = useState(false);
	const [mapToExistingCustomer, setMapToExistingCustomer] = useState(false);
	const [currentRowCount, setcurrentRowCount] = useState(null);
	const [prospectViewRefId, setProspectViewRefId] = useState(null);
	const [convertToCustomer, setConvertToCustomer] = useState('');
	const [showFailModal, setShowFailModal] = useState(false);
	const [errorArray, setErrorArray] = useState([]);
	const [showSuccessModal, setShowSuccessModal] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');
	const [showDowngradeModal, setShowDowngradeModal] = useState(false);
	const [selectedRows, setSelectedRows] = useState([]);
	const [selectedRowKeys, setSelectedRowKeys] = useState([]);
	const [showUpgradeModal, setShowUpgradeModal] = useState(false);
	const [showAssignModal, setShowAssignModal] = useState(false);

	let authorizeCode = '';
	leftPanel &&
		leftPanel.map((menu) => {
			menu.subMenu.map((subMenu) => {
				if (subMenu.subMenuId == 'PROSPECTOVRVW') authorizeCode = subMenu.authorizeCode;
			});
		});

	useEffect(() => {
		excecuteGetProspect360View(prospectViewRefId, setErrorMsg);
		let payload = {
			FieldListId: 13,
			progName: 'PROSPECTADD',
			DependentValue: {
				RefType: 'CLIENTADD'
			}
		};

		getProspectDependantData(payload);
	}, [prospectViewRefId]);

	const onMapToExistingCustomer = (clientId, prospectId) => {
		let requestPayload = {
			clientId: clientId,
			prospectId: prospectId
		};
		postConvertProspectToCustomer(requestPayload)
			.then((res) => {
				if (res.data.success) {
					setShowSuccessModal(true);
				} else {
					setErrorArray([
						{
							message: res.data.message
						}
					]);
					setShowFailModal(true);
				}
			})
			.catch((err) => {
				console.log(err);
			});
		setMapToExistingCustomer(false);
	};
	const menuItems = (data) => {
		if (data.prospectId) {
			return [
				'Modify',
				'Convert',
				// 'Downgrade',
				// 'Take Note',
				'Create Task',
				'Create Interaction',
				'Create Opportunity',
				'Delete'
			].filter((type) => {
				switch (type) {
					case 'Modify':
						return authorizeModule(authorizeCode, CONSTANTS.authorizeCode.modify);
					case 'Convert':
						return authorizeModule(authorizeCode, CONSTANTS.authorizeCode.convert);
					case 'Delete':
						return authorizeModule(authorizeCode, CONSTANTS.authorizeCode.delete);
					default:
						return true;
				}
			});
		}
		if (data.leadId) {
			return ['Modify', 'Upgrade', 'Assign'].filter((type) => {
				switch (type) {
					case 'Modify':
						return authorizeModule(authorizeCode, CONSTANTS.authorizeCode.modify);
					case 'Upgrade':
						return authorizeModule(authorizeCode, CONSTANTS.authorizeCode.upgrade);
					case 'Assign':
						return authorizeModule(authorizeCode, CONSTANTS.authorizeCode.assign);
					default:
						return true;
				}
			});
		}
	};

	const menu = (data, funcCheck = () => {}) => (
		<Menu
			style={{
				paddingBlock: '10px',
				borderRadius: '10px',
				boxShadow: '0px 0px 20px 13px rgba(0,0,0,0.05)'
			}}
		>
			{menuItems(data).map((item, index) => (
				<Menu.Item
					onClick={(e) => {
						data?.leadId && setCheckLead(true);
						let obj;
						if (e.domEvent.target.innerText === 'Modify') {
							if (data?.prospectId) {
								obj = {
									prospectId: data.prospectId,
									action: 'Modify'
								};
								funcCheck(obj);
							} else {
								obj = {
									leadId: data.leadId,
									action: 'Modify'
								};
								funcCheck(data.leadId);
							}
						}
						if (e.domEvent.target.innerText === 'Convert') {
							if (data?.prospectId) {
								obj = {
									prospectId: data.prospectId,
									action: 'Convert'
								};
								funcCheck(obj);
							} else {
								obj = {
									leadId: data.leadId,
									action: 'Convert'
								};
								funcCheck(obj);
							}

							// data?.prospectId
							//   ? funcCheck(data.prospectId)
							//   : funcCheck(data.leadId);
						}
						if (e.domEvent.target.innerText === 'Downgrade') {
							if (data?.prospectId) {
								obj = {
									prospectId: data.prospectId,
									action: 'Downgrade'
								};
								funcCheck(obj);
							} else {
								obj = {
									leadId: data.leadId,
									action: 'Downgrade'
								};
								funcCheck(obj);
							}
						}
						if (e.domEvent.target.innerText === 'Create Task') {
							if (data?.prospectId) {
								obj = {
									data: data,
									action: 'Create Task'
								};
								funcCheck(obj);
							} else {
								obj = {
									data: data,
									action: 'Create Task'
								};
								funcCheck(obj);
							}
						}
						if (e.domEvent.target.innerText === 'Create Interaction') {
							if (data?.prospectId) {
								obj = {
									data: data,
									action: 'Create Interaction'
								};
								funcCheck(obj);
							} else {
								obj = {
									data: data,
									action: 'Create Interaction'
								};
								funcCheck(obj);
							}
						}
						if (e.domEvent.target.innerText === 'Create Opportunity') {
							if (data?.prospectId) {
								obj = {
									data: data,
									action: 'Create Opportunity'
								};
								funcCheck(obj);
							} else {
								obj = {
									data: data,
									action: 'Create Opportunity'
								};
								funcCheck(obj);
							}
						}
						if (e.domEvent.target.innerText === 'Delete') {
							setShowDeleteModal(true);
							setId(data?.prospectId ? data.prospectId : data.leadId);
							setTextLP(data?.prospectId ? 'Prospect' : 'Lead');
						}

						if (e.domEvent.target.innerText === 'Upgrade') {
							obj = {
								leadId: data.leadId,
								action: 'Upgrade'
							};
							funcCheck(obj);
						}

						if (e.domEvent.target.innerText === 'Assign') {
							obj = {
								leadId: data.leadId,
								action: 'Assign'
							};
							funcCheck(obj);
						}
					}}
					key={index}
				>
					{item}
				</Menu.Item>
			))}
		</Menu>
	);
	const RenderProspectSourceCard = () => {
		const [loading, setLoading] = useState();
		const [sourceGraphData, setSourceGraphData] = useState();
		useEffect(() => {
			getProspectSourceCountDataApi().then((res) => {
				setSourceGraphData(res.data);
				setLoading(false);
			});
		}, []);

		let pieconfig;
		const RenderTooltip = (data) => {
			const TooltipWrapper = styled.div`
				min-width: 82px;
				width: ${(props) => props.width};
				padding: 5px;
			`;
			const TooltipAttribute = styled(Row)`
				margin: 6px 0;
			`;
			const ValueAttr = () => {
				return (
					<>
						<TooltipAttribute align='top' justify='space-between'>
							<Col span={18}>
								<span>
									<Row justify='space-between' align='middle' style={{ width: '100%' }}>
										<div>{data.sourceName}</div>
										<div>:</div>
									</Row>
								</span>
							</Col>
							<Col span={5}>
								<strong>{data && data.percentage + '%'}</strong>
							</Col>
						</TooltipAttribute>
						<Row>({data.count})</Row>
					</>
				);
			};

			return (
				<TooltipWrapper width='178px'>
					<strong>{data[0] && data[0].title}</strong>
					<ValueAttr />
				</TooltipWrapper>
			);
		};
		if (sourceGraphData) {
			pieconfig = {
				// width: 548,
				height: 400,
				appendPadding: 10,
				data: sourceGraphData,
				angleField: 'percentage',
				colorField: 'sourceName',
				// data: data,
				// angleField: "value",
				// colorField: "type",
				color: ['#5564C1', '#56B8BE', '#792B80', '#898EA9', '#C4C4C4'],
				radius: 1,
				innerRadius: 0.7,
				label: null,
				legend: null,
				interactions: [
					{
						type: 'element-selected'
					},
					{
						type: 'element-active'
					}
				],
				tooltip: {
					domStyles: {
						'g2-tooltip': {
							border: '1px solid #5d6dd1',
							boxSizing: 'border-box',
							boxShadow: '0px 4px 6px rgba(203, 214, 255, 0.25)',
							borderRadius: '16px'
						}
					},
					customContent: (title, sourceGraphData) => {
						return sourceGraphData && Array.isArray(sourceGraphData) && sourceGraphData.length > 0
							? RenderTooltip(sourceGraphData[0].data)
							: null;
					}
				},
				statistic: null
			};
		}
		return (
			<Card loading={loading} className='dist-card styled-border' title='Prospect Source '>
				<div> {sourceGraphData && <Pie {...pieconfig} />}</div>
			</Card>
		);
	};

	const handleRecordModifyProspect = (dataObj) => {
		let toObject;
		if (dataObj.action === 'Modify') {
			toObject = {
				pathname: `MyProspect/ProspectCreate`,
				state: {
					// screen: 'list',
					// data: dataObj?.prospectId,
					// mode: 'edit'
					data: dataObj?.prospectId,
					prospectId: dataObj?.prospectId,
					rowIndex: currentRowCount,
					mode: 'edit',
					action: 'edit',
					screen: 'list'
				}
			};
			history.push(toObject);
		}
		if (dataObj.action === 'Convert') {
			setProspectViewRefId(dataObj?.prospectId);
			setConvertProspectModalOpen(true);
		}
		if (dataObj.action === 'Downgrade') {
			let prospectIds = [];
			setProspectViewRefId(dataObj?.prospectId);
			prospectIds.push(dataObj?.prospectId);
			setShowDowngradeModal(true);
			setSelectedRowKeys(prospectIds);
		}
		if (dataObj.action === 'Create Interaction') {
			setProspectViewRefId(dataObj?.data?.prospectId);
			setcurrentRowCount(dataObj?.data?.rowNumber);
			toObject = {
				pathname: 'MyInteractions/InteractionCreate',
				state: {
					screen: 'prospect-list',
					data: dataObj?.data,
					mode: 'create'
				}
			};
			history.push(toObject);
		}
		if (dataObj.action === 'Create Task') {
			setProspectViewRefId(dataObj?.data?.prospectId);
			setcurrentRowCount(dataObj?.data?.rowNumber);
			toObject = {
				pathname: '/dashboard/TaskBoard/TaskCreate',
				state: {
					screen: 'task-list',
					data: dataObj?.data,
					mode: 'create'
				}
			};
			history.push(toObject);
		}
		if (dataObj.action === 'Create Opportunity') {
			setProspectViewRefId(dataObj?.data?.prospectId);
			setcurrentRowCount(dataObj?.data?.rowNumber);
			toObject = {
				// pathname: miniMode
				//   ? `MyOpportunity/OpportunityCreate`
				//   : `MyOpportunity/OpportunityCreate`,
				pathname: 'MyOpportunity/OpportunityCreate',
				state: {
					screen: 'prospect-list',
					data: dataObj?.data,
					mode: 'create'
				}
			};
			history.push(toObject);
		}
	};

	const handleRecordModifyLead = (dataObj) => {
		let toObject;
		if (dataObj.action === 'Modify') {
			toObject = {
				pathname: `/dashboard/MyLead/leadCreate`,
				state: {
					screen: 'list',
					data: dataObj.leadId,
					mode: 'edit'
				}
			};
			history.push(toObject);
		}
		if (dataObj.action === 'Upgrade') {
			let leadIds = [];
			setProspectViewRefId(dataObj?.leadId);
			leadIds.push(dataObj?.leadId);
			setShowUpgradeModal(true);
			setSelectedRowKeys(leadIds);
		}
		if (dataObj.action === 'Assign') {
			let leadIds = [];
			setProspectViewRefId(dataObj?.leadId);
			leadIds.push(dataObj?.leadId);
			setShowAssignModal(true);
			setSelectedRowKeys(leadIds);
		}
	};

	const RenderMoreOptions = (prospectId, dataObject) => {
		// const options = [
		//   "Modify",
		//   "Closed Won",
		//   "Closed Missed",
		//   "Take Note",
		//   "Create Task",
		//   "Record Interaction",
		//   "Create Opportunity",
		// ];

		/* Modified by Pranav on 24th June 2021, 7:23 AM */
		// const onMoreMenuSelect = (task) => {
		//   let toObject;
		//   switch (task) {
		//     case "Modify":
		//       toObject = {
		//         pathname: `MyProspect/ProspectCreate`,
		//         state: {
		//           screen: "list",
		//           data: prospectId.record.prospectId,
		//           mode: "edit",
		//         },
		//       };
		//       history.push(toObject);
		//       //handleRecordModify(prospectId);
		//       //onClick(prospectId);
		//       break;
		//     case "Closed Won":
		//       setShowUpdateStageModal(true);
		//       setProspectData({
		//         ...prospectData,
		//         recordId: prospectId.record.prospectId,
		//         status: "CLOSE",
		//         stage: "WON",
		//       });

		//       //setShowUpdateStageModal(true);
		//       break;
		//     case "Closed Missed":
		//       //setTakeNote(false);
		//       setShowUpdateStageModal(true);
		//       setProspectData({
		//         ...prospectData,
		//         recordId: prospectId.record.prospectId,
		//         status: "CLOSE",
		//         stage: "LOSS",
		//       });

		//       break;
		//     case "Take Note":
		//       // setTakeNote(true);
		//       // setShowUpdateStageModal(true);
		//       break;
		//     case "Create Task":
		//       toObject = {
		//         pathname: `TaskBoard/TaskCreate`,
		//       };
		//       history.push(toObject);
		//       break;
		//     case "Record Interaction":
		//       toObject = {
		//         pathname: `MyInteractions/InteractionCreate`,
		//       };
		//       history.push(toObject);
		//       break;
		//     case "Create Opportunity":
		//       toObject = {
		//         pathname: miniMode
		//           ? `MyOpportunity/OpportunityCreate`
		//           : `MyOpportunity/OpportunityCreate`,
		//         // state: {screen: "list", data: dataObject, mode: "create" },
		//         state: {
		//           screen: "prospect-list",
		//           data: prospectId,
		//           mode: "create",
		//         },
		//       };
		//       history.push(toObject);
		//       break;
		//     default:
		//       break;
		//   }
		// };

		// const content = () => (
		//   <div style={{ display: "flex", flexDirection: "column" }}>
		//     {options.map((option, index) => (
		//       <div key={index} className="row-action-option">
		//         <span
		//           onClick={(e) => {
		//             // setSelectedRowKeys([...selectedRowKeys, prospectId]);
		//             // setSelectedRows([...selectedRows, dataObject]);
		//             // option.toLowerCase() === "modify" &&
		//             //   handleRecordModify(prospectId);
		//             // option.toLowerCase() === "downgrade" &&
		//             //   setShowDowngradeModal(true);
		//             // option.toLowerCase() === "create opportunity" &&
		//             //   handleCreateOpportunityClick();
		//             if (dataObject && e.target.innerHTML !== "Convert") {
		//               // setSelectedRowKeys([...selectedRowKeys, prospectId]);
		//               // setSelectedRows([...selectedRows, dataObject]);
		//               onMoreMenuSelect(e.target.innerHTML);

		//               // setSelectedRowKeys([prospectId]);
		//               // setSelectedRows([dataObject]);
		//             }
		//           }}
		//         >
		//           {option}{" "}
		//         </span>
		//       </div>
		//     ))}
		//   </div>
		// );
		return (
			<div className='col-more'>
				{/* Removed this on backend request */}
				{/* <Popover
                  placement="bottomLeft"
                  content={content}
                  overlayClassName="opportunity-listing-actions-popover"
                >
                  <FontAwesomeIcon
                    icon={faEllipsisHAlt}
                    size="2x"
                    className="row-actions-menu-icon"
                  />
                </Popover> */}
			</div>
		);
	};

	const renderFavourite = (data) => {
		return (
			<div className='col-more'>
				<div>
					<ScRate allowHalf={false} count={1} value={data.isFavorite} />
				</div>
			</div>
		);
	};

	const cancelOperation = (operationName) => {
		//operationName === "delete" && setShowDeleteModal(false);
		operationName === 'updateStage' && setShowUpdateStageModal(false);
		// setSelectedRowKeys([]);
		// setSelectedRows([]);
	};

	const handleUpdateStageOk = (values) => {
		// updateOpportunityStageApi(values)
		//   .then((res) => {
		//     if (res.data.success) {
		//       miniMode
		//         ? miniComponentData.getData()
		//         : executeGetAllOpportunityData(setLocalOpportunityData, setLoading);
		//       setShowUpdateStageModal(false);
		//       setShowSuccessModal(true);
		//       setSelectedRows([]);
		//       setSelectedRowKeys([]);
		//     } else {
		//       setShowUpdateStageModal(false);
		//       !Array.isArray(res.data)
		//         ? setOpErrorArray([res.data])
		//         : setOpErrorArray(res.data);
		//       setShowFailModal(true);
		//     }
		//   })
		//   .catch((err) => {
		//   });
	};
	const RenderClientProspectProfile = ({ record }) => (
		<div className='profile'>
			<div>
				<AvatarLogo
					imgsrc={record.profileImage}
					profileName={record.profileInitial}
					avatarSize={AvatarSize.extrasmall}
					style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
				/>
				{/* {record.profileImage === null || record.profileImage === "U" ? (
              <div className="prospectInitialsCircleImg">
                {record.profileInitial}
              </div>
                          ) : (
                <Avatar
                  size={80}
                  className="avatar"
                  style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
                  icon={
                    <img
                      src={`data:image/jpeg;base64,${record.profileImage}`}
                      alt="I"
                    />
                  }
                />
              )} */}
			</div>
		</div>
	);

	const RenderRecentProspectsCard = () => {
		const [loading, setLoading] = useState();
		const [recentProspect, setRecentProspect] = useState();
		const [prospectModalShow, setProspectModalShow] = useState(false);

		useEffect(() => {
			getRecentProspectApi().then((res) => {
				setRecentProspect(res.data);
				setLoading(false);
			});
		}, []);

		const onCellFavourite = (data, rowIndex) => {
			return {
				onClick: (event) => {
					addFavouriteProspectApi(data.prospectId, CONSTANTS.progNames.PROSPECTADD)
						.then((res) => {
							getRecentProspectApi().then((res) => setRecentProspect(res.data));
						})
						.catch((err) => {
							console.log('EEROR: ', err);
						})
						.finally(() => {});
				}
			};
		};
		const RenderMiniRecentTableSection = ({ data }) => {
			const styleSet = {
				addressBlock: {
					wordWrap: 'break-word'
				},
				rowStyle: {
					padding: '32px 0px',
					color: palette.secondary.light,
					borderBottom: '1px solid #CBD6FF'
				},
				name: {
					color: '#222747'
				},
				socialIcon: {
					height: '12px',
					width: '12px',
					color: palette.secondary.light,
					margin: '3px'
				}
			};
			const cityName = (address, city) => {
				return address && city ? `, ${city}` : ` `;
			};

			return data?.slice(0, 3).map((item) => (
				<Row key={item.id} gutter={8} style={{ ...styleSet.rowStyle, ...theme.secondaryBody }}>
					<Col lg={24} xl={6}>
						<AvatarLogo
							imgsrc={''}
							profileName={item.profileInitial}
							avatarSize={AvatarSize.extrasmall}
							style={{ backgroundColor: item.color }}
						/>
					</Col>
					<Col lg={24} xl={18}>
						<Space direction='vertical'>
							<Row>
								<Col span={24}>
									<div style={{ ...theme.secondaryHeader, ...styleSet.name }}>
										{`${item.firstName} ${item.lastName ?? ''}`}
									</div>
									<div style={{ ...styleSet.addressBlock }}>
										<FontAwesomeIcon icon={faMapMarkerAlt} />
										{item.address ? item.address : ''}
										{cityName(item.address, item.cityName)}
									</div>
								</Col>
							</Row>
							<Row>
								<Col span={24}>
									<div>{item.email}</div>
									<div>
										{/* {item.countryCode} */}
										{item.mobile}{' '}
									</div>
								</Col>
							</Row>
							<Row>
								<Col span={10}>
									<GenericBadge badgeBody={'Wealth'} />
								</Col>
								{/* <Col span={14} style={theme.justifySBetween}> */}
								<Col span={14}>
									<a style={{ paddingRight: '10px' }}>
										{item.interestlevel === 'Hot' ? (
											<FontAwesomeIcon icon={faFire} color='orange' />
										) : (
											<FontAwesomeIcon icon={faSnowflake} color='#56B8BE' />
										)}
									</a>
									<a style={{ paddingRight: '10px' }}>
										{item.qualificationStatus === 'Qualified' ? (
											<FontAwesomeIcon icon={faClipboardCheck} color='#696A91' />
										) : (
											<FontAwesomeIcon icon={faClipboardCheck} color='red' />
										)}
									</a>
									{item.linkedIn && (
										<a
											href={`https://linkedin.com/${item.linkedIn}`}
											style={{ paddingRight: '10px' }}
										>
											<FontAwesomeIcon
												className='socialList'
												icon={faLinkedin}
												style={{ color: '#0072b1' }}
											/>
										</a>
									)}
									{item.twitter && (
										<a
											href={`https://twitter.com/${item.twitter}`}
											style={{ paddingRight: '10px' }}
										>
											<FontAwesomeIcon
												className='socialList'
												icon={faTwitter}
												style={{
													color: '#00acee'
												}}
											/>
										</a>
									)}
									{item.facebook && (
										<a
											href={`https://facebook.com/${item.facebook}`}
											style={{ paddingRight: '10px' }}
										>
											<FontAwesomeIcon
												className='socialList'
												icon={faFacebookSquare}
												style={{
													color: '#4267B2'
												}}
											/>
										</a>
									)}
								</Col>
							</Row>
						</Space>
					</Col>
				</Row>
			));
			// const RenderRow = ({ record, index }) => {
			// 	return (
			// 		<div className={`record ${index === 0 ? 'first' : index === 2 ? 'last' : ''}`}>
			// 			<div className='header'>
			// 				<RenderClientProspectProfile record={record} />
			// 				<span className='prospect-name'> {record.firstName} </span>
			// 				<div className='more'>
			// 					{/* <RenderFavourite record={record} /> */}
			// 					<RenderMoreOptions record={record} />
			// 				</div>
			// 			</div>
			// 			<div className='rest-prospects-details'>
			// 				<div className='address-city'>
			// 					<FontAwesomeIcon
			// 						className='socialList'
			// 						icon={faMapMarkerAlt}
			// 						style={{ marginRight: '5px' }}
			// 					/>
			// 					<span>{record.address} </span> <span>{record.city} </span>
			// 				</div>
			// 				<div className='email'>
			// 					<span> {record.email} </span>
			// 				</div>
			// 				<div className='mobile'>
			// 					<span> {record.mobile} </span>
			// 				</div>
			// 				<div className='tags'>
			// 					<Row>
			// 						<Col>
			// 							<div className='active'>
			// 								<span> {record.category} </span>
			// 							</div>
			// 						</Col>
			// 					</Row>
			// 					<Row>
			// 						<Row>
			// 							<Col>
			// 								<div className='interest-level'>
			// 									{record.interestlevel === 'Hot' ? (
			// 										<FontAwesomeIcon
			// 											icon={faFire}
			// 											size='1x'
			// 											color='orange'
			// 											className='socialList'
			// 										/>
			// 									) : (
			// 										<FontAwesomeIcon
			// 											icon={faSnowflake}
			// 											className='socialList'
			// 											color='#56B8BE'
			// 										/>
			// 									)}
			// 								</div>
			// 							</Col>
			// 						</Row>
			// 						<Col>
			// 							<div className='qualification-status'>
			// 								{record.qualificationStatus === 'Qualified' ? (
			// 									<FontAwesomeIcon
			// 										icon={faClipboardCheck}
			// 										className='socialList'
			// 										color='#696A91'
			// 									/>
			// 								) : (
			// 									<FontAwesomeIcon
			// 										icon={faClipboardCheck}
			// 										className='socialList'
			// 										color='red'
			// 									/>
			// 								)}
			// 							</div>
			// 						</Col>
			// 					</Row>
			// 					<Row>
			// 						<Col>
			// 							<div>
			// 								{record.linkedIn !== null ? (
			// 									<TextSubText
			// 										className='socialList-round'
			// 										icon={
			// 											<FontAwesomeIcon
			// 												className='socialList'
			// 												icon={faLinkedin}
			// 												style={{ color: '#0072b1' }}
			// 											/>
			// 										}
			// 										subtext=''
			// 										link={`https://linkedin.com/${record.linkedIn}`}
			// 									/>
			// 								) : (
			// 									''
			// 								)}
			// 								{record.twitter !== null ? (
			// 									<TextSubText
			// 										className='socialList-round'
			// 										icon={
			// 											<FontAwesomeIcon
			// 												className='socialList'
			// 												icon={faTwitter}
			// 												// size="1x"
			// 												style={{
			// 													color: '#00acee'
			// 													// marginLeft: '30px',
			// 													// bottom: '23px',
			// 													// position: 'relative'
			// 												}}
			// 											/>
			// 										}
			// 										subtext=''
			// 										link={`https://twitter.com/${record.twitter}`}
			// 									/>
			// 								) : (
			// 									''
			// 								)}
			// 								{record.facebook !== null ? (
			// 									<TextSubText
			// 										className='socialList-round'
			// 										icon={
			// 											<FontAwesomeIcon
			// 												className='socialList'
			// 												icon={faFacebookSquare}
			// 												style={{
			// 													color: '#4267B2'
			// 													// marginLeft: '55px',
			// 													// bottom: '50px',
			// 													// position: 'relative'
			// 												}}
			// 											/>
			// 										}
			// 										// text={record.facebook}
			// 										subtext=''
			// 										link={`https://facebook.com/${record.facebook}`}
			// 									/>
			// 								) : (
			// 									''
			// 								)}
			// 							</div>
			// 						</Col>
			// 					</Row>
			// 				</div>
			// 			</div>
			// 		</div>
			// 	);
			// };
			// return (
			// 	<div className='mini-table'>
			// 		{data.map((record, index) => {
			// 			return index < 3 ? <RenderRow record={record} index={index} /> : null;
			// 		})}
			// 	</div>
			// );
		};

		const prospectColumns = (data, record) => {
			return [
				{
					title: 'Name',
					// dataIndex: data.firstName,
					render: (data) => (
						// <Row justify='space-evenly'>
						<Row>
							<Space>
								<AvatarLogo
									imgsrc={data.profileImage}
									profileName={data.profileInitial}
									avatarSize={AvatarSize.extrasmall}
									style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
								/>
								{/* {data.profileImage === null || data.profileImage === "U" ? (
                <Avatar size={80}>{data.profileInitial}</Avatar>
                                ) : (
                  <Avatar
                    size={80}
                    className="avatar"
                    style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
                    icon={
                      <img
                        src={`data:image/jpeg;base64,${data.profileImage}`}
                        alt="I"
                      />
                    }
                  />
                )} */}
								<Space direction='vertical' size={2}>
									<Text style={{ fontWeight: '600' }}>{data.firstName}</Text>
									<Space>
										<Text
											style={{
												backgroundColor: '#F0F2FB',
												color: '#354081',
												padding: '2px 10px',
												borderRadius: '20px',
												fontSize: '12px',
												marginRight: '2px'
											}}
										>
											{data.category}
										</Text>
										{data.interestlevel === 'Hot' ? (
											<FontAwesomeIcon
												icon={faFire}
												size='1x'
												color='orange'
												className='socialList'
											/>
										) : (
											<FontAwesomeIcon icon={faSnowflake} className='socialList' color='#56B8BE' />
										)}
										{data.qualificationStatus === 'Qualified' ? (
											<FontAwesomeIcon
												icon={faClipboardCheck}
												className='socialList'
												color='#696A91'
											/>
										) : (
											<FontAwesomeIcon icon={faClipboardCheck} className='socialList' color='red' />
										)}
									</Space>
								</Space>
							</Space>
						</Row>
					)
				},
				{
					title: 'Contact',
					// dataIndex: data.mobile,
					render: (data) => (
						<Row justify='center'>
							<Space direction='vertical' size={2}>
								{data.mobile} {data.email}
							</Space>
						</Row>
					)
				},
				{
					title: 'Source',
					// dataIndex: data.source,
					render: (data) => {
						return <Row justify='center'> {data.sourceName} </Row>;
					}
				},
				{
					title: 'Type',
					// dataIndex: data.sourceType,
					render: (data) => {
						return <Row justify='center'> {data.sourceType} </Row>;
					}
				},
				{
					title: 'Relationship Manager',
					// dataIndex: data.relationshipManager,
					render: (data) => {
						return <Row justify='center'> {data.relationshipManager} </Row>;
					}
				},

				{
					title: '',
					// dataIndex: isFavourite,
					key: 'isFavourite',
					onCell: onCellFavourite,
					render: (data) => renderFavourite(data)
				},
				{
					title: '',
					render: (data) => (
						<Row justify='center'>
							<Dropdown
								className='menu-dropdown'
								overlay={menu(data, handleRecordModifyProspect)}
								placement='bottomRight'
							>
								<Button type='text'>
									<FontAwesomeIcon icon={faEllipsisHAlt} size='lg' color='#354081' />
								</Button>
							</Dropdown>
						</Row>
					)
				}
			];
		};
		return (
			<Card loading={loading} className='prospects-card styled-border' title='Recent Prospects'>
				{recentProspect && <RenderMiniRecentTableSection data={recentProspect} />}
				<div className='view-all-btn'>
					<Button onClick={() => setProspectModalShow(true)} className='view-all-btn-clr'>
						View All
					</Button>
					<RecentModal
						data={recentProspect}
						showModal={prospectModalShow}
						setShowModal={(val) => setProspectModalShow(val)}
						columns={prospectColumns(recentProspect)}
						authorizeCode={authorizeCode}
						title='Recent Prospects'
					/>
				</div>
			</Card>
		);
	};
	const RenderRecentLeadsCard = () => {
		const [loading, setLoading] = useState();
		const [recentLeadData, setRecentLeadData] = useState();
		const [leadsModalShow, setLeadsModalShow] = useState(false);

		useEffect(() => {
			getRecentLeadApi().then((res) => {
				setRecentLeadData(res.data);
				setLoading(false);
			});
		}, []);

		const RenderMiniRecentTableSection = ({ data }) => {
			const RenderRow = ({ record, index }) => {
				return (
					<div className={`record ${index === 0 ? 'first' : index === 2 ? 'last' : ''}`}>
						<div className='header'>
							<RenderClientProspectProfile record={record} />
							<span className='leads-name'>{record.firstName}</span>
						</div>
						<div className='rest-leads-details'>
							<div className='address-city'>
								<FontAwesomeIcon
									className='socialList'
									icon={faMapMarkerAlt}
									style={{ marginRight: '5px' }}
								/>
								<span>{record.address}</span> <span> {record.city} </span>
							</div>
							<div className='email'>
								<span> {record.email} </span>
							</div>
							<div className='mobile'>
								<span> +{record.mobile} </span>
							</div>
							<div className='tags'>
								<div className='active'>
									<span> {record.category} </span>
								</div>
								<div className='interest-level'>
									{record.interestlevel === 'Hot' ? (
										<FontAwesomeIcon
											icon={faFire}
											size='1x'
											color='orange'
											className='socialList'
										/>
									) : (
										<FontAwesomeIcon icon={faSnowflake} className='socialList' color='#56B8BE' />
									)}
								</div>
								<div className='qualification-status'>
									{/* {record.qualificationStatus === "Qualified" ? (
                  <FontAwesomeIcon
                    icon={faClipboardCheck}
                    className="socialList"
                    color="#696A91"
                  />
                  ) : (
                  <FontAwesomeIcon
                    icon={faClipboardCheck}
                    className="socialList"
                    color="red"
                  />
                  )} */}
								</div>
								<div>
									{record.linkedIn !== null ? (
										<TextSubText
											className='socialList-round'
											icon={
												<FontAwesomeIcon
													className='socialList'
													icon={faLinkedin}
													style={{
														color: '#48A1EC',
														marginRight: '5px'
													}}
												/>
											}
											subtext=''
											link={`https://linkedin.com/${record.linkedIn}`}
										/>
									) : (
										''
									)}
									{record.twitter !== null ? (
										<TextSubText
											className='socialList-round'
											icon={
												<FontAwesomeIcon
													className='socialList'
													icon={faTwitter}
													// size="1x"
													style={{
														color: '#48A1EC',
														marginLeft: '25px',
														position: 'relative',
														bottom: '25px'
													}}
												/>
											}
											subtext=''
											link={`https://twitter.com/${record.twitter}`}
										/>
									) : (
										''
									)}
									{record.facebook !== null ? (
										<TextSubText
											className='socialList-round'
											icon={
												<FontAwesomeIcon
													className='socialList'
													icon={faFacebookSquare}
													style={{
														color: '#48A1EC',
														marginLeft: '50px',
														position: 'relative',
														bottom: '48px'
													}}
												/>
											}
											// text={record.facebook}
											subtext=''
											link={`https://facebook.com/${record.facebook}`}
										/>
									) : (
										''
									)}
								</div>
							</div>
						</div>
					</div>
				);
			};
			return (
				<div className='mini-table'>
					{data.map((record, index) => {
						return index < 3 ? <RenderRow record={record} index={index} /> : null;
					})}
				</div>
			);
		};

		function leadsColumns(data) {
			return [
				{
					title: 'Name',
					render: (data) => (
						<Row justify='space-evenly'>
							<Space>
								<AvatarLogo
									imgsrc={data.profileImage}
									profileName={data.ProfileInitial}
									avatarSize={AvatarSize.medium}
									style={{
										color: '#f56a00',
										backgroundColor: '#fde3cf'
									}}
								/>
								<Space direction='vertical' size={2}>
									<Text
										style={{
											fontWeight: '600'
										}}
									>
										{data.firstName}
									</Text>
									<Space>
										<Text
											style={{
												backgroundColor: '#F0F2FB',
												color: '#354081',
												padding: '2px 10px',
												borderRadius: '20px',
												fontSize: '12px',
												marginRight: '2px'
											}}
										>
											{data.category}
										</Text>
										{data.interestlevel === 'Hot' ? (
											<FontAwesomeIcon
												icon={faFire}
												size='1x'
												color='orange'
												className='socialList'
											/>
										) : (
											<FontAwesomeIcon icon={faSnowflake} className='socialList' color='#56B8BE' />
										)}
										{/* {data.qualificationStatus === "Qualified" ? (
                    <FontAwesomeIcon
                      icon={faClipboardCheck}
                      className="socialList"
                      color="#696A91"
                    />
                      ) : (
                    <FontAwesomeIcon
                      icon={faClipboardCheck}
                      className="socialList"
                      color="red"
                    />
                    )} */}
									</Space>
								</Space>
							</Space>
						</Row>
					)
				},
				{
					title: 'Contact',
					render: (data) => (
						<Row justify='center'>
							<Space direction='vertical' size={2}>
								{data.mobile} {data.email}
							</Space>
						</Row>
					)
				},
				{
					title: 'Source',
					render: (data) => {
						return <Row justify='center'> {data.sourceName} </Row>;
					}
				},
				{
					title: 'Type',
					render: (data) => {
						return <Row justify='center'> {data.sourceType} </Row>;
					}
				},
				{
					title: 'Relationship Manager',
					render: (data) => {
						return <Row justify='center'> {data.relationshipManager} </Row>;
					}
				},
				{
					title: '',
					render: (data) => (
						<Row justify='center'>
							<Dropdown
								className='menu-dropdown'
								overlay={menu(data, handleRecordModifyLead)}
								placement='bottomRight'
							>
								<Button type='text'>
									<FontAwesomeIcon icon={faEllipsisHAlt} size='lg' color='#354081' />
								</Button>
							</Dropdown>
						</Row>
					)
				}
			];
		}
		return (
			// <Card loading={loading} className='leads-card' title={<h2> Recent Leads </h2>}>
			// 	{recentLeadData && <RenderMiniRecentTableSection data={recentLeadData} />}
			// 	<div className='view-all-btn'>
			// 		<Button onClick={() => setLeadsModalShow(true)}> View All </Button>
			// 		<RecentModal
			// 			data={recentLeadData}
			// 			showModal={leadsModalShow}
			// 			setShowModal={(val) => setLeadsModalShow(val)}
			// 			columns={leadsColumns(recentLeadData)}
			// 			title='Recent Leads'
			// 		/>
			// 	</div>
			// </Card>
			<></>
		);
	};
	const RenderCampaignSourceCard = () => {
		const [loading, setLoading] = useState(true);
		const [campaignSourceData, setCampaignSourceData] = useState();
		const [isModalVisible, setIsModalVisible] = useState(false);
		const [campaign, setCampaign] = useState('CampaignType');
		const [campaignPopOverModalShow, setCampaignPopOverModalShow] = useState(false);
		const handleOk = () => {
			setIsModalVisible(false);
		};

		useEffect(() => {
			getCampaignTypeApi(campaign).then((res) => {
				setCampaignSourceData(res.data);
				setLoading(false);
			});
		}, [campaign]);

		const RenderCardHeader = () => {
			const options = [
				{
					value: 'CampaignType',
					label: 'Campaign Type'
				},
				{
					value: 'CampaignName',
					label: 'Campaign Name'
				}
			];
			// const popOver = () => {
			//   return (
			//     <Modal visible={isModalVisible} onOk={handleOk}>
			//       <Card
			//         title={
			//           <Typography.Text> Campaign Effectiveness </Typography.Text>
			//         }
			//       >
			//         <div> Hi Anoosha </div>{" "}
			//       </Card>{" "}
			//     </Modal>
			//   );
			// };
			return (
				<>
					<h3>
						<span style={{ marginRight: '15px', fontSize: '18px' }}>Campaign Source</span>
						<span>
							<FontAwesomeIcon
								icon={faExternalLinkAlt}
								size='1x'
								color='#696A91'
								onClick={() => {
									setIsModalVisible(true);
								}}
							/>
							<Modal
								visible={isModalVisible}
								onOk={handleOk}
								onCancel={handleOk}
								width='70vw'
								height='auto'
							>
								<CampaignSource
									data={campaignSourceData}
									xfield='count'
									yfield='type'
									plottingCategory={campaign}
								/>
							</Modal>
						</span>
						<CampaignPopOverModal
							showModal={campaignPopOverModalShow}
							setShowModal={setCampaignPopOverModalShow}
							title='Campaign Effectiveness'
							// graph={
							//   <CampaignSource
							//     data={campaignSourceData}
							//     xfield="count"
							//     yfield="type"
							//     plottingCategory={campaign}
							//   />
							// }
						/>
					</h3>
					<PlottingCategorySelector
						options={options}
						plottingCategory={campaign}
						setPlottingCategory={setCampaign}
					/>
				</>
			);
		};

		return (
			<Card loading={loading} className='dist-card styled-border' title={<RenderCardHeader />}>
				<CampaignSource
					data={campaignSourceData}
					xfield='count'
					yfield='type'
					plottingCategory={campaign}
				/>
			</Card>
		);
	};
	const RenderCampaignEffectivenessCard = () => {
		const [loading, setLoading] = useState(true);
		const [activeCampaignData, setActiveCampaignData] = useState();

		useEffect(() => {
			getActiveCampaignGraphApi().then((res) => {
				setActiveCampaignData(res.data);
				setLoading(false);
			});
		}, []);
		var activeCampaignDataList =
			activeCampaignData && activeCampaignData.map((item) => item.activeCampaignCount);
		const RenderTooltip = (data) => {
			const TooltipWrapper = styled.div`
				min-width: 200px;
				padding: 5px;
			`;
			const TooltipAttribute = styled(Row)`
				margin: 6px 0;
			`;
			const TitleAttr = () => (
				<TooltipAttribute align='top' justify='space-between'>
					<Col span={9}>
						{/* <strong> {data[0] && data[0].title} </strong> */}
						<strong>{data[0] && data[0].data.duration} </strong>
					</Col>
				</TooltipAttribute>
			);
			const EnquriesAttr = () => (
				<TooltipAttribute align='top' justify='space-between'>
					<Col span={14}>
						<span>
							<Row
								justify='space-between'
								style={{
									width: '100%'
								}}
							>
								<span>Enquiries </span>
								<span>:</span>
							</Row>
						</span>
					</Col>
					<Col span={9}>
						<strong> {data[0] && data[0].data.enquiryCount} </strong>
					</Col>
				</TooltipAttribute>
			);
			const CompaignAttr = () => {
				return (
					<TooltipAttribute align='top' justify='space-between'>
						<Col span={14}>
							<span>
								<Row
									justify='space-between'
									style={{
										width: '100%'
									}}
								>
									<span> Active Campaign </span> <span>: </span>
								</Row>
							</span>
						</Col>
						<Col span={9}>
							<strong> {data[0] && data[0].data.activeCampaignCount} </strong>
						</Col>
					</TooltipAttribute>
				);
			};
			return (
				<TooltipWrapper>
					<TitleAttr />
					<EnquriesAttr />
					<CompaignAttr />
				</TooltipWrapper>
			);
		};
		///// Active Campaign Graph
		const ActiveTooltip = (data) => {
			const TooltipWrapper = styled.div`
				min-width: 200px;
				padding: 7px;
			`;
			const TooltipAttribute = styled(Row)`
				margin: 6px 0;
			`;

			let dateIndex = data[0] && data[0].title;
			const TitleAtt = () => (
				<TooltipAttribute align='top' justify='space-between'>
					<Col span={9}>
						<strong style={{ fontSize: 10 }}>
							{moment(activeCampaignData[dateIndex]?.date).format(getDateFormat())}
						</strong>
					</Col>
				</TooltipAttribute>
			);
			const EnquriesAtt = () => (
				<TooltipAttribute align='top' justify='space-between'>
					<Col span={14}>
						<span>
							<Row
								justify='space-between'
								style={{
									width: '100%'
								}}
							>
								<span style={{ fontSize: 12 }}> Enquiries </span> <span>: </span>
							</Row>
						</span>
					</Col>
					<Col span={9}>
						<strong> {activeCampaignData[dateIndex]?.enquiryCount} </strong>
					</Col>
				</TooltipAttribute>
			);
			const CompaignAtt = () => {
				return (
					<TooltipAttribute align='top' justify='space-between'>
						<Col span={14}>
							<span>
								<Row
									justify='space-between'
									style={{
										width: '100%'
									}}
								>
									<span style={{ fontSize: 12 }}> Active Campaign </span> <span>: </span>
								</Row>
							</span>
						</Col>
						<Col span={9}>
							<strong> {data[0] && data[0].data.y} </strong>
						</Col>
					</TooltipAttribute>
				);
			};
			return (
				<TooltipWrapper>
					<TitleAtt />
					<EnquriesAtt />
					<CompaignAtt />
				</TooltipWrapper>
			);
		};

		if (activeCampaignData) {
			var areaConfig = {
				width: 300,
				height: 120,
				xField: 'duration',
				yField: 'activeCampaignCount',
				data: activeCampaignDataList,
				smooth: true,
				color: '#5564C1',
				areaStyle: {
					fill: '#E8EBFE'
				},
				legend: {
					position: 'bottom'
				},
				tooltip: {
					// showTitle: false,
					// showMarkers: false,
					domStyles: {
						'g2-tooltip': {
							border: '1px solid #5d6dd1',
							boxSizing: 'border-box',
							boxShadow: '0px 4px 6px rgba(203, 214, 255, 0.25)',
							borderRadius: '16px'
						}
					},
					customContent: (title, data) => {
						return data ? ActiveTooltip(data) : null;
					}
				}
			};

			var lineConfig = {
				width: 300,
				height: 150,
				data: activeCampaignData,
				xField: 'duration',
				yField: 'enquiryCount',
				smooth: true,
				xAxis: {
					// type: 'timeCat',
					// tickCount: 6
					tickCount: 7
				},
				color: '#56B8BE',
				tooltip: {
					// showTitle: false,
					// showMarkers: false,
					domStyles: {
						'g2-tooltip': {
							border: '1px solid #5d6dd1',
							boxSizing: 'border-box',
							boxShadow: '0px 4px 6px rgba(203, 214, 255, 0.25)',
							borderRadius: '16px'
						}
					},
					customContent: (title, data) => {
						return data ? RenderTooltip(data) : null;
					}
				}
			};
		}

		return (
			<Card loading={loading} className='dist-card styled-border' title='Campaign Effectiveness '>
				<div className='campaign-effectiveness'>
					<div className='graph-section'>
						<h3
							style={{
								marginTop: '8px',
								marginBottom: '8px'
							}}
						>
							Enquires
						</h3>
						<Line {...lineConfig} />
					</div>
					<div
						className='graph-section'
						style={{
							marginTop: '12px',
							marginBottom: '12px'
						}}
					>
						<h3
							style={{
								marginTop: '8px',
								marginBottom: '8px'
							}}
						>
							Active Campaigns
						</h3>
						<TinyArea {...areaConfig} />
					</div>
				</div>
			</Card>
		);
	};
	const RenderRecentCampaignCard = () => {
		const [loading, setLoading] = useState(true);
		const [recentCampaignData, setRecentCampaignData] = useState();
		const [campaignModalShow, setCampaignModalShow] = useState(false);
		const [currentIndex, setCurrentIndex] = useState(0);

		useEffect(() => {
			getRecentCampaignApi().then((res) => {
				setRecentCampaignData(res.data);
				setLoading(false);
			});
		}, []);
		const RenderRow = ({ record }) => {
			record['bulletMeasureField'] = [
				record.leadPercent,
				record.prospectPercent,
				record.customerPercent
			];
			record['bulletRangeField'] = [0, 50, 100];
			record['bulletTargetField'] = 0;
			return (
				<div className={`record first`}>
					<div className='details'>
						<div className='col-contents left-con'>
							<div className='name'> {record.name} </div>
							<div className='type'> {record.type} </div>
							<div className='active'> {record.activeYN} </div>
						</div>
						<Progress
							percent={50}
							showInfo={false}
							strokeColor={'#05BC6A'}
							style={{
								padding: '30px'
							}}
						/>
						<div className='col-contents right-con'>
							<div className='start-date'> {moment(record.startdate).format('Do MMM YYYY')} </div>
							<div className='start-date-text'> Created </div>
						</div>
					</div>
					<div className='row-contents'>
						<div className='cost'>
							<div className='value'>
								{record.estimatedExpenseCurrency} {record.estimatedExpense}
							</div>
							<div className='cost-text'> Cost </div>
						</div>
						<div className='expected-enquiry'>
							<div className='value'> {record.expectedEnquiry} </div>
							<div className='expected-enquiry-text'> Expected Enquiries </div>
						</div>
						<div className='actual-enquiry'>
							<div className='value'> {record.actualEnquiry} </div>
							<div className='actual-enquiry-text'> Actual Enquiries </div>
						</div>
						<div className='effectiveness'>
							<div className='value'>
								{' '}
								{Number((record.actualEnquiry / record.expectedEnquiry) * 10).toFixed(2)} %
							</div>
							<div className='effectiveness-text'> Effectiveness </div>
						</div>
					</div>
					<RecentCampaign
						data={record}
						measures='bulletMeasureField'
						ranges='bulletRangeField'
						target='bulletTargetField'
					/>
				</div>
			);
		};

		function campaignColumns(data) {
			return [
				{
					title: 'Campaign',
					// dataIndex: "campaigns",
					render: (data) => (
						<Row justify='space-evenly'>
							<TextSubText
								text={data.name}
								textStyle={{
									fontWeight: '600'
								}}
								subtext={data.type}
								subtextStyle={{
									fontWeight: '400'
								}}
							/>
						</Row>
					)
				},
				{
					title: 'Date',
					// dataIndex: "date",
					render: (data) => (
						<Row justify='center'>
							<Space direction='vertical' size={2}>
								{data.startdate}
								<Typography.Text
									style={{
										backgroundColor: '#F0F2FB',
										color: '#354081',
										padding: '2px 10px',
										borderRadius: '20px',
										fontSize: '12px',
										marginRight: '2px'
									}}
								>
									{data.activeYN}
								</Typography.Text>
							</Space>
						</Row>
					)
				},
				{
					title: 'Cost',
					// dataIndex: "cost",
					render: (data) => {
						return (
							<Row justify='center'>
								{data.estimatedExpenseCurrency} {data.estimatedExpense}
							</Row>
						);
					}
				},
				{
					title: 'Actual Enquiries',
					// dataIndex: "actualEnquiries",
					render: (data) => {
						return <Row justify='center'> {data.actualEnquiry} </Row>;
					}
				},
				{
					title: 'Expected Enquiries',
					// dataIndex: "expectedEnquiries",
					render: (data) => {
						return <Row justify='center'> {data.expectedEnquiry} </Row>;
					}
				},
				{
					title: 'Effectiveness',
					// dataIndex: "effectiveness",
					render: (data) => (
						<Row justify='center'>
							{data.expectedEnquiry > 0
								? Number((data.actualEnquiry / data.expectedEnquiry) * 10).toFixed(2)
								: Number(data.expectedEnquiry.toFixed(2))}
						</Row>
					)
				}
			];
		}

		return (
			<Card loading={loading} className='dist-card styled-border' title='Recent Campaign'>
				{recentCampaignData && (
					<div className='recent-campaign'>
						<Row align='middle' justify='center'>
							<FontAwesomeIcon
								style={{
									height: '32px',
									width: '32px'
								}}
								icon={faAngleLeft}
								onClick={() => {
									if (currentIndex !== 0) setCurrentIndex(currentIndex - 1);
								}}
							></FontAwesomeIcon>
							<div
								className='graph-section'
								style={{
									width: '90%',
									paddingBottom: '50px'
								}}
							>
								{recentCampaignData[currentIndex] && (
									<RenderRow record={recentCampaignData[currentIndex]} />
								)}
							</div>
							<FontAwesomeIcon
								style={{
									height: '32px',
									width: '32px'
								}}
								icon={faAngleRight}
								onClick={() => {
									if (currentIndex !== recentCampaignData.length - 1)
										setCurrentIndex(currentIndex + 1);
								}}
							></FontAwesomeIcon>
						</Row>
						<div className='view-all-btn'>
							<Button onClick={() => setCampaignModalShow(true)} className='view-all-btn-clr'>
								View All
							</Button>
							<RecentModal
								data={recentCampaignData}
								showModal={campaignModalShow}
								setShowModal={setCampaignModalShow}
								columns={campaignColumns(recentCampaignData)}
								title='Recent Campaigns'
							/>
						</div>
					</div>
				)}
			</Card>
		);
	};

	const RenderCreationConversionTrendCard = () => {
		const [loading, setLoading] = useState();
		const [prospectCreationData, setProspectCreationData] = useState();
		const [leadCreationData, setLeadCreationData] = useState();
		const [plottingCategory, setPlottingCategory] = useState('prospectCreationData');
		let config;

		useEffect(() => {
			axios
				.all([getProspectCreationDataApi(), getLeadCreationDataApi()])
				.then(
					axios.spread((...responses) => {
						setProspectCreationData(responses[0].data);
						setLeadCreationData(responses[1].data);
					})
				)
				.catch((errors) => {
					// react on errors.
				})
				.finally(() => {
					setLoading(false);
				});
		}, []);
		if (prospectCreationData && leadCreationData) {
			config = {
				appendPadding: 30,
				data: plottingCategory === 'leadCreationData' ? leadCreationData : prospectCreationData,
				isGroup: true,
				xField: 'month',
				yField: 'recordCount',
				seriesField: 'refType',
				color: ['#5564C1', '#56B8BE'],
				label: false,
				legend: {
					layout: 'horizontal',
					position: 'bottom'
				}
			};
		}

		const RenderCardHeader = () => {
			const options = [
				// {
				//   value: "leadCreationData",
				//   label: "Leads",
				// },
				{
					value: 'prospectCreationData',
					label: 'Prospects'
				}
			];
			return (
				<>
					<h3 style={{ fontSize: '18px' }}>Creation and Conversion Trend</h3>
					<PlottingCategorySelector
						options={options}
						plottingCategory={plottingCategory}
						setPlottingCategory={setPlottingCategory}
					/>
				</>
			);
		};
		return (
			<Card loading={loading} className='dist-card styled-border' title={<RenderCardHeader />}>
				{prospectCreationData && leadCreationData && (
					<div className='graph'>
						<Column {...config} />
					</div>
				)}
			</Card>
		);
	};

	const ProspectModal = () => (
		<>
			{prospectData.recordId && (
				<ProspectUpdateStageModal
					//records={selectedRowKeys[0]}
					visible={showUpdateStageModal}
					handleCancel={() => {
						cancelOperation('updateStage');
					}}
					stageData={prospectData}
					status='close'
					handleOk={handleUpdateStageOk}
				/>
				// <Modal
				//   title={takeNote ? "Title" : "Update Stage"}
				//   visible={showUpdateStageModal}
				//   onOk={handleOk}
				//   onCancel={handleCancel}
				// >
				//   {takeNote ? (
				//     <TextArea rows={4} placeholder="Take a note" />
				//   ) : (
				//     <h4>Prospect</h4>
				//   )}
				// </Modal>
			)}
		</>
	);

	return (
		<>
			<div className='prospect-overview-container'>
				<div className='prospect-repo-graphs'>
					<ProspectRepoCard />
					{/* <LeadRepoCard /> */}
				</div>
				<div className='graphs-tables-container'>
					<div className='dist-sp-ob-aa-ct-graphs'>
						<div className='dist-sp-graphs'>
							<div className='dist-graph'>
								<DemographicDistributionCard />
							</div>
							<div className='sp-graph'>
								<RenderProspectSourceCard />
							</div>
						</div>
						<div className='ob-graph'>
							<RenderCampaignSourceCard />
						</div>
						{/* <div className="ob-graph">
            <RenderTableViewCard />                                                                                                                                                                                                                                                                                                                 </div> */}
						<div className='aa-graph'>
							<RenderCampaignEffectivenessCard />
						</div>
						<div className='recent-campaign-graph'>
							<RenderRecentCampaignCard />
						</div>
						<div className='ct-graph'>
							<RenderCreationConversionTrendCard />
						</div>
					</div>
					<div className='recent-prospects-tables'>
						<div className='rp-m-table'>
							<RenderRecentProspectsCard />
						</div>
						<div className='deals-table'>
							<RenderRecentLeadsCard />
						</div>
						<RenderConfirmDeleteModal
							showDeleteModal={showDeleteModal}
							setShowDeleteModal={setShowDeleteModal}
							setShowSuccessFailureDeleteModal={setShowSuccessFailureDeleteModal}
							id={id}
							setDeleteMessage={setDeleteMessage}
							flag={checkLead}
							textLP={textLP}
						/>
						<RenderSuccessFailureDeleteModal
							deleteMessage={deleteMessage}
							showSuccessFailureDeleteModal={showSuccessFailureDeleteModal}
							setShowSuccessFailureDeleteModal={setShowSuccessFailureDeleteModal}
							setDeleteMessage={setDeleteMessage}
							textLP={textLP}
							setShowDeleteModal={setShowDeleteModal}
						/>
					</div>
				</div>
			</div>
			<ProspectModal />
			{/* <Modal
          title={takeNote ? "Title" : "Update Stage"}
          visible={showUpdateStageModal}
           onOk={handleOk}
          onCancel={handleCancel}
                                                                                                                                                                                                                                                                                                                                        >
          {takeNote ? (
            <TextArea rows={4} placeholder="Take a note" />
          ) : (
            <h4>Prospect</h4>
             <Input>
               <p>Prospect contents...</p>
               <p>Prospect contents...</p>
               <p>Prospect contents...</p>
            </Input>
          )}
                                                                                                                                                                                                                                                                                                                                        </Modal> */}
			{/* {opportunityStageData.recordId && (
            <OpportunityUpdateStageModal
              records={selectedRowKeys[0]}
              handleCancel={() => {
                cancelOperation("updateStage");
              }}
              handleOk={handleUpdateStageOk}
                                                                                                                                                                                                                                                                                            
              visible={showUpdateStageModal}
              stageData={opportunityStageData}
              status="close"
            />
          )} */}
			<Modal
				visible={showSuccessModal}
				closable={false}
				footer={[
					<Button
						onClick={() => {
							setShowSuccessModal(false);
							// history.goBack();
							// setRefresh(true);
							// setSelectedRows([]);
							// setSelectedRowKeys([]);
						}}
						key={'ok'}
					>
						OK
					</Button>
				]}
				centered
			>
				<SuccessModal message='Action Completed Successfully' />
			</Modal>
			<FailModal
				visible={showFailModal}
				onOk={setShowFailModal}
				onCancel={setShowFailModal}
				errorArray={errorArray}
			/>
			<RenderConfirmDowngradeModal
				// props={props}
				showDowngradeModal={showDowngradeModal}
				setShowDowngradeModal={setShowDowngradeModal}
				selectedRowKeys={selectedRowKeys}
				setSelectedRowKeys={setSelectedRowKeys}
				selectedRows={selectedRows}
				setSelectedRows={setSelectedRows}
			/>
			<RenderConvertToCustomerModal
				convertProspectModalOpen={convertProspectModalOpen}
				setConvertProspectModalOpen={setConvertProspectModalOpen}
				setMapToExistingCustomer={setMapToExistingCustomer}
				prospectViewRefId={prospectViewRefId}
			/>
			<RenderMapToExistingCustomerModal
				mapToExistingCustomer={mapToExistingCustomer}
				setMapToExistingCustomer={setMapToExistingCustomer}
				prospectViewRefId={prospectViewRefId}
				currentRowCount={currentRowCount}
				prospectConversionDependantData={prospectConversionDependantData}
				convertToCustomer={convertToCustomer}
				setConvertToCustomer={setConvertToCustomer}
				onMapToExistingCustomer={onMapToExistingCustomer}
			/>
			<RenderConfirmUpgradeModal
				showUpgradeModal={showUpgradeModal}
				setShowUpgradeModal={setShowUpgradeModal}
				selectedRowKeys={selectedRowKeys}
				setSelectedRowKeys={setSelectedRowKeys}
				selectedRows={selectedRows}
				setSelectedRows={setSelectedRows}
			/>
			<RenderAssignModal
				showAssignModal={showAssignModal}
				setShowAssignModal={setShowAssignModal}
				selectedRowKeys={selectedRowKeys}
				setSelectedRowKeys={setSelectedRowKeys}
				selectedRows={selectedRows}
				setSelectedRows={setSelectedRows}
			/>
			<BackToTop />
		</>
	);
};
const mapStateToProps = (state) => {
	return {
		prospectConversionDependantData: state.prospectView.prospectConversionDependantData,
		leftPanel: state.dashboard.leftPanel
	};
};
const mapDispatchToProps = {
	excecuteGetProspect360View,
	getProspectDependantData
};
export default connect(mapStateToProps, mapDispatchToProps)(ProspectOverviewScreen);
