import React, { useState } from 'react';
import { Modal, Typography, Row, Col, Radio, Card, Space, Button, Form } from 'antd';
import { ScButtonPrimary } from '../../components/StyledComponents/genericElements';

const InteractionDetailCard = (props) => {
	return (
		<Col span={24}>
			<Card
				style={{
					marginInline: '10px',
					marginBottom: '4px'
				}}
			>
				<Radio
					style={{ width: '100%' }}
					value={props.value}
					onClick={(e) => {
						props.setSelectedRecordIndex(e.target.value);
					}}
				>
					<Space direction='vertical' style={{ width: '90%' }} size={1}>
						<Typography.Text
							ellipsis
							style={{ width: '192px', fontWeight: '600', fontSize: '18px' }}
						>
							{props.subject}
						</Typography.Text>

						<Typography.Text style={{ fontWeight: '600', fontSize: '14px' }}>
							{props.opportunityName}
						</Typography.Text>

						<Row justify='space-between'>
							<Typography.Text
								style={{
									fontWeight: '400',
									fontSize: '14px',
									color: '#96A91'
								}}
							>
								{props.priority}
							</Typography.Text>
							<Typography.Text
								style={{
									paddingInline: '12px',
									borderRadius: '12px',
									background: '#F0F2FB',
									color: '#696A91'
								}}
							>
								{props.activityPurposeName}
							</Typography.Text>
						</Row>
					</Space>
				</Radio>
			</Card>
		</Col>
	);
};

const ExistingInteractionModal = (props) => {
	const data = props.interactions;
	const [selectedRecordIndex, setSelectedRecordIndex] = useState();
	return (
		<>
			<Modal
				centered
				visible={props.visible}
				onCancel={props.onCancel}
				footer={null}
				className='update-stage-modal'
				width={445}
			>
				<Typography.Title level={3}>Existing Interactions</Typography.Title>
				{data === undefined || data.length == 0 ? (
					<Row style={{ height: '100px' }}>
						<Col>
							<h3>No existing Interactions</h3>
						</Col>
					</Row>
				) : (
					<Radio.Group
						style={{ width: '100%', overflowY: 'scroll' }}
						onChange={(e) => {
							console.log(e);
						}}
					>
						<Row style={{ height: '500px' }}>
							{data &&
								data.map((item, index) => (
									<InteractionDetailCard
										key={index}
										value={index}
										subject={item.subject}
										opportunityName={item.opportunityName}
										priority={item.priority}
										activityPurposeName={item.activityPurposeName}
										setSelectedRecordIndex={setSelectedRecordIndex}
									/>
								))}
						</Row>
					</Radio.Group>
				)}
				<Row justify='end' style={{ marginTop: '10px' }}>
					<Button type='text' onClick={props.onClose}>
						Cancel
					</Button>
					<ScButtonPrimary
						htmlType='submit'
						// style={{ marginLeft: "10px" }}
						onClick={() => {
							props.onFinish(selectedRecordIndex);
							props.onClose();
						}}
						disabled={!selectedRecordIndex}
					>
						Save
					</ScButtonPrimary>
				</Row>
			</Modal>
		</>
	);
};
export default ExistingInteractionModal;
