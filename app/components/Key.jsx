import { useEffect, useState } from 'react';

import useKeyPress from '~/hooks/useKeyPress';

const maxTime = 16;

export default function Key({ keyCode, isCurrentNote, isTargetNote, value, setCorrect, note }) {
    const isKeyPressed = useKeyPress(keyCode);
    const [className, setClassName] = useState('col');

    useEffect(() => {
        if (isTargetNote && value > 9) {
            setClassName('col target');
        } else if (isKeyPressed) {
            setClassName('col played');
            if (value === 9 && isTargetNote) {
                setCorrect(true);
            }
        } else {
            setClassName('col');
        }
    }, [setCorrect, isKeyPressed, isTargetNote, keyCode, value]);

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
