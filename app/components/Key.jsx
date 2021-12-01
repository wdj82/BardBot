// import { useEffect, useRef, useState } from 'react';

import useKeyPress from '~/hooks/useKeyPress';

const maxTime = 16;

export default function Key({ keyCode, isCurrentNote, value }) {
    const isKeyPressed = useKeyPress(keyCode);

    // const [audio] = useState(typeof Audio !== 'undefined' && new Audio(`/audio/${note}.wav`));

    // useEffect(() => {
    //     if (isTargetNote && isKeyPressed && value === 8) {
    //         hitKey(keyCode);
    //     }
    // }, [hitKey, isKeyPressed, isTargetNote, keyCode, value]);

    return (
        <>
            <div className={isKeyPressed ? 'col played' : 'col'}>
                {keyCode}
                {isCurrentNote && (
                    <div
                        className='note'
                        style={{
                            transform: `translateY(${(value / maxTime) * 500}%)`,
                        }}
                    />
                )}
            </div>
        </>
    );
}
