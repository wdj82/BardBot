import { useState } from 'react';

import stylesURL from '~/styles/index.css';
import Key from '~/components/Key';

// pick the note to play at random for now
// note they need to play also random
// root note plays for four ticks
// new note plays for four ticks
// 9th tick it checks if the correct and only the correct key is being pressed
// 10, 11, 12, 13, 14, 15, 16 ticks it waits and informs user of result
// starts over
// change start button to stop

// const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
// const keys = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']'];
const keysArray = [
    { keyCode: 'q', isPlaying: false, note: 'C' },
    { keyCode: 'w', isPlaying: false, note: 'Csharp' },
    { keyCode: 'e', isPlaying: false, note: 'D' },
    { keyCode: 'r', isPlaying: false, note: 'Dsharp' },
    { keyCode: 't', isPlaying: false, note: 'E' },
    { keyCode: 'y', isPlaying: false, note: 'F' },
    { keyCode: 'u', isPlaying: false, note: 'Fsharp' },
    { keyCode: 'i', isPlaying: false, note: 'G' },
    { keyCode: 'o', isPlaying: false, note: 'Gsharp' },
    { keyCode: 'p', isPlaying: false, note: 'A' },
    { keyCode: '[', isPlaying: false, note: 'Asharp' },
    { keyCode: ']', isPlaying: false, note: 'B' },
];

// const KeysContext = createContext();

// function KeysProvider(props) {
//     const [keyState, setKeyState] = useState();
//     return <KeysContext.Provider {...props} />;
// }

export function links() {
    return [{ rel: 'stylesheet', href: stylesURL }];
}

function getRandomNumber() {
    return Math.floor(Math.random() * 12);
}

export default function IndexRoute() {
    const [keys, setPlayingArray] = useState(keysArray);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentNote, setCurrentNote] = useState(() => getRandomNumber());

    function toggleStart() {
        if (isPlaying) {
            console.log(`stopping ${keys[currentNote].keyCode}`);
            const newArray = keys.map((obj) => ({ ...obj }));
            newArray[currentNote].isPlaying = false;
            setPlayingArray(newArray);
            setIsPlaying(false);
            setCurrentNote(getRandomNumber());
        } else {
            console.log(`starting ${keys[currentNote].keyCode}`);
            const newArray = keys.map((obj) => ({ ...obj }));
            newArray[currentNote].isPlaying = true;
            setPlayingArray(newArray);
            setIsPlaying(true);
        }
    }

    // function stopPlaying(keyCode) {
    //     console.log(`stopping ${keyCode}`);
    //     const newPlaying = { ...playingArray };
    //     newPlaying[keyCode].isPlaying = false;
    //     setPlayingArray(newPlaying);
    //     setIsPlaying(false);
    // }

    return (
        <>
            <div>
                <button type='button' onClick={toggleStart}>
                    {isPlaying ? 'stop' : 'start'}
                </button>
            </div>
            <div className='wrapper'>
                {keys.map(({ keyCode, isPlaying, note }) => (
                    <Key key={keyCode} keyCode={keyCode} isPlaying={isPlaying} note={note} />
                ))}
            </div>
        </>
    );
}
