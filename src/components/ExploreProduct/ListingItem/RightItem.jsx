import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
// antd
import { Col } from 'antd';

// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/pro-regular-svg-icons';
import { faCheckCircle, faStar as faStarFilled } from '@fortawesome/free-solid-svg-icons';

// theme
import { palette, fontSet } from '../../../theme';

// scss
import '../ExploreProduct.scss';

// components
import TypoGraphy from '../../TypoGraphy/TypoGraphy';

import { executeMakeFavorite } from '../../../redux/actions/exploreProductsActions';

import moment from 'moment';

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

const RightItem = ({ rowData = defaultValue, setLoading = () => {} }) => {
	const history = useHistory();

	// states
	const [isBookmarked, setIsBookmarked] = useState(false);

	useEffect(() => {
		rowData.securityDetails?.isFavorite ? setIsBookmarked(true) : setIsBookmarked(false);
		console.log(rowData);
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
	};

	return (
		<div style={{ display: 'flex' }}>
			<div style={styleSet.firstCol}>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'flex-end'
					}}
				>
					{/* <FontAwesomeIcon icon={faCheckCircle} size="1x" color="#05BC6A" /> */}

					{!rowData?.isGraph && (
						<Col style={styleSet.subMain}>
							<TypoGraphy label={'Last Updated'}>
								<div style={styleSet.subCardHeader}>
									{moment(rowData?.securityDetails?.valueDate).format('DD-MM-YYYY')}
								</div>
							</TypoGraphy>
						</Col>
					)}
				</div>
				{/* <div
          style={styleSet.investButton}
          onClick={() => {
            rowData.isPrimary === false
              ? history.push("../orderBook/OrderBookInput", {
                  buySell: "BUY",
                  activeTab: rowData.assetGroup,
                  exploreSecurity: rowData.security,
                })
              : history.push("OrderBook/InvestmentOrder", {
                  activeTab: rowData.assetGroup,
                });
          }}
        >
          Invest
        </div> */}
			</div>

			<div style={styleSet.secondCol}>
				<FontAwesomeIcon
					onClick={toggleFavourite}
					icon={isBookmarked ? faStarFilled : faStar}
					size='1x'
					color='#354081'
				/>

				{/* NOT THERE IN PHASE ONE*/}
				{/* <Popover
                    overlayClassName='exploreProductPopOver'
                    placement='bottomLeft'
                    content={renderMore}
                >

                    <FontAwesomeIcon icon={faEllipsisHAlt} size='2x' color='#354081' />

                </Popover> */}
			</div>
		</div>
	);
};

export default RightItem;
