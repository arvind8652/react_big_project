import { Card, Row, Col, Space } from 'antd';
import { palette } from '../../theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NumberFormat from '../../constants/NumberFormat';
import './FinancialPlanning.scss';
import { EditFilled, DeleteFilled } from '@ant-design/icons';

const FundCards = ({ data, authData, deleteCard = () => {}, editCard = () => {} }) => {
	const styleSets = (Case, Param) => {
		if (Case === 'Dot')
			return {
				backgroundColor: Param ? '#CD0000' : '#05BC6A',
				height: '34px',
				width: '34px',
				left: '0px',
				bottom: '5px',
				borderRadius: '100px'
			};
		else
			return {
				border: `1px solid ${palette.text.cardBrder}`,
				marginRight: '15px',
				marginLeft: '5px',
				borderBottomLeftRadius: Case === 'body' && '8px',
				borderBottomRightRadius: Case === 'body' && '8px',
				marginBottom: Case === 'body' && '15px',
				borderTopLeftRadius: Case === 'head' && '8px',
				borderTopRightRadius: Case === 'head' && '8px',
				backgroundColor: Case === 'head' && Param,
				color: Case === 'head' && '#FFFFFF',
				fontSize: Case === 'head' && '1.05em'
			};
	};

	return (
		<Row>
			{data.map((CardData, idx) => {
				return (
					<Col span={12} key={idx}>
						<Card
							className='removeBorderCard'
							bodyStyle={styleSets('body')}
							headStyle={styleSets('head', CardData.colorHexCode)}
							bordered={false}
							title={
								<Space>
									<FontAwesomeIcon icon={CardData.goalIcon} size='2x' />
									<div style={{ marginLeft: '10px' }}>
										{CardData.goalName} &nbsp; <br />{' '}
										{CardData.currencySymbol + NumberFormat(authData, CardData.targetCorpus)}
									</div>
								</Space>
							}
							extra={
								<>
									{CardData.recType === 'N' && (
										<EditFilled
											style={{ color: '#FFFFFF', fontSize: '20px' }}
											onClick={() => editCard(CardData.financialPlanningId)}
										/>
									)}
									<DeleteFilled
										style={{ color: '#FFFFFF', fontSize: '20px', marginLeft: '10px' }}
										onClick={() =>
											deleteCard(CardData.financialPlanningId, CardData.recType, CardData.goalName)
										}
									/>
								</>
							}
						>
							<Row>
								<Col style={styleSets('Dot', CardData.estimatedCorpus < CardData.targetCorpus)} />
								<Col span={1} />
								<Col span={14} style={{ fontWeight: 'bold', fontSize: '16px' }}>
									{CardData.estimatedCorpus < CardData.targetCorpus ? 'On Risk' : 'Achievable'}
								</Col>
								<Col span={7} style={{ fontWeight: 'bold', fontSize: '16px' }}>
									{CardData.targetDate}
								</Col>
							</Row>
							<Row>
								<Col
									offset={18}
									style={{
										marginBottom: '30px',
										color: '#898EA9',
										fontSize: '11px'
									}}
								>
									{CardData.remainingDuration}
								</Col>
							</Row>
							<Row>
								<Col span={6} style={{ color: '#898EA9' }}>
									Target Corpus
								</Col>
								<Col span={7} style={{ color: '#898EA9' }}>
									Estimated Corpus
								</Col>
								<Col span={5} style={{ color: '#898EA9' }}>
									{CardData.estimatedCorpus < CardData.targetCorpus ? 'Shortfall' : 'Excess'}
								</Col>
								<FontAwesomeIcon
									icon={
										CardData.estimatedCorpus < CardData.targetCorpus
											? 'fa-solid fa-arrow-down'
											: 'fa-solid fa-arrow-up'
									}
									size='2x'
									style={{
										color: CardData.estimatedCorpus < CardData.targetCorpus ? '#CD0000' : '#05BC6A'
									}}
								/>
								<Col span={4} style={{ marginLeft: '10px' }}>
									{CardData.estimatedCorpus < CardData.targetCorpus
										? NumberFormat(
												authData,
												(CardData.targetCorpus - CardData.estimatedCorpus) / CardData.targetCorpus
										  ) + '%'
										: NumberFormat(
												authData,
												(CardData.estimatedCorpus - CardData.targetCorpus) / CardData.targetCorpus
										  ) + '%'}
								</Col>
							</Row>
							<Row>
								<Col span={6}>
									{CardData.currencySymbol + NumberFormat(authData, CardData.targetCorpus)}
								</Col>
								<Col span={7}>
									{CardData.currencySymbol + NumberFormat(authData, CardData.estimatedCorpus)}
								</Col>
								<Col span={11}>
									{CardData.estimatedCorpus < CardData.targetCorpus
										? CardData.currencySymbol +
										  NumberFormat(authData, CardData.targetCorpus - CardData.estimatedCorpus)
										: CardData.currencySymbol +
										  NumberFormat(authData, CardData.estimatedCorpus - CardData.targetCorpus)}
								</Col>
							</Row>
						</Card>
					</Col>
				);
			})}
		</Row>
	);
};

export default FundCards;
