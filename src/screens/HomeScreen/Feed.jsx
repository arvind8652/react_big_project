import React, { useEffect, useState } from 'react';
import { Col, Card, Row } from 'antd';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GenericBadge from '../../components/GenericBadge/GenericBadge';
import GenericCardWithImages from '../../components/GenericCard/GenericCardWithImages';
import { theme } from '../../theme';
import moment from 'moment';

const Feed = (props) => {
	const { feedData, feedInDetailHandler, viewType } = props;
	function truncate(str, n) {
		if (viewType == 'cardView') {
			return str?.length > n ? str.substr(0, n - 1) + '...' : str;
		} else {
			return str;
		}
	}
	function imageFile(imgPath) {
		if (viewType === 'cardView') {
			return (imgPath = 'data:image;base64,' + feedData?.image);
		} else {
			return (imgPath = feedData?.blog);
		}
	}
	// let imgPath = "data:image;base64,"+ feedData?.image
	return (
		<GenericCardWithImages
			imgPath={imageFile()}
			actionHandler={feedInDetailHandler}
			detailData={feedData}
			types={2}
			viewType={viewType}
		></GenericCardWithImages>
	);
};

export default Feed;
