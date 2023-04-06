import React, { useState } from 'react';
import { Row, Col, Button, Tabs, Card } from 'antd';
import 'antd/dist/antd.css';
import ReminderTabPage from './ReminderTabPage';
import InteractionTabPage from './InteractionTabPage';
import { theme, fontSet, palette } from '../../theme';
import CalendarScreen from '../../screens/CalendarScreen/CalendarScreen';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

const { TabPane } = Tabs;
const defaultFunction = (event) => {};
const EventsScreen = ({ calederInfo }) => {
	// viewClick = defaultFunction

	// function handleCreateOpportunityClick() {
	//     const toObject = {
	//         pathname: "/dashboard/MyOpportunity/OpportunityCreate",
	//     };

	//     // history.push(toObject);
	// }
	const history = useHistory();
	const openBigCalendar = () => {
		const toObject = {
			pathname: `/dashboard/Calendar`
		};
		// onCloseQuickAddDrawer();
		history.push(toObject);
	};

	const RenderTabs = () => {
		const [activeTab, setActiveTab] = useState('0');
		const [loading, setLoading] = useState(true);
		const RenderHeaderTabs = ({ tabs, activeTab, setActiveTab }) => {
			const handleTabChange = (key) => {
				setActiveTab(key);
			};
			return (
				<Tabs activeKey={activeTab} onChange={handleTabChange}>
					{tabs.map((tab, index) => {
						return <TabPane tab={<div>{tab.title}</div>} key={index} />;
					})}
				</Tabs>
			);
		};
		const tabs = [
			{
				title: 'Reminder',
				component: <ReminderTabPage />
			},
			{
				title: 'Interactions',
				component: <InteractionTabPage />
			},
			{
				title: 'Tasks',
				component: <InteractionTabPage />
			}
		];
		return (
			<Card
				// className="rc-m-d-card"
				title={<RenderHeaderTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />}
			>
				{tabs[activeTab].component}
				<Row>
					<Col span={24}>
						{/* <Button size={"large"} style={feedsStyle.button} onClick={openBigCalendar}>
                            View Calender
                        </Button> */}
					</Col>
				</Row>
			</Card>
		);
	};

	const feedsStyle = {
		button: {
			borderRadius: '8px',
			//fontSize: "22px",
			width: 'max-content',
			//float: "right",
			color: '#47518B'
		},
		btnStyle: {
			border: '1px solid #6674C7',
			borderRadius: '8px',
			fontSize: fontSet.body.large,
			color: palette.text.btn
		}
	};

	return (
		<>
			<div style={theme.cardStyle}>
				<RenderTabs />
			</div>
		</>
	);
};

// const mapStateToProps = (state) => {
//     return {
//         calederData: state.calerderData.calederData,
//     };
//   };

export default EventsScreen;
