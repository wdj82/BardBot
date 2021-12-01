import { useCallback, useEffect, useState } from 'react';

import stylesURL from '~/styles/index.css';
import Key from '~/components/Key';
import { useInterval } from '~/hooks/useInterval';
import { BEAT_TIMER, INTERVAL, MAX_TIME } from '~/utils/constants';

// const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
// const keys = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']'];

const keysArray = [
    { keyCode: 'q', isCurrentNote: false, isTargetNote: false, note: 'C' },
    { keyCode: 'w', isCurrentNote: false, isTargetNote: false, note: 'C#' },
    { keyCode: 'e', isCurrentNote: false, isTargetNote: false, note: 'D' },
    { keyCode: 'r', isCurrentNote: false, isTargetNote: false, note: 'D#' },
    { keyCode: 't', isCurrentNote: false, isTargetNote: false, note: 'E' },
    { keyCode: 'y', isCurrentNote: false, isTargetNote: false, note: 'F' },
    { keyCode: 'u', isCurrentNote: false, isTargetNote: false, note: 'F#' },
    { keyCode: 'i', isCurrentNote: false, isTargetNote: false, note: 'G' },
    { keyCode: 'o', isCurrentNote: false, isTargetNote: false, note: 'G#' },
    { keyCode: 'p', isCurrentNote: false, isTargetNote: false, note: 'A' },
    { keyCode: '[', isCurrentNote: false, isTargetNote: false, note: 'A#' },
    { keyCode: ']', isCurrentNote: false, isTargetNote: false, note: 'B' },
];

function createAudio() {
    if (typeof Audio === 'undefined') return null;

    return keysArray.map(({ note }) => new Audio(`/audio/${note.replace('#', 'sharp')}.wav`));
}

export function links() {
    return [{ rel: 'stylesheet', href: stylesURL }];
}

function getRandomNumber() {
    return Math.floor(Math.random() * keysArray.length);
}

function getTargetNoteNumber(root) {
    let number = getRandomNumber();
    while (number === root) {
        number = getRandomNumber();
    }
    return number;
}

export default function IndexRoute() {
    const [keys, setKeys] = useState(keysArray);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentNote, setCurrentNote] = useState(() => getRandomNumber());
    const [targetNote, setTargetNote] = useState(() => getTargetNoteNumber(currentNote));
    const [timer, setTimer] = useState(0);
    const [isCorrect, setIsCorrect] = useState(false);
    const [audioArray] = useState(() => createAudio());

    const reset = useCallback(
        (stopping) => {
            const newCurrentNote = getRandomNumber();
            const newTargetNote = getTargetNoteNumber(newCurrentNote);
            console.log(`playing ${keys[newCurrentNote].keyCode}`);
            console.log(`target key is ${keys[newTargetNote].keyCode}`);

            //copy the array and set the new notes if not stopping
            let newArray = keys.map((key, index) => {
                const newKey = { ...key };
                if (key.isCurrentNote || key.isTargetNote) {
                    newKey.isCurrentNote = false;
                    newKey.isTargetNote = false;
                }
                if (!stopping && index === newCurrentNote) {
                    newKey.isCurrentNote = true;
                } else if (!stopping && index === newTargetNote) {
                    newKey.isTargetNote = true;
                }
                return newKey;
            });

            setKeys(newArray);
            setTimer(0);
            setCurrentNote(newCurrentNote);
            setTargetNote(newTargetNote);
            setIsCorrect(false);
        },
        [keys],
    );

    function toggleStart() {
        if (isPlaying) {
            console.log(`stopping`);
            reset(true);
            setIsPlaying(false);
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

    // reset the notes and the timer after 16 seconds
    useEffect(() => {
        if (timer >= MAX_TIME) {
            console.log(`resetting`);
            setIsPlaying(false);
            reset();
            setIsPlaying(true);
        }
    }, [reset, timer]);

    useInterval(
        () => {
            if (timer < INTERVAL) {
                // play current note for first four seconds
                audioArray[currentNote].load();
                audioArray[currentNote].play();
            } else if (timer >= INTERVAL && timer < INTERVAL * 2) {
                // play target note for next four seconds
                audioArray[targetNote].load();
                audioArray[targetNote].play();
            }
            setTimer(timer + 1);
            console.log(timer);
        },
        isPlaying && timer < MAX_TIME ? BEAT_TIMER : null,
    );

    return (
        <div className='wrapper'>
            <button type='button' onClick={toggleStart}>
                {isPlaying ? 'stop' : 'start'}
            </button>

            <div className='ui'>
                {isPlaying && (
                    <div>{timer > INTERVAL && timer <= INTERVAL * 2 + 1 ? INTERVAL * 2 + 1 - timer : null}</div>
                )}
                {isCorrect && 'correct'}
            </div>

            <div className='flex-wrapper'>
                {keys.map((keys) => (
                    <Key key={keys.keyCode} setCorrect={setIsCorrect} value={timer} {...keys} />
                ))}
                <div className='horizontal' />
            </div>
        </div>
    );
}
