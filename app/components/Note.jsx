import { useState, useEffect } from 'react';

const maxTime = 10;

function Note() {
    const [value, setValue] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setValue(value + 1);
            console.log(value);
        }, 1000);
        if (value >= maxTime) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [value]);

    return (
        <div
            className='note'
            style={{
                transform: `translateY(${(value / maxTime) * 500}%)`,
            }}
        />
    );
}

export default Note;
