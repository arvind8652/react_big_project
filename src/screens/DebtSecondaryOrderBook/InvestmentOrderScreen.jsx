import React from 'react';
import './InvestmentOrderScreen.scss';
import DashboardScreenTopbar from '../../components/DashboardScreenTopbar/DashboardScreenTopbar';
import { SecurityDetails } from '../PrimaryMarket/SecurityDetails';
import OtherDetails from '../../components/Forms/CustomerOtherDetailsFormCard/CustomerOtherDetailsFormCard';
import AddressDetails from '../../components/Forms/CustomerAddressDetailsFormCard/CustomerAddressDetailsFormCard';
import DocumentsDetail from '../../components/Forms/CustomerDocumentsDetailFormCard/CustomerDocumentsDetailFormCard';
import UploadByFormat from '../../components/UploadByFormat/UploadByFormat';
import { useHistory, useLocation } from 'react-router-dom';
import { Form, Space, Button } from 'antd';

const InvestmentOrderScreen = (props) => {
	const [ form ] = Form.useForm();
	const history = useHistory();
	const location = useLocation();
	return (
		<div className="investment-order-container">
			<DashboardScreenTopbar
				screenText={'Investment Order'}
				breadCrumb="Transactions  >  Orderbook  >  Mutual Funds"
				cancelBtnText="Cancel"
				submitBtnText="Place Now"
				// onSubmit={handleFormSubmit}
				onCancel={() => {
					history.goBack();
				}}
			/>
			<Space direction="vertical" size={16} className="parent-form-container">
				<OtherDetails
					form={form}
					// formData={customerFormData}
					// onValuesChange={handleCustomerFormChange}
					// rules={rules.length > 0 ? rules[0] : undefined}
					// csObject={csObject[0]}
				/>
				<AddressDetails
					form={form}
					// formData={customerFormData}
					// onValuesChange={handleCustomerFormChange}
					// rules={rules.length > 0 ? rules[0] : undefined}
					// csObject={csObject[0]}
				/>
				<DocumentsDetail
					form={form}
					// formData={customerFormData}
					// onValuesChange={handleCustomerFormChange}
					// rules={rules.length > 0 ? rules[0] : undefined}
					// removeAttachment={removeAttachment}
					// csObject={csObject[4]}
				/>
				<UploadByFormat
					uploadFormat="attachments"
					form={form}
					// formData={customerFormData}
					// onValuesChange={handleCustomerFormChange}
					// rules={rules.length > 0 ? rules[0] : undefined}
					// removeAttachment={removeAttachment}
					// csObject={csObject[0]}
				/>
			</Space>
		</div>
	);
};

export default InvestmentOrderScreen;
