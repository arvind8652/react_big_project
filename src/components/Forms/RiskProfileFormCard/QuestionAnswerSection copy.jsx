import { useEffect, useRef, useState } from 'react';
import { Divider, Radio, Space, Form, Checkbox } from 'antd';

const QuestionAnswerSection = ({
	questionDesc,
	lstAnswers,
	idx,
	questionID,
	questionType,
	setSelectedAnswer,
	selectedAnswer,
	sophisticatedMinAns = null,
	ipsDescriptionName = null,
	issubsetquestions = null,
	ipsDescription = null
}) => {
	const { Item } = Form;
	const [selectedValue, setSelectedValue] = useState('');
	const [checkboxValue, setCheckboxValue] = useState('');
	const onRadioChange = (evt, sophisticatedYn = null, AnswerDesc, AnswerID, Score) => {
		evt.stopPropagation();
		setSelectedValue(evt?.target?.value);
		setSelectedAnswer((prev) => {
			const singleAnswer = {
				questionID: questionID,
				questionDesc: questionDesc,
				questionType: questionType,
				sophisticatedMinAns: sophisticatedMinAns,
				ipsDescriptionName: ipsDescriptionName,
				ipsDescription: ipsDescription,
				issubsetquestions: issubsetquestions,
				lstAnswers: [
					{
						answerDesc: AnswerDesc,
						answerID: AnswerID,
						score: Score,
						sophisticatedYn: sophisticatedYn
					}
				]
			};
			const newPrev = [...prev];
			newPrev[idx] = singleAnswer;
			return newPrev;
		});
	};

	const onCheckboxChange = (evt, sophisticatedYn = null, AnswerDesc, AnswerID, Score) => {
		evt.stopPropagation();
		if (evt?.target?.checked) {
			setCheckboxValue([...checkboxValue, evt?.target?.value]);
			setSelectedAnswer((prev) => {
				let newPrev = [...prev];
				const newLstAnswers = newPrev[idx]?.lstAnswers || [];
				const singleAnswer = {
					questionID: questionID,
					questionDesc: questionDesc,
					questionType: questionType,
					sophisticatedMinAns: sophisticatedMinAns,
					ipsDescriptionName: ipsDescriptionName,
					ipsDescription: ipsDescription,
					issubsetquestions: issubsetquestions,
					lstAnswers: [
						...newLstAnswers,
						{
							answerDesc: AnswerDesc,
							answerID: AnswerID,
							score: Score,
							sophisticatedYn: sophisticatedYn
						}
					]
				};
				newPrev[idx] = singleAnswer;
				return newPrev;
			});
		} else {
			console.log('check uncheck value---target value------', evt?.target?.value);
			console.log('check uncheck value- checkboxvalue--------', checkboxValue);
			console.log('check uncheck value- AnswerID--------', AnswerID);
			let index = checkboxValue?.indexOf(evt?.target?.value);
			checkboxValue?.splice(index, 1);
			setSelectedAnswer((prev) => {
				console.log('check prev datataata------------', prev);

				let newPrev = [...prev]?.filter((item) => item !== undefined && item !== null);
				let newLstAnswer = [];
				console.log('check newPrev datataata------------', newPrev);
				if (newPrev) {
					if (newPrev[idx]) {
						console.log('check new prev-- idx----', newPrev[idx]);
						if (newPrev[idx]?.lstAnswers) {
							console.log('check new prev------', newPrev[idx]?.lstAnswers);
							newLstAnswer = newPrev[idx]?.lstAnswers?.filter((e) => e?.answerID !== AnswerID);
						}
					}
				}
				console.log('newLstAnswer-------------', newLstAnswer);

				let singleAnswer = {
					questionID: questionID,
					questionDesc: questionDesc,
					questionType: questionType,
					lstAnswers: newLstAnswer,
					sophisticatedMinAns: sophisticatedMinAns,
					ipsDescriptionName: ipsDescriptionName,
					ipsDescription: ipsDescription,
					issubsetquestions: issubsetquestions
				};
				if (newLstAnswer?.length === 0) {
					newPrev?.splice(
						newPrev?.findIndex((a) => a?.questionID === singleAnswer?.questionID),
						1
					);
				}
				console.log('singleAnswer-------------', singleAnswer);

				newPrev[idx] = singleAnswer;
				console.log('newPrev[idx]-------------', newPrev[idx]);

				newPrev = newPrev?.filter((e) => e?.lstAnswers?.length > 0);
				// newPrev = newPrev?.filter((e) => {
				// 	singleAnswer?.lstAnswers?.length > 0 && e?.lstAnswers?.length > 0;
				// });
				console.log('newPrev-------------', newPrev);

				return newPrev;
			});
		}
	};
	useEffect(() => {
		if (selectedAnswer?.length === 0) {
			setSelectedValue('');
			setCheckboxValue('');
		}
	});
	return (
		<Item name={questionID}>
			{idx != 0 ? <Divider /> : ''}
			<p className='rp-questions mg-tp'>
				{idx + 1}. {questionDesc}
			</p>
			{questionType === 'S' ? (
				<Radio.Group
					defaultValue={lstAnswers[0]?.score}
					style={{ paddingLeft: '12px' }}
					value={selectedValue}
				>
					<Space direction='vertical'>
						{lstAnswers?.map((item, idx) => (
							<Radio
								key={idx}
								value={item?.answerID}
								onChange={(evt) =>
									onRadioChange(
										evt,
										item?.sophisticatedYn,
										item?.answerDesc,
										item?.answerID,
										item?.score
									)
								}
							>
								{item?.answerDesc}
							</Radio>
						))}
					</Space>
				</Radio.Group>
			) : (
				<Checkbox.Group value={checkboxValue}>
					<Space style={{ paddingLeft: '12px' }} direction='vertical'>
						{lstAnswers?.map((item, idx) => (
							<Checkbox
								key={idx}
								onChange={(evt) =>
									onCheckboxChange(
										evt,
										item?.sophisticatedYn,
										item?.answerDesc,
										item?.answerID,
										item?.score
									)
								}
								value={item?.answerID}
							>
								{item?.answerDesc}
							</Checkbox>
						))}
					</Space>
				</Checkbox.Group>
			)}
		</Item>
	);
};

export default QuestionAnswerSection;
