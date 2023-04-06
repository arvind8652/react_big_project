import { AvatarSize } from './constants/AvatarSize';

const pageTitleFontSize =
	window.screen.width < 1200 ? '21px' : window.screen.width < 1500 ? '23px' : '26px';
const pageTitleLineHeightSize =
	window.screen.width < 1200 ? '35px' : window.screen.width < 1500 ? '40px' : '45px';

const pageAddEditButtonFontSize =
	window.screen.width < 1200 ? '13px' : window.screen.width < 1500 ? '16px' : '18px';
const pageAddEditButtonLineHeightSize =
	window.screen.width < 1200 ? '20px' : window.screen.width < 1500 ? '22px' : '25px';
const pageAddEditButtonHeightSize =
	window.screen.width < 1200 ? '34px' : window.screen.width < 1500 ? '38px' : '44px';

const normalFontSize =
	window.screen.width < 1200 ? '11px' : window.screen.width < 1500 ? '13px' : '16px';

export const palette = {
	primary: {
		light: '#55C1B3',
		dark: '#4754A5',
		main: '#5D6DD1',
		heavy: '#2B5680',
		primary: '#1890ff'
	},
	secondary: {
		light: '#696A91',

		main: '#47518B',
		heavy: '#354081'
	},
	invert: {
		light: '#F6F7FB',
		main: '#D9DFFF',
		heavy: '#FFFFFF'
	},
	text: {
		main: '#696A91',
		dark: '#000000',
		heavy: '#000080',
		banner: '#FFFFFF',
		head: '#898EA9',
		success: '#05BC6A',
		card: '#2C2D33',
		scard: '#222747',
		rate: '#48528D',
		cardBrder: '#CBD6FF',
		btn: '#5564C1'
	},
	badge: {
		background: '#F0F2FB'
	}
};

export const fontSet = {
	heading: {
		small: '14px',
		// medium: "18px",
		// medium: "1.1vw",
		medium: normalFontSize,
		subPrimary: '20px',
		// large: "24px",
		// large: '1.6vw',
		large: '1vw',
		// xlarge: "30px",
		xlarge: '2vw',
		xxlarge: '40px',
		card: '#222747'
	},
	body: {
		xsmall: '12px',
		small: '14px',
		medium: '16px',
		// large: "18px",
		// large: "1.1vw",
		large: normalFontSize,
		xlarge: '22px',
		xxlarge: '27px'
	},
	largeFont: {
		heavy: '36px'
	},
	mediumFont: {
		heavy: '20px'
	}
};
export const avatar = {
	largeAvatar: {
		height: '150px',
		width: '150px'
	},
	mediumAvatar: {
		height: '75px',
		width: '75px'
	},
	smallAvatar: {
		height: '50px',
		width: '50px'
	}
};

