import React from 'react';
import SofForm from './SofForm';

const ComponentToPrint = React.forwardRef((props, ref) => {
    return <>
        <div ref={ref}>
            <SofForm {...props} />
        </div>
    </>
})

export default ComponentToPrint;