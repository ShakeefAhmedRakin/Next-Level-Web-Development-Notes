"use strict";
{
    // Type Assertion or Type Narrowing
    const kgToGm = (value) => {
        if (typeof value === 'string') {
            return parseFloat(value) * 1000;
        }
        if (typeof value === 'number') {
            return value * 1000;
        }
    };
    const result1 = kgToGm(1000);
    const result2 = kgToGm('1000');
    try {
        // CODE
    }
    catch (error) {
        console.log(error.message);
    }
}