export const theme = {
	pageTitleFont: {
		fontSize: pageTitleFontSize,
		lineHeight: pageTitleLineHeightSize
	},
	pageAddEditButtonFont: {
		fontSize: pageAddEditButtonFontSize,
		lineHeight: pageAddEditButtonLineHeightSize,
		height: pageAddEditButtonHeightSize
	},
	primaryHeader: {
		fontSize: fontSet.heading.large,
		fontWeight: 600,
		fontFamily: 'Open Sans',
		lineHeight: '33px'
	},
	cartHeading: {
		fontFamily: 'Open Sans',
		fontStyle: 'normal',
		fontWeight: 600,
		fontSize: '36px',
		lineHeight: '49px',
		color: '#5D6DD1'
	},
	bannerHeading: {
		fontFamily: 'Open Sans',
		fontStyle: 'normal',
		fontWeight: 600,
		fontSize: '30px',
		lineHeight: '45px',
		color: '#354081'
	},
	bannerMainHeading: {
		fontFamily: 'Open Sans',
		fontStyle: 'normal',
		fontWeight: 600,
		fontSize: '25px',
		lineHeight: '29.96px',
		color: '#354081'
	},
	bannerSubHeading: {
		fontFamily: 'Open Sans',
		fontStyle: 'normal',
		fontWeight: 400,
		fontSize: '22px',
		lineHeight: '29.96px',
		color: '#354081'
	},
	cartSubHeading: {
		fontFamily: 'Open Sans',
		fontStyle: 'normal',
		fontWeight: 'normal',
		fontSize: '18px',
		lineHeight: '25px',
		color: '#898EA9'
	},
	cartSHeading: {
		fontFamily: 'Open Sans',
		fontStyle: 'normal',
		fontWeight: 'normal',
		fontSize: '14px',
		lineHeight: '19px',
		color: '#898EA9'
	},
	subPrimaryHeader: {
		fontSize: fontSet.heading.subPrimary,
		fontWeight: 600,
		fontFamily: 'Open Sans',
		lineHeight: '27px'
	},
	sCard: {
		fontSize: fontSet.body.large,
		fontWeight: 600
		//fontFamily: "Open Sans",
		//lineHeight: "27px",
		// fontStyle: "normal",
		// fontWeight: "normal",
	},
	secondaryHeader: {
		fontSize: fontSet.heading.medium,
		fontWeight: 600,
		fontFamily: 'Open Sans',
		lineHeight: '25px'
	},
	xSmallHeading: {
		fontSize: fontSet.body.xsmall,
		fontWeight: 600,
		fontFamily: 'Open Sans'
	},
	xLargeHeader: {
		fontSize: fontSet.heading.xlarge,
		fontWeight: 600,
		fontFamily: 'Open Sans',
		lineHeight: '41px'
	},
	largeText: {
		fontSize: fontSet.largeFont.heavy,
		fontWeight: 600,
		fontFamily: 'Open Sans',
		lineHeight: '49px'
	},
	mediumText: {
		fontSize: fontSet.mediumFont.heavy,
		fontWeight: 600,
		fontFamily: 'Open Sans',
		lineHeight: '29px'
	},
	smallText: {
		fontWeight: 600,
		fontFamily: 'Open Sans',
		lineHeight: '19px'
		// fontSize: '11px'
	},
	profileName: {
		fontFamily: 'Open Sans',
		fontStyle: 'normal',
		fontWeight: '600',
		fontSize: '20px',
		lineHeight: '27px',
		color: '#222747'
	},
	profileBoldName: {
		fontFamily: 'Open Sans',
		fontStyle: 'normal',
		fontWeight: '600',
		fontSize: '15px',
		lineHeight: '27px',
		color: '#222747'
	},
	profileTopName: {
		fontFamily: 'Open Sans',
		fontStyle: 'normal',
		fontWeight: '400',
		fontSize: '18px',
		lineHeight: '24px',
		color: '#222747'
	},
	profileNameText: {
		fontFamily: 'Open Sans',
		fontStyle: 'normal',
		fontWeight: '600',
		fontSize: '18px',
		lineHeight: '24px',
		color: '#222747'
	},
	profileTopText: {
		fontFamily: 'Open Sans',
		fontStyle: 'normal',
		fontWeight: '600',
		fontSize: '16px',
		lineHeight: '24px',
		color: '#222747'
	},
	subProfileName: {
		fontFamily: 'Open Sans',
		fontStyle: 'normal',
		fontWeight: '600',
		fontSize: '20px',
		lineHeight: '27px',
		color: '#000000'
	},
	profileTag: {
		fontFamily: 'Open Sans',
		fontStyle: 'normal',
		fontWeight: 'normal',
		fontSize: '14px',
		lineHeight: '19px',
		color: '#696A91'
	},
	profileSmallTag: {
		fontFamily: 'Open Sans',
		fontStyle: 'normal',
		fontWeight: 'normal',
		fontSize: '10px',
		lineHeight: '19px',
		color: '#696A91'
	},
	profileSubText: {
		fontFamily: 'Open Sans',
		fontStyle: 'normal',
		fontWeight: 'normal',
		fontSize: '14px',
		lineHeight: '19px',
		color: '#05BC6A'
	},

	subHeaderName: {
		fontFamily: 'Open Sans',
		fontStyle: 'normal',
		fontSize: '16px',
		lineHeight: '21px',
		color: '#696A91'
	},
	primaryBody: {
		fontSize: fontSet.body.xlarge,
		fontFamily: 'Open Sans'
		// lineHeight: "25px",
	},
	secondaryBody: {
		fontSize: fontSet.body.large,
		fontFamily: 'Open Sans',
		lineHeight: '25px'
	},
	container: {
		//fontFamily: "Open Sans",
		fontStyle: 'normal',
		fontWeight: '600',
		fontSize: '20px',
		lineHeight: '27px'
	},
	tertiaryBody: {
		fontSize: fontSet.body.medium
		//fontFamily: "Open Sans",
		// lineHeight: "25px",
	},
	smallBody: {
		fontSize: fontSet.body.small
		//fontFamily: "Open Sans",
		// lineHeight: "25px",
	},
	xSmallBody: {
		fontSize: fontSet.body.xsmall
		//fontFamily: "Open Sans",
		// lineHeight: "25px",
	},
	subBody: {
		marginBottom: '17px',
		//fontFamily: "Open Sans",
		fontStyle: 'normal',
		fontWeight: '600',
		fontSize: fontSet.body.small,
		lineHeight: '25px'
	},
	//Generic Styling
	dFlex: {
		display: 'flex'
	},
	justify: {
		display: 'flex',
		justifyContent: 'space-around'
	},
	justifyCenter: {
		display: 'flex',
		justifyContent: 'center'
	},
	justifySBetween: {
		display: 'flex',
		justifyContent: 'space-between'
	},
	textCenter: {
		textAlign: 'center'
	},
	textRight: {
		textAlign: 'right'
	},
	headerM: {
		margin: '15px 0px'
	},
	cardStyle: {
		border: `1px solid ${palette.text.cardBrder}`,
		borderRadius: '8px'
		// marginBottom: '15px'
	},
	cardHeaderStyle: {
		fontSize: fontSet.heading.large,
		color: fontSet.heading.card
	}
};

