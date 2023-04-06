import React, { Children } from "react";


const LabelWithHelpText = ({ label = '', helpText = '' }) => {
    const styleSet = {
        body: {
            display: "flex",
            flexDirection: "column",
        },

    };

    return (
        <div style={styleSet.body}>
            <span style={{ fontSize: '24px' }} >
                {label}
            </span>
            <span style={{ fontSize: '16px', paddingBottom: "16px" }} >
                {helpText}
            </span>
        </div>
    );
};
export default LabelWithHelpText;
