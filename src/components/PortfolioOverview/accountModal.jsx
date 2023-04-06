import ModalView from '../../screens/EngagementOverviewScreen/modalView/modalView';
import TableListing from '../../screens/EngagementOverviewScreen/tableListing/tableListing';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/pro-solid-svg-icons';
import TaskInteractionTable from '../../components/InteractionTable/TaskInteractionTable';
import {
	ScButtonText,
	ScModal,
	ScRate,
	ScRow,
	ScScrollableDiv
} from '../../components/StyledComponents/genericElements';
import { currencyFormatter, exportJSON, generateCsObject } from '../../utils/utils';
import moment from 'moment';
import ProfileAccountTableData from '../CommonCards/ProfileAccountTableData';

const modalData = {
	title: ''
};

export default function AccountModal(props) {
	const tableData = props.data;
	const columns = props.columns;

	return (
		<ScModal
			visible={props.showModal}
			onCancel={() => props.setShowModal(!props.showModal)}
			title={props.title}
			footer={null}
			width='70vw'
			borderRadius='16px'
			centered
		>
			{/* <ScScrollableDiv height={"90%"}>
                {Array.isArray(tableData) && tableData.length > 0 ? (
                    <ProfileAccountTableData
                        tableData={tableData}
                    // onClickEdit={onClickEdit}
                    />
                ) : (
                        "No Record Found"
                    )}
            </ScScrollableDiv> */}
		</ScModal>
	);
}
