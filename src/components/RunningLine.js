import React, { Component } from 'react';
import Colomn from './Colomn'

const RunningLine = (props) => {
    const x = 10;
    const y = 10;
    const distance = 3;
    const width = 20;

    const colomns = props.colors.map((current, index) => {
        return (
            <Colomn
                key={index}
                x={x + index * (1 * width + distance)}
                y={y}
                width={width}
                disanceY={distance}
                numRows={current.length}
                colors={current}
            />
        );
    });
    return (
        <g>
            {colomns}
        </g>
    );
}

export default RunningLine;