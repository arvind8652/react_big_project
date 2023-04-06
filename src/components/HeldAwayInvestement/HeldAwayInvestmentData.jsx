import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/pro-light-svg-icons';
import { Button } from 'antd';

const HeldAwayInvestmentData = () => {
	const heldAwayData = [
		{
			img: 'https://static.photocdn.pt/images/articles/2019/08/07/images/articles/2019/07/31/linkedin_profile_picture_tips-1.jpg',
			name: 'Peter Dudchenko',
			code: 'Asan1024',
			family: 'Dudchenko Family',
			ratio: '2X',
			wallet: '2.5%',
			heldAway: '$450,000'
		},
		{
			img: 'https://static.photocdn.pt/images/articles/2019/08/07/images/articles/2019/07/31/linkedin_profile_picture_tips-1.jpg',
			name: 'Peter Dudchenko',
			code: 'Asan1024',
			family: 'Dudchenko Family',
			ratio: '2X',
			wallet: '2.5%',
			heldAway: '$450,000'
		},
		{
			img: 'https://static.photocdn.pt/images/articles/2019/08/07/images/articles/2019/07/31/linkedin_profile_picture_tips-1.jpg',
			name: 'Peter Dudchenko',
			code: 'Asan1024',
			family: 'Dudchenko Family',
			ratio: '2X',
			wallet: '2.5%',
			heldAway: '$450,000'
		},
		{
			img: 'https://static.photocdn.pt/images/articles/2019/08/07/images/articles/2019/07/31/linkedin_profile_picture_tips-1.jpg',
			name: 'Peter Dudchenko',
			code: 'Asan1024',
			family: 'Dudchenko Family',
			ratio: '2X',
			wallet: '2.5%',
			heldAway: '$450,000'
		}
	];
	return (
		<>
			<div>
				<div
					style={{
						display: 'flex',
						flexWrap: 'wrap',
						border: '1px solid #F6F7FB',
						textAlign: 'center',
						padding: '21px 12px',
						backgroundColor: '#F6F7FB'
					}}
				>
					<span style={{ width: '25%' }}>
						<b>25</b> <br /> Count
					</span>
					<span style={{ width: '25%' }}>
						<b>+5</b> <br />
						Performance
					</span>
					<span style={{ width: '25%' }}>
						<b>$245,765</b> <br />
						Value
					</span>
					<span style={{ width: '25%' }}>
						<b>+0.3%</b> <br />
						Performance
					</span>
				</div>

				{heldAwayData.map((data, idx) => {
					return (
						<div
							style={{
								display: 'flex',
								flexWrap: 'wrap',
								padding: '25px 15px'
							}}
							key={idx}
						>
							<span style={{ width: '10%' }}>
								<FontAwesomeIcon icon={faUserCircle} />
							</span>
							<span style={{ width: '30%' }}>
								<h3>{data.name}</h3>
								<span style={{ display: 'flex', flexWrap: 'wrap' }}>
									<small>{data.code}</small> | <small>{data.family}</small>
								</span>
								<h5>{data.heldAway} (AUM)</h5>
							</span>
							<span style={{ width: '20%' }}>
								<p>
									{data.ratio}
									<br /> Ratio
								</p>
							</span>
							<span style={{ width: '20%' }}>
								<p>
									{data.wallet} <br /> Wallet
								</p>
							</span>
							<span style={{ width: '20%' }}>
								{data.heldAway}
								<br /> Held Away
							</span>
						</div>
					);
				})}
			</div>
			<span style={{ float: 'right' }}>
				<Button>View All</Button>
			</span>
		</>
	);
};

export default HeldAwayInvestmentData;
