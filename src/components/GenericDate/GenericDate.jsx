
import { DatePicker, Space } from 'antd';
import React, { useState } from "react";
import moment from 'moment';

const { RangePicker } = DatePicker;


export const GenericDate = (props) => {
    const { type, onChange = () => { }, keyField = "", valueHandler = () => { } } = props;

    const dateFormat = 'YYYY/MM/DD';
    const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

    const [dates, setDates] = useState([]);
    const [hackValue, setHackValue] = useState();
    const [value, setValue] = useState();
    const disabledDate = current => {
        if (!dates || dates.length === 0) {
            return false;
        }
        const tooLate = dates[0] && current.diff(dates[0], 'days') > 7;
        const tooEarly = dates[1] && dates[1].diff(current, 'days') > 7;
        return tooEarly || tooLate;
    };
    function handleChange(keyField, value, dateString) {
        // onChange(keyField, moment(value._d).format('DD-MM-YYYY'));

        onChange(keyField, dateString);
        // valueHandler(keyField);

        // alert('123');
    }


    const onOpenChange = open => {
        if (open) {
            setHackValue([]);
            setDates([]);
        } else {
            setHackValue(undefined);
        }
    };

    function range(start, end) {
        const result = [];
        for (let i = start; i < end; i++) {
            result.push(i);
        }
        return result;
    }

    function disable(current) {
        // Can not select days before today and today
        return current && current > moment().endOf('day');
    }





    const renderDateField = (type) => {
        switch (type) {
            case "DatePicker":
                return (
                    <Space direction="vertical">
                        <DatePicker />

                    </Space>
                )

            case "DateRange":
                return (
                    <Space direction="vertical" size={12}>
                        {/* <RangePicker disabledDate={disable} onChange={(value, dateString) => handleChange(keyField, value, dateString)} /> */}
                        {/* <RangePicker disabledDate={disable} defaultValue={[moment('2015-06-06', dateFormat), moment('2015-06-06', dateFormat)]} onChange={(value, dateString) => handleChange(keyField, value, dateString)} /> */}
                        <RangePicker defaultValue={[]} allowClear={false} disabledDate={disable} value={[moment(valueHandler(keyField)[0]), moment(valueHandler(keyField)[1])]} onChange={(value, dateString) => handleChange(keyField, value, dateString)} />
                    </Space>
                )
            case "DateFormat":
                return (
                    <Space direction="vertical" size={12}>
                        <DatePicker defaultValue={moment('2015/01/01', dateFormat)} format={dateFormat} />
                        {/* <DatePicker defaultValue={moment('01/01/2015', dateFormatList[0])} format={dateFormatList} /> */}

                    </Space >

                )
            case "SevenDaysRange":
                return (
                    <RangePicker
                        value={hackValue || value}
                        disabledDate={disabledDate}
                        onCalendarChange={val => setDates(val)}
                        onChange={val => setValue(val)}
                        onOpenChange={onOpenChange}
                    />
                )
            case "Customized":
                return (
                    <Space direction="vertical" size={12}>
                        <DatePicker
                            dateRender={current => {
                                const style = {};
                                if (current.date() === 1) {
                                    style.border = '1px solid #1890ff';
                                    style.borderRadius = '50%';
                                }
                                return (
                                    <div className="ant-picker-cell-inner" style={style}>
                                        {current.date()}
                                    </div>
                                );
                            }}
                        />
                    </Space>
                )
            case "DisabledFutureDate":
                return (
                    <DatePicker
                        format="YYYY-MM-DD"
                        disabledDate={disable}
                        allowClear={false}
                        placeholder="Please select"
                        // isClearable={true}
                        // defaultValue={""}
                        value={moment(valueHandler(keyField))}
                        closureDate={moment()}
                        // value={valueHandler(keyField)}
                        // value={valueHandler(keyField)}
                        onChange={(value, dateString) => handleChange(keyField, value, dateString)}
                    // onSelect={(value) => handleChange(keyField, value)}

                    />
                )
            case "Period":
                return (
                    <Space direction="vertical">
                        <DatePicker onChange={handleChange} />
                        <DatePicker onChange={handleChange} picker="week" />
                        <DatePicker onChange={handleChange} picker="month" />
                        <DatePicker onChange={handleChange} picker="quarter" />
                        <DatePicker onChange={handleChange} picker="year" />
                    </Space>
                )


        }
    }
    return (
        <>

            {renderDateField(type)}
        </>
    )
}