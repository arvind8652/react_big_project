import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faDownload } from '@fortawesome/pro-solid-svg-icons';
import TaskInteractionTable from '../../components/InteractionTable/TaskInteractionTable';
import {
	ScButtonText,
	ScModal,
	ScScrollableDiv
} from '../../components/StyledComponents/genericElements';
import { exportJSON } from '../../utils/utils';
import moment from 'moment';
import { authorizeModule } from '../../utils/utils';
import { CONSTANTS } from '../../constants/constants';

export default function RecentModal(props) {
	const tableData = props.data;
	const authorizeCode = props.authorizeCode;
	// const columns = props.columns;
	const downloadRecords = () => {
		const downloadData = tableData.map((opp, index) => ({
			'Sr.No': index + 1,
			Subject: opp.activityDetail.subject,
			Type: opp.activityDetail.interactionType,
			'Due Date': moment(opp.activityDetail.activityDate).format('DD MMM YYYY'),
			Purpose: opp.activityDetail.activityPurpose,
			'Client/Prospect Name': opp.activityDetail.refType
		}));
		// exportJSON(downloadData, props?.title?.props?.children?.replace(/ /g, ''));
		exportJSON(downloadData, props?.title?.replace(/ /g, ''));
	};
	const downLoadAuth = authorizeModule(authorizeCode, CONSTANTS.authorizeCode.download);

	return (
		<ScModal
			visible={props.showModal}
			onCancel={() => props.setShowModal(!props.showModal)}
			title={<h5>{props.title}</h5>}
			footer={null}
			width='70vw'
			borderRadius='16px'
			centered
		>
			<div>
				<ScScrollableDiv height={'90%'}>
					{Array.isArray(tableData) && tableData.length > 0 ? (
						<TaskInteractionTable
							tableData={tableData}
							miniMode={true}
							// onClickEdit={onClickEdit}
						/>
					) : (
						'No Record Found'
					)}
				</ScScrollableDiv>

				<ScButtonText
					type='text'
					margin=' 0 0 0 auto'
					// position='absolute'
					right='0px'
					left='auto'
					color='#354081'
					onClick={() => {
						downLoadAuth && downloadRecords();
					}}
				>
					{downLoadAuth && <FontAwesomeIcon icon={faDownload} />}
					&nbsp;&nbsp;{downLoadAuth ? 'Download report' : ''}
				</ScButtonText>
			</div>
		</ScModal>
	);
}
