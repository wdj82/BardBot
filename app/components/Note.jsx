import { useState, useEffect } from 'react';

const maxTime = 16;

function Note({ setPlayingNote }) {
    const [value, setValue] = useState(0);
    const [audio] = useState(() => new Audio('/audio/Csharp.wav'));

    useEffect(() => {
        audio.load();
        audio.play();
        const interval = setInterval(() => {
            setValue(value + 1);
        }, 1000);
        if (value > maxTime) {
            clearInterval(interval);
            setPlayingNote(false);
        }
        return () => clearInterval(interval);
    }, [audio, setPlayingNote, value]);

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
