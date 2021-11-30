import { useEffect, useRef, useState } from 'react';

import useKeyPress from '~/hooks/useKeyPress';

const maxTime = 16;

function useInterval(callback, delay) {
    const intervalRef = useRef(null);
    const savedCallback = useRef(callback);

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        const tick = () => savedCallback.current();
        if (typeof delay === 'number') {
            intervalRef.current = window.setInterval(tick, delay);
            return () => window.clearInterval(intervalRef.current);
        }
    }, [delay]);

    return intervalRef;
}

export default function Key({ keyCode, isPlaying, note }) {
    const isKeyPressed = useKeyPress(keyCode);
    const [value, setValue] = useState(0);
    const [audio] = useState(typeof Audio !== 'undefined' && new Audio(`/audio/${note}.wav`));

    // useInterval(
    //     () => {
    //         if (isPlaying) {
    //             audio.load();
    //             audio.play();
    //             setValue(value + 1);
    //             console.log(value);
    //         }
    //     },
    //     value < maxTime && isPlaying ? 1000 : null,
    // );

    return (
        <>
            <div className={isKeyPressed ? 'col played' : 'col'}>
                {keyCode}
                {/* {isPlaying && (
                    <div
                        className='note'
                        style={{
                            transform: `translateY(${(value / maxTime) * 500}%)`,
                        }}
                    />
                )} */}
            </div>
        </>
    );
}
