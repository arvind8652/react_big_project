import { Row, Col, Avatar, Tooltip, List } from 'antd';
import { useEffect } from 'react';
import { useState } from 'react';
import { getAccountBaseAccess } from '../../api/accountCreateApi';
import AccountJointHolderDetail from '../../components/Forms/AccountDetailsFormCard/AccountJointHolderDetail';
import TypoGraphy from '../../components/TypoGraphy/TypoGraphy';
const defaultCustomerDetails = {
	name: '-',
	schemeType: '-',
	schemeTypeName: '-',
	incomeGrowth: '-',
	incomeGrowthName: '-',
	fundClassification: '-',
	fundClassificationName: '-',
	modeOfOperation: '-',
	modeOfOperationName: '-',
	stkexindex: '-',
	stkexindexName: '-',
	investmentManager: '-',
	investmentManagerName: '-',
	branch: '-',
	branchName: '-',
	investmentAccessArray: '-',
	holdingPatternName: '-'
};
const AccountDetails = ({ customerDetails = defaultCustomerDetails, jointHolder = [] }) => {
	const [aMDetails, getAMDetails] = useState();

	const getAccountbaseAccess = async () => {
		try {
			const resp = await getAccountBaseAccess(
				customerDetails?.incomeGrowth,
				customerDetails?.fundClassification
			);
			getAMDetails(resp.data);
		} catch (error) {}
	};

	useEffect(() => {
		getAccountbaseAccess();
	}, [customerDetails?.incomeGrowth, customerDetails?.fundClassification]);

	const styleSet = {
		wrapper: {
			display: 'grid',
			gridTemplateColumns: 'repeat(3, 1fr)',
			gap: '5px',
			gridAutoRows: '80px'
		},
		tag: {
			display: 'flex',
			backgroundColor: '#F6F7FB',
			color: '#000',
			width: '90%',
			alignItems: 'center',
			padding: 2,
			paddingLeft: 10,
			marginRight: 5
		},
		tagContainer: {
			overflowX: 'auto',
			display: 'flex',
			paddingBottom: 2,
			paddingLeft: 2
		},
		name: {
			whiteSpace: 'nowrap',
			width: '100%',
			overflow: 'hidden',
			textOverflow: 'ellipsis',
			fontSize: 16
		}
	};

	return (
		<>
			<Row gutter={[, 32]}>
				<Col span={8}>
					<TypoGraphy labelSize={'medium'} label={'Account Name'}>
						{customerDetails?.name ?? '-'}
					</TypoGraphy>
				</Col>
				<Col span={8}>
					<TypoGraphy labelSize={'medium'} label={'Nature'}>
						{customerDetails?.schemeTypeName ?? '-'}
					</TypoGraphy>
				</Col>
				<Col span={8}>
					{/* <TypoGraphy labelSize={'medium'} label={'Type'}> */}
					<TypoGraphy labelSize={'medium'} label={'Product Provider'}>
						{customerDetails?.incomeGrowthName ?? '-'}
					</TypoGraphy>
				</Col>

				<Col span={8}>
					<TypoGraphy labelSize={'medium'} label={'Classification'}>
						{customerDetails?.fundClassificationName ?? '-'}
					</TypoGraphy>
				</Col>
				<Col span={8}>
					<TypoGraphy labelSize={'medium'} label={'Linked Account'}>
						{customerDetails?.linkedAccount === '' ? '-' : customerDetails?.linkedAccountName}
					</TypoGraphy>
				</Col>
				<Col span={8}>
					<TypoGraphy labelSize={'medium'} label={'Benchmark'}>
						{customerDetails?.stkexindexName ?? '-'}
					</TypoGraphy>
				</Col>
				{/* <Col span={8}>
                    <TypoGraphy labelSize={"medium"} label={"Primary Holder"}>
                        {customerDetails.modeOfOperationName}
                    </TypoGraphy>
                </Col> */}

				<Col span={8}>
					<TypoGraphy labelSize={'medium'} label={'Holding Pattern'}>
						{customerDetails?.holdingPatternName ?? '-'}
					</TypoGraphy>
				</Col>

				<Col span={8}>
					<TypoGraphy labelSize={'medium'} label={'Investment ID'}>
						{/* {customerDetails?.holdingPatternName === 'Joint' ? jointHolder[0]?.ownership : '-'} */}
						{jointHolder?.[0]?.ownership ?? '-'}
					</TypoGraphy>
				</Col>

				<Col span={8}>
					<TypoGraphy labelSize={'medium'} label={'Account ID'}>
						{/* {console.log('details', customerDetails)} */}
						{/* {customerDetails?.clientId} */}
						{customerDetails?.schemeN ?? '-'}
					</TypoGraphy>
				</Col>

				{/* <Col span={8}>
          <TypoGraphy labelSize={"medium"} label={"Mode of Operation"}>
            {customerDetails?.holdingPatternName === "Single"
              ? "-"
              : customerDetails?.modeOfOperationName}
          </TypoGraphy>
        </Col>
        <Col span={8}>
          <TypoGraphy labelSize={"small"} label={"Account Holder"}>
            {jointHolder?.length > 0 ? (
              <div style={styleSet.tagContainer}>
                {jointHolder?.map((elem, inx) => (
                  <Col span={16} offset={1}>
                    <div style={styleSet.tag}>
                      <div key={inx} style={styleSet.name}>
                        {elem?.name}
                      </div>
                    </div>
                  </Col>
                ))}
              </div>
            ) : (
              "-"
            )}
          </TypoGraphy>
        </Col> */}
				<Col span={24}>
					{/* <AccountJointHolderDetail action='view' dataSource={jointHolder} /> */}
					<AccountJointHolderDetail
						formData={customerDetails}
						action='view'
						dataSource={jointHolder}
					/>
				</Col>

				<Col span={8}>
					<TypoGraphy labelSize={'medium'} label={'Relationship Manager'}>
						{customerDetails?.investmentManagerName ?? '-'}
					</TypoGraphy>
				</Col>
				<Col span={8}>
					<TypoGraphy labelSize={'medium'} label={'Office'}>
						{customerDetails?.branchName ?? '-'}
					</TypoGraphy>
				</Col>
				<Col span={8}>
					<TypoGraphy labelSize={'medium'} label={'Source Of Fund'}>
						{customerDetails?.sourceOfFundName ?? '-'}
					</TypoGraphy>
				</Col>

				<Col span={8}>
					<TypoGraphy labelSize={'medium'} label={'Product Provider Code'}>
						{customerDetails?.productCode ? customerDetails?.productCode : '-'}
					</TypoGraphy>
				</Col>
				<Col span={8}>
					<TypoGraphy labelSize={'small'} label={'Investment Access'}>
						{aMDetails?.investment?.length > 0 ? (
							<div style={styleSet.tagContainer}>
								{aMDetails?.investment?.map((elem, inx) => (
									<Col span={12} offset={1}>
										<div style={styleSet.tag}>
											<div key={inx} style={styleSet.name}>
												{elem?.name}
											</div>
										</div>
									</Col>
								))}
							</div>
						) : (
							'-'
						)}
					</TypoGraphy>
				</Col>
				<Col span={8}>
					<TypoGraphy labelSize={'small'} label={'Market Access'}>
						{aMDetails?.market?.length > 0 ? (
							<div style={styleSet.tagContainer}>
								{aMDetails?.market?.map((elem, inx) => (
									<Col span={12} offset={1}>
										<div style={styleSet.tag}>
											<div key={inx} style={styleSet.name}>
												{elem?.name}
											</div>
										</div>
									</Col>
								))}
							</div>
						) : (
							'-'
						)}
					</TypoGraphy>
				</Col>

				<Col span={8}>
					<TypoGraphy labelSize={'medium'} label={'Tax Status'}>
						{customerDetails?.taxStatusName ?? '-'}
					</TypoGraphy>
				</Col>
				<Col span={8}>
					<TypoGraphy labelSize={'medium'} label={'Referral Branch'}>
						{customerDetails?.referralBranchName ?? '-'}
					</TypoGraphy>
				</Col>
			</Row>
		</>
	);
};
export default AccountDetails;
