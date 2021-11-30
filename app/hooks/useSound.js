import { useCallback, useEffect, useState } from 'react';

function useSound({ src }) {
    const [sound, setSound] = useState(null);

    const play = useCallback(
        (id) => {
            sound.play(id);
        },
        [sound],
    );

    const stop = useCallback((id) => {
        if (!sound) {
            return;
        }
        sound.stop(id);
    });
}

export default useSound;
