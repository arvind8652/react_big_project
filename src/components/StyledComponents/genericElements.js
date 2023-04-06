import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Col, Modal, Rate, Row, Table } from 'antd';
import styled from 'styled-components';

export const ScFontAwesomeIcon = styled(FontAwesomeIcon)`
	font-size: ${(props) => props.fontSize || '16px'};
`;
export const ScAvatarProfileInitialText = styled.div`
	font-size: 24px;
`;
export const ScTag = styled.span`
	padding: 0 20px;
	background: #f0f2fb;
	border-radius: 16px;
	font-family: Open Sans;
	// font-size: 1.2vw;
	line-height: 22px;
	text-align: center;
	color: #696a91;
	@media screen and (min-width: 1400px) {
		font-size: 16px;
	}
`;
export const ScButtonPrimary = styled(Button)`
	margin: ${(props) => props.margin} !important;
	padding: ${(props) => props.padding};
	width: ${(props) => props.width};
	white-space: normal;
	height: auto;
	background: #354081 !important;
	color: #ffffff !important;
	border-radius: 8px;
	font-family: Open Sans;
	font-size: ${(props) => props.fontSize || 'calc(1em + 0.5vw)'};
	/* line-height: 30px; */
	opacity: 0.9;

	&:hover {
		background: #354081;
		opacity: 1;
	}
	@media screen and (min-width: 1400px) {
		/* font-size: 22px; */
	}
`;
export const ScButtonText = styled(Button)`
	position: ${(props) => props.position};
	margin: ${(props) => props.margin || '4px 12px 4px 0px'};
	padding: ${(props) => props.padding || '4px 0px'};
	top: ${(props) => props.top};
	right: ${(props) => props.right};
	bottom: ${(props) => props.bottom};
	left: ${(props) => props.left};
	width: ${(props) => props.width};
	height: auto;
	white-space: normal;
	color: ${(props) => props.color || '#354081'};
	font-family: Open Sans;
	font-weight: ${(props) => props.fontWeight || '500'};
	font-size: ${(props) => props.fontSize || 'calc(1em + 0.5vw)'};
	/* line-height: 30px; */
	opacity: 0.9;
	&:hover {
		opacity: 1;
		color: ${(props) => props.color};
	}
	@media screen and (min-width: 1400px) {
		/* font-size: 22px; */
	}
`;
export const ScModal = styled(Modal)`
	/* .ant-modal { */
	/* height: ${(props) => props.height} !important; */
	/* } */
	width: ${(props) => props.width}!important;
	.ant-modal-content {
		border-radius: ${(props) => props.borderRadius || '16px'} !important;
	}
	.ant-modal-header {
		padding: 36px 32px 0 24px;
		border: none;
		border-radius: ${(props) => props.borderRadius || '16px'} !important;
		.ant-modal-title {
			font-family: Poppins;
			font-weight: 600;
			font-size: 2.2vw;
			line-height: 45px;
			color: #354081;
		}
	}
	.ant-modal-body {
		border-radius: ${(props) => props.borderRadius || '16px'} !important;
		min-height: 5vw;
		height: ${(props) => props.height} !important;
		padding: ${(props) => props.padding || '16px 24px'};
		overflow-y: scroll;
		&::-webkit-scrollbar {
			width: 0px;
		}
		&::-webkit-scrollbar-track {
			background: #f1f1f1;
		}
		&::-webkit-scrollbar-thumb {
			background: rgba(0, 0, 0, 0.15);
		}
		&::-webkit-scrollbar-thumb:hover {
			background: rgba(0, 0, 0, 0.25);
		}
	}
	.ant-modal-footer {
		border: none;
	}

	@media screen and (min-width: 1440px) {
		.ant-modal-header {
			.ant-modal-title {
				font-size: 30px;
				line-height: 45px;
			}
		}
	}
`;
export const ScRate = styled(Rate)`
	font-size: 1.6vw;
	color: #48528d;
`;
export const ScModalHeader = styled.div`
	font-family: Poppins;
	font-weight: 600;
	font-size: ${(props) => props.fontSize || '1.5vw'};
	line-height: 45px;
	color: #354081;
`;
export const ScRow = styled(Row)`
	margin: ${(props) => props.margin};
	padding: ${(props) => props.padding};
	width: ${(props) => props.width || '100%'};
	height: ${(props) => props.height};
`;
export const ScCol = styled(Col)`
	margin: ${(props) => props.margin};
	padding: ${(props) => props.padding};
	width: ${(props) => props.width};
	height: ${(props) => props.height};
`;
export const ScScrollableDiv = styled.div`
	height: ${(props) => props.height};
	max-height: ${(props) => props.maxHeight};
	width: ${(props) => props.width};
	margin: ${(props) => props.margin};
	padding: ${(props) => props.padding};
	background: transparent;
	overflow-y: scroll;
	&::-webkit-scrollbar {
		width: 0px;
	}
	&::-webkit-scrollbar-track {
		background: #f1f1f1;
	}
	&::-webkit-scrollbar-thumb {
		background: rgba(0, 0, 0, 0.15);
	}
	&::-webkit-scrollbar-thumb:hover {
		background: rgba(0, 0, 0, 0.25);
	}
`;
export const ScTable = styled(Table)`
	.ant-spin-nested-loading {
		.ant-spin-container {
			.ant-table {
				border-radius: 16px;
			}
		}

		.ant-table-container table > thead > tr:first-child th:first-child {
			border-top-left-radius: 16px !important;
			background-color: ${(props) => props.backgroundColor}!important;
		}
		.ant-table-container table > thead > tr:last-child th:last-child {
			border-top-right-radius: 16px !important;
			background-color: ${(props) => props.backgroundColor}!important;
		}
		.ant-table-container table > thead > tr th {
			background-color: ${(props) => props.backgroundColor}!important;
		}
	}
`;
export const ScCard = styled(Card)``;
