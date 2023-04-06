import React, { Children } from "react";

const colorLabel = ({ color = '#bbb', label = '' }) => {
    const styleSet = {
        body: {
            textAlign: 'center',
            display: "flex",
            marginTop: '5px'
        },
        textStyle: {
            height: '20px',
            width: '20px',
            backgroundColor: color,
            borderRadius: "50%",
            display: "inline-block",
            marginRight: '10px'
        }
    };

    return (
        <div style={styleSet.body}>
            <span style={styleSet.textStyle} />
            {label}
        </div>
    );
};
export default colorLabel;