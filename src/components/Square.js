import React, { Component } from 'react';

const Square = (props) => {
    const borderWidth = 2;
    const withoutBorderWidth = props.width - borderWidth;
    const whiteSpaceWidth = 3;
    const innerSquareWidth = withoutBorderWidth - 2 * whiteSpaceWidth;
    return (
        <g>
            <rect
                x={props.x}
                y={props.y}
                width={withoutBorderWidth}
                height={withoutBorderWidth}
                fill="white"
                stroke={props.color}
                strokeWidth={borderWidth}
            />
            <rect
                x={1 * props.x + whiteSpaceWidth}
                y={1 * props.y + whiteSpaceWidth}
                width={innerSquareWidth}
                height={innerSquareWidth}
                fill={props.color}
            />
        </g>
    );
}

export default Square;