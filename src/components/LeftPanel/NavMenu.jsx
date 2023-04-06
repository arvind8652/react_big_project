import React, { useState } from 'react';
import {
	Layout,
	Collapse,
	Menu,
	Popover,
	Avatar,
	Button,
	Card,
	Select,
	Tabs,
	Row,
	Modal,
	Col,
	Space,
	Dropdown,
	Typography,
	Progress
} from 'antd';
import './leftPanel.scss';
import { fetchAsset } from '../../utils/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/pro-regular-svg-icons';
import MenuList from '../MenuList/MenuList';
import { Link, NavLink, useRouteMatch } from 'react-router-dom';
import { palette, theme } from '../../theme';
import AvatarLogo from '../../components/Avatar/AvatarLogo';
import { AvatarSize } from '../../constants/AvatarSize';

const { Panel } = Collapse;

const NavMenu = ({ leftPanelData, expandLeftPanel, avatarSize }) => {
	const { url, path } = useRouteMatch();

	const renderMenu = () => {
		return (
			<>
				{leftPanelData.leftPanel?.map((menuItem, index) => {
					return (
						<>
							{menuItem.subMenu.length === 0 ? (
								<div className='leftPanelItem' style={{ paddingLeft: expandLeftPanel ? 25 : 0 }}>
									{/* render respective icon */}
									{menuItem.title}
								</div>
							) : expandLeftPanel ? (
								MenuListMapper(menuItem, index, expandLeftPanel)
							) : (
								<Popover placement='rightBottom' content={MenuList(url, menuItem.subMenu)}>
									<div className='leftPanelItem'>
										<img src={fetchAsset('icon', menuItem.icon)} alt='logo' className='icon' />
										{menuItem.title}
									</div>
								</Popover>
							)}
						</>
					);
				})}
			</>
		);
	};

	const MenuListMapper = (menuItem, index, expandLeftPanel) => {
		return (
			<Panel
				style={{ border: 0 }}
				header={
					<div className='leftPanelItem'>
						<img src={fetchAsset('icon', menuItem?.icon)} alt='logo' className='icon' />
						{menuItem?.title}
					</div>
				}
				key={index}
			>
				{renderPanelDropdown(menuItem, expandLeftPanel)}
			</Panel>
		);
	};

	const renderPanelDropdown = (menuItem, expandLeftPanel) => {
		return (
			<>
				{expandLeftPanel &&
					menuItem.subMenu.map((item, index) => (
						<NavLink
							to={`${path}/${item.routeURL}`}
							className='submenu-item-container'
							activeClassName='submenu-item-background'
							style={{
								display: 'flex',
								justifyContent: 'left',
								padding: '19px 0 19px 50px',
								margin: index === 0 ? '0 -16px -16px' : '16px -16px -16px'
							}}
						>
							<div
								style={{
									fontFamily: 'Open Sans',
									fontSize: 16,
									// lineHeight: 25,
									color: '#d8e6fd'
								}}
							>
								{item.subMenuTitle}
							</div>
						</NavLink>
					))}
			</>
		);
	};

	return (
		<>
			{expandLeftPanel ? (
				<Collapse
					bordered={false}
					expandIconPosition='right'
					style={{
						backgroundColor: '#354081'
					}}
					accordion
				>
					{renderMenu()}
				</Collapse>
			) : (
				renderMenu()
			)}
		</>
	);
};
export default NavMenu;
