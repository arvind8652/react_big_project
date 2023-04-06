import { Space, Typography } from 'antd';
import { fetchAsset } from '../../../utils/utils';
import './TextSubText.scss';
const { Text, Link } = Typography;
const availableFlagList = ['IN', 'MY', 'PH', 'US', '01'];

const TextSubText = (props) => {
	return (
		<Space direction='vertical' size={0}>
			<Space size='small'>
				{/* {props.flag && ( 
           <img 
            className="flagIcon"
            src={fetchAsset("countryFlags", props.flag)}
             alt={props.text}
             style={{ width: "15px", height: "15px", marginRight: "5px" }}
           />
         )} */}
				{props.flag &&
					(availableFlagList.includes(props.flag) ? (
						<img
							src={fetchAsset('countryFlags', props.flag)}
							alt={props.text}
							// className="leadViewFlagIcon"
							// style={{ width: '15px', height: '15px', marginRight: '5px' }}
							style={{
								width: '100%',
								maxWidth: '60px',
								height: 'auto',
								maxHeight: '15px',
								marginRight: '5px'
							}}
						/>
					) : (
						<img
							src={fetchAsset('countryFlags', 'DEFAULT')}
							alt={props.text}
							// className="leadViewFlagIcon"
							// style={{ width: '15px', height: '15px', marginRight: '5px' }}
							style={{
								width: '100%',
								maxWidth: '60px',
								height: 'auto',
								maxHeight: '40px',
								marginRight: '5px'
							}}
						/>
					))}
				{props.icon && props.icon}
				{props.link ? (
					<Link
						href={props.link.replace('@', '')}
						target='_blank'
						rel='noreferrer noopener'
						// style={{ fontSize: "16px" }}
						className='bodyDetailIcon'
					>
						{props.text}
					</Link>
				) : (
					<Text
						className='detailText'
						// style={{ fontSize: "16px", color: "#2C2D33" }}
					>
						{props.text} {props.iconNext} {props.iconNextAfter}
					</Text>
				)}
			</Space>
			{props.subtext && (
				<Text
					className='descriptionText'
					// style={{ fontSize: "14px", color: "#696A91" }}
				>
					{props.subtext}
				</Text>
			)}
		</Space>
	);
};

export default TextSubText;
