import React, { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/pro-regular-svg-icons';
import { faStar as faStarFilled } from '@fortawesome/free-solid-svg-icons';

// theme
import { palette, fontSet } from '../../../theme';

// scss
import '../ExploreProduct.scss';

import { executeMakeFavorite } from '../../../redux/actions/exploreProductsActions';
import { Spin } from 'antd';

const defaultValue = {
	name: 'Alexandra Romus',
	id: 'BDO1928345',
	tagName: 'Equity',
	secondaryTag: 'Stocks',
	value: '$21',
	risk: 'Moderate',
	score: '5',
	category: 'Multi Cap',
	sector: 'Industrial',
	lastUpdate: '21 June 202',
	fund: '25%',
	sp: '21%',
	alpha: '8%',
	downsideRisk: '2.5%',
	categoryName: 'Trending',
	securityDetails: {
		isFavorite: false
	}
};

export default function FavoriteItem({ callRefreshApis = () => {}, rowData = defaultValue }) {
	const [isBookmarked, setIsBookmarked] = useState(false);
	const [fakeLoader, setFakeLoader] = useState(false);

	useEffect(() => {
		rowData?.securityDetails?.isFavorite ? setIsBookmarked(true) : setIsBookmarked(false);
	}, [rowData]);

	const styleSet = {
		container: {
			display: 'flex'
		},
		firstCol: {
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'space-between',
			height: '179px',
			alignItems: 'flex-end'
		},
		secondCol: {
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'space-between',
			height: '179px',
			alignItems: 'flex-end',
			marginLeft: '20px'
		},
		subCardHeader: {
			fontSize: fontSet.body.large,
			color: palette.text.scard
		},
		subMain: {
			fontSize: fontSet.body.xsmall,
			color: palette.text.dark,
			marginTop: '13px'
			//marginLeft: "80px",
			//marginRight: "15px",
		},
		investButton: {
			borderRadius: '8px',
			borderColor: '#47518B',
			color: '#47518B',
			borderWidth: '1px',
			paddingLeft: '10px',
			padding: '3px 25px',
			borderStyle: 'solid',
			fontSize: '22px'
		}
	};
	const getPostObject = () => ({
		data: {
			RefType: 'SECURITY',
			RefID: rowData?.securityDetails?.security,
			ProgName: 'EXPLOREPRDS'
		}
	});

	const toggleFavourite = () => {
		setIsBookmarked(!isBookmarked);
		executeMakeFavorite(getPostObject());
		callRefreshApis();
	};
	return (
		<div style={styleSet.secondCol}>
			<FontAwesomeIcon
				onClick={toggleFavourite}
				icon={isBookmarked ? faStarFilled : faStar}
				size='1x'
				color='#354081'
			/>
		</div>
	);
}
