import React from "react";
import namor from "namor";

const range = len => {
    const arr = [];
    for (let i = 0; i < len; i++) {
        arr.push(i);
    }
    return arr;
};

const newOperation = () => {
    return {
        address: namor.generate({ words: 1, numbers: 0 }),
        empl_sign: namor.generate({ words: 1, numbers: 0 }),
        info_system: namor.generate({ words: 1, numbers: 0 }),
        date: namor.generate({ words: 1, numbers: 0 }),
        op_type: namor.generate({ words: 1, numbers: 0 }),
    };
};

export function makeData(len = 5553) {
    return range(len).map(d => {
        return {
            ...newOperation(),
            children: range(10).map(newOperation)
        };
    });
}