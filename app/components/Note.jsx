import { useState, useEffect } from 'react';

const maxTime = 10;

function Note() {
    const [value, setValue] = useState(0);
    const [audio] = useState(() => new Audio('/audio/Csharp.wav'));

    useEffect(() => {
        audio.load();
        audio.play();
        const interval = setInterval(() => {
            setValue(value + 1);
        }, 1000);
        if (value >= maxTime) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [audio, value]);

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