export const LogoSize = {
	large: 120,
	medium: 80,
	small: 36
};
export const POLO_BLUE = '#939DD4';

export const RESP_FIELD_SIZE =
	window.screen.width < 1200 ? 'small' : window.screen.width < 1500 ? 'default' : 'large';
export const RESP_TEXT_AREA_ROW =
	window.screen.width < 1200 ? 2 : window.screen.width < 1500 ? 3 : 4;
export const RESP_MODAL_SUBMIT_FONTSIZE =
	window.screen.width < 1200 ? '13px' : window.screen.width < 1500 ? '16px' : '18px';
export const RESP_SUBHEADING_FONTSIZE =
	window.screen.width < 1200 ? '14px' : window.screen.width < 1500 ? '16px' : '18px';
export const RESP_NORMALXXS_FONTSIZE =
	window.screen.width < 1200 ? '9px' : window.screen.width < 1500 ? '10px' : '12px';
export const RESP_NORMALXS_FONTSIZE =
	window.screen.width < 1200 ? '9px' : window.screen.width < 1500 ? '11px' : '13px';
export const RESP_NORMALS_FONTSIZE =
	window.screen.width < 1200 ? '10px' : window.screen.width < 1500 ? '12px' : '15px';
export const RESP_NORMAL_FONTSIZE =
	window.screen.width < 1200 ? '11px' : window.screen.width < 1500 ? '13px' : '16px';
export const RESP_NORMALX_FONTSIZE =
	window.screen.width < 1200 ? '12px' : window.screen.width < 1500 ? '14px' : '17px';
export const RESP_HEADING_FONTSIZE =
	window.screen.width < 1200 ? '21px' : window.screen.width < 1500 ? '23px' : '26px';
export const RESP_AVATAR_SIZE_FOR_INPUT_FIELD =
	window.screen.width < 1200
		? AvatarSize.xs
		: window.screen.width < 1500
		? AvatarSize.extrasmall
		: AvatarSize.small;
export const RESP_AVATAR_SIZEXS_FOR_INPUT_FIELD =
	window.screen.width < 1200 ? 18 : window.screen.width < 1500 ? 24 : 30;
export const RESP_AVATAR_SIZES_FOR_INPUT_FIELD =
	window.screen.width < 1200 ? 30 : window.screen.width < 1500 ? 35 : 45;
