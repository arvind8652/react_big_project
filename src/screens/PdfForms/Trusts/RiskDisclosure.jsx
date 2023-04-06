import { Row, Col } from 'antd';
import { Typography } from 'antd';
import './RiskDisclosure.scss';
import sealLogo from '../../../assets/img/seal.png';
import riskImg from '../../../assets/img/riskLogo.png';
const { Title, Text, Paragraph } = Typography;

const RiskDisclosure = () => {
	const styleSet = {
		name: {
			padding: '40px',
			border: '2px solid gray'
		},
		signature: {
			border: '1px solid #5e5d5d'
		},
		space: {
			paddingTop: '26px'
		},
		spaceDate: {
			paddingTop: '1px'
		},
		innerSpace: {
			paddingTop: '60px'
		},
		instruction: {
			border: '2px solid gray',
			padding: '0px 15px'
		},
		text: {
			fontSize: '17px',
			fontWeight: '500',
			color: '#5e5d5d',
			textAlign: 'center',
			width: '100%'
		},
		date: {
			fontSize: '17px',
			fontWeight: '500',
			color: '#5e5d5d',
			width: '100%',
			textAlign: 'justify',
			marginLeft: '191px'
		},
		rightCol: {
			marginLeft: '20px',
			marginRight: '30px',
			textAlign: 'justify'
		},
		heading: {
			backgroundColor: 'black',
			color: 'white'
		},
		title: {
			color: '#5e5d5d',
			fontSize: '25px',
			fontWeight: 'bold'
		},
		header: {
			color: '#5e5d5d',
			fontSize: '50px',
			fontWeight: '400',
			margin: '10px'
		},
		logo: {
			marginTop: '-30px',
			padding: '0px'
		}
	};

	return (
		<div className='print'>
			<img src={riskImg} alt='riskLogo' height='60px' width='150px' />
			<Row justify='center' style={styleSet.space}>
				<Title level={3} style={{ color: 'black' }}>
					RISK DISCLOSURE STATEMENT
				</Title>
			</Row>
			<Row justify='center'>
				<Title level={4} style={{ color: 'black' }}>
					Regular Trust Account/Investment Management Account
				</Title>
			</Row>
			<Row>
				<Col span={11} style={{ marginLeft: '30px', textAlign: 'justify' }}>
					<div>
						<Paragraph>
							Prior to undertaking any investments for your trust/finvestment management account,
							RCBC is hereby informing you of the nature of the risks involved in investing therein.
							As investments carry different degrees of risk, it is necessary that before you open
							the trust account, you should have:
						</Paragraph>
						<div>
							<ol>
								<li>
									Fully understood the nature of the investments to be made and the extent of your
									exposure to risks
								</li>
								<li>Read this Risk Disclosure Statement completely</li>
								<li>
									Independently determined that the investment(s) will be appropriate for you.
								</li>
							</ol>
						</div>
						<Paragraph>
							INVESTMENTS IN TRUST OR INVESTMENT MANAGEMENT OR FIDUCIARY ACCOUNTS DO NOT PROVIDE
							GUARANTEED RETURNS EVEN IF INVESTED IN GOVERNMENT SECURITIES AND HIGH GRADE PRIME
							INVESTMENT SECURITIES. THE PRINCIPAL AND EARNINGS FROM THE INVESTMENT IN THE FUND MAY
							BE REDUCED IN WHOLE OR IN PART WHEN THE MARKET PRICE IN CASE OF SALE OR LIQUIDATION OF
							A SECURITY IS LOWER THAN THE PRICE AT THE TIME OF PURCHASE. ON THE OTHER HAND, GAINS
							ARE REALIZED WHEN THE PRICE AT THE TIME OF SALE IS HIGHER THAN THE PURCHASE PRICE.
						</Paragraph>
						<Paragraph>
							YOUR INVESTMENTS IN ANY OF THE INVESTMENT OUTLETS FOR THE FUND ARE SUBJECT TO THE
							FOLLOWING RISKS.
						</Paragraph>
						<Title level={5} style={styleSet.heading}>
							INTEREST RATE RISK
						</Title>
						<Paragraph>
							This is the possibility for an investor to experience losses due to changes in
							interest rates. The purchase and sale of a debt instrument may result in profits or
							losses because the value of a debt instrument changes with fluctuations in interest
							rates.
						</Paragraph>
						<Paragraph>
							The investment portfolio is affected by changes in interest rates thereby affecting
							the value of fixed income investments such as bonds. Interest rate changes may affect
							the prices of fixed income securities inversely, i.e. as interest rates rise, bond
							prices fall and when interest rates decline, bond prices rise. As the prices of bonds
							in the fund adjust to a rise in interest rates, the fund’s value may decline.
						</Paragraph>
						<Title level={5} style={styleSet.heading}>
							MARKET/PRICE RISK
						</Title>
						<Paragraph>
							This is the possibility for an investor to experience losses due to changes in market
							prices of securities (e.g. bonds and equities). It is the exposure to the uncertain
							market value of a portfolio due to price fluctuations.
						</Paragraph>
						<Paragraph>
							It is the risk of the portfolio to lose value due to a decline in securities prices,
							which may sometimes happen rapidly or unpredictably. The value of investments
							fluctuates over a given time period because of general market conditions, economic
							changes or other events that impact large portions of the market such as political
							events, natural calamities, etc. As a result, the investment portfolio may increase to
							make profit or decrease to incur loss.
						</Paragraph>
						<Title level={5} style={styleSet.heading}>
							LIQUIDITY RISK
						</Title>
						<Paragraph>
							This is the possibility for an investor to experience losses due to the inability to
							sell or convert assets into cash immediately or in instances where conversion to cash
							is possible but at a loss. These may be caused by different reasons such as trading in
							securities with small or few outstanding issues, absence of buyers, limited buy/sell
							activity or underdeveloped capital market.
						</Paragraph>
						<Paragraph>
							Liquidity risk occurs when certain securities in the portfolio may be difficult or
							impossible to sell at a particular time which may prevent the immediate withdrawal of
							funds until its assets can be converted to cash. Even government securities which are
							the most liquid of fixed income securities may be subjected to liquidity risk
							particularly if a sizeable volume is involved.
						</Paragraph>
						<Title level={5} style={styleSet.heading}>
							CREDIT RISK/DEFAULT RISK
						</Title>
						<Paragraph>
							This is the possibility for an investor to experience losses due to a borrower’s
							failure to pay principal and/or interest in a timely manner on instruments such as
							bonds, loans or other forms of indebtedness which the borrower issued. This inability
							of the borrower to make good on its financial obligations may have resulted from
							adverse changes in its financial condition thus, lowering credit quality of the
							security, and consequently lowering the price (market/price risk) which contributes to
							the difficulty in selling such security. It also includes risk on a counterparty (a
							party the Trustee/Investment Manager trades with) defaulting on a contract to deliver
							its obligation either in cash or securities.
						</Paragraph>
						<Paragraph>
							This is the risk of losing value in the portfolio in the event the borrower defaults
							on the obligation or in the case of a counterparty when it fails to deliver on the
							agreed trade. This decline in value happens because the default/failure would make the
							price of the security go down and may make the security difficult to sell. As these
							happen, the trust/investment management fund will be affected by a decline in value.
						</Paragraph>
					</div>
				</Col>
				<Col span={10} style={styleSet.rightCol}>
					<div>
						<Title level={5} style={styleSet.heading}>
							REINVESTMENT RISK
						</Title>
						<Paragraph>
							This is the risk associated with the possibility of having lower returns or earnings
							when maturing assets of the fund or the interest earnings of these assets are
							reinvested.
						</Paragraph>
						<Paragraph>
							Investors who redeem and realize their gains run the risk of reinvesting their funds
							in an alternative investment outlet with lower yields. Similarly, the
							Trustee/Investment Manager is faced with the risk of not being able to find good or
							better alternative investment outlets as some of the securities in the fund mature.
						</Paragraph>
					</div>
					<div>
						<Title level={5} style={styleSet.heading}>
							FOREIGN EXCHANGE RISK
						</Title>
						<Paragraph>
							In the case of a foreign currency denominated account or a peso denominated account
							allowed to invest in securities denominated in currencies other than its base
							currency, the account is also exposed to foreign exchange risk.
						</Paragraph>
						<Paragraph>
							This is the possibility for an investor to experience losses due to fluctuations in
							foreign exchange rates. The exchange rates depend upon a variety of global and local
							factors, e.g. interest rates, economic performance and political developments.
						</Paragraph>
						<Paragraph>
							It is the risk of the account to currency fluctuations when the value of investments
							in securities denominated in currencies other than the base currency of the account
							depreciates. Conversely, it is the risk of the fund to lose value when the base
							currency of the fund appreciates. The value of a peso denominated account invested in
							foreign currency denominated securities may decrease to incur losses when the peso
							appreciates.
						</Paragraph>
					</div>
					<div>
						<Title level={5} style={styleSet.heading}>
							REGULATORY RISK
						</Title>
						<Paragraph>
							This is the risk that the government may issue new laws and regulations which may
							affect, among others, the management of trust, investment management accounts and Unit
							Investment Trust Funds (UITFs) as well as the registration, custody, classification
							and taxation of securities and investment instruments. This will however be applied
							uniformly in the trust and banking industries and will have similar effects on their
							products.
						</Paragraph>
					</div>
					<div>
						<Title level={5} style={styleSet.heading}>
							COUNTRY RISK
						</Title>
						<Paragraph>
							This is the possibility for an investor to experience losses arising from investments
							in securities issued by/in foreign countries due to the political, economic and social
							structures of such countries. There are risks in foreign investments due to the
							possible internal and external conflicts, currency devaluation, foreign ownership
							limitations and tax increases of the foreign country involved which are difficult to
							predict but must be taken into account in making such investments.
						</Paragraph>
						<Paragraph>
							Likewise brokerage commissions and other fees may be higher in foreign securities.
							Government supervision and regulation of foreign stock exchanges, currency markets,
							trading systems and brokers may be less than those in the Philippines. The procedures
							and rules governing foreign transactions and custody of securities may also involve
							delays in payment, delivery or recovery of investments.
						</Paragraph>
					</div>
					<div>
						<Title level={5} style={styleSet.heading}>
							OTHER RISKS
						</Title>
						<Paragraph>
							Your funds in any trust/investment management portfolio may be further exposed to the
							risk of any actual or potential conflicts of interest in handling of in-house or
							related party transactions by the Trustee. These transactions may include investments
							in its own bank deposits, purchases of obligations of the trust institution or its
							affiliates and subsidiaries, including stocks and mortgages; purchase of assets from
							or sales to the institution, its directors, officers subsidiaries, affiliates or other
							related interests/parties; or purchase or sales between trust, fiduciary and
							investment management accounts managed by the Trustee.
						</Paragraph>
					</div>
					<div>
						<Title level={5} style={styleSet.heading}>
							OTHER DISCLOSURES
						</Title>
						<ol>
							<li>
								The value of the fund may fluctuate upwards or downwards depending on the volatility
								of prices of various investment instruments in the market, including government
								securities and other fixed income investments. As such, the trust/investment
								management fund is not guaranteed by the Trustee/Investment Manager.
							</li>
							<li>
								The trustee is not allowed to quote indicative rates of return for the trust
								products.
							</li>
							<li>
								The yield on investments is not guaranteed. Any income or loss shall be for the
								account and risk of the investor.
							</li>
							<li>
								Historical performance when presented is purely for reference purposes and is not a
								guarantee of similar future results.
							</li>
							<li>Trust products are not deposits, hence, not covered by PDIC.</li>
							<li>
								Withdrawals from the account may be made subject tot the terms and conditions in
								which the funds were invested, the availability of a secondary market for the
								investments of the account and the prevailing prices of investments which may result
								in trading gains or losses for the account.
							</li>
							<li>
								The trustee is not liable for losses, except those resulting from willful default,
								bad faith or gross negligence.
							</li>
						</ol>
					</div>
				</Col>
			</Row>
			<Row>
				<Col style={styleSet.rightCol}>
					<div>
						<Paragraph>
							BY AFFIXING MY/OUR SIGNATURE/S BELOW, I/WE HEREBY REPRESENT THAT WE HAVE COMPLETELY
							READ AND FULLY UNDERSTOOD THIS RISK DISCLOSURE STATEMENT AND THE SAME WAS CLEARLY
							EXPLAINED TO ME/US BY THE MARKETING REPRESENTATIVE OF RCBC WHOSE SIGNATURE APPEARS
							BELOW. I/WE AM/ARE FULLY AWARE OF THE POSSIBLE IMPACT OF THESE RISKS TO OUR
							INVESTMENT. AFTER HAVING INDEPENDENTLY ASSESSED THESE RISKS, I/WE HAVE DETERMINED THAT
							THE INVESTMENT(S) IS/ARE APPROPRIATE FOR MY/OUR INVESTMENT NEEDS AND GOALS. I/WE
							HEREBY VOLUNTARILY AND WILLINGLY AGREE TO COMPLY WITH ANY AND ALL LAWS, REGULATIONS,
							THE TRUST AGREEMENT/INVESTMENT MANAGEMENT AGREEMENT CONTAINING THE TERMS AND
							CONDITIONS TERMS AND CONDITIONS GOVERNING MY/OUR INVESTMENTS.
						</Paragraph>
					</div>
				</Col>
			</Row>
			<Row align='middle'>
				<Col span={11} offset={1} style={styleSet.space}>
					<hr style={styleSet.signature} />
					<div style={styleSet.text}>TRUSTOR(S)/PRINCIPAL</div>
					<div style={styleSet.text}>Signature over Printed Name</div>
				</Col>
				<Col style={styleSet.logo}>
					<img src={sealLogo} alt='sealLogo' height='70px' width='70px' />
				</Col>
				<Col span={8} offset={1} style={styleSet.spaceDate}>
					<hr style={styleSet.signature} />
					<Text style={styleSet.date}>DATE</Text>
				</Col>
			</Row>
			<Row style={{ marginTop: '10px' }}>
				<Col span={23} offset={1}>
					<Paragraph>
						I acknowledge that I have (1) advised the client to read this Risk Disclosure Statement,
						(2) encouraged the client to ask questions on matters contained in this Risk Disclosure
						Statement, and (3) fully explained the same to the client.
					</Paragraph>
				</Col>
			</Row>
			<Row align='middle'>
				<Col span={12} offset={1} style={styleSet.space}>
					<hr style={styleSet.signature} />
					<div style={styleSet.text}>TRUSTOR(S)/PRINCIPAL</div>
					<div style={styleSet.text}>Signature over Printed Name</div>
				</Col>
				<Col span={8} offset={1} style={styleSet.spaceDate}>
					<hr style={styleSet.signature} />
					<Text style={styleSet.date}>DATE</Text>
				</Col>
			</Row>
		</div>
	);
};

export default RiskDisclosure;
