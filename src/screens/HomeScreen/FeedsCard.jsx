import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import GenericCard from '../../components/GenericCard/GenericCard';
import { feeds } from './constant';
import { Row, Col, Carousel, Card } from 'antd';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GenericBadge from '../../components/GenericBadge/GenericBadge';
import { theme } from '../../theme';
import 'antd/dist/antd.css';
import '../../antd-override.scss';
import moment from 'moment';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import Feed from './Feed';
import CustomModalWithCloseIcon from '../../components/Modal/CustomModalWithCloseIcon/CustomModalWithCloseIcon';

import One from './FeedsImages/1.png';
import Two from './FeedsImages/2.png';
import Three from './FeedsImages/3.png';

const FeedsCard = ({ allTopFeedData }) => {
	const feedsList = [];

	const [notesList, setNotesList] = useState();
	const [feedInDetail, setFeedInDetail] = useState();
	const [showModal, setShowModal] = useState(false);

	const onChange = (a, b, c) => {
		console.log(a, b, c);
	};

	const styleSet = {
		feedsCard: {
			maxHeight: '847px',
			height: '847px'
		},
		contentStyle: {
			color: '#fff',
			lineHeight: '160px',
			backgroundColor: '#364d79',
			paddingBottom: '30px'
		},
		feedsStyle: {
			button: {
				borderRadius: '8px',
				fontSize: '22px',
				width: 'max-content'
			}
		},
		carouselStyle: {
			maxHeight: '700px',
			height: '700px'
		},
		carouselCard: {
			border: 'none',
			padding: 'none'
		},
		thumbnail: {
			width: '95%',
			height: '100%',
			objectFit: 'cover',
			display: 'block',
			marginLeft: 'auto',
			marginRight: 'auto'
		}
		//
	};

	useEffect(() => {
		if (allTopFeedData && allTopFeedData.length > 0) {
			const apiData = allTopFeedData?.map((item) => {
				return {
					id: item.id,
					image: item.thumbnail,
					feedTitle: item.title,
					feedBody: item.description,
					tag: 'Wealth',
					date: item.expiry,
					blog: item.blog
				};
			});
			setNotesList(apiData);
		}
	}, [allTopFeedData]);
	const hideModalHandler = () => {
		setShowModal(false);
		setFeedInDetail('');
	};

	const feedInDetailHandler = (data) => {
		setFeedInDetail(data);
		setShowModal(true);
	};

	// const images = [One, Two, Three];

	return (
		<>
			<GenericCard
				header={feeds}
				// viewAll={true}
				style={styleSet.feedsCard}
			>
				<Carousel
					afterChange={onChange}
					dotPosition='top'
					dots={{ className: 'dots' }}
					arrows
					prevArrow={<LeftOutlined />}
					nextArrow={<RightOutlined />}
					style={styleSet.carouselStyle}
				>
					{notesList?.map((item, idx) => (
						<div style={styleSet.contentStyle} key={idx}>
							{/* {item.feedTitle} */}
							<Card style={styleSet.carouselCard}>
								{/* <Row>
									<Col span={24}>
										<div>
											<img
												style={styleSet.thumbnail}
												// src={item?.image}
												src={images[idx]}
												alt='Logo'
											/>
										</div>
									</Col>
								</Row> */}
								{/* {' '} */}
								<Feed
									feedData={item}
									// key={item.id}
									feedInDetailHandler={feedInDetailHandler}
									viewType='cardView'
								/>
								{/* </Col> */}
								{feedInDetail && (
									<CustomModalWithCloseIcon
										visible='true'
										handleCancel={hideModalHandler}
										handleOk={hideModalHandler}
									>
										<Feed
											feedInDetailHandler={feedInDetailHandler}
											feedData={feedInDetail}
											viewType='modalView'
										/>
									</CustomModalWithCloseIcon>
								)}
								<Row style={theme.headerM}>
									<Col span={12} style={theme.dFlex}>
										<div>
											<FontAwesomeIcon icon={faBookOpen} />
										</div>
										<div>
											<GenericBadge badgeBody={item.tag} />
										</div>
									</Col>
									<Col span={12} style={{ textAlign: 'right' }}>
										<span>Available till </span> &nbsp;
										{moment(item.date).format('DD MMM YYYY')}
									</Col>
								</Row>
								<Row>
									<Col span={24} style={{ padding: '0px 12px' }}>
										<Row style={{ marginBottom: '12px' }}>
											<Col>
												<div style={{ ...theme.primaryHeader, ...theme.headerM }}>
													{item.feedTitle}
												</div>
												<div style={theme.secondaryBody}>{item.feedBody}</div>
												<div>{item.blog}</div>
											</Col>
										</Row>
									</Col>
								</Row>
							</Card>
						</div>
					))}
				</Carousel>
			</GenericCard>
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		allTopFeedData: state.crmHome.topFeed
	};
};
export default connect(mapStateToProps)(FeedsCard);
