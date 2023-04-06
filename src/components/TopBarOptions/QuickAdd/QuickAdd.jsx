import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as FAIcon from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GenericDrawer from '../../GenericDrawer/GenericDrawer';

import { PlusOutlined } from '@ant-design/icons';

export const QuickAdd = ({
	quickAddMenuItems,
	isQuickAddVisible,
	toggleQuickAddDrawer,
	onCloseQuickAddDrawer,
	setOrderModalVisible
}) => {
	const [quickAddData, setQuickAddData] = useState([]);

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

	const getFAIcon = (name) => {
		return <FontAwesomeIcon icon={name} size='1x' color='#D8E6FD' style={styleSet.quickAddIcon} />;
	};

	const handleOnQuickAddItemPress = (path, menuName) => {
		if (menuName === 'Order') {
			toggleQuickAddDrawer();
			setOrderModalVisible(true);
			// setOrderModalVisible(true);
		} else {
			toggleQuickAddDrawer();
			if (path) history?.push(path);
		}
	};

	const renderQuickAddDrawerContent = () => {
		return (
			<ol className='quickAddItemContainer'>
				{quickAddData?.map((e, idx) => {
					return (
						<li onClick={() => handleOnQuickAddItemPress(e?.routeURL, e?.menuName)} key={idx}>
							<div className='quickAddItem'>
								<div className='quickAddItemFirstCol'>
									<div className='quickAddIconContainer'>{e?.icon}</div>

									<div className='divTag'>{e?.menuName}</div>
								</div>

								<PlusOutlined style={styleSet.quickAddPlusIcon} />
							</div>
							<div className='line' />
						</li>
					);
				})}
			</ol>
		);
	};

	const getIcons = () => Object.keys(FAIcon)?.map((e) => ({ name: e, icon: FAIcon[e] }));

	useEffect(() => {
		const newQuickAddData = quickAddMenuItems?.map((menuItem) => {
			const menuIcon = getIcons().find((e) => e?.name === menuItem?.icon)?.icon;
			return {
				...menuItem,
				routeURL: menuItem?.routeURL,
				icon: getFAIcon(menuIcon),
				menuName: menuItem?.menuName
			};
		});
		setQuickAddData(newQuickAddData);
	}, [quickAddMenuItems]);

	return (
		<GenericDrawer
			showDrawer={isQuickAddVisible}
			renderBody={renderQuickAddDrawerContent()}
			onCloseDrawer={onCloseQuickAddDrawer}
			bodyStyle={{ padding: '0px' }}
		/>
	);
};
