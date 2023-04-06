import React, { useState } from 'react'
import { Checkbox, Divider } from 'antd';

const CheckboxGroup = Checkbox.Group;

const defaultOptions = ['test', 'test1', 'test2'];
const defaultCheck = ['test', 'test2'];
const GenericCheckBox = props => {
    const { checkedList = defaultCheck,
        options = defaultOptions,
        onChange = () => {
            console.log("onChange");
        } } = props
    const [checkList, setCheckList] = useState(checkedList)

    const onChangeHandler = list => {
        setCheckList(list);
        onChange(checkList)

    };

    return (
        <>
            <CheckboxGroup options={options} value={checkList} onChange={onChangeHandler} />
        </>
    )
}


export default GenericCheckBox
