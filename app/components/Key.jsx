import { useEffect, useState } from 'react';

import useKeyPress from '~/hooks/useKeyPress';
import Note from './Note';

function Key({ keyCode, isPlaying }) {
    const [playingNote, setPlayingNote] = useState(false);

    useEffect(() => {
        if (isPlaying) {
            console.log(`${keyCode} is playing`);
            setPlayingNote(true);
        }
    }, [isPlaying, keyCode]);

    const isKeyPressed = useKeyPress(keyCode);
    return (
        <>
            <div className={isKeyPressed ? 'col played' : 'col'}>
                {keyCode}
                {playingNote && <Note />}
            </div>
        </>
    );
}

export default Key;
