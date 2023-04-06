import React from 'react';
import { ScButtonText } from '../../../components/StyledComponents/genericElements';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/pro-solid-svg-icons';
import { Row, Table, Col, Card } from 'antd';
import GenericTable from '../../../components/GenericTable/GenericTable';
import { authorizeModule } from '../../../utils/utils';
import { CONSTANTS } from '../../../constants/constants';

const DemoModal = (props) => {
	const {
		authorizeCode,
		columns = [],
		tableRows = [],
		downloadFunction = () => console.log('Download Report')
	} = props;
	const downloadRecords = () => {
		downloadFunction(tableRows);
	};
	const downloadAuth = authorizeModule(authorizeCode, CONSTANTS.authorizeCode.download);
	return (
		<>
			<Table columns={columns} dataSource={tableRows} scroll={{ y: 400 }} />
			{/* <GenericTable tableColumns={columns} tableRows={tableRows} /> */}
			<Row style={{ marginTop: '20px' }}>
				<ScButtonText
					type='text'
					margin='18px 0 0 auto'
					padding='4px 15px'
					position='absolute'
					bottom='5px'
					right='0px'
					left='auto'
					color='#354081'
					onClick={() => {
						downloadAuth && downloadRecords();
					}}
				>
					{downloadAuth && <FontAwesomeIcon icon={faDownload} />}
					&nbsp;&nbsp;{downloadAuth ? 'Download report' : ''}
				</ScButtonText>
			</Row>
		</>
	);
};
export default DemoModal;
