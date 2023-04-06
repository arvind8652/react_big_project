import React from 'react';
import { Col, Row, Tabs } from 'antd';
import moment from 'moment';
import { faExternalLinkAlt } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GenericDrawer from '../../GenericDrawer/GenericDrawer';
import 'antd/dist/antd.css';
import './App.css';
import { Month } from './Month';
import { Schedule } from './Schedule';
import { useHistory } from 'react-router-dom';

const { TabPane } = Tabs;
export const Calender = ({ isQuickAddVisible, toggleQuickAddDrawer, onCloseQuickAddDrawer }) => {
	const history = useHistory();

	const styleSet = {
		quickAddPlusIcon: {
			fontSize: '24px',
			color: '#ffffff'
		},
		quickAddIcon: {
			marginLeft: '20px'
		}
	};

	const openBigCalendar = () => {
		const toObject = {
			pathname: `/dashboard/Calendar`
			// state: {
			//   clientObject: row
			// },
		};
		onCloseQuickAddDrawer();
		history.push(toObject);
	};

	const renderQuickAddDrawerContent = () => {
		return (
			<div>
				<Row>
					<Col span={18}>
						<h1 className='time'>{moment().format('LT')}</h1>
					</Col>
					<Col span={4}>
						<div onClick={openBigCalendar}>
							<FontAwesomeIcon
								icon={faExternalLinkAlt}
								size='2x'
								color='#D8E6FD'
								style={styleSet.quickAddIcon}
							/>
						</div>
					</Col>
					<Col span={2}></Col>
				</Row>
				<Row>
					<h3 className='day'>
						{`${moment().format('dddd')}, `}
						{moment().format('LL')}
					</h3>
				</Row>

				<Tabs defaultActiveKey='1'>
					<TabPane tab='Schedule' key='1'>
						<Schedule />
					</TabPane>
					<TabPane tab='Month' key='2'>
						<Month />
					</TabPane>
				</Tabs>
			</div>
		);
	};

	return (
		<div>
			<GenericDrawer
				showDrawer={isQuickAddVisible}
				closable={true}
				renderBody={renderQuickAddDrawerContent()}
				onCloseDrawer={onCloseQuickAddDrawer}
				buttonFooter={[]}
			/>
		</div>
	);
};
