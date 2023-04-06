import React, { useRef, useEffect } from 'react';
import './Canvas.scss';

const Canvas = (props) => {
	const canvasRef = useRef(null);
	const { draw, each, tasks, minMax } = props;

	useEffect(() => {
		const canvas = canvasRef.current;
		const context = canvas.getContext('2d');
		//Our draw came here
		draw(context, 'red', canvas, tasks[each]);
	}, [draw, minMax]);

	return (
		<div className='canvas'>
			<canvas ref={canvasRef} {...props} width='80vw' height='65' />
			<span className='title'>{each}</span>
		</div>
	);
};

export default Canvas;
