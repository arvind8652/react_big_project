import { Button } from 'antd';
import { ScButtonText } from '../StyledComponents/genericElements';
import './PlottingAttributeSelector.scss';

const PlottingAttributeSelector = ({
	plottingField,
	setPlottingField,
	valueBtnText,
	countBtnText,
	valueBtnMapping,
	countBtnMapping
}) => {
	return (
		<div className='plot-attribute-selector'>
			<Button
				type='text'
				className={`option left ${plottingField === valueBtnMapping && 'active'}`}
				onClick={(e) => {
					setPlottingField(valueBtnMapping);
				}}
			>
				{valueBtnText || 'Value'}
			</Button>
			<ScButtonText
				// width="56px"
				type='text'
				className={`option right ${plottingField === countBtnMapping && 'active'}`}
				onClick={(e) => {
					setPlottingField(countBtnMapping);
				}}
			>
				{countBtnText || 'Count'}
			</ScButtonText>
		</div>
	);
};

export default PlottingAttributeSelector;
