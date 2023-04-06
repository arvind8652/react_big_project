import { InfoCircleOutlined } from '@ant-design/icons';

// NOT ADDED IN THIS PHASE
// import { faEllipsisHAlt } from '@fortawesome/pro-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Popover, Rate, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import moment from 'moment';

import GenericTable from '../GenericTable/GenericTable';
import { apiRequestUrls } from '../../config/apiConfig';

// styles
import './TradeBook.scss';
import { useHistory } from 'react-router-dom';
// Authorized
import { authorizeModule } from '../../utils/utils';
import { CONSTANTS } from '../../constants/constants';

const TableUI = ({ tableData, showLoader, authorizeCode }) => {
	const [dataSource, setDataSource] = useState([]);
	const [imageError, setImageError] = useState([]);

	const styles = {
		tagDesign: {
			marginTop: '8px'
		},
		popOverContent: {
			border: '1px solid #5d6dd1',
			borderRadius: '8px',
			boxShadow: '2px 2px 2px rgba(53, 64, 129, 0.25)'
		},
		imgDesign: {
			width: '50px',
			height: '50px',
			backgroundColor: ' #F0F2FB',
			borderRadius: '50%',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center'
		}
	};

	const ConsiderationTextHover = (props) => {
		const info = props.info;
		return (
			<div className='popOverContent'>
				<p>Rate: {info.rate}</p>
				<p>Charge: {info.charge}</p>
				<p>Net Rate: {info.netRate}</p>
			</div>
		);
	};

	const SettlementDateHover = (props) => {
		return (
			<div className='popOverContent'>
				<p>Settlement Date: {props.settlementDate}</p>
			</div>
		);
	};

	const handleOnError = (rowIdx) => {
		setImageError((prev) => {
			const newPrev = [...prev];
			newPrev[rowIdx] = true;
			return newPrev;
		});
	};

	const columns = [
		{
			dataIndex: 'icon',
			key: 'icon',
			render: (imgData, _, rowIdx) => {
				if (imageError[rowIdx] === true) {
					return (
						<div style={styles.imgDesign}>
							<h4 className='rowTitle'>{imgData.securityInitial}</h4>
						</div>
					);
				}
				return (
					<div style={styles.imgDesign}>
						<img
							onError={() => handleOnError(rowIdx)}
							src={apiRequestUrls.imagesUrl + imgData.src}
							alt={imgData.alt}
						/>
					</div>
				);
			}
		},
		{
			title: 'Security Name',
			dataIndex: 'fundName',
			key: 'fundName',
			render: (text) => (
				<>
					<h4 className='rowTitle'>{text.title}</h4>
					<div className='flexDiv'>
						<span className='flexLeftItem borderRight'>{text.userId}</span>
						<div className='flexRightIcon'>
							<Rate
								disabled
								defaultValue={text.rating}
								style={{ fontSize: '0.7rem', width: '8em' }}
							/>
						</div>
					</div>
					<div style={styles.tagDesign}>
						{text.tags.map((eachTag) => (
							<Tag key={eachTag} className='eachTag'>
								{eachTag}
							</Tag>
						))}
					</div>
				</>
			)
		},
		{
			title: 'Type',
			dataIndex: 'type',
			key: 'type',
			render: (type) => (
				<div>
					<Tag className='eachTag'>{type.orderType}</Tag>
					<p className='desc'>{type.desc}</p>
				</div>
			)
		},
		{
			title: 'Consideration',
			dataIndex: 'consideration',
			key: 'consideration',
			render: (info) => {
				return (
					<>
						<div className='flexDiv'>
							<p className='flexLeftItem considerationAmount'>
								{info.amount}{' '}
								<Popover
									placement='bottomLeft'
									content={() => <ConsiderationTextHover info={info} />}
									overlayInnerStyle={styles.popOverContent}
								>
									<InfoCircleOutlined className='flexRightIcon' />
								</Popover>
							</p>
						</div>
						<p className='desc'>{info.units}</p>
					</>
				);
			}
		},
		{
			title: 'Trade Date',
			key: 'tradeDate',
			dataIndex: 'tradeDate',
			render: (info) => (
				<>
					<div
						className='flexDiv'
						style={{ paddingBottom: '2vh', width: '7em', overflow: 'scroll' }}
					>
						<p className='flexLeftItem considerationAmount'>
							{info.date}{' '}
							<Popover
								placement='bottomLeft'
								content={() => <SettlementDateHover settlementDate={info.settlementDate} />}
								overlayInnerStyle={styles.popOverContent}
							>
								<InfoCircleOutlined className='flexRightIcon' />
							</Popover>
						</p>
					</div>
				</>
			)
		},
		{
			title: 'Participants',
			key: 'participants',
			dataIndex: 'participants',
			render: (participants) => (
				<>
					<p className='midDesc'>{participants[0]}</p>
					<p className='midDesc'>{participants[1]}</p>
				</>
			)
		},
		{
			title: 'Account',
			key: 'account',
			dataIndex: 'account',
			render: (text) => (
				<>
					<h4 className='rowTitle'>{text.portfolioType}</h4>
					<p className='midDesc'>Account Nature</p>
					<Tag className='eachTag'>{text.type}</Tag>
				</>
			)
		}
		// {
		//   key: 'endIcons',
		//   dataIndex: 'endIcons',
		//   render: (text) => (
		//     <>
		//       <FontAwesomeIcon
		//         icon={faEllipsisHAlt}
		//         size='2x'
		//         className='row-actions-menu-icon'
		//       />
		//     </>
		//   )
		// }
	];

	useEffect(() => {
		const newDataSource = tableData?.map((e) => ({
			icon: {
				alt: 'icon',
				src: e?.securityLogo,
				securityInitial: e?.securityInitial
			},
			fundName: {
				title: e?.customerName,
				userId: e?.customerId,
				rating: e?.starRating,
				tags: [e?.assetGroup, e?.assetType]
			},
			type: {
				orderType: e?.tranType,
				desc: 'Systematic Mandate'
			},
			consideration: {
				amount: e?.amount,
				units: e?.units,
				rate: e?.rate,
				charge: e?.charges,
				netRate: e?.netRate
			},
			tradeDate: {
				date: moment(e?.valueDate).format('DD-MM-YYYY'),
				settlementDate: moment(e?.valueDate).format('DD-MM-YYYY')
			},
			participants: [e?.custodian, e?.stockExchange],
			account: {
				portfolioType: e?.portfolio,
				type: e?.assetType
			}
		}));

		setDataSource(newDataSource);
	}, [tableData]);

	const history = useHistory();

	return (
		<GenericTable
			tableRows={dataSource}
			tableData={tableData}
			tableColumns={columns}
			pageSize={25}
			scroll={{ x: 'max-content' }}
			tableOptions={{
				// checkbox: true,
				expandableRow: false,
				favorite: false,
				pagination: true,
				isMenuOptions: false
			}}
			onRowClick={(rowData, rowIndex) => {
				authorizeModule(authorizeCode, CONSTANTS.authorizeCode.view) &&
					history.push({
						pathname: '/Dashboard/TradeBook/view',
						state: { ...tableData[rowIndex], type: 'transaction' }
					});
			}}
			loading={showLoader}
		/>
	);
};

export default TableUI;
