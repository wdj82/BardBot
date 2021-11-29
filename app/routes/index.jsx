import { useState } from 'react';

import stylesURL from '~/styles/index.css';
import Key from '~/components/Key';

const keys = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']'];

export function links() {
    return [{ rel: 'stylesheet', href: stylesURL }];
}

export default function IndexRoute() {
    const [playing, setPlaying] = useState(() => Array(12).fill(false));

    function handleStart() {
        console.log('start');
        const newPlaying = [...playing];
        newPlaying[1] = true;
        setPlaying(newPlaying);
    }

    return (
        <>
            <div>
                <button type='button' onClick={handleStart}>
                    Start
                </button>
            </div>
            <div className='wrapper'>
                {keys.map((key, index) => {
                    return <Key key={index} keyCode={key} isPlaying={playing[index]} />;
                })}
            </div>
        </>
    );
}
