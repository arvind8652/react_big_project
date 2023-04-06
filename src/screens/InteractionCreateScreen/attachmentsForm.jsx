import { Form, Card, Upload, Row, Col, Typography, List } from 'antd';

import { UploadOutlined, DeleteFilled } from '@ant-design/icons';

const { Text, Link } = Typography;

const AttachmentsForm = (props) => {
	return (
		<>
			<Form className='attachments-form' onChange={(e) => console.log(e)} layout='vertical'>
				<Card
					style={{ marginTop: '35px' }}
					title='Attachments'
					className='attachments-form-card-type'
				>
					<Row>
						<Col span={16} style={{ padding: '10px', marginBottom: '10px' }}>
							<Form.Item noStyle>
								<Upload.Dragger
									name='file'
									multiple={true}
									onChange={(e) => {
										props.setFilenames([...props.filenames, e.file.name]);
									}}
									style={{
										borderRadius: '15px',
										padding: '12px 0',
										background: '#f6f7fb'
									}}
								>
									<p
										className='ant-upload-drag-icon'
										style={{
											color: '#939DD4'
										}}
									>
										<UploadOutlined
											style={{
												color: '#939DD4'
											}}
										/>
									</p>
									<p className='ant-upload-link'>
										Drag and Drop a File
										<br />
										or
									</p>
									<p
										className='ant-upload-link'
										style={{
											textDecoration: 'underline',
											fontWeight: '600'
										}}
									>
										Upload Files
									</p>
								</Upload.Dragger>
							</Form.Item>
						</Col>
						<Col span={8} style={{ padding: '5px' }}>
							<div
								className='attached-files'
								style={{
									padding: '10px',
									backgroundColor: '#f6f7fb',
									borderRadius: '12px',
									maxHeight: '175px',
									overflowY: 'auto'
								}}
							>
								{props.filenames.length ? (
									<List
										dataSource={props.filenames}
										renderItem={(item, index) => (
											<List.Item>
												<Text>{item}</Text>
												<Link
													onClick={() => {
														var x = props.filenames;
														x.splice(index, 1);
														props.setFilenames([...x]);
													}}
												>
													<DeleteFilled size='middle' />
												</Link>
											</List.Item>
										)}
									/>
								) : (
									'No File Found'
								)}
							</div>
						</Col>
					</Row>
				</Card>
			</Form>
		</>
	);
};

export default AttachmentsForm;
