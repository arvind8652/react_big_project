import { theme } from '../../theme';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Tooltip, Radio } from 'antd';
import { uniqueByKey } from './TopbarUtils';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { NoDataFound } from './NoDataFound';

export const Opportunityview = ({
	opprotunityList = [],
	showFilter = false,
	allowScroll = false,
	onClose = () => {
		console.log('clicked');
	}
}) => {
	const [filterArray, setFilterArray] = useState([]);
	const [tabValue, setTabValue] = useState('All');
	const [opprotunityFilterList, setOpprotunityFilterList] = useState(opprotunityList);
	const { path } = useRouteMatch();

	useEffect(() => {
		let result = uniqueByKey(opprotunityList, 'stage');
		setFilterArray(result);
		setOpprotunityFilterList(opprotunityList);
	}, [opprotunityList]);
	const history = useHistory();

	const changeTabPosition = (e) => {
		setTabValue(e.target.value);
		if (e.target.value === 'All') {
			setOpprotunityFilterList(opprotunityList);
		} else {
			setOpprotunityFilterList(opprotunityList.filter((item) => item.stage === e.target.value));
		}
	};
	const onCellDefault = (row) => {
		const opportunityIds = opprotunityFilterList.map((item) => item.opportunityId);
		const index = [
			...opprotunityFilterList.map((item, index) => {
				if (item.opportunityId === row.opportunityId) {
					return index;
				} else return null;
			})
		].filter((item) => item !== null);
		const toObject = {
			pathname: `/dashboard/MyOpportunity/OpportunityView`,
			state: {
				opportunityIds: opportunityIds,
				rowIndex: index[0],
				miniMode: false
			}
		};
		history.push(toObject);
		onClose();
	};

	const OpportunityWrapper = () => {
		return opprotunityFilterList.length > 0 ? (
			<OpportunityCardView />
		) : (
			<NoDataFound name={'Opportunities'} />
		);
	};

	const OpportunityCardView = () => {
		return opprotunityFilterList.map((ins) => {
			return (
				<Col span={12}>
					<Card style={{ borderRadius: '12px' }}>
						<Row onClick={() => onCellDefault(ins)}>
							<Col style={{ marginRight: '12%' }}>
								<Row style={theme.profileNameText}>
									<Tooltip placement='topLeft' title={ins.opportunityName}>
										{ins.opportunityName}
									</Tooltip>
								</Row>
								<Row style={theme.profileTopText}>
									{ins.currencySymbol}
									{ins.targetAmount}
								</Row>
								<Row style={theme.profileTag}>{ins.stage}</Row>
							</Col>
							<Col style={{ marginRight: '12%' }}>
								<Row style={theme.profileTopText}>{ins.clientProspectName}</Row>
								<Row style={theme.profileTag}>{'Prospect'}</Row>
							</Col>
							<Col>
								<Row style={theme.profileTopText}>{moment(ins.dueDate).format('DD-MM-YYYY')}</Row>
								<Row style={theme.profileTag}>{'Due Date'}</Row>
							</Col>
						</Row>
					</Card>
				</Col>
			);
		});
	};
	return (
		<>
			<Row style={{ width: '100%' }}>
				{showFilter && filterArray.length > 0 ? (
					<Radio.Group value={tabValue} buttonStyle='solid' onChange={changeTabPosition}>
						<Radio.Button value='All'>All</Radio.Button>
						{filterArray.map((ele) => {
							return (
								<Radio.Button style={{ marginLeft: '5px' }} value={ele.stage}>
									{ele.stage}
								</Radio.Button>
							);
						})}
					</Radio.Group>
				) : null}
			</Row>
			{allowScroll ? (
				<div style={{ overflow: 'auto', height: '550px', marginTop: '10px' }}>
					<Row gutter={[16, 16]}>
						<OpportunityWrapper />
					</Row>
				</div>
			) : (
				<Row gutter={[16, 16]}>
					<OpportunityWrapper />
				</Row>
			)}

			{}
		</>
	);
};
