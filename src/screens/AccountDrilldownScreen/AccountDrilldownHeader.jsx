import React, { useEffect, useState } from 'react';
import { executeGetCustomerInfo } from '../../redux/actions/portfolioOverviewActions';
import { connect } from "react-redux";

import moment from 'moment'

import { Button, Col } from 'antd';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/pro-light-svg-icons';
import { faArrowLeft } from '@fortawesome/pro-solid-svg-icons';
import { faChevronLeft } from '@fortawesome/pro-regular-svg-icons';

const AccountDrilldownHeader = ({ custName, customerInfo = {}, customer, getCurrentDate, getCurrentDate2 }) => {

	let bDate = moment(getCurrentDate2).format('YYYY-MM-DD')


	useEffect(() => {
		const customerRequestBody = {
			data: {
				CustomerID: customer,
				BusinessDate: bDate
			}
		};
		executeGetCustomerInfo(customerRequestBody);
	}, [customer])
	return (
		<>
			<div className="dashboard-topbar-container">
				<div> {' < '}Account Drilldown</div>
			</div>
			<div className="dashboard-topbar-bottom">Home {'>'}{customerInfo?.customerName} {'>'}Account Drilldown</div>
		</>
	);
};

function mapStateToProps(state) {
	return {
		customerInfo: state?.portfolioOverview?.customerInfo,
		customer: state.common.customerInfo.customerCode,
		getCurrentDate: state.auth.user.curDate,
		getCurrentDate2: state.auth.user.prevDate,

	};
};

export default connect(mapStateToProps)(AccountDrilldownHeader);
// export default AccountDrilldownHeader;
