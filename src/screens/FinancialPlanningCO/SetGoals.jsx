import { Col, Row, Select } from 'antd';
import CustomModal from '../../components/Modal/CustomModal/CustomModal';
import './FinancialPlanning.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FormItem from 'antd/lib/form/FormItem';
import { useState } from 'react';
import { faChevronLeft } from '@fortawesome/pro-regular-svg-icons';

const SetGoals = ({
	setShowModal,
	showModal,
	goalNamesList,
	setGoalName,
	setGoalType,
	goalName,
	setRetirementPlanning,
	backArrow = () => {}
}) => {
	const [customGoal, setCustomGoal] = useState(false);
	return (
		<>
			<div>
				<CustomModal
					title={
						<>
							<FontAwesomeIcon icon={faChevronLeft} onClick={() => backArrow('SetGoals')} />
							&nbsp;
							{'Select Goals'}
						</>
					}
					visible={showModal}
					handleCancel={() => {
						setShowModal(false);
						setCustomGoal(false);
					}}
					closable={true}
					width='57vw'
					destroyOnClose={true}
				>
					<Row>
						{goalNamesList?.lookupValue?.lookUpValues.map((item, idx) => {
							return (
								<Col span={12} key={idx}>
									<div
										className='setGoalBlock'
										onClick={() => {
											setGoalName(item?.GoalName);
											setGoalType(item?.GoalType);
											if (item?.GoalName === 'Custom Goal') {
												setCustomGoal(true);
												setShowModal(true);
											} else {
												setRetirementPlanning(true);
												setShowModal(false);
												setCustomGoal(false);
											}
										}}
									>
										<div className='setGoalbtn'>
											{/* <FontAwesomeIcon icon={item?.Goal_Icon} /> */}
											<FontAwesomeIcon icon=' fa-solid fa-hand-holding-usd' />
											{'       '}
											{item?.GoalName}
										</div>
									</div>
								</Col>
							);
						})}
					</Row>
					<Row>
						{customGoal != false && goalName == 'Custom Goal' && (
							<FormItem className='dropdownbtn'>
								<Select
									size='large'
									placeholder='Select Custom Goal'
									options={
										goalNamesList &&
										goalNamesList?.lookupValue?.lookUpValues.map((item, idx) => ({
											key: idx,
											label: item.GoalName,
											value: `${item.GoalName}_${item.GoalType}`
										}))
									}
									onSelect={(item) => {
										const data = item.split('_');
										setGoalName(data[0]);
										setGoalType(data[1]);
										setShowModal(false);
										setRetirementPlanning(true);
									}}
								></Select>
							</FormItem>
						)}
					</Row>
				</CustomModal>
			</div>
		</>
	);
};

export default SetGoals;
