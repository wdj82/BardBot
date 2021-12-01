import { useState } from 'react';

import stylesURL from '~/styles/index.css';
import Key from '~/components/Key';
import { useInterval } from '~/hooks/useInterval';

// 9th tick it checks if the correct and only the correct key is being pressed
// 10, 11, 12, 13, 14, 15, 16 ticks it waits and informs user of result
// starts over
// change start button to stop

// const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
// const keys = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']'];

// TODO: simplify the state
const keysArray = [
    { keyCode: 'q', isCurrentNote: false, isTargetNote: false, note: 'C' },
    { keyCode: 'w', isCurrentNote: false, isTargetNote: false, note: 'Csharp' },
    { keyCode: 'e', isCurrentNote: false, isTargetNote: false, note: 'D' },
    { keyCode: 'r', isCurrentNote: false, isTargetNote: false, note: 'Dsharp' },
    { keyCode: 't', isCurrentNote: false, isTargetNote: false, note: 'E' },
    { keyCode: 'y', isCurrentNote: false, isTargetNote: false, note: 'F' },
    { keyCode: 'u', isCurrentNote: false, isTargetNote: false, note: 'Fsharp' },
    { keyCode: 'i', isCurrentNote: false, isTargetNote: false, note: 'G' },
    { keyCode: 'o', isCurrentNote: false, isTargetNote: false, note: 'Gsharp' },
    { keyCode: 'p', isCurrentNote: false, isTargetNote: false, note: 'A' },
    { keyCode: '[', isCurrentNote: false, isTargetNote: false, note: 'Asharp' },
    { keyCode: ']', isCurrentNote: false, isTargetNote: false, note: 'B' },
];

export function links() {
    return [{ rel: 'stylesheet', href: stylesURL }];
}

function getRandomNumber() {
    return Math.floor(Math.random() * 12);
}

function getTargetNoteNumber(root) {
    let number = getRandomNumber();
    while (number === root) {
        number = getRandomNumber();
    }
    return number;
}

function createAudio() {
    if (typeof Audio === 'undefined') return null;

    return keysArray.map(({ note }) => new Audio(`/audio/${note}.wav`));
}

export default function IndexRoute() {
    const [keys, setKeys] = useState(keysArray);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentNote, setCurrentNote] = useState(() => getRandomNumber());
    const [targetNote, setTargetNote] = useState(() => getTargetNoteNumber(currentNote));
    const [value, setValue] = useState(0);
    const [audioArray] = useState(() => createAudio());

    function toggleStart() {
        if (isPlaying) {
            console.log(`stopping`);
            const newArray = [...keys];
            newArray[currentNote].isCurrentNote = false;
            newArray[targetNote].isTargetNote = false;
            setKeys(newArray);
            setIsPlaying(false);
            setCurrentNote(getRandomNumber());
            setTargetNote(getTargetNoteNumber(currentNote));
        } else {
            console.log(`starting ${keys[currentNote].keyCode}`);
            console.log(`target key is ${keys[targetNote].keyCode}`);
            const newArray = [...keys];
            newArray[currentNote].isCurrentNote = true;
            newArray[targetNote].isTargetNote = true;
            setKeys(newArray);
            setIsPlaying(true);
        }
    }

    useInterval(
        () => {
            if (isPlaying) {
                if (value < 4) {
                    audioArray[currentNote].load();
                    audioArray[currentNote].play();
                } else if (value >= 4 && value < 8) {
                    audioArray[targetNote].load();
                    audioArray[targetNote].play();
                }
                setValue(value + 1);
            }
        },
        value < 16 && isPlaying ? 1000 : null,
    );

    function hitKey(keyCode) {
        console.log(`hit target key ${keyCode}`);
    }

    return (
        <>
            <div>
                <button type='button' onClick={toggleStart}>
                    {isPlaying ? 'stop' : 'start'}
                </button>
            </div>
            <div className='wrapper'>
                {keys.map((keys) => (
                    <Key key={keys.keyCode} hitKey={hitKey} value={value} {...keys} />
                ))}
            </div>
        </>
    );
}
