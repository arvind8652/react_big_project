import React, { useState, useEffect } from 'react';
import CustomBigCalendar from '../../components/CustomBigCalendar/CustomBigCalendar';
import TopBarHeader from '../../components/TopBarHeader/TopBarHeader';
import { getCalederDataApi } from '../../api/calederApi';
import moment from 'moment';
import { Card } from 'antd';

const CalendarScreen = (props) => {
	return (
		<div>
			<TopBarHeader headerName={'Calendar'} />
			<Card style={{ borderRadius: '20px' }}>
				<CustomBigCalendar />
			</Card>
		</div>
	);
};

export default CalendarScreen;
