import React from 'react';
import { Col, Row } from 'antd';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import NumberFormat from '../../constants/NumberFormat';
import AvatarLogo from '../../components/Avatar/AvatarLogo';
import { AvatarSize } from '../../constants/AvatarSize';

const RenderMiniOpportunityTableSection = ({ data, getData, ...props }) => {
	const history = useHistory();
	// NOT USED
	// const RenderMoreOptions = ({ record }) => {
	//   const onMoreMenuSelect = (task) => {
	//     let toObject;
	//     switch (task) {
	//       case "Create New Opportunity":
	//         toObject = {
	//           pathname: `MyOpportunity/OpportunityCreate`,
	//           // state: { screen: "list", data: dataObject, mode: "create" },
	//           state: {
	//             screen: "list",
	//             data: record.opportunityId,
	//             mode: "create",
	//           },
	//         };
	//         history.push(toObject);
	//         break;
	//       default:
	//         break;
	//     }
	//   };
	//   const content = () => (
	//     <div style={{ display: "flex", flexDirection: "column" }}>
	//       {CONSTANTS.threeDotMenus.opportunity.map(
	//         (option, index) =>
	//           !["Modify", "Closed Won", "Closed Missed"].includes(option) && (
	//             <div key={index} className="row-action-option">
	//               <span
	//                 onClick={(e) => {
	//                   onMoreMenuSelect(e.target.innerHTML);
	//                 }}
	//               >
	//                 {option}
	//               </span>
	//             </div>
	//           )
	//       )}
	//     </div>
	//   );
	//   return (
	//     <div
	//       className="col-more"
	//       // onClick={(e) => {
	//       //   e.stopPropagation();
	//       // }}
	//     >
	//       <Popover
	//         placement="bottomLeft"
	//         content={content}
	//         overlayClassName="opportunity-listing-actions-popover"
	//       >
	//         <FontAwesomeIcon
	//           icon={faEllipsisHAlt}
	//           size="2x"
	//           className="row-actions-menu-icon"
	//         />
	//       </Popover>
	//     </div>
	//   );
	// };
	// NOT USED
	const RenderFavourite = ({ record }) => {
		const toggleFavourite = () => {
			addFavouriteOpportunityApi(record.opportunityId, CONSTANTS.progNames.OPPORTUNITYADD)
				.then((res) => {})
				.catch((err) => {
					console.log('EEROR: ', err);
				})
				.finally(() => {
					getData();
				});
		};
		return (
			<div
				onClick={() => {
					toggleFavourite();
				}}
			>
				<ScRate allowHalf={false} count={1} value={record.isFavourite} />
			</div>
		);
	};
	const RenderClientProspectProfile = ({ record }) => (
		<div className='profile'>
			<div>
				<AvatarLogo
					imgsrc={record.profileImage}
					profileName={record.profileInitial}
					avatarSize={AvatarSize.xs}
					style={{
						color: '#f56a00',
						backgroundColor: '#fde3cf',
						margin: '10rem'
					}}
				/>
				{/* <Avatar
        size={32}
        className="avatar"
        style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
        icon={
          record.profileImage ? (
            <img src={`${record.profileImage}`} alt="img" />
          ) : (
            <div>{record.profileInitial}</div>
          )
        }
      /> */}
			</div>
			<div className='profile-details' style={{ marginLeft: '10px' }}>
				<div>{record.clientProspectName}</div>
				<div className='profile-tag'>
					{record.tagName &&
						record.tagName.charAt(0).toUpperCase() + record.tagName.substring(1).toLowerCase()}
				</div>
			</div>
		</div>
	);
	const RenderRow = ({ record, index }) => {
		const viewRecord = () => {
			const opportunityIds = data && data.map((item) => item.opportunityId);
			const idx =
				data &&
				[
					...data.map((item, index) => {
						if (item.opportunityId === record.opportunityId) {
							return index;
						} else return null;
					})
				].filter((item) => item !== null);
			const toObject = {
				pathname: `MyOpportunity/OpportunityView`,
				state: {
					opportunityIds: opportunityIds,
					rowIndex: idx[0],
					miniMode: true
				}
			};
			history.push(toObject);
		};
		return (
			<div
				className={`record ${index === 0 ? 'first' : index === 2 ? 'last' : ''}`}
				onClick={() => {
					viewRecord();
				}}
				style={{ paddingBottom: '60px' }}
			>
				<Row align='middle' justify='space-between' className='header'>
					<Col span={24} className='opportunity-title-overview'>
						{record.opportunityName}
					</Col>
					{/* <Col span={6}>
          <Row align="middle" justify="end"> */}
					{/* <Col span={2}>
            <RenderFavourite record={record} />
            </Col> */}
					{/* <Col>
              <RenderMoreOptions record={record} />
            </Col> */}
					{/* </Row>
        </Col> */}
				</Row>
				<div className='target-amount'>
					{/* {"₱"} */}
					{record.currencySymbol}
					{record &&
						record.targetAmount &&
						record.targetAmount !== null &&
						NumberFormat(props.authData, record.targetAmount)}
				</div>
				<div className='stage-status'>
					<span>{record.stage}</span>
					<div className='status-tag'>{record.openOrClosed === 'OPEN' ? 'Open' : 'Closed'}</div>
				</div>
				<Row align='middle' justify='space-between' className='profile-duedate'>
					<Col span={13}>
						<RenderClientProspectProfile record={record} />
					</Col>
					<Col span={10} offset={1} className='due-date'>
						<div className='date'>{moment(record.dueDate).format('DD MMM YYYY')}</div>
						<div style={{ fontSize: '15px' }}>Due Date</div>
					</Col>
				</Row>
			</div>
		);
	};
	return (
		<div className='mini-table'>
			{data &&
				Array.isArray(data) &&
				data.map((record, index) => {
					return index < 3 ? <RenderRow key={index} record={record} index={index} /> : null;
				})}
		</div>
	);
};

export default RenderMiniOpportunityTableSection;
