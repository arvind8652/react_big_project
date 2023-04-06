import React from 'react';
import { Row, Col, Typography } from 'antd';
const { Title, Text } = Typography;
import './IMACorporate.scss';

const IMACorporate = () => {
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
					<span className='empty-space '></span> day of
					<span className='empty-space '></span>, 20<span className='empty-space '></span>, at{' '}
					<span className='empty-space '></span>, Philippines, by and between:
				</Text>
			</Row>
			<Row className='content-padd'>
				<Text>
					<span className='empty-space '></span>, a corporation duly organized and existing under
					and by virtue of the laws of the Republic of the Philippines, with principal office
					address at <span className='empty-space '></span> <span className='empty-space '></span>,
					hereinafter referred to as the
					<span className='text-bold'>"PRINCIPAL";</span>
				</Text>
			</Row>
			<Row justify='center'>
				<Text>- and -</Text>
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
					<span className='text-bold'>WHEREAS</span>, the PRINCIPAL desires to avail of the services
					of the INVESTMENT MANAGER relative to the management and investment of PRINCIPAL's
					investible funds;
				</Text>
			</Row>
			{/* <Row>
				<Text></Text>
			</Row> */}
			<Row className='indent'>
				<Text>
					<span className='text-bold'>WHEREAS</span>, the INVESTMENT MANAGER is willing to render
					the services required by the PRINCIPAL relative to the management and investment of
					PRINCIPAL's investible funds, subject to the terms and conditions hereunder stipulated;
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
					The fund(s) which the PRINCIPAL has delivered or shall deliver to the INVESTMENT MANAGER
					as well as such securities, properties or assets in which said cash and/or assets will be
					invested, the proceeds, interest, dividends and income or profits realized from the
					management, investment and reinvestment thereof, shall constitute the managed funds and
					shall hereafter be designated and hereinafter referred to as the "PORTFOLIO". Unless the
					context clearly requires otherwise or unless otherwise specified, the term “portfolio” or
					“PORTFOLIO” as used herein or in subsequent communications between the parties hereto
					shall include both principal and the income of the PORTFOLIO. For purposes of this
					Agreement, the term "securities" shall be deemed to include commercial papers, shares of
					stock, financial instruments or other securities as the term is defined or understood
					under the 12 IMA CORPORATE (Feb 2021 Version) 1 Securities Regulation Code (Republic Act
					No. 8799) as the same may be amended or replaced. The PORTFOLIO shall be established and
					maintained at level/s allowed by the Bangko Sentral ng Pilipinas (BSP).
				</Text>
			</Row>
			<Row>
				<Text>
					3. <span className='text-ind'>Additional Delivery of Funds.</span>
					At any time hereafter and from time to time at the discretion of the PRINCIPAL, the
					PRINCIPAL may deliver additional funds, including foreign currency denomination, to the
					INVESTMENT MANAGER which shall form part of the PORTFOLIO and shall be subject to the same
					terms and conditions of this Agreement. No formalities other than a letter from the
					PRINCIPAL and delivery of such funds to the INVESTMENT MANAGER in a manner acceptable to
					the latter, whether physical, electronic or in any other manner of delivery not prohibited
					by law, shall be required for any addition to the PORTFOLIO. The PRINCIPAL fully
					understands that contributions of funds in foreign currency denomination to the PORTFOLIO
					shall always be subject to compliance by the PRINCIPAL to the Manual of Regulations on
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
					INVESTMENT MANAGER has designated <b>RCBC Account No. (IMA)</b>{' '}
					<span className='empty-space '></span> the account number.
				</Text>
			</Row>
			<Row>
				<Text>
					6. <span className='text-ind'>Terms and Conditions of Administration.</span> Subject to
					the written instructions of the PRINCIPAL, the INVESTMENT MANAGER and its successors,
					during the effectivity of this Agreement, shall have the power and authority to hold,
					manage, administer, convert, sell, assign, alter, divide, invest and reinvest the
					PORTFOLIO, without distinction between principal and income. In addition to any other
					power or authority specified herein and/or expressly conferred upon it by law and subject
					to prior written approval from the PRINCIPAL, the INVESTMENT MANAGER shall have the power
					to do all other acts which in its judgment are necessary, reasonable, advisable or
					desirable for the proper administration and disposition of the PORTFOLIO or to accomplish
					its purpose, although such powers, rights and acts not specifically enumerated in this
					Agreement.
				</Text>
			</Row>
			<Row>
				<Text>
					7. <span className='text-ind'>Investment Instructions.</span>
					The PRINCIPAL shall have direct control and administration of the PORTFOLIO and shall
					provide its written instructions to the INVESTMENT MANAGER to hold, invest, and reinvest
					the PORTFOLIO and keep the same invested in peso and/or foreign currency denominated
					investments, and subject to the BBSP regulations and the MORFXT, without distinction
					between principal and income/interest, in: <br /> <br />
					<Row>
						a)Traditional deposit products of universal banks and commercial banks (UKBs) in the
						Philippines with long-term credit rating of at least AA- or its equivalent by a third
						party credit assessment agency recognized by the BSP;
					</Row>
					<Row>
						b)Evidences of indebtedness of the Republic of the Philippines and of the BSP, and any
						other evidences of indebtedness or obligations the servicing and repayment of which are
						fully guaranteed by the government of the Republic of the Philippines or loans against
						such government securities,
					</Row>
					<Row>
						c)Loans fully guaranteed by the government as to the payment of principal and interest,
					</Row>
					<Row>
						{' '}
						d)Tradable securities issued by the government of a foreign country or any supranational
						entity with long-term credit rating of at least AA- or its equivalent by a third party
						credit assessment agency recognized by the BSP;
					</Row>
					<Row>
						e)Loans fully secured by hold out on, or assignment or pledge of, deposits maintained
						either with the bank proper or other banks, or of deposit substitutes of the bank, or of
						mortgage and chattel mortgage bonds issued by the INVESTMENT MANAGER;
					</Row>
					<Row>
						f)Loans fully secured by real estate and chattels in accordance with Secs. 303, 143
						(Credit granting and loan evaluation/analysis process and underwriting standards) and
						301 (Additional requirements) of the Manual of Regulations for Banks (MORB);
					</Row>
					<Row>
						g)Securities, whether in the character of debt or equity, such as stocks, whether
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
						h)Other investments or loans as may be directed or authorized by the PRINCIPAL in a
						separate written instrument, provided that said written instrument shall contain the
						following minimum information (a) the transaction to be entered into; (b) the
						amount/property involved, (c) the name of the issuer, in case of securities, or the name
						of the borrower, in case of loans, and (d) the terms of security, including the
						collateral(s) or security(ies), if any; provided, further that said written instrument
						may either refer to a specific transaction or may be continuing in nature as may be
						legally appropriate. The PRINCIPAL shall direct the INVESTMENT MANAGER in writing for
						purposes of making investment in government securities or registered commercial papers
						or other fixed income instruments or certain loans to any of the borrowers in the list
						approved by the PRINCIPAL;
					</Row>
					<Row>
						i)To sell, transfer, lend or assign money or property to or to purchase or acquire
						property or debt instruments or to invest in equities or in securities as the same is
						defined under existing securities law issued and/or underwritten by the INVESTMENT
						MANAGER or to any of its departments, directors, officers, stockholders or employees or
						relatives within the first degree of consanguinity or affinity, or the related interests
						of such directors, officers and stockholders; or from any corporation where the
						INVESTMENT MANAGER owns at least fifty percent (50%) of the subscribed capital or voting
						stock in its own right, considering the best interest of the PORTFOLIO at all times and
						in doing so, shall be deemed fully authorized by this Agreement; and
					</Row>
					<Row>
						j)To sell, transfer, assign or lend money or property from one trust or fiduciary
						account to another trust or fiduciary account. The PRINCIPAL fully understand that any
						foreign exchange acquired or received as dividends/earnings or divestment proceeds on
						such investment are intended for reinvestment abroad, the same proceeds are not required
						to be inwardly remitted and sold for pesos through authorized agent banks; Provided,
						that such proceeds are reinvested abroad within two (2) banking days from receipt of the
						funds abroad.
					</Row>
				</Text>
			</Row>
			<Row>
				<Text>
					8. <span className='text-ind'>Powers and Duties of the INVESTMENT MANAGER.</span>
					Powers and Duties of the INVESTMENT MANAGER. In the administration and management of the
					PORTFOLIO, subject to the written instructions of the PRINCIPAL, the INVESTMENT MANAGER,
					in addition to the powers authorized by law, shall have power and authority to perform any
					and all of the following acts and things: <br /> <br />
					<Row>
						a)To treat the PORTFOLIO as one aggregate amount, without distinction as to principal or
						income, for the purpose of investment or reinvestment or to hold it in cash and/or
						deposit all or any part hereof with the INVESTMENT MANAGER’s own savings/current
						accounts department pending its investment or reinvestment;
					</Row>
					<Row>
						b)To retain the PORTFOLIO in Philippine Pesos or convert all or any part thereof to any
						major currency, subject to existing regulations, the MORB and MORFXT, for the purpose of
						investing the same in (i) any locally established or locally managed collective trust
						plans or any unit trust funds including those plans or funds established, maintained or
						managed by the INVESTMENT MANAGER, its branches, offices, subsidiaries or affiliates,
						when the same appears practicable and for the best interest of the PORTFOLIO or in (ii)
						any foreign currency denominated investment duly approved by the INVESTMENT MANAGER’s
						Trust Committee.
					</Row>
					<Row>
						{' '}
						c)To cause any property or asset of the PORTFOLIO to be issued, held or registered in
						the name of the PRINCIPAL or in the name of the INVESTMENT MANAGER, or in the name of a
						nominee, provided, that in the latter two cases the instrument shall indicate that the
						INVESTMENT MANAGER or nominee is acting in a representative capacity and that the name
						of the PRINCIPAL is disclosed thereat;
					</Row>
					<Row>
						d)To exercise any right or privilege inherent or incident to the ownership of stock or
						property including the right to vote, issue proxies or consent to the reorganization,
						consolidation, or merger of any corporation, company or entity in which the PORTFOLIO
						owns shares or has an interest, grant options, exercise conversion rights or privileges,
						exercise rights to subscribe to or purchase additional securities;{' '}
					</Row>
					<Row>
						e)To endorse, sign, execute and deliver any and all securities, instruments, documents
						or contracts necessary, proper, incidental to or connected with the exercise of any
						power or discretion hereunder or subsequently conferred upon the INVESTMENT MANAGER or
						the performance of acts herein authorized, and further in this regard, the PRINCIPAL
						hereby irrevocably appoints the INVESTMENT MANAGER as Attorney-In- Fact, with full power
						and authority to ask, demand, sue for, recover, collect and receive any and all sums of
						money, debts, due accounts, interests, dividends and other things of value of whatever
						nature, kind or character as may now be or may hereafter become due, owing, payable or
						belonging to the PORTFOLIO, and to sue, defend, and take any and all lawful action, ways
						and means for the recovery thereof by suit, attachment, compromise, settlement,
						arbitration or otherwise;
					</Row>
					<Row>
						f)To open and maintain a savings and/or checking account as may be considered necessary
						or convenient from time to time in the performance of the agency and the authority
						herein conferred upon the INVESTMENT MANAGER;
					</Row>
					<Row>
						{' '}
						g)To collect, receive and issue receipt for the return of matured securities,
						investments, proceeds, income, profits, interests, payments and all other sums accruing
						to or due to the PORTFOLIO;
					</Row>
					<Row>
						h)To pay such taxes as may be assessed, imposed or required by law to be withheld or
						paid in respect or on account of the PORTFOLIO or in respect of any profit, income or
						gains derived from the investment, sale or disposition of securities or other properties
						constituting part of the PORTFOLIO and whenever warranted in the opinion of counsel, to
						litigate, compromise or pay such taxes, and the litigation, compromise or payment of
						such taxes shall be binding and conclusive upon the PRINCIPAL;{' '}
					</Row>
					<Row>
						i)To pay out of the PORTFOLIO all costs, charges, expenses incurred in connection with
						the investments or the administration and management of the PORTFOLIO including the
						compensation of the INVESTMENT MANAGER for its services relative to the PORTFOLIO;
					</Row>
					<Row>
						j) To commingle the PORTFOLIO with other investment management accounts subject to
						compliance to all of the following conditions:
					</Row>
					<Row>
						<Text className='opt-ind'>
							(i)The investment of each of the IMAs in the commingled fund shall at least be
							P100,000.00; <br />
							(ii)The commingled funds shall only be invested in (i) securities directly issued by
							the Philippine National Government; (ii) exchange-traded equities and fixed income
							securities (including those issued offshore) and commercial papers, Provided, That
							these securities/papers are registered with the Securities and Exchange Commission
							(SEC), (iii) securities issued by banks incorporated in the Philippines, except those
							issued through the trust units, or (iv) securities issued by other sovereigns that are
							exempt from registration under Section 9(b) of the Securities Regulation Code; <br />
							(iii) The commingling of funds and the manger of termination of the same shall be
							specifically agreed in writing by the PRINCIPALS. The INVESTMENT MANAGER shall ensure
							that the agreement to commingle funds with other IMAs is legally binding and
							enforceable. Furthermore, the risks associated with commingling of funds, such as
							market liquidity risk, shall be fully disclosed to the clients; <br />
							(iv)The INVESTMENT MANAGER shall determine that it possesses the operational
							capability to manage the IMAs participating in commingled funds. In doing so, the
							INVESTMENT MANAGER shall undertake as assessment taking the following into
							consideration: (a) sufficiency of personnel handling commingled IMAs; (ii) capability
							of existing systems to accurately and readily identify the allocation of each investor
							in a commingled fund and generate the following information on a per IMA basis, at a
							minimum: accruals, coupons received, dividends received, mark-to-makrte gains or
							losses and required reports; and (iii) ability to conduct periodic reconciliation of
							relevant records; and The maximum number of IMAs that can be commingled into one fund
							shall be determined by the INVESTMENT MANAGER based on its own operational capability
							to commingle IMAs.
						</Text>
					</Row>
					<Row>
						k)To keep and maintain books of account and/or records of the management and operation
						of the PORTFOLIO;
					</Row>
					<Row>
						l)Unless revoked, to open and maintain in our behalf, a securities custodianship
						agreement with a BSP Accredited Securities Custodian; and
					</Row>
					<Row>
						m)To perform such other acts or make, execute and deliver such other instruments
						necessary or proper for the exercise of any of the powers or authorities conferred
						herein, or to accomplish any of the purposes hereof. The INVESTMENT MANAGER is
						authorized to purchase, invest, reinvest, sell, transfer or dispose foreign
						currency-denominated financial instruments, including securities as defined in Section 3
						of the revised Securities Regulation Code (SRC), through a distributor or underwriter
						duly authorized or licensed by the government of the issuer of such instruments, or a
						counterparty financial institution (seller or buyer) authorized in writing by the
						PRINCIPAL and/or accredited by the INVESTMENT MANAGER; Provided, That, the conduct,
						documentation, and settlement of any of these transactions shall be outside Philippine
						jurisdiction.
					</Row>
				</Text>
			</Row>
			<Row>
				<Text>
					9. <span className='text-ind'>Degree of Discretion.</span>
					The Degree of Discretion which the PRINCIPAL granted to the INVESTMENT MANAGER under this
					Agreement shall be based on the PRINCIPAL’s written directives or limited to specific
					securities or properties which are expressly stipulated in this Agreement or upon written
					instruction of the PRINCIPAL.
				</Text>
			</Row>
			<Row>
				<Text>
					10.
					<span className='text-ind'>Exemption from Liability.</span>
					Except for fraud, bad faith, willful default, gross misconduct, gross or willful
					negligence on the part of the INVESTMENT MANAGER or any person acting in its behalf, the
					INVESTMENT MANAGER shall be held free and harmless from any liability, claim, damage or
					fiduciary responsibility, cost or expense arising out of or in connection with: <br />
					<br />
					<Row>
						(a) any act done or performed or caused to be done or performed by the INVESTMENT
						MANAGER pursuant to the terms and conditions herein agreed or in the good faith exercise
						of any discretion, judgment, power or authority conferred herein or in any subsequent
						authority granted by the PRINCIPAL to the INVESTMENT MANAGER or in the good faith
						compliance with the written instructions or directions of the PRINCIPAL delivered to the
						INVESTMENT MANAGER in accordance with Section 20 of this Agreement (which shall always
						be for the sole and exclusive account and risk of the PRINCIPAL) and neither shall the
						INVESTMENT MANAGER be liable for refraining to do any act, where such inaction, in the
						good faith judgment of the INVESTMENT MANAGER, is necessary or appropriate for the
						proper and advantageous administration or preservation of the PORTFOLIO; provided, that
						in the interpretation of this Agreement nothing herein shall be construed as binding the
						INVESTMENT MANAGER to provide a fixed rate of return and; provided that the grant of a
						judgment, discretion, power or authority in favor of the INVESTMENT MANAGER shall not in
						any case be construed as creating, binding or imposing upon the INVESTMENT MANAGER an
						obligation or duty to exercise the same;{' '}
					</Row>
					<Row>
						(b) any investment made pursuant to this Agreement due to or on account of the default,
						bankruptcy or insolvency of the borrower or issuer or the broker or dealer handling the
						transaction or their failure in any manner to comply with any of their obligations under
						the aforesaid transaction(s) it being understood that, except as indicated above, all
						investments and reinvestments of the PORTFOLIO shall be strictly for the account and
						risk of the PRINCIPAL;
					</Row>
					<Row>
						(c) any default, breach or negligence of any third party in the delivery of valid
						documents relating to the PORTFOLIO including but not limited to share certificates or
						in making payments relating to the PORTFOLIO;
					</Row>
					<Row>
						(d) any and all liabilities and/or damage which may be incurred by the PRINCIPAL in the
						proper and lawful discharge by the INVESTMENT MANAGER of its power and duties as
						authorized herein and the INVESTER MANAGER shall have a lien on the PORTFOLIO for the
						amount of such liability, damage or injury incurred and/or sustained by the INVESTMENT
						MANAGER; and
					</Row>
					<Row>
						(e) any act, omission or delay done or performed or caused to be done or performed by
						the INVESTMENT MANAGER in accordance with, pursuant to or in its good faith reliance on:
						(i) the orders, judgments, decrees or writs issued by courts of competent jurisdiction
						or directives issued by governmental regulatory agencies, even if, thereafter, such
						order, judgment, decree, writ, or directive is subsequently reversed, modified,
						annulled, set aside or vacated; (ii) the advice of lawyers, accountants and other
						professionals, whether in-house or separately engaged, in reference to any matter under
						this Agreement; (iii) the opinion of its in-house signature verifier(iers) based on
						specimen(s) of signature(s) provided or which will subsequently be provided by the
						PRINCIPAL or on specimens of the signature appearing in this Agreement; (iv) documents
						submitted to it, including e-mail instructions, it being understood that the INVESTMENT
						MANAGER is authorized not to look beyond such documents or determine their genuineness,
						validity, sufficiency, authenticity or correctness including the correctness of the
						facts contained in any order, judgment, certification, demand, notice, instrument or
						other writing delivered to it and may act in reliance upon any instrument or signature
						believed to be genuine; and (v) the most recent certification by the Corporate Secretary
						of the PRINCIPAL provided to the INVESTMENT MANAGER for the purpose of determining the
						authorized representatives/signatories of the PRINCIPAL and their e-mail addresses, it
						being understood that it is the duty of the PRINCIPAL to promptly serve written notice
						upon the INVESTMENT MANAGER of any change of the said representatives/signatories and to
						provide the INVESTMENT MANAGER with specimen signatures of such authorized
						representatives/signatories.
					</Row>
					<Row>
						The INVESTMENT MANAGER shall not be liable for any failure or delay in acting on any of
						the written instructions by reason of any breakdown or failure of transmission or
						communication equipment or facilities or communication (including without limitation any
						misdirection of the written instruction within RCBC) for any reason, or any cause beyond
						the control of the INVESTMENT MANAGER. The INVESTMENT MANAGER shall have a lien on the
						PORTFOLIO for the amount of any loss, liability, damage, injury, cost or expense
						incurred, sustained or suffered by the INVESTMENT MANAGER.
					</Row>
				</Text>
			</Row>
			<Row>
				<Text>
					11.
					<span className='text-ind'>Reporting Requirements.</span>
					The INVESTMENT MANAGER shall provide the PRINCIPAL with the schedule of earning assets not
					later than twenty (20) calendar days from the end of the reference date/period. In
					addition, the INVESTMENT MANAGER shall prepare a report covering the foreign currency
					amount and the local currency equivalent of the total cross currency investments with
					details on: (a) the type of investments; and the (b) the amount of cash flow converted.
					Further, the INVESTMENT MANAGER shall submit to the PRINCIPAL or to its representative a
					confirmation of directed purchase and sale transactions on a monthly basis, not later than
					twenty (20) calendar days from the end of the reference date/period. In compliance to the
					MORFXT, the INVESTMENT MANAGER shall ensure that all cash flows shall be in pesos. The
					INVESTMENT MANAGER shall record cross-currency investment transactions in the peso regular
					books at their foreign currency amounts and their local currency equivalent using the
					Philippine Dealing System peso/US dollar closing rate and the New York US dollar/third
					currencies closing rate.
					<br />
					<span className='sub-text-bold'>
						Accounting on INVESTMENT MANAGER’s Resignation or Removal
					</span>
					- After the resignation or removal of the INVESTMENT MANAGER or after the termination of
					this Agreement, the INVESTMENT MANAGER shall render an accounting to the PRINCIPAL.
					<br />
					<span className='sub-text-bold'>Approval of Reports and Accounting</span>
					– The INVESTMENT MANAGER shall submit to the PRINCIPAL an accounting of all transactions
					effected by it since the last report up to the date of termination. The reports and/or
					accounting (including final accounting) of all transactions effected by the INVESTMENT
					MANAGER may be approved by the PRINCIPAL by written approval delivered to the INVESTMENT
					MANAGER or by the failure of the PRINCIPAL to express any objection to such report or
					accounting in writing delivered to the INVESTMENT MANAGER within thirty (30) calendar days
					from the date the report or accounting was delivered to the PRINCIPAL. Upon receipt of
					written approval of the report or accounting (including final accounting), or upon the
					passage of the 30 day period within which objections may be filed without written
					objections having been received by the INVESTMENT MANAGER, such accounting or report shall
					be deemed to have been approved, and the INVESTMENT MANAGER shall be released and
					discharged as to all items, matters, and things set forth in such report or accounting as
					if such report or accounting has been settled and allowed by a decree of a court of
					competent jurisdiction.
					<br />
					<span className='sub-text-bold'>Right of Inspection</span> - The books of accounts or
					records relating to the PORTFOLIO shall be open for inspection by any person or persons
					designated by the PRINCIPAL during banking hours and on banking days with at least five
					(5) banking days prior written notice.
				</Text>
			</Row>
			<Row>
				<Text>
					12.
					<span className='text-ind'>Fees.</span>
					The INVESTMENT MANAGER, as compensation for its services hereunder, shall be entitled to
					receive a fee of <span className='empty-space '></span> (please specify the rate and the
					terms). Upon mutual agreement of the parties, this fee rate, basis for computation and
					manner of collection may be reviewed and adjusted accordingly. Any adjustment shall be
					applied prospectively, shall be made in writing and shall appear in the written
					authorization that the PRINCIPAL shall execute upon investment disposition. The manner and
					frequency of charging the fees shall also be covered by the written authorization to be
					executed by the PRINCIPAL. Incidental expenses and other charges incurred by the
					INVESTMENT MANAGER in connection with the management of the PORTFOLIO, including any value
					added tax on the trust fees shall be for the account of the PRINCIPAL. All expenses,
					charges and fees may, at the option of the INVESTMENT MANAGER, without need of any prior
					notice, be made chargeable to the PORTFOLIO.
				</Text>
			</Row>
			<Row>
				<Text>
					13.
					<span className='text-ind'>Withdrawal of Income/Principal</span>
					Withdrawal of Income/Principal - Subject to the availability of funds, the terms and
					conditions of the PORTFOLIO’s investments, the non-diminution of the PORTFOLIO not lower
					than ONE HUNDRED THOUSAND PESOS (P100,000.00), the PRINCIPAL/s may withdraw the
					income/principal of the PORTFOLIO or portion thereof upon written instruction or order
					given to the INVESTMENT MANAGER. The INVESTMENT MANAGER shall not be required to see as to
					the application of the income/principal so withdrawn from the PORTFOLIO. Any income of the
					PORTFOLIO not withdrawn shall be accumulated and added to the principal of the PORTFOLIO
					for further investment and reinvestment.
					<Row>
						To ensure a minimum tenor for the investments and subject to BSP rules and regulations,
						the whole or any part of the PORTFOLIO invested for a given period shall not be
						pre-terminated or called by the PRINCIPAL prior to the date of the investment maturity.
						The INVESTMENT MANAGER shall secure prior written instructions from the PRINCIPAL to
						allow and arrange any pre-termination according to such rules or market conventions
						(including the fixing of penalties).
					</Row>
				</Text>
			</Row>
			<Row>
				<Text>
					14.
					<span className='text-ind'>
						Non-alienation or Encumbrance of the PORTFOLIO or Income.
					</span>
					During the effectivity of this Agreement, the PRINCIPAL shall not assign or encumber the
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
					following the effectivity of the termination, the INVESTMENT MANAGER shall have and shall
					be released and shall have no duty, liability or obligation other than to keep custody of
					the monies, assets and properties comprising the PORTFOLIO and to release the same to the
					PRINCIPAL or its representative.
				</Text>
			</Row>
			<Row>
				<Text>
					17.
					<span className='text-ind'>Turnover of PORTFOLIO.</span>
					In the event of termination of this Agreement, the INVESTMENT MANAGER shall, upon written
					instructions of the PRINCIPAL, transfer and turn over the PORTFOLIO to the PRINCIPAL or
					such party as may be authorized by the PRINCIPAL to receive the PORTFOLIO, all the assets
					of the PORTFOLIO which may or may not be in cash less applicable fees and charges provided
					in this Agreement in carrying out its functions or in the exercise of its powers and
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
					delivery of the PORTFOLIO to the PRINCIPAL or its representative.
				</Text>
			</Row>
			<Row>
				<Text>
					19.
					<span className='text-ind'>Indemnification.</span>
					The PRINCIPAL shall indemnify the INVESTMENT MANAGER for any loss, liability or damage
					that the INVESTMENT MANAGER may suffer, sustain or incur in connection with this
					Agreement, except where such loss, liability or injury is due to the fraud, bad faith,
					willful default, gross misconduct, or gross or willful negligence of the INVESTMENT
					MANAGER. The PRINCIPAL understands, acknowledges and confirms the numerous risks inherent
					and associated in conveying instructions to the INVESTMENT MANAGER via e-mail (including
					but not limited to damages incurred as a result of interception of any e-mail, failure of
					any encryption of any attachment to an email, damaged or breakdown of computers, viruses
					within the machine/terminal used by the PRINCIPAL or the INVESTMENT MANAGER, lack of
					clarity in the e-mail instructions, and any risk associated with the INVESTMENT MANAGER
					processing a forge/tampered e-mail instructions in good faith and from third parties) and
					the PRINCIPAL hereby confirms its acceptance of all risk and unconditionally agree that
					all risks shall be borne by the PRINCIPAL and the INVESTMENT MANAGER shall not be liable
					for any losses or damages arising from the INVESTMENT MANAGER acting on any e-mail
					instructions purporting to be from the PRINCIPAL and received by the INVESTMENT MANAGER
					via e-mail. The PRINCIPAL further agrees and confirms that all statements, instructions,
					notices or reports shall be conclusive and binding evidence to the PRINCIPAL for all
					purposes whatsoever and are admissible in evidence in any proceedings.
				</Text>
			</Row>
			<Row>
				<Text>
					20.
					<span className='text-ind'>Tax Confirmation.</span>
					The PRINCIPAL hereby understand and confirm that taxes on dividends and/or capital gains
					which may be withheld by the accredited RCBC counterparty/ies or issuer of the stocks
					listed or traded in any accredited foreign stock exchange shall be for the PRINCIPAL’s
					exclusive account and disposition. The PRINCIPAL hereby confirm that it shall be
					responsible for the filing, with the Bureau of Internal Revenue (BIR) of its Philippine
					income tax return and the remittance and timely payment of taxes on the income derived
					from its investments, reinvestments or disposition/sale of shares and other fixed income
					securities listed or traded in any accredited foreign stock exchange under this RCBC
					Account No. (IMA) No. <span className='empty-space '></span>.
				</Text>
			</Row>
			<Row>
				<Text>
					21.
					<span className='text-ind'>Notices.</span>
					(a) Any instruction, notice or report which by any provision of this Agreement is required
					or permitted to be given to or to be served by the INVESTMENT MANAGER or the PRINCIPAL may
					be given or served by: (i) personal delivery; (ii) transmitted by postage prepaid
					registered mail (airmail if international) or by internationally recognized courier
					service; (iii) transmitted by electronic mail or electronic transmission in pdf form; or
					(iv) transmitted by facsimile, to either Party at the addresses, e-mail addresses,
					telephone/cellphone numbers, and facsimile numbers as indicated at the start of this
					Agreement or in the{' '}
					<span className='sub-text-bold'>Electronic Instructions Agreement</span>, a copy of which
					is attached hereto as <span className='sub-text-bold'>Annex “A”</span> and to form an
					integral part of this Agreement.
					<br />
					(b) Except as otherwise specified herein, all notices and other communications shall be
					deemed to have been duly given on: (i) the date of receipt if delivered personally; (ii)
					the date ten (10) days after the date of posting if transmitted by mail or five (5) days
					after delivery to the courier; (iii) the date of receipt if transmitted by electronic mail
					or electronic transmission; or (iv) the next banking day in the place of address following
					the date of transmission with confirmed answerback if transmitted by facsimile, whichever
					shall occur first; provided, that with respect to (ii), (iii), and (iv) of this Section,
					if any of the dates provided is not a banking day in the place to which any notice is
					sent, such notice or other communication shall be deemed delivered on the next banking day
					at such place; provided further, that any party transmitting any notice or other
					communication in pdf form by electronic mail or electronic transmission shall, within five
					(5) banking days from the date (or deemed date) of delivery and without in any way
					altering such date (or deemed date) of delivery, deliver to the INVESTMENT MANAGER such
					notice or communication by means of any of the manners of giving such notice under (i) or
					(ii) of this Section but further subject to the{' '}
					<span className='sub-text-bold'>
						Terms and Conditions of Electronic Instructions Agreement.
					</span>
					<Row>
						(c) The INVESTMENT MANAGER may suspend the acceptance of e-mail instructions in the
						event of an emergency (the opinion of the INVESTMENT MANAGER being conclusive in this
						respect) or for security or maintenance reasons by giving notice to the PRINCIPAL.{' '}
						<br /> (d) Any party may change its address (including e-mail addresses) for purposes
						hereof by notice to the other parties.{' '}
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
					Authority to Disclose. The PRINCIPAL hereby authorizes the INVESTMENT MANAGER, any of its
					branch, subsidiary, affiliate, representatives, third party or its duly authorized
					personnel such as but not limited to agency personnel, credit rating agencies,
					verification agencies, and other outsourced service providers engaged by RCBC Trust as
					allowed by law and internal Bank policies, to disclose, hold, transfer and process
					information relating to your account to the BSP, Anti-Money Laundering Council (AMLC),
					Bureau of Internal Revenue (BIR) whenever applicable, or such other relevant regulatory
					agency and their duly authorized representatives, any information in relation to the
					PORTFOLIO with the INVESTMENT MANAGER as may be required by law, regulation or agreement.
					The PRINCIPAL agrees to indemnify and hold the INVESTMENT MANAGER free and harmless,
					including its officers, directors, employees and representatives, against any and all
					disputes, claims, demands, losses, penalties, liabilities, costs and expenses of any kind
					whatsoever, imposed on, incurred by or assessed against the PRINCIPAL in respect of or in
					connection with the information provided in relation to the PORTFOLIO, the disclosure of
					such documents and information on the PORTFOLIO, and the consent herein granted.
				</Text>
			</Row>
			<Row>
				<Text>
					23.
					<span className='text-ind'>Financial Consumer Protection.</span>
					(a) The PRINCIPAL may send complaints, inquiries or concerns about trust products and
					services to the INVESTMENT MANAGER via electronic mail at customercontact@rcbc.com or call
					at 63 2 8877 7222 (877-RCBC). Upon receipt, the INVESTMENT MANAGER shall conduct a
					comprehensive investigation in accordance with its established guidelines and procedures
					on complaints handling and shall notify the client of its findings or results of its
					investigation through the INVESTMENT MANAGER’s choice of communication. The findings of
					the INVESTMENT MANAGER shall be final and conclusive. (b) The INVESTMENT MANAGER is
					regulated by the BSP, through its Trust Specialist Group. Alternatively, the PRINCIPAL may
					file its complaint at the BSP Financial Consumer Department via electronic email at
					consumeraffairs@bsp.gov.ph or call at 632 8708 7087. The BSP Online Buddy (BOB) may be
					accessed by financial consumers through the following portals:
					<Row>
						<Text className='opt-ind'>
							(i) BSP Webchat: <a href=''>http://www.bsp.gov.ph/</a> <br />
							(ii) SMS: 021582277 (for Globe subscribers only; for other network subscribers, BOB
							will also be made available soon); and <br />
							(iii) BSP Facebook: <a href=''> https://www.facebook.com/BangkoSentralngPilipinas/</a>
						</Text>
					</Row>
					(c) The PRINCIPAL may provide feedback about the financial products and services rendered
					by the INVESTMENT MANAGER in order for the INVESTMENT MANAGER to improve its products and
					services. The PRINCIPAL may send feedback via electronic mail or telephone communications
					to the contact details provided in the above Section.
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
					<span className='text-ind'>Electronic Instructions.</span>
					The PRINCIPAL and the INVESTMENT MANAGER hereby agree to comply to the Terms and
					Conditions of the Electronic Instructions Agreement.
				</Text>
			</Row>
			<Row>
				<Text>
					26. This Agreement and its interpretation shall be governed by the laws of the Republic of
					the Philippines.
				</Text>
			</Row>
			<Row className='indent'>
				IN WITNESS WHEREOF, the parties hereto have signed this Agreement on the date and at the
				place first above-mentioned.
			</Row>
			<Row className='add-space'>
				<Col span={12}>
					<Col>NAME OF COMPANY</Col>
					<Col>By:</Col>
				</Col>
				<Col span={12}>
					<Col>RIZAL COMMERCIAL BANKING</Col>
					<Col>Trust and Investments Group (INVESTMENT MANAGER) </Col>
					<Col>By:</Col>
				</Col>
			</Row>
			<Row className='add-space'>
				<Col span={12}>
					<span className='empty-space-two added-size'></span>
					<Col>Name:</Col>
					<Col>Rank & Position:</Col>
				</Col>
				<Col span={12}>
					<span className='empty-space-two added-size'></span>
					<Col>Authorized Signatory</Col>
				</Col>
			</Row>
			<Row className='add-space'>
				<Col span={12}>
					<span className='empty-space-two added-size'></span>
					<Col>Name:</Col>
					<Col>Rank & Position:</Col>
				</Col>
				<Col span={12}>
					<span className='empty-space-two added-size'></span>
					<Col>Authorized Signatory</Col>
				</Col>
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
		</div>
	);
};

export default IMACorporate;
