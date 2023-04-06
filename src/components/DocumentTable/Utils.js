export const generateRowData = (data) => {
  let count = 0;
  const modifiedRowData = [];
  const requstData = [];
  const status = [
    {
      displayValue: "Pending",
      dataValue: "P",
      disabled: false,
    },
    {
      displayValue: "Submitted",
      dataValue: "U",
      disabled: false,
    },
    {
      displayValue: "Deferred",
      dataValue: "D",
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
        requstData.push({
          docStatus: "P",
          rowIndex: count,
          docmandatory: itm.docmandatory,
          documentsetupid: itm?.lstDocumentNames[0]?.documentsetupid,
          expiryDate: null,
        });
        // count for row index
        count++;
      }
      return { modifiedRowData, requstData };
    });
  }
  return { modifiedRowData, requstData };
};
