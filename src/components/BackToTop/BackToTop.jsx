import { ArrowUpOutlined } from '@ant-design/icons';
import React from 'react';

const BackToTop = () => {
    const styleSet = {
        backToTopContainer: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: '10px'
        },
        arrowUpIcon: {
            fontSize: '16px',
            color: '#354081',
            marginRight: '5px'
        },
        backToTopText: {
            fontSize: '16px',
            color: '#354081',
        }
    };

    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
            /* you can also use 'auto' behaviour
               in place of 'smooth' */
        });
    };
    return (
        <div onClick={goToTop} style={styleSet.backToTopContainer}>
            <ArrowUpOutlined style={styleSet.arrowUpIcon} />
            <a style={styleSet.backToTopText}>Back to top</a>
        </div>
    );
};

export default BackToTop;
