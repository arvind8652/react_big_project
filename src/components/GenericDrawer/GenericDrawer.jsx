import { Button, Drawer } from 'antd';
import './GenericDrawer.scss';
/*
    REFER THIS OBJECT

    showDrawer={true}
    onCloseDrawer={() => {
    }}
    renderFooter={<p style={styles.clearAllText}>Clear all</p>}
    buttonFooter={[
    {
        buttonProps: {
        style: {},
        type: 'text',
        // any required props for the button
        },
        title: 'Submit',
        onButtonClick: {},
    },
    {
        buttonProps: {
        style: {},
        type: 'primary',
        className: 'submit-btn',
        },
        title: 'Cancel',
        onButtonClick: {},
    },
    ]}
    renderBody={<NotificationBody />}

    ONE MORE EXAMPLE 
    <GenericDrawer
      showDrawer={showNotifications}
      onCloseDrawer={() => {
        toggleNotifications(!showNotifications);
      }}
      closable={true}
      renderBody={<NotificationBody />}
      renderFooter={<p style={styles.clearAllText}>Clear All Notifications</p>}
    />
*/

const styles = {
	baseStyle: { marginTop: '5.15em', height: '93%' },
	footerStyle: { paddingBottom: '2em' }
};

const GenericDrawer = ({
	showDrawer = false,
	onCloseDrawer = () => {
		console.log('OnClose Clicked for drawer');
	},
	closable = false,
	renderBody = '',
	buttonFooter = [],
	renderFooter = null,
	headerStyle = {},
	footerStyle = {},
	contentWrapperStyle = {},
	drawerStyle = {},
	bodyStyle = {},
	drawerWidth = '47vh'
}) => {
	return (
		<Drawer
			keyboard={true}
			width={drawerWidth}
			visible={showDrawer}
			onClose={onCloseDrawer}
			closable={closable}
			className='drawerContainer'
			headerStyle={headerStyle}
			contentWrapperStyle={contentWrapperStyle}
			drawerStyle={drawerStyle}
			bodyStyle={bodyStyle}
			footerStyle={{ ...styles.footerStyle, ...footerStyle }}
			style={{ ...styles.baseStyle, overflow: 'scroll' }}
		>
			{renderBody}
			{buttonFooter && (
				// <div style={{ position: "fixed", bottom: "2%", right: "2%" }}>
				<div align={'right'}>
					{buttonFooter.map((buttonInfo, idx) => (
						<Button {...buttonInfo.buttonProps} onClick={buttonInfo.onButtonClick} key={idx}>
							{buttonInfo.title}
						</Button>
					))}
				</div>
			)}
			{renderFooter && (
				<div style={{ position: 'fixed', bottom: '2%', right: '2%' }}>{renderFooter}</div>
			)}
		</Drawer>
	);
};

export default GenericDrawer;
