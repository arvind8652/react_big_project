import { React, useEffect, useState, useRef } from 'react';
import { Button, Card, Col, Row, Typography, Divider, Space } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fetchAsset } from '../../utils/utils';
import { faPlus } from '@fortawesome/pro-light-svg-icons';
import { getDateFormat } from '../../utils/utils';
import moment from 'moment';

import { palette } from '../../theme';

const { Text, Link, Title } = Typography;
const AttachmentPanel = ({ attachmentPanel }) => {
	const [addAttachmentModalVisible, setAddAttachmentModalVisible] = useState(false);
	const styleSet = {
		attachmentBlock: {
			color: palette.secondary.light
		}
	};
	const [opportunityUpdateModalVisible, setOpportunityUpdateModalVisible] = useState(false);

	const TextSub = (props) => (
		<div>
			<Space>
				{props.flag && (
					<img
						src={fetchAsset('countryFlags', props.flag)}
						alt={props.text}
						className='opportunityViewFlagIcon'
					/>
				)}
				{props.symbol && (
					<img
						src={fetchAsset('currencySymbols', props.symbol)}
						alt={props.text}
						className='opportunityViewFlagIcon'
					/>
				)}
				<Text>
					<span className='opportunityDetailText' style={{ color: '#696a91' }}>
						{props.text}
					</span>
				</Text>
			</Space>
			<br />
			<Row justify='space-between'>
				<Text style={{ color: '#2c2d33' }}>
					<span className='opportunityDescriptionText'> {props.subtext}</span>
				</Text>
				<Text style={{ color: '#2c2d33' }}>
					<span className='opportunityDescriptionText'>
						{props.endsubtext ? props.endsubtext : ''}
					</span>
				</Text>
			</Row>
		</div>
	);

	return (
		<>
			<Card>
				<Space direction='vertical' style={{ width: '100%' }} size={5}>
					<Row>
						<Col span={8}>
							<TextSub text={attachmentPanel.status} subtext='Status' />
						</Col>
						<Col span={8}>
							{/* <TextSub text={attachmentPanel.data.stage} subtext="Stage" /> */}
						</Col>
						<Col span={8}>
							<Row justify='space-between'>
								<TextSub text={attachmentPanel.probability} subtext='Probability' />
								{attachmentPanel.status === 'OPEN' && (
									<Button
										style={{
											paddingInline: '30px',
											borderRadius: '8px',
											color: '#47518B',
											borderColor: '#47518B'
										}}
										onClick={() => setOpportunityUpdateModalVisible(true)}
										size='middle'
									>
										Update
									</Button>
								)}
							</Row>
						</Col>
					</Row>
					<Divider />
					<Row>
						<Col span={8}>
							<TextSub text={attachmentPanel.opportunityName} subtext='Opportunity Name' />
						</Col>
						<Col span={8}>
							<TextSub text={attachmentPanel.opportunityType} subtext='Opportunity Type' />
						</Col>
						<Col span={8}>
							<TextSub text={attachmentPanel.product} subtext='Product / Service' />
						</Col>
						<Col span={8} style={{ marginTop: '22px' }}>
							{attachmentPanel.status === 'OPEN' ? (
								<TextSub
									text={
										attachmentPanel.currencySymbol === null && attachmentPanel.currencySymbol === ''
											? attachmentPanel.currencySymbol + attachmentPanel.targetAmount
											: attachmentPanel.targetAmount
									}
									subtext='Target Amount'
								/>
							) : attachmentPanel.status === 'CLOSED' ? (
								<TextSub
									text={
										attachmentPanel.currencySymbol === null && attachmentPanel.currencySymbol === ''
											? attachmentPanel.currencySymbol + attachmentPanel.closureAmount
											: attachmentPanel.closureAmount
									}
									subtext='Closure Amount'
								/>
							) : (
								<TextSub
									text={
										attachmentPanel.currencySymbol === null && attachmentPanel.currencySymbol === ''
											? attachmentPanel.currencySymbol + attachmentPanel.targetAmount
											: attachmentPanel.targetAmount
									}
									subtext='Target Amount'
								/>
							)}
						</Col>
						<Col span={8} style={{ marginTop: '22px' }}>
							{attachmentPanel.status === 'OPEN' ? (
								<TextSub
									text={moment(attachmentPanel.expectedDate).format(getDateFormat())}
									subtext='Expected date'
								/>
							) : attachmentPanel.status === 'CLOSED' ? (
								<TextSub
									text={moment(attachmentPanel.closureDate).format(getDateFormat())}
									subtext='Closure date'
								/>
							) : (
								<TextSub
									text={moment(attachmentPanel.expectedDate).format(getDateFormat())}
									subtext='Expected date'
								/>
							)}
						</Col>
						<Col span={8} style={{ marginTop: '22px' }}>
							<TextSub
								flag={attachmentPanel.countryCode}
								text={attachmentPanel.currency}
								subtext='Currency'
							/>
						</Col>
						<Col span={12} style={{ marginTop: '22px' }}>
							<TextSub
								text={attachmentPanel.remarks}
								subtext='Remarks'
								endsubtext={
									attachmentPanel.lastUpdate && `Last Update: ${attachmentPanel.lastUpdate}`
								}
							/>
						</Col>
					</Row>
					<br />
					<Row>
						<Col span={8}>
							<TextSub text={attachmentPanel.relationshipManager} subtext='Relationship Manager' />
						</Col>
						<Col span={8}>
							<TextSub text={attachmentPanel.branchName} subtext='Branch' />
						</Col>
						<Col span={8}>
							<TextSub
								text={moment(attachmentPanel.creationDate).format(getDateFormat())}
								subtext='Created'
							/>
						</Col>
					</Row>
				</Space>
				{/* <RenderOpportunityDetailUpdateModal
                    modal={opportunityUpdateModalVisible}
                    setfn={(val) => setOpportunityUpdateModalVisible(val)}
                    opportunityStageList={attachmentPanel.opportunityStageList}
                    onUpdateView={attachmentPanel.onUpdateView}
                    attachmentPanel={attachmentPanel}
                    opportunityViewRules={attachmentPanel.opportunityViewRules}
                    fullControlStructure={attachmentPanel.fullControlStructure}
                    controlStructure={attachmentPanel.controlStructure}
                /> */}
			</Card>
		</>
	);
};
export default AttachmentPanel;
