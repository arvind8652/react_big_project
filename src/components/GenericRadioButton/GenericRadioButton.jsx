import React, { useState } from 'react'
import { Radio } from 'antd';

const Group = Radio.Group;

const defaultOptions = ['test', 'test1', 'test2'];
const defaultSelectedValue = "test";
const GenericRadioButton = props => {
    const { selectedValue = defaultSelectedValue,
        options = defaultOptions,
        onChange = () => {
            console.log("onChange");
        } } = props
    const [value, setValue] = useState(selectedValue);

    const onChangeHandler = e => {
        setValue(e.target.value);
        onChange(value);
    };

    return (
        <>
            <Group onChange={onChangeHandler} value={value}>
                {options.map((item) => { return (<Radio value={item}>{item}</Radio>) })}
            </Group>
        </>
    )
}


export default GenericRadioButton
