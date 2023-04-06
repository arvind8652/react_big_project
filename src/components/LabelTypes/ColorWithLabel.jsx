import { Col, Row } from 'antd';
import React, { Children } from 'react';

const ColorWithLabel = ({ color = '#bbb', label = '' }) => {
	const styleSet = {
		body: {
			// textAlign: 'center',
			display: 'flex',
			marginTop: '5px'
		},
		textStyle: {
			height: '20px',
			width: '20px',
			backgroundColor: color,
			borderRadius: '50%',
			display: 'inline-block',
			marginRight: '10px'
		}
	};

	return (
		<Row>
			<div style={styleSet.body}>
				<span style={styleSet.textStyle} />

				{label}
			</div>
		</Row>
	);
};
export default ColorWithLabel;
