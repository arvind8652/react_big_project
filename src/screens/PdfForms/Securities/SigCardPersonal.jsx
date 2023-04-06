import { Col, Row } from 'antd';
import React from 'react';
import './SigCardPersonal.scss';

const SigCardPersonal = () => {
	return (
		<div className='styled-padng'>
			<Row className='styled-margin'>
				<Col span={8}>
					<h3>Civil Status:</h3>
				</Col>
				<Col span={8}>
					<label className='styled-fnt-checkbox'>
						<input type='checkbox' />
						Single
					</label>

					<Col>
						<label className='styled-fnt-checkbox'>
							<input type='checkbox' />
							Married
						</label>
					</Col>
				</Col>
				<Col span={8}>
					<label className='styled-fnt-checkbox'>
						<input type='checkbox' />
						Individual
					</label>
					<Col>
						<label className='styled-fnt-checkbox'>
							<input type='checkbox' />
							Corporate
						</label>
					</Col>
				</Col>
			</Row>
			<Row className='styled-margin'>
				{' '}
				<h3>Name (Print)</h3>
			</Row>
			<Row className='styled-margin'>
				<h3>Address</h3>
			</Row>
			<Row className='address-space'></Row>
			<Row className='styled-margin'>
				<Col span={8}>
					<h3>T.I.N</h3>
				</Col>
				<Col span={8} className='styled-bdr'>
					<h3>Tel. No.</h3>
				</Col>
				<Col span={8} className='styled-bdr'>
					<h3>Citizenship</h3>
				</Col>
			</Row>
			<Row className='styled-fnt-update'>For individual Applicants:</Row>
			<Row>
				<Col span={8} className='styled-fnt-update pad-lef'>
					Specimen Signature
				</Col>
				<Col span={8} className='styled-margin'>
					<h3>1)</h3>
				</Col>
				<Col span={8} className='styled-margin'>
					<h3>1)</h3>
				</Col>
			</Row>
			<Row className='address-space'>
				<Col span={8} className='styled-fnt-update pad-lef'>
					(Please Sign Twice)
				</Col>
				<Col span={8} className='styled-margin'>
					<h3>2)</h3>
				</Col>
				<Col span={8} className='styled-margin'>
					<h3>2)</h3>
				</Col>
			</Row>
			<Row>
				<Col span={12} className='styled-margin styled-fnt-checkbox'>
					For Corporate Applicants:
					<Col className='styled-fnt-update'>Use Reverse side for specimen Signature.</Col>
				</Col>
				<Col className='styled-bdr styled-fnt-update'>Signature Verified:</Col>
			</Row>
			<Row>
				<Col span={12} className='styled-fnt-update'>
					<span className='styled-fnt-checkbox'>Important:</span> Certificates will not be
					transferred unless specimen signature of stockholder is on file with the transfer agent of
					the company. For your protection, please fill out this card and return to RCBC SECURITIES,
					INC. 21st Floor Yuchengco Tower II RCBC Plaza, 6819 Ayala Avenue, Makati City, 0727
					Philippines* Tel. 63 (2) 894-9000 loc. 1671 to 1681*Fax 63 (2) 889-7643
				</Col>
				<Col className='styled-bdr'>
					<p className='styled-fnt'>RCBC SECURITIES, INC.</p>
				</Col>
			</Row>
		</div>
	);
};

export default SigCardPersonal;
