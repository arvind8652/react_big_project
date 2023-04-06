import React, { useState } from 'react';
import { Row, Col, Checkbox, Typography } from 'antd';
import rcbclogo from '../../../../assets/img/rcbc.png';
import './Amf.scss';

const { Text } = Typography;

const AmfForm = () => {
	const [data] = useState([1, 2, 3, 4, 5]);

	return (
		<div className='amf-page'>
			<Row className='nest-amf-page' align='middle'>
				<Col>
					<Row>
						<img src={rcbclogo} alt='rcbcLogo' height='100px' width='100px' />
						<Text className='logo-text'>Securities,Inc.</Text>
					</Row>
				</Col>
				<Col style={{ marginLeft: '25%' }}>
					<Text className='head-Text'>ACCOUNT MAINTENANCE FORM</Text>
					<h1 className='head-Text'>2018 Version 1 </h1>
				</Col>
			</Row>
			<Row className='border-page'>
				<Col span={7} style={{ height: '70px' }}>
					<Row>
						<Text className='head-Text'>ACCOUNT NAME:</Text>
						<Text className='head-Text' style={{ marginTop: '20px' }}>
							PRIMARY:
						</Text>
					</Row>
				</Col>
				<Col span={3}>
					<Text className='head-Text'>Last</Text>
				</Col>
				<Col span={3}>
					<Text className='head-Text'>First</Text>
				</Col>
				<Col span={3} style={{ borderRight: '2px solid #888' }}>
					<Text className='head-Text'>M.I</Text>
				</Col>
				<Row>
					<Text className='head-Text'>DATE</Text>
					<Text className='head-Text'>ACCOUNT CODE</Text>
				</Row>
			</Row>
			<Row className='border-page'>
				<Text className='head-Text' style={{ height: '30px' }}>
					SECONDARY:
				</Text>
			</Row>
			<Row className='border-page'>
				<Text className='head-Text' style={{ height: '30px' }}>
					TERTIARY:
				</Text>
			</Row>
			<Row className='border-page'>
				<Text className='head-Text' style={{ height: '30px' }}>
					Please process the following pertaining to the account stated above:
				</Text>
			</Row>
			<Row className='border-page'>
				<Col span={24}>
					<Row>
						<Checkbox className='checkbox-margin' true>
							<Text className='head-Text'>Account Information</Text>
						</Checkbox>
					</Row>
					<Row>
						<Col span={24} offset={1}>
							<Text className='unerline-text'>First Name:</Text>{' '}
							<input type='text' id='fname' name='fname' readOnly></input>
						</Col>
					</Row>
					<Row>
						<Col span={24} offset={1}>
							<Text className='unerline-text'>Marital Status:</Text>{' '}
							<input type='text' id='status' name='fname' readOnly />
							<Text className='unerline-text'>Natiionality:</Text>{' '}
							<input type='text' id='status' name='fname' readOnly />
							<Text className='unerline-text'>TIN No.:</Text>{' '}
							<input type='text' id='status' name='fname' readOnly />
						</Col>
					</Row>

					<Row>
						<Col span={24} offset={1}>
							<Text className='unerline-text'>Annual Income:</Text>{' '}
							<input type='text' id='status' name='fname' readOnly />
							<Text className='unerline-text'>Assets:</Text>{' '}
							<input type='text' id='status' name='fname' readOnly />
							<Text className='unerline-text'>Net Worth:</Text>{' '}
							<input type='text' id='status' name='fname' readOnly />
						</Col>
					</Row>
					<Row>
						<Col span={4} offset={1}>
							<Text className='unerline-text'>Address</Text>
						</Col>
					</Row>
					<Row>
						<Col span={24} offset={2}>
							( ) <Text className='unerline-text'>Net Worth:</Text>{' '}
							<input type='text' id='fname' name='fname' readOnly />
						</Col>
						<Col span={24} offset={2}>
							( ) <Text className='unerline-text'>Permanent:</Text>{' '}
							<input type='text' id='fname' name='fname' readOnly />
						</Col>
						<Col span={24} offset={2}>
							( ) <Text className='unerline-text'>Mailing:</Text>{' '}
							<input type='text' id='fname' name='fname' readOnly />
						</Col>
					</Row>

					<Row>
						<Col span={4} offset={1}>
							<Text className='unerline-text'>Phone</Text>
						</Col>
					</Row>
					<Row>
						<Col span={24} offset={2}>
							( ) <Text className='unerline-text'>Home:</Text>{' '}
							<input type='text' id='fname' name='fname' readOnly />
						</Col>
						<Col span={24} offset={2}>
							( ) <Text className='unerline-text'>Buisness:</Text>{' '}
							<input type='text' id='fname' name='fname' readOnly />
						</Col>
						<Col span={24} offset={2}>
							( ) <Text className='unerline-text'>Mobile:</Text>{' '}
							<input type='text' id='fname' name='fname' readOnly />
						</Col>
					</Row>
					<Row>
						<Checkbox className='checkbox-margin' true>
							<Text className='head-Text'>Settlement Instruction:</Text>
						</Checkbox>
					</Row>
					<Row>
						<Col span={24} offset={2}>
							( ) <Text className='unerline-text'> Deliver/Pick-up (Address):</Text>{' '}
							<input type='text' id='fname' name='fname' readOnly />
						</Col>
						<Col span={24} offset={2}>
							( ) <Text className='unerline-text'> Deposit:</Text>{' '}
						</Col>
						<Col span={24} offset={3}>
							( ) <Text className='unerline-text'> Bank/Branch:</Text>{' '}
							<input type='text' id='fname' name='fname' readOnly />
						</Col>
						<Col span={24} offset={3}>
							( ) <Text className='unerline-text'> Full Bank Account Name:</Text>{' '}
							<input type='text' id='fname' name='fname' readOnly />
						</Col>
						<Col span={24} offset={3}>
							( ) <Text className='unerline-text'> Bank Account No. .</Text>{' '}
							<input type='text' id='fname' name='fname' readOnly />
						</Col>
					</Row>
					<Row>
						<Col span={6}>
							<Checkbox className='checkbox-margin' true>
								<Text className='head-Text'>Account Closure :</Text>
							</Checkbox>
						</Col>
						<Col>
							<Checkbox true>
								<Text className='head-Text'>Traditional to Online:</Text>
							</Checkbox>
						</Col>
					</Row>
					<Row>
						<Checkbox className='checkbox-margin' true>
							<Text className='head-Text'>Update Specimen Signature Card:</Text>
						</Checkbox>
					</Row>
					<Row>
						<Checkbox className='checkbox-margin' true>
							<Text className='head-Text'>Document Instruction:</Text>
						</Checkbox>
					</Row>
					<Row>
						<Col span={24} offset={2}>
							( ) <Text className='unerline-text'> Deliver/Pick-up (Address):</Text>{' '}
							<input type='text' id='fname' name='fname' readOnly />
						</Col>
						<Col span={24} offset={2}>
							( ) <Text className='unerline-text'> Mail (Address):</Text>{' '}
							<input type='text' id='fname' name='fname' readOnly />
						</Col>
						<Col span={24} offset={2}>
							( ) <Text className='unerline-text'> e-mail:</Text>{' '}
							<input type='text' id='fname' name='fname' readOnly />
						</Col>
					</Row>
					<Row>
						<Col span={24} style={{ marginBottom: '10px' }}>
							<Checkbox className='checkbox-margin' true>
								<Text className='head-Text'>Others (Please Specify) :</Text>
							</Checkbox>
							<input type='text' id='fname' name='fname' readOnly />
						</Col>
					</Row>
				</Col>
			</Row>
			<Row className='border-page'>
				<Col span={24}>
					<Row>
						<Text className='head-Text'>
							This is to authorized the following persons to receive my :
						</Text>
					</Row>
					<Row>
						<Col span={4}>
							{' '}
							<Checkbox className='checkbox-margin' true>
								<Text className='head-Text'>Invoices</Text>
							</Checkbox>
						</Col>
						<Col span={4}>
							<Checkbox true>
								<Text className='head-Text'>Statement Of Accounts</Text>
							</Checkbox>
						</Col>
						<Col span={4}>
							<Checkbox true>
								<Text className='head-Text'> Official Provisional</Text>
							</Checkbox>
						</Col>
						<Col span={4}>
							{' '}
							<Checkbox true>
								<Text className='head-Text'>Certificate of Stocks</Text>
							</Checkbox>
						</Col>
						<Col span={4}>
							{' '}
							<Checkbox true>
								<Text className='head-Text'>Credit/Debit Memos</Text>
							</Checkbox>
						</Col>
						<Col span={4}>
							<Checkbox true>
								<Text className='head-Text'>Others</Text>
							</Checkbox>
							<input type='text' id='fname' name='fname' readOnly />
						</Col>
					</Row>
					<Row>
						<Col offset={15} style={{ height: '40px', marginTop: '10px', marginBottom: '10px' }}>
							<Text className='head-Text'>SPECIMEN SIGNATURE</Text>
						</Col>
					</Row>
					<Row>
						<table id='style-table'>
							<tbody>
								<tr style={{ height: '70px', border: 'none' }}>
									<th style={{ border: 'none' }}></th>
									<th style={{ border: 'none' }}>NAME OF AUTHORIZED</th>
									<th> FULL SIGNATURE</th>
									<th>INITIAL SIGNATURE</th>
								</tr>
								{data?.map((e, index) => (
									<tr style={{ border: 'none' }}>
										<td>{`${index + 1})`}</td>
										<td>
											<input type='text' id='authorized' name='fname' readOnly />
										</td>
										<td>
											<input type='text' id='authorized' name='fname' readOnly />
										</td>
										<td>
											<input type='text' id='authorized' name='fname' readOnly />
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</Row>

					<Row>
						<Col offset={10} style={{ height: '40px', marginTop: '20px', marginBottom: '10px' }}>
							<Text strong>KINDLY PROVIDE ID/S OF SIGNATORIES WITH SIGNATURE</Text>
						</Col>
					</Row>
				</Col>
			</Row>
			<Row className='border-page'>
				<Col span={18} style={{ borderRight: '4px solid #000000' }}>
					<Row>Client'/s Signature/s:</Row>
					<Row>
						<Col>
							{[...Array(3)].map((e, i) => {
								return (
									<td>
										<input type='text' id='authorized' name='fname' readOnly />
										<Text strong>SIGNATURE OVER PRINTED NAME</Text>
									</td>
								);
							})}
						</Col>
					</Row>
				</Col>
				<Col span={6} style={{ marginBottom: '5px' }}>
					<Text strong>Processed by:</Text>
					<input type='text' id='authorized' name='fname' readOnly />
					<Text strong>Reviewed & Approved by:</Text>
					<input type='text' id='authorized' name='fname' readOnly />
				</Col>
			</Row>
			<Row className='border-page' justify={'center'}>
				<Col span={24}>
					IMPORTANT: For updates, please fill out this form,{' '}
					<span style={{ fontWeight: 'bold' }}>
						{' '}
						attach a copy of your ID, and return to RCBC SECURITIES, INC.
					</span>{' '}
					21st Floor Yuchengco Tower II, RCBC Plaza, 6819 Ayala Avenue, Makati City, 0727
					Philippines • Tel. 63 (2) 894-9000 loc. 1671 to 1681 • Fax 63 (2) 889-7643
				</Col>
			</Row>
			;
		</div>
	);
};

export default AmfForm;
