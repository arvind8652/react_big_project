import { Row, Col } from 'antd';
import { Typography } from 'antd';
const { Title, Text, Paragraph } = Typography;
import rcbclogo from '../../../../assets/img/rcbc.png';
import './OpeningsFormsMmp.scss';

const OpeningsFormMmp = () => {
	return (
		<div className='print'>
			{/* <div className='main-page'>
				<Row className='main-page-next' align='middle'>
					<Col>
						<img src={rcbclogo} alt='rcbcLogo' height='100px' width='100px' />
					</Col>
					<Col span={8}>
						<Text className='head'>LEASING & FINANCE CORPORATION</Text>
						<Text>A YGC Member</Text>
					</Col>
				</Row>
			</div> */}
			<div>
				<Row>
					<Col style={{ margin: '30px 0px 0px 60px' }}>
						<img src={rcbclogo} alt='rcbcLogo' height='100px' width='100px' />
						<Text style={{ margin: '1px 0px 0px 1px' }} level={3}>
							LEASING
						</Text>
					</Col>
				</Row>
				<Row>
					<Col span={24} style={{ margin: '0px 200px 0px 50px', color: 'bold' }}>
						<hr />
					</Col>
				</Row>
				<Row justify='center'>
					<Title level={3}>DATA PRIVACY CONSENT</Title>
				</Row>
				<Row>
					<Paragraph>
						In accordance with the Data Privacy Act (DPA) of 2012, its Implementing Rules and
						Regulations (IRR), issuances of the National Privacy Commission (NPC}, and other
						relevant laws of the Philippines, | am allowing RCBC Leasing and Finance
						Corporation/RCBC Rental Corporation (RLFC/RRC) to collect, generate, use, process,
						store, and retain my personal and sensitive personal information’ so that RLFC/RRC can
						provide its services in relation to money market placements.
					</Paragraph>
					<Text className='head4'>As such, | agree and authorize RLFC/RRC to:</Text>
					<ol className='olpadding-head-1'>
						<li className='head4'>
							1. Use and process my and my company’s/business’ personal and other information to
							process my placement/investment and administer the same as stated in my Customer
							Information Sheet.
						</li>
						<li className='head4'>
							2. Retain my information for a minimum period of five (5) years from the date of full
							payment/completion/termination of the contract/placement, unless a longer retention
							period is provided for by law or government rules and regulations. | agree that my
							information will be deleted/destroyed after this period.
						</li>
						<li className='head4'>
							3. Share my information with government regulatory agencies, credit information or
							investigation companies, financial institutions, credit bureaus, consumer reporting or
							reference agencies such as Bankers Association of the Philippines, Credit Information
							Corporation, and the Credit Management Association of the Philippines for the purpose
							of credit investigation, consumer reporting, or for reports of my credit history and
							account updates.
						</li>
						<li className='head4'>
							4. Share my information to other YGC companies, subsidiaries, and affiliates and
							necessary third parties for any legitimate business purpose. | am assured that
							security systems and data sharing agreements are employed to protect my information.
						</li>
						<li className='head4'>
							5. Inform me of future customer campaigns and base its offer using the personal and
							sensitive personal information that | shared with the company.
						</li>
					</ol>
					<Paragraph className='head4'>
						| also acknowledge and warrant that | have acquired the consent from all parties
						relevant to this consent and hold free and harmless and indemnify RLFC/RRC from any
						complaint, suit, or damages which any party may file or claim in relation te my consent.
					</Paragraph>
					<Paragraph className='head4'>
						"Includes, but not limited to, the following: full legal name, gender, date of birth,
						nationality, civil status, permanent address, present address, tax identification number
						and other government-issued identification numbers, mobile number, home number, office
						contact details, company name, job position or rank, office address, source of funds,
						gross annual income, among others
					</Paragraph>
					<Text className='head4'>
						Signed this<span className='line-Bottom'></span>day of
						<span className='line-Bottom'></span>20<span className='line-Bottom'></span>at
						<span className='line-Bottom'></span>City.
					</Text>
				</Row>
			</div>
		</div>
	);
};

export default OpeningsFormMmp;
