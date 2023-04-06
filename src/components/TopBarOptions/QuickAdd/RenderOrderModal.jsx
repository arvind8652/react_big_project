import { Col, Row, Select } from 'antd';
import React from 'react';
import { ScButtonPrimary, ScButtonText, ScModal } from '../../StyledComponents/genericElements';

const RenderOrderModal = ({
    isVisible = false,
    setVisible,
}) => {

    const toggleModal = () => {
        setVisible(prev => !prev);
    };

    const styleSet = {
        fullWidth: {
            width: '95%',
        }
    };

    return (
        <ScModal
            title="Order"
            visible={isVisible}
            onCancel={toggleModal}
            footer={[
                <ScButtonText
                    type="text"
                    key="back"
                    onClick={toggleModal}
                >
                    Cancel
                </ScButtonText>,
                <ScButtonPrimary
                    htmlType="submit"
                    key="submit"
                    type="primary"
                    onClick={toggleModal}
                >
                    Submit
                </ScButtonPrimary>,
            ]}
            width="75vw"
            centered
            closable={true}
        >
            <Row>
                <Col span={12}>
                    <Select
                        style={styleSet.fullWidth}
                        size='large'
                    />
                </Col>
                <Col span={12}>
                    <Select
                        style={styleSet.fullWidth}
                        size='large'
                    />
                </Col>
            </Row>
        </ScModal>
    );
};

export default RenderOrderModal;