// import { Card, Col, Divider, Form, Radio, Row, Space, Typography, Button } from 'antd';
import { ScButtonPrimary, ScButtonText, ScModal } from '../StyledComponents/genericElements';
import QuestionAnswerSection from '../../components/Forms/RiskProfileFormCard/QuestionAnswerSection';
import { calculateScore } from '../../api/customerCreateApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/pro-regular-svg-icons';

const RiskProfileModal = ({
	showQueAnsModal,
	setShowQueAnsModal,
	qaList,
	selectedAnswer,
	setSelectedAnswer,
	riskProfileData,
	setRiskProfileSecondScreenData,
	setModal2Visibility,
	backArrow = () => {},
	setPageId = () => {}
}) => {
	const onSubmit = async () => {
		await calculateScore(selectedAnswer, riskProfileData).then((res) =>
			setRiskProfileSecondScreenData({ ...res.data, lstQuestionsAnswers: selectedAnswer })
		);
		setModal2Visibility(true);
		setShowQueAnsModal(false);
		// await setPageId(3);
	};

	return (
		<ScModal
			// title='Risk Profiling'
			title={
				<>
					<FontAwesomeIcon icon={faChevronLeft} onClick={() => backArrow('RiskProfileModal')} />
					&nbsp;
					{'Risk Profiling'}
				</>
			}
			visible={showQueAnsModal}
			footer={[
				<ScButtonText
					type='text'
					key='back'
					onClick={() => {
						setShowQueAnsModal(false);
					}}
				>
					Cancel
				</ScButtonText>,
				<ScButtonPrimary
					htmlType='submit'
					key='submit'
					// disabled={
					// 	questionAnswerList?.lstQuestionsAnswers?.length == selectedAnswer.length ? false : true
					// }
					type='primary'
					onClick={() => {
						onSubmit();
						// setCheckRetake(true);
					}}
				>
					Submit
				</ScButtonPrimary>
			]}
			width='75vw'
			centered
			onCancel={() => {
				setShowQueAnsModal((prev) => !prev);
				setPageId(0);
			}}
			closable={true}
		>
			{qaList?.map((item, idx) => (
				<QuestionAnswerSection
					{...item}
					idx={idx}
					setSelectedAnswer={setSelectedAnswer}
					selectedAnswer={selectedAnswer}
					key={idx}
				/>
			))}
		</ScModal>
	);
};

export default RiskProfileModal;
