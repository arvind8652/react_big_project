import React from 'react';
import { Row, Col, Typography } from 'antd';
const { Title, Text } = Typography;
import './IMAPersonal.scss';

const IMAPersonal = () => {
	return (
		<div className='main-data'>
			<Row justify='end'>NON-DISCRETIONARY</Row>
			<Row justify='center'>
				<Title className='header'>RCBC</Title>
			</Row>
			<Row justify='end'>
				<Title style={{ fontSize: 20 }}>
					IMA NO.<span className='empty-space '></span>
				</Title>
			</Row>
			<Row justify='center'>
				<Title style={{ fontSize: 20 }}>INVESTMENT MANAGEMENT AGREEMENT</Title>
			</Row>
			<Row>
				<Title style={{ fontSize: 15 }}>KNOW ALL MEN BY THESE PRESENTS:</Title>
			</Row>
			<Row>
				<Text>
					This Investment Management Agreement (“Agreement”), made and executed this
					<span className='empty-space '></span> <sup>th</sup> &nbsp; day of
					<span className='empty-space '></span>, <span className='empty-space '></span>, at Makati
					City, Philippines, by and between:
				</Text>
				{/* This Investment Management Agreement (“Agreement”), made and executed this ___th day of
				___________, ____, at Makati City, Philippines, by and between: */}
			</Row>
			<Row className='content-padd'>
				<Text>
					<span className='empty-space-add  '></span>
					<br />
					<span className='empty-space-add  '></span>
					<Row>
						of legal age, with address at <span className='empty-space-1'></span>,
					</Row>
					<Row>hereinafter referred to as the "PRINCIPAL/S";</Row>
				</Text>
			</Row>
			<Row justify='center'>
				<Text>- and -</Text>
				<br />
			</Row>
			<Row className='content-padd'>
				<Text>
					<span className='text-bold'>RIZAL COMMERCIAL BANKING CORPORATION</span>, a universal
					banking corporation organized and existing under and by virtue of Philippine laws with
					principal office address at the Yuchengco Tower, RCBC Plaza, 6819 Ayala Avenue, Makati
					City, with authority to perform trust and fiduciary functions through its Trust and
					Investments Group, hereinafter referred to as
					<span className='text-bold'>"INVESTMENT MANAGER"</span>.
				</Text>
			</Row>
			<Row justify='center'>
				<Text>
					<span className='text-bold'>WITNESSETH: That -</span>
				</Text>
			</Row>
			<Row className='indent'>
				<Text>
					<span className='text-bold'>WHEREAS</span>, the PRINCIPAL/S desire to avail of the
					services of the INVESTMENT MANAGER relative to the management and investment of
					PRINCIPAL/S' investible funds;
				</Text>
			</Row>
			{/* <Row>
				<Text></Text>
			</Row> */}
			<Row className='indent'>
				<Text>
					<span className='text-bold'>WHEREAS</span>, the INVESTMENT MANAGER is willing to render
					the services required by the PRINCIPALS relative to the management and investment of
					PRINCIPAL/S' investible funds, subject to the terms and conditions hereunder stipulated;
				</Text>
			</Row>
			<Row className='indent'>
				<Text>
					<span className='text-bold'>NOW, THEREFORE</span>, for and in consideration of the
					foregoing and of the mutual conditions stipulated hereunder, the parties hereto hereby
					agree and bind themselves to the following terms and conditions:
				</Text>
			</Row>

			<Row>
				<Text>
					1. <span className='text-ind'>Delivery of the PORTFOLIO.</span>
					<span>
						Upon execution of this Agreement or immediately thereafter, the PRINCIPAL shall deliver
						to the INVESTMENT MANAGER cash in the amount of{' '}
						<span className='text-bold'>
							PESOS//US DOLLAR/THIRD CURRENCY DENOMINATION: <span className='empty-space '></span>{' '}
							(PHP/US$/Third Currency <span className='empty-space '></span> ),
						</span>{' '}
						Philippine/US/Third currency.
					</span>
				</Text>
			</Row>
			<Row>
				<Text>
					2. <span className='text-ind'>Composition.</span>
					The fund(s) which the PRINCIPAL/S have delivered or shall deliver to the INVESTMENT
					MANAGER as well as such securities, properties or assets in which said cash and/or assets
					will be invested, the proceeds, interest, dividends and income or profits realized from
					the management, investment and reinvestment thereof, shall constitute the managed funds
					and shall hereafter be designated and hereinafter referred to as the "PORTFOLIO". Unless
					the context clearly requires otherwise or unless otherwise specified, the term “portfolio”
					or “PORTFOLIO” as used herein or in subsequent communications between the parties hereto
					shall include both principal and the income of the PORTFOLIO. For purposes of this
					Agreement, the term "securities” shall be deemed to include commercial papers, shares of
					stock, financial instruments or other securities as the term is defined or understood
					under the Securities Regulation Code (Republic Act No. 8799) as the same may be amended or
					replaced. The PORTFOLIO shall be established and maintained at level/s allowed by the
					Bangko Sentral ng Pilipinas (BSP).
				</Text>
			</Row>
			<Row>
				<Text>
					3. <span className='text-ind'>Additional Delivery of Funds.</span>
					At any time hereafter and from time to time at the discretion of the PRINCIPAL/S, the
					PRINCIPAL/S may deliver additional funds, including foreign currency denomination, to the
					INVESTMENT MANAGER which shall form part of the PORTFOLIO and shall be subject to the same
					terms and conditions of this Agreement. No formalities other than a letter from the
					PRINCIPAL/S and delivery of such funds to the INVESTMENT MANAGER in a manner acceptable to
					the latter, whether physical, electronic or in any other manner of delivery not prohibited
					by law, shall be required for any addition to the PORTFOLIO. The PRINCIPAL/S fully
					understand that contributions of funds in foreign currency denomination to the PORTFOLIO
					shall always be subject to compliance by the PRINCIPAL/S to the Manual of Regulations on
					Foreign Exchange Transactions (MORFXT) of the BSP.
				</Text>
			</Row>
			<Row>
				<Text>
					4.{' '}
					<span className='text-ind'>
						Nature of the Agreement. THIS AGREEMENT ESTABLISHES AND CREATES AN AGENCY AND DOES NOT
						CREATE A TRUST. AS SUCH, THE PRINCIPAL SHALL AT ALL TIMES RETAIN LEGAL TITLE TO THE
						FUNDS AND ASSETS COMPRISING THE PORTFOLIO. Non-Guaranty of Yield, Return or Income. THIS
						AGREEMENT IS INTENDED TO FACILITATE FINANCIAL RETURN AND THE APPRECIATION OF THE ASSETS
						COMPRISING THE PORTFOLIO. THIS AGREEMENT DOES NOT GUARANTEE A YIELD, RETURN OR INCOME BY
						THE INVESTMENT MANAGER. PAST PERFORMANCE OF THE ACCOUNT IS NOT A GUARANTEE OF FUTURE
						PERFORMANCE. THE INCOME OF THE PORTFOLIO AND ITS INVESTMENTS MAY FALL AS WELL AS RISE
						DEPENDING ON PREVAILING MARKET CONDITIONS. Non PDIC Coverage. IT IS UNDERSTOOD THAT THIS
						AGREEMENT IS NOT A DEPOSIT AND IS NOT COVERED BY THE PHILIPPINE DEPOSIT INSURANCE
						CORPORATION (PDIC) AND THAT LOSSES, IF THERE BE ANY, SHALL BE FOR THE ACCOUNT OF THE
						PRINCIPAL
					</span>
				</Text>
			</Row>
			<Row>
				<Text>
					5. <span className='text-ind'>Account Number.</span>
					For purposes of opening and operating the account subject of this Agreement, the
					INVESTMENT MANAGER has designated{' '}
					<span className='text-bold'>RCBC Account No. (IMA)</span>
					<span className='empty-space '></span> the account number.
				</Text>
			</Row>
			<Row>
				<Text>
					6. <span className='text-ind'>Terms and Conditions of Administration.</span>
					Subject to the written instructions of the PRINCIPAL/S, the INVESTMENT MANAGER and its
					successors, during the effectivity of this Agreement, shall have the power and authority
					to hold, manage, administer, convert, sell, assign, alter, divide, invest and reinvest the
					PORTFOLIO, without distinction between principal and income. In addition to any other
					power or authority specified herein and/or expressly conferred upon it by law and subject
					to prior written approval from the PRINCIPAL/S, the INVESTMENT MANAGER shall have the
					power to do all other acts which in its judgment are necessary, reasonable, advisable or
					desirable for the proper administration and disposition of the PORTFOLIO or to accomplish
					its purpose, although such powers, rights and acts not specifically enumerated in this
					Agreement.
				</Text>
			</Row>
			<Row>
				<Text>
					7. <span className='text-ind'>Investment Instructions.</span>
					The PRINCIPAL/S shall have direct control and administration of the PORTFOLIO and shall
					provide his written instructions to the INVESTMENT MANAGER to hold, invest, and reinvest
					the PORTFOLIO and keep the same invested in peso and/or foreign currency denominated
					investments, and subject to the BSP regulations and the MORFXT, without distinction
					between principal and income/interest, in: <br /> <br />
					<Row>
						a) Traditional deposit products of universal banks and commercial banks (UKBs) in the
						Philippines with long-term credit rating of at least AA- or its equivalent by a third
						party credit assessment agency recognized by the BSP;
					</Row>
					<Row>
						b) Evidences of indebtedness of the Republic of the Philippines and of the BSP, and any
						other evidences of indebtedness or obligations the servicing and repayment of which are
						fully guaranteed by the government of the Republic of the Philippines or loans against
						such government securities,
					</Row>
					<Row>
						c) Loans fully guaranteed by the government as to the payment of principal and interest,
					</Row>
					<Row>
						d) Tradable securities issued by the government of a foreign country or any
						supranational entity with long-term credit rating of at least AA- or its equivalent by a
						third party credit assessment agency recognized by the BSP;
					</Row>
					<Row>
						e) Loans fully secured by hold out on, or assignment or pledge of, deposits maintained
						either with the bank proper or other banks, or of deposit substitutes of the bank, or of
						mortgage and chattel mortgage bonds issued by the INVESTMENT MANAGER;
					</Row>
					<Row>
						f) Loans fully secured by real estate and chattels in accordance with with Secs. 303,
						143 (Credit granting and loan evaluation/analysis process and underwriting standards)
						and 301 (Additional requirements) of the Manual of Regulations for Banks (MORB).
					</Row>
					<Row>
						g) Securities, whether in the character of debt or equity, such as stocks, whether
						preferred or common or any other class or character; or in securities issued by private
						corporations, public corporations or municipal corporations or entities; or in debt
						instruments or other debt securities such as but not limited to bonds, notes, fixed
						income securities, commercial papers, banker’s acceptances, promissory notes, whether
						secured or unsecured, repurchase agreements, certificates of participation, money market
						instruments and other interest bearing securities issued or negotiated by any money
						market dealer or financial intermediary or institution or by the Republic of the
						Philippines or any of its instrumentalities, certificates of deposits of banks or of the
						INVESTMENT MANAGER’S banking department; in real or personal property of whatever kind,
						class or character and wherever situated; provided that the INVESTMENT MANAGER may keep
						any portion of the PORTFOLIO at any particular time in a savings and/or other interest
						bearing account with its banking department; and provided finally that the INVESTMENT
						MANAGER is authorized to effect any investment or reinvestment of the PORTFOLIO in a
						common trust fund or any other pooled fund investment allowed under existing banking
						laws or regulations which the INVESTMENT MANAGER may have established or shall
						establish;
					</Row>
					<Row>
						h) Other investments or loans as may be directed or authorized by the PRINCIPAL/S in a
						separate written instrument, provided that said written instrument shall contain the
						following minimum information (a) the transaction to be entered into; (b) the
						amount/property involved, (c) the name of the issuer, in case of securities, or the name
						of the borrower, in case of loans, and (d) the terms of security, including the
						collateral(s) or security(ies), if any; provided, further that said written instrument
						may either refer to a specific transaction or may be continuing in nature as may be
						legally appropriate. The PRINCIPAL/S shall direct the INVESTMENT MANAGER in writing for
						purposes of making investment in government securities or registered commercial papers
						or papers or other fixed income instruments or certain loans to any of the borrowers in
						the list approved by the PRINCIPAL/S;
					</Row>
					<Row>
						i) To sell, transfer, lend or assign money or property to or to purchase or acquire
						property or debt instruments or to invest in equities or in securities as the same is
						defined under existing securities law issued and/or underwritten by the INVESTMENT
						MANAGER or to any of its departments, directors, officers, stockholders or employees or
						relatives within the first degree of consanguinity or affinity, or the related interests
						of such directors, officers and stockholders; or from any corporation where the
						INVESTMENT MANAGER owns at least fifty percent (50%) of the subscribed capital or voting
						stock in its own right, considering the best interest of the PORTFOLIO at all times and
						in doing so, shall be deemed fully authorized by this Agreement; and,
					</Row>
					<Row>
						j) To sell, transfer, assign or lend money or property from one trust or fiduciary
						account to another trust or fiduciary account.
					</Row>
					<Row>
						The PRINCIPAL/S fully understand that any foreign exchange acquired or received as
						dividends/earnings or divestment proceeds on such investment are intended for
						reinvestment abroad, the same proceeds are not required to be inwardly remitted and sold
						for pesos through authorized agent banks; Provided, that such proceeds are reinvested
						abroad within two (2) banking days from receipt of the funds abroad.
					</Row>
				</Text>
			</Row>
			<Row>
				<Text>
					8. <span className='text-ind'>Powers and Duties of the INVESTMENT MANAGER.</span>
					In the administration and management of the PORTFOLIO, subject to the written instructions
					of the PRINCIPAL/S, the INVESTMENT MANAGER, in addition to the powers authorized by law,
					shall have the power and authority to perform any and all of the following acts and
					things: <br /> <br />
					<Row>
						a) To treat the PORTFOLIO as one aggregate amount, without distinction as to principal
						or income, for the purpose of investment or reinvestment or to hold it in cash and/or
						deposit all or any part hereof with the INVESTMENT MANAGER’s own savings/current
						accounts department pending its investment or reinvestment;
					</Row>
					<Row>
						b) To retain the PORTFOLIO in Philippine Pesos or convert all or any part thereof to any
						major currency, subject to existing regulations, the MORB and MORFXT, for the purpose of
						investing the same in (i) any locally established or locally managed collective trust
						plans or any unit trust funds including those plans or funds established, maintained or
						managed by the INVESTMENT MANAGER, its branches, offices, subsidiaries or affiliates,
						when the same appears practicable and for the best interest of the PORTFOLIO or in (ii)
						any foreign currency denominated investment duly approved by the INVESTMENT MANAGER’s
						Trust Committee.
					</Row>
					<Row>
						c) To cause any property or asset of the PORTFOLIO to be issued, held or registered in
						the name of the PRINCIPAL/S or in the name of the INVESTMENT MANAGER, or in the name of
						a nominee, provided, that in the latter two cases the instrument shall indicate that the
						INVESTMENT MANAGER or nominee is acting in a representative capacity and that the name
						of the PRINCIPAL/S is disclosed thereat;
					</Row>
					<Row>
						d) To exercise any right or privilege inherent or incident to the ownership of stock or
						property including the right to vote, issue proxies or consent to the reorganization,
						consolidation, or merger of any corporation, company or entity in which the PORTFOLIO
						owns shares or has an interest, grant options, exercise conversion rights or privileges,
						exercise rights to subscribe to or purchase additional securities;
					</Row>
					<Row>
						e) To endorse, sign, execute and deliver any and all securities, instruments, documents
						or contracts necessary, proper, incidental to or connected with the exercise of any
						power or discretion hereunder or subsequently conferred upon the INVESTMENT MANAGER or
						the performance of acts herein authorized, and further in this regard, the PRINCIPAL/S
						hereby irrevocably appoints the INVESTMENT MANAGER as Attorney-In-Fact, with full power
						and authority to ask, demand, sue for, recover, collect and receive any and all sums of
						money, debts, due accounts, interests, dividends and other things of value of whatever
						nature, kind or character as may now be or may hereafter become due, owing, payable or
						belonging to the PORTFOLIO, and to sue, defend, and take any and all lawful action, ways
						and means for the recovery thereof by suit, attachment, compromise, settlement,
						arbitration or otherwise;
					</Row>
					<Row>
						f) To open and maintain a savings and/or checking account as may be considered necessary
						or convenient from time to time in the performance of the agency and the authority
						herein conferred upon the INVESTMENT MANAGER;
					</Row>
					<Row>
						g) To collect, receive and issue receipt for the return of matured securities,
						investments, proceeds, income, profits, interests, payments and all other sums accruing
						to or due to the PORTFOLIO;
					</Row>
					<Row>
						h) To pay such taxes as may be assessed, imposed or required by law to be withheld or
						paid in respect or on account of the PORTFOLIO or in respect of any profit, income or
						gains derived from the investment, sale or disposition of securities or other properties
						constituting part of the PORTFOLIO and whenever warranted in the opinion of counsel, to
						litigate, compromise or pay such taxes, and the litigation, compromise or payment of
						such taxes shall be binding and conclusive upon the PRINCIPAL/S;
					</Row>
					<Row>
						i) To pay out of the PORTFOLIO all costs, charges, expenses incurred in connection with
						the investments or the administration and management of the PORTFOLIO including the
						compensation of the INVESTMENT MANAGER for its services relative to the PORTFOLIO;
					</Row>
					<Row>
						j){' '}
						<span className='heighlight'>
							To commingle the PORTFOLIO with other investment management accounts subject to
							compliance to all of the following conditions:
						</span>
					</Row>
					<Row>
						<Text className='opt-ind '>
							<Row>
								<span className='heighlight'>
									(i) The investment of each of the IMAs in the commingled fund shall at least be
									P100,000.00;
								</span>
							</Row>
							<Row>
								<span className='heighlight'>
									(ii) The commingled funds shall only be invested in (i) securities directly issued
									by the Philippine National Government; (ii) exchange-traded equities and fixed
									income securities (including those issued offshore) and commercial papers,
									Provided, That these securities/papers are registered with the Securities and
									Exchange Commission (SEC), (iii) securities issued by banks incorporated in the
									Philippines, except those issued through the trust units, or (iv) securities
									issued by other sovereigns that are exempt from registration under Section 9(b) of
									the Securities Regulation Code;
								</span>
							</Row>
							<Row>
								<span className='heighlight'>
									(iii) The commingling of funds and the manger of termination of the same shall be
									specifically agreed in writing by the PRINCIPALS. The INVESTMENT MANAGER shall
									ensure that the agreement to commingle funds with other IMAs is legally binding
									and enforceable. Furthermore, the risks associated with commingling of funds, such
									as market liquidity risk, shall be fully disclosed to the clients;
								</span>
							</Row>
							<Row>
								<span className='heighlight'>
									(iv) The INVESTMENT MANAGER shall determine that it possesses the operational
									capability to manage the IMAs participating in commingled funds. In doing so, the
									INVESTMENT MANAGER shall undertake as assessment taking the following into
									consideration: (a) sufficiency of personnel handling commingled IMAs; (ii)
									capability of existing systems to accurately and readily identify the allocation
									of each investor in a commingled fund and generate the following information on a
									per IMA basis, at a minimum: accruals, coupons received, dividends received,
									mark-to-makrte gains or losses and required reports; and (iii) ability to conduct
									periodic reconciliation of relevant records; and
								</span>
							</Row>
							<Row>
								<span className='heighlight'>
									(v) The maximum number of IMAs that can be commingled into one fund shall be
									determined by the INVESTMENT MANAGER based on its own operational capability to
									commingle IMAs.
								</span>
							</Row>
						</Text>
					</Row>
					<Row>
						k) To keep and maintain books of account and/or records of the management and operation
						of the PORTFOLIO;
					</Row>
					<Row>
						l) Unless revoked, to open and maintain in my behalf, a securities custodianship
						agreement with a BSP Accredited Securities Custodian; and
					</Row>
					<Row>
						m) To perform such other acts or make, execute and deliver such other instruments
						necessary or proper for the exercise of any of the powers or authorities conferred
						herein, or to accomplish any of the purposes hereof.
					</Row>
					<Row>
						The INVESTMENT MANAGER is authorized to purchase, invest, reinvest, sell, transfer or
						dispose foreign currency-denominated financial instruments, including securities as
						defined in Section 3 of the revised Securities Regulation Code (SRC), through a
						distributor or underwriter duly authorized or licensed by the government of the issuer
						of such instruments, or a counterparty financial institution (seller or buyer)
						authorized in writing by the PRINCIPAL/S and/or accredited by the INVESTMENT MANAGER;
						Provided, That, the conduct, documentation, and settlement of any of these transactions
						shall be outside Philippine jurisdiction.
					</Row>
				</Text>
			</Row>
			<Row>
				<Text>
					9. <span className='text-ind'>Degree of Discretion.</span>
					The Degree of Discretion which the PRINCIPAL/S granted to the INVESTMENT MANAGER under
					this Agreement shall be based on the PRINCIPAL/S’ written directives or limited to
					specific securities or properties which are expressly stipulated in this Agreement or upon
					written instruction of the PRINCIPAL/S.
				</Text>
			</Row>
			<Row>
				<Text>
					10.
					<span className='text-ind'>Exemption from Liability.</span>
					Except for fraud, bad faith, willful default, gross misconduct, gross or willful
					negligence on the part of the INVESTMENT MANAGER or any person acting in its behalf, the
					INVESTMENT MANAGER shall be held free and harmless from any liability, claim, damage or
					fiduciary responsibility, cost or expense arising out of or in connection with:
					<br />
					<br />
					<Row>
						(a) any act done or performed or caused to be done or performed by the INVESTMENT
						MANAGER pursuant to the terms and conditions herein agreed or in the good faith exercise
						of any discretion, judgment, power or authority conferred herein or in any subsequent
						authority granted by the PRINCIPAL/S to the INVESTMENT MANAGER or in the good faith
						compliance with the written instructions or directions of the PRINCIPAL/S delivered to
						the INVESTMENT MANAGER in accordance with Section 20 of this Agreement (which shall
						always be for the sole and exclusive account and risk of the PRINCIPAL/S) and neither
						shall the INVESTMENT MANAGER be liable for refraining to do any act, where such
						inaction, in the good faith judgment of the INVESTMENT MANAGER, is necessary or
						appropriate for the proper and advantageous administration or preservation of the
						PORTFOLIO; provided, that in the interpretation of the Agreement nothing herein shall be
						construed as binding the INVESTMENT MANAGER to provide a fixed rate of return and;
						provided that the grant of judgment, discretion, power or authority in favor of the
						INVESTMENT MANAGER shall not in any case be construed as creating, binding or imposing
						upon the INVESTMENT MANAGER an obligation or duty to exercise the same;
					</Row>
					<Row>
						(b) any investment made pursuant to this Agreement due to or on account of the default,
						bankruptcy or insolvency of the borrower or issuer or the broker or dealer handling the
						transaction or their failure in any manner to comply with any of their obligations under
						the aforesaid transaction(s) it being understood that, except as indicated above, all
						investments and reinvestments of the PORTFOLIO shall be strictly for the account and
						risk of the PRINCIPAL/S;
					</Row>
					<Row>
						(c) any default, breach or negligence of any third party in the delivery of valid
						documents relating to the PORTFOLIO including but not limited to share certificates or
						in making payments relating to the PORTFOLIO;
					</Row>
					<Row>
						(d) any and all liabilities and/or damage which may be incurred by the PRINCIPAL/S in
						the proper and lawful discharge by the INVESTMENT MANAGER of its power and duties as
						authorized herein and the INVESTER MANAGER shall have a lien on the PORTFOLIO for the
						amount of such liability, damage or injury incurred and/or sustained by the INVESTMENT
						MANAGER; and
					</Row>
					<Row>
						(e) any act, omission or delay done or performed or caused to be done or performed by
						the INVESTMENT MANAGER in accordance with, pursuant to or in its good faith reliance on:
						(i)the orders, judgments, decrees or writs issued by courts of competent jurisdiction or
						directives issued by governmental regulatory agencies, even if, thereafter, such order,
						judgment, decree, writ, or directive is subsequently reversed, modified, annulled, set
						aside or vacated; (ii) the advice of lawyers, accountants and other professionals,
						whether in-house or separately engaged, in reference to any matter under this Agreement;
						(iii) the opinion of its inhouse signature verifier(iers) based on specimen(s) of
						signature(s) provided or which will subsequently be provided by the PRINCIPAL/S or on
						specimens of the signature appearing in this Agreement; and (iv) documents submitted to
						it, including e-mail instructions, it being understood that the INVESTMENT MANAGER is
						authorized not to look beyond such documents or determine their genuineness, validity,
						sufficiency, authenticity or correctness including the correctness of the facts
						contained in any order, judgment, certification, demand,notice, instrument or other
						writing delivered to it and may act in reliance upon any instrument or signature
						believed to be genuine.
					</Row>
					<Row>
						The INVESTMENT MANAGER shall not be liable for any failure or delay in acting on any of
						the written instructions by reason of any breakdown or failure of transmission or
						communication equipment or facilities or communication (including without limitation any
						misdirection of the written instruction within RCBC) for any reason, or any cause beyond
						the control of the INVESTMENT MANAGER.
					</Row>
					<Row>
						The INVESTMENT MANAGER shall have a lien on the PORTFOLIO for the amount of any loss,
						liability, damage, injury, cost or expense incurred, sustained or suffered by the
						INVESTMENT MANAGER.
					</Row>
				</Text>
			</Row>
			<Row>
				<Text>
					11.
					<span className='text-ind'>Reporting Requirements.</span>
					<Row>
						The INVESTMENT MANAGER shall provide the PRINCIPAL/S with the schedule of earning assets
						not later than twenty (20) calendar days from the end of the reference date/period. . In
						addition, the INVESTMENT MANAGER shall prepare a report covering the foreign currency
						amount and the local currency equivalent of the total cross currency investments with
						details on: (a) the type of investments; and the (b) the amount of cash flow converted.
						Further, the INVESTMENT MANAGER shall submit to the PRINCIPAL/S or to his/their
						representative a confirmation of directed purchase and sale transactions on a monthly
						basis, not later than twenty (20) calendar days from the end of the reference
						date/period.
					</Row>
					<Row>
						In compliance to the MORFXT, the INVESTMENT MANAGER shall ensure that all cash flows
						shall be in pesos. The INVESTMENT MANAGER shall record cross-currency investment
						transactions in the peso regular books at their foreign currency amounts and their local
						currency equivalent using the Philippine Dealing System peso/US dollar closing rate and
						the New York US dollar/third currencies closing rate.
					</Row>
					<span className='sub-text-bold'>
						Accounting on INVESTMENT MANAGER’s Resignation or Removal
					</span>
					- After the resignation or removal of the INVESTMENT MANAGER or after the termination of
					this Agreement, the INVESTMENT MANAGER shall render an accounting to the PRINCIPAL/S.
					<br />
					<span className='sub-text-bold'>Approval of Reports and Accounting</span>
					– The INVESTMENT MANAGER shall submit to the PRINCIPAL/S an accounting of all transactions
					effected by it since the last report up to the date of termination. The reports and/or
					accounting (including final accounting) of transactions issued by the INVESTMENT MANAGER
					may be approved by the PRINCIPAL/S by written approval delivered to the INVESTMENT MANAGER
					or by the failure of the PRINCIPAL/S to express any objection to such report or accounting
					in writing delivered to the INVESTMENT MANAGER within thirty (30) calendar days from the
					date the report or accounting was delivered to the PRINCIPAL/S. Upon receipt of written
					approval of the report or accounting (including final accounting) of transactions, or upon
					the passage of the 30 day period within which objections may be filed without written
					objections having been received by the INVESTMENT MANAGER, such accounting or report shall
					be deemed to have been approved, and the INVESTMENT MANAGER shall be released and
					discharged as to all items, matters, and things set forth in such report or accounting as
					if such report or accounting has been settled and allowed by a decree of a court of
					competent jurisdiction.
					<br />
					<span className='sub-text-bold'>Right of Inspection</span> - The books of accounts or
					records relating to the PORTFOLIO shall be open for inspection by any person or persons
					designated by the PRINCIPAL/S during banking hours and on banking days with at least five
					(5) banking days prior written notice.
				</Text>
			</Row>
			<Row>
				<Text>
					12.
					<span className='text-ind'>Fees.</span>
					The INVESTMENT MANAGER, as compensation for its services hereunder, shall be entitled to
					receive a fee of <span className='empty-space '></span>{' '}
					<span className='heighlight'> (please specify the rate and the terms).</span>
					<Row>
						Upon mutual agreement of the parties, this fee rate, basis for computation and manner of
						collection may be reviewed and adjusted accordingly. Any adjustment shall be applied
						prospectively, shall be made in writing and shall appear in the written authorization
						that the PRINCIPAL/S shall execute upon investment disposition. The manner and frequency
						of charging the fees shall also be covered by the written authorization to be executed
						by the PRINCIPAL/S.
					</Row>
					<Row>
						Incidental expenses and other charges incurred by the INVESTMENT MANAGER in connection
						with the management of the PORTFOLIO, including any value added tax on the trust fees
						shall be for the account of the PRINCIPAL/S. All expenses, charges and fees may, at the
						option of the INVESTMENT MANAGER, without need of any prior notice, be made chargeable
						to the PORTFOLIO.
					</Row>
					<Row>
						The INVESTMENT MANAGER shall be entitled to compensation until and up to whichever is
						the later date between the date this Agreement is terminated or the date that all the
						monies and assets comprising the PORTFOLIO are turned over to the PRINCIPAL/S or
						his/their duly authorized representative.
					</Row>
				</Text>
			</Row>
			<Row>
				<Text>
					13.
					<span className='heighlight'>
						<span className='text-ind'>Withdrawal of Income/Principal</span>
						Withdrawal of Income/Principal - Subject to the availability of funds, the terms and
						conditions of the PORTFOLIO’s investments, the non-diminution of the PORTFOLIO not lower
						than ONE HUNDRED THOUSAND PESOS (P100,000.00), the PRINCIPAL/s may withdraw the
						income/principal of the PORTFOLIO or portion thereof upon written instruction or order
						given to the INVESTMENT MANAGER.
					</span>{' '}
					The INVESTMENT MANAGER shall not be required to see as to the application of the
					income/principal so withdrawn from the PORTFOLIO. Any income of the PORTFOLIO not
					withdrawn shall be accumulated and added to the principal of the PORTFOLIO for further
					investment and reinvestment.
					<Row>
						To ensure a minimum tenor for the investments and subject to BSP rules and regulations,
						the whole or any part of the PORTFOLIO invested for a given period shall not be
						pre-terminated or withdrawn by the PRINCIPAL/S prior to the date of the investment
						maturity. The INVESTMENT MANAGER shall secure prior written instructions from the
						PRINCIPAL/S to allow and arrange any pre-termination according to such rules or market
						conventions (including the fixing of penalties).
					</Row>
				</Text>
			</Row>
			<Row>
				<Text>
					14.
					<span className='text-ind'>
						Non-alienation or Encumbrance of the PORTFOLIO or Income.
					</span>
					During the effectivity of this Agreement, the PRINCIPAL/S shall not assign or encumber the
					PORTFOLIO or its income or any portion thereof in any manner whatsoever to any person
					without the written consent of the INVESTMENT MANAGER.
				</Text>
			</Row>
			<Row>
				<Text>
					15.
					<span className='text-ind'>Exemption From Bond.</span>
					The INVESTMENT MANAGER shall not be required to give any bond or other security for the
					faithful performance of its duties hereunder.
				</Text>
			</Row>
			<Row>
				<Text>
					16.
					<span className='text-ind'>Notice of Termination.</span>
					This Agreement shall remain in full force and effect until terminated by a party hereto by
					giving the other party at least thirty (30) days prior written notice, in which case,
					following the effectivity of the termination, the INVESTMENT MANAGER shall be released and
					shall have no duty, liability or obligation other than to keep custody of the monies,
					assets and properties comprising the PORTFOLIO and to release the same to the PRINCIPAL/S
					or his/their duly authorized representative.
				</Text>
			</Row>
			<Row>
				<Text>
					17.
					<span className='text-ind'>Turnover of PORTFOLIO.</span>
					In the event of termination of this Agreement, the INVESTMENT MANAGER shall, upon written
					instructions of the PRINCIPAL/S, transfer and turn over to the PRINCIPAL/S or such party
					as may be authorized by the PRINCIPAL/S to receive the PORTFOLIO, all the assets of the
					PORTFOLIO which may or may not be in cash less applicable fees and charges provided in
					this Agreement in carrying out its functions or in the exercise of its powers and
					authorities.
				</Text>
			</Row>
			<Row>
				<Text>
					18.
					<span className='text-ind'>Powers upon Liquidation.</span>
					The powers, duties and discretion conferred upon the INVESTMENT MANAGER by virtue of this
					Agreement shall continue for the purposes of liquidation and return of the PORTFOLIO,
					after the notice of termination of this Agreement has been served in writing, until final
					delivery of the PORTFOLIO to the PRINCIPAL/S or his/their duly authorized representative.
				</Text>
			</Row>
			<Row>
				<Text>
					19.
					<span className='text-ind'>Indemnification.</span>
					The PRINCIPAL/S shall indemnify the INVESTMENT MANAGER for any loss, liability or damage
					that the INVESTMENT MANAGER may suffer, sustain or incur in connection with this
					Agreement, except where such loss, liability or injury is due to the fraud, bad faith,
					willful default, gross misconduct, or gross or willful negligence of the INVESTMENT
					MANAGER.
				</Text>
			</Row>
			<Row>
				<Text>
					20.
					<span className='text-ind'>Tax Confirmation.</span>
					The PRINCIPAL/S hereby understand and confirm that taxes on dividends and/or capital gains
					which may be withheld by the accredited RCBC counterparty/ies or issuer of the stocks
					listed or traded in any accredited foreign stock exchange shall be for the PRINCIPAL/S’
					exclusive account and disposition. The PRINCIPAL/S hereby confirm that he/she/they shall
					be responsible for the filing, with the Bureau of Internal Revenue (BIR) of its Philippine
					income tax return and the remittance and timely payment of taxes on the income derived
					from his/her/their investments, reinvestments or disposition/sale of shares and other
					fixed income securities listed or traded in any accredited foreign stock exchange under
					this RCBC Account No. (IMA) No.<span className='empty-space '></span>.
				</Text>
			</Row>
			<Row>
				<Text>
					21.
					<span className='text-ind'>Notices.</span>
					(a) Any instruction, notice or report which by any provision of this Agreement is required
					or permitted to be given to or to be served by the INVESTMENT MANAGER or the PRINCIPAL/S
					may be given or served by: (i) personal delivery; (ii) transmitted by postage prepaid
					registered mail (airmail if international) or by internationally recognized courier
					service; (iii) transmitted by electronic mail or electronic transmission in pdf form; or
					(iv) transmitted by facsimile to either Party at the addresses and facsimile numbers{' '}
					<span className='heighlight'>
						set forth beneath their names of the signature pages hereof or at the start of this
						Agreement.
					</span>
					<br />
					(b) Except as otherwise specified herein, all notices and other communications shall be
					deemed to have been duly given on: (i) the date of receipt if delivered personally; (ii)
					the date ten (10) days after the date of posting if transmitted by mail or five (5) days
					after delivery to the courier; (iii) the date of receipt if transmitted by electronic mail
					or electronic transmission; or (iv) the next Banking Day in the place of address following
					the date of transmission with confirmed answerback if transmitted by facsimile, whichever
					shall occur first; provided, that with respect to (ii), (iii), and (iv) of this Section,
					if any of the dates provided is not a Banking Day in the place to which any notice is
					sent, such notice or other communication shall be deemed delivered on the next following
					Banking Day at such place; provided further, that any party transmitting any notice or
					other communication in pdf form by electronic mail or electronic transmission shall,
					within five (5) Banking Days from the date (or deemed date) of delivery and without in any
					way altering such date (or deemed date) of delivery, deliver to the INVESTMENT MANAGER
					such notice or communication by means of any of the manners of giving such notice under
					(i) or (ii) of this Section{' '}
					<span className='heighlight'>
						{' '}
						but further subject to the Terms and Conditions of E-Instructions, attached as Annex “A”
						and to form an integral part of this Agreement.
					</span>
					<Row>
						(d) Any party may change its address (including e-mail addresses) for purposes hereof by
						notice to the other parties.
					</Row>
					<Row>
						(e) Any communication shall be delivered to the party’s address specified herein or at
						such address as such party notifies to the other party from time to time, and will be
						effective upon receipt.
					</Row>
				</Text>
			</Row>
			<Row>
				<Text>
					22. <span className='text-ind'>Authority to Disclose.</span>
					The PRINCIPAL/S hereby authorize the INVESTMENT MANAGER, any of its branch, subsidiary,
					affiliate, agents, representatives, third party or its duly authorized personnel such as
					but not limited to agency personnel, credit rating agencies, verification agencies, and
					other outsourced service providers engaged by RCBC Trust as allowed by law and internal
					Bank policies, to disclose, hold, transfer and process information relating to your
					account to the BSP, Anti-Money Laundering Council (AMLC), Bureau of Internal Revenue (BIR)
					whenever applicable, or such other relevant regulatory agency and their duly authorized
					representatives, any information in relation to the Account/s with the INVESTMENT MANAGER
					as may be required by law, regulation or agreement. The PRINCIPAL/S agree to indemnify and
					hold the INVESTMENT MANAGER free and harmless, including its officers, directors,
					employees and representatives, against any and all disputes, claims, demands, losses,
					penalties, liabilities, costs and expenses of any kind whatsoever, imposed on, incurred by
					or assessed against the PRINCIPAL/S in respect of or in connection with the information
					provided in relation to the Account/s, the disclosure of such documents and information on
					the Account/s, and the consent herein granted.
				</Text>
			</Row>
			<Row>
				<Text>
					23.
					<span className='text-ind'>Financial Consumer Protection.</span>
					(a) The PRINCIPAL/S is/are given a “cooling period” of two (2) banking days (the “Cooling
					Period”) reckoned from the date of account opening whereby the PRINCIPAL/S is/are allowed
					to revoke, cancel or terminate this Trust by serving the INVESTMENT MANAGER a written
					notice of instruction to cancel within such period. The PRINCIPAL/S understand that when
					availing of the Cooling Period, the withdrawal proceeds shall be net of all set-up,
					transaction and related costs incurred by the INVESTMENT MANAGER when the account was
					opened. The PRINCIPAL/S hereby acknowledge that the liquidation of the FUND shall be
					subject to the prevailing market prices at the time of cancellation or revocation of the
					account and losses, if any, shall be borne by the PRINCIPAL/S.
					<Row>
						<p className='linking-data'>
							(b) The PRINCIPAL/S may send complaints, inquiries or concerns about trust products
							and services to the INVESTMENT MANAGER via electronic mail at{' '}
							<span className='anchor'>customercontact@rcbc.com</span> or call at 63 2 8877 7222
							(877-RCBC). Upon receipt, the INVESTMENT MANAGER shall conduct a comprehensive
							investigation in accordance with its established guidelines and procedures on
							complaints handling and shall notify the client of its findings or results of its
							investigation through the INVESTMENT MANAGER’s choice of communication. The findings
							of the INVESTMENT MANAGER shall be final and conclusive.
						</p>
					</Row>
					<Row>
						<p className='linking-data'>
							(c) The INVESTMENT MANAGER is regulated by the BSP, through its Trust Specialist
							Group. Alternatively, the PRINCIPAL/S may file his/their complaint at the BSP
							Financial Consumer Department via electronic email at{' '}
							<span className='anchor'> consumeraffairs@bsp.gov.ph</span> &nbsp; or call at 632 8708
							7087. The BSP Online Buddy (BOB) may be accessed by financial consumers through the
							following portals:
						</p>
					</Row>
					<Row>
						<Text className='opt-ind'>
							(i) BSP Webchat: http://www.bsp.gov.ph/; <br />
							(ii) SMS: 021582277 (for Globe subscribers only; for other network subscribers, BOB
							will also be made available soon); and <br />
							(iii) BSP Facebook: https://www.facebook.com/BangkoSentralngPilipinas/.
						</Text>
					</Row>
					<Row>
						(d) The PRINCIPAL/S may provide feedback about the financial products and services
						rendered by the INVESTMENT MANAGER in order for the INVESTMENT MANAGER to improve its
						products and services. The PRINCIPAL/S may send feedback via electronic mail or
						telephone communications to the contact details provided in the above Section.
					</Row>
				</Text>
			</Row>
			<Row>
				<Text>
					24.
					<span className='text-ind'>Amendments to the Agreement.</span>
					No amendment, novation, modification or supplement of this Agreement shall be valid or
					binding unless in writing and signed by the parties hereto.
				</Text>
			</Row>
			<Row>
				<Text>
					25.
					<span className='text-ind'>Miscellaneous – Joint “And” “And/Or” Principals.</span>
					For <span className='text-bold'> Joint “AND” accounts,</span> the PRINCIPAL/S authorize
					the INVESTMENT MANAGER to execute and deliver documents, to withdraw fully or partially
					the FUND or to terminate this Agreement, or to issue receipts, releases or discharges in
					connection with this Agreement upon the order of ALL of the signatories submitted to the
					INVESTMENT MANAGER. Where there is more than one principal and their interests herein is
					an <span className='text-bold'>“and/or”</span> or{' '}
					<span className='text-bold'> “or” </span>capacity, it is understood and agreed that the
					PRINCIPAL/S are duly authorized to exercise the full powers of a principal, either singly
					or jointly, including but not limited to the power to issue instructions or approvals, to
					grant or confer further authorities upon the INVESTMENT MANAGER, to execute and deliver
					documents, to withdraw fully or partially the FUND or to terminate this Agreement, or to
					issue receipts, releases or discharges in connection with this Agreement. In the case of
					full withdrawal of the FUND or the termination of this Agreement, a PRINCIPAL/S shall, by
					issuing a letter of instruction directing full withdrawal of funds and/or property or for
					the termination of this investment management account, be conclusively deemed to represent
					and warrant to the INVESTMENT MANAGER, under the penalties of perjury, that his/her
					co-principals are still living. The INVESTMENT MANAGER shall be held free and blameless
					and shall be indemnified by the PRINCIPAL/S issuing the instructions should this
					representation or warranty turn out to be false and untrue. This stipulation shall survive
					this Agreement. 26. This Agreement and its interpretation shall be governed by the laws of
					the Republic of the Philippines.
				</Text>
			</Row>
			<Row>
				<Text>
					26. <span className='text-ind'>Electronic Instruction Agreement</span>
					The PRINCIPAL/S and the INVESTMENT MANAGER hereby agree to comply to the{' '}
					<span className='text-bold'> Terms and Conditions of the E-Instructions (EI) </span>,
					attached hereto as <span className='text-bold'> Annex “A” </span> and which shall form an
					integral part of this Agreement.
				</Text>
			</Row>
			<Row className='indent'>
				IN WITNESS WHEREOF, the parties hereto have signed this Agreement on the date and at the
				place first above-mentioned.
			</Row>
			<Row className='add-space'>
				<Col span={12}>
					<Col>
						<span className='text-bold'>PRINCIPAL/S:</span>
					</Col>
				</Col>
				{/* RIZAL COMMERCIAL BANKINGCORPORATION TRUST AND INVESTMENTS GROUP INVESTMENT MANAGER By: */}
				<Col span={12}>
					<Col>
						<span className='text-bold'>RIZAL COMMERCIAL </span>
					</Col>
					<Col>
						<span className='text-bold'>BANKINGCORPORATION</span>
					</Col>
					<Col>
						<span className='text-bold'> TRUST AND INVESTMENTS GROUP</span>
					</Col>
					<Col>
						<span className='text-bold'> INVESTMENT MANAGER</span>
					</Col>
					<Col>
						<span className='text-bold'> By:</span>
					</Col>
				</Col>
			</Row>
			<Row className='add-space'>
				<Col span={12}>
					<span className='empty-space-two added-size'></span>
					<Col>Print Complete Name</Col>
				</Col>
				<Col span={12}>
					<span className='empty-space-two added-size'></span>
					<Col>Authorized Signatory</Col>
				</Col>
			</Row>
			<Row className='add-space'>
				<Col span={12}>
					<span className='empty-space-two added-size'></span>
					<Col>Print Complete Name</Col>
				</Col>
				<Col span={12}>
					<span className='empty-space-two added-size'></span>
					<Col>Authorized Signatory</Col>
				</Col>
			</Row>
			<Row className='add-space'>
				<Col span={12}>
					<span className='empty-space-two added-size'></span>
					<Col>Print Complete Name</Col>
					<span className='empty-space-two added-size'></span>
					<Col>Print Complete Name</Col>
					<span className='empty-space-two added-size'></span>
					<Col>Print Complete Name</Col>
				</Col>
				<Col span={12}>
					RCBC Trust and Investments Group:
					<Row>
						<table className='bor'>
							<tr>
								<th className='bor-heading' rowspan='3'>
									Email Address/es
								</th>
								<td className='bor-data'></td>
							</tr>
							<tr>
								<td className='bor-data'></td>
							</tr>
							<tr>
								<td className='bor-data'></td>
							</tr>
							<tr className='bor'>
								<th className='bor-heading'>Telephone No.</th>
								<td className='bor-data'>(63) (02) 8894-9000</td>
							</tr>
							<tr className='bor'>
								<th className='bor-heading'>Facsimile No.</th>
								<td className='bor-data'>(63) (02) 8878-3377</td>
							</tr>
						</table>
					</Row>
				</Col>
			</Row>
			<Row className='add-space'>
				<Col span={12}>
					Designated by the PRINCIPAL/S:
					<Row>
						<table className='bor'>
							<tr>
								<th className='bor-heading' rowspan='4'>
									Email Address/es
								</th>
								<td className='bor-data'></td>
							</tr>
							<tr>
								<td className='bor-data'></td>
							</tr>
							<tr>
								<td className='bor-data'></td>
							</tr>
							<tr>
								<td className='bor-data'></td>
							</tr>
							<tr className='bor-data'>
								<th className='bor-heading' rowspan='2'>
									Telephone/ Cellphone Nos.
								</th>
								<td className='bor-data'></td>
							</tr>
							<tr>
								<td className='bor-data'></td>
							</tr>
							<tr className='bor'>
								<th className='bor-heading'>Facsimile No.</th>
								<td className='bor-data'></td>
							</tr>
							<tr className='bor'>
								<th className='bor-heading'>Others.</th>
								<td className='bor-data'></td>
							</tr>
						</table>
					</Row>
				</Col>
				<Col span={12}></Col>
			</Row>
			<Row justify='center' style={{ marginTop: 50 }}>
				Witnesses:
			</Row>
			<Row aclassName='add-space'>
				<Col span={12}>
					<span className='empty-space-two added-size-two'></span>
				</Col>
				<Col span={12}>
					<span className='empty-space-two added-size'></span>
				</Col>
			</Row>
			<Row justify='end' className='top-space'>
				<Title style={{ fontSize: 20 }}>Annex “A”</Title>
			</Row>
			<Row justify='center'>
				<Title style={{ fontSize: 20 }}>
					{' '}
					<span className='text-bold'>TERMS AND CONDITIONS OF E-INSTRUCTIONS</span>
				</Title>
			</Row>
			<Row>
				The PRINCIPAL/S and the INVESTMENT MANAGER hereby agree to the following terms and
				conditions of the E-Instructions:
			</Row>
			<Row>
				<Text>
					1. The PRINCIPAL/S shall sign, execute, and/or issue, and/or deliver instructions to the
					INVESTMENT MANAGER via (i) electronic mail messages, (ii) scanned instructions found in
					attachments to electronic mail, or (iii) originally-signed digital bank forms (the
					<span className='text-bold'> “E-mail Instruction”</span>) or (iv) text messages, messages
					using messaging apps and other form of ephemeral electronic communication (the “Ephemeral
					Instruction”), as defined in the 2001 Rules on Electronic Evidence, in relation to the
					administration, management and operation of the Portfolio of the PRINCIPAL/S’ IMA Account
					or as required by the applicable laws and regulations. Both E-mail Instruction and
					Ephemeral Instruction shall hereinafter be collectively referred to as{' '}
					<span className='text-bold'>“E-Instructions”</span> .
				</Text>
			</Row>
			<Row>
				<Text>
					2. For the purpose of implementing the terms of the E-Instructions, the PRINCIPAL/S have
					designated the registered email address, telephone/cellphone number/s or messaging apps on
					the signature page of the Investment Management Agreement (IMA) by which the INVESTMENT
					MANAGER may communicate and/or confirm, through email and/or telephone/cellphone call, the
					authenticity or validity of any and all received E-Instructions. The e-mail address shall
					be referred to as the <span className='text-bold'>“Email Account”</span> .
				</Text>
			</Row>
			<Row>
				<Text>
					3. The PRINCIPAL/S fully understand that the arrangement covered by the E-Instructions
					does not, and will not, cover any and all of the current and future electronic channels
					being made available by RIZAL COMMERCIAL BANKING CORPORATION (RCBC) for use of the
					INVESTMENT MANAGER’ client and which the client have already availed of, or has agreed to
					avail of, and which are subject to the channel’s specific terms and conditions and that
					this special arrangement with the INVESTMENT MANAGER is being adopted for the benefit and
					convenience of all the PRINCIPAL/S.
				</Text>
			</Row>
			<Row>
				<Text>
					4. In consideration of the INVESTMENT MANAGER’s accommodation and acceptance of the
					E-Instructions, the PRINCIPAL/S hereby warrant and represent to the INVESTMENT MANAGER
					that (i) the E-mail Instruction is deemed an original or, at the very least, equivalent to
					an original of such instructions given by the PRINCIPAL/S and/or their authorized
					representative/s; and (ii) the screenshot or photograph of the PRINCIPAL/S’ Ephemeral
					Instruction, including an electronically saved copy thereof, is deemed a duplicate of such
					instruction s, and is admissible in evidence against all the PRINCIPAL/S.
				</Text>
			</Row>
			<Row>
				<Text>
					5. The PRINCIPAL/S hereby agree and confirm that the INVESTMENT MANAGER need not receive
					any paper-based document containing the E-Instructions in order for the INVESTMENT MANAGER
					to implement said instruction and/or related transaction. Further, the PRINCIPAL/S
					acknowledge that the print-out of the E-mail is also considered to be an original of the
					same under the existing Revised Rules of Evidence and shall be treated as such.
					Furthermore, the print-out of the E-mail Instructions or other output readable by sight or
					other means which is shown to reflect the data accurately shall be shall be sufficient for
					purposes of impugning or confirming the validity and/or authenticity of the said E-mail
					Instructions.
				</Text>
			</Row>
			<Row>
				<Text>
					6. The PRINCIPAL/S further acknowledge that the screenshot/photographs of the Ephemeral
					Instruction, including electronically saved copies thereof, shall be deemed a duplicate of
					such Ephemeral Instruction. The PRINCIPAL/S hereby agree that the screenshot/ photograph,
					electronically saved copies of the same, including enlargements and miniatures thereof,
					shall be sufficient for purposes of impugning or confirming the validity and/or
					authenticity of the Ephemeral Instruction
				</Text>
			</Row>
			<Row>
				<Text>
					7. The PRINCIPAL/S shall monitor their registered and designated Email Account and/or
					telephone/cellphone number/s and immediately inform the INVESTMENT MANAGER the invalid
					E-mail Instruction/Ephemeral Instruction received.
				</Text>
			</Row>
			<Row>
				<Text>
					8. The PRINCIPAL/S hereby confirm that the INVESTMENT MANAGER is authorized to credit to
					the designated bank account of the PRINCIPAL/S as shall be specified in the E-mail
					Instruction believed to have been made by the PRINCIPAL/S.
				</Text>
			</Row>
			<Row>
				<Text>9. The PRINCIPAL/S shall ensure that all E-mail Instructions:</Text>
			</Row>
			<Row>
				<Text className='opt-ind '>
					(i) are transmitted from their registered and designated Email Account on record with the
					INVESTMENT MANAGER, or other form of electronic correspondence to the e-mail account/s of
					the designated officer/s of the INVESTMENT MANAGER as indicated on the signature page of
					the IMA, or as may be updated with the INVESTMENT MANAGER from time to time;
					<Row>
						(ii) are clear and unambiguous in the determination of the INVESTMENT MANAGER (no text
						shortcuts and/or abbreviations), which determination shall be conclusive and binding to
						all the PRINCIPALS. For the avoidance of doubt, the PRINCIPAL/S hereby confirm that the
						INVESTMENT MANAGER is absolutely entitled to act upon all received E-mail Instructions
						prior to INVESTMENT MANAGER’s receipt of another instruction from the PRINCIPAL/S and
						that any action taken by the INVESTMENT MANAGER in pursuance of said received E-mail
						Instruction shall be valid and binding to all the PRINCIPAL/S; and{' '}
					</Row>
					<Row>
						(iii) are duly received by the INVESTMENT MANAGER within the agreed cut-off periods of
						the banking day for purposes of implementing the request covered by an E-mail
						Instruction.
					</Row>
				</Text>
			</Row>
			<Row>
				<Text>10.The PRINCIPAL/S shall ensure that all Ephemeral Instructions:</Text>
			</Row>
			<Row>
				<Text className='opt-ind '>
					<Row>
						(i) are transmitted from their registered telephone/cellphone number/s, or via messaging
						apps, indicating the PRINCIPAL/S’ registered telephone/cellphone number/s as indicated
						on the signature page of the IMA, or as may be updated with the INVESTMENT MANAGER from
						time to time;
					</Row>
					<Row>
						(ii) are clear and unambiguous in the determination of the INVESTMENT MANAGER (no text
						shortcuts and/or abbreviations), which determination shall be conclusive and binding to
						all the PRINCIPAL/S. For the avoidance of doubt, the PRINCIPAL/S hereby confirm that the
						INVESTMENT MANAGER is absolutely entitled to act upon all received Ephemeral
						Instructions prior to INVESTMENT MANAGER’s receipt of another instruction from the
						PRINCIPAL/S and that any action taken by the INVESTMENT MANAGER in pursuance of said
						received Ephemeral Instruction shall be valid and binding to the PRINCIPAL/S; and
					</Row>
					<Row>
						(iii) are duly received by the INVESTMENT MANAGER within the agreed cut-off periods of
						the banking day for purposes of implementing the request covered by an Ephemeral
						Instructions.
					</Row>
				</Text>
			</Row>
			<Row>
				<Text>
					11.The PRINCIPA/LS hereby agree and confirm that any E-Instruction shall be deemed to be
					given only upon actual receipt thereof by the INVESTMENT MANAGER, which is requested to
					carry out or act upon that instruction. The PRINCIPAL/S fully understand and are aware
					that any E-Instruction shall be irrevocable once instruction has been effected by the
					INVESTMENT MANAGER.
				</Text>
			</Row>
			<Row>
				<Text>
					12.The PRINCIPAL/S hereby agree that the INVESTMENT MANAGER shall have no duty or
					obligation to verify or confirm with the PRINCIPAL/S about any E-Instructions that the
					INVESTMENT MANAGER believes to have been made by the PRINCIPAL/S. The INVESTMENT MANAGER
					may conduct at its sole discretion, verification of the authenticity or validity of any
					and all received E-Instructions by sending a message to the registered and designated
					Email Account of and/or calling the PRINCIPAL/S or their designated authorized
					representative to their registered telephone/cellphone number/s.
				</Text>
			</Row>
			<Row>
				<Text>
					13.The PRINCIPAL/S and the INVESTMENT MANAGER hereby agree that the INVESTMENT MANAGER may
					send and/or deliver to the registered and designated Email Account of the PRINCIPAL/S the
					statement of account, financial statements, schedule of assets, confirmation advices, and
					other reports via E-mail Instruction as may be required to be provided to the PRINCIPAL/S
					under applicable laws and regulations. The PRINCIPAL/S further agree and confirm that all
					statements, instructions, notices or reports shall be conclusive and binding evidence to
					the PRINCIPAL/S for all purposes whatsoever and are admissible in evidence in any
					proceedings.
				</Text>
			</Row>
			<Row>
				<Text>
					14.The PRINCIPAL/S hereby agree that the INVESTMENT MANAGER shall not be responsible for
					ensuring the authenticity, validity or source of E-Instructions and shall not be liable
					for any E-Instructions that turns out to be unauthorized, erroneous or fraudulent.
				</Text>
			</Row>
			<Row>
				<Text>
					15.The PRINCIPAL/S hereby agree that the INVESTMENT MANAGER shall have no liability for
					any losses, liabilities, costs or expenses incurred or sustained by the PRINCIPAL/S as a
					result of the INVESTMENT MANAGER’s reliance upon or compliance with such E-Instructions.
				</Text>
			</Row>
			<Row>
				<Text>
					16.The PRINCIPAL/S hereby agree that the INVESTMENT MANAGER shall not be liable for any
					failure or delay in acting on any E-Instructions by reason of any system breakdown or
					failure of or erroneous transmission or communication equipment or facilities or
					communication, fraudulent or altered or incorrect or incomplete E-Instructions (including
					without limitation any misdirection or non-receipt of the above E-Instructions) for any
					reason, or any cause beyond the control of INVESTMENT MANAGER. Any financial loss as a
					result of tampering, hacking, unauthorized access of the PRINCIPAL/S’ registered and
					designated Email Account and telephone/cell[phones and other devices based on the duly
					received E-Instructions from the PRINCIPAL/S and implemented by the INVESTMENT MANAGER,
					shall be borne solely by all the PRINCIPAL/S.
				</Text>
			</Row>
			<Row>
				<Text>
					17.The PRINCIPAL/S hereby agree that the INVESTMENT MANAGER shall not be liable for any
					force majeure event, such as flood, natural disasters, fire, war, labor dispute, accident,
					power failure, equipment malfunction) or any other cause beyond the control of the
					INVESTMENT MANAGER.
				</Text>
			</Row>
			<Row>
				<Text>
					18.The PRINCIPAL/S recognize the numerous risks inherent and associated in conveying
					E-Instructions to the INVESTMENT MANAGER, including but not limited to damages incurred as
					a result of interception of any email, failure of any encryption of any attachment to an
					email, damaged or breakdown of computers, viruses within the machine/terminal used by the
					PRINCIPAL/S, the INVESTMENT MANAGER, or lack of clarity in the E-Instructions, and any
					risks associated with the INVESTMENT MANAGER processing a forged/tampered E-Instructions
					in good faith to and from third parties, and in this regard, the PRINCIPAL/S hereby
					accept, assume and confirm all risks and unconditionally agrees that all risks shall be
					borne by all PRINCIPAL/S and the INVESTMENT MANAGER shall not be liable for any losses or
					damages arising as a consequence of the INVESTMENT MANAGER’s acting on any E-Instructions
					received from or purporting to be from the PRINCIPAL/S.
				</Text>
			</Row>
			<Row>
				<Text>
					19.The PRINCIPAL/S hereby agree that the INVESTMENT MANAGER shall not be held liable or
					responsible for non-receipt of any E-Instructions.
				</Text>
			</Row>
			<Row>
				<Text>
					20.The PRINCIPAL/S agree that the INVESTMENT MANAGER may suspend the acceptance of
					E-Instructions from time to time, such as in the event of an emergency (the opinion of the
					INVESTMENT MANAGER being conclusive in this respect) or for security or maintenance
					reasons, however as far as practicable, even without prior notice to the PRINCIPAL/S. The
					PRINCIPAL/S hereby agree that the INVESTMENT MANAGER shall not be liable to the
					PRINCIPAL/S for any suspension and/or unavailability of the e-mail facility and/or digital
					telephone/cellphone services and/or for any damages or losses suffered or costs incurred
					by the PRINCIPAL/S due to such suspension.
				</Text>
			</Row>
			<Row>
				<Text>
					21.The PRINCIPAL/S hereby agree that the INVESTMENT MANAGER’s records of the contents of
					received E-Instructions and other details (including but not limited to payments made or
					received) pursuant to this E-Instructions shall, as against the PRINCIPAL/S, be deemed to
					be conclusive evidence of such instructions and such other details.
				</Text>
			</Row>
			<Row>
				<Text>
					22.The PRINCIPAL/S hereby irrevocably and unconditionally agree to hold and keep the
					INVESTMENT MANAGER free and harmless from and against any and/or all claims, suits,
					actions or proceedings of whatever kind or nature that any person may file or institute
					against the INVESTMENT MANAGER arising from or in connection with the E-Instructions given
					by the PRINCIPAL/S. The PRINCIPAL/S shall indemnify and compensate the INVESTMENT MANAGER
					against any and/or all damages, losses, liabilities, costs and expenses of whatever nature
					and howsoever arising suffered or incurred by the INVESTMENT MANAGER, including without
					limiting the generality of the foregoing attorney’s fees and costs of suit, whether
					directly or indirectly arising from any breach by the PRINCIPAL/S of their obligations
					hereunder. The PRINCIPAL/S’ liability hereunder shall be a continuing obligation and shall
					survive any cancellation or termination of the E-Instructions.
				</Text>
			</Row>
			<Row>
				<Text>
					The PRINCIPAL/S absolutely and irrevocably waive, release and discharge RCBC, including
					its Trust and Investments Group, its assigns and successors-in-interest, owners,
					directors, officers, employees, agents and representatives (collectively, “BANK”) from any
					and all rights, interests, claims and cause or causes of action that the PRINCIPAL/S,
					his/her heirs, assigns, and successors-in-interest, may now or in the future claim to have
					against RCBC arising from or in connection with the reliance by the INVESTMENT MANAGER on
					the E-Instructions given by the PRINCIPAL/S.
				</Text>
			</Row>
		</div>
	);
};

export default IMAPersonal;
