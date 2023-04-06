import { Button } from 'antd';
import { ScButtonText } from '../StyledComponents/genericElements';
import './HeldAwayInvestment.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faChartLine,
	faChartLineDown,
	faPlus,
	faSackDollar
} from '@fortawesome/pro-light-svg-icons';

const HeldAwayInvestment = ({
	plottingField,
	setPlottingField,
	highBtnText,
	lowBtnText,
	increaseBtnText,
	decreaseBtnText,
	highBtnMapping,
	lowBtnMapping,
	increaseBtnMapping,
	decreaseBtnMapping
}) => {
	return (
		<div className='plot-attribute-selector'>
			{/* <ScButtonText
        width="56px"
        type="text"
        className={`buttonlink right ${
          plottingField === highBtnMapping && "active"
        }`}
        onClick={(e) => {
          setPlottingField(highBtnMapping);
        }}
      >
        {highBtnText || "High"}
      </ScButtonText> */}
			<Button
				onClick={(e) => {
					setPlottingField(highBtnMapping);
				}}
				width='56px'
				className={`buttonlink right ${plottingField === highBtnMapping && 'active'}`}
			>
				<FontAwesomeIcon icon={faSackDollar} style={{ marginRight: 8 }} />
				High
			</Button>

			<Button
				onClick={(e) => {
					setPlottingField(lowBtnMapping);
				}}
				width='56px'
				className={`buttonlink right ${plottingField === lowBtnMapping && 'active'}`}
			>
				<FontAwesomeIcon icon={faSackDollar} style={{ marginRight: 8 }} />
				Low
			</Button>

			<Button
				onClick={(e) => {
					setPlottingField(increaseBtnMapping);
				}}
				width='56px'
				className={`buttonlink right ${plottingField === increaseBtnMapping && 'active'}`}
			>
				<FontAwesomeIcon icon={faChartLine} style={{ marginRight: 8 }} />
				Increase
			</Button>

			<Button
				onClick={(e) => {
					setPlottingField(decreaseBtnMapping);
				}}
				width='56px'
				className={`buttonlink right ${plottingField === decreaseBtnMapping && 'active'}`}
			>
				<FontAwesomeIcon icon={faChartLineDown} style={{ marginRight: 8 }} />
				Decrease
			</Button>

			{/* <ScButtonText
        width="56px"
        type="text"
        className={`buttonlink right ${
          plottingField === lowBtnMapping && "active"
        }`}
        onClick={(e) => {
          setPlottingField(lowBtnMapping);
        }}
      >
        {lowBtnText || "Low"}
      </ScButtonText> */}
			{/* <ScButtonText
        width="56px"
        type="text"
        className={`buttonlink right ${
          plottingField === increaseBtnMapping && "active"
        }`}
        onClick={(e) => {
          setPlottingField(increaseBtnMapping);
        }}
      >
        {increaseBtnText || "Increase"}
      </ScButtonText> */}

			{/* <ScButtonText
        width="56px"
        type="text"
        className={`buttonlink right ${
          plottingField === decreaseBtnMapping && "active"
        }`}
        onClick={(e) => {
          setPlottingField(decreaseBtnMapping);
        }}
      >
        {decreaseBtnText || "Decrease"}
      </ScButtonText> */}
		</div>
	);
};

export default HeldAwayInvestment;
