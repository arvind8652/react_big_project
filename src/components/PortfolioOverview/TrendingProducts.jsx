import React, { useState } from 'react';
import { Row, Col, Button, Modal } from 'antd';
import { useHistory } from 'react-router-dom';
import 'antd/dist/antd.css';
import GenericCard from '../../components/GenericCard/GenericCard';
import TrendingProductsList from './TrendingProductList';
import DemoModal from './DemoModal';

const TrendingProducts = ({ list }) => {
	const feedsStyle = {
		button: {
			borderRadius: '8px',
			width: 'max-content',
			float: 'right',
			background: '#354081',
			color: '#FFFFFF'
		}
	};
	const history = useHistory();

	const showModal = () => {
		history.push('/dashboard/RM/ExploreProducts');
	};

	return (
		<>
			<GenericCard header={'Trending Products'}>
				<TrendingProductsList trendingData={list} />
				<Button size={'large'} style={feedsStyle.button} onClick={showModal}>
					Explore
				</Button>
			</GenericCard>
		</>
	);
};

export default TrendingProducts;
