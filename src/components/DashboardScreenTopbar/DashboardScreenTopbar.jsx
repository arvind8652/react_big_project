import { useEffect, useState, useRef } from 'react';
import { faChevronLeft } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Breadcrumb, Button, Col, Row, Spin } from 'antd';
import { useHistory } from 'react-router-dom';
import './dashboardScreenTopbar.scss';
import ReactToPrint, { useReactToPrint } from 'react-to-print';
// import ComponentToPrint from "./ComponentToPrint";

const DashboardScreenTopbar = ({
	screenText,
	breadCrumb,
	cancelBtnText,
	submitBtnText,
	onCancel = () => {},
	onSubmit = () => {},
	showBackArrow = true,
	onArrowclick,
	RenderSubmit,
	RenderCancel,
	loading,
	handlePrintCorp = () => {},
	handlePrintInd = () => {},
	componentRefInd,
	componentRefCorp,
	customerType
}) => {
	const history = useHistory();
	// const goBack = () => {
	// 	if (onArrowclick) {
	// 		onArrowclick();
	// 	} else {
	// 		history.goBack();
	// 	}
	// };

	return (
		<Row align='middle' justify='space-between' className='create-form-topbar'>
			<Col>
				<Row align='top' justify='space-around'>
					{showBackArrow && (
						<FontAwesomeIcon
							icon={faChevronLeft}
							className='back-icon'
							size='2x'
							// onClick={goBack}
							onClick={() => history.goBack()}
						/>
						// onClick={() => history.goBack()}
					)}
					<div className='screen-prev-screen-section'>
						<div className='screen'>{screenText}</div>
						<Breadcrumb className='prev-screen'>
							<Breadcrumb.Item>{breadCrumb}</Breadcrumb.Item>
						</Breadcrumb>
					</div>
				</Row>
			</Col>
			<Col>
				<Row align='middle' justify='space-between' className='form-btn-section'>
					<Col>
						{RenderCancel ? (
							RenderCancel
						) : (
							<Button type='text' onClick={() => history.goBack()} className='btn cancel'>
								{cancelBtnText}
							</Button>
						)}
					</Col>
					{/* THIS CODE is Needed for future Reffrence */}
					{/* {screenText === "Create Customer" && (
            <Col>
              <ReactToPrint
                pageStyle={`size: 2.5in 4in`}
                trigger={() => (
                  <Button
                    type="primary"
                    className="btn submit"
                    style={{ marginLeft: "10px", marginRight: "10px" }}
                    onClick={handlePrintInd}
                    disabled={customerType === "C" ? true : false}
                  >
                    Print/Ind
                  </Button>
                )}
                content={() => componentRefInd.current}
              // documentTitle={`SOF_${accName ? accName : ""}
              //   _${moment(orderDetailsFormValues?.orderDate).format(
              //   "MMDDYYYY"
              // )}_${moment().format(`HHmmss`)}_${user?.userName}`}
              />
            </Col>
          )} */}
					{/* THIS CODE is Needed for future Reffrence */}
					{/* {screenText === "Create Customer" && (
            <Col>
              <ReactToPrint
                pageStyle={`size: 2.5in 4in`}
                trigger={() => (
                  <Button
                    type="primary"
                    className="btn submit"
                    style={{ marginLeft: "10px", marginRight: "10px" }}
                    onClick={handlePrintCorp}
                    disabled={customerType === "I" ? true : false}
                  >
                    Print/Corp
                  </Button>
                )}
                content={() => componentRefCorp.current}
              // documentTitle={`SOF_${accName ? accName : ""}
              //   _${moment(orderDetailsFormValues?.orderDate).format(
              //   "MMDDYYYY"
              // )}_${moment().format(`HHmmss`)}_${user?.userName}`}
              />
            </Col>
          )} */}
					<Col>
						{RenderSubmit ? (
							RenderSubmit
						) : (
							<Button type='primary' onClick={onSubmit} className='btn submit' disabled={loading}>
								{loading && <Spin />}
								{!loading && submitBtnText}
							</Button>
						)}
					</Col>
				</Row>
			</Col>
		</Row>
	);
};

export default DashboardScreenTopbar;
