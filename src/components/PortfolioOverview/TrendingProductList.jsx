import React, { useCallback, useEffect, useState } from 'react';
import { Col, Row, Divider } from 'antd';
import { palette, fontSet } from '../../theme';
import { SecurityCard } from '../../screens/PrimaryMarket/SecurityCard';

const TrendingProductsList = ({ trendingData }) => {
	const styleSet = {
		container: {
			fontSize: fontSet.body.xsmall,
			color: palette.text.success
		},
		containerStyle: {
			marginLeft: '15px'
		},
		avatar: {
			color: '#f56a00',
			backgroundColor: '#fde3cf',
			fontSize: window.screen.width > 1800 ? '2.5rem' : '1.50rem',
			marginRight: '10px'
		},
		bannerId: {
			color: palette.text.main
		},
		subContainer: {
			fontSize: fontSet.body.xsmall,
			color: palette.text.dark,
			marginTop: '10px'
		},
		subMain: {
			fontSize: fontSet.body.xsmall,
			color: palette.text.dark,
			marginTop: '10px'
		},
		subStyle: {
			fontSize: fontSet.body.xsmall,
			color: palette.text.dark,
			marginTop: '10px',
			marginLeft: '5%'
		},
		subStyleCard: {
			fontSize: fontSet.body.xsmall,
			color: palette.text.dark,
			marginTop: '10px',
			marginLeft: '5%'
		},
		labelCard: {
			fontSize: fontSet.body.large,
			color: palette.text.main
		},
		subCategory: {
			fontSize: fontSet.body.xsmall,
			color: palette.text.dark,
			marginTop: '10px',
			marginLeft: '15px'
		},
		subIcon: {
			marginTop: '10px'
		},
		iconStyle: {
			display: 'inline-flex',
			justifyContent: 'center',
			alignItems: 'center'
		},
		eachLabel: {
			color: '#898EA9',
			margin: '0px',
			fontSize: '1.2rem'
		},
		mapBlock: {
			height: '65px',
			width: '250px'
		},
		cBlock: {
			fontSize: fontSet.body.xsmall,
			color: palette.text.dark,
			marginTop: '62px'
		},
		dBlock: {
			fontSize: fontSet.body.xsmall,
			color: palette.text.dark,
			marginTop: '20px'
		},
		mBlock: {
			marginBottom: '40px'
		},
		block: {
			height: '25px',
			width: '150px'
		},
		moderate: {
			marginLeft: '15px'
		},
		subCardHeader: {
			fontSize: fontSet.body.large,
			color: palette.text.scard
		},
		sCardHeader: {
			fontSize: fontSet.body.xxlarge,
			color: palette.text.scard
		}
	};

	const [securityCategory, setSecurityCategory] = useState('');

	const returnSuggestedText = useCallback((record) => {
		if (record.isBestMatch) return 'Best Match';
		else if (record.isUpgraded) return 'Upgraded';
		else if (record.isNewlyLaunched) return 'New Launch';
		else if (record.isDowngraded) return 'Downgraded';
		else return 'Trending';
	});

	const SuggestedCategoryText = ({ record, isFirstTime = 0 }) => {
		const [shouldDisplay, setShouldDisplay] = useState(false);

		useEffect(() => {
			const category = returnSuggestedText(record);
			if ((securityCategory !== category) | isFirstTime) {
				setSecurityCategory(category);
				setShouldDisplay(true);
			} else {
				setShouldDisplay(false);
			}
		}, []);

		return shouldDisplay ? (
			<span style={styleSet.labelCard}>Suggested for you ({securityCategory})</span>
		) : (
			<></>
		);
	};

	return (
		<>
			{trendingData.length > 0 && (
				<SuggestedCategoryText record={trendingData[0]} isFirstTime={1} />
			)}
			{trendingData?.map((item, index) => (
				<Row key={index}>
					<Col>
						<SuggestedCategoryText record={item} />
						<SecurityCard
							marketType={item?.security?.isPrimary ? 'PRIMARY' : 'Secondary'}
							data={item?.security}
							style={styleSet}
						></SecurityCard>
						<Divider style={{ marginTop: 5, marginBottom: 5 }} />
					</Col>
				</Row>
			))}
		</>
	);
};

export default TrendingProductsList;
