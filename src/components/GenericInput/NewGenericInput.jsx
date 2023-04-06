import { Input } from "antd";
import React from "react";
import { theme } from "../../theme"

export const NewGenericInput = ({
    type = "text",
    keyField = "",
    disabled = false,
    value = "",
    onChange = () => {
        console.log("onChange");
    },
}) => {

    function handleChange(keyField, value) {
        onChange(keyField, value);
    }

    return (
        <div className="">
            <Input
                type={type}
                size="large"
                disabled={disabled}
                value={value}
                //   value={item.value ?? ""}
                onChange={(value) => handleChange(keyField, value)}
            />
        </div>
    );
};
