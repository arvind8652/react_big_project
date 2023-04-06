import React, { useEffect, useState } from 'react';
import { Row, Col, Avatar, Card, Modal, Typography } from 'antd';
import 'antd/dist/antd.css';
import { TinyColumn } from '@ant-design/charts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import DemoModal from './DemoModal';
import { fontSet, theme } from '../../../theme';
import { TABLECOL } from './TableDetails';
import { exportJSON } from '../../../utils/utils';
import {
	getDormantApi,
	getOutperformersApi,
	getUnderPerformersApi
} from '../../../api/customerOverviewApi';

const PerformanceCard = (props) => {
	const [outperformers, setOutperformers] = useState([]);
	const [underperformers, setUnderperformers] = useState([]);
	const [dormant, setDormant] = useState([]);

	const styleSet = {
		borderColor: {
			border: '1px solid #2B5680',
			background: 'linear-gradient(180deg, #EAECF8 38.3%, rgba(255, 255, 255, 0) 100%)'
		},
		subBody: {
			theme: theme.subBody,
			color: '#898EA9'
		},
		amountBlock: {
			fontSize: fontSet.heading.large
		},
		number: {
			fontfamily: theme.profileName.fontFamily,
			fontSize: '16px',
			color: ' #32373F'
		}
	};
	const [outPerformGraph, setOutPerformGraph] = useState([]);
	const [underPerformGraph, setUnderPerformGraph] = useState([]);
	const [dormatGraph, setDormatGraph] = useState([]);
	const [dormantPeroid, setDormantPeriod] = useState();
	useEffect(() => {
		let outPerformData = [];
		let underPerformData = [];
		let dormatData = [];
		if (Object.keys(outperformers).length > 0) {
			if (outperformers?.graphDetail.length) {
				outperformers?.graphDetail.map((ele) => outPerformData.push(ele.clientCount));
			}
		}
		if (Object.keys(underperformers).length > 0) {
			if (underperformers?.graphDetail.length) {
				underperformers?.graphDetail.map((ele) => underPerformData.push(ele.clientCount));
			}
		}
		if (Object.keys(dormant).length > 0) {
			if (dormant?.graphDetail?.length) {
				dormant?.graphDetail.map((ele) => dormatData.push(ele.clientCount));
			}
		}
		setOutPerformGraph(outPerformData);
		setUnderPerformGraph(underPerformData);
		setDormatGraph(dormatData);
		setDormantPeriod(dormant?.graphDetail?.map((ele) => ele.period));
	}, [outperformers, underperformers, dormant]);
	useEffect(() => {
		getOutperformersApi().then((res) => {
			setOutperformers(res.data);
		});
		getUnderPerformersApi().then((res) => {
			setUnderperformers(res.data);
		});
		getDormantApi().then((res) => {
			setDormant(res.data);
		});
	}, []);
	var outperformConfig = {
		height: 70,
		width: 150,
		autoFit: false,
		data: outPerformGraph,
		tooltip: {
			customContent: function customContent(x, data) {
				var _data$, _data$$data;
				return 'NO.'
					.concat(x, ': ')
					.concat(
						(_data$ = data[0]) === null || _data$ === void 0
							? void 0
							: (_data$$data = _data$.data) === null || _data$$data === void 0
							? void 0
							: _data$$data.y.toFixed(2)
					);
			}
		}
	};
	var underPerformConfig = {
		height: 70,
		width: 150,
		autoFit: false,
		data: underPerformGraph,
		tooltip: {
			customContent: function customContent(x, data) {
				var _data$, _data$$data;
				return 'NO.'
					.concat(x, ': ')
					.concat(
						(_data$ = data[0]) === null || _data$ === void 0
							? void 0
							: (_data$$data = _data$.data) === null || _data$$data === void 0
							? void 0
							: _data$$data.y.toFixed(2)
					);
			}
		}
	};
	var dormatConfig = {
		height: 70,
		width: 150,
		autoFit: false,
		data: dormatGraph,
		tooltip: {
			customContent: function customContent(x, data) {
				var _data$, _data$$data;
				return ''
					.concat(dormantPeroid[x], ': ')
					.concat(
						(_data$ = data[0]) === null || _data$ === void 0
							? void 0
							: (_data$$data = _data$.data) === null || _data$$data === void 0
							? void 0
							: _data$$data.y.toFixed(2)
					);
			}
		}
	};
	const [outperformeModal, setOutperformeModal] = useState(false);
	const [underPerformModal, setUnderPerformModal] = useState(false);
	const [dormantModal, setDormantModal] = useState(false);

	const showModal = (funName) => funName(true);
	const handleCancel = (funName) => funName(false);

	const downloadReport = (data = []) => {
		if (!data) return alert('No data');

		// if (!data.length) return alert("No data");
		const downloadData = data.map((ele, index) => ({
			'Sr.No': index + 1,
			Customer: ele?.clientCard?.clientName,
			'Family Name': ele?.clientCard?.familyName,
			AUM: ele.aum,
			Revunue: ele.revenue
		}));
		exportJSON(downloadData, 'Report');
	};
	return (
		<>
			<Card
				style={{
					borderRadius: '10px',
					border: '1px solid rgb(203, 214, 255)'
				}}
			>
				<Row>
					{/*Do not remove this code, will be used in future */}
					{/* <Col span={8}>
            <Row>
              <Col>
                <Avatar
                  size={40}
                  style={{ backgroundColor: "#E4FDFF", marginRight: "15px" }}
                >
                  <FontAwesomeIcon
                    icon={faAngleDoubleUp}
                    color="#56B8BE"
                    fontSize="24px"
                  />
                </Avatar>
              </Col>
              <Col>
                <span style={styleSet.number}>
                  {outperformers.totalCount} /
                  <a onClick={() => showModal(setOutperformeModal)}>
                    <Typography.Text
                      ellipsis={{ tooltip: [outperformers.totalAmount] }}
                      style={{ width: "90px" }}
                    >
                      {outperformers.currencySymbol}
                      {outperformers.totalAmount}
                    </Typography.Text>
                  </a>
                  <UpOutlined style={{ marginLeft: "5px", color: "#56B8BE" }} />
                </span>
                <br />
                <span style={styleSet.subBody}>{"Outperformers"}</span>
              </Col>
              <Col>
                <TinyColumn {...outperformConfig} />
              </Col>
            </Row>
          </Col> */}
					{/* <Col span={8}>
            <Row>
              <Col>
                <Avatar
                  size={40}
                  style={{ backgroundColor: "#FFDBDB", marginRight: "15px" }}
                >
                  <FontAwesomeIcon
                    icon={faAngleDoubleDown}
                    color="#BE5C56"
                    fontSize="24px"
                  />
                </Avatar>
              </Col>
              <Col>
                <Row>
                  <span style={styleSet.number}>
                    {underperformers.totalCount} /
                    <a onClick={() => showModal(setUnderPerformModal)}>
                      <Typography.Text
                        ellipsis={{ tooltip: [underperformers.totalAmount] }}
                        style={{ width: "90px" }}
                      >
                        {outperformers.currencySymbol}
                        {underperformers.totalAmount}
                      </Typography.Text>
                    </a>
                    <DownOutlined
                      style={{ marginLeft: "5px", color: "#BE5C56" }}
                    />
                  </span>
                </Row>
                <Row>
                  <span style={styleSet.subBody}>{"Underperformers"}</span>
                </Row>
              </Col>
              <Col>
                <TinyColumn {...underPerformConfig} />
              </Col>
            </Row>
          </Col> */}
					<Col span={8}>
						<Row>
							<Col>
								<Avatar size={40} style={{ backgroundColor: '#EAECF8', marginRight: '15px' }}>
									<FontAwesomeIcon
										icon={faMinusCircle}
										//   size="2x"
										color='#5D6DD1'
										fontSize='24px'
									/>
								</Avatar>
							</Col>
							<Col>
								<Row>
									<span style={styleSet.number}>
										{dormant.totalCount} /
										<a onClick={() => showModal(setDormantModal)}>
											<Typography.Text
												ellipsis={{ tooltip: [dormant.totalAmount] }}
												// style={{ width: "90px" }}
												style={{ width: '150px' }}
											>
												{outperformers.currencySymbol}
												{dormant.totalAmount}
											</Typography.Text>
										</a>
										{/* <UpOutlined style={{ marginLeft: '5px', color: '#56B8BE' }} /> */}
									</span>
								</Row>
								<Row>
									<span style={styleSet.subBody}>{'Dormant'}</span>
								</Row>
							</Col>
							<Col>
								<TinyColumn {...dormatConfig} />
							</Col>
						</Row>
					</Col>
				</Row>
			</Card>
			<Modal
				footer={null}
				title='Outperform'
				visible={outperformeModal}
				width={1600}
				onCancel={() => handleCancel(setOutperformeModal)}
			>
				<DemoModal
					columns={TABLECOL}
					tableRows={outperformers.breakUp}
					downloadFunction={() => downloadReport(outperformers.breakUp)}
				/>
			</Modal>
			<Modal
				footer={null}
				title='Underperformer'
				visible={underPerformModal}
				width={1600}
				onCancel={() => handleCancel(setUnderPerformModal)}
			>
				<DemoModal
					columns={TABLECOL}
					tableRows={underperformers.breakUp}
					downloadFunction={() => downloadReport(underperformers.breakUp)}
				/>
			</Modal>
			<Modal
				footer={null}
				title='Dormant'
				visible={dormantModal}
				width={1600}
				onCancel={() => handleCancel(setDormantModal)}
			>
				<DemoModal
					columns={TABLECOL}
					tableRows={dormant.breakUp}
					downloadFunction={() => downloadReport(dormant.breakUp)}
				/>
			</Modal>
		</>
	);
};
export default PerformanceCard;
