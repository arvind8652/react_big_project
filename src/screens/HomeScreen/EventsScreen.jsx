import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Tabs, Card } from 'antd';

import 'antd/dist/antd.css';

import { theme } from '../../theme';

import EventDataScreen from './EventDataScreen';

const { TabPane } = Tabs;
const EventsScreen = ({ allActivityData }) => {
	const [key, setKey] = useState('Reminder');

	const tabListNoTitle = [
		{
			key: 'Reminder',
			tab: 'Reminder'
		},
		{
			key: 'Interactions',
			tab: 'Interactions'
		},
		{
			key: 'Tasks',
			tab: 'Tasks'
		}
	];

	const groupBy = (items, key) => {
		const filterObject = items.reduce(
			(result, item) => ({
				...result,
				[item[key]]: [...(result[item[key]] || []), item]
			}),
			{}
		);
		setTabsApiData(filterObject);
	};

	const [tabsApiData, setTabsApiData] = useState([]);

	useEffect(() => {
		if (allActivityData) {
			groupBy(allActivityData, 'activityNature');
		}
	}, [allActivityData]);

	const interactionOptions = [
		// 'Take Note',
		'Create New Interaction',
		'Create Task',
		'Create Opportunity',
		'Update Prospect/Client'
	];
	const taskOptions = [
		// 'Take Note',
		'Create New Interaction',
		'Create Task',
		'Create Opportunity',
		'Update Prospect/Client'
	];

	const contentListNoTitle = {
		Reminder: <EventDataScreen eventData={tabsApiData.Reminder} tabType={key} />,
		Interactions: (
			<EventDataScreen
				eventData={tabsApiData.Interaction}
				tabType={key}
				meatballOptions={interactionOptions}
			/>
		),
		Tasks: (
			<EventDataScreen eventData={tabsApiData.Task} tabType={key} meatballOptions={taskOptions} />
		)
	};

	const onTabChange = (key, type) => {
		setKey(key);
	};

	return (
		<>
			<Card
				// style={{ ...theme.cardStyle, width: '100%' }}
				tabList={tabListNoTitle}
				activeTabKey={key}
				style={theme.cardStyle}
				onTabChange={(key) => {
					onTabChange(key, 'key');
				}}
			>
				{contentListNoTitle[key]}
			</Card>
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		allActivityData: state.crmHome.activity
	};
};

export default connect(mapStateToProps)(EventsScreen);
