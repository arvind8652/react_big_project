// built-in imports
import React, { useEffect, useRef, useState } from "react";
import { Typography, Card, Table } from "antd";

// internal imports


// external import
import moment from 'moment'

export const DocumentCardDetails = ({
    form = {},
    formData = {},
    onValuesChange,
    action = '',
}) => {


    useEffect(() => {
        if (action === 'edit') {
            if (formData.DocumentInfo) {
                setRequestObject(formData.DocumentInfo);
            }
        }
    }, [formData.DocumentInfo])

    // states
    const [rowData, setRowData] = useState([]);
    const [isModal1Visible, setModal1Visible] = useState(false);
    const [isModal2Visible, setModal2Visible] = useState(false);
    const [requestObject, setRequestObject] = useState([]);
    const [selectedUploadIndex, setSelectedUploadIndex] = useState(0);
    const reqObject = useRef([]);

    const columns = [
        {
            title: 'Type',
            key: 'documentType',
            dataIndex: 'documentType',
            render: documentType => {
                let name = documentType === 'A' ? 'Address Proof' : 'Disclaimer';
                return (
                    <div>
                        <span>{name}</span>
                        <span style={{ color: 'red' }}>{' '}*</span>
                    </div>
                );
            },
        },
        {
            title: 'Name',
            key: 'fileName',
            dataIndex: 'fileName',
            render: item => <a>{item}</a>
        },
        {
            title: 'Status',
            key: 'docStatus',
            dataIndex: 'docStatus',
            render: status => status === 'P' ? 'Pending' : status === 'U' ? 'Uploaded' : 'Deferred'
        },
        {
            title: 'Submission Date',
            key: 'submissionDate',
            dataIndex: 'submissionDate',
            render: sDate => sDate ? moment(sDate).format('DD-MM-YYYY') : null,
        },
        {
            title: 'Expiry Date',
            key: 'expiryDate',
            dataIndex: 'expiryDate',
            render: expiryDate => expiryDate ? moment(expiryDate).format('DD-MM-YYYY') : null,
        },
        {
            title: 'Action Date',
            key: 'actionDate',
            dataIndex: 'actionDate',
            render: actionDate => actionDate ? moment(actionDate).format('DD-MM-YYYY') : null,
        },
    ];


    const generateRowData = data => {
        const modifiedRowData = [];
        const status = [
            {
                displayValue: 'Pending',
                dataValue: 'P',
                disabled: false,
            },
            {
                displayValue: 'Uploaded',
                dataValue: 'U',
                disabled: false,
            },
            {
                displayValue: 'Deferred',
                dataValue: 'D',
                disabled: false,
            },
        ];

        if (Array.isArray(data)) {
            data?.map((itm, idx) => {
                const len = itm?.noDocRequired;
                let i = 0;
                let obj = {};
                for (i; i < len; i++) {

                    obj = {
                        ...itm,
                        // documentType: itm?.documentType === 'A' ? 'Address Proof' : 'Disclaimer',
                        status: status,
                        key: i,
                        docmandatory: itm.docmandatory,
                    };
                    modifiedRowData.push(obj);

                    // feed up request object with empty object
                    reqObject.current.push({
                        docStatus: 'P',
                        rowIndex: i,
                        docmandatory: itm.docmandatory,
                        documentsetupid: "AAA",
                        expiryDate: null,
                    });

                }
                return modifiedRowData;
            });
        }
        return modifiedRowData;
    };

    const getDocumentRow = async () => {
        try {
            const res = await getDocumentDetails(formData?.customerType, formData?.category, formData?.residentialStatus);

            setRowData(generateRowData(res.data?.documentDetailsModel));
        } catch (error) {
            console.log('[CustomerDocumentsDetailFormCard getDocumentRow]', error);
        }
    };

    useEffect(
        () => {
            getDocumentRow();
            return () => {
                reqObject.current = [];
            };
        },
        [
            formData?.customerType,
            formData?.category,
            formData?.residentialStatus
        ]
    );

    return (
        <Card
            title="Documents Detail"
            className={
                requestObject.length === 0 ? "no-card-body" : "card-body"
            }
            extra={
                <Typography.Title
                    level={5}
                    onClick={() => setModal1Visible(true)}
                >
                    <Typography.Link>{(Array.isArray(requestObject) && requestObject.length > 0) ? 'Edit' : '+ Add'}</Typography.Link>
                </Typography.Title>
            }
        >
            <AttachmentFormModal
                form={form}
                formData={formData}
                onValuesChange={onValuesChange}
                isModal1Visible={isModal1Visible}
                setModal1Visible={setModal1Visible}
                setModal2Visible={setModal2Visible}
                isModal2Visible={isModal2Visible}
                selectedUploadIndex={selectedUploadIndex}
                setRequestObject={setRequestObject}
                reqObject={reqObject}
                setRowData={setRowData}
            />
            <DocumentsDetailsFormCard
                isModal1Visible={isModal1Visible}
                setModal1Visible={setModal1Visible}
                setModal2Visible={setModal2Visible}
                csObject={csObject}
                form={form}
                formData={formData}
                onValuesChange={onValuesChange}
                rowData={rowData}
                setRowData={setRowData}
                setRequestObject={setRequestObject}
                setSelectedUploadIndex={setSelectedUploadIndex}
                reqObject={reqObject}
            />

            {
                // Array.isArray(tableData)
                // &&
                (
                    requestObject.length > 0
                    &&
                    <Table columns={columns} dataSource={requestObject} pagination={false} />
                )
            }
        </Card>
    );
}
