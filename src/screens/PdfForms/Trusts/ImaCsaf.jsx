import React from 'react';
import { Col, Row, Typography } from 'antd';

const { Title, Text } = Typography;

const ImaCsaf = () => {
	const styleSet = {
		space: {
			paddingTop: '5%'
		},
		border: {
			border: '4px solid #5e5d5d',
			margin: '50px'
		},
		text: {
			fontSize: '17px',
			fontWeight: '500',
			color: '#5e5d5d',
			alignItems: 'center',
			width: '100%',
			textAlign: 'justify'
		},
		title: {
			color: '#5e5d5d',
			fontSize: '25px',
			fontWeight: 'bold'
		},
		olpadding: {
			padding: '0px 120px'
		},
		header: {
			color: '#5e5d5d',
			fontSize: '50px',
			fontWeight: '400',
			margin: '10px'
		},
		signature: {
			border: '1px solid #5e5d5d'
		}
	};
	return (
		<div style={styleSet.border}>
			<Title style={styleSet.header}>RCBC</Title>
			<Row justify='center' style={styleSet.space}>
				<Title style={styleSet.title}>RCBC REGULAR TRUST ACCOUNT</Title>
			</Row>
			<Row justify='center'>
				<Title style={styleSet.title} underline>
					CLIENT WAIVER
				</Title>
				<Text style={{ ...styleSet.text, padding: '0px 50px' }}>
					DESPITE THE ADVICE GIVEN TO ME BY THE RCBC AUTHORIZED MARKETING REPRESENTATIVE THAT THERE
					MAY BE SOME DISPARITY BETWEEN MY INVESTMENT PREFERENCES AND RISK APPETITE BASED ON THE
					FOREGOING CLIENT SUITABILITY ASSESSMENT AND THE NATURE OF INVESTMENTS IN GENERAL OR THE
					SPECIFIC INVESTMENTS I HAVE SELECTED IN PARTICULAR, I HEREBY CONFIRM THAT:
				</Text>

				<ol style={styleSet.olpadding}>
					<Col style={styleSet.space}>
						<Text style={styleSet.text}>
							<li>
								WE DO NOT AGREE WITH OR ACCEPT THE RECOMMENDATION OF THE MARKETING PERSONNEL ON ALL
								OR SEVERAL INVESTMENTS SUITABLE TO MEET MY/OUR NEEDS.
							</li>
						</Text>
						<Text style={styleSet.text}>
							<li>
								WE CHOOSE TO INVEST IN THE ASSETS WHICH I/WE BELIEVE SUITS MY/OUR NEEDS, INVESTMENT
								OBJECTIVES AND RISK APPETITE.
							</li>
						</Text>
						<Text style={styleSet.text}>
							<li>
								THE RESULTS OF THE CSA CAN BE DISREGARDED AND THAT IMWWE WOULD LIKE TO PROCEED WITH
								MY/OUR INTENDED INVESTMENT/S WITH RCBC. I HEREBY HOLD RCBC FREE AND HARMLESS FROM
								ANY CLAIMS OR LIABILITIES THAT MAY ARISE FROM THE IMPLEMENTATION OF THIS WAIVER.
							</li>
						</Text>
					</Col>
				</ol>
			</Row>

			<Row align='middle'>
				<Col span={6} offset={4} style={styleSet.space}>
					<hr style={styleSet.signature} />
					<Text style={styleSet.text}>Trustor/Principal/Authorized Signatory Date</Text>
				</Col>
				<Col span={4} offset={6} style={styleSet.space}>
					<hr style={styleSet.signature} />
					<Text style={styleSet.text}>Signature over Printed Name</Text>
				</Col>
			</Row>
		</div>
	);
};

export default ImaCsaf;
