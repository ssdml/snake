import React, { Component } from 'react';
import Square from './Square'

const Colomn = (props) => {
    const squares = [];
    for (let i = 0; i < props.numRows; i++) {
        squares.push(
            <Square
                key={i}
                x={props.x}
                y={1 * props.y + (1 * props.width + 1 * props.disanceY) * i}
                width={props.width}
                color={props.colors[i]}
            />
        );
    }
    return (
        <g>
            {squares}
        </g>
    );
}

export default Colomn;