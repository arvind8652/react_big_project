import { Card, Col, Row } from 'antd';

import './opportunityOverviewScreen.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import moment from 'moment';
import { exportJSON } from '../../utils/utils';
import {
	ScButtonText,
	ScModal,
	ScRow,
	ScScrollableDiv
} from '../../components/StyledComponents/genericElements';
import OpportunityListingScreen from '../OpportunityListingScreen/OpportunityListingScreen';
import styled from 'styled-components';
import { faDownload } from '@fortawesome/pro-solid-svg-icons';
import RupeeOrNonRupee from '../../components/RupeeOrNonRupee/RupeeOrNonRupee';
import { authorizeModule } from '../../utils/utils';
import { CONSTANTS } from '../../constants/constants';

const OpporOverviewDetailsModal = ({
	visible,
	onClose,
	title,
	getData,
	data,
	mode,
	authorizeCode
}) => {
	const miniComponentData = {
		getData: getData,
		tableData: data ? (mode === 'chart' ? data.opportunity : data) : []
	};

	const TopBand = ({ data }) => {
		const TopBandContainer = styled(Row)`
			background: #f0f2fb;
			width: 100%;
			height: 100px;
			border-radius: 8px;
			margin: ${(props) => props.margin || '0px'};
		`;
		const TopBandCol = styled(Col)`
			height: 100%;
			top: 50%;
			transform: translateY(-35%);
		`;
		const Metrics = styled(Row)`
			font-family: Open Sans;
			font-weight: 600;
			font-size: ${(props) => props.fontSize || '28px'};
			line-height: 49px;
			text-align: center;
			color: ${(props) => props.color || '#222747'};
			transform: ${(props) => props.transform};
		`;
		const Text = styled(Row)`
			/* width: 100%; */
			position: ${(props) => props.position};
			left: ${(props) => props.left};
			transform: ${(props) => props.transform};
			font-family: Open Sans;
			font-size: ${(props) => props.fontSize || '18px'};
			line-height: 20px;
			color: #696a91;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: unset;
		`;
		const TopBandElement = ({ data, mode, position }) => (
			<TopBandContainer
				// margin={position === "left" ? "0 10px 0 0" : " 0 0 0 10px"}
				align='middle'
				justify='space-around'
			>
				<TopBandCol span={8}>
					{/* <div> */}
					<Metrics justify='center'>
						{data &&
							(mode === 'count' ? (
								data.totaloppor
							) : (
								<>
									{data?.currencySymbol} <RupeeOrNonRupee amount={data.targetAmount} />
								</>
							))}
					</Metrics>
					<Text position='absolute' transform='translateX(-50%)' left='50%'>
						{mode === 'count' ? 'Count' : 'Value'}
					</Text>
					{/* </div> */}
				</TopBandCol>
				<TopBandCol span={8}>
					<Row align='middle' justify='space-between' style={{ width: '100%' }}>
						<Col span={12}>
							<Metrics
								fontSize='110%'
								transform='scale(1, 1.5);'
								color={() => {
									let returnColor = '#222747';
									switch (title) {
										case 'Moved Up':
											mode === 'count'
												? data.topBandOpporCount > 0
													? (returnColor = '#56B8BE')
													: (returnColor = '#BE5C56')
												: data.topBandTargetamountPer > 0
												? (returnColor = '#56B8BE')
												: (returnColor = '#BE5C56');
											break;
										case 'Moved Down':
											mode === 'count'
												? data.topBandOpporCount > 0
													? (returnColor = '#BE5C56')
													: (returnColor = '#56B8BE')
												: data.topBandTargetamountPer > 0
												? (returnColor = '#BE5C56')
												: (returnColor = '#56B8BE');
											break;
										case 'Due Now':
											mode === 'count'
												? data.topBandOpporCount > 0
													? (returnColor = '#56B8BE')
													: (returnColor = '#BE5C56')
												: data.topBandTargetamountPer > 0
												? (returnColor = '#56B8BE')
												: (returnColor = '#BE5C56');
											break;
										case 'Near Closure':
											mode === 'count'
												? data.topBandOpporCount > 0
													? (returnColor = '#56B8BE')
													: (returnColor = '#BE5C56')
												: data.topBandTargetamountPer > 0
												? (returnColor = '#56B8BE')
												: (returnColor = '#BE5C56');
											break;
										case 'Missed Due Date':
											mode === 'count'
												? data.topBandOpporCount > 0
													? (returnColor = '#BE5C56')
													: (returnColor = '#56B8BE')
												: data.topBandTargetamountPer > 0
												? (returnColor = '#BE5C56')
												: (returnColor = '#56B8BE');
											break;
										default:
											break;
									}
									return returnColor;
								}}
							>
								{`${
									mode === 'count'
										? data.topBandOpporCount > 0
											? `+${
													data.topBandOpporCount % 1 !== 0
														? data.topBandOpporCount.toFixed(2)
														: data.topBandOpporCount
											  }`
											: `${
													data.topBandOpporCount % 1 !== 0
														? data.topBandOpporCount.toFixed(2)
														: data.topBandOpporCount
											  }`
										: data.topBandTargetamountPer !== null
										? data.topBandTargetamountPer > 0
											? `+${
													data.topBandTargetamountPer % 1 !== 0
														? data.topBandTargetamountPer.toFixed(2)
														: data.topBandTargetamountPer
											  }`
											: `${
													data.topBandTargetamountPer % 1 !== 0
														? data.topBandTargetamountPer.toFixed(2)
														: data.topBandTargetamountPer
											  }`
										: ''
								}`}
								{mode === 'count'
									? data.topBandOpporCount && data.topBandOpporCount !== null
										? '%'
										: null
									: data.topBandTargetamountPer && data.topBandTargetamountPer !== null
									? '%'
									: null}
							</Metrics>
						</Col>
						<Col span={12}>
							<Text fontSize='14px'>Since</Text>
							<Text fontSize='14px'>{data.month}</Text>
						</Col>
					</Row>
					<Text>Performance</Text>
				</TopBandCol>
			</TopBandContainer>
		);
		return (
			<ScRow align='middle' justify='space-between' margin='0 0 24px 0'>
				<Col span={11}>
					<TopBandElement data={data} mode='count' position='left' />
				</Col>
				<Col span={11}>
					<TopBandElement data={data} mode='value' position='right' />
				</Col>
			</ScRow>
		);
	};
	const downloadRecords = () => {
		const downloadData =
			miniComponentData &&
			miniComponentData.tableData &&
			miniComponentData.tableData.length > 0 &&
			miniComponentData.tableData.map((opp, index) => ({
				'Sr.No': index + 1,
				Opportunity: opp.opportunityName,
				Currency: opp.currencySymbol,
				Target: opp.targetAmount,
				'Due Date': moment(opp.dueDate).format('DD-MMM-YYYY'),
				Stage: opp.stage,
				'Client/Prospect Name': opp.clientProspectName,
				Type: opp.refType === 'PROSPECTADD' ? 'Prospect' : 'Client'
			}));
		if (downloadData) {
			exportJSON(downloadData, title);
		}
	};
	const downLoadAuth = authorizeModule(authorizeCode, CONSTANTS.authorizeCode.download);
	return (
		<ScModal
			visible={visible}
			onCancel={onClose}
			title={title}
			footer={null}
			width='70vw'
			// height="75vh"
			borderRadius='16px'
			centered
		>
			{mode === 'chart' && <TopBand data={data} />}
			<ScScrollableDiv
				height={mode === 'chart' ? '364px' : '90%'}
				maxHeight='500px'
				margin='0 0 48px 0'
			>
				{miniComponentData.tableData &&
				Array.isArray(miniComponentData.tableData) &&
				miniComponentData.tableData.length > 0 ? (
					<OpportunityListingScreen miniComponentData={miniComponentData} miniMode={true} />
				) : (
					'No Record Found'
				)}
			</ScScrollableDiv>

			<ScButtonText
				type='text'
				margin='18px 0 0 auto'
				padding='4px 15px'
				position='absolute'
				bottom='20px'
				right='0px'
				left='auto'
				color='#354081'
				onClick={() => {
					downLoadAuth && downloadRecords();
				}}
			>
				{downLoadAuth && <FontAwesomeIcon icon={faDownload} />}
				&nbsp;&nbsp;{downLoadAuth ? 'Download report' : ''}
			</ScButtonText>
		</ScModal>
	);
};

export default OpporOverviewDetailsModal;
