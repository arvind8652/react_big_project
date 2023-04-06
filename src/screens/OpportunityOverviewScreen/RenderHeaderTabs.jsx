import React from 'react';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

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

export default RenderHeaderTabs;
