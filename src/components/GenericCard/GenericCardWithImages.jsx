import { useState } from 'react';
import { Card, Carousel } from 'antd';
import { theme } from '../../theme';
// import ReactPlayer from "react-player";

const GenericCardWithTabs = ({ children, imgPath, actionHandler, detailData, types, viewType }) => {
	const styles = {
		cardStyle: {
			borderRadius: '8px',
			border: viewType == 'cardView' ? '1px solid rgb(203, 214, 255)' : 'none',
			height: viewType == 'cardView' ? '250px' : ''
			// background: 'blue'
		},
		coverStyle: {
			borderRadius: '8px 8px 0 0',
			height: viewType == 'cardView' ? '250px' : '300px',
			width: '100%'
		}
	};
	const contentStyle = {
		borderRadius: '8px 8px 0 0',
		height: '250px',
		color: '#fff',
		lineHeight: '160px',
		textAlign: 'center',
		background: '#364d79'
	};

	// const singleImg = ()

	const videoLink = 'https://www.youtube.com/watch?v=bvn_HYpix6s';

	const imgTypes = () => {
		switch (types) {
			// case 1: return (slider());
			case 2:
				return image();
			// case 3: return (video());
			default:
				break;
		}
	};

	const image = () => {
		return <img alt='example' style={styles.coverStyle} src={imgPath} />;
	};

	// const video = () => {
	//     return (<video src={videoLink} style={styles.coverStyle} controls />);
	// }

	// const slider = () => {
	//     let multipleImgs = [];
	//     for (let i = 0; i < 6; i++) {
	//         // multipleImgs.push(<div><h3 style={contentStyle}>{i}</h3></div>);
	//         multipleImgs.push(<div><img alt="example" style={styles.coverStyle} src={imgPath} /></div>);
	//     }
	//     return (
	//         <Carousel autoplay>{multipleImgs}</Carousel>
	//     )
	// }

	return (
		<Card
			onClick={() => {
				actionHandler(detailData);
			}}
			// cover={<img alt="example" style={styles.coverStyle} src={imgPath} />}
			cover={imgTypes()}
			style={styles.cardStyle}
		>
			{children}
		</Card>
	);
};

export default GenericCardWithTabs;
