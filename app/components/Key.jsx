import { useEffect, useState } from 'react';

import useKeyPress from '~/hooks/useKeyPress';

const maxTime = 16;

export default function Key({ keyCode, isCurrentNote, isTargetNote, value, setCorrect, note }) {
    const isKeyPressed = useKeyPress(keyCode);
    const [className, setClassName] = useState('col');
    const [audio] = useState(typeof Audio !== 'undefined' && new Audio(`/audio/${note.replace('#', 'sharp')}.wav`));

    useEffect(() => {
        if (isKeyPressed) {
            setClassName('col played');
            if (value === 9 && isTargetNote) {
                setCorrect(true);
            }
            if (value > 9 || value === 0) {
                audio.load();
                audio.play();
            }
        } else {
            setClassName('col');
        }
        if (isTargetNote && value > 9) {
            setClassName('col target');
        }
    }, [setCorrect, isKeyPressed, isTargetNote, keyCode, value, audio]);

    return (
        <div className={className}>
            <div>{keyCode}</div>
            <div>{note}</div>
            {isCurrentNote && (
                <div
                    className='note'
                    style={{
                        transform: `translateY(${(value / maxTime) * 500}%)`,
                    }}
                />
            )}
        </div>
    );
}
