import { theme } from '../../theme';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Card, Row, Col, Radio, Typography } from 'antd';
import { ProspectUserDetails } from './ProspectUserDetails';
import GenericBadge from '../GenericBadge/GenericBadge';
import { uniqueByKey } from './TopbarUtils';
import { NoDataFound } from './NoDataFound';

export const Product = ({ productList = [], showFilter = false, allowScroll = false }) => {
	const [filterArray, setFilterArray] = useState([]);
	const [tabValue, setTabValue] = useState('All');
	const [productFilterList, setProductFilterList] = useState(productList);

	useEffect(() => {
		let result = uniqueByKey(productList, 'assetType');
		setFilterArray(result);
		setProductFilterList(productList);
	}, [productList]);

	const changeTabPosition = (e) => {
		setTabValue(e.target.value);
		if (e.target.value === 'All') {
			setProductFilterList(productList);
		} else {
			setProductFilterList(productList.filter((item) => item.assetType === e.target.value));
		}
	};

	const ProductWrapper = () => {
		return productFilterList.length > 0 ? <ProductCardView /> : <NoDataFound name={'Products'} />;
	};

	const ProductCardView = () => {
		return productFilterList.map((ele) => {
			return (
				<Row style={{ marginBottom: '10px' }}>
					<Col span={24}>
						<Card style={{ borderRadius: '12px' }}>
							<Row>
								<Col style={{ marginRight: '5%' }}>
									<Row style={theme.profileTag}>
										<ProspectUserDetails ProspectUserDetails={ele} />
									</Row>
								</Col>
								<Col style={{ marginRight: '5%' }}>
									<Row style={theme.profileTopName}>
										<GenericBadge
											badgeBody={
												<Typography.Text
													ellipsis={{ tooltip: [ele.assetType] }}
													style={{
														width: '120px',
														marginLeft: '5px'
													}}
												>
													{ele.assetType}
												</Typography.Text>
											}
										/>
									</Row>
									<Row style={theme.profileTag}>
										<span style={{ marginLeft: '5%' }}>{ele.assetGroup}</span>
									</Row>
								</Col>
								<Col style={{ marginRight: '5%' }}>
									<Row style={theme.profileTopName}>{ele.mfCategory}</Row>
									<Row style={theme.profileTag}>{'Category'}</Row>
								</Col>
								<Col style={{ marginRight: '5%' }}>
									<Row style={theme.profileTopName}>{ele.mfClassification}</Row>
									<Row style={theme.profileTag}>{'Plan/Class'}</Row>
								</Col>
								<Col style={{ marginRight: '5%' }}>
									<Row style={theme.profileTopName}>{`${ele.securityReturn}%`}</Row>
									<Row style={theme.profileTag}>{'Return'}</Row>
								</Col>
								<Col style={{ marginRight: '5%' }}>
									<Row style={theme.profileTopName}>
										{moment(ele.lastUpdatedDate).format('DD-MM-YYYY')}
									</Row>
									<Row style={theme.profileTag}>{'Last Update'}</Row>
								</Col>
								<Col style={{ marginRight: '5%' }}>
									<Row style={theme.profileTopName}>{ele.price}</Row>
									<Row style={theme.profileSubText}>{ele.priceDifference}</Row>
								</Col>
							</Row>
						</Card>
					</Col>
				</Row>
			);
		});
	};

	return (
		<>
			<div>
				{showFilter && filterArray.length > 0 ? (
					<Radio.Group value={tabValue} buttonStyle='solid' onChange={changeTabPosition}>
						<Radio.Button value='All'>All</Radio.Button>
						{filterArray.map((ele) => {
							return (
								<Radio.Button style={{ marginLeft: '5px' }} value={ele.assetType}>
									{ele.assetType}
								</Radio.Button>
							);
						})}
					</Radio.Group>
				) : null}
			</div>
			{allowScroll ? (
				<div style={{ overflow: 'auto', height: '550px', marginTop: '10px' }}>
					<ProductWrapper />
				</div>
			) : (
				<ProductWrapper />
			)}
		</>
	);
};
