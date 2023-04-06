import { Form, Input, Button, Checkbox } from 'antd';
import InvestmentPolicy from './screens/FinancialPlanningCO/InvestmentPolicyPdf/InvestmentPolicy';
import CIAFPersonal from './screens/PdfForms/Securities/CIAFPersonal/CIAFPersonal';
import SigCardPersonal from './screens/PdfForms/Securities/SigCardPersonal';
import IMAPersonal from './screens/PdfForms/Trusts/IMAPersonal/IMAPersonal';
import SecCret from './screens/PdfForms/Trusts/SecCret';

const TestingComponent = () => {
	const onFinish = (values) => {
		console.log('Success:', values);
	};

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	// return <SigCardPersonal />;
	// return <CIAFPersonal />;
	// return <SecCret />;
	// return <IMAPersonal />;
	return <InvestmentPolicy />;
};

export default TestingComponent;
